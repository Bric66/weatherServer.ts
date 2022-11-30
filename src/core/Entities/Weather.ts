export type WeatherProperties = {
    city: string,
    latitude: number,
    longitude: number,
    temperatureInCelcius: number,
    pressureInHpa: number,
    humidityInPercents: number,
    windSpeedInKmH: number,
    created: Date,
}

export class Weather {
    props: WeatherProperties;

    constructor(props: WeatherProperties) {
        this.props = props;
    }

    static create(props: {
        city: string,
        latitude: number,
        longitude: number,
        temperatureInCelcius: number,
        pressureInHpa: number,
        humidityInPercents: number,
        windSpeedInKmH: number,
    }) {
        return new Weather({
            city: props.city,
            latitude: props.latitude,
            longitude: props.longitude,
            temperatureInCelcius: props.temperatureInCelcius,
            pressureInHpa: props.pressureInHpa,
            humidityInPercents: props.humidityInPercents,
            windSpeedInKmH: props.windSpeedInKmH,
            created: new Date(),
        })
    }


}