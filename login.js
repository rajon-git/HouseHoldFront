
const getValue = (id) => {
    return document.getElementById(id).value;
};

const handleLogin = (event) => {
    event.preventDefault(); 
    const username = getValue("login-username");
    const password = getValue("login-password");

    if (username && password) {
        fetch("https://householdserviceapi.onrender.com/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            
            if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "index.html"; 
            } else {
                document.getElementById("error").innerText = data.error || "Login failed.";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("error").innerText = "An error occurred. Please try again.";
        });
    } else {
        document.getElementById("error").innerText = "Please enter both username and password.";
    }
};


document.getElementById('login-form').addEventListener('submit', handleLogin);


// const handleLogout =() => {
//     const token = localStorage.getItem("token")
//     fetch("https://householdserviceapi.onrender.com/auth/logout/",{
//         mathod: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`
//         },
//     }).then(res => {
//         if(res.ok){
//             localStorage.removeItem("token")
//             window.location.href = './index.html'
//         }
//     }).catch(err => console.log("Logout Error", err))
// }