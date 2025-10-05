import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import { db } from "./utils/db.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

//Cors
app.use(cors({
  origin : ["http://localhost:3000","http://localhost:5173"],
  methods : ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders : ["Content-Type", "Authorization"],
  credentials : true
}))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())



const port = process.env.PORT || 3000

// Routes
app.use('/api/v1/users', userRouter)

//Database connection
db()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong."
  return res.status(statusCode).json({
    success : false,
    message,
  })
})
