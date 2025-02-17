"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Pagination,
  Loader,
  Input,
  Select,
  Menu,
} from "@mantine/core";
import { FaEye, FaEllipsisV } from "react-icons/fa";
import path from "path";
import { useTaskStore } from "@/store/todoStore";
import parse from "html-react-parser";

interface Column {
  label: string;
  accessor: string;
}

interface EntityTableProps {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  rowsPerPage?: number; // Items per page
  loading?: boolean;
}

const EntityTable: React.FC<EntityTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  rowsPerPage = 5,
  loading = false,
}) => {
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const [rowData, setRowData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTask = useTaskStore((state) => state.updateTask);

  const handleViewClick = (row: Record<string, unknown>) => {
    setIsModalOpen(true);
    setRowData(row);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeUnwantedFields = (rowData: Record<string, any>) => {
    const unwantedFields = ["id", "user_id", "created_at", "updated_at"];
    return Object.fromEntries(
      Object.entries(rowData).filter(([key]) => !unwantedFields.includes(key))
    );
  };

  const SimpleModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;

    const filteredRowData: Record<string, React.ReactNode> =
      removeUnwantedFields(rowData);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-11/12 max-w-md p-6 rounded-md shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Details</h2>
          <div className="space-y-4">
            {Object.entries(filteredRowData).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between border-b border-gray-200 py-2"
              >
                <span className="text-gray-700 mr-3">{key}:</span>
                <span className="text-gray-600 mr-auto">
                  {typeof value === "string" ? parse(value) : value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleMarkAsDone = (id: string) => {
    updateTask(id, { status: "completed" });
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (value: string | null) => {
    setSelectedColumn(value || "");
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);

    const sorted = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sorted);
  };

  const formatDate = (date: string | number | Date): string => {
    return new Date(date).toLocaleString("en-US", {
      timeZone: "Africa/Nairobi", // UTC+3
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const trimText = (text: string) => {
    return text.length > 20 ? `${text.substring(0, 20)}...` : text;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = data.filter((row) => {
        if (selectedColumn) {
          return String(row[selectedColumn])
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }

        return columns.some((column) =>
          String(row[column.accessor])
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
      setActivePage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedColumn, data, columns]);

  const paginatedData = filteredData.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <>
      <div className="md:flex justify-between items-center mb-4">
        <SimpleModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <Select
          placeholder="Filter by column"
          data={columns.map((col) => ({
            value: col.accessor,
            label: col.label,
          }))}
          value={selectedColumn}
          onChange={(value) => handleFilterChange(value)}
          className="md:w-1/4 w-full my-3"
          classNames={{
            label: "text-black",
            input: "text-black",
            dropdown: "bg-white text-black",
          }}
        />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="md:w-1/2 w-full"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg mt-6 border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader size="lg" color="blue" />
          </div>
        ) : (
          <>
            {paginatedData.length === 0 ? (
              <div className="flex justify-center items-center h-40 text-gray-500">
                No data available
              </div>
            ) : (
              <Table
                striped
                highlightOnHover
                withColumnBorders
                className="min-w-full"
              >
                <thead className="bg-blue-50 border-b border-gray-300">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.accessor}
                        className="text-left p-4 font-semibold text-gray-700 cursor-pointer"
                        onClick={() => handleSort(column.accessor)}
                      >
                        {column.label}{" "}
                        {sortColumn === column.accessor ? (
                          sortDirection === "asc" ? (
                            <span>↑</span>
                          ) : (
                            <span>↓</span>
                          )
                        ) : null}
                      </th>
                    ))}
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {paginatedData.map((row, rowIndex) => (
                    <tr
                      key={row.id}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.accessor}
                          className="px-4 text-gray-700 text-sm whitespace-nowrap"
                        >
                          {[
                            "created_at",
                            "start_date",
                            "end_date",
                            "date",
                            "due_date",
                          ].includes(column.accessor)
                            ? formatDate(row[column.accessor])
                            : typeof row[column.accessor] === "string"
                            ? parse(trimText(row[column.accessor]))
                            : row[column.accessor]}
                        </td>
                      ))}
                      <td className="px-4 py-2">
                        <div className="lg:hidden">
                          <Menu shadow="md" width={200}>
                            <Menu.Target>
                              <Button
                                variant="subtle"
                                size="xs"
                                className="p-0"
                              >
                                <FaEllipsisV className="text-lg" />
                              </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item onClick={() => handleViewClick(row)}>
                                View
                              </Menu.Item>
                              {((path.basename(location.pathname) === "to-do" &&
                                row.status === "pending") ||
                                row.status === "onProgress") && (
                                <Menu.Item
                                  color="green"
                                  onClick={() => handleMarkAsDone(row.id)}
                                >
                                  Mark as done
                                </Menu.Item>
                              )}
                              <Menu.Item
                                color="blue"
                                onClick={() => onEdit(row.id)}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                color="red"
                                onClick={() => onDelete(row.id)}
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </div>

                        <div className="hidden lg:flex space-x-2">
                          <Button
                            variant="light"
                            size="xs"
                            className="w-auto"
                            onClick={() => handleViewClick(row)}
                          >
                            <FaEye className="text-lg" />
                          </Button>
                          {((path.basename(location.pathname) === "to-do" &&
                            row.status === "pending") ||
                            row.status === "onProgress") && (
                            <Button
                              size="xs"
                              variant="outline"
                              className="hover:bg-green-600 hover:text-white transition"
                              color="green"
                              onClick={() => handleMarkAsDone(row.id)}
                            >
                              Mark as done
                            </Button>
                          )}

                          <Button
                            size="xs"
                            variant="outline"
                            color="blue"
                            onClick={() => onEdit(row.id)}
                            className="hover:bg-blue-600 hover:text-white transition"
                          >
                            Edit
                          </Button>
                          <Button
                            size="xs"
                            variant="outline"
                            color="red"
                            onClick={() => onDelete(row.id)}
                            className="hover:bg-red-600 hover:text-white transition"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </div>

      {!loading && (
        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={handlePageChange}
            size="sm"
            color="blue"
            radius="md"
            withControls
          />
        </div>
      )}
    </>
  );
};

export default EntityTable;
