import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secretKey';

export const authMiddlaware = (req: Request, res: Response,next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json({ message: 'Access Denied: No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        (req as any).user = verified;
        next();
    }catch (e) {
        res.status(400).json({ message: 'Invalid token' });
    }
}