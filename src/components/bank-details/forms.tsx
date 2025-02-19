"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface BankDetailsFormProps {
  initialValues: {
    bank_name: string;
    account_number?: string;
    account_name?: string;
    atm_number?: string;
    username?: string;
    password?: string;
    data_type: "bank_account" | "atm" | "online_banking";
  };
  onSubmit: (values: any) => void;
}

const BankDetailsForm = ({ initialValues, onSubmit }: BankDetailsFormProps) => {
  const router = useRouter();
  const form = useForm({ initialValues });
  const [loading, setLoading] = useState(false);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg mb-20 mt-10">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          Bank Details
        </h1>

        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            await onSubmit(values);
            setLoading(false);
          })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6"
        >
          <Select
            label="Data Type"
            data={["bank_account", "atm", "online_banking"]}
            {...form.getInputProps("data_type")}
            classNames={{
              label: "text-black",
              input: "text-black",
              dropdown: "bg-white text-black",
            }}
            className="col-span-2 md:col-span-1"
          />

          {form.values.data_type === "bank_account" && (
            <>
              <TextInput
                label="Bank Name"
                placeholder="Enter bank name"
                {...form.getInputProps("bank_name")}
                classNames={{ label: "text-black", input: "text-black" }}
                className="col-span-2 md:col-span-1"
                required
              />
              <TextInput
                label="Account Number"
                placeholder="Enter account number"
                {...form.getInputProps("account_number")}
                classNames={{ label: "text-black", input: "text-black" }}
                className="col-span-2 md:col-span-1"
                required
              />
              <TextInput
                label="Account Name"
                placeholder="Enter account name"
                {...form.getInputProps("account_name")}
                classNames={{ label: "text-black", input: "text-black" }}
                className="col-span-2 md:col-span-1"
                required
              />
            </>
          )}

          {form.values.data_type === "atm" && (
            <TextInput
              label="ATM Number"
              placeholder="Enter ATM number"
              {...form.getInputProps("atm_number")}
              classNames={{ label: "text-black", input: "text-black" }}
              className="col-span-2 md:col-span-1"
              required
            />
          )}

          {form.values.data_type === "online_banking" && (
            <>
              <TextInput
                label="Username"
                placeholder="Enter username"
                {...form.getInputProps("username")}
                classNames={{ label: "text-black", input: "text-black" }}
                className="col-span-2 md:col-span-1"
                required
              />
              <TextInput
                label="Password"
                placeholder="Enter password"
                type="password"
                {...form.getInputProps("password")}
                classNames={{ label: "text-black", input: "text-black" }}
                className="col-span-2 md:col-span-1"
                required
              />
            </>
          )}

          <Button
            type="submit"
            className="w-full col-span-2 md:col-span-1 bg-blue-500 hover:bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
          <Button
            onClick={() => router.push("/bank-details")}
            className="w-full col-span-2 md:col-span-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Cancel
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default BankDetailsForm;
