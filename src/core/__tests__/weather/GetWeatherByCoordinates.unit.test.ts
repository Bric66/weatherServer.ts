import {Weather} from "../../Entities/Weather";
import {InMemoryWeatherRepository} from "../adapters/repositories/InMemoryWeatherRepository";
import {InMemoryWeatherGateway} from "../adapters/gateways/InMemoryWeatherGateway";
import {GetWeatherByCity} from "../../usecases/weather/GetWeatherByCity";
import {GetWeatherByCoordinates} from "../../usecases/weather/GetWeatherByCoordinates";
import {WeatherResponse} from "../../gateways/WeatherGateway";
import {weatherFixtures} from "../../fixtures/weatherFixtures";

const db = new Map<string, Weather>();
const dbGateway = new Map<string, WeatherResponse>();

describe("When I call GetWeatherByCoordinates ====>", () => {
    let getWeatherByCoordinates: GetWeatherByCoordinates
    let weatherOfTheCoordinates: Weather

    beforeAll(() => {
        const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);
        const inMemoryWeatherGateway = new InMemoryWeatherGateway(dbGateway);
        getWeatherByCoordinates = new GetWeatherByCoordinates(inMemoryWeatherRepository, inMemoryWeatherGateway)

        weatherOfTheCoordinates = weatherFixtures[0]
    });

    afterEach(() => {
        db.clear();
        dbGateway.clear();
    })

    it("should get weather.ts by name of city in database", async () => {

        db.set("The City", weatherOfTheCoordinates);

        const result = await getWeatherByCoordinates.execute({
            latitude : 50,
            longitude : 180,
        })

        expect(result.props.latitude).toEqual(50);
    });

    it("should get weather.ts by name of city with gateway", async () => {

        dbGateway.set("The City", {
            city: "The City",
            longitude: 180,
            latitude: 50,
            temperatureInCelsius: 30,
        });

        const result = await getWeatherByCoordinates.execute({
            latitude : 50,
            longitude : 180,
        })

        expect(result.props.temperatureInCelsius).toEqual(30);
    });
});
