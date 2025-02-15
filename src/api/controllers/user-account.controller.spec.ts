import { Test, TestingModule } from '@nestjs/testing';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from '../../domain/user-account/user-account.service';

describe('AppController', () => {
  let appController: UserAccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAccountController],
      providers: [UserAccountService],
    }).compile();

    appController = app.get<UserAccountController>(UserAccountController);
  });

  describe('root', () => {
    it('should return some users', () => {
      expect(appController.getAllUsers()).toBeTruthy();
    });
  });
});
