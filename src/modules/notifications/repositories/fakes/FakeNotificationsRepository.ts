import { v4 as uuid } from 'uuid';
import INotificationsRepository, {
  ICreateNotificationDTO,
  INotification,
} from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: INotification[] = [];

  public async create(data: ICreateNotificationDTO): Promise<INotification> {
    const notification: INotification = {
      id: uuid(),
      ...data,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.notifications.push(notification);
    return notification;
  }
}

export default FakeNotificationsRepository;
