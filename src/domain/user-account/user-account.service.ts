import { Injectable } from '@nestjs/common';
import { UserAccount } from './user-account.entity';
import { IUserAccountRepo } from './user-account.repo.interface';

@Injectable()
export class UserAccountService {
  constructor(private readonly userAccountRepo: IUserAccountRepo) {}

  async getAllUsers(): Promise<UserAccount[]> {
    return this.userAccountRepo.getAll();
  }
}
