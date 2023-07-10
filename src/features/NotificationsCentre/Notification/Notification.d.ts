import { Notification } from "../";

export interface NotificationProps {
  notification: Notification;
  onRead?: (notification: Notification) => any;
}
