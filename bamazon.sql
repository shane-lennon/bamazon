DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(50),
  price FLOAT,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Laptop', 'Electronics', 999.99, 5), 
('Sweatpants', 'Clothing', 14.51, 25),
('TV', 'Electronics', 324.99, 8),
('Guitar', 'Musical Instruments', 425.00, 3),
('Cookies', 'Electronics', 1.99, 2000),
('Backpack', 'Accessories', 86.88, 49),
('Sunglasses', 'Accessories', 279.99, 55),
('Shampoo', 'Personal Care', 6.66, 785),
('Comb', 'Personal Care', 0.99, 1347),
('Wireless Charger', 'Electronics', 15.17, 293),
('Hoodie', 'Clothing',23.89, 587);

SELECT * FROM products;