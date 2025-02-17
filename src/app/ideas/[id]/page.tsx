"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import IdeaForm from "@/components/idea/forms";
import { useAuth } from "@/context/AuthContext";
import { useIdeaStore } from "@/store/ideaStore";
import { notifications } from "@mantine/notifications";

const EditIdeaPage = () => {
  const { id } = useParams();
  const ideaId = Array.isArray(id) ? id[0] : id;

  const { session } = useAuth();
  const fetchIdea = useIdeaStore((state) => state.fetchIdea);
  const updateIdea = useIdeaStore((state) => state.updateIdea);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // We set this to true to indicate the page is now client-side
  }, []);

  useEffect(() => {
    const loadIdeaData = async () => {
      if (ideaId && fetchIdea) {
        try {
          const ideaData = await fetchIdea(ideaId);
          if (ideaData) {
            setInitialValues({
              title: ideaData.title || "",
              description: ideaData.description || "",
            });
          } else {
            setError("Idea not found");
          }
        } catch (error) {
          setError("Error fetching idea data");
          console.error("Error fetching idea data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadIdeaData();
  }, [ideaId, fetchIdea]);

  const handleUpdate = async (values: {
    title: string;
    description?: string;
  }) => {
    if (!ideaId) {
      console.error("No idea ID provided");
      return;
    }

    const ideaData = {
      ...values,
      id: ideaId, // Include the idea ID here
      user_id: session?.user?.id,
    };

    if (!ideaData.title) {
      console.error("Please fill the title field");
      notifications.show({
        title: "Error",
        message: "Please fill the title field",
        color: "red",
      });
      return;
    } else {
      try {
        await updateIdea(ideaId, ideaData);
        notifications.show({
          title: "Success",
          message: "Idea updated successfully.",
          color: "green",
        });

        setTimeout(() => window.open("/ideas", "_self"), 500);
      } catch (error) {
        console.error("Error updating idea:", error);
        notifications.show({
          title: "Error",
          message: "Failed to update idea.",
          color: "red",
        });
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!isClient) return null;

  return <IdeaForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditIdeaPage;
