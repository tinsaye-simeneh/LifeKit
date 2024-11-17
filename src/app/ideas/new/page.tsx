"use client";

import IdeaForm from "@/components/idea/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useIdeaStore } from "@/store/ideaStore";

const AddIdeaPage = () => {
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

    try {
      await createIdea(ideaData);
      window.open("/ideas", "_self");
    } catch (error) {
      console.error("Error creating idea:", error);
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
