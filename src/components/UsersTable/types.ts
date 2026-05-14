import type { TablePaginationConfig } from "antd/es/table";

export type Gender     = "Male" | "Female" | "Other";
export type Department = "Engineering" | "Marketing" | "Sales" | "HR" | "Finance";
export type Role       = "Admin" | "Manager" | "User" | "Viewer";
export type Country    = "USA" | "UK" | "India" | "Canada" | "Australia";

export interface User {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  department: Department;
  role: Role;
  country: Country;
  isActive: boolean;
  createdAt: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
}

export interface UserFilters {
  firstName?:   string;
  lastName?:    string;
  gender?:      string[];
  status?:      string[];
  department?:  string[];
  role?:        string[];
  country?:     string[];
}

export interface TableParams {
  pagination: TablePaginationConfig;
  filters: UserFilters;
}
