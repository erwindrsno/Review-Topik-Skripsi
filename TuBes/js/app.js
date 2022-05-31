import http from 'http';
import fs from 'fs';

const port = 8080;

const server = http.createServer((req,res) => {
    const url = req.url;
    console.log(url);
    
    fs.readFile('../Login Page.html', (err,data) => {
        if(err){
            res.writeHead(404);
            res.write('Error: file not found');
        }
        else{
            res.write(data);
        }
        res.end();
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})