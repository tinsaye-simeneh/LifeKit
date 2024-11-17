import React from "react";
import { notifications } from "@mantine/notifications";

interface NotificationProps {
  title: string;
  color:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "orange"
    | "pink"
    | "purple"
    | "teal"
    | "cyan"
    | "gray";
  content: string;
}

const CustomNotification: React.FC<NotificationProps> = ({
  title,
  color,
  content,
}) => {
  return (
    <div>
      {notifications.show({
        title: title,
        message: content,
        color: color,
        position: "top-right",
        autoClose: 3000,
      })}
    </div>
  );
};

export default CustomNotification;
