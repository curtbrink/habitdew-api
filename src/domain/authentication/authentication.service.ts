import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAccountService } from '../user-account/user-account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userAccountService: UserAccountService) {}

  async signIn(givenUsername: string, givenPassword: string): Promise<any> {
    const user = await this.userAccountService.getUserByUsername(givenUsername);

    if (!user || !(await bcrypt.compare(givenPassword, user.passwordHash))) {
      return new UnauthorizedException('Invalid user credentials');
    }
    const { passwordHash, ...result } = user;

    return result;
  }
}
