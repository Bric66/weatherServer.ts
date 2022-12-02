import nock from "nock";
import {OpenWeatherGateway} from "../gateways/OpenWeatherGateway";

const openWeatherGateway = new OpenWeatherGateway();

describe("Integration - OpenWeatherGateway", () => {
    const apiKey = process.env.API_KEY;
    let latitude = 48.8534;
    let longitude = 2.3488;
    const city = "Paris";
    let parisMock;
    beforeAll(() => {
        parisMock = {
            coord: {
                lon: 2.3488,
                lat: 48.8534,
            },
            weather: [
                {
                    id: 804,
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04d",
                },
            ],
            base: "stations",
            main: {
                temp: 281.16,
                feels_like: 281.16,
                temp_min: 279.58,
                temp_max: 281.92,
                pressure: 1019,
                humidity: 91,
            },
            visibility: 9000,
            wind: {
                speed: 1.03,
                deg: 0,
            },
            clouds: {
                all: 100,
            },
            dt: 1669725547,
            sys: {
                type: 2,
                id: 2012208,
                country: "FR",
                sunrise: 1669706400,
                sunset: 1669737487,
            },
            timezone: 3600,
            id: 2988507,
            name: "Paris",
            cod: 200,
        };
    });

    it("should get weather.ts by coordinates", async () => {
        nock("https://api.openweathermap.org")
            .get(`/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .reply(200, parisMock);
            const result = await openWeatherGateway.getByCoordinates(latitude, longitude);
        expect(result.temperatureInCelsius).toEqual(parisMock.main.temp - 273);
    });

    it("should get weather.ts by city", async () => {
        nock("https://api.openweathermap.org")
            .get(`/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .reply(200, parisMock);
        const result = await openWeatherGateway.getByCity(city);
        expect(result.city).toEqual(parisMock.name);
    });

});
