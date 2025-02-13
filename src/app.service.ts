import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from './user-account/user-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserAccount)
    private userRepository: Repository<UserAccount>,
  ) {}

  async getAllUsers(): Promise<UserAccount[]> {
    return this.userRepository.find();
  }
}
