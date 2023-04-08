import React from "react";
import { createExpense, deleteItem, getAllMatchingItems } from "../helper";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export function budgetLoader({ params }) {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }

  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense Deleted!`);
    } catch (e) {
      throw new Error("There was a problem in deleting your expense");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} Added!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense");
    }
  }
}

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}
