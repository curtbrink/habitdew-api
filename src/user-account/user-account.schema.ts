import { EntitySchema } from 'typeorm';
import { UserAccount } from './user-account.entity';
import { HabitdewEntitySchema } from 'src/habitdew-entity-schema';

export const UserAccountSchema = new HabitdewEntitySchema<UserAccount>({
  name: 'UserAccount',
  target: UserAccount,
  columns: {
    name: {
      type: String,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  relations: {},
});
