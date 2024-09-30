const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, user may already be logged out.");
        return; 
    }

    fetch("https://householdserviceapi.onrender.com/auth/logout/", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
    })
    .then(res => {
        if (res.ok) {
            localStorage.removeItem("token");
            window.location.href = './login.html';
        } else {
            // Log status and response
            console.error(`Logout failed with status: ${res.status}`);
            return res.text().then(text => {
                console.error('Response text:', text);
            });
        }
    })
    .catch(err => console.log("Logout Error", err));
};


fetch("navbar.html")
.then(res => res.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;
    let navElement = document.getElementById("user-menu")
    const token = localStorage.getItem("token");
    console.log(token);
    if(token)
    {
        navElement.innerHTML += `
        <a href="dashboard.html" class="nav-item nav-link">Dashboard</a>
        <a onClick="handleLogout()" class="nav-item nav-link">Logout</a>
                            `
    }
    else 
    {
        navElement.innerHTML += `
        <a href="login.html" class="nav-item nav-link">Login</a>
        <a href="register.html" class="nav-item nav-link">Register</a>`
    }
})


