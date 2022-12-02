import express from 'express';
import mongoose from 'mongoose';
import {weatherRouter} from "../routes/weather";
import supertest from "supertest";
import {v4} from "uuid";
import {WeatherRepository} from "../../core/repositories/WeatherRepository";
import {OpenWeatherGateway} from "../../adapters/gateways/OpenWeatherGateway";
import {MongoDbWeatherRepository} from "../../adapters/repositories/mongoDb/repositories/MongoDbWeatherRepository";
import {WeatherGateway} from "../../core/gateways/WeatherGateway";
import {WeatherModel} from "../../adapters/repositories/mongoDb/models/weather";
import {Weather} from "../../core/Entities/Weather";
import {weatherFixtures} from "../../core/fixtures/weatherFixtures";

const app = express();

describe('E2E - weatherRouter', () => {

    let weatherRepository: WeatherRepository
    let weatherGateway: WeatherGateway
    let weather: Weather


    beforeAll(async () => {
        app.use(express.json());
        app.use("/weather", weatherRouter);

        const databaseId = v4();
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });

        weatherRepository = new MongoDbWeatherRepository()
        weatherGateway = new OpenWeatherGateway()

        weather = weatherFixtures[0]

    })

    afterEach(async () => {
        await WeatherModel.collection.drop();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should get/weather/:city", async () => {
        const result = await weatherRepository.save(weather)

        await supertest(app)
            .get(`/weather/${result.props.city}`)
            .expect((response) => {
                const responseBody = response.body;
                expect(responseBody.props.city).toEqual("The City");
            })
            .expect(200);
    })

    it("should get/weather/:longitude/:latitude", async () => {
        const result = await weatherRepository.save(weather)

        await supertest(app)
            .get(`/weather/${result.props.longitude}/${result.props.latitude}`)
            .expect((response) => {
                const responseBody = response.body;
                expect(responseBody.props.city).toEqual("The City");
            })
            .expect(200);
    })
})

