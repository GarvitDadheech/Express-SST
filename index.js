const express = require('express');
const app = express();

let courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.listen(3000, () => console.log('Listening on port 3000...'));