// questions for inquirer
const questions = {
  addEmployee: [
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
      message: "please input the id of the manager this employee reports to",
      name: "manager_id",
    },
  ],
  begin: [
    {
      type: "list",
      message: "Welcome!, would you like to select a table or edit one?",
      name: "option",
      choices: ["select a table", "edit a table", "quit"],
    },
  ],
  tableSelection: [
    {
      type: "list",
      message: "which table would you like to view?",
      name: "table",
      choices: ["department", "role", "employee"],
    },
  ],
  editTable: [
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
  ],
  addDepartment: [
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
  ],
  addRole: [
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
  ],
  update: [
    {
      type: "input",
      message: "please enter the employee id you would like to update",
      name: "id",
    },
    {
      type: "input",
      message: "what role would you like to give the employee",
      name: "role_id",
    },
  ],
};

module.exports = questions;
