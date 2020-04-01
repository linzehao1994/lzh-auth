# lzh-auth

## Installation

```
$ npm install lzh-auth
```

## Usage

```javascript
const express = require('express');
const Auth = require('lzh-auth');

const app = express();
const auth = Auth({baseUrl: ''});

app.use('/', auth);

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});
```