//! config.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { keys } from "./keys";

export const config = {

    Locale: 'en-ie',

    CORSProxy: 'https://crossorigin.me',

    Time: {
        timeLoc: '.time',
        dateLoc: '.date',
        secondClass: '.second',
        updateInterval: 1000
    },
    News: {
        feed: 'http://www.rte.ie/news/rss/news-headlines.xml',
        location: '.news',
        updateInterval: 1800000, // 30 minutes
        showInterval: 60000,
        maxNewsItems: 25,
        maxDisplayItems: 5
    },

    Weather: {
        apiKey: keys.weather,
        apiVersion: "2.5",
        apiBase: "http://api.openweathermap.org/data",
        cityID: "2962725", // find the ID on openweathermap.org
        tempType: "C", // C F or K
        currentEndpoint: "weather",
        forecastEndpoint: "forecast",
        currentLoc: ".current-weather",
        forecastLoc: ".forecast",
        currentUpdateInterval: 3600000,
        forecastUpdateInterval: 43200000
    },

    Message: {
        messageLocation: "",
        useQuotes: false,
        quote: {
            apiEndpoint: "https://andruxnet-random-famous-quotes.p.mashape.com/",
            apiKey: keys.quote
        },
        messages: {
            morning: [
                "Good Morning!",
                "Have a Great Day!",
                "Looking Well!",
                "Don't Forget a Coffee!",
                "Have a Nice Sleep?"
            ],
            evening: [
                "Enjoy Your Lunch!",
                "Hope The Day is Going Well!",
                "Jaysus, What a Stunner!",
                "Fine Day for it!"
            ],
            night: [
                "Have a Great Night!",
                "Sweet Dreams!",
                "Early to Bed, Early to Rise"
            ],
            extremeNight: [
                "Shouldn't You Be Asleep...",
                "Sleep, who has time for it?",
                "Get to Bed!"
            ]
        }
    },


};