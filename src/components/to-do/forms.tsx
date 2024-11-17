"use client";

import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface TaskFormProps {
  initialValues: {
    name: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "onProgress" | "completed";
    due_date: string;
  };
  onSubmit: (values: {
    id?: string;
    name: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "onProgress" | "completed";
    due_date: string;
  }) => void;
}

const TaskForm = ({ initialValues, onSubmit }: TaskFormProps) => {
  const form = useForm({
    initialValues,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg my-20">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        {initialValues ? "Create Task" : "Edit Task"}
      </h1>

      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <TextInput
          label="Task Name"
          placeholder="Enter task name"
          {...form.getInputProps("name")}
          classNames={{ label: "text-black", input: "text-black" }}
        />
        <TextInput
          label="Due Date"
          placeholder="Select due date"
          type="date"
          {...form.getInputProps("due_date")}
          classNames={{ label: "text-black", input: "text-black" }}
        />

        <Select
          label="Priority"
          data={["high", "medium", "low"]}
          {...form.getInputProps("priority")}
          classNames={{ label: "text-black", input: "text-black" }}
        />

        <Select
          label="Status"
          data={["pending", "onProgress", "completed"]}
          {...form.getInputProps("status")}
          classNames={{ label: "text-black", input: "text-black" }}
        />

        <Button
          type="submit"
          className="w-full col-span-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          {initialValues ? "Create Task" : "Update Task"}
        </Button>

        <Button
          onClick={() => window.open("/to-do", "_self")}
          className="w-full col-span-2 bg-red-500 hover:bg-red-600 text-white"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
