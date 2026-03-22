import { db } from '@shared/infra/drizzle/client';
import { notifications } from '@shared/infra/drizzle/schema';
import INotificationsRepository, {
  ICreateNotificationDTO,
  INotification,
} from '@modules/notifications/repositories/INotificationsRepository';

class DrizzleNotificationsRepository implements INotificationsRepository {
  public async create(data: ICreateNotificationDTO): Promise<INotification> {
    const [notification] = await db.insert(notifications).values(data).returning();
    return notification;
  }
}

export default DrizzleNotificationsRepository;
