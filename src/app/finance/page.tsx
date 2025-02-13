"use client";

import { useEffect, useState } from "react";
import { Box, Button, Text } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useFinanceStore } from "@/store/financeStore";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";
import { Select } from "@mantine/core";
import RemainingMoneyModal from "@/components/finance/RemainingModal";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

const columns = [
  { label: "Reason", accessor: "reason" },
  { label: "Amount", accessor: "amount" },
  { label: "Type", accessor: "type" },
  { label: "Payment Method", accessor: "payment_method" },
  { label: "Bank", accessor: "bank_name" },
  { label: "Date", accessor: "date" },
  { label: "Created At", accessor: "created_at" },
];

const FinancePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const fetchFinances = useFinanceStore((state) => state.fetchFinances);
  const finances = useFinanceStore((state) => state.finances);
  const deleteFinance = useFinanceStore((state) => state.deleteFinance);
  const { session } = useAuth();
  const [selectedOption, setSelectedOption] = useState("finance");

  useEffect(() => {
    const loadFinances = async () => {
      await fetchFinances(session?.user?.id as string);
      setLoading(false);
    };
    loadFinances();
  }, [fetchFinances, loading, session?.user?.id]);

  const last30DaysFinances = finances.filter((finance) => {
    const financeDate = new Date(finance.date);
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return financeDate >= thirtyDaysAgo && financeDate <= today;
  });

  const totalIncome = last30DaysFinances
    .filter((finance) => finance.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = last30DaysFinances
    .filter((finance) => finance.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const total = totalIncome - totalExpenses;

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteFinance(id);
    notifications.show({
      title: "Success",
      message: "Finance entry deleted successfully.",
      color: "green",
    });
    await fetchFinances(session?.user?.id as string);
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
        <Box className="flex mt-5">
          <Select
            value={selectedOption}
            onChange={(value) => setSelectedOption(value as string)}
            data={[
              { value: "finance", label: `Finances (${finances.length})` },
              { value: "remaining", label: `Remaining` },
            ]}
            placeholder="Select an option"
            className="w-44 mb-4 text-sm"
            styles={{
              input: {
                fontWeight: "600",
                fontSize: "1rem",
                color: "#000",
                border: "none",
              },
              dropdown: {
                color: "#000",
              },
            }}
          />

          <div className="flex ml-auto">
            <Button
              onClick={() => setLoading(true)}
              className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white"
            >
              Reload
            </Button>
            <Button
              onClick={() => router.push("/finance/new")}
              className="mb-6 bg-blue-500 hover:bg-gray-600 text-white"
            >
              <FaPlus className="mr-2" /> Add
            </Button>
          </div>
        </Box>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-300">
          <Text size="md" className="font-bold text-gray-600">
            Financial Summary (Last 30 Days)
          </Text>
          <div className="flex justify-between mt-2">
            <Text size="md" c="green">
              Total Income (including loans): Br. {totalIncome.toFixed(2)}
            </Text>
            <Text size="md" c="red">
              Total Expenses: Br. {totalExpenses.toFixed(2)}
            </Text>
            <Text size="md" c={total >= 0 ? "green" : "red"}>
              Total: Br. {total.toFixed(2)}
            </Text>
          </div>
        </div>

        {selectedOption === "remaining" ? (
          <RemainingMoneyModal data={last30DaysFinances} />
        ) : (
          <EntityTable
            columns={columns}
            data={last30DaysFinances}
            onEdit={(id) => router.push(`/finance/${id}`)}
            onDelete={handleDelete}
            loading={loading}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default FinancePage;
