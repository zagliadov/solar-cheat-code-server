import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  imports: [DbModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
