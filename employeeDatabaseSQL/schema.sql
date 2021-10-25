CREATE DATABASE employee_db;

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments ( 
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
    FOREIGN KEY (department_id)
    REFERENCES(departments(id))
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NO NULL,
    role_id INT,
    manager_id INT 
    FOREIGN KEY (role_id)
    REFERENCES(role(id))
    FOREIGN KEY (manager_id)
    REFERENCES(employee(id));
);


---
CREATE DATABASE movies_db;
USE movies_db;

CREATE TABLE movies(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  movie_reviews TEXT,
  movie_id INT,
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE SET NULL 
);