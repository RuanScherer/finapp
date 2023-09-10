import { Notification } from "../NotificationsCentre.types";

export interface NotificationProps {
  notification: Notification;
  onRead?: (notification: Notification) => any;
}
