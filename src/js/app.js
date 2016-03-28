//! app.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { Time } from './time';
import { News } from './news';
import { Weather } from './weather';
import { Message } from './message';
import { Calendar } from './calendar';

const $ = require('jquery');
const moment = require('moment');

let time = new Time($, moment);
let news = new News($);
let weather = new Weather($, moment);
let message = new Message($, moment);
let calendar = new Calendar($, moment);

$.fn.updateWithFade = function(data, duration) {
    this.fadeOut(duration / 2, () => {
        this.empty();
        this.html(data);
        this.fadeIn(duration / 2);
    });
};

window.oAuthCallBack = () => {
    calendar.checkOAuth();
};

$(document).ready(() => {

    time.init();
    weather.init();
    news.init();
    message.init();
    calendar.init();

});

