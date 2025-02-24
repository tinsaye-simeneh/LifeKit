import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RichTextInput from "@/components/RichTextInput";
import ProtectedRoute from "@/components/ProtectedRoute";
import { notifications } from "@mantine/notifications";

interface NoteFormProps {
  initialValues: {
    title: string;
    content: string;
  };
  onSubmit: (values: { id?: string; title: string; content: string }) => void;
}

const NoteForm = ({ initialValues, onSubmit }: NoteFormProps) => {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const router = useRouter();
  const form = useForm({ initialValues });

  const generateContent = async () => {
    if (!form.values.title.trim()) {
      notifications.show({
        title: "Error",
        message: "Please enter a title before generating content.",
        color: "red",
      });
      return;
    }

    setAiLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a detailed note content based on the title: "${form.values.title}"`,
        }),
      });

      const data = await response.json();

      console.log("AI Content Generated:", data.content);
      if (data?.content) {
        form.setFieldValue("content", data.content);
      } else {
        form.setFieldValue("content", "No content generated.");
      }
    } catch (error) {
      console.error("AI Content Generation Error:", error);
      notifications.show({
        title: "Error",
        message: "Failed to generate AI content.",
        color: "red",
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg mb-20 mt-10">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          Notes
        </h1>

        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            await onSubmit(values);
            setLoading(false);
          })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6"
        >
          {/* Title Input */}
          <TextInput
            label="Note Title"
            placeholder="Enter note title"
            {...form.getInputProps("title")}
            classNames={{ label: "text-black", input: "text-black" }}
            className="col-span-2"
            required
          />

          <Button
            onClick={generateContent}
            loading={aiLoading}
            className="bg-green-500 hover:bg-green-600 text-white col-span-2 md:col-span-1"
          >
            Generate Content
          </Button>

          <div className="col-span-2 mb-10">
            <RichTextInput
              value={form.values.content || ""}
              onChange={(value = "") =>
                form.setFieldValue("content", value as string)
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
            onClick={() => router.push("/notes")}
            className="w-full col-span-2 md:col-span-1 bg-red-500 hover:bg-red-600 text-white mt-4"
          >
            Cancel
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default NoteForm;
