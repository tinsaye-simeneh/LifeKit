"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BankDetailsForm from "@/components/bank-details/forms";
import { useBankDetailsStore } from "@/store/bankdetailsStore";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/context/AuthContext";

const BankDetailsEditPage = () => {
  const { id } = useParams();
  const bankId = Array.isArray(id) ? id[0] : id;

  const { session } = useAuth();
  const fetchBankDetail = useBankDetailsStore((state) => state.fetchBankDetail);
  const updateBankDetails = useBankDetailsStore(
    (state) => state.updateBankDetail
  );

  const [initialValues, setInitialValues] = useState<{
    bank_name: string;
    account_number: string;
    account_name: string;
    atm_number: string;
    username: string;
    password: string;
    data_type: string;
    date?: string;
  } | null>(null);

  useEffect(() => {
    if (bankId) {
      const loadBankDetail = async () => {
        try {
          const bankDetails = await fetchBankDetail(bankId);

          if (bankDetails) {
            setInitialValues({
              bank_name: bankDetails.bank_name || "",
              account_number: bankDetails.account_number || "",
              account_name: bankDetails.account_name || "",
              atm_number: bankDetails.atm_number || "",
              username: bankDetails.username || "",
              password: bankDetails.password || "",
              data_type: bankDetails.data_type || "bank_account",
            });
          } else {
            notifications.show({
              title: "Error",
              message: "Bank details not found.",
              color: "red",
            });
            setTimeout(() => window.open("/bank-details", "_self"), 500);
          }
        } catch (error) {
          console.error("Error fetching bank details:", error);
          notifications.show({
            title: "Error",
            message: "Failed to load bank details.",
            color: "red",
          });
        }
      };

      loadBankDetail();
    }
  }, [bankId, fetchBankDetail]);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = async (values: any) => {
    if (!bankId) {
      console.error("No bank ID provided");
      return;
    }

    const bankDetailsData = {
      ...values,
      id: bankId,
      user_id: session?.user?.id,
    };

    if (!bankDetailsData.bank_name || !bankDetailsData.account_number) {
      notifications.show({
        title: "Error",
        message: "Please fill all the required fields.",
        color: "red",
      });
      return;
    }

    try {
      await updateBankDetails(bankId, bankDetailsData);
      notifications.show({
        title: "Success",
        message: "Bank details updated successfully.",
        color: "green",
      });
      setTimeout(() => window.open("/bank-details", "_self"), 500);
    } catch (error) {
      console.error("Error updating bank details:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update bank details.",
        color: "red",
      });
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <BankDetailsForm initialValues={initialValues} onSubmit={handleUpdate} />
  );
};

export default BankDetailsEditPage;
