-- add indices later

DROP DATABASE IF EXISTS ac7_database;

CREATE DATABASE IF NOT EXISTS ac7_database;

USE ac7_database;

-- consider using OAuth (sign in with google) to decrease data in our db
CREATE TABLE IF NOT EXISTS account (
    account_id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    -- store pw as hash value that can't be decrypted
    account_type ENUM('employee', 'customer') NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id INT AUTO_INCREMENT,
    account_id INT NOT NULL,
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
    address_id INT AUTO_INCREMENT,
    customer_id INT NOT NULL,
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
    employee_id INT AUTO_INCREMENT,
    account_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    emp_status ENUM('active', 'inactive') NOT NULL DEFAULT 'active', -- status is a reserved word
    contact_info VARCHAR(15) NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- this is the order table, but 'order' is a reserved keyword
CREATE TABLE IF NOT EXISTS purchase (
    purchase_id INT AUTO_INCREMENT,
    account_id INT NOT NULL,
    address_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_status ENUM('in progress', 'complete'),
    PRIMARY KEY (purchase_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT,
    purchase_id INT NOT NULL,
    account_id INT NOT NULL,
    mode_of_payment ENUM('cod', 'gcash') NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('complete', 'incomplete'), -- we allow utang right?
    PRIMARY KEY (payment_id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(purchase_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- new table, not in diagram
CREATE TABLE IF NOT EXISTS gcash_payment (
    reference_num CHAR(13) NOT NULL,
    payment_id INT NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
    -- not sure if a primary key is necessary
);

