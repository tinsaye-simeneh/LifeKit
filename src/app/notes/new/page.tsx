"use client";

import { notifications } from "@mantine/notifications";
import { useSessionStore } from "@/store/sessionStore";
import { useNoteStore } from "@/store/noteStore";
import NoteForm from "@/components/note/forms";

const NewNotePage = () => {
  const session = useSessionStore((state) => state.session);
  const { addNote } = useNoteStore();

  if (!session?.user?.id) {
    return <div>You need to be logged in to create Note.</div>;
  }

  const handleCreate = async (values: { title: string; content: string }) => {
    const noteData = {
      ...values,
      id: "",
      user_id: session?.user?.id,
    };

    try {
      await addNote(noteData);
      notifications.show({
        title: "Success",
        message: "Note created successfully.",
        color: "green",
      });
      window.open("/note", "_self");
    } catch (error) {
      console.error("Error creating note:", error);
      notifications.show({
        title: "Error",
        message: "Failed to create the note.",
        color: "red",
      });
    }
  };

  return (
    <NoteForm
      initialValues={{
        title: "",
        content: "",
      }}
      onSubmit={handleCreate}
    />
  );
};

export default NewNotePage;
