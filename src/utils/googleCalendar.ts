import { google } from "googleapis";

export const createGoogleCalendarEvent = async (
  accessToken: string,
  task: {
    name: string;
    description: string;
    due_date: string;
  }
) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth });

  try {
    const event = {
      summary: task.name,
      description: task.description,
      start: {
        dateTime: task.due_date,
        timeZone: "UTC",
      },
      end: {
        dateTime: task.due_date,
        timeZone: "UTC",
      },
    };

    const res = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    console.log("Event created:", res.data);
  } catch (error) {
    console.error("Error creating calendar event:", error);
  }
};
