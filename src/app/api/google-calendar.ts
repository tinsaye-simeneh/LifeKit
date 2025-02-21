import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { accessToken, task } = req.body;

    if (!accessToken) {
      return res.status(401).json({ error: "Missing access token" });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary: task.name,
      description: task.description || "",
      start: {
        dateTime: new Date(task.due_date).toISOString(),
        timeZone: "UTC",
      },
      end: { dateTime: new Date(task.due_date).toISOString(), timeZone: "UTC" },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return res.status(200).json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error("Google Calendar Error:", error);
    return res.status(500).json({ error: "Failed to create event" });
  }
}
