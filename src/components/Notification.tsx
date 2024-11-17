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
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const CustomNotification = ({
  title,
  color,
  content,
  position = "top-right",
}: NotificationProps) => {
  notifications.show({
    title,
    message: content,
    color,
    position,
    autoClose: 3000,
  });
};

export default CustomNotification;
