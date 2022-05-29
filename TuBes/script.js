class Login{
    constructor(username,password,remember){
        this.username=username;
        this.password=password;
    }

    toString(){
        return '{"username":"'+this.username+'","password":"'+this.password+"}";
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