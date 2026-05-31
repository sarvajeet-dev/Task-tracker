import express from 'express'
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js'
import errorHandler from "./middleware/errorHandler.js";
import taskRoutes from  './routes/taskRoutes.js'
const app = express();



app.use(errorHandler);

app.use(express.json())

app.use("/api/auth" , authRoutes)
app.use("/api/tasks", taskRoutes);
const PORT = 3000

connectDB()



app.listen(PORT , () => {
    console.log(`app started at ${PORT}`)
})