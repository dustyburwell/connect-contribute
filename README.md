# connect-contribute

[![Build Status](https://travis-ci.org/dustyburwell/connect-contribute.png)](https://travis-ci.org/dustyburwell/connect-contribute)

It's been suggested that one of the toughest parts of taking over maintenance of a website, especially one that represents a non-profit organization, is figuring out where to start. I propose two custom HTTP headers to help developers who would want to contribute to or report issues for a website.

<table>
  <tr>
    <th style="text-align:left;">X-ContributeUrl
    <td>The url to the source code repository for the website
  <tr>
    <th style="text-align:left;">X-IssuesUrl
    <td>The url to the issues reporting site for the website 
</table>

This is a reference implementation as a Connect middleware for adding those headers to a Connect or Express.js website.

## Usage

You can pass in the contribute and issues urls explicitly in the options for the contribute middleware.

```javascript
var http    = require("http");
var connect = require("connect");
var contrib = require("connect-contribute");

var options = {
  contributeUrl: 'http://github.com/dustyburwell/kansascity2',
  issuesUrl: 'http://github.com/dustyburwell/kansascity2/issues',
};

var app = connect()
  .use(contrib(options))

http.createServer(app).listen(3000);
```

Or you can pass in the contents of your `package.json` file and so long as `package.repository.url` is filled in with a GitHub url and connect-contribute will convert it to a contriute url and an issues url.

```javascript
var http    = require("http");
var connect = require("connect");
var contrib = require("connect-contribute");

var app = connect()
  .use(contrib(require("./package.json")))

http.createServer(app).listen(3000);
```