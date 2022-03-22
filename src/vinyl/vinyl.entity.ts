import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

// @Entity('article')
@Entity('vinyl')
export class VinylEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  author: string;

  @Column({ default: 0 })
  price: number;

  @OneToMany((type) => Comment, (comment) => comment.vinyl, { eager: true })
  @JoinColumn()
  comments: Comment[];

  // @Column({default: 0})
  // favoriteCount: number;
}
