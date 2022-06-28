import http, { request } from 'http';
import fs from 'fs';
import express, { response } from 'express';
import path from 'path';
import multer from 'multer';
import mysql from 'mysql';
import session from 'express-session';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const port = 8080;
const app = express();

const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'review',
    host: 'localhost',
    connectionLimit:10
});

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

//  UNTUK HAPUS RECORD
// pool.query(`delete from user where Nama!=?`,['Mariskha'],(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

//  UNTUK MEMBUAT TABLE TOPIK SKRIPSI
// let tableTS = "CREATE TABLE TopikSkripsi (judul VARCHAR(50), namaDosen VARCHAR(20), kodeTopik CHAR(10), bidangPeminatan VARCHAR(20), jenisSkripsi VARCHAR(10))";
// pool.query(tableTS, function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("table topik skripsi create");
// })

// let tableTS = "CREATE TABLE topikskripsi (judul VARCHAR(50), namaDosen VARCHAR(20), kodeTopik CHAR(10), bidangPeminatan CHAR(2), jenisSkripsi VARCHAR(10))";
// pool.query(tableTS, function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("table topik skripsi create");
// })

//  UNTUK MEMBUAT TABLE REVIEW
// let tableReview = "CREATE TABLE Review (idReview int not null,komentar VARCHAR(50),pertanyaan VARCHAR(50))";
// pool.query(tableReview, function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("table review create");
// })

//  INSERT KE TABLE REVIEW
// var sql = "INSERT INTO Review (IdReview, komentar, pertanyaan) VALUES ?";
// var values = [
//     ['1','abc','apa?']
// ]
// pool.query(sql,[values], function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("records inserted: "+result.affectedRows);
// })

// var sql = "INSERT INTO Review (IdReview, komentar, pertanyaan) VALUES ?";
// var values = [
//     ['2','abcd','kenapa?']
// ]
// pool.query(sql,[values], function(err,result){
//     if(err){
//         return console.log(err);
//     }
//     console.log("records inserted: "+result.affectedRows);
// })

// pool.query(`drop table TopikSkripsi`,(err, result, fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

const multerParser = multer();
const upload = multer({dest: 'public/files'});

let email = "";
let password = "";
let id = "";
let arrTopik = [];
let arrUser = [];
let idRole;
let tahunA="";
let semesterInput="";
let idPeriode="";
let namaUser = "";
let inisialUser = "";

function generateInisialUserLengkap(){
    let inisialUserLengkap ="";
    for(let i = 0; i < namaUser.length; i++){
        if(i == 0){
            inisialUserLengkap += namaUser[0];
        }
        else if(namaUser[i] == " "){
            inisialUserLengkap += namaUser[i+1];
        }
    }
    while(inisialUserLengkap.length < 3){
        inisialUserLengkap += inisialUserLengkap[inisialUserLengkap.length-1];
    }
    return inisialUserLengkap;
}

const staticPath = path.resolve('public');
app.use(express.static(staticPath));    //serving static page dari public

app.use(express.urlencoded({ extended: true})); //?

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/index', (req,res) => {
    res.render('index.ejs');
});

app.post('/signin', (req,res) => {
    email = req.body.email;
    password = req.body.password;
    let valid = false;
    let hasil = 'tesfetchaja'
    // console.log(req.body);
    // pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
    // if(err){
    //     return console.log(err);
    // }
    //     id = result[0].idUser;
    //     idRole = result[0].idRole;
    // })
    if(email&&password){
        pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email,password], function(error,results,fields){
            if(error) throw error;
            if(results.length > 0) {    //kalau benar
                req.session.loggedin = true;
                req.session.email = email;
                id = results[0].idUser;
                idRole = results[0].idRole;
                if(results[0].idRole === 1) {
                    req.session.loggedin = true;
                    req.session.email = email;
                    res.send({status: 'success', idUser: id, url:'/home'})
                    // res.redirect('/home');
                    // res.json({
                    //     status: 'success',
                    //     idUser: id,
                    //     url: '/home'
                    // });
                }else if(results[0].idRole === 2) {
                    req.session.loggedin = true;
                    req.session.email = email;
                    res.send({status: 'success', idUser: id, url:'/homeDsn'})
                    // res.json({
                    //     status: 'success',
                    //     idUser: id,
                    //     url: '/homeDsn'
                    // });
                    // res.redirect('/homeDsn');
                }else{
                    req.session.loggedin = true;
                    req.session.email = email;
                    res.send({status: 'success', idUser: id, url:'/homeMhs'})
                    // res.json({
                    //     status: 'success',
                    //     idUser: id,
                    //     url: '/homeMhs'
                    // });
                    // res.redirect('/homeMhs');
                }
            }else{
                res.json({
                    status: 'failed',
                    hasil:'tesfetchaja'
                });
            }
            // res.end();
        })
    } else{
        res.json({
            status: 'failed',
            hasil:'tesfetchaja'
        });
        // res.send(200,valid);
        // res.end();
    }
});

app.get('/home', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        namaUser = result[0].nama;
        pool.query(`select `)
        inisialUser = namaUser.charAt(0);
        pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where statusFinal!='close'`,(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('home',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput });
        });
    })
});

app.get('/homeMhs', (req,res) => {
    let namaUser = "";
    let inisialUser = "";
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        namaUser = result[0].nama;
        pool.query(`select `)
        inisialUser = namaUser.charAt(0);
        pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where statusFinal =?`,["open"],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('homeMhs',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput });
        });
    })
});

app.get('/homeDsn', (req,res) => {
    let namaUser = "";
    let inisialUser = "";
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        namaUser = result[0].nama;
        inisialUser = namaUser.charAt(0);
        pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where statusFinal!='close'`,(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('homeDsn',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput});
        });
    })
});

app.get('/daftarTopik', (req,res) => {
    let namaUser = "";
    let inisialUser = "";
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        namaUser = result[0].nama;
        pool.query(`select `)
        inisialUser = namaUser.charAt(0);
        pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where statusFinal =?`,["open"],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('daftarTopik',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput });
        });
    })
});

app.get('/daftarTopikDsn', (req,res) => {
    let namaUser = "";
    let inisialUser = "";
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        namaUser = result[0].nama;
        let idUs = result[0].idUser;
        pool.query(`select `)
        inisialUser = namaUser.charAt(0);
        pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where (statusFinal =? OR statusFinal =? OR statusFinal =?) AND idDosen=?`,["open", "close", "taken", idUs],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('daftarTopikDsn',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput });
        });
    })
});

app.get('/unggah', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        res.render('unggah',{ nama: namaUser, inisial: inisialUser , email })
    })
});

app.get('/unggahDsn', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        res.render('unggahDsn',{ nama: namaUser, inisial: inisialUser , email})
    })
});

app.get('/kelola', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        pool.query(`select * from user`,(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            console.log(result);
            res.render('kelola',{ nama: namaUser, inisial: inisialUser , result , email});
        })
    })
});

app.get('/tinjauan', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        pool.query(`select * from review join topikSkripsi on review.idTopik = topikSkripsi.kodeTopik join user on user.idUser = topikSkripsi.idDosen where user.email = ?`, [email], (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('tinjauan',{ nama: namaUser, inisial: inisialUser , email , result});
        })
    })
});

app.get('/tinjauanDsn', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        pool.query(`select * from review join topikSkripsi on review.idTopik = topikSkripsi.kodeTopik join user on user.idUser = topikSkripsi.idDosen where user.email = ?`, [email], (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('tinjauanDsn',{ nama: namaUser, inisial: inisialUser , email , result});
        })
    })
});

app.get('/jawaban', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        pool.query(`select * from review join topikSkripsi on review.idTopik = topikSkripsi.kodeTopik join user on user.idUser = topikSkripsi.idDosen where user.email = ?`, [email], (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('jawaban',{ nama: namaUser, inisial: inisialUser , email , result});
        })
    })
});
app.get('/jawabanDsn', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        pool.query(`select * from review join topikSkripsi on review.idTopik = topikSkripsi.kodeTopik join user on user.idUser = topikSkripsi.idDosen where user.email = ?`, [email], (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.render('jawabanDsn',{ nama: namaUser, inisial: inisialUser , email , result});
        })
    })
});

app.post('/addUser', multerParser.none(), (req,res) => {
    let idRole = 1;
    let namaUser = req.body.nama;
    let role = req.body.idRole;
    let id = req.body.idUser;
    let email = req.body.email;
    let password = req.body.password;
    if(role === 'dosen'){
        idRole = 2;
    }
    else if(role === 'mahasiswa'){
        idRole = 3;
    }
    // bcrypt.hash(password,10, function(err, hash) {
        let cek = pool.query("select idRole from user where id = ?",[id]);
        let sql = "INSERT INTO user (idUser, nama, email, password, idRole) VALUES ?";
        let values = [
            [id,namaUser,email,password,idRole]
        ]
        if(cek>0){
            myFunction();
            res.redirect('kelola');
        }else{
            pool.query(sql,[values]);
            res.redirect('kelola');
        
        }
    // })
})

let setIdTopik = insertToSetIdTopik();

function insertToSetIdTopik(){
    pool.query(`select kodeTopik from topikSkripsi`,(err, result, fields)=>{
    if(err){
        return console.log(err);
    }
        setIdTopik = new Set([result]);
    })
}

function checkDuplicateAndGenerateIdTopik(){
    let id = Math.floor(100000 + Math.random() * 900000);
    if(!setIdTopik.has(id)){
        setIdTopik.add(id);
        return id;
    }
    else{
        checkDuplicateAndGenerateIdTopik();
    }
}

app.post('/addTopik', upload.single('skripsi'), (req,res) => {
    let judulTopik = req.body.JudulTopik;
    let bidangPeminatan = req.body.BidangPeminatan;
    let inisialUserKodeTopik = generateInisialUserLengkap();
    let kodeTopik = inisialUserKodeTopik+checkDuplicateAndGenerateIdTopik();
    let jenisSkripsi = req.body.JenisSkripsi;
    let pathFile = req.file.path;
    pool.query(`select idUser from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let sql = "INSERT INTO topikSkripsi (judul, idDosen, kodeTopik, bidangPeminatan, jenisSkripsi, statusFinal, path) VALUES ?";
        let values = [
            [judulTopik,result[0].idUser,kodeTopik,bidangPeminatan,jenisSkripsi,"null",pathFile]
        ]
        pool.query(sql,[values]);
    })
    res.redirect('/home');
})

app.post('/addTopikDsn', upload.single('skripsi'), (req,res) => {
    let judulTopik = req.body.JudulTopik;
    let bidangPeminatan = req.body.BidangPeminatan;
    let inisialUserKodeTopik = generateInisialUserLengkap();
    let kodeTopik = inisialUserKodeTopik+checkDuplicateAndGenerateIdTopik();
    let jenisSkripsi = req.body.JenisSkripsi;
    let pathFile = req.file.path;
    pool.query(`select idUser from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let sql = "INSERT INTO topikSkripsi (judul, idDosen, kodeTopik, bidangPeminatan, jenisSkripsi, statusFinal, path) VALUES ?";
        let values = [
            [judulTopik,result[0].idUser,kodeTopik,bidangPeminatan,jenisSkripsi,"null", pathFile]
        ]
        pool.query(sql,[values]);
    })
    res.redirect('/homeDsn');
})

//filter halaman admin
app.post('/filterBP', multerParser.none(), (req,res) => { //belum bisa
    let namaUser = "";
    let inisialUser = "";
    let bidangPeminatan1 = req.body.FilterBP;
    if(bidangPeminatan1==="All"){
        res.redirect('/home');
    }else{
        pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            namaUser = result[0].nama;
            inisialUser = namaUser.charAt(0);
            pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where bidangPeminatan =?`,[bidangPeminatan1],(err, result, fields)=>{
                if(err){
                    return console.log(err);
                }
                res.render('home',{ nama: namaUser, inisial: inisialUser, result, email });
            });
        });   
    };
})

app.post('/periode', multerParser.none(), (req,res) => {
    
    let namaUser = "";
    let inisialUser = "";
    
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        namaUser = result[0].nama;
        inisialUser = namaUser.charAt(0);
        tahunA = req.body.TahunAjar;
        console.log(tahunA);
        semesterInput = req.body.Semester;
        if(semesterInput=="Ganjil"){
            idPeriode = tahunA + "-1";
        }else{
            idPeriode = tahunA + "-2";
        }
        let sql = "INSERT INTO periode (idPeriode, semester, tahunAjar) VALUES ?";
        let values = [
            [idPeriode,semesterInput,tahunA]
        ]
        pool.query(sql,[values]);
        console.log(tahunA);
        res.render('home', { nama: namaUser, inisial: inisialUser, result, email,tahunA:tahunA,semesterInput:semesterInput});
    })
})

app.post('/filterBPd', multerParser.none(), (req,res) => {
    let namaUser = "";
    let inisialUser = "";
    let bidangPeminatan1 = req.body.FilterBP;
    if(bidangPeminatan1==="All"){
        res.redirect('/homeDsn');
    }else{
        pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            namaUser = result[0].nama;
            inisialUser = namaUser.charAt(0);
            pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where bidangPeminatan =?`,[bidangPeminatan1],(err, result, fields)=>{
                if(err){
                    return console.log(err);
                }
                res.render('homeDsn',{ nama: namaUser, inisial: inisialUser, result, email });
            });
        });   
    };
})

//filter halaman mahasiswa
app.post('/filterBPm', multerParser.none(), (req,res) => {
    let namaUser = "";
    let inisialUser = "";
    let bidangPeminatan1 = req.body.FilterBP;
    if(bidangPeminatan1==="All"){
        res.redirect('/homeMhs');
    }else{
        pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            namaUser = result[0].nama;
            inisialUser = namaUser.charAt(0);
            pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where bidangPeminatan =? AND statusFinal =?`,[bidangPeminatan1,"open"],(err, result, fields)=>{
                if(err){
                    return console.log(err);
                }
                res.render('homeMhs',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput });
            });
        });   
    };
})

app.post('/deleteTopik', multerParser.none(), (req,res) => {
    const kodeTopik = req.body.deleteKT;
    setIdTopik.delete(kodeTopik);
    pool.query(`delete from topikSkripsi where kodeTopik = ?`, [kodeTopik],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        return console.log(result);
    })
    res.redirect('/home');
})

app.post('/deleteTopikd', multerParser.none(), (req,res) => {
    const kodeTopik = req.body.deleteKT;
    setIdTopik.delete(kodeTopik);
    pool.query(`delete from topikSkripsi where kodeTopik = ?`, [kodeTopik],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        return console.log(result);
    })
    res.redirect('/homeDsn');
})

app.post('/deleteUser', multerParser.none(), (req,res) => {
    const idUser = req.body.deleteU;
    pool.query(`delete from user where idUser = ?`, [idUser],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        return console.log(result);
    })
    res.redirect('/kelola');
})

let setIdReview = insertToSetIdReview();

function insertToSetIdReview(){
    pool.query(`select idReview from review`,(err, result, fields)=>{
    if(err){
        return console.log(err);
    }
        setIdReview = new Set([result]);
        return setIdReview;
    })
}

function checkDuplicateAndGenerateIdReview(){
    let id = Math.floor(100000 + Math.random() * 900000);
    if(!setIdReview.has(id)){
        setIdReview.add(id);
        return id;
    }
    else{
        checkDuplicateAndGenerateIdReview();
    }
}

app.post('/review', multerParser.none(), (req,res) => {
    console.log(req.body);
    const kodeTopikReview = req.body.kodeTopik;
    const statusReview = req.body.radio;
    const komentar = req.body.komentar;
    const pertanyaan = req.body.pertanyaan;
    const jawaban = null;
    const idReview = checkDuplicateAndGenerateIdReview();
    if(statusReview == "inq"){
        let sql = "INSERT INTO review (idReviewer, idTopik, idReview, komentar, pertanyaan, jawaban, status) VALUES ?";
        let values = [
            [id,kodeTopikReview,idReview,komentar,pertanyaan,jawaban,statusReview]
        ]
        pool.query(sql,[values], function(err,result){
            if(err){
                return console.log(err);
            }
            console.log("records inserted: "+result.affectedRows);
        })
    }
    else if(statusReview == "no"){
        let sql = "INSERT INTO review (idReviewer, idTopik, idReview, komentar, pertanyaan, jawaban, status) VALUES ?";
        let values = [
            [id,kodeTopikReview,idReview,komentar,pertanyaan,jawaban,statusReview]
        ]
        pool.query(sql,[values], function(err,result){
            if(err){
                return console.log(err);
            }
            console.log("records inserted: "+result.affectedRows);
        })
    }
    else{
        let sql = "INSERT INTO review (idReviewer, idTopik, idReview, komentar, pertanyaan, jawaban, status) VALUES ?";
        let values = [
            [id,kodeTopikReview,idReview,komentar,pertanyaan,jawaban,statusReview]
        ]
        pool.query(sql,[values], function(err,result){
            if(err){
                return console.log(err);
            }
            console.log("records inserted: "+result.affectedRows);
        })
    }
    if(idRole == 1){
        res.redirect('home');
    }
    else if(idRole == 2){
        res.redirect('homeDsn');
    }
    else{
        res.redirect('homeMhs');
    }
})

app.post('/ubahStatus', multerParser.none(), (req,res) => {
    let statusFinal = req.body.ubahStatus;
    let kodeTopikUbah = req.body.namaKT;
    let idMahasiswa = req.body.idMhsT;
    let valid = true;
    let content;
    pool.query(`select count(status) as 'hitung' from review where idTopik = ? and status not like 'ok'`, [kodeTopikUbah],(err, result, fields)=>{
    if(err){
        return console.log(err);
    }
        console.log(result);
        console.log(result.length);
        if(result.hitung > 0){
            res.redirect('/gagalUbah');
        }
        else{
            pool.query(`update topikSkripsi set statusFinal = ?, idMahasiswa =? where kodeTopik = ?`,[statusFinal, idMahasiswa, kodeTopikUbah], (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
                res.redirect('/home');
            })
        }
    })
})

app.post('/ubahStatusd', multerParser.none(), (req,res) => {
    let statusFinal = req.body.ubahStatus;
    let kodeTopikUbah = req.body.namaKT;
    let idMahasiswa = req.body.idMhsT;
    let valid = true;
    let content;
    pool.query(`select count(status) as 'hitung' from review where idTopik = ? and status not like 'ok'`, [kodeTopikUbah],(err, result, fields)=>{
    if(err){
        return console.log(err);
    }
        console.log(result);
        console.log(result.length);
        if(result.hitung > 0){
            res.redirect('/gagalUbah');
        }
        else{
            pool.query(`update topikSkripsi set statusFinal = ?, idMahasiswa =? where kodeTopik = ?`,[statusFinal, idMahasiswa, kodeTopikUbah], (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
                res.redirect('/homeDsn');
            })
        }
    })
})

app.get('/gagalUbah', (req,res) => {
    res.send('Status tidak dapat diubah menjadi open!');
})

app.post('/editUser', multerParser.none(), (req,res) => {
    let idUserE = req.body.idUserE;
    let roleE = req.body.roleE;
    let namaE = req.body.namaE;
    let emailE = req.body.emailE;
    let passwordE = req.body.passwordE;
    let idRoleE = 1;
    if(roleE === 'dosen'){
        idRoleE = 2;
    }
    else if(roleE === 'mahasiswa'){
        idRoleE = 3;
    }
    pool.query(`update user set nama = ?, idRole = ?, email = ?, password = ? where idUser = ?`,[namaE, idRoleE, emailE, passwordE, idUserE], (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
            
    })
    res.redirect('/kelola');
})

app.get('/report', (req,res) => {
    pool.query(`select * from user where email = ?`, [email],(err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        let namaUser = result[0].nama;
        let inisialUser = namaUser.charAt(0);
        pool.query(`select * from topikSkripsi join user on topikSkripsi.idDosen = user.idUser where statusFinal =?`,["close"],(err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            console.log(result[0]);
            res.render('report',{ nama: namaUser, inisial: inisialUser, result, email, tahunA, semesterInput });
        });
    })
})

app.get('/logout', (req,res,next) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
    // req.logout();
    // req.session = null;
    // res.redirect('/');
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