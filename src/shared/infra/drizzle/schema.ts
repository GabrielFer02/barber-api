import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  appointmentsAsProvider: many(appointments, { relationName: 'provider' }),
  appointmentsAsUser: many(appointments, { relationName: 'customer' }),
  tokens: many(userTokens),
}));

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').notNull().references(() => users.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  provider: one(users, {
    fields: [appointments.providerId],
    references: [users.id],
    relationName: 'provider',
  }),
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
    relationName: 'customer',
  }),
}));

export const userTokens = pgTable('user_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  token: uuid('token').defaultRandom().notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userTokensRelations = relations(userTokens, ({ one }) => ({
  user: one(users, {
    fields: [userTokens.userId],
    references: [users.id],
  }),
}));

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: varchar('content', { length: 500 }).notNull(),
  recipientId: uuid('recipient_id').notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
