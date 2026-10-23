
const openButton = document.getElementById("openButton");
const intro = document.getElementById("intro");
const garden = document.getElementById("garden");
const flowers = document.getElementById("flowers");
const replayButton = document.getElementById("replayButton");

let opened = false;

function createFlowers() {
  flowers.replaceChildren();

  const NS = "http://www.w3.org/2000/svg";

  const colors = [
    "#ed8bb5",
    "#f7b5d0",
    "#df6097",
    "#f5d5e0",
    "#e878a8",
    "#fff0f5"
  ];

  const spots = [
    [200,95,9], [175,115,8], [225,120,9],
    [155,145,8], [250,145,8], [130,175,7],
    [275,170,8], [180,165,8], [225,180,8],
    [105,210,8], [300,205,8], [150,220,8],
    [250,220,8], [185,240,8], [220,250,8],
    [125,245,7], [280,240,7], [165,275,8],
    [240,280,8], [200,300,7], [90,195,6],
    [320,180,6], [145,130,6], [260,120,6],
    [170,90,6], [235,85,6]
  ];

  spots.forEach(([x, y, r], index) => {
    const group = document.createElementNS(NS, "g");

    group.setAttribute("class", "flower");
    group.style.animationDelay =
      `${1.4 + index * 0.08}s`;

    for (let p = 0; p < 5; p++) {
      const angle = (Math.PI * 2 * p) / 5;
      const petal = document.createElementNS(NS, "ellipse");

      const px = x + Math.cos(angle) * r * 0.55;
      const py = y + Math.sin(angle) * r * 0.55;

      petal.setAttribute("cx", px);
      petal.setAttribute("cy", py);
      petal.setAttribute("rx", r * 0.5);
      petal.setAttribute("ry", r * 0.34);
      petal.setAttribute(
        "transform",
        `rotate(${p * 72} ${px} ${py})`
      );
      petal.setAttribute(
        "fill",
        colors[index % colors.length]
      );

      group.appendChild(petal);
    }

    const center = document.createElementNS(NS, "circle");

    center.setAttribute("cx", x);
    center.setAttribute("cy", y);
    center.setAttribute("r", r * 0.22);
    center.setAttribute("fill", "#f8d58a");

    group.appendChild(center);
    flowers.appendChild(group);
  });

  const hearts = [
    [145,190], [265,195], [195,135],
    [225,230], [115,225], [290,225]
  ];

  hearts.forEach(([x, y], i) => {
    const heart = document.createElementNS(NS, "path");

    heart.setAttribute("class", "flower");
    heart.style.animationDelay = `${2.2 + i * 0.15}s`;

    heart.setAttribute(
      "d",
      `M ${x} ${y + 5}
       C ${x - 13} ${y - 5}, ${x - 7} ${y - 12}, ${x} ${y - 5}
       C ${x + 8} ${y - 13}, ${x + 14} ${y - 4}, ${x} ${y + 5} Z`
    );

    heart.setAttribute("fill", colors[(i + 2) % colors.length]);

    flowers.appendChild(heart);
  });
}

function openSurprise() {
  if (opened) return;

  opened = true;
  intro.classList.add("hide");
  garden.classList.add("show");

  createFlowers();
}

openButton.addEventListener("click", openSurprise);

replayButton.addEventListener("click", () => {
  opened = false;

  garden.classList.remove("show");
  intro.classList.remove("hide");

  flowers.replaceChildren();
});
