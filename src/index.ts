import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorHandle'
import { connectDB } from './config/db'
import { authRouter } from './routes/auth'
import { capsuleRouter } from './routes/capsuleRoute'

dotenv.config()

const app = express()

connectDB()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100,
    message:"Many requests in few time. please try again after 15 minutes"
})

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))
app.use(compression())
app.use(helmet({xFrameOptions:{action: "deny"}}))
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/capsule',capsuleRouter)

app.all('*', (req, res) => {
    res.status(200).json({status:"error", message: "Invalid route"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})