"use client";

import {
  Button,
  Select,
  Textarea,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Finance } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const FinancePage = () => {
  const session = useSessionStore((state) => state.session);

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
        window.open("/finance");
      } else {
        console.error("Failed to create or update finance entry");
      }
    } catch (error) {
      console.error("Error creating or updating finance entry:", error);
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
    </div>
  );
};

export default FinancePage;
