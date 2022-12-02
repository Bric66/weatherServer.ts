export type WeatherProperties = {
    city: string,
    latitude: number,
    longitude: number,
    temperatureInCelsius: number,
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
        temperatureInCelsius: number,
    }) {
        return new Weather({
            city: props.city,
            latitude: props.latitude,
            longitude: props.longitude,
            temperatureInCelsius: props.temperatureInCelsius,
            created: new Date(),
        })
    }
}