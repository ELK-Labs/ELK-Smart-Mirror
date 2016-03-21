//! config.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { keys } from "./keys";

export const config = {

    Locale: 'en-ie',

    //CORSProxy: 'https://crossorigin.me',
    CORSProxy: 'http://cors.io/?u=',

    Time: {
        timeLoc: '.time',
        dateLoc: '.date',
        secondClass: '.second',
        updateInterval: 1000
    },
    News: {
        feed: 'http://waterfordwhispersnews.com/category/breaking-news/feed/',
        location: 'news',
        updateInterval: 1800000, // 30 minutes
        showInterval: 60000,
        maxNewsItems: 25,
        maxDisplayItems: 5
    },

    Weather: {
        apiKey: keys.weather,
        apiBase: "https://api.forecast.io/forecast",
        lat: 53.4433,
        long: -6.2,
        useMetric: true,
        useKnots: false,
        feelsLikeLoc: "feelslike",
        summaryLoc: "weathersummary",
        currentLoc: "temp",
        windLoc: "wind",
        sunLoc: "sun",
        forecastLoc: "forecast",
        updateInterval: 3600000
    },

    Message: {
        messageLocation: "message",
        useQuotes: false,
        updateInterval: 3600000,
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