const fs = require("fs");
const path = require("path");

const expenseFilePath = path.join(__dirname, "expense.json");

// Function to read expense from the JSON file
function readExpense() {
    if (fs.existsSync(expenseFilePath)) {
      const data = fs.readFileSync(expenseFilePath, "utf8");
      return JSON.parse(data);
    }
    return [];
  }


// Function to write expense to the JSON file
function writeExpense(expense) {
    fs.writeFileSync(expenseFilePath, JSON.stringify(expense, null, 2), "utf8");
  }
  

// Function to get the next unique ID and use deleted id too if available
function getNextId(expense) {
    const ids = expense.map((expense) => expense.id);
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
    const expense = readExpense();
    const newExpense = {
      id: getNextId(expense),
      description: description,
      amount: amount,
    };
    expense.push(newExpense);
    writeExpense(expense);
    console.log(
      `${colors.green}Expense added successfully! (ID: ${newExpense.id})${colors.reset}`
    );
  }