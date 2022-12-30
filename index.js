require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const xss = require("xss-clean");
const socket = require("socket.io");

const algorithms = require("./routes/algorithms");
const user = require("./routes/user");
const numbers = require("./routes/numbers");

const authMiddleware = require("./middlewares/authorization");
const authSocketIO = require("./middlewares/authorizationSocketIO");


const opinion = require("./models/Opinion");

const app = express();

app.use(morgan("tiny"));
app.use(cors({
    origin: {
        dotAll: true
    }
}));
app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/algorithms", algorithms);
app.use("/api/user", user);
app.use("/api/numbers", numbers);


async function start() {
    await mongoose.connect(process.env.MONGO_KEY);

    const server = app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });

    const io = new socket.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.use(authSocketIO);
    io.on("connection", (socket) => {
        socket.on("newOpinion", (data) => {
            opinion.create({ ...data });
        })
    });

}

start().then(() => { console.log("Connected to DB"); }).catch((err) => { console.error(err) });