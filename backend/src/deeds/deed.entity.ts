import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Deed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.deeds)
  user: User;

  @CreateDateColumn()
  createdAt: Date; // Ensure this field exists and is properly annotated
}
