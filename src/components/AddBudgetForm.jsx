import React, { useEffect, useRef } from "react";

import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Form, useFetcher } from "react-router-dom";

export default function AddBudgetForm() {
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
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form ref={formRef} className="grid-sm" method="post">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            ref={focusRef}
            type="text"
            id="newBudget"
            name="newBudget"
            placeholder="e.g., Groceries"
            required
          />
        </div>

        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            id="newBudgetAmount"
            name="newBudgetAmount"
            placeholder="e.g., ₹2500"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
