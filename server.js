const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
// const Employee = require('./classes/Employee');
// const Department = require('./classes/Department');
// const Role = require('./classes/Role');
// const Manager = require('./classes/Manager')

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
    app.get("/api/all-departments", (req, res) => {
        db.query('SELECT * FROM departments', function(err, results) {
            const viewDep = res.json(results)
            console.log(results);
        })
    })
};

function viewRoles() {
    app.get("/api/all-roles", (req, res) => {
        db.query('SELECT * FROM roles', 'JOIN roles ON departments.id = roles.department_id', function(err, results) {
            res.json(results);
            console.log(results);
        })
    })
};

function addDepartment() {
    app.post("/api/add-department", (req, res) => {
        let name = req.body.department_name;
        db.query(`INSERT INTO departments (department_name) VALUES ('${name}')`, name, function(err, result) {
            console.log(result)
            if (err) {
                res.json(err)
            } else {
                res.json("Success!")
            }
        })
    })
}

function addRole() {
    app.post("/api/add-role", (req, res) => {
        let title = req.body.title;
        let salary = req.body.salary;
        let department = req.body.department_id;
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES('${title}', '${salary}', '${department}')`, [title, salary, department], function(err, result) {
            console.log(result)
            if (err) {
                res.json(err)
            } else {
                res.json("Success!")
            }
        })
    })
};

function addEmployee() {
    app.post("/api/add-employee", (req, res) => {
        let firstName = req.body.first_name;
        let lastName = req.body.last_name;
        let role = req.body.role_id;
        let manager = req.body.manager_id;
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${firstName}', '${lastName}', '${role}', '${manager}')`, [firstName, lastName, role, manager], function(err, result) {
            console.log(result)
            if (err) {
                res.json(err)
            } else {
                res.json("Success!")
            }
        })
    })
}

function init() {
    inquirer.prompt(startQuestion)
        .then((response) => {
            // let choice = response.title;

            if (response.title === "view all departments") {
                viewDepartments();
            } else if (response.title === "view all roles") {
                viewRoles();
            } else if (response.title === "add a department") {
                inquirer.prompt(departmentAddQuestions)
                    .then((response) => {
                        addDepartment();
                        viewDepartments();
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
            }
        })
};

init();