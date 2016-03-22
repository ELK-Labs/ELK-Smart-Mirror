//! message
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';


export class Message {
    constructor(jquery, moment) {
        this.$ = jquery;
        this.moment = moment;
        this.useQuote = config.Message.useQuote;
        this.messages = config.Message.messages;
        this.birthdays = config.Message.birthdays;
        this.birthdayDateFormat = config.Message.birthdays.dateFormat;
        this.apiEndpoint = config.Message.quote.apiEndpoint;
        this.apiKey = config.Message.quote.apiKey;
        this.updateInterval = config.Message.updateInterval;
        this.messageLoc = "." + config.Message.messageLocation;

        if(config.Proxy.use) {
            this.apiEndpoint = config.Proxy.url + this.apiEndpoint;
        }
    }

    init() {

        //this.personalMessage();
        this.birthday();
        this.update();

        setInterval(() => {
            this.update();
        }, this.updateInterval);
    }

    update() {
        if(this.useQuote){
            this.quote();
        }
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
        let now = new this.moment().format('HH:mm');
        const sixAM = '06:00';
        const twelvePM = '12:00';
        const sixPM = '18:00';
        const twelveAM = '24:00';

        if(now >= sixAM && now < twelvePM) {
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.morning[0] }</span>`, config.animationDuration);
        } else if(now >= twelvePM&& now < sixPM) {
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.evening[0] }</span>`, config.animationDuration);
        } else if(now >= sixPM && now < twelveAM) {
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.night[0] }</span>`, config.animationDuration);
        } else if(now >= twelveAM && now < sixAM) {
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.lateNight[0] }</span>`, config.animationDuration);
        }
    }

    birthday() {

        const today = this.moment().format(this.birthdayDateFormat);

        this.birthdays.list.forEach((birthday) => {
            if(birthday[1] == today){
                this.$(this.messageLoc).html(`<span><i class="fa fa-birthday-cake"></i> Happy Birthday ${ birthday[0] }! <i class="fa fa-birthday-cake"></i></span>`);
            }
        });
    }
}