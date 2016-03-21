# **ELK Labs Smart Mirror**

## Introduction
This is the front end for a rasberry pi based smart mirror device. The software is a javascript based web project written in es6 using Browserify and jQuery.

To build the project you will need a pi running node.

You can find a build log on the Elk Labs site [here](http://elklabs.io/projects/smart-mirror "elk labs - smart mirror").

## Setup

### Setup Pi os
On your pi, install [Raspbian](https://www.raspberrypi.org/downloads/raspbian/, "Raspbian Jessie"). Then Run:

	sudo apt-get update
	sudo apt-get upgrade

### Setup Web Server
Since the project is written in es6 which is not usable in browsers yet, it is necessary to transpile the project into regular JS.

First install node on the pi you wish to build the project on. 
if you are having trouble look [here](http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi, "Node on pi") but update the link with the most recent stable version of node.

Run `npm` on the command line to make sure everything went ok. 

Next globally install grunt and grunt-cli using the following command: 
	```npm install -g grunt grunt-cli```

Run the command `grunt` after everything is installed to make sure it went ok. You may have to restart the command line for everything to load.

next either download the [zip of the project](https://github.com/ELK-Labs/ELK-Smart-Mirror/archive/master.zip, "Download zip") or install git and clone the repo by running: ```git clone https://github.com/ELK-Labs/ELK-Smart-Mirror.git```

Navigate to the project directory and run:
	```npm install```
This will install all the project dependencies located in package.json

After that completes, configure the project by using the config.js file and keys.js file. Info on how to do that is in the next section.

When you have everything configured, run the command:
	```grunt build```    

You should now have a dist folder. This is your working smart mirror software.

Now you will have to install a simple webserver to allow you to reach the site, luckily node has one built in. Run the following:
	```npm install http-server -g```

now in the dist folder:
	```http-server --cors```

you should see something like the following:
```λ http-server
Starting up http-server, serving ./
Available on:
  http://192.168.0.23:8080
  http://127.0.0.1:8080```   

These are the address you will need to configure your pi to display the interface.

## Setup browser and pi auto-start     
This is the easy part!

on the pi install chromium with the following command: ```sudo apt-get install chromium x11-xserver-utils unclutter```      

If you have trouble with chromium have a look [here](https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=121195, "Guide: Chromium 48 on Raspbian Jessie")

Next in your editor of choice edit the following file:
`/etc/xdg/lxsession/LXDE-pi/autostart`

And Add the following lines 

	@xscreensaver -no-splash
	@xset s off
	@xset -dpms
	@xset s noblank
	@chromium --kiosk --incognito http://127.0.0.1:8080

You can replace `http://127.0.0.1:8080` with the address you recieved above after running http-server, but it should be the same.

Reboot the pi and You should have a smart mirror front end boot up before your very eyes.

## Config

see config.js for instructions!

You will also need to get a few pieces of information.

1. A [forecast.io](https://developer.forecast.io/register) API Key
2. A [mashape](https://market.mashape.com/) API Key

You will need to find your cities latitude and longitude for the weather as well.
                                      
You will need the RSS feeds of any news site you wish to see headlines from.

You can also set custom messages in the messages section. As well as add in any birthdays you wish to see messages for!

## Credits!

Major inspiration came from [http://michaelteeuw.nl/](http://michaelteeuw.nl/) and his 'Magic mirror'. You can find his github repo [here](https://github.com/MichMich/MagicMirror) to see and use his project if you prefer (it's excellent, and this one wouldn't have been possible without him).


[erikflowers](https://twitter.com/Erik_UX) and his [weather icons](https://erikflowers.github.io/weather-icons/) and his weather icons.

[Font Awesome](https://fortawesome.github.io/Font-Awesome/) and their awesome icon set

[forecast.io](http://forecast.io/) for their free API

[ANDRUXNET](https://market.mashape.com/andruxnet) For their free quotes API

[jQuery](https://jquery.com/), [Node JS](https://nodejs.org/en/), [Grunt JS](http://gruntjs.com/), [browserify](http://browserify.org/), [Babel JS](https://babeljs.io) all for being great software





                                                                                      