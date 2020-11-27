'use strict';

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const OPA_URL = 'http://opa:8181/v1/data/demo/opa';

app.post('/enroll_course', (req, res) => {
    const headers = { 'Content-type': 'application/json-patch+json' };
    axios
        .post(
            OPA_URL,
            {
                input: {
                    token: (req.headers['authorization'] || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYW5vbnltIn0._tK4KjlYUAwcyHp-8FL0bKU-B6TLBIKFhfrF9KJ7Aa8'),
                    path: '/enroll_course_endpoint',
                    course: req.body.course || '',
                },
            },
            { headers: headers }
        )
        .then(function (resp) {
            if (
                resp.status === 200 &&
                resp.data.result.course_is_full === true
            ) {
                res.status(403).send(
                    JSON.stringify({
                        info: 'Course capacity is full (blocked by OPA)',
                    })
                );
            } else if (resp.status === 200 && resp.data.result.allow === true) {
                try {
                    const fs = require('fs');
                    const fileName = '/share/data.json';
                    let json_data = JSON.parse(fs.readFileSync(fileName));
                    let st_courses = json_data['users'][req.body.user]['course'];
                    st_courses.push(req.body.course);
                    json_data['users'][req.body.user]['course'] = st_courses;
                    fs.writeFile(fileName, JSON.stringify(json_data), err => {
                        if (err) return console.log(err);
                    });
                    axios
                        .put('http://opa:8181/v1/data', json_data, {
                            headers: headers,
                        })
                        .catch(err => {
                            res.status(500).send(
                                JSON.stringify({
                                    info: 'Internal Server Error',
                                })
                            );
                        });
                    res.status(200).send(
                        JSON.stringify({
                            info: 'Course was enrolled',
                        })
                    );
                } catch (err) {
                    res.status(500).send(
                        JSON.stringify({
                            info: 'Internal Server Error',
                        })
                    );
                }
            } else {
                res.status(403).send(
                    JSON.stringify({
                        info: 'Conflict in timetable (blocked by OPA)',
                    })
                );
            }
        })
        .catch(err => {
            res.status(500).send(
                JSON.stringify({
                    info: 'Internal Server Error',
                })
            );
        });
});

app.listen(port, () =>
    console.log('Enroll service listening on port ${port}!')
);
