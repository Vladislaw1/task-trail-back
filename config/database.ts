import mongoose from "mongoose"

import dotenv from "dotenv"
import {ConnectionOptions} from "node:tls";

dotenv.config()

export const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            useNewUrlParser: true ,
            useUnifiedTopology: true,
        } as ConnectionOptions)
        console.log('Підключення до MongoDB успішне');
    }catch (e) {
        console.error('Помилка підключення до MongoDB', e);
        process.exit(1);
    }
}
