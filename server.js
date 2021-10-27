const mysql2 = require('mysql2');
const db = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootuser',
        database: 'employee_db'
    },
    console.log("database connected!")
);
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);


app.get("/api/all-departments", (req, res) => {
    db.query('SELECT * FROM departments', function(err, result) {
        res.json(result);
    })
});

app.get("/api/all-roles", (req, res) => {
    db.query('SELECT * FROM roles', 'JOIN roles ON departments.id = roles.department_id', function(err, result) {
        res.json(result);
    })
});
app.get('/api/all-employees', (req, res) => {
    db.query('SELECT * FROM employee', function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/api/add-department", (req, res) => {
    console.log('req.body :>> ', req.body);
    let name = req.body.department_name;
    db.query(`INSERT INTO departments (department_name) VALUES ('${name}')`, name, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});


app.post("/api/add-role", (req, res) => { // adds a route to the server once the function addRole() is called
    console.log(req.body);
    let title = req.body.title;
    let salary = Number.parseInt(req.body.salary);
    let department = Number.parseInt(req.body.department_id);
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES('${title}', '${salary}', '${department}')`, [title, salary, department], function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

app.post("/api/add-employee", (req, res) => {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let role = Number.parseInt(req.body.role_id);
    let manager = Number.parseInt(req.body.manager_id);
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${firstName}', '${lastName}', '${role}', '${manager}')`, [firstName, lastName, role, manager], function(err, result) {

        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

module.exports = app;