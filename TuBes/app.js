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


app.get('/', (req,res) => {
    // res.send('Hello world!');
    res.sendFile('/index.html');
});

app.post('/signup', multerParser.none(), (req,res) => {
    console.log(req.body)
})

app.get('/halaman-review', (req,res) => {
    res.sendFile('/halaman-review.html');
})

app.use('/', (req,res) => {
    res.send('Halaman tidak tersedia!');
    res.statusCode(404);
});

// const renderHTML = (path,res) => {
//     fs.readFile(path, (err,data) => {
//         if(err) {
//             res.writeHead(404);
//             res.write('Error: file not found');
//         }
//         else{
//             res.write(data);
//         }
//         res.end();
//     })
// }

// const server = http.createServer((req,res) => {
//     const url = req.url;
//     console.log(url);
//     switch(url){
//         case '/kelola-user':
//             renderHTML('./kelola-user.html',res);
//             break;

//         case '/halaman-review':
//             renderHTML('./halaman-review.html',res);
//             break;

//         case '/unggah-topik':
//             renderHTML('./unggah-topik.html',res);
//             break;

//         default:
//             renderHTML('./login-page.html',res);
//             break;
//     }
// })

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})