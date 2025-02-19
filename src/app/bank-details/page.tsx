"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useBankDetailsStore } from "@/store/bankdetailsStore";

const columns = [
  { label: "Bank Name", accessor: "bank_name" },
  { label: "Account Name", accessor: "account_name" },
  { label: "Account Number", accessor: "account_number" },
  { label: "ATM Number", accessor: "atm_number" },
  { label: "Username", accessor: "username" },
  { label: "Created At", accessor: "created_at" },
];

const BankDetailsPage = () => {
  const router = useRouter();
  const { bankDetails, fetchBankDetails, deleteBankDetail } =
    useBankDetailsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBankDetails = async () => {
      try {
        await fetchBankDetails();
      } catch (error) {
        console.error("Error loading bank details:", error);
        notifications.show({
          title: "Error",
          message: "Failed to load bank details",
          color: "red",
        });
      }
      setLoading(false);
    };

    loadBankDetails();
  }, [fetchBankDetails]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteBankDetail(id);
      notifications.show({
        title: "Success",
        message: "Bank detail deleted successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Error deleting bank detail:", error);
      notifications.show({
        title: "Error",
        message: "Failed to delete bank detail",
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
        <Box className="flex mt-5">
          <h5 className="text-2xl font-semibold text-black text-center ">
            Bank
          </h5>
          <div className="flex ml-auto">
            <Button
              onClick={() => fetchBankDetails()}
              className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white"
            >
              Reload
            </Button>
            <Button
              onClick={() => router.push("/bank-details/new")}
              className="mb-6 bg-blue-500 hover:bg-gray-600 text-white"
            >
              <FaPlus className="mr-2" /> Add Bank Detail
            </Button>
          </div>
        </Box>

        <span className="text-gray-400 text-sm">
          This page allows you to manage your saved bank details.
        </span>

        <EntityTable
          columns={columns}
          data={bankDetails}
          onEdit={(id) => router.push(`/bank-details/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </ProtectedRoute>
  );
};

export default BankDetailsPage;
