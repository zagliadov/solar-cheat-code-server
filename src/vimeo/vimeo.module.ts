import { Module } from '@nestjs/common';
import { VimeoService } from './vimeo.service';
import { VimeoController } from './vimeo.controller';

@Module({
  providers: [VimeoService],
  controllers: [VimeoController],
})
export class VimeoModule {}
