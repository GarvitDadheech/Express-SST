const express = require('express');
const app = express();

app.use(express.json());

let courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.json(course);
});

app.post('/courses', (req, res) => {
   
    const courseName = req.body.name;
    const course = {
        id: courses.length + 1,
        name: courseName
    };
    courses.push(course);
    res.send(course);
});

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    course.name = req.body.name;
    res.json(course);
});

app.listen(3000, () => console.log('Listening on port 3000...'));