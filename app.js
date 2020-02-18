const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const books = require('./play-store.js');

app.get('/apps', (req, res) => {

})

app.listen(8000, () => {
    console.log('server running on port 8000')
})