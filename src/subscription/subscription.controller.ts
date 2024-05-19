import { Controller, Body, Patch, Get, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { PatchSubscriptionDto, SubscriptionDto } from './dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/auth/session-info.decorator';

@Controller('subscriptions')
@UseGuards(AuthGuard)
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get()
  @ApiOkResponse({
    type: SubscriptionDto,
  })
  getSubscription(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.getSubscription(session.id);
  }

  @Patch('update')
  @ApiOkResponse({
    type: PatchSubscriptionDto,
  })
  patchSubscription(
    @Body() body: PatchSubscriptionDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<PatchSubscriptionDto> {
    return this.subscriptionService.patchSubscription(session.id, body);
  }

  @Patch('cancel')
  @ApiOkResponse({
    type: PatchSubscriptionDto,
  })
  cancelSubscription(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<PatchSubscriptionDto> {
    return this.subscriptionService.cancelSubscription(session.id);
  }
}
