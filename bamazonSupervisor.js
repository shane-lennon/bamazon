const mysql = require('mysql');
const inquirer = require('inquirer');
var colors = require('colors');
var Table = require('cli-table3');
var table = new Table({
	style: {
		head: ['blue'],
		border: ['green']
	},
	head: [{
			hAlign: 'center',
			content: "ID#"
		},
		{
			hAlign: 'center',
			content: "Department".bold
		},
		{
			hAlign: 'center',
			content: "Overhead Costs".bold
		},
		{
			hAlign: 'center',
			content: "Sales".bold
		},
		{
			hAlign: 'center',
			content: "Total Profit".bold
		}
	],
	chars: {
		'top': '═',
		'top-mid': '╤',
		'top-left': '╔',
		'top-right': '╗',
		'bottom': '═',
		'bottom-mid': '╧',
		'bottom-left': '╚',
		'bottom-right': '╝',
		'left': '║',
		'left-mid': '╟',
		'mid': '─',
		'mid-mid': '┼',
		'right': '║',
		'right-mid': '╢',
		'middle': '│'
	}.green,
	colWidths: [6, , , 12, 15]
});

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
				"View Product Sales by Department",
				"Create New Department",
				"Exit"
			]
		})
		.then(function (answer) {
			switch (answer.action) {
				case "View Product Sales by Department":
					viewSales();
					break;
				case "Create New Department":
					createDepartment();
					break;
				case "Exit":
					process.exit(-1);
			}
		});
}

function viewSales() {

	connection.query(
		`SELECT 
	departments.department_id, 
	departments.department_name, 
	departments.over_head_costs,
	sales.total_sales AS product_sales,
	ROUND(sales.total_sales - departments.over_head_costs, 2) AS total_profit
FROM
(
	SELECT department_name, ROUND(SUM(product_sales), 2) AS total_sales
	FROM products
	GROUP BY department_name
) AS sales
INNER JOIN 
	departments
ON
	sales.department_name = departments.department_name;`,
		function (error, response) {
			if (error) throw error;
			for (i = 0; i < response.length; i++) {
				table.push([{
						hAlign: 'center',
						content: response[i].department_id.toString().green
					},
					response[i].department_name.toString(),
					{
						hAlign: 'right',
						content: response[i].over_head_costs.toFixed(2).red.underline
					},
					{
						hAlign: 'right',
						content: response[i].product_sales.toFixed(2).grey
					},
					{
						hAlign: 'right',
						content: response[i].total_profit.toFixed(2).gray
					}
				]);
			}
			console.log(table.toString());
			start();
		});
}

function createDepartment() {
	inquirer.prompt([{
        name: "departmentName",
        type: "input",
        message: "Enter name of new Department ?",
    }, {
        name: "overheadCosts",
        type: "input",
        message: "Enter over head cost ?",
    }]).then(function (answer) {
		connection.query("INSERT INTO departments SET ?", {
			department_name: answer.departmentName,
			over_head_costs: answer.overheadCosts
		}, function (error) {
			if (error) throw error;

			connection.query('SELECT * FROM departments', function (error, response) {
				if (error) throw error;
				var line = response[response.length - 1];
				console.log(`\nYou added the new ${line.department_name} Department with Department ID# ${line.department_id}.\n`);
				start();
			});
		});
	});
}