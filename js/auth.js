// Auth utility functions

export function checkActiveUser() {
    const activeUser = localStorage.getItem("activeUser");
    return activeUser ? JSON.parse(activeUser) : null;
}

export function requireAuth() {
    const activeUser = checkActiveUser();
    if (!activeUser) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 24px; text-align: center;">
                <p>Sorry, you don't have access to this website</p>
            </div>
        `;
        return false;
    }
    return true;
}

export function logout() {
    localStorage.setItem("activeUser", JSON.stringify(null));
    window.location.href = "./index.html";
}

export function deleteAccount(userName) {
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.filter(user => user.name !== userName);
    localStorage.setItem("users", JSON.stringify(users));
    
    let emails = JSON.parse(localStorage.getItem("emails"));
    const userToDelete = JSON.parse(localStorage.getItem("activeUser"));
    emails = emails.filter(email => email !== userToDelete.email);
    localStorage.setItem("emails", JSON.stringify(emails));
    
    logout();
}

export function getActiveUserName() {
    const activeUser = checkActiveUser();
    return activeUser ? activeUser.name : null;
}
