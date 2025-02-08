document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const toggleThemeBtn = document.getElementById("toggleTheme");

    // Load users from localStorage
    function loadUsers() {
        userList.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        users.forEach((user, index) => {
            const userCard = document.createElement("div");
            userCard.classList.add("card");
            userCard.innerHTML = `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Village:</strong> ${user.village}</p>
                <p><strong>City:</strong> ${user.city}</p>
                <p><strong>State:</strong> ${user.state}</p>
                <p><strong>Country:</strong> ${user.country}</p>
                <button onclick="deleteUser(${index})" class="delete-btn">Delete</button>
            `;
            userList.appendChild(userCard);
        });
    }

    // Save user to localStorage
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            village: document.getElementById("village").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            country: document.getElementById("country").value
        };

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        userForm.reset();
        loadUsers();
    });

    // Delete user
    window.deleteUser = function(index) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    };

    // Theme Toggle
    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    loadUsers();
});
