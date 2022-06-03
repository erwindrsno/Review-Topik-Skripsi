import http from 'http';
import fs from 'fs';
import express from 'express';
import path from 'path';
import multer from 'multer';

const port = 8080;
const app = express();

const multerParser = multer();

app.set('view engine','ejs');

const staticPath = path.resolve('public');
app.use(express.static(staticPath));    //serving static page dari public

app.use(express.urlencoded({ extended: true})); //?

app.get('/', (req,res) => {
    res.sendFile('/index.html');
});

app.post('/signin', multerParser.none(), (req,res) => {
    console.log(req.body);
});

app.get('/halaman-review', (req,res) => {
    res.sendFile('/halaman-review.html');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})