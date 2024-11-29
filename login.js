document.addEventListener("DOMContentLoaded", () => {
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const guestTab = document.getElementById("guest-tab");

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const guestForm = document.getElementById("guest-form");

    // Show login form
    loginTab.addEventListener("click", () => {
        switchTab('login');
    });

    // Show sign-up form
    signupTab.addEventListener("click", () => {
        switchTab('signup');
    });

    // Show guest form
    guestTab.addEventListener("click", () => {
        switchTab('guest');
    });

    function switchTab(formType) {
        // Reset all tabs to inactive
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));

        // Set active form and tab based on clicked tab
        if (formType === 'login') {
            loginTab.classList.add('active');
            loginForm.classList.add('active');
        } else if (formType === 'signup') {
            signupTab.classList.add('active');
            signupForm.classList.add('active');
        } else if (formType === 'guest') {
            guestTab.classList.add('active');
            guestForm.classList.add('active');
        }
    }
});
