import {Mapper} from "../../../../core/models/Mapper";
import {WeatherModel} from "../models/weather";
import {Weather} from "../../../../core/Entities/Weather";


export class MongoDbWeatherMapper implements Mapper<WeatherModel, Weather> {

    fromDomain(data: Weather): WeatherModel {
        const {
           city,
            latitude,
            longitude,
            temperatureInCelsius,
            created
        } = data.props;
        let weatherModel: WeatherModel = {
            city,
            latitude,
            longitude,
            temperatureInCelsius: temperatureInCelsius,
            created : +created
        }
        return weatherModel
    }

    toDomain(raw: WeatherModel): Weather {
        const {
            city,
            latitude,
            longitude,
            temperatureInCelsius,
            created
        } = raw;
        return new Weather({
            city,
            latitude,
            longitude,
            temperatureInCelsius: temperatureInCelsius,
            created : new Date(created)
        });
    }
}