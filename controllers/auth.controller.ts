import {Request,Response} from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from 'user/user.model'
import {IUser} from "../user/user.types";

const SECRET_KEY = 'secretKey';

export const register = async (req: Request,res: Response) => {
    const {login,password,lastName,firstName} = req.body
    console.log({login,password,lastName,firstName})
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User<IUser>({login, password: hashedPassword, lastName, firstName})
        await user.save()
        res.status(201).json({message: "Користувача зареєстровано"})
    }catch(err){
        res.status(500).json({message: 'Помилка при реєструванні користувача !!!'})
    }
}

export const login = async (req: Request, res: Response) => {
    const {login, password} = req.body
    try {
        const user = await User.findOne({login})
        if (!user)
            return res.status(401).json({message: 'Невірні дані'})

        const validationPassword = await bcrypt.compare(password, user.password)
        if(!validationPassword)
            return res.status(401).json({message: 'Невірні дані'})

        const token = jwt.sign({_id: user.id, login: user.login}, SECRET_KEY,{ expiresIn: '2h'})
        res.json({token})
    }catch (e) {
        res.status(500).json({ message: 'Помилка при авторизації' });
    }
}

export const protectedRoute = (req: Request, res: Response) => {
    res.json({ message: 'Доступ дозволено', user: (req as any).user });
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (e) {
        res.status(500).json({ message: 'Помилка при отриманні користувачів' });
    }
}