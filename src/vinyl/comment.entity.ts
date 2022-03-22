import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VinylEntity } from './vinyl.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne((type) => VinylEntity, (vinyl) => vinyl.comments)
  vinyl: VinylEntity;

  @ManyToOne((type) => UserEntity, (user) => user.comments)
  author: UserEntity;

  @Column()
  creator: string;

  @Column()
  score: number;
}
