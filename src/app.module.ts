import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserAccountSchema } from './user-account/user-account.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: `postgresql://postgres:postgres@localhost:5432/postgres`,
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
      imports: [],
      inject: [],
    }),
    TypeOrmModule.forFeature([UserAccountSchema]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
