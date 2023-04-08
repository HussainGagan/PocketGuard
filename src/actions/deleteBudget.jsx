import { toast } from "react-toastify";
import { deleteBudgetExpense, deleteItem } from "../helper";
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    deleteBudgetExpense(params.id);

    toast.success("Budget deleted successfully!");
    return redirect("/");
  } catch (err) {
    throw new Error("There was a problem deleting your budget");
  }
}
