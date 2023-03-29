import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(12)
  phone_number: string;
}
