async function loadNames() {
  const response = await fetch("/data/names_cr.json");
  const list = await response.json();
  return list;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getRandomEntry() {
  const names = await loadNames();
  const shuffled = shuffle(names);
  return shuffled[0]; // erster Eintrag ist nun zufällig
}

// Beispiel direkt beim Laden:
getRandomEntry().then(entry => {
  console.log("Zufälliger Name:", entry);
});