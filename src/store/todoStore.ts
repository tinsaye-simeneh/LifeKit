"use client";

import { create } from "zustand";
import { Task } from "@/types/models";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  fetchTasks: (userId: string) => Promise<void>;
  fetchTask: (id?: string) => Promise<Task | undefined>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: async (task) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    }
  },
  updateTask: async (id, updates) => {
    const response = await fetch(`/api/tasks/update-task?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    }
  },
  deleteTask: async (id) => {
    const response = await fetch(`/api/tasks/update-task?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    }
  },
  fetchTasks: async (userId) => {
    const response = await fetch(`/api/tasks?user_id=${userId}`);
    if (response.ok) {
      const tasks = await response.json();
      set({ tasks });
    }
  },
  fetchTask: async (id?: string) => {
    const response = await fetch(`/api/tasks/get-task?id=${id}`);
    if (response.ok) {
      return await response.json();
    }
  },
}));
