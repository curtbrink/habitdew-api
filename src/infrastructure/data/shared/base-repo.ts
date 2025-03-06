import { IBaseEntity } from '../../../domain/shared/base-entity';
import { HabitdewId } from '../../../util';
import { IBaseRepository } from '../../../domain/shared/base.repo.interface';
import { Repository } from 'typeorm';

export abstract class BaseRepository<
  IdType extends HabitdewId<string>,
  Entity extends IBaseEntity<IdType>,
> implements IBaseRepository<Entity, IdType>
{
  protected constructor(private readonly baseRepository: Repository<Entity>) {}

  getAll(): Promise<Entity[]> {
    return this.baseRepository.find();
  }

  async getById(id: IdType): Promise<Entity | null> {
    if (!id) {
      throw new Error('id is required');
    }
    const [entity] = await this.baseRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { id: id as any },
    });

    return entity ?? null;
  }
}
