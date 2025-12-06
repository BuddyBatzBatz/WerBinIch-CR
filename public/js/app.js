// URL zu deiner JSON-Datei mit den Personen
const DATA_URL = "https://wer-bin-ich-mx8i3xu2y-buddybatzbatzs-projects.vercel.app/data/names_cr.json";

// Hier wird später die Liste gespeichert
let people = [];

/**
 * Lädt die JSON-Datei vom Server
 * Wird direkt beim Start ausgeführt
 */
async function loadData() {
    try {
        const response = await fetch(DATA_URL);

        // Wenn ein Fehler kommt (z.B. Datei nicht gefunden)
        if (!response.ok) {
            throw new Error("Fehler beim Laden der JSON-Datei");
        }

        // JSON in ein JS-Objekt umwandeln
        people = await response.json();

        console.log("Daten geladen:", people);
    } catch (error) {
        console.error("Laden fehlgeschlagen:", error);
    }
}

/**
 * Wählt eine zufällige Person aus der geladenen Liste
 * Gibt ein einzelnes Objekt zurück
 */
function getRandomPerson() {
    const index = Math.floor(Math.random() * people.length);
    return people[index];
}

/**
 * Zeigt die zufällige Person im HTML an
 */
function showRandomPerson() {
    const person = getRandomPerson();

    if (!person) return;

    // Elemente auswählen
    const nameEl = document.getElementById("name");
    const imageEl = document.getElementById("image");

    // Name einsetzen
    nameEl.textContent = person.name;

    // Bild setzen
    imageEl.src = person.img;
    imageEl.style.display = "block";
}

/**
 * Button-Klick verbinden
 */
function setupButton() {
    document.getElementById("randomBtn").addEventListener("click", showRandomPerson);
}

// Beim Laden der Seite alles initialisieren
loadData();
setupButton();