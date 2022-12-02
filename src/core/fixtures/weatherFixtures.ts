import {Weather} from "../Entities/Weather";

export const weatherFixtures: Weather[] = [
    {
        props: {
            city: "The City",
            longitude: 180,
            latitude: 50,
            temperatureInCelsius: 30,
            created: new Date(100000),
        },
    },
    {
        props: {
            city: "Marseille",
            longitude: 180,
            latitude: 50,
            temperatureInCelsius: 30,
            created: new Date(100000),
        },
    }
]