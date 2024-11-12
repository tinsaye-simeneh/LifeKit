"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import FinanceForm from "@/components/finance/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useFinanceStore } from "@/store/financeStore";

const EditFinancePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const financeId = Array.isArray(id) ? id[0] : id;

  const session = useSessionStore((state) => state.session);
  const fetchFinance = useFinanceStore((state) => state.fetchFinance);
  const updateFinance = useFinanceStore((state) => state.updateFinance);

  const [initialValues, setInitialValues] = useState({
    amount: 0,
    type: "income" as "income" | "expense",
    reason: "",
    payment_method: "cash" as "cash" | "bank",
    bank_name: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const loadFinanceData = async () => {
      if (financeId) {
        try {
          const financeDataArray = await fetchFinance(financeId);

          if (financeDataArray && financeDataArray.length > 0) {
            const financeData = financeDataArray[0];

            setInitialValues({
              amount: financeData.amount || 0,
              type: financeData.type || "income",
              reason: financeData.reason || "",
              payment_method: financeData.payment_method || "cash",
              bank_name: financeData.bank_name || "",
              date: financeData.date || new Date().toISOString().split("T")[0],
            });
          } else {
            console.warn("No finance data found for the provided finance ID");
          }
        } catch (error) {
          console.error("Error fetching finance data:", error);
        }
      }
    };

    loadFinanceData();
  }, [financeId, fetchFinance]);

  const handleUpdate = async (values: {
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
  }) => {
    if (!financeId) {
      console.error("No finance ID provided");
      return;
    }

    const financeData = {
      ...values,
      id: financeId,
      user_id: session?.user?.id,
    };

    try {
      await updateFinance(financeId, financeData);
      router.push("/finance");
    } catch (error) {
      console.error("Error updating finance entry:", error);
    }
  };

  return <FinanceForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditFinancePage;
