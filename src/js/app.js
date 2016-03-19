import { Time } from './time';
import { News } from './news';
import { Weather } from './weather';
import { Message } from './message';

let time = new Time();
let news = new News();
let weather = new Weather();
let message = new Message();

time.init();
news.init();
weather.init();

message.quote();