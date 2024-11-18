"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import GoalForm from "@/components/goal/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useGoalStore } from "@/store/goalStore";

const EditGoalPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const goalId = Array.isArray(id) ? id[0] : id;

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
  }>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    category: "skill",
    status: "notStarted",
  });

  useEffect(() => {
    const loadGoalData = async () => {
      if (goalId && fetchGoal) {
        try {
          const goalData = await fetchGoal();

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
            console.warn("No goal data found for the provided goal ID");
          }
        } catch (error) {
          console.error("Error fetching goal data:", error);
        }
      }
    };

    loadGoalData();
  }, [goalId, fetchGoal]);

  const handleUpdate = async (values: {
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    category?: "skill" | "project" | "finance" | "personal";
    status?: "notStarted" | "onProgress" | "completed";
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

    try {
      await updateGoal(goalId, goalData);
      router.push("/goals");
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return <GoalForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditGoalPage;
