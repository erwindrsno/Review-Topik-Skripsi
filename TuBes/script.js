class Login{
    constructor(username,password,remember){
        this.username=username;
        this.password=password;
    }

    toString(){
        return '{"username":"'+this.username+'","password":"'+this.password+"}";
    }
}

document.getElementById('btnS').addEventListener('click',checkValues);
function checkValues(){
    const val = document.getElementById('email').value;
    let pattern = /[a-z0-9]+@student.com/g;
    const check = val.match(pattern);
    if (check.includes('student')){
        document.location = 'student.html';
    } else{
        document.location = 'lecture.html';
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
    var inputVal = document.getElementById('input_pw');
    if (inputVal.value.length >= 8) {
        inputVal.style.backgroundColor = "white";
    } else{
        inputVal.style.backgroundColor = "red";
    }
    if(!input.match(lowCase)) {
        alert('Password must have lower case');
    }
    if(!input.match(upCase)) {
        alert('Password must have upper case');
    }
    if(!input.match(number)) {
        alert('Password must have number');
    }
    if(input.length < 8){
        alert('Password min 8 char');
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

document.getElementById("sign_out").addEventListener("onclick,", () => {
    document.location = 'Login Page.html';
})