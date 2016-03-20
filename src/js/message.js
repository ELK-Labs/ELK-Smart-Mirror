//! message
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';


export class Message {
    constructor(jquery) {
        this.$ = jquery;
        this.apiEndpoint = config.Message.quote.apiEndpoint;
        this.apiKey = config.Message.quote.apiKey
    }

    init() {

    }

    quote() {
        this.$.ajax({
            url: `${ this.apiEndpoint }`,
            type: "GET",
            data: {},
            dataType: 'json',
            success: (data) => {

            },
            error: () => {
                console.log("ah fuck");
            },
            beforeSend: (xhr) => {
                xhr.setRequestHeader("X-Mashape-Authorization", this.apiKey);
            }
        });
    }

    personalMessage() {

    }
}