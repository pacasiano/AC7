-- add indices later
-- prolly change the ENUM values. Most of them are just temporary values

DROP DATABASE IF EXISTS ac7_database;

CREATE DATABASE IF NOT EXISTS ac7_database;

USE ac7_database;

-- consider using OAuth (sign in with google) to decrease data in our db
CREATE TABLE IF NOT EXISTS account (
    account_id BIGINT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    -- store pw as hash value that can't be decrypted
    account_type ENUM('employee', 'customer') NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id BIGINT UNSIGNED AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
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
    city VARCHAR(255) NOT NULL,
    zip_code CHAR(4) NOT NULL,
    baranggay VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    PRIMARY KEY (address_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
    -- assumes addresses are from ph
    -- if international, need to add state and zipcode length will vary (max length 7), and possibly other stuff
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id BIGINT UNSIGNED AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    emp_status ENUM('active', 'inactive') NOT NULL DEFAULT 'active', -- status is a reserved word
    contact_info VARCHAR(15) NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE IF NOT EXISTS supplier (
    supplier_id BIGINT UNSIGNED AUTO_INCREMENT,
    address_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(15) NOT NULL,
    PRIMARY KEY (supplier_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

-- a new entry is made in this table for every product that is in a delivery supply
CREATE TABLE IF NOT EXISTS inventory_in (
    -- not sure if this needs a PK. A composite key composed of supplier_id and product_id wouldn't be unique
    -- However, both FKs are already used as indices when querying so PK prolly not needed
    inventory_in_id BIGINT UNSIGNED AUTO_INCREMENT,
    supplier_id BIGINT UNSIGNED NOT NULL,
    payment_amount INT UNSIGNED NOT NULL, -- total payment of a particular delivery
    date_ordered TIMESTAMP NOT NULL, -- when/how do we record this? when we order, we don't create an entry for inventory in yet
    date_delivered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (inventory_in_id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE IF NOT EXISTS payment (
    payment_id BIGINT UNSIGNED,
    inventory_in_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_type ENUM('cash', 'gcash'),
    payment_status ENUM('fully paid', 'not paid') DEFAULT 'not paid',
    payment_date TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    -- when payment_status is updated, the payment_date will also update
    PRIMARY KEY (payment_id),
    FOREIGN KEY (inventory_in_id) REFERENCES inventory_in(inventory_in_id)
);

CREATE TABLE IF NOT EXISTS product (
    product_id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    threshold INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS inventory_in_product (
    inventory_in_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    FOREIGN KEY (inventory_in_id) REFERENCES inventory_in(inventory_in_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- stores the price history of a product
-- query using the date and product_id (latest, etc.)
CREATE TABLE IF NOT EXISTS price (
    product_id BIGINT UNSIGNED NOT NULL,
    price DECIMAL(10, 2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- this is the order table, but 'order' is a reserved keyword
/* A new sale entry (row) is immediately made for each account. 
It has a status, either "in progress" (the one displayed in the shopping cart page) or "complete"
(a sale made before). We do this so that a sale can have many sale items, 
which means that we can store sale_id to the sale_item table 
(not sale_item_id stored in purchase table)*/
CREATE TABLE IF NOT EXISTS sale (
    sale_id BIGINT UNSIGNED AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NOT NULL,
    sale_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sale_status ENUM('in progress', 'complete') UNIQUE,
    PRIMARY KEY (sale_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

-- this is the order_item table from the diagram
CREATE TABLE IF NOT EXISTS sale_item (
    sale_item_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (sale_item_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS payment (
    payment_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    mode_of_payment ENUM('cod', 'gcash') NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('complete', 'incomplete'), -- we allow utang right?
    PRIMARY KEY (payment_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- new table, not in diagram
CREATE TABLE IF NOT EXISTS gcash_payment (
    reference_num CHAR(13) NOT NULL,
    payment_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
    -- not sure if a primary key is necessary
);

CREATE TABLE IF NOT EXISTS shipment (
    -- once a shipment is made, it must be recorded so we get sent_date
    -- everytime the shipment_status changes, received_date also changes until shipment_status is complete
    shipment_id BIGINT UNSIGNED AUTO_INCREMENT,
    sale_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NOT NULL,
    tracking_number VARCHAR(255) NOT NULL,
    courier VARCHAR(255) NOT NULL,
    sent_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    received_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    shipment_status ENUM('in progress', 'complete'),
    PRIMARY KEY (shipment_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

-- create payment table for partial payments to the supplier
-- change sale to sale
-- 