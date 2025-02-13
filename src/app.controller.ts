import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAccount } from './user-account/user-account.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUsers(): Promise<UserAccount[]> {
    return this.appService.getAllUsers();
  }
}
