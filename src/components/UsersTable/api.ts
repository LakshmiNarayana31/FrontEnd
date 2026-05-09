import type { User, UserFilters } from "./types";
import type { TablePaginationConfig } from "antd/es/table";

const API_BASE = "http://localhost:5095";

export type UserPayload = Omit<User, "id" | "userId" | "createdAt">;

export function buildQueryString(
  pagination: TablePaginationConfig,
  filters: UserFilters,
): string {
  const params = new URLSearchParams();

  params.set("pageNumber", String(pagination.current  ?? 1));
  params.set("pageSize",   String(pagination.pageSize ?? 10));

  if (filters.firstName)   params.set("firstName",   filters.firstName);
  if (filters.lastName)    params.set("lastName",    filters.lastName);
  if (filters.email)       params.set("email",       filters.email);
  if (filters.phoneNumber) params.set("phoneNumber", filters.phoneNumber);
  if (filters.isActive)    params.set("isActive",    filters.isActive);
  if (filters.createdAt)   params.set("createdAt",   filters.createdAt);

  filters.gender?.forEach((v)     => params.append("gender",     v));
  filters.department?.forEach((v) => params.append("department", v));
  filters.role?.forEach((v)       => params.append("role",       v));
  filters.country?.forEach((v)    => params.append("country",    v));

  return params.toString();
}

export async function fetchUsers(
  pagination: TablePaginationConfig,
  filters: UserFilters,
): Promise<User[]> {
  const res = await fetch(
    `${API_BASE}/api/userInformation?${buildQueryString(pagination, filters)}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return res.json() as Promise<User[]>;
}

export async function fetchUserById(id: string, signal?: AbortSignal): Promise<User> {
  const res = await fetch(
    `${API_BASE}/api/userInformation/${id}`,
    { signal },
  );
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

export async function updateUser(id: string, payload: UserPayload): Promise<User> {
  const res = await fetch(`${API_BASE}/api/userInformation/${id})}`, {
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

