import { getMe } from "../api/users.mjs";

// Check if browser has any cookies
if (Cookies.get("logged_in") !== "true") {
    // If no cookies, redirect to login page
    window.location.href = "/login";
}

// if i am logged i need to check if the user is moderator
const currentUser = await getMe()
if(currentUser.type !== "moderator") {
    // if not moderator redirect to home page
    window.location.href = "/";
}
