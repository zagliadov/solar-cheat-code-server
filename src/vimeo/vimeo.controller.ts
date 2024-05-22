import { Controller, Get } from '@nestjs/common';
import { VimeoService } from './vimeo.service';

@Controller('vimeo')
export class VimeoController {
  constructor(private readonly vimeoService: VimeoService) {}

  @Get('all-videos')
  async listAllVideos() {
    try {
      const videos = await this.vimeoService.listAllVideos();
      console.log('Fetched videos:', videos);
      console.log('Fetched videos:', videos.length);
      videos.forEach((video) => {
        console.log(video.name, 'video.name');
      });
      return videos;
    } catch (error) {
      console.error('Error in controller:', error);
      throw error;
    }
  }

  @Get('random-videos')
  async getRandomVideos() {
    try {
      const randomVideos = await this.vimeoService.getRandomVideos();
      console.log('Fetched random videos:', randomVideos);
      console.log('Fetched videos:', randomVideos.length);
      randomVideos.forEach((video) => {
        console.log(video.name, 'video.name');
      });
      return randomVideos;
    } catch (error) {
      console.error('Error in controller:', error);
      throw error;
    }
  }
}
