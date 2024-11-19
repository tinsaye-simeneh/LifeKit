"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import IdeaForm from "@/components/idea/forms";
import { useSessionStore } from "@/store/sessionStore";
import { useIdeaStore } from "@/store/ideaStore";
import { notifications } from "@mantine/notifications";

const EditIdeaPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const ideaId = Array.isArray(id) ? id[0] : id;

  const session = useSessionStore((state) => state.session);
  const fetchIdea = useIdeaStore((state) => state.fetchIdea);
  const updateIdea = useIdeaStore((state) => state.updateIdea);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    description: string;
  }) => {
    if (!ideaId) {
      console.error("No idea ID provided");
      return;
    }

    const ideaData = {
      ...values,
      id: ideaId,
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
        await updateIdea(ideaId, ideaData);
        router.push("/ideas");
      } catch (error) {
        console.error("Error updating idea:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return <IdeaForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditIdeaPage;
