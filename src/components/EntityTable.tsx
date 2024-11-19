"use client";

import React, { useState } from "react";
import { Table, Button, Pagination, Loader, Input } from "@mantine/core";

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
  rowsPerPage?: number; // Optional prop for items per page
  loading?: boolean; // New loading prop
}

const EntityTable: React.FC<EntityTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  rowsPerPage = 5,
  loading = false, // Default value for loading
}) => {
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortedData, setSortedData] = useState(data);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("");

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = data.filter((row) =>
      columns.some((column) =>
        String(row[column.accessor]).toLowerCase().includes(query.toLowerCase())
      )
    );
    setSortedData(filteredData);
    setActivePage(1); // Reset to the first page after search
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);

    const sorted = [...sortedData].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  };

  const paginatedData = sortedData.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-1/2"
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
                          className="p-4 text-gray-700 text-sm whitespace-nowrap"
                        >
                          {row[column.accessor]}
                        </td>
                      ))}
                      <td className="p-4 space-y-2 lg:space-y-0 lg:space-x-2">
                        <Button
                          size="xs"
                          variant="filled"
                          color="blue"
                          onClick={() => onEdit(row.id)}
                          className="hover:bg-blue-600 transition w-full lg:w-auto"
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          variant="filled"
                          color="red"
                          onClick={() => onDelete(row.id)}
                          className="hover:bg-red-600 transition w-full lg:w-auto"
                        >
                          Delete
                        </Button>
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
