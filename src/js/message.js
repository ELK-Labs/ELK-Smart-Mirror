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
        this.birthdayDateFormat = config.dateFormat;
        this.apiEndpoint = config.Message.quote.apiEndpoint;
        this.apiKey = config.Message.quote.apiKey;
        this.updateInterval = config.Message.updateInterval;
        this.messageLoc = "." + config.Message.messageLocation;
        this.currentMessages = [0,0,0,0];

        if(config.Proxy.use) {
            this.apiEndpoint = config.Proxy.url + this.apiEndpoint;
        }
    }

    init() {

        this.update();

        setInterval(() => {
            this.update();
        }, this.updateInterval);
    }

    update() {

        if(!this.birthday()){
            if(this.useQuote){
                this.quote();
            } else {
                this.personalMessage();
            }
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
            if(this.currentMessages[0] ++ >= this.messages.morning.length - 1) {
                this.currentMessages[0] = 0;
            }
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.morning[this.currentMessages[0]] }</span>`, config.animationDuration);

        } else if(now >= twelvePM&& now < sixPM) {
            if(this.currentMessages[1] ++ >= this.messages.evening.length - 1) {
                this.currentMessages[1] = 0;
            }
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.evening[this.currentMessages[1]] }</span>`, config.animationDuration);
        } else if(now >= sixPM && now < twelveAM) {
            if(this.currentMessages[2] ++ >= this.messages.night.length - 1) {
                this.currentMessages[2] = 0;
            }
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.night[this.currentMessages[2]] }</span>`, config.animationDuration);
        } else if(now >= twelveAM && now < sixAM) {
            if(this.currentMessages[3] ++ >= this.messages.lateNight.length - 1) {
                this.currentMessages[3] = 0;
            }
            this.$(this.messageLoc).updateWithFade(`<span>${ this.messages.lateNight[this.currentMessages[3]] }</span>`, config.animationDuration);
        }
    }

    birthday() {
        const today = this.moment().format(this.birthdayDateFormat);

        this.birthdays.list.forEach((birthday) => {
            if(birthday[1] == today){
                this.$(this.messageLoc).html(`<span><i class="fa fa-birthday-cake"></i> Happy Birthday ${ birthday[0] }! <i class="fa fa-birthday-cake"></i></span>`);
                return true;
            }
        });
    }
}