import express, {NextFunction, Request, Response} from "express";
import {taskRouter} from "./task/task.controller";
import authRoutes from "./routes/auth.routes";

const app = express()

app.use(express.json())

app.use('/v1/api/', authRoutes)

app.use('*', (req, res) => {
    res.status(404).send({message: "Not Found"});
})

app.use((err: Error, req:Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: "Server Error"});
})

export default app;