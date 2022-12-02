import mongoose from "mongoose";
import {v4} from "uuid";
import {MongoDbWeatherRepository} from "../repositories/mongoDb/repositories/MongoDbWeatherRepository";
import {OpenWeatherGateway} from "../gateways/OpenWeatherGateway";
import {Weather} from "../../core/Entities/Weather";
import {WeatherModel} from "../repositories/mongoDb/models/weather";
import {weatherFixtures} from "../../core/fixtures/weatherFixtures";

describe("Integration - MongoDbWeatherRepository", () => {
    let weather: Weather
    let mongoDbWeatherRepository: MongoDbWeatherRepository
    let weatherApiWeatherGateway: OpenWeatherGateway

    beforeAll(async () => {
        const databaseId = v4();
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });

        mongoDbWeatherRepository = new MongoDbWeatherRepository();
        weatherApiWeatherGateway = new OpenWeatherGateway();

        weather = weatherFixtures[0]

        afterEach(async ()  => {
            await WeatherModel.collection.drop();
        })

        afterAll(async () => {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
        });

    })

    it("should return null when weather.ts of city doesnt exist", async () => {
        const result = await mongoDbWeatherRepository.getByCity("The City");
        expect(result).toBeFalsy();
    })

    it("should save weather.ts", async () => {
        const result = await mongoDbWeatherRepository.save(weather);
                expect(result.props.city).toEqual("The City");
    })

    it("should find weather.ts of city", async () => {
        await mongoDbWeatherRepository.save(weather);
        const result = await mongoDbWeatherRepository.getByCity("The City");
        expect(result.props.city).toEqual("The City");
    })

    it("should find weather.ts of coordinates", async () => {
        await mongoDbWeatherRepository.save(weather);
        const result = await mongoDbWeatherRepository.getByCoordinates(
            50,
            180
        );
        expect(result.props.city).toEqual("The City");
    })

    it("should return null when weather.ts of coordinates doesnt exist", async () => {
        const result = await mongoDbWeatherRepository.getByCoordinates(
            50,
            80
        );
        expect(result).toBeFalsy();
    })

})