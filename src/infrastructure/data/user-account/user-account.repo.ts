import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/base-repo';
import {
  UserAccount,
  UserAccountId,
} from '../../../domain/user-account/user-account.entity';
import { IUserAccountRepo } from '../../../domain/user-account/user-account.repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccountSchema } from './user-account.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UserAccountRepo
  extends BaseRepository<UserAccountId, UserAccount>
  implements IUserAccountRepo
{
  constructor(
    @InjectRepository(UserAccountSchema)
    private repo: Repository<UserAccount>,
  ) {
    super(repo);
  }
}
