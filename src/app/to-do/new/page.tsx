"use client";

import { useEffect, useState } from "react";
import { Button, Input, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Task } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const TasksPage = () => {
  const session = useSessionStore((state) => state.session);
  const [tasks, setTasks] = useState<Task[]>([]);
  const form = useForm({
    initialValues: {
      name: "",
      priority: "medium" as "high" | "medium" | "low",
      status: "pending" as "completed" | "pending",
    },
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const newTask: Omit<Task, "id" | "created_at"> = {
        user_id: session?.user?.id,
        name: values.name,
        priority: values.priority,
        status: values.status,
      };

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        await fetchTasks();
        form.reset();
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updates = { status: "completed" };
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchTasks();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input placeholder="Enter task name" {...form.getInputProps("name")} />
        <Select
          label="Priority"
          data={["high", "medium", "low"]}
          {...form.getInputProps("priority")}
        />
        <Select
          label="Status"
          data={["pending", "completed"]}
          {...form.getInputProps("status")}
        />
        <Textarea label="Notes" placeholder="Add any additional notes" />

        <Button type="submit">Add Task</Button>
      </form>

      <h2>Your Tasks</h2>
      <ul>
        {tasks?.map((task?: Task) => (
          <li key={task?.id}>
            <p>
              {task?.name} - {task?.priority} - {task?.status}
            </p>
            <Button onClick={() => handleDelete(task?.id as string)}>
              Delete
            </Button>
            <Button onClick={() => handleUpdate(task?.id as string)}>
              Update
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
