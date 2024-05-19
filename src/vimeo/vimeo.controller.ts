import { Controller } from '@nestjs/common';
import { VimeoService } from './vimeo.service';

@Controller('vimeo')
export class VimeoController {
  constructor(private vimeoService: VimeoService) {}
}
