function myadd() {
    let a = document.getElementById("myform");

    let un = a["username"].value;
    let mno = a["mobno"].value;
    let city = a["city"].value;
    let role = a["role"].value;
    let em = a["email"].value;
    let pin = a["pincode"].value;
    let status = "Active";

    let gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let usernameRegex = /^[a-zA-Z0-9 ]{4,24}$/;
    let mobileRegex = /^\d{10}$/;
    let pincodeRegex = /^\d{6}$/;

    let c = 0;

    if (gmailRegex.test(em)) c++;
    else { alert("Entered incorrect email"); return false; }

    if (usernameRegex.test(un)) c++;
    else { alert("Entered incorrect username"); return false; }

    if (mobileRegex.test(mno)) c++;
    else { alert("Entered incorrect mobile number"); return false; }

    if (pincodeRegex.test(pin)) c++;
    else { alert("Entered incorrect pincode"); return false; }

    let userData = {
        username: un,
        role: role,
        mobile: mno,
        email: em,
        city: city,
        status: status,
    };

    let users = window.name ? JSON.parse(window.name) : [];

    users.push(userData);


    window.name = JSON.stringify(users);
window.location.href = "add_user_table.html";
return false;
}

window.myadd = myadd;
