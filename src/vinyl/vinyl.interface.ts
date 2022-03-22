// import { UserData } from '../user/user.interface';
import { VinylEntity } from './vinyl.entity';
export interface Comment {
  body: string;
}

// interface VinylData {
//   slug: string;
//   name: string;
//   description: string;
//   price: number;
//   author: string;
//   image: string;
// }

export interface CommentsRO {
  comments: Comment[];
}

export interface VinylRO {
  vinyl: VinylEntity;
}

export interface VinylAndCommentsRO {
  vinyl: VinylEntity;
  comments: Comment[];
}

export interface VinylesRO {
  vinyles: VinylEntity[];
  vinylesCount: number;
}
