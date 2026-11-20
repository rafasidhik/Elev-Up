window.onload = function() { 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function checkComplexPassword(pass) {
        const hasCapital = /[A-Z]/.test(pass);
        const hasSmall = /[a-z]/.test(pass);
        const hasDigit = /[0-9]/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        return hasCapital && hasSmall && hasDigit && hasSpecial;
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            let passed = true;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            emailError.textContent = "";
            passwordError.textContent = "";

            if (email === "") {
                emailError.textContent = "Email cannot be blank.";
                passed = false;
            } else if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email format";
                passed = false;
            }
            if (password === "") {
                passwordError.textContent = "Password cannot be blank.";
                passed = false;
            } else if (password.length < 8 || password.length > 16) {
                passwordError.textContent = "Password must be between 8 and 16 characters.";
                passed = false;
            } else if (!checkComplexPassword(password)) {
                passwordError.textContent = "Must contain 1 capital letter, 1 lowercase letter, 1 number, and 1 symbol.";
                passed = false;
            }
            if (passed === false) {
                event.preventDefault();
            } else {
                event.preventDefault(); 
                alert("Login Success!");
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            let passed = true;
            const username = document.getElementById('username').value;
            const signupEmail = document.getElementById('signupEmail').value;
            const signupPassword = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const usernameError = document.getElementById('usernameError');
            const signupEmailError = document.getElementById('signupEmailError');
            const signupPasswordError = document.getElementById('signupPasswordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            usernameError.textContent = "";
            signupEmailError.textContent = "";
            signupPasswordError.textContent = "";
            confirmPasswordError.textContent = "";

            if (username === "") {
                usernameError.textContent = "Name cannot be blank.";
                passed = false;
            } else if (username.length < 3) {
                usernameError.textContent = "Name must be at least 3 letters long.";
                passed = false;
            } else if (!isNaN(username)) {
                usernameError.textContent = "Name cannot be a number.";
                passed = false;
            }
            if (signupEmail === "") {
                signupEmailError.textContent = "Email cannot be blank.";
                passed = false;
            } else if (!emailPattern.test(signupEmail)) {
                signupEmailError.textContent = "Please enter a valid email format";
                passed = false;
            }
            if (signupPassword === "") {
                signupPasswordError.textContent = "Password cannot be blank.";
                passed = false;
            } else if (signupPassword.length < 8 || signupPassword.length > 16) {
                signupPasswordError.textContent = "Password must be between 8 and 16 characters.";
                passed = false;
            } else if (!checkComplexPassword(signupPassword)) {
                signupPasswordError.textContent = "Must contain 1 capital letter, 1 lowercase letter, 1 number, and 1 symbol.";
                passed = false;
            }
            if (confirmPassword === "") {
                confirmPasswordError.textContent = "Please retype your password.";
                passed = false;
            } else if (signupPassword !== confirmPassword) {
                confirmPasswordError.textContent = "Passwords do not match.";
                passed = false;
            }
            if (passed === false) {
                event.preventDefault();
            } else {
                event.preventDefault(); 
                alert("Account created successfully!");
            }
        });
    }
};