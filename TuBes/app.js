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
    password: '',
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
app.set('view engine','ejs');
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
//     return console.log(result[0].Nama);
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

const staticPath = path.resolve('public');
app.use(express.static(staticPath));    //serving static page dari public

app.use(express.urlencoded({ extended: true})); //?

app.get('/', (req,res) => {
    res.render('index.ejs');
});
app.get('/index.ejs', (req,res) => {
    res.render('index.ejs');
});
app.get('/home.ejs', (req,res) => {
    res.render('home.ejs');
});
app.get('/unggah.ejs', (req,res) => {
    res.render('unggah.ejs');
});
app.get('/kelola.ejs', (req,res) => {
    res.render('kelola.ejs');
});
app.get('/tinjauan.ejs', (req,res) => {
    res.render('tinjauan.ejs');
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
                res.redirect('/halaman-review');
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
    let nama = pool.query(`select * from user where email = ?`, [req.session.email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        return console.log(result[0].Nama+"");
    })
    console.log(nama);
    // console.log(JSON.stringify(nama));
    console.log(typeof nama);
    const inisial = 'D'
    res.render('home', { nama, inisial });
    // console.log("Berhasil render");
});

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

// app.get('/home', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.email + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});