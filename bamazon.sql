DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(100), 
    department_name VARCHAR(50), 
    price FLOAT, 
    stock_quantity INT,
    product_sales FLOAT,
    PRIMARY KEY (item_id)
 );
    INSERT INTO products
        ( product_name, department_name, price, stock_quantity )
    VALUES
        ('Laptop' , 'Electronics' , 999.99 , 5),
        ('Sweatpants' , 'Clothing' , 14.51 , 25),
        ('TV' , 'Electronics' , 324.99 , 8),
        ('Guitar' , 'Musical Instruments' , 425.00 , 3),
        ('Cookies' , 'Food' , 1.99 , 2000),
        ('Backpack' , 'Accessories' , 86.88 , 49),
        ('Sunglasses' , 'Accessories' , 279.99 , 55),
        ('Shampoo' , 'Personal Care' , 6.66 , 785),
        ('Comb' , 'Personal Care' , 0.99 , 1347),
        ('Wireless Charger' , 'Electronics' , 15.17 , 293),
        ('Hoodie' , 'Clothing', 23.89, 587);

    SELECT *
    FROM products;

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_costs FLOAT,
    PRIMARY KEY (department_id)
);

    INSERT INTO departments
        ( department_name, over_head_costs )
    VALUES
        ('Accessories', 800),
        ('Clothing' , 2400),
        ('Electronics', 9000),
        ('Musical Instruments', 1234),
        ('Personal Care', 500);

SELECT 
	departments.department_id, 
	departments.department_name, 
	departments.over_head_costs,
	sales.total_sales AS product_sales,
	(sales.total_sales - departments.over_head_costs) AS total_profit
FROM
(
	SELECT department_name, ROUND(SUM(product_sales), 2) AS total_sales
	FROM products
	GROUP BY department_name
) AS sales
INNER JOIN 
	departments
ON
	sales.department_name = departments.department_name;