
import cookieParser from 'cookie-parser';
import express, { Express } from "express"
import "./config/config"
import { DataSource } from "typeorm"
import cors from "cors"
import bodyParser from "body-parser"
import { Task } from "./src/Entitys/tasks.entity"
import { tasksRouter } from "./Router/tasksRouter"
import { userRouter } from "./Router/userRouter"
import { User } from "./src/Entitys/user.entity"

const app: Express = express()
const PORT = process.env.PORT || 5858


app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    url: process.env.PG_URL,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: "railway",
    synchronize: true,
    entities: [Task, User]
})


app.use("/api/v1/tasks", tasksRouter)
app.use("/api/v1/user", userRouter)

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => console.log("Server läuft auf port" + PORT))
        console.log("CONNECTED to PG")
    })
    .catch(err => {
        console.log(err)
    })

