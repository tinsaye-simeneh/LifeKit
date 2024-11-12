"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { Finance } from "@/types/models";

const columns = [
  { label: "Amount", accessor: "amount" },
  { label: "Type", accessor: "type" },
  { label: "Reason", accessor: "reason" },
  { label: "Payment Method", accessor: "payment_method" },
  { label: "Date", accessor: "date" },
];

const FinancePage = () => {
  const [finances, setFinances] = useState<Finance[]>([]);

  const fetchFinances = async () => {
    try {
      const response = await fetch("/api/finance");
      const data = await response.json();
      setFinances(data);
    } catch (error) {
      console.error("Failed to fetch finances:", error);
    }
  };

  useEffect(() => {
    fetchFinances();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/finance/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchFinances();
      } else {
        console.error("Failed to delete finance entry");
      }
    } catch (error) {
      console.error("Error deleting finance entry:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        Finance Records
      </h1>

      <>
        <Button
          onClick={() => window.open("/finance/new")}
          className="mb-6 bg-blue-500 hover:bg-gray-600 text-white"
        >
          Add Finance
        </Button>

        <h2 className="text-2xl font-semibold text-black mt-6 text-center">
          Your Finance Records
        </h2>
        <EntityTable
          columns={columns}
          data={finances}
          onEdit={(id) => window.open(`/finance/${id}`)}
          onDelete={handleDelete}
        />
      </>
    </div>
  );
};

export default FinancePage;
