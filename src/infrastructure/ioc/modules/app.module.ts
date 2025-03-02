import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { InfrastructureModule } from './layers/app.infrastructure.module';
import { DomainModule } from './layers/app.domain.module';
import { ApiModule } from './layers/app.api.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from 'src/infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        url: `postgresql://${dbConfig.postgres.user}:${dbConfig.postgres.password}@${dbConfig.postgres.host}:${dbConfig.postgres.port}/${dbConfig.postgres.database}`,
        entities: ['dist/**/*.schema.{ts,js}'],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
        uuidExtension: 'pgcrypto',
        poolSize: 100,
        maxQueryExecutionTime: 1_000, // logs warnings if exceeded
        idle_in_transaction_session_timeout: 5_000, // terminate idle transactions
        extra: {
          statement_timeout: 60_000,
          query_timeout: 60_000,
        },
      }),
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
    }),
    InfrastructureModule,
    DomainModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
