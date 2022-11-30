import {Weather} from "../Entities/Weather";

export interface WeatherGateway {
    getWeatherOfCity (city: string) : Promise<Weather>
}