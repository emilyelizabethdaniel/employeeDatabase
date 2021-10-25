class Employee {
    constructor(firstname, lastname, role, salary, manager = null) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.salary = salary;
        this.manager = manager;
    }
    view();

    add();

    update();

};


module.exports = Employee;