
const intro = document.getElementById("intro");
const birthday = document.getElementById("birthday");
const garden = document.getElementById("garden");

const pullButton = document.getElementById("pullButton");
const introHint = document.getElementById("introHint");
const openSurprise = document.getElementById("openSurprise");
const replayButton = document.getElementById("replayButton");

const heartBlossoms = document.getElementById("heartBlossoms");
const skyHearts = document.getElementById("skyHearts");

let isReleasing = false;
let gardenOpened = false;

function showScene(scene) {
  [intro, birthday, garden].forEach((item) => {
    item.classList.remove("active");
  });

  scene.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* STEP 1: PULL AND RELEASE THE ARROW */

pullButton.addEventListener("click", () => {
  if (isReleasing) return;

  isReleasing = true;
  pullButton.disabled = true;
  pullButton.innerHTML = "♡ Releasing love...";
  introHint.textContent = "Made just for you, Sangam 💗";

  intro.classList.add("releasing");

  // Let the arrow reach the heart before revealing the birthday.
  window.setTimeout(() => {
    showScene(birthday);

    isReleasing = false;
    pullButton.disabled = false;
    pullButton.innerHTML = "<span>↗</span> PULL &amp; RELEASE";
  }, 1700);
});

/* STEP 2: OPEN THE SURPRISE */

openSurprise.addEventListener("click", () => {
  showScene(garden);

  if (!gardenOpened) {
    gardenOpened = true;
    createHeartTree();
    createFloatingHearts();
  }

  // Restart the branch drawing animation on entry.
  const branches = document.querySelector(".branches");
  if (branches) {
    branches.querySelectorAll("path").forEach((path) => {
      path.style.animation = "none";
      void path.getBoundingClientRect();
      path.style.animation = "";
    });
  }
});

/* STEP 3: CREATE A DENSE TREE OF HEART BLOSSOMS */

function createHeartTree() {
  heartBlossoms.innerHTML = "";

  const colors = [
    "#ff4f91",
    "#ff6b9f",
    "#fb86b5",
    "#ed3f79",
    "#d94d91",
    "#b96bd6",
    "#cc82e7",
    "#ffb0cb",
    "#f83f67",
    "#e65aab",
    "#f48ab2",
    "#c65ab8"
  ];

  // Use many different heart sizes and shapes.
  const symbols = ["♥", "♥", "♡", "♥", "❤", "♥"];

  // The tree canopy is an oval. Fill it densely so the branches
  // are mostly hidden behind the blooming hearts.
  const totalHearts = 300;

  for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement("span");
    heart.className = "bloom-heart";

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    // Sample points across an ellipse, with extra hearts toward
    // the outer edges to create a full, rounded tree crown.
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random());

    const x = 300 + Math.cos(angle) * radius * 275;
    const y = 225 + Math.sin(angle) * radius * 205;

    // Keep the blossoms away from the very bottom of the trunk.
    const safeY = Math.min(415, Math.max(18, y));

    const size = 11 + Math.random() * 22;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 3.2;
    const sway = 2.5 + Math.random() * 3.5;

    heart.style.setProperty("--x", `${(x / 600) * 100}%`);
    heart.style.setProperty("--y", `${(safeY / 520) * 100}%`);
    heart.style.setProperty("--size", `${size}px`);
    heart.style.setProperty("--delay", `${delay}s`);
    heart.style.setProperty("--sway", `${sway}s`);
    heart.style.color = color;
    heart.style.zIndex = String(Math.floor(Math.random() * 3) + 1);

    heartBlossoms.appendChild(heart);
  }
}

/* GENTLE FLOATING HEARTS AROUND THE PAGE */

function createFloatingHearts() {
  skyHearts.innerHTML = "";

  const floatingColors = [
    "#f5a0bf",
    "#e88eb7",
    "#eab6df",
    "#f8c0d5"
  ];

  for (let i = 0; i < 24; i++) {
    const heart = document.createElement("span");
    heart.className = "sky-heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${10 + Math.random() * 17}px`;
    heart.style.color =
      floatingColors[
        Math.floor(Math.random() * floatingColors.length)
      ];

    heart.style.setProperty(
      "--duration",
      `${8 + Math.random() * 10}s`
    );

    heart.style.setProperty(
      "--delay",
      `${Math.random() * 10}s`
    );

    skyHearts.appendChild(heart);
  }
}

/* REPLAY FROM THE VERY BEGINNING */

replayButton.addEventListener("click", () => {
  gardenOpened = false;
  isReleasing = false;

  intro.classList.remove("releasing");
  pullButton.disabled = false;
  pullButton.innerHTML = "<span>↗</span> PULL &amp; RELEASE";
  introHint.textContent = "A tiny surprise, made with love ♡";

  heartBlossoms.innerHTML = "";
  skyHearts.innerHTML = "";

  showScene(intro);
});
