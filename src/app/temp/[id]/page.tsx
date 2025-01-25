"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TempForm from "@/components/temp/forms";
import { useTempStore } from "@/store/tempStore";
import { notifications } from "@mantine/notifications";

const EditTempPage = () => {
  const { id } = useParams();
  const TempId = id as string;

  const { fetchTemp, updateTemp } = useTempStore();

  const [initialValues, setInitialValues] = useState({
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemp = async () => {
      setLoading(true);
      const temp = await fetchTemp(TempId);

      if (!temp) {
        setError("Temp not found");
        setLoading(false);
        return;
      }

      setInitialValues({
        content: temp.content,
      });

      setLoading(false);
    };

    loadTemp();
  }, [fetchTemp, TempId]);

  const handleUpdate = async (values: { content: string }) => {
    try {
      await updateTemp(TempId, values);
      notifications.show({
        title: "Success",
        message: "Temp updated successfully.",
        color: "green",
      });
      setTimeout(() => window.open("/temp", "_self"), 500);
    } catch (error) {
      console.error("Error updating temp:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update the temp.",
        color: "red",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return <TempForm initialValues={initialValues} onSubmit={handleUpdate} />;
};

export default EditTempPage;
