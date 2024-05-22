import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateVideoDto, UpdateVideoDto, VideoDto } from './dto';

@Injectable()
export class VideoService {
  constructor(private db: DbService) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<VideoDto> {
    try {
      const video = await this.db.video.create({
        data: createVideoDto,
      });
      return video;
    } catch (error) {
      console.error('Error creating video:', error);
      throw new InternalServerErrorException('Failed to create video');
    }
  }

  async updateVideo(
    videoId: string,
    updateVideoDto: UpdateVideoDto,
  ): Promise<VideoDto> {
    try {
      const video = await this.db.video.update({
        where: { id: videoId },
        data: updateVideoDto,
      });
      return video;
    } catch (error) {
      console.error('Error updating video:', error);
      throw new InternalServerErrorException('Failed to update video');
    }
  }

  async deleteVideo(videoId: string): Promise<{ message: string }> {
    try {
      await this.db.video.delete({
        where: { id: videoId },
      });
      return { message: 'Video deleted successfully' };
    } catch (error) {
      console.error('Error deleting video:', error);
      throw new InternalServerErrorException('Failed to delete video');
    }
  }

  async listAllVideos(): Promise<VideoDto[]> {
    try {
      const videos = await this.db.video.findMany();
      return videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw new InternalServerErrorException('Failed to fetch videos');
    }
  }

  async getVideoById(videoId: string): Promise<VideoDto> {
    try {
      const video = await this.db.video.findUnique({
        where: { id: videoId },
      });
      return video;
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw new InternalServerErrorException('Failed to fetch video details');
    }
  }
}
