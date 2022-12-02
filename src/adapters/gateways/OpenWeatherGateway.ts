import {WeatherGateway, WeatherResponse} from "../../core/gateways/WeatherGateway";
import "dotenv/config";
import axios from "axios";
import { OpenWeatherMapper } from "./mappers/OpenWeatherMapper";
const apiKey = process.env.API_KEY;

const weatherApiWeatherMapper = new OpenWeatherMapper()

export class OpenWeatherGateway implements WeatherGateway {


    async getByCity(city: string): Promise<WeatherResponse> {
        const weatherOfCity = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
         return weatherApiWeatherMapper.toDomain(weatherOfCity);
    }

    async getByCoordinates(latitude: number, longitude: number): Promise<WeatherResponse> {
        const weatherOfCoordonates = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

        return weatherApiWeatherMapper.toDomain(weatherOfCoordonates)
    }
}