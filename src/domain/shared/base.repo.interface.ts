import { HabitdewId } from '../../util';

export abstract class IBaseRepository<
  Entity,
  IdType extends HabitdewId<string>,
> {
  abstract getAll(): Promise<Entity[]>;
}
