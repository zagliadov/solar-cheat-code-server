import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class VimeoService {
  private client: any;

  constructor(private httpService: HttpService) {}
}
