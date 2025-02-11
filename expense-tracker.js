const { program } = require("commander");
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  reset: "\x1b[0m"
};
const fs = require("fs");
const path = require("path");

const date = require('date-and-time'); 
const now = new Date(); 
const fixedDate = new Date(now.getFullYear(), now.getMonth(), 11); 
const newDate = date.addMonths(fixedDate, 2); 

console.log(newDate.toISOString()); 
const expenseFilePath = path.join(__dirname, "expense.json");

// Function to read expenses from the JSON file
function readExpense() {
  if (fs.existsSync(expenseFilePath)) {
    const data = fs.readFileSync(expenseFilePath, "utf8");
    return JSON.parse(data);
  }
  return [];
}

// Function to write expenses to the JSON file
function writeExpense(expenses) {
  fs.writeFileSync(expenseFilePath, JSON.stringify(expenses, null, 2), "utf8");
}

// Function to get the next unique ID, reusing deleted IDs if available
function getNextId(expenses) {
  const ids = expenses.map((expense) => expense.id);
  ids.sort((a, b) => a - b);
  let nextId = 1;
  for (const id of ids) {
    if (id !== nextId) break;
    nextId += 1;
  }
  return nextId;
}

// Function to add a new expense
  function addExpense(description, amount) {
  const expenses = readExpense();
  const now = new Date();
  const formattedDate = date.format(now, 'YYYY-MM-DD'); // 
  
  const newExpense = {
    id: getNextId(expenses),
    description,
    amount: parseFloat(amount),
    date: formattedDate,
  };
  expenses.push(newExpense);
  writeExpense(expenses);
  console.log(
    `${colors.green}Expense added successfully! (ID: ${newExpense.id})${colors.reset}`
  );
}

// Function to update an expense's description
function updateExpense(id, newDescription) {
  const expenses = readExpense();
  const expense = expenses.find((exp) => exp.id === parseInt(id));

  if (expense) {
    expense.description = newDescription;
    writeExpense(expenses);
    console.log(
      `${colors.green}Expense ID ${id} updated successfully!${colors.reset}`
    );
  } else {
    console.log(`${colors.red}Expense with ID ${id} not found.${colors.reset}`);
  }
}

// Function to delete an expense
function deleteExpense(id) {
  const expenses = readExpense();
  const newExpenses = expenses.filter((exp) => exp.id !== parseInt(id));

  if (newExpenses.length < expenses.length) {
    writeExpense(newExpenses);
    console.log(
      `${colors.green}Expense ID ${id} deleted successfully!${colors.reset}`
    );
  } else {
    console.log(`${colors.red}Expense with ID ${id} not found.${colors.reset}`);
  }
}

//Function to view a summary of all expenses
function summaryExpenses() {
  const expenses = readExpense()
  if (expenses.length === 0) {
    console.log(`${colors.red}No expenses recorded.${colors.reset}`);
    return;
  }
  console.log(`${colors.green}Expense Summary:${colors.reset}`);
  expenses.forEach(exp => {
    console.log(
      `ID:${exp.id}, Descrtiption: ${exp.description}, Amount: €${exp.amount} Data:${value}`
    );
  });
}

// Command-line interface setup
program
  .command("add <description> <amount>")
  .description("Add a new expense")
  .action(addExpense);

program
  .command("update <id> <newDescription>")
  .description("Update an expense description")
  .action(updateExpense);

program
  .command("delete <id>")
  .description("Delete an expense by ID")
  .action(deleteExpense);

program
  .command("summary")
  .description("Show a summary of all expenses")
  .action(summaryExpenses);

program.parse(process.argv);

