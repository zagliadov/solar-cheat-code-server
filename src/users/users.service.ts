import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { DbService } from 'src/db/db.service';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private accountService: AccountService,
    private subscriptionService: SubscriptionService,
  ) {}

  findByEmail(email: string) {
    try {
      return this.db.user.findFirst({ where: { email } });
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    hash: string,
    salt: string,
  ) {
    const user = await this.db.user.create({
      data: { firstName, lastName, email, hash, salt },
    });
    await this.accountService.create(user.id);
    await this.subscriptionService.createSubscription(user.id);

    return user;
  }

  // **********************************************GET USER INFO*/
  async getUser(userId: string) {
    try {
      return await this.db.user.findFirst({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
