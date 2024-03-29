# webex-v6-chat-starter
The dCloud Webex Contact Center v4 Instant Demo chat starter page.
It is built on Vue.js 2.6 (including vue-router and vuex), using Webpack 4.

## Development
### Usage
`yarn` to install dependency packages
`yarn start` to build libraries and start development environment with hot-reload
`yarn build:test` to build production files and start an express web server to test production files
`vue-devtools` to start Vue.js developer tools electron app. You will need to
install this tool globally and separately, but once it is available you can use
this command line to monitor state and DOM details of the Vue application. The
script for this will only be added to index.html in development mode.

### JWT
The Sign In function on the development website will prompt you for a JWT,
since it cannot redirect you the real SSO provider. You can get a valid JWT by
going to https://dcloud-collab-toolbox-rtp.cisco.com and logging in, then
opening your browser javascript console and entering `localStorage.jwt`.

## Production
### Installation
`./install.sh` to build and install to the /var/www/html/static/webex-v6-chat-starter folder
