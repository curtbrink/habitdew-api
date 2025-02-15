import { UserAccountSchema } from '../../../data/user-account/user-account.schema';
import { UserAccountService } from '../../../../domain/user-account/user-account.service';
import { UserAccountController } from '../../../../api/controllers/user-account.controller';
import { ModuleSpec } from '../../types';
import { IUserAccountRepo } from '../../../../domain/user-account/user-account.repo.interface';
import { UserAccountRepo } from '../../../data/user-account/user-account.repo';

const userAccountRepo = {
  provide: IUserAccountRepo,
  useClass: UserAccountRepo,
};

const moduleSpec: ModuleSpec = {
  schemas: [UserAccountSchema],
  infrastructureProviders: [userAccountRepo],
  domainProviders: [UserAccountService],
  apiControllers: [UserAccountController],
};

export default moduleSpec;
