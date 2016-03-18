//! time.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config'

let $ = require('jquery');
let moment = require('moment');

export class Time {
    constructor() {
        this.intervalID = 0;
        this.updateInterval = config.Time.updateInterval || 1000;
        this.timeLoc = config.Time.timeLoc;
        this.locale = config.Locale;
    }

    init() {
        this.update();
        this.intervalID = setInterval(function() {
            this.update();
        }.bind(this), this.updateInterval);
    }

    update () {
        let now = moment().locale(this.locale).format("h:mm:ss A");
        $(this.timeLoc).html(now);
    }
}