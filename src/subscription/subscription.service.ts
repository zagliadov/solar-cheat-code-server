import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PatchSubscriptionDto } from './dto';

@Injectable()
export class SubscriptionService {
  constructor(private db: DbService) {}

  // **********************************************CREATE SUBSCRIPTION */
  async createSubscription(userId: string) {
    const activeSubscription = await this.db.subscription.findFirst({
      where: {
        userId,
      },
    });

    if (activeSubscription) {
      throw new BadRequestException({ type: 'Subscription exists' });
    }

    return this.db.subscription.create({
      data: {
        userId,
        type: 'default',
        price: '0',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        isActive: false,
      },
    });
  }

  // **********************************************GET SUBSCRIPTION */
  async getSubscription(userId: string) {
    try {
      return this.db.subscription.findFirst({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // **********************************************PATCH SUBSCRIPTION */
  async patchSubscription(userId: string, patch: PatchSubscriptionDto) {
    return this.db.subscription.update({
      where: { userId },
      data: { ...patch },
    });
  }

  // **********************************************CANCEL SUBSCRIPTION */
  async cancelSubscription(userId: string) {
    return this.db.subscription.update({
      where: { userId },
      data: { isActive: false },
    });
  }
}
