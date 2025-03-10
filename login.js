import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD98-mqqRSpCdGJteOktNjMRu-JGgLSgVs",
    authDomain: "tin12-82372.firebaseapp.com",
    databaseURL: "https://tin12-82372-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tin12-82372",
    storageBucket: "tin12-82372.appspot.com",
    messagingSenderId: "410749049401",
    appId: "1:410749049401:web:699b028c180db1da9c4be8",
    measurementId: "G-H9S5EWS8QQ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function loadRegistrations() {
    const dbRef = ref(database, "/users");
    get(dbRef).then(snapshot => {
        if (snapshot.exists()) {
            let tableBody = document.getElementById("dataTable");
            tableBody.innerHTML = "";

            snapshot.forEach(child => {
                let data = child.val();
                let userId = child.key;
                let row = `<tr>
                    <td>${data.name || "Không có tên"}</td>
                    <td>${data.class || "Không có lớp"}</td>
                    <td>${data.phone || "Không có số điện thoại"}</td>
                    <td>${data.date || "Không có ngày"}</td>
                    <td>${data.message || "Không có lời tri ân"}</td>
                    <td>${data.image ? `<img src="${data.image}" style="max-width:100px;">` : "Không có ảnh"}</td>
                    <td><button class="btn btn-danger" onclick="deleteUser('${userId}')" style="margin:auto">Xóa</button></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        }
    });
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("myusername").value;
    let password = document.getElementById("mypassword").value; 
    if (username === "admin" && password === "admin") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("adminSection").style.display = "block";
        loadRegistrations();
    } else {
        document.getElementById("err").innerText = "Sai tài khoản hoặc mật khẩu!";
    }
});
window.deleteUser = function (userId) {
    if (confirm("Bạn có chắc muốn xóa không?")) {
        const userRef = ref(database, `/users/${userId}`);
        remove(userRef).then(() => {
            alert("Đã xóa");
            loadRegistrations();
        });
    }
}
