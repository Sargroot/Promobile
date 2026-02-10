let users = [];
let currentPage = 1;
let rowsPerPage = 10;

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("userTable");

    if (!window.name || window.name === "") {
        tbody.innerHTML = `<tr><td colspan="6">No users found</td></tr>`;
        return;
    }

    users = JSON.parse(window.name);
    users.forEach(user => {
        if (!user.created_on) {
            user.created_on = new Date().toLocaleString();
        }
        if (!user.last_updated) {
            user.last_updated = user.created_on;
        }
    });

    window.name = JSON.stringify(users);
    renderTable();
});

function sortBy(key, el, direction) {
    users.sort((a, b) =>
        direction === "asc"
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]))
    );

    document.querySelectorAll(".sort-icons span").forEach(icon => {
        icon.style.display = "inline";
        icon.classList.remove("active");
    });

    const icons = el.parentElement.querySelectorAll("span");

    if (direction === "asc") {
        icons[0].style.color="white";
        icons[0].classList.add("active"); 
        icons[1].style.color="#d8433c";

    } else {
        icons[1].style.color="white";
        icons[1].classList.add("active");
        icons[0].style.color="#d8433c";
    }

    currentPage = 1;
    window.name = JSON.stringify(users);
    renderTable();
}



function renderTable() {
    const tbody = document.getElementById("userTable");
    tbody.innerHTML = "";

    const totalItems = users.length;
    const start = (currentPage - 1) * rowsPerPage;
    var end = start + rowsPerPage;
    const pageUsers = users.slice(start, end);

    pageUsers.forEach((user, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>${user.mobile}</td>
            <td>${user.email}</td>
            <td class="${user.status === 'Active'?'active':'inactive'}">${user.status}</td>
            <td class="action-cell">
                <span class="dots">⋮</span>
                <div class="menu">
                    <div>Edit</div>
                    <div onclick="views(${start+index})">View</div>
                    <div onclick="change(${start+index})">Update Status</div>
                    <div class="danger" onclick="deleteUser(${start + index})">Delete</div>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });


    const visibleEnd = Math.min(start + rowsPerPage, totalItems);

    document.getElementById("pageInfo").innerText =
        totalItems === 0
            ? "Items 0 of 0"
            : `Items ${start + 1} – ${visibleEnd} of ${totalItems}`;

}

function nextPage() {
    if (currentPage < Math.ceil(users.length / rowsPerPage)) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}
function nextPage1() {
    currentPage = Math.ceil(users.length / rowsPerPage);
    renderTable();
}

function prevPage1() {
    currentPage = 1;
    renderTable();
}


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots")) {
        e.stopPropagation();
        document.querySelectorAll(".menu").forEach(menu => menu.style.display = "none");
        e.target.nextElementSibling.style.display = "block";
    } else {
        document.querySelectorAll(".menu").forEach(menu => menu.style.display = "none");
    }
});

function change(index) {
    users[index].status =
        users[index].status === "Active" ? "Inactive" : "Active";

    users[index].last_updated = new Date().toLocaleString();
    users[index].last_updated_by = users[index].username;


    window.name = JSON.stringify(users);
    renderTable();
}

function deleteUser(index) {
    users.splice(index, 1);
    window.name = JSON.stringify(users);

    if (currentPage > Math.ceil(users.length / rowsPerPage)) {
        currentPage--;
    }
    renderTable();
}

function myFunction() {
    let input = document.getElementById("myInput").value.toUpperCase();
    let rows = document.getElementById("userTable").getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let td = rows[i].getElementsByTagName("td")[0];
        if (td) {
            let txt = td.textContent || td.innerText;
            rows[i].style.display = txt.toUpperCase().includes(input) ? "" : "none";
        }
    }
}

function changeLimit() {
    rowsPerPage = parseInt(document.getElementById("pageLimit").value);
    currentPage = 1; 
    renderTable();
}

function views(index){

    const user = users[index];

    const all_d = new URLSearchParams({
        status:user.status,
        created_on: user.created_on,
        created_by:user.username,
        last_updated_on: user.last_updated,
        last_updated_by:user.username,
        role_s:user.role,
        mobile_s:user.mobile,
        email_s:user.email,
        country_s:user.country,
        city_s:user.city,
        address_s:user.address,
        state_s:user.state,
        street_s:user.street,
        zip_s:user.pincode

    });

    window.location.href="../html/view_details.html?" + all_d.toString();

}