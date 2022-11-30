import {UseCase} from "../Usecase";
import {Weather} from "../../Entities/Weather";
import {WeatherRepository} from "../../repositories/WeatherRepository";
import {WeatherGateway} from "../../gateways/WeatherGateway";

export type WeatherOfCityInput = {
    city: string;
}

export class GetWeatherByNameOfCity implements UseCase<WeatherOfCityInput, Promise<Weather>> {
    constructor(
        private readonly weatherRepository: WeatherRepository,
        private readonly weatherGateway: WeatherGateway
    ) {
    }

    async execute(input: WeatherOfCityInput): Promise<Weather> {
        const weatherOfCityAlreadyRecorded = await this.weatherRepository.searchWeatherOfCity(input.city);
        if (weatherOfCityAlreadyRecorded) {
            return weatherOfCityAlreadyRecorded
        }
        const weatherOfCityByGateway = await this.weatherGateway.getWeatherOfCity(input.city)

        const weatherOfCity = Weather.create({
                city: input.city,
                latitude: weatherOfCityByGateway.props.latitude,
                longitude: weatherOfCityByGateway.props.longitude,
                temperatureInCelcius: weatherOfCityByGateway.props.temperatureInCelcius,
                humidityInPercents: weatherOfCityByGateway.props.humidityInPercents,
                pressureInHpa: weatherOfCityByGateway.props.pressureInHpa,
                windSpeedInKmH: weatherOfCityByGateway.props.windSpeedInKmH
            });
        return this.weatherRepository.save(weatherOfCity)
    }
}

