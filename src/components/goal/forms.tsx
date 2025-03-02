"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RichTextInput from "@/components/RichTextInput";
import ProtectedRoute from "@/components/ProtectedRoute";

interface GoalFormProps {
  initialValues: {
    id?: string;
    title: string;
    description?: string;
    category: "skill" | "project" | "finance" | "personal" | "other";
    start_date: string;
    end_date: string;
    status: "notStarted" | "onProgress" | "completed";
  };
  onSubmit: (values: {
    id?: string;
    title: string;
    description?: string;
    category: "skill" | "project" | "finance" | "personal" | "other";
    start_date: string;
    end_date: string;
    status: "notStarted" | "onProgress" | "completed";
  }) => void;
}

const GoalForm = ({ initialValues, onSubmit }: GoalFormProps) => {
  const router = useRouter();
  const form = useForm({
    initialValues,
    validate: {
      title: (value) => (value ? null : "Title is required"),
      start_date: (value) => (value ? null : "Start date is required"),
      end_date: (value) => (value ? null : "End date is required"),
    },
  });
  const [loading, setLoading] = useState(false);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-black text-center">Goal</h1>

        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            await onSubmit(values);
            setLoading(false);
          })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg"
        >
          <TextInput
            label="Goal Title"
            placeholder="Enter goal title"
            {...form.getInputProps("title")}
            classNames={{ label: "text-black", input: "text-black" }}
            className="col-span-2 md:col-span-2"
            required
          />

          <div className="col-span-2 mb-10">
            <label className="text-black block mb-2">
              Description (Optional)
            </label>
            <RichTextInput
              value={form.values.description || ""}
              onChange={(value = "") =>
                form.setFieldValue("description", value as string)
              }
            />
          </div>

          <div className="col-span-1">
            <label className="text-black block mb-2">Category</label>
            <select
              {...form.getInputProps("category")}
              className="w-full p-2 border rounded text-black"
            >
              <option value="skill">Skill</option>
              <option value="project">Project</option>
              <option value="finance">Finance</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="text-black block mb-2">Status</label>
            <select
              {...form.getInputProps("status")}
              className="w-full p-2 border rounded text-black"
            >
              <option value="notStarted">Not Started</option>
              <option value="onProgress">On Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <TextInput
            type="date"
            label="Start Date"
            placeholder="Start date"
            {...form.getInputProps("start_date")}
            classNames={{ label: "text-black", input: "text-black" }}
            required
          />

          <TextInput
            type="date"
            label="End Date"
            placeholder="End date"
            {...form.getInputProps("end_date")}
            classNames={{ label: "text-black", input: "text-black" }}
            required
          />

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-gray-600 text-white col-span-2 md:col-span-1 mt-4 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
          <Button
            onClick={() => router.push("/goals")}
            className="w-full col-span-2 md:col-span-1 bg-red-500 hover:bg-red-600 text-white mt-4"
          >
            Cancel
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default GoalForm;
