
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
// @Unique("User", ["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "text"
    })
    username: string

    @Column({
        type: "text"
    })
    firstName: string

    @Column({
        type: "text"
    })
    lastName: string

    @Column({
        type: "varchar",
        unique: true
    })
    email: string

    @Column({
        type: "text"
    })
    password: string
}
