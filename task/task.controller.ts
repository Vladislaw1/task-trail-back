import {Router,Request,Response} from "express";
import {TaskService} from "./task.service";
import {createTaskDto} from "./task.dto";

const router = Router()

const taskService = new TaskService()

router.post("/task-trail", (req:Request,res: Response)=> {
    const validation = createTaskDto.safeParse(req.body)

    if(!validation.success){
        return res.status(400).json({message: validation.error.errors})
    }

    const task = taskService.createTask(req.body)
    res.status(200).json(task)
})

export const taskRouter = router