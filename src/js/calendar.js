//! calendar
//! Author : Peter McKinney
//! On : 18/03/2016
//! Licence : MIT
//! elklabs.io

import { config } from './config';

export class Calendar {
    constructor($, moment) {
        this.moment = moment;
        this.$ = $;
        this.clientID = '439661368471-bbb78jv01beseftgbvlg24tmjlru4ncv.apps.googleusercontent.com';
        this.scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
        this.updateInterval = config.Calendar.updateInterval;
        this.attempts = 0;
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

        this.gapi.auth.authorize(
        {
            'client_id': this.clientID,
            'scope': this.scopes.join(' '),
            'immediate': true
        }, (res) => {
                this.handleAuthResult(res);
        });
    }

    handleAuthResult(res) {

        if(res && !res.error) {
            console.log(res);
            this.gapi.client.load('calendar', 'v3', () => {
                this.listUpcomingEvents();
            });
            this.attempts = 0;
        } else {
            if(this.attempts < 5) {
                this.gapi.auth.authorize({
                    client_id: CLIENT_ID,
                    scope: SCOPES,
                    immediate: false
                }, (res2) => {
                    this.handleAuthResult(res2);
                });
            } else {
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
            'maxResults': 10,
            'orderBy': 'startTime'
        });

        request.execute(function(resp) {
            let events = resp.items;

            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    let event = events[i];
                    let when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    console.log(event.summary + ' (' + when + ')');
                }
            } else {
                console.log('Error fetching Google Calendar Data');
            }

        });
    }

}

