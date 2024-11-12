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
    <div className="overflow-auto bg-white rounded-lg shadow-md mt-4">
      <Table striped highlightOnHover>
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="text-left p-2 text-black">
                {column.label}
              </th>
            ))}
            <th className="text-left p-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessor} className="p-2 text-black">
                  {row[column.accessor]}
                </td>
              ))}
              <td className="p-2">
                <Button
                  size="xs"
                  variant="outline"
                  color="blue"
                  onClick={() => onEdit(row.id)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  color="red"
                  onClick={() => onDelete(row.id)}
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
