export interface Notification {
  id: number;
  title: string;
  content: string;
  category: string;
  read: boolean;
  createdAt: Date;
}
