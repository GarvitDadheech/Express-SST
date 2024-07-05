const express = require('express');
const app = express();

app.use(express.json());
app.use(loggerMiddleware);
const errorMiddleware = require('./errorMiddleware');

const coursesFilePath = './courses.json';
const fs = require('fs');
let courses = JSON.parse(fs.readFileSync(coursesFilePath, 'utf8'));


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
    saveCoursesToFile();
    res.send(course);
});

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    course.name = req.body.name;
    saveCoursesToFile();
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    saveCoursesToFile();
    res.json(course);
});

function loggerMiddleware(req,res,next){
    console.log("Logging...");
    console.log("Method: "+req.method);
    console.log("IP: "+req.ip);
    console.log("HostName: "+req.hostname);
    console.log( "Date: "+new Date().toISOString().split('T')[0]);
    next();
}

function saveCoursesToFile() {
    console.log(courses);
    fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), (err) => {
        if (err) throw err;
        console.log('Courses saved to file');
    });
}

app.use(errorMiddleware);

app.listen(3000, () => console.log('Listening on port 3000...'));