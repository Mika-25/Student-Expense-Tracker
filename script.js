// ================================
// VARIABLES
// ================================

let budget = Number(localStorage.getItem("budget")) || 0;

let expenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];


// ================================
// SET BUDGET
// ================================

function setBudget() {

    const budgetInput = document.getElementById("budgetInput");

    const amount = Number(budgetInput.value);

    if (amount <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    budget = amount;

    localStorage.setItem("budget", budget);

    budgetInput.value = "";

    updateDashboard();
}


// ================================
// ADD EXPENSE
// ================================

function addExpense() {

    const name = document.getElementById("expenseName").value;
    const amount = Number(
        document.getElementById("expenseAmount").value
    );
    const category = document.getElementById(
        "expenseCategory"
    ).value;
    const date = document.getElementById(
        "expenseDate"
    ).value;


    if (name === "" || amount <= 0 || date === "") {

        alert("Please fill all expense details.");

        return;
    }


    const expense = {

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date: date

    };


    expenses.push(expense);


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";

    document.getElementById("expenseDate").value = "";


    updateDashboard();

    displayExpenses();
}


// ================================
// DELETE EXPENSE
// ================================

function deleteExpense(id) {

    expenses = expenses.filter(
        expense => expense.id !== id
    );


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    updateDashboard();

    displayExpenses();
}


// ================================
// UPDATE DASHBOARD
// ================================

function updateDashboard() {

    const totalSpent = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );


    const remaining = budget - totalSpent;


    document.getElementById(
        "totalBudget"
    ).textContent = budget.toFixed(2);


    document.getElementById(
        "totalSpent"
    ).textContent = totalSpent.toFixed(2);


    document.getElementById(
        "remainingBalance"
    ).textContent = remaining.toFixed(2);
}


// ================================
// DISPLAY EXPENSES
// ================================

function displayExpenses() {

    const expenseList = document.getElementById(
        "expenseList"
    );


    const filter = document.getElementById(
        "filterCategory"
    ).value;


    let filteredExpenses = expenses;


    if (filter !== "All") {

        filteredExpenses = expenses.filter(
            expense => expense.category === filter
        );

    }


    if (filteredExpenses.length === 0) {

        expenseList.innerHTML = `
            <div class="empty-message">
                No expenses found.
            </div>
        `;

        return;
    }


    expenseList.innerHTML = "";


    filteredExpenses
        .slice()
        .reverse()
        .forEach(expense => {

            const item = document.createElement("div");

            item.className = "expense-item";


            item.innerHTML = `

                <div class="expense-details">

                    <h3>${expense.name}</h3>

                    <p>
                        ${expense.category} • ${expense.date}
                    </p>

                </div>


                <div class="expense-right">

                    <span class="expense-amount">
                        ₹${expense.amount.toFixed(2)}
                    </span>

                    <button
                        class="delete-button"
                        onclick="deleteExpense(${expense.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            expenseList.appendChild(item);

        });
}


// ================================
// LOAD SAVED DATA
// ================================

function loadData() {

    document.getElementById(
        "totalBudget"
    ).textContent = budget.toFixed(2);


    updateDashboard();

    displayExpenses();
}


// Run when page opens

loadData();


// Set today's date automatically

document.getElementById("expenseDate").value =
    new Date().toISOString().split("T")[0];