import { eq, and, sql } from 'drizzle-orm';
import { db } from '@shared/infra/drizzle/client';
import { appointments, users } from '@shared/infra/drizzle/schema';
import IAppointmentsRepository, {
  ICreateAppointmentDTO,
  IAppointment,
  IFindAllInMonthDTO,
  IFindAllInDayDTO,
} from '@modules/appointments/repositories/IAppointmentsRepository';

class DrizzleAppointmentsRepository implements IAppointmentsRepository {
  public async create(data: ICreateAppointmentDTO): Promise<IAppointment> {
    const [appointment] = await db.insert(appointments).values(data).returning();
    return appointment;
  }

  public async findByDate(date: Date, providerId: string): Promise<IAppointment | undefined> {
    const [appointment] = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.date, date), eq(appointments.providerId, providerId)));
    return appointment || undefined;
  }

  public async findAllInMonthFromProvider({ providerId, month, year }: IFindAllInMonthDTO): Promise<IAppointment[]> {
    return db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.providerId, providerId),
          sql`EXTRACT(MONTH FROM ${appointments.date}) = ${month}`,
          sql`EXTRACT(YEAR FROM ${appointments.date}) = ${year}`,
        ),
      );
  }

  public async findAllInDayFromProvider({ providerId, day, month, year }: IFindAllInDayDTO): Promise<IAppointment[]> {
    const rows = await db
      .select({
        id: appointments.id,
        providerId: appointments.providerId,
        userId: appointments.userId,
        date: appointments.date,
        createdAt: appointments.createdAt,
        updatedAt: appointments.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
        },
      })
      .from(appointments)
      .leftJoin(users, eq(appointments.userId, users.id))
      .where(
        and(
          eq(appointments.providerId, providerId),
          sql`EXTRACT(DAY FROM ${appointments.date}) = ${day}`,
          sql`EXTRACT(MONTH FROM ${appointments.date}) = ${month}`,
          sql`EXTRACT(YEAR FROM ${appointments.date}) = ${year}`,
        ),
      );

    return rows.map(row => ({
      ...row,
      user: row.user?.id ? row.user : undefined,
    }));
  }
}

export default DrizzleAppointmentsRepository;
