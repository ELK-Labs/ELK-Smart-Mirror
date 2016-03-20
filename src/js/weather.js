//! weather.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class Weather {

    constructor(jquery) {
        this.$ = jquery;
        this.current_loc = config.Weather.currentLoc;
        this.apiKey = config.Weather.apiKey;
        this.apiVersion = config.Weather.apiVersion;
        this.apiBase = config.Weather.apiBase;
        this.cityID = config.Weather.cityID;
        this.currentEndpoint = config.Weather.currentEndpoint;
        this.forecastEndpoint = config.Weather.forecastEndpoint;
        this.currentUpdateInterval = config.Weather.currentUpdateInterval;
        this.forecastUpdateInterval = config.Weather.forecastUpdateInterval;

        this.iconTabel = {
            '01d':'wi-day-sunny',
            '02d':'wi-day-cloudy',
            '03d':'wi-cloudy',
            '04d':'wi-cloudy-windy',
            '09d':'wi-showers',
            '10d':'wi-rain',
            '11d':'wi-thunderstorm',
            '13d':'wi-snow',
            '50d':'wi-fog',
            '01n':'wi-night-clear',
            '02n':'wi-night-cloudy',
            '03n':'wi-night-cloudy',
            '04n':'wi-night-cloudy',
            '09n':'wi-night-showers',
            '10n':'wi-night-rain',
            '11n':'wi-night-thunderstorm',
            '13n':'wi-night-snow',
            '50n':'wi-night-alt-cloudy-windy'
        };
    }

    init() {
        this.updateCurrent();
        this.updateForecast();

        setInterval(() => {
            this.updateCurrent();
        }, this.currentUpdateInterval);

        setInterval(() => {
            this.updateForecast();
        }, this.forecastUpdateInterval);

    }

    updateCurrent() {
        this.$.ajax({
            type: 'GET',
            url: `${ config.CORSProxy }/${ this.apiBase }/${ this.apiVersion }/${ this.currentEndpoint }?id=${ this.cityID }&appid=${ this.apiKey }`,
            dataType: 'json',
            data: {},
            success: (data) => {

            },
            error: () => {
                console.log('oh dear :(');
            }
        });
    }

    updateForecast() {
        this.$.ajax({
            type: 'GET',
            url: `${ config.CORSProxy }/${ this.apiBase }/${ this.apiVersion }/${ this.forecastEndpoint }?id=${ this.cityID }&appid=${ this.apiKey }`,
            dataType: 'json',
            data: {},
            success: (data) => {

            },
            error: () => {
                console.log('oh dear :(');
            }
        });
    }

    _kelvinToC(temp) {
        return parseFloat(temp - 273.15).toFixed(1);
    }

    _kelvinToF(temp) {
        return parseFloat(((temp - 273.15) * 1.8) + 32).toFixed(1);
    }

    _msToKnots(windSpeed) {
        return parseFloat(windSpeed * 1.9438444924574).toFixed(2);
    }

}