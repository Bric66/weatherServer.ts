import { model, Schema } from "mongoose";

export type WeatherModel = {
    city: string,
    latitude: number,
    longitude: number,
    temperatureInCelsius: number,
    created: number,
};

const weatherSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    temperatureInCelsius: {
        type: Number,
        required: true,
    },
    created: {
        type: Number,
        required: true,
    },
});

export const WeatherModel = model("User", weatherSchema);
