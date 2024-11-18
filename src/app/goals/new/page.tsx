"use client";

import GoalForm from "@/components/goal/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useGoalStore } from "@/store/goalStore";

const AddGoalPage = () => {
  const session = useSessionStore((state) => state.session);
  const addGoal = useGoalStore((state) => state.addGoal);

  const handleCreate = async (values: {
    title: string;
    description: string;
    start_date?: string;
    end_date?: string;
    category?: "skill" | "project" | "finance" | "personal";
    status?: "notStarted" | "onProgress" | "completed";
  }) => {
    const goalData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    try {
      await addGoal(goalData);
      window.open("/goals", "_self");
    } catch (error) {
      console.error("Error creating goal:", error);
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
