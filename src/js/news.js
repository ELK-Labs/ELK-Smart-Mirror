//! news.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';
let $ = require('jquery');
let parser = require('parse-rss');

export class News {
    constructor() {
        this.intervalID = 0;
        this.intervalID_show = 0;
        this.feeds  = config.News.feeds || null;
        this.newsLoc = config.News.location;
        this.newsItems = [];
        this.seenItems = [];
        this.updateInterval = config.News.updateInterval || 300000;
        this.showInterval = config.News.showInterval || 60000;
        this.maxNewsItems = config.News.maxNewsItems || 25;
    }

    update() {

        for(let i = 0; i < this.feeds.length; i++) {

            let tempItems = [];
            parser('http://cors.io/?u=' + this.feeds[i], (error, rss) => {
                for (let j = 0; j < this.maxNewsItems; j++) {
                    tempItems.push(rss[j]);
                }
            });

            this.newsItems.push(tempItems);
        }

        this.seenItems = [];
    }

    show() {


    }

    init() {
        this.update();
        this.show();

        this.intervalID = setInterval(function () {
            this.update();
        }.bind(this), this.updateInterval);

        this.intervalID_show = setInterval(function () {
            this.show();
        }.bind(this), this.showInterval);

    }

}