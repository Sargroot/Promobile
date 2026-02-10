var countryStateInfo = {
        USA: ['Alabama', 'Alaska', 'California', 'Texas', 'New York'],
        India:['Tamil Nadu','Puducherry','Kerala'],
        UK: ['England', 'Scotland', 'Wales', 'Northern Ireland']

}

window.onload = function () {
    const selectCountry = document.getElementById('country');
    const selectState = document.getElementById('state');
    const selects = document.querySelectorAll('select');

    selectState.disabled = true;

    selects.forEach(select => {
        select.style.cursor = select.disabled ? "auto" : "pointer";
    });

    for (let country in countryStateInfo) {
        selectCountry.options[selectCountry.options.length] =new Option(country, country);
    }

    selectCountry.onchange = function (e) {
        selectState.disabled = false;
        selectState.length = 1; 

        selects.forEach(select => {
            select.style.cursor = select.disabled ? "auto" : "pointer";
        });

        countryStateInfo[e.target.value].forEach(state => {
            selectState.options[selectState.options.length] =new Option(state, state);
        });
    };
};


function myadd() {
    const a = document.getElementById("myform");

    const un = a.username.value.trim();
    const mno = a.mobno.value.trim();
    const city = a.city.value;
    const role = a.role.value;
    const em = a.email.value.trim();
    const pin = a.pincode.value.trim();
    const crt = a.country.value;
    const status = "Active";
    const ad = a.address.value.trim();
    const state = a.state.value;
    const street = a.street.value.trim();



    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(em)) {
        alert("Entered incorrect email");
        return false;
    }

    if (!/^[a-zA-Z0-9 ]{4,24}$/.test(un)) {
        alert("Entered incorrect username");
        return false;
    }

    if (!/^\d{10}$/.test(mno)) {
        alert("Entered incorrect mobile number");
        return false;
    }

    if (!/^\d{6}$/.test(pin)) {
        alert("Entered incorrect pincode");
        return false;
    }

    const userData = {
        username: un,
        role,
        mobile: mno,
        email: em,
        city,
        status,
        country:crt,
        address:ad,
        state,
        street,
        pincode:pin,

    created_on: new Date().toLocaleString(),
    created_by: un,          
    last_updated: new Date().toLocaleString(),
    last_updated_by: un
    };

    let users = window.name ? JSON.parse(window.name) : [];

    users.push(userData);


    window.name = JSON.stringify(users);
    window.location.href = "add_user_table.html";

    return false; 
}


window.myadd = myadd;
