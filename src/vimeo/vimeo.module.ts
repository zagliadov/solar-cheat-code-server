import { Module } from '@nestjs/common';
import { VimeoController } from './vimeo.controller';
import { VimeoService } from './vimeo.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { DbModule } from 'src/db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DbModule, SubscriptionModule, HttpModule],
  controllers: [VimeoController],
  providers: [VimeoService],
})
export class VimeoModule {}
