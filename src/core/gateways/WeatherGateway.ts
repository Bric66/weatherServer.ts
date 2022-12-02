export type WeatherResponse = {
    city : string;
    latitude : number;
    longitude : number;
    temperatureInCelsius : number;
}

export interface WeatherGateway {
    getByCity(city: string): Promise<WeatherResponse>;

    getByCoordinates(latitude: number, longitude: number): Promise<WeatherResponse>;
}