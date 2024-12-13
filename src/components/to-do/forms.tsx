import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TaskFormProps {
  initialValues: {
    name: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "onProgress" | "completed";
    due_date: string;
    description?: string;
  };
  onSubmit: (values: {
    id?: string;
    name: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "onProgress" | "completed";
    due_date: string;
    description?: string;
  }) => void;
}

const TaskForm = ({ initialValues, onSubmit }: TaskFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg my-20">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">Tasks</h1>

      <form
        onSubmit={form.onSubmit(async (values) => {
          setLoading(true);
          await onSubmit(values);
          setLoading(false);
        })}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6"
      >
        <Textarea
          label="Task Name"
          placeholder="Enter task name"
          {...form.getInputProps("name")}
          classNames={{ label: "text-black", input: "text-black h-20" }}
          className="col-span-2 md:col-span-1"
        />

        <TextInput
          type="date"
          label="Due Date"
          placeholder="due date"
          {...form.getInputProps("due_date")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2 md:col-span-1"
        />

        <Select
          label="Priority"
          data={["high", "medium", "low"]}
          {...form.getInputProps("priority")}
          classNames={{
            label: "text-black",
            input: "text-black",
            dropdown: "bg-white text-black",
          }}
          className="col-span-2 md:col-span-1"
        />

        <Select
          label="Status"
          data={["pending", "onProgress", "completed"]}
          {...form.getInputProps("status")}
          classNames={{
            label: "text-black",
            input: "text-black",
            dropdown: "bg-white text-black",
          }}
          className="col-span-2 md:col-span-1"
        />
        <Textarea
          label="Description"
          placeholder="Enter task description"
          {...form.getInputProps("description")}
          classNames={{ label: "text-black", input: "text-black h-32" }}
          className="col-span-2 mb-10"
        />

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white col-span-2 md:col-span-1 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>

        <Button
          onClick={() => router.push("/to-do")}
          className="w-full bg-red-500 hover:bg-red-600 text-white col-span-2 md:col-span-1"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
