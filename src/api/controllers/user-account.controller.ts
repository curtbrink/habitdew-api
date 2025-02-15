import { Controller, Get } from '@nestjs/common';
import { UserAccount } from '../../domain/user-account/user-account.entity';
import { UserAccountService } from '../../domain/user-account/user-account.service';

@Controller('users')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Get()
  async getAllUsers(): Promise<UserAccount[]> {
    return this.userAccountService.getAllUsers();
  }
}
