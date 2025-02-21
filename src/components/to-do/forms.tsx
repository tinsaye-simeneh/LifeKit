"use client";

import { useState } from "react";
import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import RichTextInput from "@/components/RichTextInput";
import ProtectedRoute from "@/components/ProtectedRoute";
import { createGoogleCalendarEvent } from "@/utils/googleCalendar";
import { useAuth } from "@/context/AuthContext";

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

  const { session } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (values: any) => {
    setLoading(true);

    await onSubmit(values);

    if (session?.access_token) {
      await createGoogleCalendarEvent(session.access_token, values);
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg my-20">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          Tasks
        </h1>

        <form
          onSubmit={form.onSubmit(handleFormSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6"
        >
          <Textarea
            label="Task Name"
            placeholder="Enter task name"
            {...form.getInputProps("name")}
            classNames={{ label: "text-black", input: "text-black h-20" }}
            className="col-span-2 md:col-span-1"
            required
          />

          <TextInput
            type="date"
            label="Due Date"
            placeholder="due date"
            {...form.getInputProps("due_date")}
            classNames={{ label: "text-black", input: "text-black" }}
            className="col-span-2 md:col-span-1"
            required
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
          <div className="col-span-2 mb-10">
            <RichTextInput
              value={form.values.description || ""}
              onChange={(value) =>
                form.setFieldValue("description", value as string)
              }
            />
          </div>
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
    </ProtectedRoute>
  );
};

export default TaskForm;
