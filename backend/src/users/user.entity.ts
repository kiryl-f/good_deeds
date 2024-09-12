import { Deed } from "src/deeds/deed.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Deed, (deed) => deed.user)
    deeds: Deed[];
    
  @ManyToMany(() => User)
  @JoinTable({
    name: 'friend_requests',
    joinColumn: {
      name: 'requesterId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'accepterId',
      referencedColumnName: 'id',
    },
  })
  sentFriendRequests: User[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'received_friend_requests',
    joinColumn: {
      name: 'accepterId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'requesterId',
      referencedColumnName: 'id',
    },
  })
  receivedFriendRequests: User[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'friends',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'friendId',
      referencedColumnName: 'id',
    },
  })
  friends: User[];
}
