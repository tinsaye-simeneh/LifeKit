"use client";

import { Button, Input, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Goal } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const AddGoalPage = () => {
  const session = useSessionStore((state) => state.session);
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      category: "skill",
      status: "notStarted",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const newGoal: Omit<Goal, "id"> = {
        user_id: session?.user?.id,
        title: values.title,
        description: values.description,
        start_date: values.start_date,
        end_date: values.end_date,
        category: values.category as Goal["category"],
        status: values.status as Goal["status"],
      };

      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        form.reset();
      } else {
        console.error("Failed to create goal");
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <div>
      <h1>Add New Goal</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          placeholder="Enter goal title"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Enter goal description"
          {...form.getInputProps("description")}
        />
        <Input
          type="date"
          placeholder="Start date"
          {...form.getInputProps("start_date")}
        />
        <Input
          type="date"
          placeholder="End date"
          {...form.getInputProps("end_date")}
        />
        <Select
          label="Category"
          placeholder="Select category"
          data={[
            { value: "skill", label: "Skill" },
            { value: "project", label: "Project" },
            { value: "finance", label: "Finance" },
            { value: "personal", label: "Personal" },
          ]}
          {...form.getInputProps("category")}
        />
        <Select
          label="Status"
          placeholder="Select status"
          data={[
            { value: "notStarted", label: "Not Started" },
            { value: "onProgress", label: "On Progress" },
            { value: "completed", label: "Completed" },
          ]}
          {...form.getInputProps("status")}
        />
        <Button type="submit">Add Goal</Button>
      </form>
    </div>
  );
};

export default AddGoalPage;
