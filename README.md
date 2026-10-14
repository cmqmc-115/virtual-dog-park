# Virtual Dog Park

A dog encyclopedia and virtual pet website built for a first-year programming lab.
It is made with plain HTML, CSS, and vanilla JavaScript — no frameworks, no backend,
no external APIs, and no package manager.

## 1. Project description

Virtual Dog Park has two parts:

- Dog Encyclopedia — three breeds (Beagle, Golden Retriever, Poodle), each with a
  simple original SVG illustration and short notes about size, personality, and care.
- My Virtual Dog — adopt one dog, feed and play with it, advance days, watch it
  grow, and keep your progress between page refreshes.

## 2. Features

- Three-breed encyclopedia with local SVG illustrations and care notes.
- Adoption form: choose a breed, enter a name (non-empty, at most 20 characters).
- Feed and Play buttons: each adds 10 happiness, capped at 100.
- Next Day button: day +1 and happiness −5, never below 0.
- Growth stages: Day 1 = Puppy, Days 2–3 = Young Dog, Day 4+ = Adult Dog.
- Saved progress: one dog is stored in the browser's" "localStorage" and restored
  after refresh (storage key "virtualDogParkPetV1").
- Start Over button: asks for confirmation before deleting saved progress.
- Responsive layout that works on both phones and laptops.

## 3. How to preview (local server)

Do NOT open the file with a "file://" address, because browser storage can behave
differently. Use a local server instead:

- VS Code Live Server: install the "Live Server" extension by Ritwick Dey, then
  right-click "index.html" and choose **Open with Live Server**. It opens an address
  "http://127.0.0.1:5500".
- Or run a simple server from the project folder, for example:
  "python -m http.server 8000", then visit "http://127.0.0.1:8000".

## 4. Growth and happiness rules

| Action        | Effect                                                |
| New dog       | Day 1, Puppy, happiness 50                            |
| Feed / Play   | Happiness +10 (maximum 100)                           |
| Next Day      | Day +1, happiness −5 (minimum 0)                      |
| Growth stage  | Day 1 Puppy · Days 2–3 Young Dog · Day 4+ Adult Dog   |

## 5. Where the pet data lives

Your dog (name, breed, day, happiness) is saved **locally in this browser only**,
using `localStorage`. It is not an online account and is **not stored in your GitHub
account**. Clearing browser data or using a different browser/device will not show
the same dog. Git never uploads this data.

## 6. Manual testing checklist

- [ √ ] Three breed cards and three illustrations display with no broken images.
- [ √ ] An empty name is rejected; a name with only spaces is rejected.
- [ √ ] A name with `<` or `>` shows as plain text (not as HTML).
- [ √ ] A name longer than 20 characters is stopped at 20.
- [ √ ] Adopting shows the dog on Day 1, Puppy, happiness 50.
- [ √ ] Feed and Play raise happiness and stop at 100.
- [ √ ] Next Day lowers happiness by 5 and never below 0.
- [ √ ] Stage changes to Young Dog on Day 2 and Adult Dog on Day 4.
- [ √ ] Refresh restores the latest dog on the same browser.
- [ √ ] Start Over → Cancel keeps the dog; Confirm clears it.
- [ √ ] The page stays readable and cards stack on a narrow screen.

## Illustration note

The three dog pictures are original SVG illustrations created for this project,
not real dog photographs and not copied from any website.

## Tech Stack

HTML · CSS · Vanilla JavaScript · Git · GitHub

## Reflection
Building the Virtual Dog Park showed me that vibe coding means staying in control, not handing everything to AI. I sent prompts to an external AI, pasted the generated code into VS Code, and tested each feature in the browser before committing. When localStorage failed after refresh, I traced the save and load paths and asked for a focused fix instead of a full rewrite. Committing after each working round gave me a safe rollback point twice. I now clearly separate HTML's structure, CSS's layout, and JavaScript's state logic and I no longer trust code just because an AI produced it. Seeing the dog persist across refreshes was the moment the lab finally clicked.
