"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GoalForm from "@/components/goal/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useGoalStore } from "@/store/goalStore";
import { notifications } from "@mantine/notifications";

const EditGoalPage = () => {
  const { id } = useParams();
  const goalId = Array.isArray(id) ? id[0] : id; // Ensure goalId is properly extracted

  const session = useSessionStore((state) => state.session);
  const fetchGoal = useGoalStore((state) => state.fetchGoal);
  const updateGoal = useGoalStore((state) => state.updateGoal);

  const [initialValues, setInitialValues] = useState<{
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    category: "skill" | "project" | "finance" | "personal";
    status: "notStarted" | "onProgress" | "completed";
  } | null>(null); // Initially null to ensure data is fetched before form renders

  // Effect hook to load goal data from API
  useEffect(() => {
    if (goalId && fetchGoal) {
      const loadGoalData = async () => {
        try {
          const goalData = await fetchGoal(goalId);

          if (goalData) {
            setInitialValues({
              title: goalData.title || "",
              description: goalData.description || "",
              start_date: goalData.start_date || "",
              end_date: goalData.end_date || "",
              category: goalData.category || "skill",
              status: goalData.status || "notStarted",
            });
          } else {
            notifications.show({
              title: "Error",
              message: "Goal not found.",
              color: "red",
            });
            setTimeout(() => window.open("/goals", "_self"), 500);
          }
        } catch (error) {
          console.error("Error fetching goal data:", error);
          notifications.show({
            title: "Error",
            message: "Failed to load goal data.",
            color: "red",
          });
        }
      };

      loadGoalData();
    }
  }, [goalId, fetchGoal]);

  // Handle form submission and goal update
  const handleUpdate = async (values: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    category: "skill" | "project" | "finance" | "personal";
    status: "notStarted" | "onProgress" | "completed";
  }) => {
    if (!goalId) {
      console.error("No goal ID provided");
      return;
    }

    const goalData = {
      ...values,
      id: goalId,
      user_id: session?.user?.id,
    };

    // Validation: Ensure all required fields are filled
    if (
      !goalData.title ||
      !goalData.description ||
      !goalData.start_date ||
      !goalData.end_date
    ) {
      notifications.show({
        title: "Error",
        message: "Please fill all the fields",
        color: "red",
      });
      return;
    }

    try {
      await updateGoal(goalId, goalData); // Call updateGoal with goalId and goalData
      notifications.show({
        title: "Success",
        message: "Goal updated successfully.",
        color: "green",
      });
      setTimeout(() => window.open("/goals", "_self"), 500);
    } catch (error) {
      console.error("Error updating goal:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update the goal.",
        color: "red",
      });
    }
  };
  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return <GoalForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditGoalPage;
