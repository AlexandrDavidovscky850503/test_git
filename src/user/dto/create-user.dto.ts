import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() readonly email: string;
  @IsNotEmpty() readonly firstName: string;
  @IsNotEmpty() readonly lastName: string;
  @IsNotEmpty() readonly password: string;
}
