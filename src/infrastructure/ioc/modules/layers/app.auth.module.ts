import { Module } from '@nestjs/common';
import { DomainModule } from './app.domain.module';
import { AuthenticationController } from '../../../../api/controllers/authentication.controller';
import { AuthenticationService } from '../../../../domain/authentication/authentication.service';
import { InfrastructureModule } from './app.infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: [AuthenticationService],
  exports: [],
  controllers: [AuthenticationController],
})
export class AuthModule {}
