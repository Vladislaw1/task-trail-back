import dotenv from 'dotenv';
import {connectDB} from "./config/database";
import app from "./app";

dotenv.config();

connectDB().then(() => {
    app.listen(process.env.PORT || 8080,() => {
        console.log('Server is running on port 8080')
    })
})
