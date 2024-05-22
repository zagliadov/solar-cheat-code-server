import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { DbService } from 'src/db/db.service';
import { CreateVideoDto } from './dto';

@Injectable()
export class VimeoService {
  private readonly accessToken: string;
  private readonly prisma: DbService;
  constructor() {
    this.accessToken = process.env.VIMEO_ACCESS_TOKEN;
    if (!this.accessToken) {
      throw new Error('VIMEO_ACCESS_TOKEN is not defined');
    }
  }

  async createVideo(createVideoDto: CreateVideoDto) {
    try {
      const video = await this.prisma.video.create({
        data: createVideoDto,
      });
      return video;
    } catch (error) {
      console.error('Error creating video:', error);
      throw new InternalServerErrorException('Failed to create video');
    }
  }

  async deleteVideo(videoId: string) {
    try {
      await this.prisma.video.delete({
        where: { id: videoId },
      });
      return { message: 'Video deleted successfully' };
    } catch (error) {
      console.error('Error deleting video:', error);
      throw new InternalServerErrorException('Failed to delete video');
    }
  }

  async listAllVideos(): Promise<any[]> {
    const url = 'https://api.vimeo.com/me/videos';
    const allVideos = [];
    let page = 1;
    let totalVideos = 0;

    try {
      do {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: {
            per_page: 25,
            page,
          },
        });

        const videos = response.data.data;
        allVideos.push(...videos);
        totalVideos = response.data.total;
        page += 1;
      } while (allVideos.length < totalVideos);

      console.log('All Videos:', allVideos);
      return allVideos;
    } catch (error) {
      console.error(
        'Error fetching videos:',
        error.response ? error.response.data : error.message,
      );
      throw new InternalServerErrorException('Failed to fetch videos');
    }
  }

  async getRandomVideos(): Promise<any[]> {
    try {
      const allVideos = await this.listAllVideos();
      const randomVideos = this.getRandomElements(allVideos, 10);
      return randomVideos;
    } catch (error) {
      console.error(
        'Error fetching random videos:',
        error.response ? error.response.data : error.message,
      );
      throw new InternalServerErrorException('Failed to fetch random videos');
    }
  }

  private getRandomElements(arr: any[], count: number): any[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
