const app = document.getElementById("app");

/* 🎊 Confetti */
function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}

/* ❤️ Heart explosion */
function heartExplosion() {
  const duration = 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: ['#ff4d6d', '#ff85a2', '#ffc2d1']
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: ['#ff4d6d', '#ff85a2', '#ffc2d1']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/* 🎈 Balloons */
function createBalloons() {
  for (let i = 0; i < 12; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = `hsl(${Math.random()*360},70%,60%)`;
    balloon.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.body.appendChild(balloon);
  }
}

/* 🎉 PAGE 1 */
function page1() {
  document.body.querySelectorAll(".balloon").forEach(b => b.remove());

  app.innerHTML = `
    <div class="page">
      <h1>Happy Birthday Love ❤️</h1>
      <h2>Here is this for you</h2>

      <div class="sticker">
        <img src="assets/cat.png">
      </div>

      <div class="buttons">
        <button onclick="yesPage()">Yes</button>
        <button onclick="noPage()">No</button>
      </div>
    </div>
  `;

  fireConfetti();
  createBalloons();
}

/* ❌ NO PAGE */
function noPage() {
  document.body.querySelectorAll(".balloon").forEach(b => b.remove());

  app.innerHTML = `
    <div class="page">
      <h1 class="angry">HOW DARE YOU 😤</h1>

      <div class="sticker angry">
        <img src="assets/gun-cat.png">
      </div>

      <h2 class="angry">Try again 😒</h2>

      <div class="buttons">
        <button onclick="page1()">Try Again</button>
      </div>
    </div>
  `;
}

/* ✅ YES PAGE */
function yesPage() {
  document.body.querySelectorAll(".balloon").forEach(b => b.remove());

  heartExplosion();

  setTimeout(() => {
    app.innerHTML = `
    ${backButton('page1')}
      <div class="page">
        <h1>Good Boy 🥰</h1>

        <div class="sticker">
          <img src="assets/us.jpeg">
        </div>

        <div class="buttons">
          <button onclick="nextPage()">Click here kuchupuchu 👉</button>
        </div>
      </div>
    `;
  }, 300);
}

/* 📸 SLIDESHOW IMAGES */
const images = [
  "assets/us1.jpeg",
  "assets/us2.jpeg",
  "assets/us3.jpeg",
  "assets/us4.jpeg",
  "assets/us5.jpeg"
];

let index = 0;

/* 💖 SLIDESHOW PAGE */
function nextPage() {
  app.innerHTML = `
  ${backButton('yesPage')}
    <div class="page love-page">
      <h1>I love you sooo much ❤️</h1>

      <div class="slideshow">
        <img id="slide" src="assets/us1.jpeg">
      </div>

      <button onclick="envelopePage()">Open 💌</button>
    </div>
  `;

  fireConfetti();
  startSlideshow();
}

/* 📸 SLIDESHOW LOGIC */
function startSlideshow() {
  const slide = document.getElementById("slide");

  setInterval(() => {
    index = (index + 1) % images.length;
    slide.src = images[index];
  }, 2000);
}

/* 💌 ENVELOPE PAGE (FIXED ONLY THIS PART) */
function envelopePage() {
  app.innerHTML = `
  ${backButton('nextPage')}

    <div class="page envelope-page">

      <div class="envelope" onclick="openLetter()">
        <div class="envelope-body"></div>
        <div class="envelope-flap"></div>
        <p class="envelope-text">To my 11:11 💌</p>
      </div>

      <!-- hidden letter -->
      <div id="letter" class="letter hidden">
        <img src="assets/letter.png" alt="letter">

        <button onclick="page1()" class="next-btn">
          I love you ❤️
        </button>
      </div>

    </div>
  `;
}

/* ✉️ OPEN LETTER (FIXED TIMING) */
function openLetter() {
  const flap = document.querySelector(".envelope-flap");
  const envelope = document.querySelector(".envelope");
  const letter = document.getElementById("letter");

  flap.style.transform = "rotateX(180deg)";

  setTimeout(() => {
    envelope.style.display = "none";
    letter.classList.remove("hidden");
  }, 600);
}

function backButton(prevPage) {
  return `<button class="back-btn" onclick="${prevPage}()">←</button>`;
}

/* 🚀 START */
page1();
  