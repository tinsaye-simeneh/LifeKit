"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IdeaFormProps {
  initialValues: {
    title: string;
    description: string;
  };
  onSubmit: (values: {
    id?: string;
    title: string;
    description: string;
  }) => void;
}
const IdeaForm = ({ initialValues, onSubmit }: IdeaFormProps) => {
  const form = useForm({
    initialValues,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        {initialValues ? "Edit Idea" : "Create Idea"}
      </h1>

      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <TextInput
          label="Idea Title"
          placeholder="Enter idea title"
          {...form.getInputProps("title")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
        />

        <TextInput
          label="Description"
          placeholder="Enter idea description"
          {...form.getInputProps("description")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
        />

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-gray-600 text-white ml-auto"
        >
          {initialValues ? "Update Idea" : "Create Idea"}
        </Button>
      </form>
    </div>
  );
};
export default IdeaForm;
