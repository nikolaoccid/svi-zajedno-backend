import {
  Body,
  Controller,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from './jwt.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: { userId?: string },
  ) {
    const user = await this.authService.getUserByLoginCredentials(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const userId = user.id.toString();
    session.userId = userId;
    return { userId };
  }

  @Post('/logout')
  async logout(@Session() session: { userId?: string }) {
    session.userId = undefined;
    return {};
  }

  @Post('/login/jwt')
  async loginJwt(@Body() loginDto: LoginDto) {
    const user = await this.authService.getUserByLoginCredentials(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return { token: await this.jwtService.sign(user) };
  }
}
