import http from 'http';
import fs from 'fs';
import express from 'express';

const port = 8080;

const renderHTML = (path,res) => {
    fs.readFile(path, (err,data) => {
        if(err) {
            res.writeHead(404);
            res.write('Error: file not found');
        }
        else{
            res.write(data);
        }
        res.end();
    })
}

const server = http.createServer((req,res) => {
    const url = req.url;
    console.log(url);
    switch(url){
        case '/kelola-user':
            renderHTML('../kelola-user.html',res);
            break;

        case '/halaman-review':
            renderHTML('../halaman-review.html',res);
            break;

        case '/unggah-topik':
            renderHTML('../unggah-topik.html',res);
            break;

        default:
            renderHTML('../login-page.html',res);
            break;
    }
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})