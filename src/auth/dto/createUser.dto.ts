import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsLowercase()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
