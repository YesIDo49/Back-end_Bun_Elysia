window.addEventListener("DOMContentLoaded", function () {
    fetch("/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((res) => res.json())
        .then((users) => {
            document.getElementById("userList").innerHTML = users.map((user) => {
                return `
                <li id="${user._id}">
                    ID: ${user._id} <br> Name: ${user.username} <br> Email: ${user.email} <br> Password: ${user.password}
                </li>
            `
            }).join("");
        })
}, false);

const addUser = () => {
    const newUser = prompt("User username, email & password (separated by a comma)");
    if (newUser) {
        const [username, email, password] = newUser.split(",");
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById("userList").innerHTML += `
                    <li id="${res._id}">
                        ID: ${res._id} Name: ${username}  <br> Email: ${email} <br> Password: ${password}
                    </li>
                `
                }
                window.location.reload();
            });
    }
};

const deleteUser = () => {
    const userPrompt = prompt("User ID");
    if (!userPrompt) return alert("Invalid user ID");
    const userId = userPrompt;
    if (userId) {
        fetch(`/users/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById(userId).remove();
                }
                window.location.reload();
            });
    }
};

const updateUser = () => {
    const userPrompt = prompt("User ID");
    if (!userPrompt) return alert("Invalid user ID");
    const userId = userPrompt;
    if (userId) {
        const newUser = prompt("User username & password (separated by a comma)");
        if (newUser) {
            const [username, email, password] = newUser.split(",");
            fetch(`/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        document.getElementById(userId).innerHTML = `
                        ID: ${userId} <br> Name: ${username} <br> Email: ${email} <br> Password: ${password}
                    `
                    }
                    window.location.reload();
                });
        }
    }
};    