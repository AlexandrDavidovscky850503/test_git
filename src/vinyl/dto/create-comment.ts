import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty() readonly body: string;

  readonly score: number;
}
