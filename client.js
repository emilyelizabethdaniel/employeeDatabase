const inquirer = require('inquirer');
const fetch = require('node-fetch');

const startQuestion = [{
    type: 'list',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee'],
    name: 'title'
}];

const departmentAddQuestions = [{
    type: 'input',
    message: 'what is the name of the department you would like to add?',
    name: 'newDepartment'
}];

const rolesAddQuestions = [{
        type: 'input',
        message: 'what is the role name?',
        name: 'roleName'
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
        .then(response => response.json())
        .then(data => console.table(data));
};

function viewRoles() {
    return fetch('http://localhost:3001/api/all-roles')
        .then(response => response.json())
        .then(data => console.table(data));
};

function viewEmployees() {
    return fetch('http://localhost:3001/api/all-employees')
        .then(response => response.json())
        .then(data => console.table(data));
};

function addDepartment(departmentName) {
    return fetch('http://localhost:3001/api/add-department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                department_name: departmentName
            }),
        })
        .then(response => response.json())
        .then(data => console.table(data));
}

function addRole(title, salary, departmentId) {
    console.log('find the bitch');
    const data = {
        title: title,
        salary: salary,
        department_id: departmentId
    }
    console.log(data);
    return fetch('http://localhost:3001/api/add-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.table(data));

};

function addEmployee(firstName, lastName, roleId, managerId) {
    return fetch('http://localhost:3001/api/add-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: managerId
            })
        })
        .then(response => response.json())
        .then(data => console.table(data));
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
                    .then((results) => {

                        console.table(results);
                        goAgain();
                    });
            } else if (response.title === "view all roles") {
                viewRoles()
                    .then(goAgain);
            } else if (response.title === "view all employees") {
                viewEmployees()
                    .then(goAgain);

                //show employees, roles, departments, managers
            } else if (response.title === "add a department") {
                inquirer.prompt(departmentAddQuestions)
                    .then((response) => {
                        addDepartment(response.newDepartment)
                            .then(viewDepartments)
                    })
                    .then(goAgain);
            } else if (response.title === "add a role") {
                inquirer.prompt(rolesAddQuestions)
                    .then((response) => {
                        addRole(response.roleName, response.salary, response.department);
                        viewRoles()
                    })
                    .then(goAgain);
            } else if (response.title === "add an employee") {
                inquirer.prompt(employeeAddQuestions)
                    .then((response) => {
                        addEmployee(response.fname, response.lname, response.role, response.manager)
                    })
                    .then(goAgain);
            } else {
                inquirer.prompt(updateEmployee)
                    .then((response) => {
                        updateEmployee(response.fname, response.lname, response.role, response.manager);
                        // make updateEmployee variable
                        //make updateEmployee function
                    })
                    .then(goAgain);
            }
        })
};

initClient();