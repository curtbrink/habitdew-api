import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '../shared/base.repo.interface';
import { UserAccount, UserAccountId } from './user-account.entity';

@Injectable()
export abstract class IUserAccountRepo extends IBaseRepository<
  UserAccount,
  UserAccountId
> {}
