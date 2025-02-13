import { UserAccount, UserAccountId } from './user-account/user-account.entity';
import { DeepPartial, HabitdewId } from './util';

type Constructor<T> = { new (): T };

export abstract class IBaseEntity<IdType extends HabitdewId<string>> {
  id: IdType;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: UserAccountId;
  updatedByUser?: UserAccount;
  createdBy?: UserAccountId;
  createdByUser?: UserAccount;
  dataVersion: number;

  equals(entity: IBaseEntity<string>): boolean {
    return this.id === entity.id;
  }

  /**
   * Factory method to instantiate a new object for this entity with optional properties to set
   */
  static create<E>(this: Constructor<E>, partial?: DeepPartial<E>): E {
    const entity = new this();

    if (partial) {
      for (const [key, value] of Object.entries(partial)) {
        if (value === undefined) continue;
        entity[key] = value;
      }
    }

    return entity;
  }
}
