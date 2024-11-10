"use client";

import { Button, Input, Select, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Idea } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const AddIdeaPage = () => {
  const session = useSessionStore((state) => state.session);
  const form = useForm({
    initialValues: {
      name: "",
      priority: "medium" as "high" | "medium" | "low",
      status: "pending" as "completed" | "pending",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const newIdea: Omit<Idea, "id" | "created_at"> = {
        user_id: session?.user?.id,
        title: values.name,
        description: values.name,
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
        <Input placeholder="Enter idea name" {...form.getInputProps("name")} />
        <Select
          label="Priority"
          data={["high", "medium", "low"]}
          {...form.getInputProps("priority")}
        />
        <Select
          label="Status"
          data={["pending", "completed"]}
          {...form.getInputProps("status")}
        />
        <Textarea label="Notes" placeholder="Add any additional notes" />
        <Button type="submit">Add Idea</Button>
      </form>
    </div>
  );
};

export default AddIdeaPage;
