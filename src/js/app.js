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

const moment = require('moment');
const parseRss = require('parse-rss');

let time = new Time(moment, $);
let news = new News(parseRss, $);
let weather = new Weather($, moment);
let message = new Message($);

time.init();
weather.init();
news.init();

message.init();
