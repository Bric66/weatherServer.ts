import {UseCase} from "../Usecase";
import {Weather} from "../../Entities/Weather";
import {WeatherRepository} from "../../repositories/WeatherRepository";
import {WeatherGateway} from "../../gateways/WeatherGateway";

export type WeatherOfCoordonatesInput = {
    latitude: number;
    longitude: number;
}

export class GetWeatherByCoordinates implements UseCase<WeatherOfCoordonatesInput, Promise<Weather>> {
    constructor(
        private readonly weatherRepository: WeatherRepository,
        private readonly weatherGateway: WeatherGateway
    ) {
    }

    async execute(input: WeatherOfCoordonatesInput): Promise<Weather> {
        const weatherOfCoordinatesAlreadyRecorded = await this.weatherRepository.getByCoordinates(input.latitude, input.longitude);
        if (weatherOfCoordinatesAlreadyRecorded) {
            return weatherOfCoordinatesAlreadyRecorded
        }
        const weatherOfCoordinatesByGateway = await this.weatherGateway.getByCoordinates(input.latitude, input.longitude)

        const weatherOfCity = Weather.create({
            city: weatherOfCoordinatesByGateway.city,
            latitude: input.latitude,
            longitude: input.longitude,
            temperatureInCelsius: weatherOfCoordinatesByGateway.temperatureInCelsius,
        });
        return this.weatherRepository.save(weatherOfCity)
    }
}

