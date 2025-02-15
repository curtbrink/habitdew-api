import { EntitySchemaOptions } from 'typeorm';
import { IBaseEntity } from '../../../domain/shared/base-entity';
import { UserAccount } from '../../../domain/user-account/user-account.entity';

export const BaseSchema: Pick<
  EntitySchemaOptions<IBaseEntity<string>>,
  'columns' | 'relations' | 'orderBy'
> = {
  columns: {
    id: {
      primary: true,
      type: String,
      generated: 'uuid',
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp with time zone',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp with time zone',
      updateDate: true,
    },
    updatedBy: {
      name: 'updated_by',
      type: String,
    },
    createdBy: {
      name: 'created_by',
      type: String,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamp with time zone',
      deleteDate: true,
    },
    dataVersion: {
      name: 'data_version',
      type: Number,
      version: true,
    },
  },
  relations: {
    createdByUser: {
      type: 'many-to-one',
      target: UserAccount.name,
      joinColumn: {
        name: 'created_by',
      },
    },
    updatedByUser: {
      type: 'many-to-one',
      target: UserAccount.name,
      joinColumn: {
        name: 'updated_by',
      },
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
};
