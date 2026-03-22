import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import type IUsersRepository from '@modules/users/repositories/IUsersRepository';
import DrizzleUsersRepository from '@modules/users/infra/drizzle/repositories/DrizzleUsersRepository';

import type IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import DrizzleUserTokensRepository from '@modules/users/infra/drizzle/repositories/DrizzleUserTokensRepository';

import type IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import DrizzleAppointmentsRepository from '@modules/appointments/infra/drizzle/repositories/DrizzleAppointmentsRepository';

import type INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import DrizzleNotificationsRepository from '@modules/notifications/infra/drizzle/repositories/DrizzleNotificationsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', DrizzleUsersRepository);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', DrizzleUserTokensRepository);
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', DrizzleAppointmentsRepository);
container.registerSingleton<INotificationsRepository>('NotificationsRepository', DrizzleNotificationsRepository);
