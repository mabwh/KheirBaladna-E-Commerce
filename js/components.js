// Reusable components

import { checkActiveUser, logout, getActiveUserName } from "./auth.js";

export function createNavbar(isProtected = false) {
    if (isProtected && !checkActiveUser()) {
        return null;
    }

    const nav = document.createElement("nav");
    nav.id = "navbar";
    nav.className = "navbar-component";

    const userName = getActiveUserName() || "user";

    nav.innerHTML = `
        <div id="home-nav" class="nav-item">Home</div>
        <div id="contact-us-nav" class="nav-item">Contact Us</div>
        <div id="cart-nav" class="nav-item">
            <a href="cart.html">
                <img src="img/Cart.png" alt="Cart" width="30">
            </a>
            <span id="cart-badge" class="cart-badge" style="display: none;">0</span>
        </div>
        <div id="active-user-wrapper" class="nav-item">
            Hello, <a href="account.html" id="active-user-link">${userName}</a>
        </div>
        <div id="logout-nav" class="nav-item"><a href="#" onclick="handleLogout(event)">Logout</a></div>
    `;

    // Add event listeners
    nav.querySelector("#home-nav").addEventListener("click", () => {
        window.location.href = "shop.html";
    });

    return nav;
}

export function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "footer-component";
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h4>Address</h4>
                <p>13 Erfani St. Mallawi, Al-Minya, Egypt</p>
            </div>
            <div class="footer-section">
                <h4>Phone</h4>
                <p>+201667815353</p>
            </div>
            <div class="footer-section">
                <h4>Copyright</h4>
                <p>&copy; 2026 KheirBaladna. All rights reserved.</p>
            </div>
        </div>
    `;
    return footer;
}

export function createBackToTopButton() {
    const button = document.createElement("button");
    button.id = "backToTopBtn";
    button.className = "back-to-top-btn";
    button.innerHTML = `↑`;
    
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return button;
}

export function initializeNavbar(isProtected = false) {
    const navbar = createNavbar(isProtected);
    if (navbar) {
        const body = document.body;
        body.insertBefore(navbar, body.firstChild);
    }
}

export function initializeFooter() {
    const footer = createFooter();
    document.body.appendChild(footer);
}

export function initializeBackToTopButton() {
    const btn = createBackToTopButton();
    document.body.appendChild(btn);
}

// Global logout handler
window.handleLogout = function(event) {
    event.preventDefault();
    logout();
};

export function updateCartBadge(count) {
    const badge = document.getElementById("cart-badge");
    if (badge) {
        if (count > 0) {
            badge.style.display = "block";
            badge.textContent = count;
        } else {
            badge.style.display = "none";
        }
    }
}

export function getCartBadgeCount() {
    const activeUser = checkActiveUser();
    if (activeUser && activeUser.cart && activeUser.cart.products) {
        return activeUser.cart.products.length;
    }
    return 0;
}
