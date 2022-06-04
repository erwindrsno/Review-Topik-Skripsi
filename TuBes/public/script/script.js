class Login{
    constructor(username,password,remember){
        this.username=username;
        this.password=password;
    }

    toString(){
        return '{"username":"'+this.username+'","password":"'+this.password+"}";
    }
}

const password = document.getElementById('input_pw');
password.addEventListener('keyup', (event) => {
    let event1 = event.currentTarget;
    if(event1.value.length < 4 && event1.value.length > 0){
        event1.style.backgroundColor="red";
    }
    else{
        event1.style.backgroundColor="white";
    }
});

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

document.getElementById('btnS').addEventListener('onclick',checkValues);
function checkValues(){
    const val = document.getElementById('input_email').value;
    if (val.includes('student')){
        document.location = 'student.html';
    } else if (val.includes('lecture')){
        document.location = 'HalamanReview.html';
    }
}

function addDate(){
    const date = new Date();
    document.getElementById('date').innerHTML = date;
}
function addDeadline(){
    const d = document.getElementById('numD').value;
    const m = document.getElementById('numM').value;
    const y = document.getElementById('numY').value;
    document.getElementById('deadline').innerHTML = d + '-' + m + '-' + y;
}

function validate(){
    const lowCase = /[a-z]/g;
    const upCase = /[A-Z]/g;
    const number = /[0-9]/g;
    const input = document.getElementById('input_pw').value;
    let inputVal = document.getElementById('input_pw');
    if (input.length >= 4){
        if(!input.match(lowCase) || !input.match(upCase) || !input.match(number) || input.length < 4) {
            alert('Wrong password');
            return false;
        } else{
            checkValues();
        }
    }
}

function addNamaUser(){
    const email = document.getElementById("email").value;
    document.getElementById('namaUser').innerHTML = email;
}

(function(){
    const h1 = document.getElementById("button");
	h1.addEventListener('mouseover', function(){
		h1.style.color = 'black';
	});
	h1.addEventListener('mouseout', function(){
		h1.style.color = 'white';
	});
})();

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

function onUT() {
	document.getElementById("overlayUT").style.display = "block";
}

function offUT() {
	document.getElementById("overlayUT").style.display = "none";
}

document.getElementById("sign_out").addEventListener("onclick", () => {
    document.location = 'Login Page.html';
})

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
    }
}