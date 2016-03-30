//! time.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class Time {
    constructor($, moment) {
        this.$ = $;
        this.moment = moment;
        this.updateInterval = config.Time.updateInterval || 1000;
        this.timeLoc = '.' + config.Time.timeLoc;
        this.dateLoc = '.' + config.Time.dateLoc;
        this.locale = config.Locale;
        this.format = config.Time.format;
        this.dateFormat = config.Time.dateFormat;
    }

    init() {
        this.update();
        setInterval(() => {
            this.update();
        }, this.updateInterval);
    }

    update () {
        let timeHtml = `<span>${ this.moment().locale(this.locale).format(this.format)} </span>`;
        let dateHtml = `<span>${ this.moment().locale(this.locale).format(this.dateFormat) }</span>`;

        this.$(this.timeLoc).html(timeHtml);
        this.$(this.dateLoc).html(dateHtml);
    }
}