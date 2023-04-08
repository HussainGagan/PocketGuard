import React from "react";
import { redirect, useActionData } from "react-router-dom";

// library
import { toast } from "react-toastify";

import { deleteItem } from "../helper";

export async function logoutAction() {
  // delete the user
  deleteItem({ key: "username" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });

  toast.success("You've deleted your account!");

  // return redirect
  return redirect("/");
}
