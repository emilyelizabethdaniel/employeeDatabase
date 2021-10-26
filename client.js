const inquirer = require('inquirer');
const fetch = require('node-fetch')

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
    return fetch('http://localhost:3001/api/all-departments')
        .then(results => { return results })
};

function viewRoles() {
    return fetch('http://localhost:3001/api/all-roles')
        .then(results => { return results })
};

function addDepartment() {
    return fetch('http://localhost:3001/api/add-department')
        .then(results => { return results })
}

function addRole() {
    return fetch('http://localhost:3001/api/add-role')
        .then(results => { return results })
};

function addEmployee() {
    return fetch('http://localhost:3001/api/add-employee')
        .then(results => { return results })
};

const goAgain = () => inquirer.prompt({
        type: 'list',
        message: 'do you want to do something else?',
        choices: ["yes", "no"],
        name: 'again'
    })
    .then(response => {
        if (response.again === 'yes') {
            initClient();
        }
    });

function initClient() {
    inquirer.prompt(startQuestion)
        .then((response) => {
            if (response.title === "view all departments") {
                viewDepartments()
                    .then(goAgain);
            } else if (response.title === "view all roles") {
                viewRoles()
                    .then(goAgain);
            } else if (response.title === "view all employees") {
                console.log("Not yet inmplemented");
                goAgain();
                //show employees, roles, departments, managers
            } else if (response.title === "add a department") {
                inquirer.prompt(departmentAddQuestions)
                    .then((response) => {
                        addDepartment();
                        viewDepartments();
                    })
                    .then(goAgain);
            } else if (response.title === "add a role") {
                inquirer.prompt(rolesAddQuestions)
                    .then((response) => {
                        addRole();
                        viewRoles()
                    })
                    .then(goAgain);
            } else if (response.title === "add an employee") {
                inquirer.prompt(employeeAddQuestions)
                    .then((response) => {
                        addEmployee()
                    })
                    .then(goAgain);
            } else {
                inquirer.prompt(updateEmployee)
                    .then((response) => {
                        updateEmployee();
                        // make updateEmployee variable
                        //make updateEmployee function
                    })
                    .then(goAgain);
            }
        })
};

initClient();