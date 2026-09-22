// ===== Favorites feature (products page) =====
let favorites = [];
const favoritesList = document.getElementById("favorites-list");
const favButtons = document.querySelectorAll(".fav-btn");

function loadFavorites() {
    const saved = localStorage.getItem("favorites");
    if (saved) {
        favorites = JSON.parse(saved);
    }
}

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function showFavorites() {
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No favorites yet.";
        favoritesList.appendChild(emptyItem);
        return;
    }

    favorites.forEach(function (product) {
        const item = document.createElement("li");
        item.textContent = product;
        favoritesList.appendChild(item);
    });
}

function updateButtons() {
    favButtons.forEach(function (button) {
        const product = button.dataset.product;
        if (favorites.includes(product)) {
            button.textContent = "Remove from Favorites";
        } else {
            button.textContent = "Add to Favorites";
        }
    });
}

function toggleFavorite(product) {
    if (favorites.includes(product)) {
        favorites = favorites.filter(function (item) {
            return item !== product;
        });
    } else {
        favorites.push(product);
    }
    saveFavorites();
    showFavorites();
    updateButtons();
}

if (favoritesList) {
    loadFavorites();
    showFavorites();
    updateButtons();

    favButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            toggleFavorite(button.dataset.product);
        });
    });
}

// ===== Form validation (contact page) =====
const form = document.querySelector(".order-form form");

function showError(field, message) {
    let error = field.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
        error = document.createElement("span");
        error.className = "error-message";
        field.insertAdjacentElement("afterend", error);
    }
    error.textContent = message;
}

function clearError(field) {
    const error = field.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
        error.textContent = "";
    }
}

function validateForm() {
    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const requestType = document.getElementById("request-type");
    const details = document.getElementById("item-details");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.value.trim().length < 2) {
        showError(name, "Please enter your name (at least 2 letters).");
        isValid = false;
    } else {
        clearError(name);
    }

    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Please enter a valid email, like name@example.com.");
        isValid = false;
    } else {
        clearError(email);
    }

    if (requestType.value === "") {
        showError(requestType, "Please choose a request type.");
        isValid = false;
    } else {
        clearError(requestType);
    }

    if (details.value.trim().length < 10) {
        showError(details, "Please describe your order (at least 10 characters).");
        isValid = false;
    } else {
        clearError(details);
    }

    return isValid;
}

if (form) {
    form.setAttribute("novalidate", "");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {
            let success = document.getElementById("form-success");
            if (!success) {
                success = document.createElement("p");
                success.id = "form-success";
                form.insertAdjacentElement("afterend", success);
            }
            success.textContent = "Thank you! Your request was sent.";
            form.reset();
        }
    });
}