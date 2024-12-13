"use client";

import IdeaForm from "@/components/idea/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useIdeaStore } from "@/store/ideaStore";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const AddIdeaPage = () => {
  const router = useRouter();
  const session = useSessionStore((state) => state.session);
  const createIdea = useIdeaStore((state) => state.addIdea);

  const handleCreate = async (values: {
    title: string;
    description: string;
  }) => {
    const ideaData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    if (!ideaData.title || !ideaData.description) {
      console.error("Please fill all the fields");
      notifications.show({
        title: "Error",
        message: "Please fill all the fields",
        color: "red",
      });
      return;
    } else {
      try {
        await createIdea(ideaData);
        notifications.show({
          title: "Success",
          message: "Idea created successfully.",
          color: "green",
        });
        setTimeout(() => router.push("/ideas"), 1000);
      } catch (error) {
        console.error("Error creating idea:", error);
        notifications.show({
          title: "Error",
          message: "Failed to create the idea.",
          color: "red",
        });
      }
    }
  };

  return (
    <IdeaForm
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={handleCreate}
    />
  );
};

export default AddIdeaPage;
