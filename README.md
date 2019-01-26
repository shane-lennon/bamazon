<p align="center">
  <img src="./BAMazon.png" alt="BAMAZON">
</p>

Bamazon is not very unlike Amazon, in the sense that it enables consumers to buy a bevy of bitchin products but-- 
## BAM! 

It can all be done STRAIGHT FROM THE COMMAND LINE WITH NODE!! Never before has such bin-convenience been available! 

`bamazon` is a MySQL database that contains two tables: `products` and `departments`. The products table contains columns for 
```   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)
   ```
   # bamazonCustomer.js

<p align="center">
  <img src="./bamazonCustomer.gif" alt="BAMAZON">
</p>

Customers who wish to access the database in order to make a purchase (after cloning this repository) will run:

`$ node bamazonCustomer.js`

The main menu presents the option to `See Inventory` which prints a sweet table that shows which items are offered, as well as their respective prices and availability.  
The second option allows the user to `Place Order`, which will prompt the user to input the item # of the item they wish to purchase, followed by a prompt asking how many they would like to purchase. Once all the input is collected a message will print stating how many of which item was purchased and the total spent. 
The user is free to continue browsing and making further purchases at their leisure, until they wish to exit. Who needs one click buy buttons when recursive prompts are at your fingertips! :bowtie: :thumbsup:

# bamazonManager.js

<p align="center">
  <img src="./bamazonManager.gif" alt="BAMAZON">
</p>

For the back end's backend, bamanagement can access all of the tools they will need to bamanhandle the databamaintenance by running 

`$ node bamazonManager.js`

Just as the customer they will have the option to view the data in the `products` table by selecting `View Products for Sale`. The next option `View Low Inventory` returns a table with any items whose `stock_quantity < 5`. Next