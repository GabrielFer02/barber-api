export interface ICreateNotificationDTO {
  content: string;
  recipientId: string;
}

export interface INotification {
  id: string;
  content: string;
  recipientId: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<INotification>;
}
