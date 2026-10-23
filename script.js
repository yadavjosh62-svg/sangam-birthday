"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("intro");
  const birthday = document.getElementById("birthday");
  const garden = document.getElementById("garden");

  const pullButton = document.getElementById("pullButton");
  const introHint = document.getElementById("introHint");
  const openSurprise = document.getElementById("openSurprise");
  const replayButton = document.getElementById("replayButton");
  const heartBlossoms = document.getElementById("heartBlossoms");

  // Check that the important HTML elements exist.
  if (
    !intro ||
    !birthday ||
    !garden ||
    !pullButton ||
    !introHint ||
    !openSurprise ||
    !replayButton ||
    !heartBlossoms
  ) {
    console.error(
      "Some website elements are missing. Check index.html IDs."
    );
    return;
  }

  let isReleasing = false;
  let isOpeningGarden = false;

  // Show one scene and hide the others.
  function showScene(scene) {
    [intro, birthday, garden].forEach(function (item) {
      item.classList.remove("active");
    });

    scene.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // First screen: pull and release the arrow.
  pullButton.addEventListener("click", function () {
    if (isReleasing) return;

    isReleasing = true;
    pullButton.disabled = true;
    pullButton.innerHTML = "♡ Sending love...";
    introHint.textContent = "Made just for you, Sangam 💗";

    intro.classList.add("releasing");

    window.setTimeout(function () {
      showScene(birthday);

      isReleasing = false;
      intro.classList.remove("releasing");
      pullButton.disabled = false;
      pullButton.innerHTML = "<span>↗</span> PULL &amp; RELEASE";
      introHint.textContent = "Pull the arrow to begin 💌";
    }, 1500);
  });

  // Create the heart-covered tree.
  function createBlossoms() {
    heartBlossoms.replaceChildren();

    const colors = [
      "#ff75a9",
      "#ff9fc5",
      "#e85c96",
      "#c99aff",
      "#f6b8dc",
      "#ff477e",
      "#e9a7ff"
    ];

    // Each row has a slightly different width to form a tree canopy.
    const rows = [
      { y: 18, left: 39, right: 61 },
      { y: 26, left: 25, right: 75 },
      { y: 35, left: 17, right: 83 },
      { y: 44, left: 12, right: 88 },
      { y: 53, left: 17, right: 83 },
      { y: 62, left: 27, right: 73 }
    ];

    let count = 0;

    rows.forEach(function (row) {
      const heartsInRow = Math.round((row.right - row.left) / 5);

      for (let i = 0; i < heartsInRow; i++) {
        const heart = document.createElement("span");
        heart.className = "blossom";
        heart.textContent = Math.random() > 0.18 ? "♥" : "♡";

        const x =
          row.left +
          (i / Math.max(heartsInRow - 1, 1)) *
            (row.right - row.left) +
          (Math.random() * 3 - 1.5);

        const y = row.y + (Math.random() * 5 - 2.5);

        heart.style.left = x + "%";
        heart.style.top = y + "%";
        heart.style.fontSize = (14 + Math.random() * 17) + "px";
        heart.style.setProperty(
          "--blossom-color",
          colors[Math.floor(Math.random() * colors.length)]
        );
        heart.style.setProperty(
          "--delay",
          (count * 0.018 + Math.random() * 0.15) + "s"
        );

        heartBlossoms.appendChild(heart);
        count++;
      }
    });
  }

  // Second screen: reveal the heart garden.
  openSurprise.addEventListener("click", function () {
    if (isOpeningGarden) return;

    isOpeningGarden = true;
    createBlossoms();
    showScene(garden);

    window.setTimeout(function () {
      isOpeningGarden = false;
    }, 900);
  });

  // Replay the entire experience.
  replayButton.addEventListener("click", function () {
    isReleasing = false;
    isOpeningGarden = false;

    intro.classList.remove("releasing");
    pullButton.disabled = false;
    pullButton.innerHTML = "<span>↗</span> PULL &amp; RELEASE";
    introHint.textContent = "Pull the arrow to begin 💌";

    showScene(intro);
  });
});
