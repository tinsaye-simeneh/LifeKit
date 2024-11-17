"use client";

import CustomNotification from "@/components/Notification";
import ToDoForm from "@/components/to-do/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useTaskStore } from "@/store/todoStore";

const ToDoPage = () => {
  const session = useSessionStore((state) => state.session);
  const createToDo = useTaskStore((state) => state.addTask);

  const handleCreate = async (values: {
    name: string;
    priority: "low" | "medium" | "high";
    due_date: string;
    status: "pending" | "onProgress" | "completed";
  }) => {
    const toDoData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    try {
      await createToDo(toDoData);
      CustomNotification({
        title: "Success",
        content: "To-do item created successfully.",
        color: "green",
        position: "top-right",
      });
      window.open("/to-do", "_self");
    } catch (error) {
      console.error("Error creating to-do item:", error);
    }
  };

  return (
    <ToDoForm
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
