# TRACKMII - A dinamic realtime geolocation tracker

## Description

This is the final project for [Skylab Coders](http://www.skylabcoders.com/en/) Bootcamp (3rd Edition), and Its main utility is that it allows users to know where other online users are.

As a mobile web application, It uses the socket.io real time engine [Socket.io](https://socket.io/) and MEAN JavaScript software stack.

As a user you can create an account, log in, create groups and invite people by email notifications.

Once you are log in and participating in a group, you can open a Google Map View where you can find the location of each online member.

Can be seen online at: https://trackmii.herokuapp.com/

## Keywords

- **Angular**
- **Bootstrap**
- **MongoDB**
- **Express**
- **Node.js**
- **Socket.io**
- **Google Maps**
- **Login & Register** w/ Passport (Local) & JWT
- **SASS**



## Installation

To run local server you need to create a `.env` w/ the following variables...

    PORT=XXXXXXXXXXXXXXXX
    SECRET=XXXXXXXXXXXXXXXX
    DB_URI=mongodb://localhost:27017/XXXXX

To start the project, run:

    npm start

To start the project in dev mode:

    npm run watch

To run remotely (in heroku) the proper environment variables should be set before deploying...

    heroku config:set     PORT=XXXXXXXXXXXXXXXX
    heroku config:set SECRET=XXXXXXXXXXXXXXXX
    heroku config:set DB_URI=mongodb://<%USER%>:<%PASS%>@XXXXXXXXX.mlab.com:00000/xxxxxxxxxxx
