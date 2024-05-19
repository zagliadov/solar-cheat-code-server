import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { VimeoModule } from './vimeo/vimeo.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UsersModule,
    AccountModule,
    SubscriptionModule,
    VimeoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
