"use client";

import { create } from "zustand";
import { PersonalNote } from "@/types/models";

type NoteStore = {
  notes: PersonalNote[];
  setNotes: (notes: PersonalNote[]) => void;
  addNote: (note: PersonalNote) => void;
  updateNote: (id: string, updates: Partial<PersonalNote>) => void;
  deleteNote: (id: string) => void;
  fetchNotes: (userId: string) => Promise<void>;
  fetchNote: (id?: string) => Promise<PersonalNote | undefined>;
};

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: async (note) => {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (response.ok) {
      const newNote = await response.json();
      set((state) => ({ notes: [...state.notes, newNote] }));
    }
  },
  updateNote: async (id, updates) => {
    const response = await fetch(`/api/notes/update-note?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedNote = await response.json();
      set((state) => ({
        notes: state.notes.map((note) => (note.id === id ? updatedNote : note)),
      }));
    }
  },
  deleteNote: async (id) => {
    const response = await fetch(`/api/notes/update-note?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    }
  },
  fetchNotes: async (userId) => {
    const response = await fetch(`/api/notes?user_id=${userId}`);
    const notes = await response.json();
    set({ notes });
  },
  fetchNote: async (id) => {
    if (!id) return;

    const response = await fetch(`/api/notes/get-note?id=${id}`);
    return await response.json();
  },
}));
