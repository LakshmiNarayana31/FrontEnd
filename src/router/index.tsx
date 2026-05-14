import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

// Auth Pages
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

// Dashboard
import DashboardPage from "../pages/Dashboard";

// Employee Pages
import EmployeesPage from "../pages/Employees";
import AddEmployeePage from "../pages/Employees/AddEmployee";
import EditEmployeePage from "../pages/Employees/EditEmployee";
import ViewEmployeePage from "../pages/Employees/ViewEmployee";

// Attendance & Leave
import AttendancePage from "../pages/Attendance";
import LeavePage from "../pages/Leave";

// User Pages
import ProfilePage from "../pages/Profile";
import SettingsPage from "../pages/Settings";

const router = createBrowserRouter([
  // Auth routes (no layout, no protection)
  { path: "/login",    element: <LoginPage />    },
  { path: "/register", element: <RegisterPage /> },

  // Protected routes (with layout)
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      // Redirect root to dashboard
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // Dashboard
      { path: "dashboard", element: <DashboardPage /> },

      // Employees
      { path: "employees",             element: <EmployeesPage />     },
      { path: "employees/add",         element: <AddEmployeePage />   },
      { path: "employees/edit/:id",    element: <EditEmployeePage />  },
      { path: "employees/:id",         element: <ViewEmployeePage />  },

      // Attendance & Leave
      { path: "attendance", element: <AttendancePage /> },
      { path: "leave",      element: <LeavePage />      },

      // User Profile & Settings
      { path: "profile",  element: <ProfilePage />  },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

export default router;
