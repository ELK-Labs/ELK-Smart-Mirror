//! calendar
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class Calendar {
    constructor($, moment) {
        this.$ = $;
        this.moment = moment;
        this.clientID = '439661368471-bbb78jv01beseftgbvlg24tmjlru4ncv.apps.googleusercontent.com';
        this.scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
        this.updateInterval = config.Calendar.updateInterval;
        this.maxItems = config.Calendar.maxItems;
        this.attempts = 0;
        this.location = '.' + config.Calendar.calendarLocation;
    }

    init() {
        setInterval(() => {
            this.update();
        }, this.updateInterval);
    }

    update() {
        this.checkOAuth();
    }

    checkOAuth() {
        this.gapi = window.gapi;

        this.gapi.auth.authorize({
            'client_id': this.clientID,
            'scope': this.scopes.join(' '),
            'immediate': true
        }, (res) => {
                this.handleAuthResult(res);
        });
    }

    handleAuthResult(res) {
        if(res && !res.error) {
            this.gapi.client.load('calendar', 'v3', () => {
                this.listUpcomingEvents();
            });
            this.attempts = 0;
        }
        else {
            if(this.attempts < 5) {
                this.gapi.auth.authorize({
                    client_id: this.clientID,
                    scope: this.scopes,
                    immediate: false
                }, (res2) => {
                    this.handleAuthResult(res2);
                });
            }
            else {
                console.log('couldn\'t authenticate with google api');
                this.attempts = 0;
            }
            this.attempts ++;
        }
    }

    listUpcomingEvents() {
        let request = this.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': this.maxItems,
            'orderBy': 'startTime'
        });

        request.execute((resp) => {
            let events = resp.items;
            let html = '<ul>';
            
            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    let event = events[i];
                    let when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    let time = new this.moment(when).locale(config.Locale).calendar(null, {
                        sameDay: '[Today] HH:mm',
                        nextDay: '[Tomorrow] HH:mm',
                        nextWeek: 'dddd HH:mm',
                        sameElse: `${ config.dateFormat } HH:mm`
                    });

                    html += `<li><i class="fa fa-calendar"></i>&nbsp;<span>${ time } &#9866; ${ event.summary }</span></li>`;
                }
            }
            else {
                console.log('Error fetching Google Calendar Data');
            }

            html += '</ul>';
            this.$(this.location).updateWithFade(html, config.animationDuration);

        });
    }
}
