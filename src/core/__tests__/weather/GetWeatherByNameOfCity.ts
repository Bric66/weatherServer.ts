import {Weather} from "../../Entities/Weather";
import {InMemoryWeatherRepository} from "../adapters/repositories/InMemoryWeatherRepository";
import {InMemoryWeatherGateway} from "../adapters/gateways/InMemoryWeatherGateway";
import {GetWeatherByNameOfCity} from "../../usecases/weather/GetWeatherByNameOfCity";

const db = new Map<string, Weather>();

describe("When I call GetWeatherByNameOfCity ====>", () => {
let getWeatherByNameOfCity : GetWeatherByNameOfCity

    beforeAll(() => {
        const inMemoryWeatherRepository = new InMemoryWeatherRepository(db);
        const inMemoryWeatherGateway = new InMemoryWeatherGateway(db);
    });

    it("should get weather by name of city in database", async () => {
        const weatherOfTheCity = new Weather({
            city: "The City",
            longitude: 180,
            latitude: 50,
            temperatureInCelcius: 30,
            humidityInPercents: 100,
            pressureInHpa: 1000,
            windSpeedInKmH: 50,
            created: new Date(),
        })

        db.set("The City", weatherOfTheCity);

        const result = await getWeatherByNameOfCity.execute({
            city : "The city",
        })

        expect(result.props.city).toEqual("The City");
        expect(result.props.windSpeedInKmH).toEqual(50);
    });

});
