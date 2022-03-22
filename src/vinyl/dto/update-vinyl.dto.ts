import { IsNotEmpty } from 'class-validator';
export class UpdateVinylDto {
  @IsNotEmpty() readonly description: string;
  @IsNotEmpty() readonly price: number;
}
