// import { IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly birthDate: string;
  readonly image: string;
}
