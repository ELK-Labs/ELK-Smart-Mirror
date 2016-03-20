//! time.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class Time {
    constructor(moment, jQuery) {
        this.moment = moment;
        this.$ = jQuery;
        this.updateInterval = config.Time.updateInterval || 1000;
        this.timeLoc = config.Time.timeLoc;
        this.locale = config.Locale;
    }

    init() {
        this.update();
        setInterval(() => {
            this.update();
        }, this.updateInterval);
    }

    update () {
        let now = this.moment().locale(this.locale).format("h:mm:ss A");
        this.$(this.timeLoc).html(now);
    }
}