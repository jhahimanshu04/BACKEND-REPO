import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import cors from "cors"; 
//import { router as userRoutes } from "./routes/user.route.js";

//import userRoute from "./routes/user.route.js";
import SocketApp from "./SocketIO/server.js";
import messageRoute from "./routes/message.route.js";
// import { app, server,io } from "./SocketIO/server.js";

const { app, server, io } = SocketApp; 

dotenv.config();
//middlewares
app.use(
  cors({
    origin: "http://localhost:4002",
    credentials: true,
  }),
);
app.use(cookieParser()); // ✅ pehle
app.use(express.json());
app.get("/test", async (req, res) => {
  res.json({
    message: "Server working!",
    dbState: mongoose.connection.readyState,
  });
});

app.use("/api/users", userRoutes);
app.use("/api/message", messageRoute);


const PORT = process.env.PORT||3001;
const URI = process.env.MONGODB_URI;


try {
  await mongoose.connect(URI);
  console.log("connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

server.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`)
});
