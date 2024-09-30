function handleLogout() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, cannot logout.');
        return;
    }

    fetch('https://householdserviceapi.onrender.com/auth/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(response => {
        if (response.status === 405) {
            throw new Error('Method Not Allowed: Check if the method is correct');
        }
        if (!response.ok) {
            throw new Error(`Logout failed with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        localStorage.removeItem('token');
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('login-button').style.display = 'block';
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}



fetch("navbar.html")
.then(res => res.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;
    let navElement = document.getElementById("user-menu")
    const token = localStorage.getItem("token");
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


