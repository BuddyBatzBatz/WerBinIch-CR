// --------------------------------------------------
// 1) Daten laden (URL deiner JSON)
// --------------------------------------------------
const DATA_URL = "/data/names_cr.json";

let persons = []; // Hier speichern wir die geladenen Namen
let players = [];  // Hier speichern wir später jeden Spieler

// --------------------------------------------------
// 2) JSON von Server laden
// --------------------------------------------------
async function loadData() {
    try {
        const response = await fetch(DATA_URL); // Daten holen
        persons = await response.json();        // JSON in JS-Objekt umwandeln
        console.log("Daten geladen:", persons);
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
}

// --------------------------------------------------
// 3) Zufallsperson auswählen
// --------------------------------------------------
function showRandomPerson() {
    if (persons.length === 0) {
        console.warn("Keine Daten geladen!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * persons.length);
    const person = persons[randomIndex];

    // HTML-Elemente holen
    const nameEl = document.getElementById("name");
    const imgEl = document.getElementById("image");

    // Inhalte setzen
    nameEl.textContent = person.name;
    imgEl.src = person.image;
    imgEl.style.display = "block"; // Bild anzeigen
}

// --------------------------------------------------
// 4) Starte das Spiel durch Auswahl der Spieleranzahl + Button drücken
// --------------------------------------------------
function startGame() {
    const count = parseInt(document.getElementById("playerCount").value);
    console.log("Spiel startet mit " + count + " Spielern!");

    players = [];  // Reset

    for (let i = 1; i <= count; i++) {
    const randomPerson = getRandomPerson();

    players.push({
        id: i,
        name: "Spieler " + i,
        randomName: randomPerson.name,
        randomImage: randomPerson.image
    });
}

    renderPlayerButtons();
}

// --------------------------------------------------
// 4) Zufällige CR-Karte aus Datenbank wählen
// --------------------------------------------------
function getRandomName() {
    return persons[Math.floor(Math.random() * persons.length)];
}

// --------------------------------------------------
// 4) Buttons damit man auswählen kann, wer gerade dran ist
// --------------------------------------------------
function renderPlayerButtons() {
    console.log("renderPlayerButtons() wird ausgeführt!");
    const area = document.getElementById("result");
    area.innerHTML = "<h2>Wer hält das Handy?</h2>";

    players.forEach(p => {
        const btn = document.createElement("button");
        btn.textContent = p.name;
        btn.addEventListener("click", () => showOtherPlayers(p.id));
        area.appendChild(btn);
    });
}

// --------------------------------------------------
// 4) Funktion durch welche nur Namen+Bild von Spielern angezeigt wird, welche man selber nicht ist
// --------------------------------------------------
function showOtherPlayers(activeId) {
    const area = document.getElementById("result");
    area.innerHTML = `<h2>Du bist Spieler ${activeId}</h2>`;

    players
        .filter(p => p.id !== activeId)
        .forEach(p => {
            const div = document.createElement("div");
            div.innerHTML = `
                <h3>${p.randomName}</h3>
                <img src="${p.randomImage}" style="max-width:150px">
            `;
            area.appendChild(div);
        });
}

// --------------------------------------------------
// 5) Button-Klicks aktivieren
// --------------------------------------------------
//document.getElementById("randomBtn").addEventListener("click", showRandomPerson);
document.getElementById("startBtn").addEventListener("click", startGame);

// --------------------------------------------------
// 6) Daten laden, sobald die Seite geöffnet wird
// --------------------------------------------------
loadData();
