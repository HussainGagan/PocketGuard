import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helper";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

export function expenseLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expenseAction({ request }) {
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
}

export default function ExpensePage() {
  const { expenses } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>{" "}
          </h2>
          <Table
            expenses={expenses.sort((a, b) => {
              return b.createdAt - a.createdAt;
            })}
          />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
      <button className="btn btn--dark" onClick={() => navigate(-1)}>
        <ArrowUturnLeftIcon width={20} />
        <span>Go Back</span>
      </button>
    </div>
  );
}
