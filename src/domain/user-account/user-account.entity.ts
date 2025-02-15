import { IBaseEntity } from 'src/domain/shared/base-entity';
import { HabitdewId } from 'src/util';

export type UserAccountId = HabitdewId<'UserAccount'>;

export class UserAccount extends IBaseEntity<UserAccountId> {
  name: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
}
