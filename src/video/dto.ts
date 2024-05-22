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

export class VideoDto {
  id: string;
  title: string;
  thumbnailUrl?: string;
  description?: string;
  videoUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  publish: boolean;
}
