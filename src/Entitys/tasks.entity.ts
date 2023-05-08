import { Status } from '../enums/Status';
import { Priority } from '../enums/Priority';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({
        type: "text"
    })
    title: string

    @Column({
        type: "varchar",
        length: 255
    })
    date: string

    @Column({
        type: "text"
    })
    description: string

    @Column({
        type: "enum",
        enum: Priority,
        default: Priority.normal
    })
    priority: Priority

    @Column({
        type: "enum",
        enum: Status,
        default: Status.todo
    })
    status: Status

    // @Column({
    //     type: "text",
    // })
    // owner: string

}
