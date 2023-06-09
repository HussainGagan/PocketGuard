export const wait = function () {
  return new Promise((res) => setTimeout(res, Math.random() * 2000));
};

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const deleteItem = ({ key, id }) => {
  if (id) {
    const existingData = fetchData(key);
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const deleteBudgetExpense = (budgetId) => {
  const expenses = fetchData("expenses");
  const newData = expenses.filter((expense) => expense.budgetId !== budgetId);
  return localStorage.setItem("expenses", JSON.stringify(newData));
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const existingBudgets = fetchData(category) ?? [];
  return existingBudgets.filter((budget) => budget[key] === value);
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  return expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return (acc += expense.amount);
  }, 0);
};

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString("en-GB");

// FORMAT currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};
