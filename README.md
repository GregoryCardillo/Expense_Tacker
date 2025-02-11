Expense Tracker

roadmap.sh ulr = https://roadmap.sh/projects/expense-tracker

Expense Tracker is a simple command-line application for managing your expenses. You can add, update, delete, and summarize your expenses, which are stored in a JSON file.

Features

Add new expenses with a description and amount

Update an expense's description

Delete expenses by ID

View a summary of all recorded expenses

Installation

Make sure you have Node.js installed.

Clone the repository:

git clone https://github.com/your-repo/expense-tracker.git

Navigate to the project folder:

cd expense-tracker

Install dependencies:

npm install

Usage

Run the CLI using:

node expense-tracker.js <command> [options]

Commands

Add a new expense:

node expense-tracker.js add "Dinner" 25.50

Update an expense description:

node expense-tracker.js update 1 "Lunch"

Delete an expense:

node expense-tracker.js delete 1

View expense summary:

node expense-tracker.js summary

Data Storage

Expenses are stored in a JSON file (expense.json) in the project directory.

License

This project is open-source and available under the MIT License.