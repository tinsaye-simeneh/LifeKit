"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useFinanceStore } from "@/store/financeStore";
import { useSessionStore } from "@/store/sessionStore";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";

const columns = [
  { label: "Reason", accessor: "reason" },
  { label: "Amount", accessor: "amount" },
  { label: "Type", accessor: "type" },
  { label: "Payment Method", accessor: "payment_method" },
  { label: "Bank", accessor: "bank_name" },
  { label: "Date", accessor: "date" },
  { label: "Created At", accessor: "created_at" },
  { label: "Updated At", accessor: "updated_at" },
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
  }, [fetchFinances, loading, session?.user?.id]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteFinance(id);
    notifications.show({
      title: "Success",
      message: "Finance entry deleted successfully.",
      color: "green",
    });
    await fetchFinances(session?.user?.id as string); // Refresh the data after deletion
    setLoading(false);
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <Box className="flex mt-5">
        <h5 className="text-xl font-semibold text-black text-left">
          Finances ({finances.length})
        </h5>
        <div className="flex ml-auto">
          <Button
            onClick={() => setLoading(true)}
            className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            Refresh
          </Button>
          <Button
            onClick={() => window.open("/finance/new", "_self")}
            className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            <FaPlus className="mr-2" /> Add
          </Button>
        </div>
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
