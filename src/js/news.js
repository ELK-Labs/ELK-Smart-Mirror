//! news.js
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class News {

    constructor($) {
        this.$ = $;
        this.feeds  = config.News.feeds || null;
        this.newsLoc = '.' + config.News.location;
        this.newsItems = [];
        this.seenItems = [];
        this.updateInterval = config.News.updateInterval || 300000;
        this.showInterval = config.News.showInterval || 60000;
        this.maxNewsItemsPerFeed = config.News.maxNewsItemsPerFeed || 25;
        this.maxDisplayItems = config.News.maxDisplayItems || 5;
        this.YQL = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select+title+from+rss+where+url%3D';

        if(config.Proxy.use) {
            this.YQL = config.Proxy.url + this.YQL;
        }
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

    update() {
        this.feeds.forEach((feed) => {
            this.$.ajax({
                type: 'GET',
                url: `${ this.YQL }"${ encodeURIComponent(feed) }"`,
                dataType: 'jsonp',
                data: {},
                success: (data) => {
                    this._handleData(data.query.results.item);
            },
                error: () => {
                    console.log('Error Retrieving News');
                }
            });
        });

        this.$(document).ajaxStop(() => {
            this.newsItems = this._shuffel(this.newsItems);
            this.show();
        });
    }

    show() {
        let newsHtml = `<ul>`;

        for(let i = 0; i < this.maxDisplayItems; i++ ) {
            newsHtml += `<li><i class="fa fa-newspaper-o"></i>&nbsp;<span>${ this.newsItems[i].title }</span></li>`
        }
        newsHtml += '</ul>';

        this.$(this.newsLoc).updateWithFade(newsHtml, config.animationDuration);
        this.seenItems.push(this.newsItems.shift());

        if(this.newsItems.length == this.maxDisplayItems) {
            this.newsItems.push.apply(this.newsItems, this.seenItems);
            this.seenItems = [];
        }
    }

    _handleData(data) {
        if(data.length > this.maxNewsItemsPerFeed) {
            data = data.slice(0, this.maxNewsItemsPerFeed);
        }

        this.newsItems.push.apply(this.newsItems, data);
    }

    _shuffel(array){
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

}