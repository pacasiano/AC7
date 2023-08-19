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
    account_type ENUM('employee', 'customer'),
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

