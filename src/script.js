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
                <br>
                <button onclick="updateUser()" type="button" data-id="${user._id}">Update User</button>
                <button onclick="deleteUser()" type="button" data-id="${user._id}">Delete User</button>
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
    const idUser = event.target.dataset.id;
    if (!idUser) return alert("Invalid user ID");
    const userId = idUser;
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
    const idUser = event.target.dataset.id;
    if (!idUser) return alert("Invalid user ID");
    const userId = idUser;
    if (userId) {
        const newUser = prompt("User username, email & password (separated by a comma)");
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

window.addEventListener("DOMContentLoaded", function () {
    fetch("/kirbys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((res) => res.json())
        .then((kirbys) => {
            document.getElementById("kirbyList").innerHTML = kirbys.map((kirby) => {
                return `
                <li id="${kirby._id}">
                    ID: ${kirby._id} <br> Name: ${kirby.name} <br>
                    <img src="${kirby.image} " alt="${kirby.name}">
                </li>
                <br>
                <button onclick="updateKirby()" type="button" data-id="${kirby._id}">Update Kirby</button>
                <button onclick="deleteKirby()" type="button" data-id="${kirby._id}">Delete Kirby</button>
            `
            }).join("");
        })
}, false);

const addKirby = () => {
    const newKirby = prompt("Kirby name & image url (separated by a comma)");
    if (newKirby) {
        const [name, image] = newKirby.split(",");
        fetch("/kirbys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, image }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById("kirbu=yList").innerHTML += `
                    <li id="${res._id}">
                        ID: ${res._id} Name: ${name}  <br>
                        <img src="${kirby.image} " alt="${kirby.name}">
                    </li>
                `
                }
                window.location.reload();
            });
    }
};

const deleteKirby = () => {
    const idKirby = event.target.dataset.id;
    if (!idKirby) return alert("Invalid kirby ID");
    const kirbyId = idKirby;
    if (kirbyId) {
        fetch(`/kirbys/${kirbyId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById(kirbyId).remove();
                }
                window.location.reload();
            });
    }
};

const updateKirby = () => {
    const idKirby = event.target.dataset.id;
    if (!idKirby) return alert("Invalid kirby ID");
    const kirbyId = idKirby;
    if (kirbyId) {
        const newKirby = prompt("Kirby name & image (separated by a comma)");
        if (newKirby) {
            const [name, image] = newKirby.split(",");
            fetch(`/kirbys/${kirbyId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        document.getElementById(kirbyId).innerHTML = `
                        ID: ${kirbyId} <br> Name: ${name} <br> 
                        <img src="${kirby.image} " alt="${kirby.name}">
                    `
                    }
                    window.location.reload();
                });
        }
    }
};