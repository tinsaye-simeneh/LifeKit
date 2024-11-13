"use client";

import React from "react";
import { Table, Button } from "@mantine/core";

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
}

const EntityTable: React.FC<EntityTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-auto bg-white rounded-lg shadow-lg mt-6 border border-gray-200">
      <Table striped highlightOnHover withColumnBorders className="table-auto">
        <thead className="bg-blue-50 border-b border-gray-300">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="text-left p-4 font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}
            <th className="text-left p-4 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              {columns.map((column) => (
                <td key={column.accessor} className="p-4 text-gray-700">
                  {row[column.accessor]}
                </td>
              ))}
              <td className="p-4 space-x-2">
                <Button
                  size="xs"
                  variant="filled"
                  color="blue"
                  onClick={() => onEdit(row.id)}
                  className="hover:bg-blue-600 transition"
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="filled"
                  color="red"
                  onClick={() => onDelete(row.id)}
                  className="hover:bg-red-600 transition"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EntityTable;
