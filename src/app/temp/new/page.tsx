"use client";

import { notifications } from "@mantine/notifications";
import { useAuth } from "@/context/AuthContext";
import { useTempStore } from "@/store/tempStore";
import TempForm from "@/components/temp/forms";

const NewTempPage = () => {
  const { session } = useAuth();
  const { addTemp } = useTempStore();

  if (!session?.user?.id) {
    return <div>You need to be logged in to create Temp.</div>;
  }

  const handleCreate = async (values: { content: string }) => {
    const TempData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    try {
      await addTemp(TempData);
      notifications.show({
        title: "Success",
        message: "Temp created successfully.",
        color: "green",
      });
      setTimeout(() => window.open("/temp", "_self"), 500);
    } catch (error) {
      console.error("Error creating temp:", error);
      notifications.show({
        title: "Error",
        message: "Failed to create the temp.",
        color: "red",
      });
    }
  };

  return (
    <TempForm
      initialValues={{
        content: "",
      }}
      onSubmit={handleCreate}
    />
  );
};

export default NewTempPage;
