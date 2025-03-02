"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FinanceForm from "@/components/finance/forms";
import { useFinanceStore } from "@/store/financeStore";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/context/AuthContext";

const EditFinancePage = () => {
  const { id } = useParams();
  const financeId = Array.isArray(id) ? id[0] : id;

  const { session } = useAuth();
  const fetchFinance = useFinanceStore((state) => state.fetchFinance);
  const updateFinance = useFinanceStore((state) => state.updateFinance);

  // State to hold initial values, initially null to wait for data
  const [initialValues, setInitialValues] = useState<{
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
    category: string;
  } | null>(null);

  // Effect hook to load finance data from API
  useEffect(() => {
    if (financeId && fetchFinance) {
      const loadFinanceData = async () => {
        try {
          const financeData = await fetchFinance(financeId); // Fetch data with financeId

          if (financeData) {
            setInitialValues({
              amount: financeData.amount || 0,
              type: financeData.type || "income",
              reason: financeData.reason || "",
              payment_method: financeData.payment_method || "cash",
              bank_name: financeData.bank_name || "",
              date: financeData.date.split("T")[0] || "",
              category: financeData.category || "",
            });
          } else {
            notifications.show({
              title: "Error",
              message: "Finance entry not found.",
              color: "red",
            });
            setTimeout(() => window.open("/finance", "_self"), 500);
          }
        } catch (error) {
          console.error("Error fetching finance data:", error);
          notifications.show({
            title: "Error",
            message: "Failed to load finance data.",
            color: "red",
          });
        }
      };

      loadFinanceData();
    }
  }, [financeId, fetchFinance]);

  // Handle form submission and finance update
  const handleUpdate = async (values: {
    amount: number;
    type: "income" | "expense";
    reason: string;
    payment_method: "cash" | "bank";
    bank_name?: string;
    date: string;
    category: string;
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

    // Validation: Ensure all required fields are filled
    if (!financeData.amount || !financeData.reason || !financeData.date) {
      notifications.show({
        title: "Error",
        message: "Please fill all the fields",
        color: "red",
      });
      return;
    }

    try {
      await updateFinance(financeId, financeData); // Call updateFinance with financeId and financeData
      notifications.show({
        title: "Success",
        message: "Finance entry updated successfully.",
        color: "green",
      });
      setTimeout(() => window.open("/finance", "_self"), 500);
    } catch (error) {
      console.error("Error updating finance entry:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update the finance entry.",
        color: "red",
      });
    }
  };

  // Show loading message if initialValues is still null
  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return <FinanceForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditFinancePage;
