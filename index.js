const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const Department = require("./Library/Department");
const Employee = require("./Library/Employee");
const Role = require("./Library/Role");
const cTable = require('console.table')

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
        Choices: ["select a table", "edit a table", "quit"],
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
      db.query(`SELECT * FROM ${answer.table}`, function(err, results){
      console.log(results)
        letsBegin()
    },});
}

function editTable() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "what would you like to edit?",
            name:"edit",
            choices: ["add department", "add role", "add employee", "update employee", "back"]

        },
    ])
    .then((answers) => {
        console.log(answers.edit)
        switch (answers.edit) {
            case "add department":
                addDepartment()
                break;
            case "add role":
                addRole()
                break;
            case "add employee":
                addEmployee()
                break;
            case "update employee":
                update()
                break;
        
            default:
                letsBegin()
                break;
        }
    })
}

function addDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            message:"please input department ID",
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
        let department = new Department(
            answers.id,
            answers.department_name
        )
        console.log(department);
        letsBegin()
    })
}

function addRole(){
    inquirer
    .prompt([
        {
            type:"input",
            message:"please input role id",
            name: "id",
        },
        {
            type:"input",
            message:"pleases input role title",
            name:"title",
        },
        {
            type:"input",
            message:"please input salary, in decimal form",
            name:"salary",

        },
        {
            type: "input",
            message: "please enter a department for this role",
            name:"department",
        },
        
    ])
    .then((answers) => {
        console.log(answers);
        let role = new Role(answers.id, answers.title, answers.salary, answers.department);
        console.log(role)
        letsBegin();
    })
}

function addEmployee(){
    inquirer
    .prompt([
        {
            type:"input", 
            message:"please input employee id",
            name:"id",
        },
        {
            type:"input",
            message:"please input employee first name",
            name:"first_name",
            
        },
        {
            type: "input",
            message: "please input employee last name",
            name:"last_name",

        },
        {
            type: "input",
            message: "please input employee role",
            name:"role",
        },
        {
            type:"input",
            message:"please input the id of the manager this employee reports to, if they are a manager, enter null",
            name:"manager",
        },
    ])
    .then((answers) => {
        console.log(answers);
        let employee = new Employee(answers.id,
            answers.first_name,
            answers.last_name,
            answers.role,
            answers.manager
            )
    console.log(employee)
    letsBegin()
    })
}


function endProgram(){
    console.log("goodbye")
}