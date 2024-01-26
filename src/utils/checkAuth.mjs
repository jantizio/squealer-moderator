// Check if browser has any cookies
if (Cookies.get("logged_in") !== "true") {
    // If no cookies, redirect to login page
    window.location.href = "/login";
}
