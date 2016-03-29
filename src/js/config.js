//! config.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { keys } from "./keys";

export const config = {

    /* Some Common Times in ms
     * 1 second : 1000
     * 1 minute : 60000
     * 5 minutes : 300000
     * 15 minutes : 900000
     * 30 minutes : 1800000
     * 1 hour : 3600000
     */

    // view locales here http://momentjs.com/#multiple-locale-support
    Locale: 'en-ie',

    //if you are having trouble with cross origin errors, set use to true. you can use either url, but the first one is better
    Proxy: {
        use: false,
        url: 'https://crossorigin.me/'
        // url: 'http://cors.io/?u='
    },

    // The fade out + in duration, set to 1 to disable NOT 0 (computers hate dividing by zero)
    animationDuration: 1000,

    Time: {
        timeLoc: 'time',
        dateLoc: 'date',
        updateInterval: 1000, // How often the time will refresh
        format: 'h:mm:ss A', // View formatting info here http://momentjs.com/docs/#/parsing/string-format/
        dateFormat: 'Do MMM YYYY'
    },

    News: {
        // add rss news feeds here
        feeds: [
            'http://waterfordwhispersnews.com/category/breaking-news/feed/',
            'http://www.theonion.com/feeds/rss'
        ],
        location: 'news',
        updateInterval: 3600000, // how often to pull new news stories
        showInterval: 60000, // how often to scroll the headlines
        maxNewsItemsPerFeed: 25, // how many items per each feed will be displayed
        maxDisplayItems: 5 // how many items will be displayed at once
    },

    Weather: {
        apiKey: keys.weather,
        apiBase: "https://api.forecast.io/forecast",
        lat: 53.3478, // find your lat and long on google maps
        long: -6.2597,
        useMetric: true,
        useKnots: false, // use knots for wind speed
        feelsLikeLoc: "feelslike",
        summaryLoc: "weathersummary",
        currentLoc: "temp",
        windLoc: "wind",
        sunLoc: "sun",
        forecastLoc: "forecast",
        updateInterval: 3600000 // how ofter the forecast updates
    },

    Message: {
        messageLocation: "message",
        useQuote: false,
        updateInterval: 1800000, // how often the quotes/messages update
        quote: {
            apiEndpoint: "https://andruxnet-random-famous-quotes.p.mashape.com/",
            apiKey: keys.quote
        },
        messages: {
            morning: [ // 6AM to 12PM
                "Good Morning!",
                "Have a Great Day!",
                "Looking Well!",
                "Don't Forget a Coffee!",
                "Have a Nice Sleep?"
            ],
            evening: [ // 12PM to 6PM
                "Enjoy Your Lunch!",
                "Hope The Day is Going Well!",
                "Jaysus, What a Stunner!",
                "Fine Day for it!"
            ],
            night: [ // 6PM to 12AM
                "Have a Great Night!",
                "Sweet Dreams!",
                "Early to Bed, Early to Rise"
            ],
            lateNight: [ // 12AM to 6AM
                "Shouldn't You Be Asleep...",
                "Sleep, who has time for it?",
                "Get to Bed!"
            ]
        },
        birthdays: {
            dateFormat: 'DD/MM', // For American style date MM/DD Don't include the year just the day and month.
            list: [
                ['Peter', '01/04'],
                ['Olwen', '22/03']
            ]
        }
    },
    Calendar: {
        updateInterval: 900000,
        maxItems: 5
    }
};