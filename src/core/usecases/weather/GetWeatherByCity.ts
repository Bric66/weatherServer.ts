import {UseCase} from "../Usecase";
import {Weather} from "../../Entities/Weather";
import {WeatherRepository} from "../../repositories/WeatherRepository";
import {WeatherGateway} from "../../gateways/WeatherGateway";

export type WeatherOfCityInput = {
    city: string;
}

export class GetWeatherByCity implements UseCase<WeatherOfCityInput, Promise<Weather>> {
    constructor(
        private readonly weatherRepository: WeatherRepository,
        private readonly weatherGateway: WeatherGateway
    ) {
    }

    async execute(input: WeatherOfCityInput): Promise<Weather> {
        const weatherOfCityAlreadyRecorded = await this.weatherRepository.getByCity(input.city);
        if (weatherOfCityAlreadyRecorded) {
            return weatherOfCityAlreadyRecorded
        }
        const weatherOfCityByGateway = await this.weatherGateway.getByCity(input.city)

        const weatherOfCity = Weather.create({
            city: input.city,
            latitude: weatherOfCityByGateway.latitude,
            longitude: weatherOfCityByGateway.longitude,
            temperatureInCelsius: weatherOfCityByGateway.temperatureInCelsius,
        });
        return this.weatherRepository.save(weatherOfCity)
    }
}

