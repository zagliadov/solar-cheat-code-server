export class CreateVideoDto {
  title: string;
  thumbnailUrl?: string;
  description?: string;
  videoUrl: string;
  userId: string;
}

export class UpdateVideoDto {
  title?: string;
  thumbnailUrl?: string;
  description?: string;
  videoUrl?: string;
  publish?: boolean;
}

export class VideoIdParamDto {
  id: string;
}
