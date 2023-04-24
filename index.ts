import express, { Express } from "express"
import "./config/config"
import { DataSource } from "typeorm"
import cors from "cors"
import bodyParser from "body-parser"
import { Task } from "./src/tasks/tasks.entity"
import { tasksRouter } from "./Router/tasksRouter"
import { userRouter } from "./Router/userRouter"
import { User } from "./src/tasks/user.entity"


const app: Express = express()
const PORT = process.env.PORT || 5858


app.use(bodyParser.json())
app.use(cors())

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    url: process.env.MYSQL_URL,
    port: 7612,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "railway",
    synchronize: true,
    entities: [Task, User]
})


app.use("/api/v1/tasks", tasksRouter)
app.use("/api/v1/user", userRouter)

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => console.log("Server läuft auf port" + PORT))
        console.log("CONNECTED to MySql")
    })
    .catch(err => {
        console.log(err)
    })

