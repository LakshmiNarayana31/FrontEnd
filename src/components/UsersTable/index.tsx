import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";

import type { User, UserFilters } from "./types";
import { fetchUsers } from "./api";
import { userColumns } from "./columns";
import FilterPanel from "./FilterPanel";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

export default function UsersTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({});

  // Derive pagination from URL query params
  const pageNumber = parseInt(searchParams.get("pageNumber") || String(DEFAULT_PAGE_NUMBER), 10);
  const pageSize = parseInt(searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE), 10);

  const pagination: TablePaginationConfig = {
    current: pageNumber,
    pageSize: pageSize,
    total: data.length,
  };

  // Load data whenever pagination or filters change
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const paginationConfig: TablePaginationConfig = {
          current: pageNumber,
          pageSize: pageSize,
          total: 0,
        };
        const response = await fetchUsers(paginationConfig, filters);
        setData(response);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [pageNumber, pageSize, filters]);

  // Called when the user changes page or page size
  function handlePaginationChange(newPagination: TablePaginationConfig) {
    setSearchParams({
      pageNumber: String(newPagination.current ?? DEFAULT_PAGE_NUMBER),
      pageSize: String(newPagination.pageSize ?? DEFAULT_PAGE_SIZE),
    });
  }

  // Called when the user clicks "Apply Filters" in FilterPanel
  function handleApplyFilters(newFilters: UserFilters) {
    setFilters(newFilters);
    // Reset to page 1 when filters change
    setSearchParams({
      pageNumber: String(DEFAULT_PAGE_NUMBER),
      pageSize: String(pageSize),
    });
  }

  // Called when the user clicks "Reset All" in FilterPanel
  function handleResetFilters() {
    setFilters({});
    // Reset to page 1 when filters are reset
    setSearchParams({
      pageNumber: String(DEFAULT_PAGE_NUMBER),
      pageSize: String(pageSize),
    });
  }

  return (
    <div>
      <h1>Users</h1>
      <FilterPanel onApply={handleApplyFilters} onReset={handleResetFilters} />
      <Table<User>
        columns={userColumns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) =>
            `${range[0]}–${range[1]} of ${total} users`,
        }}
        onChange={(pg) => handlePaginationChange(pg)}
        scroll={{ x: "max-content" }}
        bordered
      />
    </div>
  );
}
