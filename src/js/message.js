//! message
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';
let $ = require('jquery');


export class Message {
    constructor() {
        this.apiEndpoint = config.Message.quote.apiEndpoint;
        this.apiKey = config.Message.quote.apiKey
    }

    init() {

    }

    quote() {
        $.ajax({
            url: this.apiEndpoint,
            type: "GET",
            data: {},
            dataType: 'json',
            success: (data) => {
                // todo add message to index.html
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