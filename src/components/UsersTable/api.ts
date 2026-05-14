import type { User, UserFilters, UsersResponse } from "./types";
import type { TablePaginationConfig } from "antd/es/table";

const API_BASE = "http://localhost:5095";

export type UserPayload = Omit<User, "id" | "userId" | "createdAt">;

interface SelectedUserInformationRequest {
  firstName: string;
  lastName: string;
  gender: string[];
  department: string[];
  role: string[];
  country: string[];
  status: string[];
  isActive: boolean;
}

// ============================================
// LIST USERS - Simple pagination list
// ============================================

function buildListQueryParams(pagination: TablePaginationConfig): string {
  const searchParams = new URLSearchParams();
  searchParams.append("pageNumber", String(pagination.current ?? 1));
  searchParams.append("pageSize", String(pagination.pageSize ?? 10));
  return searchParams.toString();
}

function parseListResponse(payload: unknown): UsersResponse {
  if (!payload || typeof payload !== "object") {
    return { data: [], total: 0 };
  }

  const response = payload as Record<string, unknown>;

  if (
    Array.isArray(response.users) &&
    typeof response.totalCount === "number"
  ) {
    return {
      data: response.users as User[],
      total: response.totalCount,
    };
  }

  return { data: [], total: 0 };
}

export async function fetchUserList(
  pagination: TablePaginationConfig,
): Promise<UsersResponse> {
  const queryString = buildListQueryParams(pagination);
  const url = `${API_BASE}/api/users?${queryString}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error(`Failed to fetch user list: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  return parseListResponse(payload);
}

// ============================================
// FILTER USERS - Advanced filtering with POST
// ============================================

function buildFilterPayload(
  filters: UserFilters,
): SelectedUserInformationRequest {
  return {
    firstName: filters.firstName?.trim() ?? "",
    lastName: filters.lastName?.trim() ?? "",
    gender: Array.isArray(filters.gender) ? filters.gender : [],
    department: Array.isArray(filters.department) ? filters.department : [],
    role: Array.isArray(filters.role) ? filters.role : [],
    country: Array.isArray(filters.country) ? filters.country : [],
    status: Array.isArray(filters.status) ? filters.status : [],
    isActive:
      Array.isArray(filters.status) && filters.status.includes("Active"),
  };
}

function buildFilterQueryParams(pagination: TablePaginationConfig): string {
  const searchParams = new URLSearchParams();
  searchParams.append("pageNumber", String(pagination.current ?? 1));
  searchParams.append("pageSize", String(pagination.pageSize ?? 10));
  return searchParams.toString();
}

function parseFilterResponse(payload: unknown): UsersResponse {
  if (!payload || typeof payload !== "object") {
    return { data: [], total: 0 };
  }

  const response = payload as Record<string, unknown>;

  if (
    Array.isArray(response.users) &&
    typeof response.totalCount === "number"
  ) {
    return {
      data: response.users as User[],
      total: response.totalCount,
    };
  }

  return { data: [], total: 0 };
}

export async function fetchUsersWithFilters(
  filters: UserFilters,
  pagination: TablePaginationConfig,
): Promise<UsersResponse> {
  // const queryString = buildFilterQueryParams(pagination);
  const url = `${API_BASE}/api/users/filters`;

  const payload = buildFilterPayload(filters);

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch filtered users: ${response.status}`);
  }

  const responseData = (await response.json()) as unknown;
  return parseFilterResponse(responseData);
}

export async function fetchUserById(
  id: string,
  signal?: AbortSignal,
): Promise<User> {
  const res = await fetch(`${API_BASE}/api/userInformation/${id}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
  return res.json() as Promise<User>;
}

export async function createUser(payload: UserPayload): Promise<User> {
  const res = await fetch(`${API_BASE}/api/userInformation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create user: ${res.status}`);
  return res.json() as Promise<User>;
}

export async function updateUser(
  id: string,
  payload: UserPayload,
): Promise<User> {
  const res = await fetch(`${API_BASE}/api/userInformation/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update user: ${res.status}`);
  return res.json() as Promise<User>;
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/userInformation/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
}
