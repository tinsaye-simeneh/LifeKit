"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskForm from "@/components/to-do/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useTaskStore } from "@/store/todoStore";

const EditTaskPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const taskId = Array.isArray(id) ? id[0] : id;

  const session = useSessionStore((state) => state.session);
  const fetchTask = useTaskStore((state) => state.fetchTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [initialValues, setInitialValues] = useState({
    name: "",
    priority: "low" as "high" | "medium" | "low",
    status: "pending" as "pending" | "onProgress" | "completed",
    due_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const loadTaskData = async () => {
      if (taskId && fetchTask) {
        try {
          const taskData = await fetchTask(taskId);

          console.log("taskData", taskData);

          if (taskData) {
            setInitialValues({
              name: taskData.name || "",
              priority: taskData.priority || "low",
              status: taskData.status || "pending",
              due_date:
                taskData.due_date || new Date().toISOString().split("T")[0],
            });
          } else {
            console.warn("No task data found for the provided task ID");
          }
        } catch (error) {
          console.error("Error fetching task data:", error);
        }
      }
    };

    loadTaskData();
  }, [taskId, fetchTask]);

  const handleUpdate = async (values: {
    name: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "onProgress" | "completed";
    due_date: string;
  }) => {
    if (!taskId) {
      console.error("No task ID provided");
      return;
    }

    const taskData = {
      ...values,
      id: taskId,
      user_id: session?.user?.id,
    };

    try {
      await updateTask(taskId, taskData);
      router.push("/tasks");
    } catch (error) {
      console.error("Error updating task entry:", error);
    }
  };

  return <TaskForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditTaskPage;
