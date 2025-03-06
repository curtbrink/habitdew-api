import { Injectable } from '@nestjs/common';
import { IUserAccountRepo } from '../user-account/user-account.repo.interface';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userAccountRepo: IUserAccountRepo) {}
}
