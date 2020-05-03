CREATE DATABASE IF NOT EXISTS userexpensesdb;

USE userexpensesdb;

DROP TABLE IF EXISTS `expenses`;
DROP TABLE IF EXISTS `tax`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `tax` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rate decimal(6,2) NOT NULL,
    date_created DATETIME DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
  ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `users` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password_hash varchar(255) NOT NULL,
    salt varchar(255) NOT NULL,
    date_created DATETIME DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
  ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `expenses` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    tax_id int NOT NULL,
    value decimal(6,2) NOT NULL,
    description varchar(255) NOT NULL,
    date_of_expense DATETIME,
    date_created DATETIME DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false,
    CONSTRAINT fk_users_userid
    FOREIGN KEY (user_id) 
        REFERENCES users(id),
    CONSTRAINT fk_tax_taxid
    FOREIGN KEY (tax_id) 
        REFERENCES tax(id)
  ) ENGINE=InnoDB;