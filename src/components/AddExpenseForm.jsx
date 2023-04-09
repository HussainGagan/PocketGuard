import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

export default function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  // console.log("render: ", fetcher.state);
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New <span> {budgets.length === 1 && budgets[0].name}</span> Expense
      </h2>
      <fetcher.Form ref={formRef} className="grid-sm" method="post">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              ref={focusRef}
              type="text"
              id="newExpense"
              name="newExpense"
              placeholder="e.g., Coffee"
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              id="newExpenseAmount"
              name="newExpenseAmount"
              placeholder="e.g., ₹250"
              required
            />
          </div>
        </div>

        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Amount</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />

        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
