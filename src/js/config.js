//! config.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

export const config = {
    Locale: 'en-ie',
    Time: {
        timeLoc: '.time',
        dateLoc: '.date',
        secondClass: '.second',
        updateInterval: 1000
    },
    News: {
        feeds: [
            'http://www.independent.ie/breaking-news/rss/',
            'http://www.independent.ie/breaking-news/irish-news/rss/',
            'http://www.independent.ie/world-news/rss/',
            'http://www.independent.ie/entertainment/rss/'
        ],
        location: '.news',
        updateInterval: 1800000, // 30 minutes
        showInterval: 60000,
        maxNewsItems: 25,
        maxDisplayItems: 4
    }
};