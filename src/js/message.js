//! message
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';


export class Message {
    constructor(jquery) {
        this.$ = jquery;
        this.useQuote = config.Message.useQuote;
        this.apiEndpoint = config.Message.quote.apiEndpoint;
        this.apiKey = config.Message.quote.apiKey;
        this.updateInterval = config.Message.updateInterval;
        this.messageLoc = "." + config.Message.messageLocation;

        if(config.Proxy.use) {
            this.apiEndpoint = config.Proxy.url + this.apiEndpoint;
        }
    }

    init() {

        if(this.useQuote) {
            this.quote();
        } else {
            this.personalMessage();
        }

        setInterval(() => {
            if(this.useQuote) {
                this.quote();
            } else {
                this.personalMessage();
            }
        }, this.updateInterval);
    }

    quote() {
        this.$.ajax({
            url: `${ this.apiEndpoint }`,
            type: "GET",
            data: {},
            dataType: 'json',
            success: (data) => {
                this.$(this.messageLoc)
                    .updateWithFade(`<span>&quot;${ data.quote }&quot;</span><span> &#8211; ${ data.author }</span>`, config.animationDuration);
            },
            error: () => {
                console.log("Unable to retrieve quote");
            },
            beforeSend: (xhr) => {
                xhr.setRequestHeader("X-Mashape-Authorization", this.apiKey);
            }
        });
    }

    personalMessage() {

    }
}