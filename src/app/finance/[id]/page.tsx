"use client";

import FinanceForm from "@/components/finance/forms";
import { useFinanceStore } from "@/store/financeStore";
import { useSessionStore } from "@/store/sessionStore";
import { useEffect, useState } from "react";

const EditFinance = ({ id }: { id: string }) => {
  const session = useSessionStore((state) => state.session);
  const finance = useFinanceStore((state) =>
    state.finances.find((item) => item.id === id)
  );
  const updateFinance = useFinanceStore((state) => state.updateFinance);
  const [initialValues, setInitialValues] = useState<{
    id?: string;
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    if (finance) {
      setInitialValues({
        id: id,
        amount: finance.amount,
        type: finance.type,
        reason: finance.reason,
        payment_method: finance.payment_method,
        bank_name: finance.bank_name,
        date: finance.date,
      });
    }
  }, [finance]);

  const handleUpdate = async (values: {
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
  }) => {
    const updatedFinance = {
      ...values,
      user_id: session?.user?.id,
    };

    try {
      await updateFinance(id, updatedFinance);
      window.open("/finance", "_self");
    } catch (error) {
      console.error("Error updating finance entry:", error);
    }
  };

  if (!initialValues) {
    return <p>Loading...</p>;
  }

  return <FinanceForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditFinance;
