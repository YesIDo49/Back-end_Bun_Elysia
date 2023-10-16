window.addEventListener("DOMContentLoaded", function () {
    fetch("/animes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((res) => res.json())
        .then((animes) => {
            document.getElementById("animeList").innerHTML = animes.map((anime) => {
                return `
                <li id="${anime.id}">
                    ID: ${anime.id} <br> Name: ${anime.name} <br> Author: ${anime.mangaka}
                </li>
            `
            }).join("");
        })
}, false);

const addAnime = () => {
    const newAnime = prompt("Anime name & mangaka (separated by a comma)");
    if (newAnime) {
        const [name, mangaka] = newAnime.split(",");
        fetch("/animes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, mangaka }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById("animeList").innerHTML += `
                    <li id="${res.id}">
                        ID: ${res.id} Name: ${name} <br> Author: ${mangaka}
                    </li>
                `
                }
            });
    }
};

const deleteAnime = () => {
    const animePrompt = prompt("Anime ID");
    if (!animePrompt) return alert("Invalid anime ID");
    const animeId = parseInt(animePrompt);
    if (animeId) {
        fetch(`/animes/${animeId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById(animeId).remove();
                }
            });
    }
};

const updateAnime = () => {
    const animePrompt = prompt("Anime ID");
    if (!animePrompt) return alert("Invalid anime ID");
    const animeId = parseInt(animePrompt);
    if (animeId) {
        const newAnime = prompt("Anime name & mangaka (separated by a comma)");
        if (newAnime) {
            const [name, mangaka] = newAnime.split(",");
            fetch(`/animes/${animeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, mangaka }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        document.getElementById(animeId).innerHTML = `
                        ID: ${animeId} <br> Name: ${name} <br> Author: ${mangaka}
                    `
                    }
                });
        }
    }
};    