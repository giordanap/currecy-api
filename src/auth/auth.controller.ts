import { Body, Controller, Get, Headers, Post, Res } from '@nestjs/common';
import { CreateUserDto, LoginUser } from './dto';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { authMiddleware } from 'src/middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() user: CreateUserDto, 
    @Res() res: FastifyReply,
  ) {
    const token = await this.authService.signup(user);

    res.header('Authorization', `Bearer ${token}`);
    return res
      .status(200)
      .send({ message: 'User signed up successfully', token });
  }

  @Post('signin')
  async signin(@Body() userLoged: LoginUser, @Res() res: FastifyReply) {
    const token = await this.authService.signin(userLoged);
    if (!token)
      return res.status(400).send({ message: 'Email o password is wrong' });

    res.header('Authorization', `Bearer ${token}`);
    return res.status(200).send({ message: 'User correct', token });
  }

  @ApiBearerAuth()
  @Get('profile')
  async profile(
    @Headers('authorization') authorization: string,
    @Res() res: FastifyReply,
  ) {
    const payload = authMiddleware(res, authorization);
    const userFound = await this.authService.profile(payload);
    return res.status(200).send({ data: userFound });
  }
}
