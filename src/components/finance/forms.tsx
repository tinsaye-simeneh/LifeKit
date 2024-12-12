"use client";

import {
  Button,
  Select,
  Textarea,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FinanceFormProps {
  initialValues: {
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
  };
  onSubmit: (values: {
    id?: string;
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
  }) => void;
}

const FinanceForm = ({ initialValues, onSubmit }: FinanceFormProps) => {
  const router = useRouter();
  const form = useForm({
    initialValues,
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg mb-20 mt-10">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        Finance
      </h1>

      <form
        onSubmit={form.onSubmit(async (values) => {
          setLoading(true);
          await onSubmit(values);
          setLoading(false);
        })}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6"
      >
        <TextInput
          label="Date"
          placeholder="Enter date"
          type="date"
          {...form.getInputProps("date")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2 md:col-span-1"
        />
        <NumberInput
          label="Amount"
          placeholder="Enter amount"
          {...form.getInputProps("amount")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2 md:col-span-1"
        />
        <Select
          label="Type"
          data={["income", "expense"]}
          {...form.getInputProps("type")}
          classNames={{
            label: "text-black",
            input: "text-black",
            dropdown: "bg-white text-black",
          }}
          className="col-span-2 md:col-span-1"
        />
        <Textarea
          label="Reason"
          placeholder="Enter reason for transaction"
          {...form.getInputProps("reason")}
          classNames={{ label: "text-black", input: "text-black h-32" }}
          className="col-span-2 md:col-span-1"
        />
        <Select
          label="Payment Method"
          data={["cash", "bank"]}
          {...form.getInputProps("payment_method")}
          classNames={{
            label: "text-black",
            input: "text-black",
            dropdown: "bg-white text-black",
          }}
          className="col-span-2 md:col-span-1"
        />
        <TextInput
          label="Bank Name (optional)"
          placeholder="Enter bank name"
          {...form.getInputProps("bank_name")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="mb-10 col-span-2 md:col-span-1"
        />

        <Button
          type="submit"
          className="w-full col-span-2 md:col-span-1 bg-blue-500 hover:bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Button
          onClick={() => router.push("/finance")}
          className="w-full col-span-2 md:col-span-1 bg-red-500 hover:bg-red-600 text-white"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default FinanceForm;
