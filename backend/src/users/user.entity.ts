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

    // One user can have many good deeds
    @OneToMany(() => Deed, (deed) => deed.user)
    deeds: Deed[];
    
     // Field for sent friend requests (IDs of users to whom this user sent friend requests)
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

  // Field for received friend requests (IDs of users who sent friend requests to this user)
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

  // Field for accepted friends (IDs of users who are accepted as friends)
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
