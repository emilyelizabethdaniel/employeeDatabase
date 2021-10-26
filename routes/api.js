const router = require('express').Router();
const mysql2 = require('mysql2');
const db = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootuser',
        database: 'employee_db'
    },
    console.log("database connected!")
);


router.get("/api/all-departments", (req, res) => {
    db.query('SELECT * FROM departments', function(err, results) {
        res.json(results);
        console.table(results);
    })
});


router.get("/api/all-roles", (req, res) => {
    db.query('SELECT * FROM roles', 'JOIN roles ON departments.id = roles.department_id', function(err, results) {
        res.json(results);
        console.table(results);
    })
});



router.post("/api/add-department", (req, res) => {
    let name = req.body.department_name;
    db.query(`INSERT INTO departments (department_name) VALUES ('${name}')`, name, function(err, result) {
        console.log(result)
        if (err) {
            res.json(err)
        } else {
            res.json("Success!")
        }
    })
});



router.post("/api/add-role", (req, res) => { // adds a route to the server once the function addRole() is called
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
});



router.post("/api/add-employee", (req, res) => {
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
});

module.exports = router;