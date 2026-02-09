var countrySateCityinfo = {
    Australia: {
        "Western Australia": {
            Broome: ["672511", "613181", "617101"],
            Coolgardie: ["642191", "614312"]
        },
        Tasmania: {
            Hobart: ["700110", "711520"],
            Launceston: ["725110", "711334"],
            Burnie: ["732011", "711315"]
        }
    },
    Germany: {
        Bavaria: {
            Munich: ["803131", "801333", "801335"],
            Numemberg: ["904012", "904103", "901404"]
        },
        Hessen: {
            Frankfurt: ["603061", "160309", "601310"],
            Surat: ["552416", "552147", "515248", "515249"]
        }
    },

    India: {
        "Tamil Nadu": {
            Chennai: ["600001", "600002", "600003"],
            Viluppuram: ["605103", "605104", "605105"],
            Tanjore:["613002", "613005", "613007"]
        },
        Puducherry: {
            Puducherry: ["605001", "605013"],
            karikal: ["609001", "609013"],
            Mahe: ["673311"]
        }
    }
    
}

window.onload = function(){
    const selectCountry = document.getElementById('country'),
        selectState = document.getElementById('state'),
        selectCity = document.getElementById('city'),
        selectZip = document.getElementById('zip'),
        selects = document.querySelectorAll('select')

        selectState.disabled = true
        selectCity.disabled = true
        selectZip.disabled = true

        selects.forEach(select => {
            if(select.disabled == true){
                select.style.cursor = "auto"
            }
            else{
                select.style.cursor = "pointer"
            }
        })

        for(let country in countrySateCityinfo){
            selectCountry.options[selectCountry.options.length] = new Option(country, country)
        }
 

        selectCountry.onchange = (e) =>{
            
            selectState.disabled = false
            selectCity.disabled = true
            selectZip.disabled = true

            selects.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            selectState.length = 1
            selectCity.length = 1
            selectZip.length = 1

            for(let state in countrySateCityinfo[e.target.value]){
                selectState.options[selectState.options.length] = new Option(state, state)
            }
        }

        selectState.onchange = (e) =>{
            selectCity.disabled = false
            selectZip.disabled = true

            selects.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            selectCity.length = 1
            selectZip.length = 1

            for(let city in countrySateCityinfo[selectCountry.value][e.target.value]){
                selectCity.options[selectCity.options.length] = new Option(city, city)
            }
        }

        selectCity.onchange = (e) =>{
            selectZip.disabled = false

            selects.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })
            
            selectZip.length = 1

            let zips = countrySateCityinfo[selectCountry.value][selectState.value][e.target.value]
            
            for(let i=0; i<zips.length; i++){
                selectZip.options[selectZip.options.length] = new Option(zips[i], zips[i])
            }
        }
}


function myadd() {
    const a = document.getElementById("myform");

    const un = a.username.value.trim();
    const mno = a.mobno.value.trim();
    const city = a.city.value;
    const role = a.role.value;
    const em = a.email.value.trim();
    const pin = a.pincode.value.trim();
    const status = "Active";

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
        status
    };

    let users = window.name ? JSON.parse(window.name) : [];

    users.push(userData);


    window.name = JSON.stringify(users);
    window.location.href = "add_user_table.html";

    return false; 
}


window.myadd = myadd;
