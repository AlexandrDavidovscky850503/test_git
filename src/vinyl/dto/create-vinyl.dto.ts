import { IsNotEmpty } from 'class-validator';

export class CreateVinylDto {
  @IsNotEmpty() readonly name: string;
  @IsNotEmpty() readonly description: string;
  @IsNotEmpty() readonly author: string;
  readonly image: string;
  @IsNotEmpty() readonly price: number;
}
