import { MAIL,PWD } from "../src/constant.js";

console.log(MAIL);
console.log(PWD);
function showpass() {
  let pwd = document.getElementById("password");

  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
}


function mylogin(){
    let a = document.getElementById("myform");
    let em = a["email"].value;
    let pw = a["password"].value;

     let gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
     let pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     
    let c = 0;
     if(gmailRegex.test(em) && em === MAIL){
        c++;
     }else{
        alert("Entered incorrect email");
     }
     if(pass.test(pw) && pw === PWD ){
        c++;
     }
     else{
        alert("Entered incorrect password");
     }

     if(c==2){
        alert("Login Successfull");
     }
}


window.mylogin = mylogin;
window.showpass = showpass;