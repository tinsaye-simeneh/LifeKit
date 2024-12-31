"use client";

import { useEffect, useState } from "react";
import { Box, Button, Select } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useTaskStore } from "@/store/todoStore";
import { useSessionStore } from "@/store/sessionStore";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const columns = [
  { label: "Task Name", accessor: "name" },
  { label: "Priority", accessor: "priority" },
  { label: "Status", accessor: "status" },
  { label: "Due Date", accessor: "due_date" },
  { label: "Created At", accessor: "created_at" },
];

const TasksPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { tasks, fetchTasks, deleteTask } = useTaskStore();
  const { session } = useSessionStore();
  const [taskStatus, setTaskStatus] = useState("all");

  const pendingTasks = tasks.filter((task) => task.status === taskStatus);
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const onprogressTasks = tasks.filter((task) => task.status === "onProgress");

  const taskOptions = [
    { value: "all", label: `All (${tasks.length})` },
    { value: "pending", label: `Pending (${pendingTasks.length})` },
    {
      value: "onProgress",
      label: `On Progress (${onprogressTasks.length})`,
    },
    { value: "completed", label: `Completed (${completedTasks.length})` },
  ];

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks(session?.user?.id as string);
      setLoading(false);
    };
    loadTasks();
  }, [fetchTasks, loading, session?.user?.id]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteTask(id);
    notifications.show({
      title: "Success",
      message: "Task deleted successfully.",
      color: "green",
    });

    await fetchTasks(session?.user?.id as string);
    setLoading(false);
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <Box className="flex mt-5">
        <div className="md:w-1/6 w-1/2">
          <Select
            placeholder="Pick a status"
            value={taskStatus}
            onChange={(value) => setTaskStatus(value as string)}
            data={taskOptions}
            classNames={{
              label: "text-black",
              input: "text-black border-none outline-none text-lg",
              dropdown: "bg-white text-black",
            }}
          />
        </div>
        <div className="flex ml-auto">
          <Button
            onClick={() => setLoading(true)}
            className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            Reload
          </Button>
          <Button
            onClick={() => router.push("/to-do/new")}
            className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            <FaPlus className="mr-2" /> Add
          </Button>
        </div>
      </Box>

      {taskStatus === "all" && (
        <EntityTable
          columns={columns}
          data={tasks}
          onEdit={(id) => router.push(`/to-do/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      {taskStatus === "pending" && (
        <EntityTable
          columns={columns}
          data={pendingTasks}
          onEdit={(id) => router.push(`/to-do/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      {taskStatus === "completed" && (
        <EntityTable
          columns={columns}
          data={completedTasks}
          onEdit={(id) => router.push(`/to-do/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      {taskStatus === "onProgress" && (
        <EntityTable
          columns={columns}
          data={tasks.filter((task) => task.status === "onProgress")}
          onEdit={(id) => router.push(`/to-do/${id}`)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TasksPage;
