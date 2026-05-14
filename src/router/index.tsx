import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ListUsersPage from "../pages/ListUsers";
import AddUserPage from "../pages/AddUser";
import EditUserPage from "../pages/EditUser";
import DeleteUserPage from "../pages/DeleteUser";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const router = createBrowserRouter([
  // Auth routes (no layout)
  { path: "/login",    element: <LoginPage />    },
  { path: "/register", element: <RegisterPage /> },

  // Protected routes (with layout)
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true,              element: <Navigate to="/users" replace /> },
      { path: "users",            element: <ListUsersPage />   },
      { path: "users/add",        element: <AddUserPage />     },
      { path: "users/edit/:id",   element: <EditUserPage />    },
      { path: "users/delete/:id", element: <DeleteUserPage />  },
    ],
  },
]);

export default router;
