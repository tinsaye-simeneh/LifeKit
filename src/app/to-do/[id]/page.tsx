"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskForm from "@/components/to-do/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useTaskStore } from "@/store/todoStore";
import { notifications } from "@mantine/notifications";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTaskData = async () => {
      if (taskId && fetchTask) {
        try {
          const taskData = await fetchTask(taskId);
          if (taskData) {
            setInitialValues({
              name: taskData.name || "",
              priority: taskData.priority || "low",
              status: taskData.status || "pending",
              due_date: taskData.due_date || "",
            });
          } else {
            setError("Task not found");
          }
        } catch (error) {
          setError("Error fetching task data");
          console.error("Error fetching task data:", error);
        } finally {
          setLoading(false);
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
      notifications.show({
        title: "Success",
        message: "Task updated successfully.",
        color: "green",
      });
      router.push("/to-do");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update task entry.",
        color: "red",
      });
      console.error("Error updating task entry:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return <TaskForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditTaskPage;
