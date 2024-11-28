"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NoteForm from "@/components/note/forms";
import { useNoteStore } from "@/store/noteStore";
import { notifications } from "@mantine/notifications";

const EditNotePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const noteId = id as string;

  const { fetchNote, updateNote } = useNoteStore();

  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      setLoading(true);
      const note = await fetchNote(noteId);

      if (!note) {
        setError("Note not found");
        setLoading(false);
        return;
      }

      setInitialValues({
        title: note.title,
        content: note.content,
      });

      setLoading(false);
    };

    loadNote();
  }, [fetchNote, noteId]);

  const handleUpdate = async (values: { title: string; content: string }) => {
    try {
      await updateNote(noteId, values);
      notifications.show({
        title: "Success",
        message: "Note updated successfully.",
        color: "green",
      });
      router.push("/note");
    } catch (error) {
      console.error("Error updating note:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update the note.",
        color: "red",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return <NoteForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditNotePage;
