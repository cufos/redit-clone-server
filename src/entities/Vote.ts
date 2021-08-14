import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Comment } from "./Comment";
import Entities from "./Entity";
import { Post } from "./Post";
import { User } from "./User";

@Entity("votes")
export class Vote extends Entities {
  constructor(vote: Partial<Vote>) {
    super();
    Object.assign(this, vote);
  }

  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
