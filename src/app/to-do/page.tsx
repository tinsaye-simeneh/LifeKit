"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mantine/core";
import EntityTable from "@/components/EntityTable";
import { useTaskStore } from "@/store/todoStore";
import { useSessionStore } from "@/store/sessionStore";
import { notifications } from "@mantine/notifications";
import { FaPlus } from "react-icons/fa";

const columns = [
  { label: "Task Name", accessor: "name" },
  { label: "Priority", accessor: "priority" },
  { label: "Status", accessor: "status" },
  { label: "Due Date", accessor: "due_date" },
  { label: "Created At", accessor: "created_at" },
  { label: "Updated At", accessor: "updated_at" },
];

const TasksPage = () => {
  const [loading, setLoading] = useState(true);
  const { tasks, fetchTasks, deleteTask } = useTaskStore();
  const { session } = useSessionStore();
  const [taskStatus, setTaskStatus] = useState("pending");

  const pendingTasks = tasks.filter((task) => task.status === taskStatus);
  const completedTasks = tasks.filter((task) => task.status === "completed");

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
        <h5 className="text-2xl font-semibold text-black text-center ">
          Tasks (
          {taskStatus === "all"
            ? tasks.length
            : taskStatus === "pending"
            ? pendingTasks.length
            : completedTasks.length}
          )
        </h5>
        <div className="flex ml-auto">
          <Button
            onClick={() => setLoading(true)}
            className="mb-6 mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            Refresh
          </Button>
          <Button
            onClick={() => window.open("/to-do/new", "_self")}
            className="mb-6 bg-blue-500 hover:bg-gray-600 text-white ml-auto"
          >
            <FaPlus className="mr-2" /> Add
          </Button>
        </div>
      </Box>

      <Box>
        <Button
          className={`mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto ${
            taskStatus === "all" ? "bg-gray-500" : "bg-blue-600"
          }`}
          disabled={taskStatus === "all"}
          onClick={() => setTaskStatus("all")}
        >
          All
        </Button>
        <Button
          className={`mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto ${
            taskStatus === "pending" ? "bg-gray-500" : "bg-blue-600 "
          }`}
          disabled={taskStatus === "pending"}
          onClick={() => setTaskStatus("pending")}
        >
          Pending
        </Button>
        <Button
          className={`mx-4 bg-blue-500 hover:bg-gray-600 text-white ml-auto ${
            taskStatus === "completed" ? "bg-gray-500 " : "bg-blue-600"
          }`}
          disabled={taskStatus === "completed"}
          onClick={() => setTaskStatus("completed")}
        >
          Completed
        </Button>
      </Box>

      {taskStatus === "all" && (
        <EntityTable
          columns={columns}
          data={tasks}
          onEdit={(id) => window.open(`/to-do/${id}`, "_self")}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      {taskStatus === "pending" && (
        <EntityTable
          columns={columns}
          data={pendingTasks}
          onEdit={(id) => window.open(`/to-do/${id}`, "_self")}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      {taskStatus === "completed" && (
        <EntityTable
          columns={columns}
          data={completedTasks}
          onEdit={(id) => window.open(`/to-do/${id}`, "_self")}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TasksPage;
