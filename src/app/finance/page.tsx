"use client";

import { useEffect } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useFinanceStore } from "@/store/financeStore";

const columns = [
  { label: "Amount", accessor: "amount" },
  { label: "Type", accessor: "type" },
  { label: "Reason", accessor: "reason" },
  { label: "Payment Method", accessor: "payment_method" },
  { label: "Date", accessor: "date" },
];

const FinancePage = () => {
  const fetchFinances = useFinanceStore((state) => state.fetchFinances);
  const deleteFinance = useFinanceStore((state) => state.deleteFinance);

  useEffect(() => {
    fetchFinances();
  }, [fetchFinances]);

  const handleDelete = async (id: string) => {
    await deleteFinance(id);
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <Box className="flex mt-5">
        <h5 className="text-2xl font-semibold text-black text-center mt-2">
          Your Finance Records
        </h5>
        <Button
          onClick={() => window.open("/finance/new", "_self")}
          className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
        >
          Add Finance
        </Button>
      </Box>

      <EntityTable
        columns={columns}
        data={useFinanceStore((state) => state.finances)}
        onEdit={(id) => window.open(`/finance/${id}`, "_self")}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FinancePage;
