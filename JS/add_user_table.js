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
    renderTable();
});

function renderTable() {
    const tbody = document.getElementById("userTable");
    tbody.innerHTML = "";

    const totalItems = users.length;
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageUsers = users.slice(start, end);

    pageUsers.forEach((user, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>${user.mobile}</td>
            <td>${user.email}</td>
            <td class="active">${user.status}</td>
            <td class="action-cell">
                <span class="dots">⋮</span>
                <div class="menu">
                    <div>Edit</div>
                    <div>View</div>
                    <div>Update Status</div>
                    <div class="danger" onclick="deleteUser(${start + index})">Delete</div>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("pageInfo").innerText =
        totalItems === 0
            ? "Items 0 of 0"
            : `Items ${start + 1} – ${end} of ${totalItems}`;
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
