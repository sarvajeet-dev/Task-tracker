import express from 'express'
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js'
const app = express();

app.use(express.json())

app.use("/api/auth" , authRoutes)
const PORT = 3000

connectDB()



app.listen(PORT , () => {
    console.log(`app started at ${PORT}`)
})