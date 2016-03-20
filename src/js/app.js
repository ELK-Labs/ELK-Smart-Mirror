//! app.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { Time } from './time';
import { News } from './news';
import { Weather } from './weather';
import { Message } from './message';

var $ = require('jquery');

let moment = require('moment');
let parseRss = require('parse-rss');

let time = new Time(moment, $);
let news = new News(parseRss, $);
let weather = new Weather($);
let message = new Message($);

time.init();
news.init();
weather.init();

message.quote();
