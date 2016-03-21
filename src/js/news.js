//! news.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class News {

    constructor(parse, jquery) {
        this.parse = parse;
        this.$ = jquery;
        this.feed  = config.News.feed || null;
        this.newsLoc = "." + config.News.location;
        this.newsItems = [];
        this.seenItems = [];
        this.updateInterval = config.News.updateInterval || 300000;
        this.showInterval = config.News.showInterval || 60000;
        this.maxNewsItems = config.News.maxNewsItems || 25;
        this.maxDisplayItems = config.News.maxDisplayItems || 5;
    }

    update() {

        this.parse( config.CORSProxy + this.feed, (error, rss) => {

            let itemCount = rss.length <= this.maxNewsItems ? rss.length : this.maxNewsItems;

            if(!error) {
                for(let i = 0; i < itemCount; i++) {
                    this.newsItems.push(rss[i]);
                }

                this.show();
            }

        });
    }

    show() {
        let newsHtml = `<ul>`;

        for(let i = 0; i < this.maxDisplayItems; i++ ) {

            newsHtml += `<li><span>${ this.newsItems[i].title }</span></li>`

        }

        newsHtml += '</ul>';

        this.$(this.newsLoc).html(newsHtml);
    }

    init() {
        this.update();

        setInterval(() => {
            this.update();
        }, this.updateInterval);

        setInterval(() => {
            this.show();
        }, this.showInterval);

    }

}