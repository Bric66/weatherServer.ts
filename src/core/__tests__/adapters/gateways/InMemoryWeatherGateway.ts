import {Weather} from "../../../Entities/Weather";
import {WeatherGateway, WeatherResponse} from "../../../gateways/WeatherGateway";


export class InMemoryWeatherGateway implements WeatherGateway {

    constructor(private readonly db: Map<string, WeatherResponse>) {
    }

    getByCity(city: string): Promise<WeatherResponse> {
        return Promise.resolve (this.db.get(city))
    }

    getByCoordinates(latitude: number, longitude: number): Promise<WeatherResponse> {
        const weathers = Array.from(this.db.values());
        const weatherOfCoordinates = weathers.find((element) => element.latitude === latitude && element.longitude ===longitude);
        return Promise.resolve(weatherOfCoordinates);
    }
}