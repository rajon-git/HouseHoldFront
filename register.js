const getValue = (id) => document.getElementById(id).value;

const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };

    const errorElement = document.getElementById("error");

    if (password === confirm_password) {
        errorElement.innerText = "";

        // Optional password strength check
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            errorElement.innerText = "Password must contain eight characters, at least one letter, one number, and one special character.";
            return;
        }

        // Show loading indication
        const button = document.getElementById('register-button');
        button.disabled = true;
        button.innerText = "Registering...";

        fetch("https://householdserviceapi.onrender.com/auth/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        })
        .then((res) => res.json())
        .then((data) => {
            button.disabled = false;
            button.innerText = "Register";
            if (data.message) {
                alert(data.message); 
            } else {
                alert('Registration successful!');
                
                document.getElementById("registration-form").reset();
            }
        })
        .catch((error) => {
            button.disabled = false;
            button.innerText = "Register";
            console.error('Error:', error);
            errorElement.innerText = "An error occurred. Please try again.";
        });
    } else {
        errorElement.innerText = "Password and confirm password do not match";
        alert("Password and confirm password do not match");
    }
};

document.getElementById('register-button').addEventListener('click', handleRegistration);
