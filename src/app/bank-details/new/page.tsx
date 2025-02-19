"use client";

import BankDetailsForm from "@/components/bank-details/forms";
import { useAuth } from "@/context/AuthContext";
import { useBankDetailsStore } from "@/store/bankdetailsStore";
import { notifications } from "@mantine/notifications";

const BankDetailsPage = () => {
  const { session } = useAuth();
  const createBankDetails = useBankDetailsStore((state) => state.addBankDetail);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    const bankDetailsData = {
      ...values,
      user_id: session?.user?.id,
    };

    try {
      await createBankDetails(bankDetailsData);
      notifications.show({
        title: "Success",
        message: "Bank details added successfully.",
        color: "green",
      });
      setTimeout(() => window.open("/bank-details", "_self"), 500);
    } catch (error) {
      console.error("Error adding bank details:", error);
      notifications.show({
        title: "Error",
        message: "Failed to add bank details.",
        color: "red",
      });
    }
  };

  return (
    <BankDetailsForm
      initialValues={{
        bank_name: "",
        account_number: "",
        account_name: "",
        atm_number: "",
        username: "",
        password: "",
        data_type: "bank_account",
      }}
      onSubmit={handleCreate}
    />
  );
};

export default BankDetailsPage;
