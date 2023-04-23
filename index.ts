import express, { Express, Request, Response } from "express"
import "./config/config"
import { DataSource } from "typeorm"
import cors from "cors"
import bodyParser from "body-parser"
import { Task } from "./src/tasks/tasks.entity"
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
    entities: [Task]
})


app.get("/", (req: Request, res: Response) => {
    res.send("Lüppt")
})

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => console.log("Server läuft auf port" + PORT))
        console.log("CONNECTED to MySql")
    })
    .catch(err => {
        console.log(err)
    })

