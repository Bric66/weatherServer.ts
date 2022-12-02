import {Weather} from "../../../Entities/Weather";
import {WeatherRepository} from "../../../repositories/WeatherRepository";


export class InMemoryWeatherRepository implements WeatherRepository {

    constructor(
        private readonly db: Map<string, Weather>) {
    }

    async getByCity(city: string): Promise<Weather> {
        return (this.db.get(city))
    }

    async save(weather: Weather): Promise<Weather> {
        this.db.set(weather.props.city, weather);
        return weather;
    }

    getByCoordinates(latitude: number, longitude: number): Promise<Weather> {
        const weathers = Array.from(this.db.values());
        const weatherOfCoordinates = weathers.find((element) => element.props.latitude === latitude && element.props.longitude ===longitude);
        return Promise.resolve(weatherOfCoordinates);
    }

}