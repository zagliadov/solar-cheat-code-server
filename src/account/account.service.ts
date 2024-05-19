import { Injectable } from '@nestjs/common';
import { PatchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
  constructor(private db: DbService) {}
  //   ***********************************************CREATE ACCOUNT */
  async create(userId: string) {
    return this.db.account.create({
      data: {
        ownerId: userId,
        isBlockingEnabled: false,
      },
    });
  }
  //   ***********************************************GET ACCOUNT */
  async getAccount(userId: string) {
    return this.db.account.findFirstOrThrow({ where: { ownerId: userId } });
  }
  //   ***********************************************PATCH ACCOUNT */
  async patchAccount(userId: string, patch: PatchAccountDto) {
    return this.db.account.update({
      where: { ownerId: userId },
      data: { ...patch },
    });
  }
}
