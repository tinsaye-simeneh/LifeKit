"use client";

import RichTextInput from "@/components/RichTextInput";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface IdeaFormProps {
  initialValues: {
    title: string;
    description?: string;
  };
  onSubmit: (values: {
    id?: string;
    title: string;
    description?: string;
  }) => void;
}

const IdeaForm = ({ initialValues, onSubmit }: IdeaFormProps) => {
  const router = useRouter();
  const form = useForm({
    initialValues,
    validate: {
      title: (value) => (value.trim() === "" ? "Title is required" : null),
    },
  });
  const [loading, setLoading] = useState(false);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-black text-center">Idea</h1>

        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            await onSubmit(values);
            setLoading(false);
          })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg"
        >
          <TextInput
            label="Idea Title"
            placeholder="Enter idea title"
            {...form.getInputProps("title")}
            error={form.errors.title}
            classNames={{ label: "text-black", input: "text-black" }}
            className="col-span-2"
            required
          />

          <div className="col-span-2 mb-10">
            <RichTextInput
              value={form.values.description || ""}
              onChange={(value = "") =>
                form.setFieldValue("description", value as string)
              }
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-gray-600 text-white mt-4 col-span-2 md:col-span-1 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
          <Button
            onClick={() => router.push("/ideas")}
            className="w-full col-span-2 md:col-span-1 bg-red-500 hover:bg-red-600 text-white mt-4"
          >
            Cancel
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default IdeaForm;
