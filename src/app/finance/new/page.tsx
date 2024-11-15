"use client";

import FinanceForm from "@/components/finance/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useFinanceStore } from "@/store/financeStore";

const FinancePage = () => {
  const session = useSessionStore((state) => state.session);
  const createFinance = useFinanceStore((state) => state.addFinance);

  const handleCreate = async (values: {
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
  }) => {
    const financeData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    try {
      await createFinance(financeData);
      window.open("/finance", "_self");
    } catch (error) {
      console.error("Error creating finance entry:", error);
    }
  };

  return (
    <FinanceForm
      initialValues={{
        amount: 0,
        type: "income",
        reason: "",
        payment_method: "cash",
        bank_name: "",
        date: new Date().toISOString().split("T")[0],
      }}
      onSubmit={handleCreate}
    />
  );
};

export default FinancePage;