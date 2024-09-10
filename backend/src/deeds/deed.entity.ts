// src/gooddeeds/gooddeed.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class GoodDeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  // Many deeds can belong to one user
  @ManyToOne(() => User, (user) => user.deeds, { onDelete: 'CASCADE' })
  user: User;
}
