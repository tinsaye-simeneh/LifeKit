"use client";

import { useEffect } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useTaskStore } from "@/store/todoStore";

const columns = [
  { label: "Task Name", accessor: "name" },
  { label: "Priority", accessor: "priority" },
  { label: "Status", accessor: "status" },
  { label: "Due Date", accessor: "due_date" },
  { label: "Created At", accessor: "created_at" },
];

const TasksPage = () => {
  const { tasks, fetchTasks, deleteTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <Box className="flex mt-5">
        <h5 className="text-2xl font-semibold text-black text-center mt-2">
          Your Task List
        </h5>
        <Button
          onClick={() => window.open("/to-do/new", "_self")}
          className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
        >
          Add Task
        </Button>
      </Box>

      <EntityTable
        columns={columns}
        data={tasks}
        onEdit={(id) => window.open(`/to-do/${id}`, "_self")}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default TasksPage;
