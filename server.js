const express = require('express');
const inquirer = require('inquirer');
const routes = require('./routes/api');
const fetch = require('node-fetch');
// const Employee = require('./classes/Employee');
// const Department = require('./classes/Department');
// const Role = require('./classes/Role');
// const Manager = require('./classes/Manager')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(routes);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const rolesAddQuestions = [{
        type: 'input',
        message: 'what is the role name?',
        name: 'role name'
    },
    {
        type: 'input',
        message: 'what is the salary?',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'what is the department id',
        name: 'department'
    }
]

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


function viewDepartments() {
    fetch('http://localhost:3001/api/all-departments')
        .then(results => { return results })
};

function viewRoles() {
    fetch('http://localhost:3001/api/all-roles')
        .then(results => { return results })
};

function addDepartment() {
    fetch('http://localhost:3001/api/add-department')
        .then(results => { return results })
}

function addRole() {
    fetch('http://localhost:3001/api/add-role')
        .then(results => { return results })
};

function addEmployee() {
    fetch('http://localhost:3001/api/add-employee')
        .then(results => { return results })
};

function initClient() {
    inquirer.prompt(startQuestion)
        .then((response) => {
            if (response.title === "view all departments") {
                viewDepartments();
            } else if (response.title === "view all roles") {
                viewRoles();
            } else if (response.title === "view all employees") {
                //show employees, roles, departments, managers
            } else if (response.title === "add a department") {
                inquirer.prompt(departmentAddQuestions)
                    .then((response) => {
                        addDepartment();
                        viewDepartments();
                        initClient();
                    })
            } else if (response.title === "add a role") {
                inquirer.prompt(rolesAddQuestions)
                    .then((response) => {
                        addRole();
                        viewRoles();
                    });
            } else if (response.title === "add an employee") {
                inquirer.prompt(employeeAddQuestions)
                    .then((response) => {
                        addEmployee();
                    })
            } else {
                inquirer.prompt(updateEmployee)
                    .then((response) => {
                        updateEmployee();
                        // make updateEmployee variable
                        //make updateEmployee function
                    })
            }
        })
};

initClient();