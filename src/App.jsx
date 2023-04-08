import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensePage, { expenseAction, expenseLoader } from "./pages/ExpensePage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Main />}
      loader={mainLoader}
      errorElement={<Error />}
    >
      <Route
        index
        element={<Dashboard />}
        loader={dashboardLoader}
        errorElement={<Error />}
        action={dashboardAction}
      />
      <Route
        path="/expenses"
        element={<ExpensePage />}
        loader={expenseLoader}
        errorElement={<Error />}
        action={expenseAction}
      />
      <Route
        path="/budget/:id"
        element={<BudgetPage />}
        errorElement={<Error />}
        loader={budgetLoader}
        action={budgetAction}
      >
        <Route path="delete" action={deleteBudget} />
      </Route>
      <Route path="/logout" action={logoutAction} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
