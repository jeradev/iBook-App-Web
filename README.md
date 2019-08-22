# Phone Book app & Node as server side

A simple html & js app for managing phone-book

## Structure

- html/css for main layout
- js (dhtml) to generate phone-book table dynamically
- static json files for mocking API [api/*.json](api/list.json)

## Live preview

Open [https://github.com/jeradev](https://github.com/jeradev)

## Configure the app (API)

if you have an API that makes all CRUD operations, 
you can integrate it by changing [js/iBookAppWeb.js](js/iBookAppWeb.js) **API** && **ACTION_METHODS**

### Enable Cors for external API

CORS [docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Running the app

### with nodejs server

one time:
```
npm install serve -g
```

daily usage
```
serve .
```
Open: [http://localhost:8090/](http://localhost:8090/)

### other web servers

host the folder on other servers as static content

