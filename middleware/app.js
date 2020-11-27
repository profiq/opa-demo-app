'use strict';

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 80;

const OPA_URL = 'http://opa:8181/v1/data/demo/opa';

const indexHandler = (req, res) => {
    axios
        .post(
            OPA_URL,
            {
                input: {
                    method: req.headers['x-forwarded-method'],
                    token: (req.headers['authorization'] || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYW5vbnltIn0._tK4KjlYUAwcyHp-8FL0bKU-B6TLBIKFhfrF9KJ7Aa8'),
                    path: req.headers['x-forwarded-uri'],
                    course: req.headers['course'] || '',
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(function (resp) {
            if (resp.status === 200 && resp.data.result.allow === true) {
                res.status(200).send('');
            } else {
                res.status(403).send(
                    JSON.stringify({
                        info: 'Not authorized (blocked by OPA)',
                    })
                );
            }
        })
        .catch(err => {
            res.status(500).send(
                JSON.stringify({
                    info: err.message,
                })
            );
        });
};

app.use(cors());
app.use(morgan('combined'));

app.get('/', indexHandler);
app.listen(port, () =>
    console.log(`Middleware Service listening on port ${port}!`)
);
