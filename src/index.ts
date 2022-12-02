import "dotenv/config";
import express from "express";
import * as mongoose from "mongoose";
import {weatherRouter} from "./app/routes/weather";

const port = +process.env.PORT_KEY;

mongoose.connect("mongodb://127.0.0.1:27017/weather_server_data", (err) => {
    if (err) {
        throw err;
    }
    console.info("Connected to mongodb");
});

const app = express();

app.use(express.json());

app.use("/weather",weatherRouter)


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
