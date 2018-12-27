# Bookshop

## Features

* Rails API
    * devise token authentication
    * api-only 
* React App
    * built with create-react-app, independent from rails app
    * Semantic UI
    * list and add books
        * books get fetched from rails api ([axios](https://github.com/axios/axios))
        * bootstrap form inputs with error rendering ([informed](https://joepuzzo.github.io/informed/) + custom)
    * I18n support (translations loaded from rails api) ([i18next](https://github.com/i18next/react-i18next))
    * Websocket/Actioncable example included ([react-actioncable-provider](https://github.com/cpunion/react-actioncable-provider))
    * Mobx
    * devise token authentication
    * login/logout

## Setup

Install the libraries:
```bash
$ bundle install
$ cd client && npm i
```

Setup database:
```
$ rails db:setup
```


### Semantic UI
Built Files are checked-in, therefore building is only required when you change the theme config.  

Build Semantic-UI Theme:
```
$ cd client/src/semantic-ui && gulp build
```

## Run

```
npm run serve
```

This starts the rails server plus the webpack dev server (with hot reload).
Meaning react app will get compiled automatically on save and browser will hot-reload it.

