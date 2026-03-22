export interface ICreateAppointmentDTO {
  providerId: string;
  userId: string;
  date: Date;
}

export interface IAppointmentUser {
  id: string;
  name: string;
  avatar: string | null;
}

export interface IAppointment {
  id: string;
  providerId: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: IAppointmentUser;
}

export interface IFindAllInMonthDTO {
  providerId: string;
  month: number;
  year: number;
}

export interface IFindAllInDayDTO {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<IAppointment>;
  findByDate(date: Date, providerId: string): Promise<IAppointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthDTO): Promise<IAppointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayDTO): Promise<IAppointment[]>;
}
