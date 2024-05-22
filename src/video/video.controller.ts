import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { VideoService } from './video.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CreateVideoDto,
  UpdateVideoDto,
  VideoDto,
  VideoIdParamDto,
} from './dto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';

@Controller('video')
@UseGuards(AuthGuard)
export class VideoController {
  constructor(private videoService: VideoService) {}
  @Get()
  @ApiOkResponse({
    type: [VideoDto],
  })
  listAllVideos(): Promise<VideoDto[]> {
    return this.videoService.listAllVideos();
  }

  @Get(':id')
  @ApiOkResponse({
    type: VideoDto,
  })
  getVideoById(@Param() params: VideoIdParamDto): Promise<VideoDto> {
    return this.videoService.getVideoById(params.id);
  }

  @Post()
  @ApiOkResponse({
    type: VideoDto,
  })
  createVideo(
    @Body() createVideoDto: CreateVideoDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<VideoDto> {
    return this.videoService.createVideo({
      ...createVideoDto,
      userId: session.id,
    });
  }

  @Patch(':id')
  @ApiOkResponse({
    type: VideoDto,
  })
  updateVideo(
    @Param() params: VideoIdParamDto,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<VideoDto> {
    return this.videoService.updateVideo(params.id, updateVideoDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: VideoDto,
  })
  deleteVideo(@Param() params: VideoIdParamDto): Promise<{ message: string }> {
    return this.videoService.deleteVideo(params.id);
  }
}
