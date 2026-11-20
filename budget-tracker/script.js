const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('budget-input');
const expenseForm = document.getElementById('expense-form');
const expenseTitle = document.getElementById('expense-title');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const totalBudgetEl = document.getElementById('total-budget');
const totalExpensesEl = document.getElementById('total-expenses');
const remainingBalanceEl = document.getElementById('remaining-balance');
const expenseTableBody = document.getElementById('expense-table-body');

let budget = localStorage.getItem('budget') ? parseFloat(localStorage.getItem('budget')) : 0;
let expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

updateDashboard();

budgetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    budget = parseFloat(budgetInput.value);
    localStorage.setItem('budget', budget);
    budgetInput.value = '';
    updateDashboard();
});

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newExpense = {
    id: Date.now(),
    title: expenseTitle.value,
    amount: parseFloat(expenseAmount.value),
    category: expenseCategory.value
    };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    expenseTitle.value = '';
    expenseAmount.value = '';
    expenseCategory.value = '';
    updateDashboard();
});

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateDashboard();
}

function updateDashboard() {
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = budget - totalSpent;
    totalBudgetEl.innerText = `₹${budget.toLocaleString('en-IN')}`;
    totalExpensesEl.innerText = `₹${totalSpent.toLocaleString('en-IN')}`;
    remainingBalanceEl.innerText = `₹${balance.toLocaleString('en-IN')}`;
            
    if (balance < 0) {
        remainingBalanceEl.parentElement.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
        remainingBalanceEl.style.color = '#f43f5e';
    } else {
        remainingBalanceEl.parentElement.style.backgroundColor = 'var(--bg-card)';
        remainingBalanceEl.style.color = 'var(--clr-balance)';
    }

    expenseTableBody.innerHTML = '';
    if (expenses.length === 0) {
        expenseTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#64748b; padding: 30px;">No expenses recorded yet.</td></tr>`;
        return;
    }

    expenses.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 500;">${item.title}</td>
            <td><span class="category-badge">${item.category}</span></td>
            <td style="font-weight: 600; color: #f1f5f9;">₹${item.amount.toLocaleString('en-IN')}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${item.id})">Delete</button></td>`;
            expenseTableBody.appendChild(row);
            });
}