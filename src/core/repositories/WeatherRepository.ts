import {Weather} from "../Entities/Weather";

export interface WeatherRepository {
    getByCity(input: string): Promise<Weather>;

    getByCoordinates(latitude: number, longitude: number): Promise<Weather>

    save(weather: Weather): Promise<Weather>;
}