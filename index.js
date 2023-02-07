const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const Department = require("./Library/Department");
const Employee = require("./Library/Employee");
const Role = require("./Library/Role");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: process.env.hostcon,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  },
  console.log(`connection success.`)
);

function letsBegin() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome!, would you like to select a table or edit one?",
        name: "option",
        choices: ["select a table", "edit a table", "quit"],
      },
    ])
    .then((answer) => {
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

function tableSelection() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "which table would you like to view?",
        name: "table",
        choices: ["department", "role", "employee"],
      },
    ])
    .then((answer) => {
      console.log(answer.table);
      db.query(`SELECT * FROM ??`, answer.table, function (err, results) {
        console.table(results);
        letsBegin();
      });
    });
}

function editTable() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to edit?",
        name: "edit",
        choices: [
          "add department",
          "add role",
          "add employee",
          "update employee",
          "back",
        ],
      },
    ])
    .then((answers) => {
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

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "please input department ID",
        name: "id",
      },
      {
        type: "input",
        message: "please input department name",
        name: "department_name",
      },
    ])
    .then((answers) => {
      console.log(answers);
      let department = new Department(answers.id, answers.department_name);
      console.log(department);
      db.query(
        "INSERT INTO department (id, name) VALUES(?,?)",
        [department.id, department.name],
        (err, result) => {
          if (err) {
            console.error(err);
          }
          console.table(department);
          db.query(`SELECT * FROM department`, function (err, results) {
            console.table(results);
            letsBegin();
          });
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "please input role id",
        name: "id",
      },
      {
        type: "input",
        message: "pleases input role title",
        name: "title",
      },
      {
        type: "input",
        message: "please input salary, in decimal form",
        name: "salary",
      },
      {
        type: "input",
        message: "please enter a department for this role",
        name: "department_id",
      },
    ])
    .then((answers) => {
      console.log(answers);
      let role = new Role(
        answers.id,
        answers.title,
        answers.salary,
        answers.department_id
      );
      console.log(role);
      db.query(
        "INSERT INTO role (id, title, salary, department_id) VALUES(?,?,?,?)",
        [role.id, role.title, role.salary, role.department_id],
        (err, result) => {
          if (err) {
            console.error(err);
          }
          console.table(role);
          db.query(`SELECT * FROM role`, function (err, results) {
            console.table(results);
            letsBegin();
          });
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "please input employee id",
        name: "id",
      },
      {
        type: "input",
        message: "please input employee first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "please input employee last name",
        name: "last_name",
      },
      {
        type: "input",
        message: "please input employee role",
        name: "role_id",
      },
      {
        type: "input",
        message:
          "please input the id of the manager this employee reports to, if they are a manager, enter null",
        name: "manager_id",
      },
    ])
    .then((answers) => {
      console.log(answers);
      let employee = new Employee(
        answers.id,
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id
      );
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
          console.table(employee);
          db.query(`SELECT * FROM employee`, function (err, results) {
            console.table(results);
            letsBegin();
          });
        }
      );
    });
}

function endProgram() {
  console.log("goodbye");
  process.exit(0);
}

letsBegin();
