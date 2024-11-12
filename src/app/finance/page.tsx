// pages/FinancePage.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Select,
  Textarea,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import EntityTable from "@/components/EntityTable";
import { Finance } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const columns = [
  { label: "Amount", accessor: "amount" },
  { label: "Type", accessor: "type" },
  { label: "Reason", accessor: "reason" },
  { label: "Payment Method", accessor: "payment_method" },
  { label: "Date", accessor: "date" },
];

const FinancePage = () => {
  const session = useSessionStore((state) => state.session);
  const [finances, setFinances] = useState<Finance[]>([]);
  const form = useForm({
    initialValues: {
      amount: 0,
      type: "income" as "expense" | "income",
      reason: "",
      payment_method: "cash" as "cash" | "bank",
      bank_name: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

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

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const newFinance: Omit<Finance, "id"> = {
        user_id: session?.user?.id,
        amount: values.amount,
        type: values.type,
        reason: values.reason,
        payment_method: values.payment_method,
        bank_name: values.bank_name,
        date: values.date,
      };

      const response = await fetch("/api/finance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFinance),
      });

      if (response.ok) {
        await fetchFinances();
        form.reset();
      } else {
        console.error("Failed to create finance entry");
      }
    } catch (error) {
      console.error("Error creating finance entry:", error);
    }
  };

  const handleEdit = (id: string) => {
    const financeToEdit = finances.find((finance) => finance.id === id);
    if (financeToEdit) {
      form.setValues(financeToEdit);
    }
  };

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

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <TextInput
          label="Date"
          placeholder="Enter date"
          {...form.getInputProps("date")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="w-full"
        />
        <NumberInput
          label="Amount"
          placeholder="Enter amount"
          {...form.getInputProps("amount")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="w-full"
        />
        <Select
          label="Type"
          data={["income", "expense"]}
          {...form.getInputProps("type")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="w-full"
        />
        <Textarea
          label="Reason"
          placeholder="Enter reason for transaction"
          {...form.getInputProps("reason")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="w-full col-span-2"
        />
        <Select
          label="Payment Method"
          data={["cash", "bank"]}
          {...form.getInputProps("payment_method")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="w-full"
        />
        {form.values.payment_method === "bank" && (
          <TextInput
            label="Bank Name"
            placeholder="Enter bank name"
            {...form.getInputProps("bank_name")}
            classNames={{ label: "text-black", input: "text-black" }}
            className="w-full"
          />
        )}
        <Button
          type="submit"
          className="w-full col-span-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Finance Record
        </Button>
      </form>

      <h2 className="text-2xl font-semibold text-black mt-6 text-center">
        Your Finance Records
      </h2>
      <EntityTable
        columns={columns}
        data={finances}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FinancePage;
