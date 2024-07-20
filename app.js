document.addEventListener("DOMContentLoaded", () => {
    fetchIncomes();
    fetchExpenses();
    updateBalance();

    // Event listeners for forms and search
    document.getElementById("income-form").addEventListener("submit", addIncome);
    document.getElementById("expense-form").addEventListener("submit", addExpense);
    document.getElementById("search").addEventListener("input", searchItems);
});

// Fetch and display incomes
const fetchIncomes = async () => {
    const response = await fetch("http://localhost:3000/incomes");
    const incomes = await response.json();
    displayIncomes(incomes);
};

// Fetch and display expenses
const fetchExpenses = async () => {
    const response = await fetch("http://localhost:3000/expenses");
    const expenses = await response.json();
    displayExpenses(expenses);
};

// Display incomes
const displayIncomes = (incomes) => {
    const incomeList = document.getElementById("income-list");
    incomeList.innerHTML = "";
    incomes.forEach(income => {
        const incomeItem = document.createElement("li");
        incomeItem.className = "income-item";
        incomeItem.innerHTML = `
            <span>${income.description} - $${income.amount} - ${income.date}</span>
            <button class="edit-btn" data-id="${income.id}" data-type="income">Edit</button>
            <button class="delete-btn" data-id="${income.id}" data-type="income">Delete</button>
        `;
        incomeList.appendChild(incomeItem);
    });

    // Event listeners for edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", editItem);
    });
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", deleteItem);
    });
};

// Display expenses
const displayExpenses = (expenses) => {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const expenseItem = document.createElement("li");
        expenseItem.className = "expense-item";
        expenseItem.innerHTML = `
            <span>${expense.description} - $${expense.amount} - ${expense.date}</span>
            <button class="edit-btn" data-id="${expense.id}" data-type="expense">Edit</button>
            <button class="delete-btn" data-id="${expense.id}" data-type="expense">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });

    // Event listeners for edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", editItem);
    });
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", deleteItem);
    });
};

// Add new income
const addIncome = async (event) => {
    event.preventDefault();
    const description = document.getElementById("income-description").value;
    const amount = parseFloat(document.getElementById("income-amount").value);
    const date = document.getElementById("income-date").value;

    const newIncome = { description, amount, date };

    await fetch("http://localhost:3000/incomes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newIncome)
    });

    fetchIncomes();
    updateBalance();
    document.getElementById("income-form").reset();
};

// Add new expense
const addExpense = async (event) => {
    event.preventDefault();
    const description = document.getElementById("expense-description").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;

    const newExpense = { description, amount, date };

    await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
    });

    fetchExpenses();
    updateBalance();
    document.getElementById("expense-form").reset();
};

// Update balance
const updateBalance = async () => {
    const incomeResponse = await fetch("http://localhost:3000/incomes");
    const incomes = await incomeResponse.json();
    const expenseResponse = await fetch("http://localhost:3000/expenses");
    const expenses = await expenseResponse.json();

    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const balance = totalIncome - totalExpense;

    document.getElementById("balance-amount").textContent = balance.toFixed(2);
};

// Search incomes and expenses
const searchItems = async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const incomeResponse = await fetch("http://localhost:3000/incomes");
    const incomes = await incomeResponse.json();
    const expenseResponse = await fetch("http://localhost:3000/expenses");
    const expenses = await expenseResponse.json();

    const filteredIncomes = incomes.filter(income => 
        income.description.toLowerCase().includes(searchTerm)
    );
    const filteredExpenses = expenses.filter(expense => 
        expense.description.toLowerCase().includes(searchTerm)
    );

    displayIncomes(filteredIncomes);
    displayExpenses(filteredExpenses);
};

// Edit income or expense
const editItem = async (event) => {
    const itemId = event.target.dataset.id;
    const itemType = event.target.dataset.type;
    const url = `http://localhost:3000/${itemType}s/${itemId}`;
    
    // Fetch the current item data
    const response = await fetch(url);
    const item = await response.json();

    // Prompt user for new values
    const newDescription = prompt("Enter new description:", item.description);
    const newAmount = parseFloat(prompt("Enter new amount:", item.amount));
    const newDate = prompt("Enter new date:", item.date);

    // Update item data
    const updatedItem = { description: newDescription, amount: newAmount, date: newDate };

    await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedItem)
    });

    if (itemType === "income") {
        fetchIncomes();
    } else {
        fetchExpenses();
    }
    updateBalance();
};

// Delete income or expense
const deleteItem = async (event) => {
    const itemId = event.target.dataset.id;
    const itemType = event.target.dataset.type;
    const url = `http://localhost:3000/${itemType}s/${itemId}`;

    await fetch(url, {
        method: "DELETE"
    });

    if (itemType === "income") {
        fetchIncomes();
    } else {
        fetchExpenses();
    }
    updateBalance();
};
