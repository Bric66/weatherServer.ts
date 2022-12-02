import {WeatherRepository} from "../../../../core/repositories/WeatherRepository";
import {Weather} from "../../../../core/Entities/Weather";
import {WeatherModel} from "../models/weather";
import {MongoDbWeatherMapper} from "../mappers/MongoDbWeatherMapper";

const mongoDbWeatherMapper = new MongoDbWeatherMapper()

export class MongoDbWeatherRepository implements WeatherRepository {

    async getByCity(city: string): Promise<Weather> {
        const weatherOfCity = await WeatherModel.findOne({city: city});
        if (!weatherOfCity) {
            return null;
        }
        return mongoDbWeatherMapper.toDomain(weatherOfCity);
    }


    async getByCoordinates(latitude: number, longitude: number): Promise<Weather> {
        const weatherOfCoordinates = await WeatherModel.findOne({latitude: latitude, longitude: longitude});
        if (!weatherOfCoordinates) {
            return null;
        }
        return mongoDbWeatherMapper.toDomain(weatherOfCoordinates);
    }

    async save(weather: Weather): Promise<Weather> {
        const toWeatherModel = await mongoDbWeatherMapper.fromDomain(weather)
        const userModel = new WeatherModel(toWeatherModel);
        await userModel.save()
        return weather;
    }



}