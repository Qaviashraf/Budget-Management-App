import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useReducer, createContext } from "react";
import { initialState, reducer } from "./reducer/Auth";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Main, { mainLoader } from "./layouts/main";

// Actions
// import { logoutAction } from "./action/logout";
import { deleteBudget } from "./action/deleteBudget";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import { Signup } from "./pages/SignUp";
import { ForgetPassword } from "./pages/ForgetPassword";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";

import Logout from "./component/Logout";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          action: budgetAction,
          errorElement: <Error />,
          children: [
            {
              path: "delete",
              action: deleteBudget,
            },
          ],
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action: expensesAction,
          errorElement: <Error />,
        },
        {
          path: "signin",
          element: <SignIn />,
          errorElement: <Error />,
        },
        {
          path: "signup",
          element: <Signup />,
          errorElement: <Error />,
        },
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
          errorElement: <Error />,
        },
        {
          path: "logout",
          element: <Logout/>,
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
