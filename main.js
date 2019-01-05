var mysql = require('mysql');
var inquirer = require('inquirer');

// create the connection info for sql db
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'mysql'
});

connection.connect(function(error) {
    if (error) throw error;
    console.log('connected as id ' + connection.threadId);
    // function
});



function productList() {
    inquirer
    .prompt({
        name: "product",
        type: "input",
        message: "What product are you looking for ?"
    })
    .then(function(answer) {
        console.log(answer.product);
        connection.query("SELECT * FROM products WHERE `product` LIKE ?", [answer.product], function(error, response) {
            if (error) {
                return console.log(error);
            }

            console.log(
                "Product: " + 
                response[0].product_name
            )
        })
    })
}
