DROP DATABASE IF EXISTS users_db;

CREATE DATABASE users_db;

USE users_db;

CREATE TABLE


CREATE TABLE User_Info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
    
);

CREATE TABLE Card_Info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_name VARCHAR(30) NOT NULL,
    card_type VARCHAR(30) NOT NULL,
    rarity VARCHAR(30) NOT NULL,
    edition VARCHAR(30) NOT NULL,
    artist_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (id)
);