import { Deed } from "src/deeds/deed.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";

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
    @Column('int', { array: true, default: [] })
    sentFriendRequests: number[];

    // Field for received friend requests (IDs of users who sent friend requests to this user)
    @Column('int', { array: true, default: [] })
    receivedFriendRequests: number[];
}
