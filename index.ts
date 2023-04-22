import express, { Express, Request, Response } from "express"
import "./config/config"

const app: Express = express()
const PORT = process.env.PORT || 5858


app.get("/", (req: Request, res: Response) => {
    res.send("Lüppt")
})

app.listen(PORT, () => console.log("Server läuft auf port" + PORT))