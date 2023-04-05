import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongo")
    } catch (error) {
        throw error
        handleError(error);
        console.log("We had an Error connecting to MongoDB")
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})

//Middlewares
app.use(cookieParser())
app.use(express.json())

// app.use((req, res, next) => {
//     console.log("Hi I am a Middleware")
//     next()
// })

//We are taking the authRoute middlewares from the routes folder.

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.get("/", (req, res) => {
    res.send("Hello, first request")
})

app.listen(8800, () => {
    connect()
    console.log("Connectd to backend. ")
})