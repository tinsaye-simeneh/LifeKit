"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useIdeaStore } from "@/store/ideaStore";
import { useAuth } from "@/context/AuthContext";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const columns = [
  { label: "Title", accessor: "title" },
  { label: "Description", accessor: "description" },
  { label: "Status", accessor: "status" },
  { label: "Created At", accessor: "created_at" },
];

const IdeasPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { ideas, fetchIdeas, deleteIdea } = useIdeaStore();
  const { session } = useAuth();

  useEffect(() => {
    const loadIdeas = async () => {
      await fetchIdeas(session?.user?.id as string);
      setLoading(false);
    };
    loadIdeas();
  }, [fetchIdeas, session?.user?.id, loading]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteIdea(id);
    notifications.show({
      title: "Success",
      message: "Idea deleted successfully.",
      color: "green",
    });
    await fetchIdeas(session?.user?.id as string);

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
        <Box className="flex mt-5">
          <h5 className="text-2xl font-semibold text-black text-center">
            Ideas ({ideas.length})
          </h5>
          <div className="flex ml-auto">
            <Button
              onClick={() => setLoading(true)}
              className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
            >
              Reload
            </Button>
            <Button
              onClick={() => router.push("/ideas/new")}
              className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
            >
              <FaPlus className="mr-2" /> Add
            </Button>
          </div>
        </Box>
        <span className="text-gray-400 text-sm">
          This page is dedicated for managing your ideas.
        </span>

        <EntityTable
          columns={columns}
          data={ideas}
          onEdit={(id) => router.push(`/ideas/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </ProtectedRoute>
  );
};

export default IdeasPage;
