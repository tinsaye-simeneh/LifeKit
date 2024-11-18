"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface GoalFormProps {
  initialValues: {
    id?: string;
    title: string;
    description: string;
    category?: "skill" | "project" | "finance" | "personal";
    start_date?: string;
    end_date?: string;
    status?: "notStarted" | "onProgress" | "completed";
  };
  onSubmit: (values: {
    id?: string;
    title: string;
    description: string;
    category?: "skill" | "project" | "finance" | "personal";
    start_date?: string;
    end_date?: string;
    status?: "notStarted" | "onProgress" | "completed";
  }) => void;
}

const GoalForm = ({ initialValues, onSubmit }: GoalFormProps) => {
  const form = useForm({
    initialValues,
  });

  const isEditMode = Boolean(initialValues.id);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        {isEditMode ? "Edit Goal" : "Create Goal"}
      </h1>

      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <TextInput
          label="Goal Title"
          placeholder="Enter goal title"
          {...form.getInputProps("title")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
        />

        <TextInput
          label="Description"
          placeholder="Enter goal description"
          {...form.getInputProps("description")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
        />

        <div className="col-span-2">
          <label className="text-black block mb-2">Category</label>
          <select
            {...form.getInputProps("category")}
            className="w-full p-2 border rounded text-black"
          >
            <option value="skill">Skill</option>
            <option value="project">Project</option>
            <option value="finance">Finance</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <TextInput
          type="date"
          label="Start Date"
          placeholder="Start date"
          {...form.getInputProps("start_date")}
          classNames={{ label: "text-black", input: "text-black" }}
        />

        <TextInput
          type="date"
          label="End Date"
          placeholder="End date"
          {...form.getInputProps("end_date")}
          classNames={{ label: "text-black", input: "text-black" }}
        />

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-gray-600 text-white col-span-2 mt-4"
        >
          {isEditMode ? "Edit Goal" : "Create Goal"}
        </Button>
      </form>
    </div>
  );
};

export default GoalForm;
