"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useFinanceStore } from "@/store/financeStore";
import { useSessionStore } from "@/store/sessionStore";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";
import { Select } from "@mantine/core";
import RemainingMoneyModal from "@/components/finance/RemainingModal";
import { useRouter } from "next/navigation";

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
  const { session } = useSessionStore();
  const [selectedOption, setSelectedOption] = useState("finance");

  const remainingFinances = finances.filter(
    (finance) => finance.reason === "Remaining"
  );

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
    await fetchFinances(session?.user?.id as string);
    setLoading(false);
  };

  return (
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
          className="w-44 mb-4"
          styles={{
            input: {
              fontWeight: "600",
              fontSize: "1.125rem",
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
            className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            Reload
          </Button>
          <Button
            onClick={() => router.push("/finance/new")}
            className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            <FaPlus className="mr-2" /> Add
          </Button>
        </div>
      </Box>
      {selectedOption === "remaining" ? (
        <RemainingMoneyModal data={remainingFinances} />
      ) : (
        <EntityTable
          columns={columns}
          data={finances}
          onEdit={(id) => router.push(`/finance/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default FinancePage;
