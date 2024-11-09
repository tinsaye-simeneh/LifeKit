"use client";

import { useEffect, useState } from "react";
import { Button, Select, Textarea, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Finance } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const FinancePage = () => {
  const session = useSessionStore((state) => state.session);
  const [finances, setFinances] = useState<Finance[]>([]);
  const form = useForm({
    initialValues: {
      amount: 0,
      type: "income" as "expense" | "income",
      reason: "",
      payment_method: "cash" as "cash" | "bank",
      remaining_balance: 0,
      bank_name: "",
      date: new Date().toISOString(),
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
        remaining_balance: values.remaining_balance,
        bank_name: values.bank_name,
        date: new Date().toISOString(),
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
    <div>
      <h1>Finance Records</h1>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <DateInput
          label="Date"
          placeholder="Enter date"
          {...form.getInputProps("date")}
        />
        <NumberInput
          label="Amount"
          placeholder="Enter amount"
          {...form.getInputProps("amount")}
        />
        <Select
          label="Type"
          data={["income", "expense"]}
          {...form.getInputProps("type")}
        />
        <Textarea
          label="Reason"
          placeholder="Enter reason for transaction"
          {...form.getInputProps("reason")}
        />
        <Select
          label="Payment Method"
          data={["cash", "bank"]}
          {...form.getInputProps("payment_method")}
        />
        <Textarea
          label="Bank Name"
          placeholder="Enter bank name"
          {...form.getInputProps("bank_name")}
        />
        <NumberInput
          label="Remaining Balance"
          placeholder="Enter remaining balance"
          {...form.getInputProps("remaining_balance")}
        />

        <Button type="submit">Add Finance Record</Button>
      </form>

      <h2>Your Finance Records</h2>
      <ul>
        {finances?.map((finance) => (
          <li key={finance.id}>
            <p>
              {finance.type === "income" ? "+" : "-"} ${finance.amount} -{" "}
              {finance.reason} - {finance.payment_method} - Remaining balance: $
              {finance.remaining_balance}
            </p>
            <Button onClick={() => handleDelete(finance.id as string)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancePage;
