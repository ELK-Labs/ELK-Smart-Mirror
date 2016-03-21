//! app.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { Time } from './time';
import { News } from './news';
import { Weather } from './weather';
import { Message } from './message';

const $ = require('jquery');


$.fn.updateWithFade = function(data, duration) {
    this.fadeOut(duration / 2, () => {
        this.empty();
        this.html(data);
        this.fadeIn(duration / 2);
    });
};

const moment = require('moment');

$(document).ready(() => {

    let time = new Time(moment, $);
    let news = new News($);
    let weather = new Weather($, moment);
    let message = new Message($);

    time.init();
    weather.init();
    news.init();

    message.init();

});