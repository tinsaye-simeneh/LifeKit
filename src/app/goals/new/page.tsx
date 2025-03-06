"use client";

import GoalForm from "@/components/goal/forms";
import { useAuth } from "@/context/AuthContext";
import { useGoalStore } from "@/store/goalStore";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const AddGoalPage = () => {
  const router = useRouter();
  const { session } = useAuth();
  const addGoal = useGoalStore((state) => state.addGoal);

  const handleCreate = async (values: {
    title: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    category?: "skill" | "project" | "finance" | "personal" | "other";
    status?: "notStarted" | "onProgress" | "completed";
  }) => {
    const { title, start_date, end_date, category, status } = values;

    if (!title || !start_date || !end_date || !category || !status) {
      notifications.show({
        title: "Error",
        message: "Please fill all required the fields",
        color: "red",
      });
      return;
    }

    const goalData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    try {
      await addGoal(goalData);
      notifications.show({
        title: "Success",
        message: "Goal created successfully.",
        color: "green",
      });
      setTimeout(() => router.push("/goals"), 1000);
    } catch (error) {
      console.error("Error creating goal:", error);
      notifications.show({
        title: "Error",
        message: "Failed to create the goal.",
        color: "red",
      });
    }
  };

  return (
    <GoalForm
      initialValues={{
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        category: "skill",
        status: "notStarted",
      }}
      onSubmit={handleCreate}
    />
  );
};

export default AddGoalPage;
