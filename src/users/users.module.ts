import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { AccountModule } from 'src/account/account.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DbModule, AccountModule, SubscriptionModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
