import * as express from "express";
import {GetWeatherByCity} from "../../core/usecases/weather/GetWeatherByCity";
import {MongoDbWeatherRepository} from "../../adapters/repositories/mongoDb/repositories/MongoDbWeatherRepository";
import {OpenWeatherGateway} from "../../adapters/gateways/OpenWeatherGateway";
import {GetWeatherByCoordinates} from "../../core/usecases/weather/GetWeatherByCoordinates";
const weatherRouter = express.Router();

const mongoDbWeatherRepository = new MongoDbWeatherRepository();
const openWeatherGateway = new OpenWeatherGateway();
const getWeatherByCity = new GetWeatherByCity(mongoDbWeatherRepository, openWeatherGateway)
const getWeatherByCoordinates = new GetWeatherByCoordinates(mongoDbWeatherRepository, openWeatherGateway)


weatherRouter.get("/:city", async (req, res) => {

    const city = req.params.city;
    const weather = await getWeatherByCity.execute({
            city: city
        }
    );
    return res.status(200).send(weather);
})

weatherRouter.get("/:longitude/:latitude", async (req, res) => {
    const longitude = +req.params.longitude;
    const latitude = +req.params.latitude;
    const weather = await getWeatherByCoordinates.execute({
            longitude: longitude,
            latitude: latitude
        }
    );
    return res.status(200).send(weather);
})

weatherRouter.get('/error', (req, res) => {
    res.send("The URL you are trying to reach does not exist.")
})


export {weatherRouter};
