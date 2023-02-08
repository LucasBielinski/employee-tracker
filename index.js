// async example
// async function example() {
//   try {
//     let query =
//       "SELECT * FROM employee e RIGHT JOIN employee m ON e.manager_id = m.id";
//     const [rows, fields] = await db.promise().query(query);
//     console.table(rows);
//   } catch (error) {
//     console.log(error);
//   }
// }
// requires neccessary files for index
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const Department = require("./Library/Department");
const Employee = require("./Library/Employee");
const Role = require("./Library/Role");
const cTable = require("console.table");
const questions = require("./questions.js");

// creates connection to the database
const db = mysql.createConnection(
  {
    host: process.env.hostcon,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  },
  console.log(`connection success.`)
);
// asks to select or edit a table
function letsBegin() {
  // brings in questions from seperat files
  inquirer.prompt(questions.begin).then((answer) => {
    console.log(answer.option);
    switch (answer.option) {
      case "select a table":
        tableSelection();
        break;
      case "edit a table":
        editTable();
        break;

      default:
        endProgram();
        break;
    }
  });
}
// allows user to slect a table to view
function tableSelection() {
  inquirer.prompt(questions.tableSelection).then((answer) => {
    console.log(answer.table);
    switch (answer.table) {
      case "department":
        viewDepartment();
        break;
      case "role":
        viewRoleAll();
        break;

      default:
        viewEmployee();
        break;
    }
  });
}
// allows user to select a table to edit
function editTable() {
  inquirer.prompt(questions.editTable).then((answers) => {
    console.log(answers.edit);
    switch (answers.edit) {
      case "add department":
        addDepartment();
        break;
      case "add role":
        addRole();
        break;
      case "add employee":
        addEmployee();
        break;
      case "update employee":
        update();
        break;

      default:
        letsBegin();
        break;
    }
  });
}
// views department table
function viewDepartment() {
  db.query("SELECT * FROM department", (err, result) => {
    console.table(result);
    letsBegin();
  });
}
// views employee table
function viewEmployee() {
  // joins employee with role and department tables
  db.query(
    "SELECT employee.id, employee.first_name AS first, employee.last_name AS last, em.first_name AS 'Manager First', em.last_name AS 'Manager Last', role.title AS job, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee em ON employee.manager_id = em.id",
    (err, result) => {
      console.table(result);
      letsBegin();
    }
  );
}
// views roles
function viewRoleAll() {
  // joins role and department on primary key
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id",
    (err, result) => {
      console.table(result);
      letsBegin();
    }
  );
}
// adds a department
function addDepartment() {
  inquirer.prompt(questions.addDepartment).then((answers) => {
    console.log(answers);
    // runs answers through a class
    let department = new Department(answers.id, answers.department_name);
    console.log(department);
    // inserts answers into database
    db.query(
      "INSERT INTO department (id, name) VALUES(?,?)",
      [department.id, department.name],
      (err, result) => {
        if (err) {
          console.error(err);
        }
        // calls the table to view updated changes
        console.table(department);
        db.query(`SELECT * FROM department`, function (err, results) {
          console.table(results);
          letsBegin();
        });
      }
    );
  });
}
// adds role
function addRole() {
  inquirer.prompt(questions.addRole).then((answers) => {
    console.log(answers);
    let role = new Role(
      answers.id,
      answers.title,
      answers.salary,
      answers.department_id
    );
    console.log(role);
    // inserts role
    db.query(
      "INSERT INTO role (id, title, salary, department_id) VALUES(?,?,?,?)",
      [role.id, role.title, role.salary, role.department_id],
      (err, result) => {
        if (err) {
          console.error(err);
        }
        console.table(role);
        //calls table to view changes
        db.query(`SELECT * FROM role`, function (err, results) {
          console.table(results);
          letsBegin();
        });
      }
    );
  });
}
// adds employee
function addEmployee() {
  inquirer.prompt(questions.addEmployee).then((answers) => {
    console.log(answers);
    if (!answers.manager_id) {
      console.log("you must enter manager id");
      editTable();
    } else {
      let employee = new Employee(
        answers.id,
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id
      );
      // inserts employee
      db.query(
        "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES(?,?,?,?,?)",
        [
          employee.id,
          employee.first_name,
          employee.last_name,
          employee.role_id,
          employee.manager_id,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
          }
          // calls table
          console.table(employee);
          db.query(`SELECT * FROM employee`, function (err, results) {
            console.table(results);
            letsBegin();
          });
        }
      );
    }
  });
}
// async example
// async function addEmployeeAsync() {
//   var answers = await inquirer.prompt(questions.addEmployee);
//   try {
//     let query =
//       "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES(?,?,?,?,?)";
//     let values = [
//       answers.id,
//       answers.first_name,
//       answers.last_name,
//       answers.role_id,
//       answers.manager_id,
//     ];
//     const [rows, fields] = await db.promise().query(query, values);
//     console.log(rows);
//     viewEmps();
//   } catch (error) {
//     console.log(error);
//   }
// }
// view employee tables, no joins
function viewEmps() {
  db.query(`SELECT * FROM employee`, function (err, results) {
    console.table(results);
    letsBegin();
  });
}
// update an employee
function update() {
  // view all employee info to see which you want to select
  db.query(`SELECT * FROM employee`, function (err, results) {
    console.table(results);
    inquirer.prompt(questions.update).then((answers) => {
      console.log(answers.id);
      console.log(answers.role_id);
      db.query(
        // set role where id is selected
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.role_id, answers.id],
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            viewEmps();
          }
        }
      );
    });
  });
}
// end program
function endProgram() {
  console.log("goodbye");
  process.exit(0);
}
// calls program
letsBegin();
