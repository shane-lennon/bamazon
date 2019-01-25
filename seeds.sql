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

INSERT INTO departments
	( department_name, over_head_costs )
VALUES
	('Accessories', 800),
	('Clothing' , 2400),
	('Electronics', 9000),
	('Musical Instruments', 1234),
	('Personal Care', 500);