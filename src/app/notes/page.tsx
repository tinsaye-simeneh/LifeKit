"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useNoteStore } from "@/store/noteStore";
import { useSessionStore } from "@/store/sessionStore";
import { notifications } from "@mantine/notifications";

const columns = [
  { label: "Title", accessor: "title" },
  { label: "Content", accessor: "content" },
  { label: "Created_at", accessor: "created_at" },
];

const NotesPage = () => {
  const [loading, setLoading] = useState(true);
  const { notes, fetchNotes, deleteNote } = useNoteStore();
  const { session } = useSessionStore();

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      // await fetchNotes(session?.user?.id as string);
      setLoading(false);
    };
    loadNotes();
  }, [fetchNotes, loading, session?.user?.id]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteNote(id);
    notifications.show({
      title: "Success",
      message: "Task deleted successfully.",
      color: "green",
    });

    await fetchNotes(session?.user?.id as string);
    setLoading(false);
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <Box className="flex mt-5">
        <h5 className="text-2xl font-semibold text-black text-center mt-2">
          Notes
        </h5>
        <div className="flex ml-auto">
          <Button
            onClick={() => setLoading(true)}
            className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            Refresh
          </Button>
          <Button
            onClick={() => window.open("/note/new", "_self")}
            className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            Add Note
          </Button>
        </div>
      </Box>

      <EntityTable
        columns={columns}
        data={notes}
        onEdit={(id) => window.open(`/note/${id}`, "_self")}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default NotesPage;
