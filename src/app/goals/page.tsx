"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { Goal } from "@/types/models";
import { useGoalStore } from "@/store/goalStore";

const columns = [
  { label: "Title", accessor: "title" },
  { label: "Description", accessor: "description" },
  { label: "Category", accessor: "category" },
  { label: "Created At", accessor: "created_at" },
  { label: "Status", accessor: "status" },
  { label: "Start Date", accessor: "start_date" },
  { label: "End Date", accessor: "end_date" },
];

const GoalsPage = () => {
  const [loading, setLoading] = useState(true);
  const { goals, fetchGoals, deleteGoal, updateGoalStatus } = useGoalStore();

  useEffect(() => {
    const loadGoals = async () => {
      await fetchGoals();
      setLoading(false);
    };
    loadGoals();
  }, [fetchGoals]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteGoal(id);
    await fetchGoals();
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: Goal["status"]) => {
    setLoading(true);
    await updateGoalStatus(id, status);
    await fetchGoals();
    setLoading(false);
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <Box className="flex items-center">
        <h1 className="text-2xl font-semibold text-black">Your Goals</h1>
        <Button
          onClick={() => window.open("/goals/new", "_self")}
          className="ml-auto bg-blue-500 hover:bg-gray-600 text-white"
        >
          Add Goal
        </Button>
      </Box>

      <EntityTable
        columns={columns}
        data={goals}
        onEdit={(id) => window.open(`/goals/${id}`, "_self")}
        onDelete={handleDelete}
        actions={[
          {
            label: "Start Goal",
            condition: (goal: Goal) => goal.status === "notStarted",
            action: (goal: Goal) => handleUpdateStatus(goal.id, "onProgress"),
          },
          {
            label: "Mark as Completed",
            condition: (goal: Goal) => goal.status !== "completed",
            action: (goal: Goal) => handleUpdateStatus(goal.id, "completed"),
          },
        ]}
        loading={loading}
      />
    </div>
  );
};

export default GoalsPage;
