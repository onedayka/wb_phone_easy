'use strict';

const express = require('express')
const app = express()
const port = 4500
const path = require('path');
const axios = require('axios').default;

const moment = require('moment');

app.use(express.json());

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?,\\^$|#\s]/g, '\\$&');
}

function getDataFromWB(apiKey, number, res) {

    let _dat = moment().subtract(1, 'months').format("YYYY-MM-DDT00:00:00Z");

    let options = {
        headers: {
            "accept": "application/json",
            "Authorization": apiKey
        },
        params: {
            'date_start': _dat,
            'take': 10,
            'id': number,
            'skip': 0
        }
    }

    axios.get('https://suppliers-api.wildberries.ru/api/v2/orders', options)
    .then(function (response) {

        res.send({
            "status": "OK",
            "result": response.data
        });
    })
    .catch(function (error) {
        res.send({
            "status": "ERROR",
            "desc": error.data
        });
    });
}

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/info.html'));
});

app.post('/get-data', (req, res) => {
    let data = getDataFromWB(escapeRegExp(req.body.apiKey), escapeRegExp(req.body.orderNumber), res);
});

app.listen(port, () => {
    console.log(`WB GetPhone app listening at http://localhost:${port}`)
});
  
