import { EntitySchema, EntitySchemaOptions } from 'typeorm';
import { BaseSchema } from './base-schema';

export class HabitdewEntitySchema<T = any> extends EntitySchema {
  constructor(options: EntitySchemaOptions<T>) {
    options.columns = {
      ...BaseSchema.columns,
      ...(options.columns ?? {}),
    };
    options.relations = {
      ...BaseSchema.relations,
      ...(options.relations ?? {}),
    };
    // Ordering matters, we want to have the more specific ordering first
    options.orderBy = {
      ...(options.orderBy ?? {}),
      ...BaseSchema.orderBy,
    };
    super(options);
  }
}
