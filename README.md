# Phase--1-Final-project
# Budget Tracker

A simple web application to track incomes and expenses, built with HTML, CSS, and JavaScript. This application uses JSON Server to manage the backend data.

## Features

- Add, edit, and delete incomes and expenses.
- View the total balance, incomes, and expenses.
- Search through incomes and expenses.
- Responsive design for a better user experience on different devices.



## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

   git clone https://github.com/yourusername/budget-tracker.git
   
   cd budget-tracker
   
Install JSON Server:

   
   npm install -g json-server

Create a db.json file in the project directory with the following content:

**json**

{
  "incomes": [
    {
      "id": "b63b",
      "description": "youtube",
      "amount": 300,
      "date": "2001-02-22"
    },
    {
      "id": "0daf",
      "description": "Football",
      "amount": 100,
      "date": "2000-02-28"
    }
  ],
  "expenses": [
    {
      "id": "d14c",
      "description": "chocolate",
      "amount": 200,
      "date": "2022-02-14"
    }
  ]
}

### **Start JSON Server:**


json-server --watch db.json

This will host your JSON server at http://localhost:3000.

**Open index.html in your browser to use the application.**

**Usage**
Add Income: Use the "Add Income" form to add a new income entry.
Add Expense: Use the "Add Expense" form to add a new expense entry.
Edit/Delete: Use the "Edit" and "Delete" buttons next to each entry to modify or remove it.
Search: Use the search input to filter through the income and expense entries.

**Files**
**index.html:** The main HTML file for the application.
**style.css: **The CSS file for styling the application.
**app.js: **The main JavaScript file for handling the application's logic.
**db.json:** The JSON Server database file.

**Development**
Starting the JSON Server

sh
json-server --watch db.json

**Opening the Application**

Open **index.html** in your browser.

Contributions
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

