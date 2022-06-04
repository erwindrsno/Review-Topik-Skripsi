import http from 'http';
import fs from 'fs';
import express from 'express';
import path from 'path';
import multer from 'multer';
import mysql from 'mysql';

const port = 8080;
const app = express();

const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'reviewts',
    host: 'localhost',
    connectionLimit:10
})

// pool.query(`select * from role`,(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

// pool.query(`select * from user`,(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

var sql = "INSERT INTO user (IdUser, Nama, Email, Password, IdRole) VALUES ?";
var values = [
    ['5','Angelina Jeany','6182001032@student.unpar.ac.id','abcd','3']
]
pool.query(sql,[values], function(err,result){
    if(err){
        return console.log(err);
    }
    console.log("records inserted: "+result.affectedRows);
})

//UNTUK AMBIL DATA ADMIN
// pool.query(`select * from user where IdRole = ?`, [1],(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

//UNTUK AMBIL DATA DOSEN
// pool.query(`select * from user where IdRole = ?`, [2],(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

// UNTUK AMBIL DATA MAHASISWA
// pool.query(`select * from user where IdRole = ?`, [1],(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

const multerParser = multer();

app.set('view engine','ejs');

const staticPath = path.resolve('public');
app.use(express.static(staticPath));    //serving static page dari public

app.use(express.urlencoded({ extended: true})); //?

app.get('/', (req,res) => {
    res.sendFile('/index.html');
});

app.post('/signin', multerParser.none(), (req,res) => {
    console.log(req.body.input_email);
});

app.get('/halaman-review', (req,res) => {
    res.sendFile('/halaman-review.html');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})