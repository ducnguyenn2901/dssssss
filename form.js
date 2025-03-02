    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
    import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
    import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

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
    const storage = getStorage(app);
    let uploadedImageURL = "";

    document.getElementById("imageUpload").addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileRef = storageRef(storage, "uploads/" + file.name);
        await uploadBytes(fileRef, file);
        uploadedImageURL = await getDownloadURL(fileRef);

        document.getElementById("imagePreview").innerHTML = `<img src="${uploadedImageURL}" width="100">`;
    });

    document.getElementById("registForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("id").value;
        const userClass = document.getElementById("class").value;
        const phone = document.getElementById("phone").value;
        const date = document.querySelector('input[name="date"]:checked')?.value;
        const message = document.getElementById("message").value;

        if (!name || !userClass || !phone || !date) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const newUserRef = push(ref(database, "users"));
        await set(newUserRef, {
            name,
            class: userClass,
            phone,
            date,
            message,
            image: uploadedImageURL
        });

        alert("Đăng ký thành công!");
        document.getElementById("registForm").reset();
        document.getElementById("imagePreview").innerHTML = "";
    });