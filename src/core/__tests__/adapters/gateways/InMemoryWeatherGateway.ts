import {Weather} from "../../../Entities/Weather";
import {WeatherGateway} from "../../../gateways/WeatherGateway";


export class InMemoryWeatherGateway implements WeatherGateway {

    constructor(private readonly db: Map<string, Weather>) {
    }

    getWeatherOfCity(city: string): Promise<Weather> {
        return Promise.resolve (this.db.get(city))
    }
}