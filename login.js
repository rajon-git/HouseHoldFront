// Function to get the value of an input by ID
const getValue = (id) => {
    return document.getElementById(id).value;
};

// Handle the login form submission
const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const username = getValue("login-username");
    const password = getValue("login-password");

    if (username && password) {
        fetch("http://127.0.0.1:8000/auth/login/", {
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
            console.log(data);
            if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "index.html"; // Redirect after successful login
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

// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', handleLogin);
