"use client";

import { notifications } from "@mantine/notifications";
import TaskForm from "@/components/to-do/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useTaskStore } from "@/store/todoStore";

const ToDoPage = () => {
  const session = useSessionStore((state) => state.session);
  const createToDo = useTaskStore((state) => state.addTask);

  // Ensure the session is loaded before proceeding to avoid errors
  if (!session?.user?.id) {
    return <div>You need to be logged in to create tasks.</div>;
  }

  const handleCreate = async (values: {
    name: string;
    priority: "low" | "medium" | "high";
    due_date: string;
    status: "pending" | "onProgress" | "completed";
  }) => {
    const toDoData = {
      ...values,
      user_id: session?.user?.id,
    };

    try {
      await createToDo(toDoData);
      notifications.show({
        title: "Success",
        message: "To-do item created successfully.",
        color: "green",
      });
      window.open("/to-do", "_self"); // Redirect to the to-do list after success
    } catch (error) {
      console.error("Error creating to-do item:", error);
      notifications.show({
        title: "Error",
        message: "Failed to create the to-do item.",
        color: "red",
      });
    }
  };

  return (
    <TaskForm
      initialValues={{
        name: "",
        priority: "low",
        due_date: new Date().toISOString().split("T")[0],
        status: "pending",
      }}
      onSubmit={handleCreate}
    />
  );
};

export default ToDoPage;
