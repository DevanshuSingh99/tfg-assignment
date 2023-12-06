import express from "express";
import userRouter from "./routes/userRouter.js";
import "dotenv/config";
import gameRouter from "./routes/gameRouter.js";
import { connectMongoDb } from "./integrations/mongoDb.js";
import { connectMySql } from "./integrations/mysqDb.js";
const app = express();

// Calling all integrations
try {
    await connectMongoDb();
    await connectMySql();
} catch (error) {
    console.log(error);
}

app.use(express.json());

/* API ROUTERS */
app.use("/", (req, res, next) => {
    const { method, url, statusCode } = req;
    console.log(`===> ${method} API REQUEST : ${url}`);
    next();
});
app.use("/users", userRouter);
app.use("/game", gameRouter);
/* API ROUTERS */

// Default API Route for UnKnown Request
app.use("/", (req, res) => {
    res.sendStatus(404);
});

// Server Start
app.listen(4000, () => {
    console.log("SERVER RUNNING ON PORT : 4000");
});
