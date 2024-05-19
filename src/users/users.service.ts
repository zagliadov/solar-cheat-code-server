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
    return this.db.user.findFirst({ where: { email } });
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
}
