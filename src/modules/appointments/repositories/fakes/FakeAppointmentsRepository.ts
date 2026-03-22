import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentsRepository, {
  ICreateAppointmentDTO,
  IAppointment,
  IFindAllInMonthDTO,
  IFindAllInDayDTO,
} from '../IAppointmentsRepository';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: IAppointment[] = [];

  public async create(data: ICreateAppointmentDTO): Promise<IAppointment> {
    const appointment: IAppointment = {
      id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date, providerId: string): Promise<IAppointment | undefined> {
    return this.appointments.find(
      a => isEqual(a.date, date) && a.providerId === providerId,
    );
  }

  public async findAllInMonthFromProvider({ providerId, month, year }: IFindAllInMonthDTO): Promise<IAppointment[]> {
    return this.appointments.filter(
      a => a.providerId === providerId && getMonth(a.date) + 1 === month && getYear(a.date) === year,
    );
  }

  public async findAllInDayFromProvider({ providerId, day, month, year }: IFindAllInDayDTO): Promise<IAppointment[]> {
    return this.appointments.filter(
      a =>
        a.providerId === providerId &&
        getDate(a.date) === day &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year,
    );
  }
}

export default FakeAppointmentsRepository;
