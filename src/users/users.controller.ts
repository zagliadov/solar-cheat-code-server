import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetSessionInfoDto } from 'src/auth/dto';
import { UserDto } from './dto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('user')
  @ApiOkResponse({
    type: UserDto,
  })
  getUser(@SessionInfo() session: GetSessionInfoDto): Promise<UserDto> {
    return this.usersService.getUser(session.id);
  }
}
