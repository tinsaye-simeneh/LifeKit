"use client";

import { Button, Input, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Idea } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const AddIdeaPage = () => {
  const session = useSessionStore((state) => state.session);
  const form = useForm({
    initialValues: {
      title: "",
      notes: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const newIdea: Omit<Idea, "id" | "created_at"> = {
        user_id: session?.user?.id,
        title: values.title,
        description: values.notes,
      };

      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIdea),
      });

      if (response.ok) {
        form.reset();
      } else {
        console.error("Failed to create idea");
      }
    } catch (error) {
      console.error("Error creating idea:", error);
    }
  };

  return (
    <div>
      <h1>Add New Idea</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          placeholder="Enter idea title"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Enter idea description"
          {...form.getInputProps("description")}
        />
        <Button type="submit">Add Idea</Button>
      </form>
    </div>
  );
};

export default AddIdeaPage;
