# **ELK Labs Smart Mirror**

## Introduction
This is the front end for a rasberry pi based smart mirror device. The software is a javascript based web project written in es6 using Browserify and jQuery.

To build the project you will need a pi running node.

You can find a build log on the Elk Labs site [here](http://elklabs.io/projects/smart-mirror "elk labs - smart mirror").

## Setup

### Requirments

* Raspian Jesse - [official download](https://www.raspberrypi.org/downloads/raspbian/)
* Chromium - [setup instructions](https://www.raspberrypi.org/forums/viewtopic.php?t=121195)
* Node.js - [setup instructions](http://weworkweplay.com/play/raspberry-pi-nodejs/) - [or here](http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi)
* git - `$ sudo apt-get install git`
* Forecast.io api key - [signup here](https://developer.forecast.io/register)
* Mashape api key - [signup here](https://market.mashape.com/register)
* You will need to sign up to the quote API - [here](https://market.mashape.com/andruxnet/random-famous-quotes)

### Building the project

In your home folder use git to pull down this repository, and enter into it.
```sh
$ git clone https://github.com/ELK-Labs/ELK-Smart-Mirror.git
$ cd ELK-Smart-Mirror
```

Install grunt, and http-server globally with npm. Run grunt to make sure everything went ok.
```sh
$ sudo npm install -g grunt grunt-cli http-server
$ grunt
```

Install all the project dependencies with npm.
```sh
$ sudo npm install
```
Configure the project
In the `src/js/config.js` file, add your desired settings such as personal messages, birthdays and time settigns.
In the `src/js/keys.js` folder, add your API keys.

Now build the project with grunt.
```sh
$ grunt build
```

Run the webserver.
```sh
$ cd dist
$ http-server --cors
```

You should see something similar to the following as output.
```sh
http-server Starting up http-server, serving ./ 
Available on: 
  http://192.168.0.23:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```

Open up a browser on the pi and go to one of the addresses above, you should see the interface.
back on the console hit `ctrl+c`.

### Setup chromium and http-server to auto-start     
Open the followinf file in your editor of chocie (nano used below):
```sh
$ sudo nano /etc/rc.local
```

Add the following line to the file, be sure that the path you add in where the project is located.
```sh
su pi -c 'http-server --cors /home/pi/Elk-Smart-Mirror/dist < /dev/null &'
```

Open the following file in your editor of choice (nano used below):
```sh
$ sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

And Add the following lines:
```sh
@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@chromium --kiosk --incognito http://127.0.0.1:8080
```

Reboot the pi and you should have a smart mirror front end boot up before your very eyes.

## Credits!

Major inspiration came from [http://michaelteeuw.nl/](http://michaelteeuw.nl/) and his 'Magic mirror'. You can find his github repo [here](https://github.com/MichMich/MagicMirror) to see and use his project if you prefer (it's excellent, and this one wouldn't have been possible without him).

* [erikflowers](https://twitter.com/Erik_UX) and his [weather icons](https://erikflowers.github.io/weather-icons/)
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/) 
* [forecast.io](http://forecast.io/) 
* [ANDRUXNET](https://market.mashape.com/andruxnet) 
* [Font Squirrel](https://www.fontsquirrel.com/) Open sans was used in this project, [licence](https://www.fontsquirrel.com/license/open-sans) 
* [jQuery](https://jquery.com/), [Node JS](https://nodejs.org/en/), [Grunt JS](http://gruntjs.com/), [browserify](http://browserify.org/), [Babel JS](https://babeljs.io) 







                                                                                      