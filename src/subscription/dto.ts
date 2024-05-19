import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class SubscriptionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsInt()
  userId: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsInt()
  price: string;

  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class PatchSubscriptionDto {
  @ApiProperty({
    example: 'Premium',
    description: 'The type of subscription (optional)',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: 15,
    description: 'The price of the subscription (optional)',
  })
  @IsString()
  @IsOptional()
  price?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The start date of the subscription (optional)',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    example: '2023-12-31T23:59:59.000Z',
    description: 'The end date of the subscription (optional)',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({
    example: true,
    description: 'Whether the subscription is active or not (optional)',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
