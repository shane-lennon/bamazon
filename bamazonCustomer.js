const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection info for sql db
var connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: '',
   database: 'bamazon'
});

connection.connect(function (error) {
   if (error) throw error;
   console.log('connected as id ' + connection.threadId);
   start();
})

function start() {
   inquirer
      .prompt({
         name: "action",
         type: "list",
         message: "What would you like to do?",
         choices: [
            "See inventory",
            "Place Order",
            "Exit"
         ]
      })
      .then(function (answer) {
         switch (answer.action) {
            case "See inventory":
               printInventory();
               break;

            case "Place Order":
               placeOrder();
               break;

            case "Exit":
               process.exit(-1);
         }
      });
}

function placeOrder() {

   var maxID = -1;
   connection.query("SELECT * FROM products", function (error, response) {
      if (error) throw error;
      maxID = response.length;
   });

   inquirer
      .prompt([{
         name: "product",
         type: "input",
         message: "What product are you looking for ?",
         validate: num => (num > 0 && num <= maxID) || "Please Enter ID# of the item you wish to purchase"
      }, {
         name: "quantity",
         type: "input",
         message: "How many would you like to purchase ?"
      }])
      .then(function (answer) {
         connection.query(
            "SELECT * FROM products WHERE `item_id` = ?",
            [answer.product],
            function (error, response) {
               if (error) throw error;

               var updatedQuantity = response[0].stock_quantity - answer.quantity;

               if (updatedQuantity < 0) {
                  console.log("Insufficient quantity!");
               } else {
                  connection.query(
                     "UPDATE products SET `stock_quantity` = ? WHERE `item_id` = ?",
                     [updatedQuantity, answer.product],
                     function (error) {
                        if (error) throw error;
                     }
                  )
                  console.log("You ordered " + answer.quantity + " " + response[0].product_name);
               }

               start(); // Gotta be here or the whole deal crashes
            });
         // start(); Why does this mess up the flow of the execution??
      });
   // start(); I don't understand how having this outside the promise overwrites the output (or prevents from being written maybe?)
}

function printInventory() {

   console.log(
      "--------------------------------------------------------------------------------------------\n| " +
      "Item# |            " +
      "Product          |          " +
      "Department         |   " +
      "Price    |  " +
      "Stock  |");
   connection.query(
      "SELECT * FROM products",
      function (error, response) {
         if (error) throw error;
         for (i = 0; i < response.length; i++) {
            console.log(
               "|" +
               JSON.stringify(response[i].item_id).padStart(5) +
               "  |  " +
               response[i].product_name.padEnd(25) +
               "  |  " +
               response[i].department_name.padEnd(25) +
               "  |  " +
               response[i].price.toFixed(2).padStart(8) +
               "  |  " +
               JSON.stringify(response[i].stock_quantity).padStart(5) +
               "  |"
            );
         }
         console.log("--------------------------------------------------------------------------------------------");
         start();
      });
}