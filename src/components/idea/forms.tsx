"use client";

import { Button, Textarea, TextInput } from "@mantine/core";
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
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg mt-14">
      <h1 className="text-3xl font-bold text-black text-center">Idea</h1>

      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg"
      >
        <TextInput
          label="Idea Title"
          placeholder="Enter idea title"
          {...form.getInputProps("title")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
        />

        <Textarea
          label="Description"
          placeholder="Enter idea description"
          {...form.getInputProps("description")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
        />

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-gray-600 text-white mt-4 col-span-1"
        >
          Submit
        </Button>
        <Button
          onClick={() => window.open("/ideas", "_self")}
          className="w-full col-span-1 bg-red-500 hover:bg-red-600 text-white mt-4"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};
export default IdeaForm;
