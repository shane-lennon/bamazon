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
    

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_costs FLOAT,
    PRIMARY KEY (department_id)
);

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