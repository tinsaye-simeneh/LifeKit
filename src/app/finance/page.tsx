"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useFinanceStore } from "@/store/financeStore";
import { useSessionStore } from "@/store/sessionStore";

const columns = [
  { label: "Amount", accessor: "amount" },
  { label: "Type", accessor: "type" },
  { label: "Reason", accessor: "reason" },
  { label: "Payment Method", accessor: "payment_method" },
  { label: "Date", accessor: "date" },
];

const FinancePage = () => {
  const [loading, setLoading] = useState(true);
  const fetchFinances = useFinanceStore((state) => state.fetchFinances);
  const finances = useFinanceStore((state) => state.finances);
  const deleteFinance = useFinanceStore((state) => state.deleteFinance);
  const { session } = useSessionStore();

  useEffect(() => {
    const loadFinances = async () => {
      await fetchFinances(session?.user?.id as string);
      setLoading(false);
    };
    loadFinances();
  }, [fetchFinances]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteFinance(id);
    await fetchFinances(session?.user?.id as string); // Refresh the data after deletion
    setLoading(false);
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
        data={finances}
        onEdit={(id) => window.open(`/finance/${id}`, "_self")}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default FinancePage;
