import {Weather} from "../../Entities/Weather";
import {InMemoryWeatherRepository} from "../adapters/repositories/InMemoryWeatherRepository";
import {InMemoryWeatherGateway} from "../adapters/gateways/InMemoryWeatherGateway";
import {GetWeatherByCity} from "../../usecases/weather/GetWeatherByCity";
import {WeatherResponse} from "../../gateways/WeatherGateway";
import {weatherFixtures} from "../../fixtures/weatherFixtures";

const db = new Map<string, Weather>();
const dbGateway = new Map<string, WeatherResponse>();

describe("When I call GetWeatherByCity ====>", () => {
    let getWeatherByNameOfCity: GetWeatherByCity
    let weatherOfTheCity: Weather

    beforeAll(() => {
        const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);
        const inMemoryWeatherGateway = new InMemoryWeatherGateway(dbGateway);
        getWeatherByNameOfCity = new GetWeatherByCity(inMemoryWeatherRepository, inMemoryWeatherGateway)

        weatherOfTheCity = weatherFixtures[0]
    });

    afterEach(() => {
        db.clear();
        dbGateway.clear();
    })

    it("should get weather by name of city in database", async () => {

        db.set("The City", weatherOfTheCity);

        const result = await getWeatherByNameOfCity.execute({
            city: "The City",
        })

        expect(result.props.city).toEqual("The City");
    });

    it("should get weather by name of city with gateway", async () => {

        dbGateway.set("The City", {
            city: "The City",
            longitude: 180,
            latitude: 50,
            temperatureInCelsius: 30,
        });

        const result = await getWeatherByNameOfCity.execute({
            city: "The City",
        })

        expect(result.props.city).toEqual("The City");
    });

});
