import {Weather} from "../../../Entities/Weather";
import {WeatherRepository} from "../../../repositories/WeatherRepository";


export class InMemoryWeatherRepository implements WeatherRepository {

    constructor(
        private readonly db: Map<string, Weather>) {
    }

    searchWeatherOfCity(input: string): Promise<Weather> {
        const weather = this.db.get(input);
        return Promise.resolve(weather)
    }

    save(weather: Weather): Weather {
        this.db.set(weather.props.city, weather);
        return weather;
    }

}