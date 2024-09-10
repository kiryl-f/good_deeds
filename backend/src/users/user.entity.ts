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
}
    