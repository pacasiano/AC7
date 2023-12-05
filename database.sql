-- add indices later
-- prolly change the ENUM values. Most of them are just temporary values

DROP DATABASE IF EXISTS ac7_database;

CREATE DATABASE IF NOT EXISTS ac7_database;

USE ac7_database;

SET GLOBAL sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET SESSION sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- consider using OAuth (sign in with google) to decrease data in our db
CREATE TABLE IF NOT EXISTS account (
    account_id BIGINT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    -- store pw as hash value that can't be decrypted
    account_type ENUM('employee', 'customer') NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id BIGINT UNSIGNED AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    reputation SMALLINT NOT NULL DEFAULT 1,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE IF NOT EXISTS address (
    address_id BIGINT UNSIGNED AUTO_INCREMENT,
    customer_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(25) NOT NULL DEFAULT 'Address 1',
    city VARCHAR(25) NOT NULL,
    zip_code CHAR(4) NOT NULL,
    barangay VARCHAR(25) NOT NULL,
    province VARCHAR(25) NOT NULL,
    street VARCHAR(255) NOT NULL,
    address_status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    PRIMARY KEY (address_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
    -- assumes addresses are from ph
    -- if international, need to add state and zipcode length will vary (max length 7), and possibly other stuff
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id BIGINT UNSIGNED AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    emp_status ENUM('active', 'inactive') NOT NULL DEFAULT 'active', -- status is a reserved word
    contact_info VARCHAR(15) NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE IF NOT EXISTS supplier (
    supplier_id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    contact_info VARCHAR(15) NOT NULL,
    city VARCHAR(25) NOT NULL,
    zip_code CHAR(4) NOT NULL,
    barangay VARCHAR(25) NOT NULL,
    province VARCHAR(25) NOT NULL,
    street VARCHAR(255) NOT NULL,
    PRIMARY KEY (supplier_id)
);

CREATE TABLE IF NOT EXISTS inventory_in (
    -- not sure if this needs a PK. A composite key composed of supplier_id and product_id wouldn't be unique
    -- However, both FKs are already used as indices when querying so PK prolly not needed
    inventory_in_id BIGINT UNSIGNED AUTO_INCREMENT,
    supplier_id BIGINT UNSIGNED NOT NULL,
    comment VARCHAR(255) DEFAULT 'none' , -- general reason for stocking out - what's the event? annual damage check or smtg?
    payment_amount DECIMAL(10,2) NOT NULL, -- total payment of a particular delivery
    date_ordered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- when/how do we record this? when we order, we don't create an entry for inventory in yet
    date_delivered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (inventory_in_id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE IF NOT EXISTS purchase_payment (
    payment_id BIGINT UNSIGNED AUTO_INCREMENT,
    inventory_in_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_type ENUM('cash', 'gcash'),
    payment_status ENUM('fully paid', 'not paid') DEFAULT 'not paid',
    payment_date TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- when payment_status is updated, the payment_date will also update
    PRIMARY KEY (payment_id),
    FOREIGN KEY (inventory_in_id) REFERENCES inventory_in(inventory_in_id)
);

CREATE TABLE IF NOT EXISTS product (
    product_id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    category VARCHAR(128) NOT NULL,
    threshold INT UNSIGNED NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS inventory_in_item (
    inventory_in_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    FOREIGN KEY (inventory_in_id) REFERENCES inventory_in(inventory_in_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS inventory_out (
    inventory_out_ref_num BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    comment VARCHAR(255) NOT NULL, -- general reason for stocking out - what's the event? annual damage check or smtg?
    PRIMARY KEY (inventory_out_ref_num),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS inventory_out_item (
    inventory_out_ref_num BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    comment VARCHAR(255) NOT NULL,
    FOREIGN KEY (inventory_out_ref_num) REFERENCES inventory_out(inventory_out_ref_num),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- No need na price history, pwede na ata imerge with stock table?
-- stores the price history of a product
-- query using the date and product_id (latest, etc.)
-- CREATE TABLE IF NOT EXISTS price (
--     product_id BIGINT UNSIGNED NOT NULL,
--     price DECIMAL(10, 2),
--     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (product_id) REFERENCES product(product_id)
-- );

-- this is the order table, but 'order' is a reserved keyword
/* A new sale entry (row) is immediately made for each account. 
It has a status, either "in progress" (the one displayed in the shopping cart page) or "complete"
(a sale made before). We do this so that a sale can have many sale items, 
which means that we can store sale_id to the sale_item table 
(not sale_item_id stored in purchase table)*/
CREATE TABLE IF NOT EXISTS sale (
    sale_id BIGINT UNSIGNED AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED DEFAULT NULL,
    sale_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    -- the date updates when the sale_status is changed from in progress to 'complete' ryt?
    sale_status ENUM('cart', 'processing order', 'packed', 'shipped', 'completed', 'processing return', 'returned', 'cancelled') DEFAULT 'cart',
    PRIMARY KEY (sale_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

-- this is the order_item table from the diagram
CREATE TABLE IF NOT EXISTS sale_item (
    sale_item_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (sale_item_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS stock (
    stock_id BIGINT UNSIGNED AUTO_INCREMENT,
    batch_no BIGINT UNSIGNED NOT NULL DEFAULT 1,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (stock_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- this table tells us which batch a product came from
-- quantity in sale_item is the total number of items of a particular product ordered
-- quantity in sale_item_stock is the number of items that came from a particular stock
-- Ex., there could be 7 product 1's in sale_item - 2 of those are from batch 1, 5 of those are from batch 2
CREATE TABLE IF NOT EXISTS sale_item_stock (
    stock_id BIGINT UNSIGNED NOT NULL,
    sale_item_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (stock_id) REFERENCES stock(stock_id),
    FOREIGN KEY (sale_item_id) REFERENCES sale_item(sale_item_id)
);

CREATE TABLE IF NOT EXISTS sale_payment (
    sale_payment_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    mode_of_payment ENUM('cod', 'gcash') NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- payment_status ENUM('complete', 'incomplete'), -- doesn't make sense to allow utang, esp for a small business
    PRIMARY KEY (sale_payment_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
);

CREATE TABLE IF NOT EXISTS packed_sale (
    sale_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS return_request(
    return_request_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    comment VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (return_request_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
);

CREATE TABLE IF NOT EXISTS return_request_img (
    return_request_id BIGINT UNSIGNED NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (return_request_id) REFERENCES return_request(return_request_id)
);

CREATE TABLE IF NOT EXISTS returned_sale(
    returned_sale_id BIGINT UNSIGNED AUTO_INCREMENT,
    return_request_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comment VARCHAR(255) NOT NULL,
    action ENUM('refund', 'return and refund', 'reject') NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',
    refund_amount DECIMAL(10,2),
    PRIMARY KEY (returned_sale_id),
    FOREIGN KEY (return_request_id) REFERENCES return_request(return_request_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS returned_sale_item (
    returned_sale_id BIGINT UNSIGNED NOT NULL,
    sale_item_id BIGINT UNSIGNED NOT NULL,
    comment VARCHAR(255) NOT NULL,
    FOREIGN KEY (returned_sale_id) REFERENCES returned_sale(returned_sale_id),
    FOREIGN KEY (sale_item_id) REFERENCES sale_item(sale_item_id)
);

CREATE TABLE IF NOT EXISTS returned_sale_img (
    returned_sale_id BIGINT UNSIGNED NOT NULL,
    name ENUM('air waybill', 'product condition') NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (returned_sale_id) REFERENCES returned_sale(returned_sale_id)
);

-- issued for refunds
CREATE TABLE IF NOT EXISTS coupon (
    discount_amount DECIMAL(10,2) NOT NULL,
    expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL 1 YEAR),
    code CHAR(12) NOT NULL,
    quantity INT UNSIGNED DEFAULT 1
);

CREATE TABLE IF NOT EXISTS shipped_sale (
    -- everytime the shipment_status changes, received_date also changes until shipment_status is complete
    shipped_sale_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    tracking_number VARCHAR(20) UNIQUE NOT NULL , -- tracking numbers are usually 12-20 in length in ph (esp with LBC and JRS). Wont exceed 20
    courier VARCHAR(50) NOT NULL, -- we can abbreviate names to about 4 letters but just to be safe we use 50 charlength
    payment DECIMAL(10,2) NOT NULL, -- is this necessary?
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- received_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (shipped_sale_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS cancelled_sale (
    sale_id BIGINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
);

CREATE TABLE IF NOT EXISTS completed_sale (
    sale_id BIGINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
);

CREATE TABLE IF NOT EXISTS gcash_payment (
    reference_num CHAR(13) NOT NULL,
    sale_payment_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (sale_payment_id) REFERENCES sale_payment(sale_payment_id)
    -- not sure if a primary key is necessary
);

-- converted to shipped_sale
-- CREATE TABLE IF NOT EXISTS shipment (
--     -- once a shipment is made, it must be recorded so we get sent_date
--     -- everytime the shipment_status changes, received_date also changes until shipment_status is complete
--     shipment_id BIGINT UNSIGNED AUTO_INCREMENT,
--     sale_id BIGINT UNSIGNED NOT NULL,
--     address_id BIGINT UNSIGNED NOT NULL,
--     tracking_number VARCHAR(20) NOT NULL, -- tracking numbers are usually 12-20 in length in ph (esp with LBC and JRS). Wont exceed 20
--     courier VARCHAR(50) NOT NULL, -- we can abbreviate names to about 4 letters but just to be safe we use 50 charlength
--     sent_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     received_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     shipment_status ENUM('in progress', 'complete'),
--     PRIMARY KEY (shipment_id),
--     FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
--     FOREIGN KEY (address_id) REFERENCES address(address_id)
-- );

-- DUMMY data
INSERT INTO account(username, password, account_type) 
VALUES ('boywonder1', 'gothamsavior42', 'customer'),
('starfirealien', 'tamaranlove17', 'customer'),
('shapeshiftpro', 'greengorillabanana', 'customer'),
('darksorceress', 'azarathrising99', 'customer'),
('obvictoriano', 'adduislife', 'customer'); 

INSERT INTO customer(account_id, first_name, middle_name, last_name, contact_info, email) 
VALUES (1, 'Dick', 'Robin', 'Grayson', '123-4567', 'robin@titans.net'),
(2, 'Koriandr', NULL, 'Starfire', '987-6543', 'starfire@starfireplanet.com'),
(3, 'Garfield', 'Beastboy', 'Logan', '789-0123', 'beastboy@animalkingdom.org'),
(4, 'Rachel', 'Raven', 'Roth', '321-6789', 'raven@darknessrealm.net'),
(5, 'Oneil', NULL, 'Victoriano', '888-8888', 'obvictoriano@addu.edu.ph');

INSERT INTO address(customer_id, name, city, zip_code, barangay, province, street) 
VALUES(1, 'Secret Hideout', 'Gotham', '123', 'Barangay 10', 'NA', '26 street'),
(2, 'Home', 'Jump City', '456', 'Barangay 12', 'NA', '26 street'),
(3, 'Zoo', 'Jump City', '789', 'Barangay 10', 'NA', '26 street'),
(4, 'Literally Hell', 'Azarath', '567', 'Barangay 10', 'NA', '26 street'),
(5, 'My Sweet Home', 'Davao City', '8000', 'Barangay Buhangin', 'Davao', '24 Jump Street');

INSERT INTO product(name, description, category, threshold)
VALUES
('Whitening Body Lotion', 'Brightens and evens skin tone, leaving you with a luminous, radiant complexion', 'Bodycare', 20),
('Bleaching Whipped Cream', 'Experience opulence in skincare with Bleaching Whipped Cream, a decadent secret for a luminous, flawless glow', 'Skinscare', 20),
('Kojic Soap', 'Uncover the allure of radiant skin with Kojic Soap, a refined indulgence for complexion perfection', 'Bodycare', 20);

INSERT INTO sale(account_id)
VALUES (1),
(2),
(4),
(5);

INSERT INTO sale_item(sale_id, product_id, price)
VALUES (1, 1, 50.00),
(2, 1, 50.00),
(3, 1, 50.00),
(4, 2, 150.00),
(4, 1, 50.00);

 INSERT INTO supplier(name, contact_info, city, zip_code, barangay, province, street) VALUES ('Taburnok Inc.', '8884700', 'Davao City', '8000', 'Brgy 19-A', 'Davao del Sur', 'Diversion Rd');

