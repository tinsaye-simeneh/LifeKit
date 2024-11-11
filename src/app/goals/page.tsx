"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@mantine/core";
import { Goal } from "@/types/models"; // Update this import based on your project structure

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = useCallback(async () => {
    try {
      const response = await fetch(`/api/goals`);
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchGoals();
      } else {
        console.error("Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: Goal["status"]) => {
    try {
      const updates = { status };
      const response = await fetch(`/api/goals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        await fetchGoals();
      } else {
        console.error("Failed to update goal");
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div>
      <h1>Your Goals</h1>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <p>
              <strong>{goal.title}</strong> - {goal.description}
              <br />
              <em>Category: {goal.category}</em>
              <br />
              <em>Status: {goal.status}</em>
            </p>
            <Button onClick={() => handleDelete(goal.id)}>Delete</Button>
            {goal.status !== "completed" && (
              <Button onClick={() => handleUpdateStatus(goal.id, "completed")}>
                Mark as Completed
              </Button>
            )}
            {goal.status === "notStarted" && (
              <Button onClick={() => handleUpdateStatus(goal.id, "onProgress")}>
                Start Goal
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsPage;
