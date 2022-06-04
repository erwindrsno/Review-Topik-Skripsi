import http, { request } from 'http';
import fs from 'fs';
import express, { response } from 'express';
import path from 'path';
import multer from 'multer';
import mysql from 'mysql';
import session from 'express-session';

const port = 8080;
const app = express();

const pool = mysql.createPool({
    user: 'root',
    password: 'erwin08',
    database: 'reviewts',
    host: 'localhost',
    connectionLimit:10
})

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());

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

// var sql = "INSERT INTO user (IdUser, Nama, Email, Password, IdRole) VALUES ?";
// var values = [
//     ['5','Angelina Jeany','6182001032@student.unpar.ac.id','abcd','3']
// ]
// pool.query(sql,[values], function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("records inserted: "+result.affectedRows);
// })

// var sql = "INSERT INTO user (IdUser, Nama, Email, Password, IdRole) VALUES ?";
// var values = [
//     ['8','Dummy','dummy@student.com','abcd1234','3']
// ]
// pool.query(sql,[values], function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("records inserted: "+result.affectedRows);
// })

//UNTUK AMBIL DATA ADMIN
// pool.query(`select * from user where IdRole = ?`, [1],(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result[0].nama);
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

// pool.query(`delete from user where Nama=?`,['Dummy'],(err, result, fields)=>{
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

// app.post('/signin', multerParser.none(), (req,res) => {
//     console.log(req.body.input_email);
// });

let student = false;
app.post('/signin', multerParser.none(), (req,res) => {
    console.log(req.body);
    let email = req.body.input_email;
    let password = req.body.input_pw;
    if(email&&password){
        pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email,password], function(error,results,fields){
            if(error) throw error;
            if(results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/home');
                // res.sendFile('/halaman-review.html');
            } else{
                res.send('email/password yang diinput salah!');
            }
            res.end();
        })
    } else{
        res.send('mohon input username dan password!');
        res.end();
    }
    let indexA = email.indexOf('@');
    let temp = email.charAt(indexA+1);
    if (temp == 's') student = true;
});

app.get('/halaman-review', (req,res) => {
    res.sendFile('/halaman-review.html');
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})