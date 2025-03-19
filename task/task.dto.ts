import {z} from "zod";

export const createTaskDto = z.object({
    name: z.string().min(1,'Повинно бути більше 1 символу').max(50, 'Не повинно перевищувати 50 символів!!!'),
    description: z.string()
})