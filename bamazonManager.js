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
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    printInventory();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    process.exit(-1);
            }
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

function viewLowInventory() {

    console.log(
        "--------------------------------------------------------------------------------------------\n| " +
        "Item# |            " +
        "Product          |          " +
        "Department         |   " +
        "Price    |  " +
        "Stock  |");
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5",
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

function addInventory() {
    var maxID = -1;
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        maxID = response.length;
    });

    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "Which product ?",
            validate: num => (num > 0 && num <= maxID) || "Please Enter ID# of the item you wish to restock"
        }, {
            name: "quantity",
            type: "input",
            message: "How many ?",
            validate: num => num > 0 || "Must enter positive number"
        }])
        .then(function (answer) {
            connection.query('SELECT * FROM products WHERE `item_id` = ?',
                [answer.id],
                function (error, response) {
                    if (error) throw error;

                    var updatedQuantity = response[0].stock_quantity + parseInt(answer.quantity);
                    console.log(response)

                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: updatedQuantity
                    }, {
                        item_id: answer.id
                    }], function (error) {
                        if (error) throw error;
                    });
                    console.log(`You added ${answer.quantity} to ${response[0].product_name}`)

                    start();
                });
        })
}