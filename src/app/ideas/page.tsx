"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@mantine/core";
import { Idea } from "@/types/models";
import { useSessionStore } from "@/store/sessionStore";

const IdeasPage = () => {
  const session = useSessionStore((state) => state.session);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const fetchIdeas = useCallback(async () => {
    try {
      if (session) {
        const response = await fetch(`/api/ideas?user_id=${session?.user?.id}`);
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error("Failed to fetch ideas:", error);
    }
  }, [session]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/ideas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchIdeas();
      } else {
        console.error("Failed to delete idea");
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updates = { status: "completed" };
      const response = await fetch(`/api/ideas/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchIdeas();
      } else {
        console.error("Failed to update idea");
      }
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };

  return (
    <div>
      <h1>Your Ideas</h1>
      <ul>
        {ideas?.map((idea?: Idea) => (
          <li key={idea?.id}>
            <p>
              {idea?.title} - {idea?.description}
            </p>
            <Button onClick={() => handleDelete(idea?.id as string)}>
              Delete
            </Button>
            <Button onClick={() => handleUpdate(idea?.id as string)}>
              Update
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeasPage;
