import { Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Status } from "../enums/Status";
// import { Priority } from "../enums/Priority";


@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string
}