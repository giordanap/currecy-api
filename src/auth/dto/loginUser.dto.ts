import { IsEmail, IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class LoginUser {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
