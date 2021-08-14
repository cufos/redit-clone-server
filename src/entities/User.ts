import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, BeforeInsert, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import Entities from "./Entity";
import { Post } from "./Post";
import { Vote } from "./Vote";

@Entity("users")
export class User extends Entities {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Length(3, 150, { message: "Username must be at least characters" })
  @Index()
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail({}, { message: "Must be a valid email address" })
  @Length(1, 150, { message: "Email is Empty" })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Length(6, 150, { message: "Must be at least 6 characters long" })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
