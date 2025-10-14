// Cookie Banner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');

    // Check if user has already made a choice about cookies
    if (!getCookie('cookies_choice')) {
        // Show banner after a short delay
        setTimeout(function() {
            cookieBanner.style.display = 'block';
        }, 1000);
    }

    // Handle accept button click
    acceptButton.addEventListener('click', function() {
        // Set cookie for 365 days
        setCookie('cookies_choice', 'accepted', 365);
        setCookie('cookies_accepted', 'true', 365);

        // Hide banner with animation
        hideBanner();

        // Enable analytics and other non-essential cookies here
        console.log('Cookies accepted - enabling analytics and marketing cookies');
    });

    // Handle reject button click
    rejectButton.addEventListener('click', function() {
        // Set cookie for 365 days
        setCookie('cookies_choice', 'rejected', 365);
        setCookie('cookies_accepted', 'false', 365);

        // Hide banner with animation
        hideBanner();

        // Disable non-essential cookies
        console.log('Cookies rejected - only essential cookies will be used');

        // Clear any existing non-essential cookies
        clearNonEssentialCookies();
    });

    function hideBanner() {
        cookieBanner.style.animation = 'slideDown 0.5s ease-out';
        setTimeout(function() {
            cookieBanner.style.display = 'none';
        }, 500);
    }

    function clearNonEssentialCookies() {
        // Clear analytics cookies (Google Analytics, etc.)
        const cookiesToClear = ['_ga', '_gid', '_gat', '_fbp', '_fbc'];
        cookiesToClear.forEach(function(cookieName) {
            deleteCookie(cookieName);
        });
    }
});

// Cookie utility functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname + ';';
}

// Function to check if cookies are accepted
function areCookiesAccepted() {
    return getCookie('cookies_accepted') === 'true';
}

// Function to check if user has made a choice
function hasUserMadeChoice() {
    return getCookie('cookies_choice') !== null;
}

// Add slide down animation for hiding
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
`;
document.head.appendChild(style);
