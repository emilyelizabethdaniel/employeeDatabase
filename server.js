const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootuser',
        database: 'employee_db'
    },
    console.log("database connected!")
);

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);

const startQuestion = [{
    type: 'list',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee'],
    name: 'title'
}];

const departmentAddQuestions = [{
    type: 'input',
    message: 'what is the name of the department you would like to add?',
    name: 'new department'
}];

const employeeAddQuestions = [{
        type: 'input',
        message: 'What is the employees first name?',
        name: 'fname'
    },
    {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'lname'
    },
    {
        type: 'input',
        message: 'What is the employees role?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'What is the employees manager?',
        name: 'manager'

    },
];

inquirer.prompt(startQuestion)
    .then((response) => {
        let choice = response.title;
        console.log(choice);
    })