const mysql = require('mysql');
const inquirer = require('inquirer');
// const program = require('commander');
// const fs = require('fs');
// const csv = require('csv');

// program
//   .version('0.0.1')
//   .option('-l, --list [list]', 'List of customers in CSV')
//   .parse(process.argv)

// let parse = csv.parse;
// let stream = fs.createReadStream(program.list)
//     .pipe(parse({ delimiter : ',' }));

// stream
//   .on('data', function (data) {
//     let firstname = data[0];
//     let lastname = data[1];
//     let email = data[2];
//     console.log(firstname, lastname, email);
//   });

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
               break;
         }
      });
}

function placeOrder() {
   inquirer
      .prompt([{
         name: "product",
         type: "input",
         message: "What product are you looking for ?",
         validate: function (input) {
            return input != NaN || "Must Enter Number";
         }
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
               if (error) {
                  return console.log(error);
               }
               console.log(
                  "You ordered " + answer.quantity + " " + response[0].product_name
               )
            });
            // start();
      });
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