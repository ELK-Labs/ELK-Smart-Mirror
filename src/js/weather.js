//! weather.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class Weather {

    constructor($, moment) {
        this.$ = $;
        this.moment = moment;
        this.apiKey = config.Weather.apiKey;
        this.apiBase = config.Weather.apiBase;
        this.lat = config.Weather.lat;
        this.long = config.Weather.long;
        this.currentLoc = '.' + config.Weather.currentLoc;
        this.windLoc = '.' + config.Weather.windLoc;
        this.sunLoc = '.' + config.Weather.sunLoc;
        this.feelsLikeLoc = '.' + config.Weather.feelsLikeLoc;
        this.summaryLoc = '.' + config.Weather.summaryLoc;
        this.forecastLoc = '.' + config.Weather.forecastLoc;
        this.updateInterval = config.Weather.updateInterval;
        this.useKnots = config.Weather.useKnots || false;
        this.useMetric = config.Weather.useMetric;
        this.units = 'si';
        this.windUnit = '';

        this.iconTable = {
            'clear-day':'wi-day-sunny',
            'clear-night':'wi-night-clear',
            'cloudy-day':'wi-day-cloudy',
            'cloudy-night':'wi-night-cloudy',
            'cloudy':'wi-cloudy',
            'fog-day':'wi-day-fog',
            'fog-night':'wi-night-fog',
            'fog':'wi-fog',
            'hail-day':'wi-day-hail',
            'hail-night':'wi-night-hail',
            'hail':'wi-hail',
            'partly-cloudy-day':'wi-day-cloudy',
            'partly-cloudy-night':'wi-night-partly-cloudy',
            'rain-day':'wi-day-rain',
            'rain-night':'wi-night-rain',
            'rain':'wi-rain',
            'snow-day':'wi-day-snow',
            'snow-night':'wi-night-snow',
            'snow':'wi-snow',
            'sleet-day':'wi-day-sleet',
            'sleet-night':'wi-night-sleet',
            'sleet':'wi-sleet',
            'thunderstorm':'wi-thunderstorm',
            'tornado':'wi-tornado',
            'wind':'wi-windy'
        };

        this.moonIconTable = {
            '0':'wi-moon-new',
            '1':'wi-moon-waxing-crescent-1',
            '2':'wi-moon-waxing-crescent-2',
            '3':'wi-moon-waxing-crescent-3',
            '4':'wi-moon-waxing-crescent-4',
            '5':'wi-moon-waxing-crescent-5',
            '6':'wi-moon-waxing-crescent-6',
            '7':'wi-moon-first-quarter',
            '8':'wi-moon-waxing-gibbous-1',
            '9':'wi-moon-waxing-gibbous-2',
            '10':'wi-moon-waxing-gibbous-3',
            '11':'wi-moon-waxing-gibbous-4',
            '12':'wi-moon-waxing-gibbous-5',
            '13':'wi-moon-waxing-gibbous-6',
            '14':'wi-moon-full',
            '15':'wi-moon-waning-gibbous-1',
            '16':'wi-moon-waning-gibbous-2',
            '17':'wi-moon-waning-gibbous-3',
            '18':'wi-moon-waning-gibbous-4',
            '19':'wi-moon-waning-gibbous-5',
            '20':'wi-moon-waning-gibbous-6',
            '21':'wi-moon-third-quarter',
            '22':'wi-moon-waning-crescent-1',
            '23':'wi-moon-waning-crescent-2',
            '24':'wi-moon-waning-crescent-3',
            '25':'wi-moon-waning-crescent-4',
            '26':'wi-moon-waning-crescent-5',
            '27':'wi-moon-waning-crescent-6'
        };

        if(this.useKnots) {
            this.windUnit = 'kn'
        }
        else if(this.useMetric) {
            this.windUnit = 'kph';
        }
        else {
            this.windUnit = 'mph'
        }

        if (!this.useMetric) {
            this.units = 'us';
        }

        if(config.Proxy.use) {
            this.apiBase = config.Proxy.url + this.apiBase;
        }
    }

    init() {
        this.update();

        setInterval(() => {
            this.update();
        }, this.updateInterval);

    }

    update() {
        this.$.ajax({
            type: 'GET',
            url: `${ this.apiBase }/${ this.apiKey }/${ this.lat },${ this.long }?units=${ this.units }`,
            dataType: 'jsonp',
            data: {},
            success: (data) => {
                this._handleData(data);
            },
            error: () => {
                console.log('Error retrieving weather');
            }
        });
    }

    _handleData(data) {
        let temp = Math.ceil(data.currently.temperature);
        let apparentTemp = Math.ceil(data.currently.apparentTemperature);
        let wind = 0;
        let dayTime = false;

        if(this.useKnots) {
            wind = this._windToKnots(data.currently.windSpeed, this.useMetric);
        }
        else {
            if(this.useMetric) {
                wind = this._roundValue(data.currently.windSpeed * 3.6, 2);
            }
            else {
                wind = this._roundValue(data.currently.windSpeed, 2);
            }
        }

        let windDirection = this._windDirection(data.currently.windBearing);
        let now = this.moment().locale(config.Locale).format('HH:mm');
        let sunrise = this.moment(data.daily.data[0].sunriseTime*1000).format('HH:mm A');
        let sunset = this.moment(data.daily.data[0].sunsetTime*1000).format('HH:mm A');
        let moon = Math.round(27*(data.daily.data[0].moonPhase + 0.018));
        let feelsLikeHtml = `<span></span>`;
        let summaryHtml = `<span>${ data.hourly.summary }</span>`;
        let windHtml = `<span><i class="wi wi-strong-wind"></i> ${ windDirection } at ${ wind } ${ this.windUnit }</span>`;
        let sunHTML = `<span><i class="wi wi-sunrise"></i> at ${ sunrise }</span>`;

        if(sunrise < now && sunset > now) {
            sunHTML = `<span><i class="wi wi-sunset"></i> at ${ sunset }</span>`;
            dayTime = true;
        }
        if(Math.abs(temp - apparentTemp) > 1) {
            feelsLikeHtml = `<span>Feels like ${ apparentTemp }&deg;</span>`;
        }

        let icon = this._icon(data.currently.icon, moon, dayTime);
        let currentTempHtml = `<span>${ temp }&deg;</span> <i class="wi ${ icon }"></i>`;
        let opacity = 1;
        let forecastHtml = '<table class="forecast-table">';

        for (let i = 0, count = data.daily.data.length; i < count; i++) {

            let forecast = data.daily.data[i];
            forecastHtml += `<tr style="opacity:${ opacity }">`;
            forecastHtml += `<td class="day"> ${ this.moment(forecast.time, 'X').calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                sameElse: `${ config.dateFormat }`
            }) }</td>`;
            forecastHtml += `<td class="forecast-icon wi ${ this.iconTable[forecast.icon] }"></td>`;
            forecastHtml += `<td class="temp-min"> Low: ${ Math.ceil(forecast.temperatureMin) }&deg; </td>`;
            forecastHtml += `<td class="temp-max"> High: ${ Math.ceil(forecast.temperatureMax) }&deg; </td>`;
            forecastHtml += '</tr>';
            opacity -= 0.125;

        }
        forecastHtml += '</table>';

        this.$(this.summaryLoc).updateWithFade(summaryHtml, config.animationDuration);
        this.$(this.currentLoc).updateWithFade(currentTempHtml, config.animationDuration);
        this.$(this.feelsLikeLoc).updateWithFade(feelsLikeHtml, config.animationDuration);
        this.$(this.windLoc).updateWithFade(windHtml, config.animationDuration);
        this.$(this.sunLoc).updateWithFade(sunHTML, config.animationDuration);
        this.$(this.forecastLoc).updateWithFade(forecastHtml, config.animationDuration);
    }

    _icon(icon, moonPhase, isDaytime) {
        if(icon=='clear-day' || icon=='partly-cloudy-day' || icon == 'partly-cloudy-night' || icon == 'thunderstorm' || icon == 'tornado' || icon == 'wind') {
            return this.iconTable[icon];
        }
        else if(icon == 'clear-night') {
            return this.moonIconTable[moonPhase];
        }
        else {
            if(isDaytime) {
                return this.iconTable[icon + '-day'];
            }
            else {
                return this.iconTable[icon + '-night'];
            }
        }
    }

    _windDirection(windAngle) {
        if (windAngle >= 11.25 && windAngle < 33.75) {
            return 'NNE';
        }
        else if (windAngle >= 33.75 && windAngle < 56.25) {
            return 'NE';
        }
        else if (windAngle >= 56.25 && windAngle < 78.75) {
            return 'ENE';
        }
        else if (windAngle >= 78.75 && windAngle < 101.25) {
            return 'E';
        }
        else if (windAngle >= 101.25 && windAngle < 123.75) {
            return 'ESE';
        }
        else if (windAngle >= 123.75 && windAngle < 146.25) {
            return 'SE';
        }
        else if (windAngle >= 146.25 && windAngle < 168.75) {
            return 'SSE';
        }
        else if (windAngle >= 168.75 && windAngle < 191.25) {
            return 'S';
        }
        else if (windAngle >= 191.25 && windAngle < 213.75) {
            return 'SSW';
        }
        else if (windAngle >= 213.75 && windAngle < 236.25) {
            return 'SW';
        }
        else if (windAngle >= 236.25 && windAngle < 258.75) {
            return 'WSW';
        }
        else if (windAngle >= 258.75 && windAngle < 281.25) {
            return 'W';
        }
        else if (windAngle >= 281.25 && windAngle < 303.75) {
            return 'WNW';
        }
        else if (windAngle >= 303.75 && windAngle < 326.25) {
            return 'NW';
        }
        else if (windAngle >= 326.25 && windAngle < 348.75) {
            return 'NNW';
        }
        else {
            return 'N';
        }
    }

    _roundValue(temp, length) {
        return parseFloat(temp).toFixed(length);
    }

    _windToKnots(windSpeed, metric) {
        if(metric) {
            return parseFloat(windSpeed * 1.94384).toFixed(2);
        }
        else {
            return parseFloat(windSpeed * 0.868976).toFixed(2);
        }
    }
}