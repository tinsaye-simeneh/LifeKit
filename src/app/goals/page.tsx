"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useGoalStore } from "@/store/goalStore";
import { useAuth } from "@/context/AuthContext";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const columns = [
  { label: "Title", accessor: "title" },
  { label: "Description", accessor: "description" },
  { label: "Status", accessor: "status" },
  { label: "Start Date", accessor: "start_date" },
  { label: "End Date", accessor: "end_date" },
  { label: "Created At", accessor: "created_at" },
];

const GoalsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { goals, fetchGoals, deleteGoal } = useGoalStore();
  const { session } = useAuth();

  useEffect(() => {
    const loadGoals = async () => {
      await fetchGoals(session?.user?.id as string);
      setLoading(false);
    };
    loadGoals();
  }, [fetchGoals, session?.user?.id, loading]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteGoal(id);
    notifications.show({
      title: "Success",
      message: "Goal deleted successfully.",
      color: "green",
    });
    await fetchGoals(session?.user?.id as string);
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
        <Box className="flex mt-5">
          <h5 className="text-2xl font-semibold text-black text-center">
            Goals ({goals.length})
          </h5>
          <div className="flex ml-auto">
            <Button
              onClick={() => setLoading(true)}
              className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
            >
              Reload
            </Button>
            <Button
              onClick={() => router.push("/goals/new")}
              className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
            >
              <FaPlus className="mr-2" /> Add
            </Button>
          </div>
        </Box>

        <EntityTable
          columns={columns}
          data={goals}
          onEdit={(id) => router.push(`/goals/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </ProtectedRoute>
  );
};

export default GoalsPage;
