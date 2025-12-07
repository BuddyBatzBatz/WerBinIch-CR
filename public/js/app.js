// --------------------------------------------------
// 1) Daten laden (URL deiner JSON)
// --------------------------------------------------
const DATA_URL = "/data/names_cr.json";

let persons = []; // Hier speichern wir die geladenen Namen

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
// 4) Button-Klick aktivieren
// --------------------------------------------------
document.getElementById("randomBtn").addEventListener("click", showRandomPerson);

// --------------------------------------------------
// 5) Daten laden, sobald die Seite geöffnet wird
// --------------------------------------------------
loadData();
