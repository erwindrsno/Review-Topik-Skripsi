// class Login{
//     constructor(username,password,remember){
//         this.username=username;
//         this.password=password;
//     }

//     toString(){
//         return '{"username":"'+this.username+'","password":"'+this.password+"}";
//     }
// }

// const password = document.getElementById('input_pw');
// password.addEventListener('keyup', (event) => {
//     let event1 = event.currentTarget;
//     if(event1.value.length < 4 && event1.value.length > 0){
//         event1.style.backgroundColor="red";
//     }
//     else{
//         event1.style.backgroundColor="white";
//     }
// });

function realTimeClock(){
    let rtClock = new Date();
    let hours = rtClock.getHours();
    let minutes = rtClock.getMinutes();
    let seconds = rtClock.getSeconds();
    let days = rtClock.getDay();

    let amPm = (hours < 12) ? "AM" : "PM";

    hours = (hours > 12) ? hours - 12 : hours;

    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    switch(days){
        case 0:
            days="Minggu"
            break;
        case 1:
            days="Senin"
            break;
        case 2:
            days="Selasa"
            break;
        case 3:
            days="Rabu"
            break;
        case 4:
            days="Kamis"
            break;
        case 5:
            days="Jumat"
            break;
        case 6:
            days="Sabtu"
            break;
    }
    document.getElementById('real_day').innerHTML = days+",";
    document.getElementById('real_time').innerHTML = hours + ":" + minutes + ":" + seconds +" " + amPm;
    let t = setInterval(realTimeClock,500);
}

// document.getElementById('btnS').addEventListener('onclick',checkValues);
// function checkValues(){
//     const val = document.getElementById('input_email').value;
//     if (val.includes('student')){
//         document.location = 'student.html';
//     } else if (val.includes('lecture')){
//         document.location = 'HalamanReview.html';
//     }
// }

// function addDate(){
//     const date = new Date();
//     document.getElementById('date').innerHTML = date;
// }
// function addDeadline(){
//     const d = document.getElementById('numD').value;
//     const m = document.getElementById('numM').value;
//     const y = document.getElementById('numY').value;
//     document.getElementById('deadline').innerHTML = d + '-' + m + '-' + y;
// }

// function myFunction() {
//     const input = document.getElementById("myInput");
//     const filter = input.value.toUpperCase();
// }

// function kelolaUser(){
//     const addUser = document.getElementsByClassName('addUserBtn');
//     let insertUser = "INSERT INTO user (IdUser, Nama, Email, Password, IdRole) VALUES ?";
//     let values = [
//         ['5','Angelina Jeany','6182001032@student.unpar.ac.id','abcd','3']
//     ]
//     pool.query(sql,[values], function(err,result){
//         if(err){
//             return console.log(err);
//         }
//         console.log("records inserted: "+result.affectedRows);
//     })
//     addUser.addEventListener('onclick', insertUser);
// }
// function validate(){
//     const lowCase = /[a-z]/g;
//     const upCase = /[A-Z]/g;
//     const number = /[0-9]/g;
//     const input = document.getElementById('input_pw').value;
//     let inputVal = document.getElementById('input_pw');
//     if (input.length >= 4){
//         if(!input.match(lowCase) || !input.match(upCase) || !input.match(number) || input.length < 4) {
//             alert('Wrong password');
//             return false;
//         } else{
//             checkValues();
//         }
//     }
// }

// function addNamaUser(){
//     const email = document.getElementById("email").value;
//     document.getElementById('namaUser').innerHTML = email;
// }

// (function(){
//     const h1 = document.getElementById("button");
// 	h1.addEventListener('mouseover', function(){
// 		h1.style.color = 'black';
// 	});
// 	h1.addEventListener('mouseout', function(){
// 		h1.style.color = 'white';
// 	});
// })();

function on1() {
	document.getElementById("overlay").style.display = "block";
}

function off1() {
	document.getElementById("overlay").style.display = "none";
}

function on2() {
	document.getElementById("overlay2").style.display = "block";
}

function off2() {
	document.getElementById("overlay2").style.display = "none";
}

// function onUT() {
// 	document.getElementById("overlayUT").style.display = "block";
// }

// function offUT() {
// 	document.getElementById("overlayUT").style.display = "none";
// }
function opn(){
    document.getElementById("ovy").style.display = "block";
}
function opn1(){
    document.getElementById("ovy1").style.display = "block";
}
// function opn2(){
//     document.getElementById("ovy2").style.display = "block";
// }
function opn3(){
    document.getElementById("overlayUS").style.display = "block";
}
function opn4(){
    document.getElementById("overlayUSd").style.display = "block";
}
function ops(){
    document.getElementById("ovr").style.display = "block";
}
function onEdit() {
	document.getElementById("overlay3").style.display = "block";
}

// function offEdit() {
// 	document.getElementById("overlay3").style.display = "none";
// }
// function sms(){
//     let yr = document.getElementById("taun").value;
//     let semester = document.getElementById("smes").value;
//     document.getElementById("xt").innerHTML = yr;
//     document.getElementById("xs").innerHTML = " "+semester;
//     document.getElementById("ovr").style.display = "none";
// }
function dt(){
    let dt = document.getElementById("iconDate").value;
    document.getElementById("date").innerHTML = dt;
}
// function dropdown() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }
// function ret(){
//     let x = document.getElementById("op").value;
//     document.getElementById("sf").innerHTML = x;
// }
function offset() {
	document.getElementById("kk").style.display = "block";
    document.getElementById("kmn").style.display = "none";
    document.getElementById("prt").style.display = "none";
}
// function del(){
//     let jt = prompt("Masukan judul topik yang ingin dihapus");
// }
function option(){
    document.getElementById("prt").removeAttribute("hidden");
    document.getElementById("kk").style.display = "none";
    document.getElementById("prt").style.display = "block";
    // document.getElementById("kmn").style.visibility = "hidden";
    document.getElementById("kmn").style.display = "none";
}
function option1(){
    document.getElementById("kmn").removeAttribute("hidden");
    document.getElementById("kk").style.display = "none";
    document.getElementById("kmn").style.display = "block";
    // document.getElementById("prt").style.visibility = "hidden";
    document.getElementById("prt").style.display = "none";
}
// function show(){
//     const elem = document.getElementsByClassName("txt");
//     let x = document.getElementsByClassName("opt");
//     let y = document.getElementsByClassName("ed");
//     let z = document.getElementsByClassName("rmv");
//     if (x[0].style.display === "none") {
//         for (let i=0; i<elem.length; i++){
//             x = elem[i].getElementsByClassName("opt");
//             y = elem[i].getElementsByClassName("ed");
//             z = elem[i].getElementsByClassName("rmv");
//             for (let j=0; j<x.length; j++){
//                 x[j].style.display = "inline";
//                 y[j].style.display = "none";
//                 z[j].style.display = "inline";
//             }
//         }
//     } else{
//         for (let i=0; i<elem.length; i++){
//             x = elem[i].getElementsByClassName("opt");
//             y = elem[i].getElementsByClassName("ed");
//             z = elem[i].getElementsByClassName("rmv");
//             for (let j=0; j<x.length; j++){
//                 x[j].style.display = "none";
//                 y[j].style.display = "inline";
//                 z[j].style.display = "none";
//             }
//         }
//     }
// }

// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//             openDropdown.classList.remove('show');
//             }
//         }
//     }
// }



const formLogIn = document.getElementById("login_form");
if(formLogIn != null || formLogIn != undefined){
    formLogIn.addEventListener("submit", onSubmitLogIn);
}

function onSubmitLogIn(event){
    event.preventDefault();
    let formElements = event.currentTarget.elements;
    let arr = [];
    for (let i = 0; i < event.currentTarget.length-1; i++) {
        arr[i] = formElements[i].value;
    }
    const obj = {email : arr[0], password : arr[1]};
    let input = encodeURL(obj);
    //console.log(obj);
    // const email = document.getElementById("input_email");
    // const password = document.getElementById("input_pw");
    // console.log(email);
    // console.log(password);

    const init = {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: input
    };

    fetch('signin',init)
    .then(res => {
        console.log(res.status);
        return res.text();
    })
    .then(result => {
        let resultJSON = JSON.parse(result)
        if(resultJSON.status == 'failed'){
            console.log('ggal');
            document.getElementById('warning').style.visibility = 'visible';
        }
        else if(resultJSON.status = 'success'){
            console.log('sukses');
            console.log(resultJSON.url);
            window.location.replace(resultJSON.url);
        }
    })
}

function encodeURL(data){
    const ret = [];
    for (let d in data){
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
}

const formUT = document.getElementById("form_UT");
if(formUT != null || formUT != undefined){
    formUT.addEventListener("submit", onSubmitUT);
}

// function onSubmitUT(event){
//     event.preventDefault();
//     let formElements = event.currentTarget.elements;
//     console.log(formElements);
//     let arr = [];
//     for (let i = 0; i < event.currentTarget.length-1; i++) {
//         arr[i] = formElements[i].value;
//     }
//     console.log(arr);
//     // const obj = {email : arr[0], password : arr[1]};
//     // let input = encodeURL(obj);
//     //console.log(obj);
//     // const email = document.getElementById("input_email");
//     // const password = document.getElementById("input_pw");
//     // console.log(email);
//     // console.log(password);

//     // const init = {
//     //     method: 'post',
//     //     headers: {
//     //         "Content-Type": "application/x-www-form-urlencoded"
//     //     },
//     //     body: input
//     // };

//     // fetch('signin',init)
//     // .then(res => {
//     //     console.log(res.status);
//     //     return res.text();
//     // })
//     // .then(result => {
//     //     let resultJSON = JSON.parse(result)
//     //     if(resultJSON.status == 'failed'){
//     //         console.log('ggal');
//     //         document.getElementById('warning').style.visibility = 'visible';
//     //     }
//     //     else if(resultJSON.status = 'success'){
//     //         console.log('sukses');
//     //         console.log(resultJSON.url);
//     //         window.location.replace(resultJSON.url);
//     //     }
//     // })
// }




// fetch('signin')
function printToPDF() {
    console.log('converting...');
  
    var printableArea = document.getElementById('pdf');
  
    html2canvas(printableArea, {
      useCORS: true,
      onrendered: function(canvas) {
  
        var pdf = new jsPDF('p', 'pt', 'letter');
  
        var pageHeight = 980;
        var pageWidth = 2500;

        for (var i = 0; i <= printableArea.clientHeight / pageHeight; i++) {
          var srcImg = canvas;
          var sX = 0;
          var sY = pageHeight * i; 
          var sWidth = pageWidth;
          var sHeight = pageHeight;
          var dX = 0;
          var dY = 0;
          var dWidth = pageWidth;
          var dHeight = pageHeight;
  
          window.onePageCanvas = document.createElement("canvas");
          onePageCanvas.setAttribute('width', pageWidth);
          onePageCanvas.setAttribute('height', pageHeight);
          var ctx = onePageCanvas.getContext('2d');
          ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
  
          var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
          var width = onePageCanvas.width;
          var height = onePageCanvas.clientHeight;
  
          if (i > 0) 
            pdf.addPage(612, 791);
  
          pdf.setPage(i + 1); 
          pdf.addImage(canvasDataURL, 'PNG', 28, 40, (width * .65), (height * .62));

        }
        pdf.save('DaftarTopik.pdf');
    }
    });
}
function Pager(tableName, itemsPerPage) {
    'use strict';

    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;

    this.showRecords = function (from, to) {
        let rows = document.getElementById(tableName).rows;

        // i starts from 1 to skip table header row
        for (let i = 1; i < rows.length; i++) {
            if (i < from || i > to) {
                rows[i].style.display = 'none';
            } else {
                rows[i].style.display = '';
            }
        }
    };

    this.showPage = function (pageNumber) {
        if (!this.inited) {
            // Not initialized
            return;
        }

        let oldPageAnchor = document.getElementById('pg' + this.currentPage);
        oldPageAnchor.className = 'pg-normal';

        this.currentPage = pageNumber;
        let newPageAnchor = document.getElementById('pg' + this.currentPage);
        newPageAnchor.className = 'pg-selected';

        let from = (pageNumber - 1) * itemsPerPage + 1;
        let to = from + itemsPerPage - 1;
        this.showRecords(from, to);

        let pgNext = document.querySelector('.pg-next'),
            pgPrev = document.querySelector('.pg-prev');

        if (this.currentPage == this.pages) {
            pgNext.style.display = 'none';
        } else {
            pgNext.style.display = '';
        }

        if (this.currentPage === 1) {
            pgPrev.style.display = 'none';
        } else {
            pgPrev.style.display = '';
        }
    };

    this.prev = function () {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    };

    this.next = function () {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    };

    this.init = function () {
        let rows = document.getElementById(tableName).rows;
        let records = (rows.length - 1);

        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    };

    this.showPageNav = function (pagerName, positionId) {
        if (!this.inited) {
            // Not initialized
            return;
        }

        let element = document.getElementById(positionId),
            pagerHtml = '<span onclick="pager.prev();" class="pg-normal pg-prev">&#171;</span>';

        for (let page = 1; page <= this.pages; page++) {
            pagerHtml += '<span id="pg' + page + '" class="pg-normal pg-next" onclick="pager.showPage(' + page + ');">' + page + '</span>';
        }

        pagerHtml += '<span onclick="pager.next();" class="pg-normal">&#187;</span>';

        element.innerHTML = pagerHtml;
    };
}



//
let pager = new Pager('tbl', 5);

pager.init();
pager.showPageNav('tbl', 'pageNavPosition');
pager.showPage(1);