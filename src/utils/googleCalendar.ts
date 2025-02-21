export const createGoogleCalendarEvent = async (
  accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task: any
) => {
  try {
    const response = await fetch("/api/google-calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, task }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create event");

    return data;
  } catch (error) {
    console.error("Error creating Google Calendar event:", error);
    throw error;
  }
};
