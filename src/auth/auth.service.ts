import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUser } from './dto';
import { generateToken } from 'src/helper';
import { encryptPassword, validatePassword } from 'src/plugins';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userFound)
      return new HttpException('User already exists', HttpStatus.CONFLICT);

    const newUser = this.userRepository.create(user);
    newUser.password = await encryptPassword(newUser.password);
    await this.userRepository.save(newUser);

    const token: string = generateToken(
      { id: newUser.id },
      process.env.TOKEN_SECRET,
      3600,
    );

    return token;
  }

  async signin(user: LoginUser) {

    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userFound)
      return new HttpException('User not exists', HttpStatus.NOT_FOUND);

    const isCorrectPassword = await validatePassword(
      user.password,
      userFound.password,
    );

    if (isCorrectPassword)
      return generateToken({ id: userFound.id }, process.env.TOKEN_SECRET, 60);
  }

  async profile( payload ) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!userFound)
      return new HttpException('User not exists', HttpStatus.NOT_FOUND);

    delete userFound.id;

    return userFound;
  }
}
