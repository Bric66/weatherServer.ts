import {Weather} from "../Entities/Weather";

export interface WeatherRepository {
    searchWeatherOfCity (input: string): Promise<Weather>;

    save (weather: Weather): Weather;
}