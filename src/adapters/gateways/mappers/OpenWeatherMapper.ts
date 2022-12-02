import {Mapper} from "../../../core/models/Mapper";
import {WeatherResponse} from "../../../core/gateways/WeatherGateway";

export class OpenWeatherMapper implements Mapper<any, WeatherResponse> {

    toDomain(raw: any): WeatherResponse {
        return {
            city: raw.data.name,
            latitude : raw.data.coord.lat,
            longitude : raw.data.coord.lon,
            temperatureInCelsius: raw.data.main.temp-273,
        }
    }
}
