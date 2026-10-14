/* =========================================================================
   Virtual Dog Park - script.js
   Plain (vanilla) JavaScript. No frameworks, no backend.
   This file handles: adoption, feeding, playing, growing,
   saving progress in the browser, and starting over.
   ========================================================================= */

// The storage key is the "label" we use to save ONE dog in the browser.
// We use the same key to save and to load, so the dog comes back after refresh.
const STORAGE_KEY = "virtualDogParkPetV1";

// Map each breed name to its local SVG illustration file.
const BREED_IMAGES = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

// Grab the HTML elements we need to read from or write to.
const adoptForm = document.getElementById("adopt-form");
const breedSelect = document.getElementById("breed-select");
const nameInput = document.getElementById("name-input");
const adoptMessage = document.getElementById("adopt-message");

const petCard = document.getElementById("pet-card");
const petImage = document.getElementById("pet-image");
const petName = document.getElementById("pet-name");
const petBreed = document.getElementById("pet-breed");
const petDay = document.getElementById("pet-day");
const petStage = document.getElementById("pet-stage");
const petHappiness = document.getElementById("pet-happiness");
const growthBar = document.getElementById("growth-bar");

const feedBtn = document.getElementById("feed-btn");
const playBtn = document.getElementById("play-btn");
const nextDayBtn = document.getElementById("next-day-btn");
const startOverBtn = document.getElementById("start-over-btn");

// We keep the current dog in this variable. null means "no dog yet".
let pet = null;

/* -------------------------------------------------------------------------
   stageFor(day): returns the growth stage for a given day number.
   Rules from the lab:
     Day 1        -> "Puppy"
     Days 2 and 3 -> "Young Dog"
     Day 4 onward -> "Adult Dog"
   It also returns the CSS size class and the growth-bar width.
   ------------------------------------------------------------------------- */
function stageFor(day) {
  if (day === 1) {
    return { name: "Puppy", sizeClass: "puppy", barWidth: "30%" };
  }
  if (day <= 3) {
    return { name: "Young Dog", sizeClass: "young", barWidth: "65%" };
  }
  return { name: "Adult Dog", sizeClass: "adult", barWidth: "100%" };
}

/* -------------------------------------------------------------------------
   savePet(): write the current dog to the browser's localStorage.
   localStorage is a small storage space inside the browser on this device.
   It is NOT an online account and is never uploaded by Git.
   ------------------------------------------------------------------------- */
function savePet() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
}

/* -------------------------------------------------------------------------
   loadPet(): read the saved dog from localStorage when the page opens.
   Returns the dog object, or null if nothing was saved.
   ------------------------------------------------------------------------- */
function loadPet() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }
  return JSON.parse(saved);
}

/* -------------------------------------------------------------------------
   clearPet(): delete the saved dog from localStorage (used by Start Over).
   ------------------------------------------------------------------------- */
function clearPet() {
  localStorage.removeItem(STORAGE_KEY);
}

/* -------------------------------------------------------------------------
   render(): update the page to show either the adoption form
   or the adopted dog's information.
   We use textContent (not innerHTML) for the name so that characters
   like < or > are shown as plain text and cannot break the page.
   ------------------------------------------------------------------------- */
function render() {
  if (pet === null) {
    // No dog yet: show the form, hide the pet card.
    adoptForm.classList.remove("hidden");
    petCard.classList.add("hidden");
    return;
  }

  // We have a dog: hide the form, show the pet card.
  adoptForm.classList.add("hidden");
  petCard.classList.remove("hidden");

  const stage = stageFor(pet.day);

  // Show the correct illustration and meaningful alt text.
  petImage.src = BREED_IMAGES[pet.breed];
  petImage.alt = "Illustration of a " + pet.breed;

  // textContent keeps the name safe to display.
  petName.textContent = pet.name;
  petBreed.textContent = pet.breed;
  petDay.textContent = pet.day;
  petStage.textContent = stage.name;
  petHappiness.textContent = pet.happiness;

  // Grow the picture and the bar with the stage.
  petImage.className = stage.sizeClass;
  growthBar.style.width = stage.barWidth;
}

/* -------------------------------------------------------------------------
   adoptDog(): read the form, check the name, and create a new dog.
   Starting state: Day 1, Puppy, happiness 50.
   ------------------------------------------------------------------------- */
function adoptDog(event) {
  event.preventDefault(); // stop the form from reloading the page

  // trim() removes spaces at the start and end of the name.
  const name = nameInput.value.trim();

  // Rule: the name must not be empty after trimming.
  if (name === "") {
    adoptMessage.textContent = "Please enter a name for your dog.";
    return;
  }

  // Rule: limit the name to 20 characters.
  if (name.length > 20) {
    adoptMessage.textContent = "The name must be 20 characters or fewer.";
    return;
  }

  // Create the new dog and save it.
  pet = {
    name: name,
    breed: breedSelect.value,
    day: 1,
    happiness: 50
  };
  savePet();
  adoptMessage.textContent = "";
  nameInput.value = "";
  render();
}

/* -------------------------------------------------------------------------
   changeHappiness(amount): helper to raise or lower happiness,
   but keep it between 0 and 100.
   ------------------------------------------------------------------------- */
function changeHappiness(amount) {
  pet.happiness = pet.happiness + amount;
  if (pet.happiness > 100) { pet.happiness = 100; } // never above 100
  if (pet.happiness < 0)   { pet.happiness = 0; }   // never below 0
}

/* -------------------------------------------------------------------------
   Feed and Play: each adds 10 happiness (max 100).
   ------------------------------------------------------------------------- */
function feedDog() {
  changeHappiness(10);
  savePet();
  render();
}

function playDog() {
  changeHappiness(10);
  savePet();
  render();
}

/* -------------------------------------------------------------------------
   nextDay(): move forward one day. Day +1, happiness -5 (min 0).
   ------------------------------------------------------------------------- */
function nextDay() {
  pet.day = pet.day + 1;
  changeHappiness(-5);
  savePet();
  render();
}

/* -------------------------------------------------------------------------
   startOver(): ask for confirmation before deleting the saved dog.
   If the user cancels, the dog stays.
   ------------------------------------------------------------------------- */
function startOver() {
  const sure = confirm("Start over? This will delete your saved dog.");
  if (sure) {
    clearPet();
    pet = null;
    render();
  }
}

/* -------------------------------------------------------------------------
   Wire up the buttons and the form.
   ------------------------------------------------------------------------- */
adoptForm.addEventListener("submit", adoptDog);
feedBtn.addEventListener("click", feedDog);
playBtn.addEventListener("click", playDog);
nextDayBtn.addEventListener("click", nextDay);
startOverBtn.addEventListener("click", startOver);

// When the page first loads, bring back any saved dog.
pet = loadPet();
render();
