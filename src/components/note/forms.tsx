import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface NoteFormProps {
  initialValues: {
    title: string;
    content: string;
  };
  onSubmit: (values: { id?: string; title: string; content: string }) => void;
}

const NoteForm = ({ initialValues, onSubmit }: NoteFormProps) => {
  const form = useForm({
    initialValues,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg my-20">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">Notes</h1>

      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6"
      >
        <TextInput
          label="Note Title"
          placeholder="Enter note title"
          {...form.getInputProps("title")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
          required
        />
        <Textarea
          label="Content"
          placeholder="Enter note content"
          {...form.getInputProps("content")}
          classNames={{ label: "text-black", input: "text-black" }}
          className="col-span-2"
          required
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-gray-600 text-white mt-4 col-span-1"
        >
          Submit
        </Button>
        <Button
          onClick={() => window.open("/notes", "_self")}
          className="w-full col-span-1 bg-red-500 hover:bg-red-600 text-white mt-4"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default NoteForm;
