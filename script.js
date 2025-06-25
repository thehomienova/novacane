// entry scroll
const entryMain = document.querySelector(".entry-main");
let scrollInterval;

function startScroll(direction) {
  scrollInterval = setInterval(() => {
    entryMain.scrollBy({ top: direction * 2, behavior: "auto" });
  }, 1);
}

function stopScroll() {
  clearInterval(scrollInterval);
}

const scrollDownBtn = document.querySelector(".scrollDown");
const scrollUpBtn = document.querySelector(".scrollUp");

if (scrollDownBtn) {
  scrollDownBtn.addEventListener("mousedown", () => startScroll(1));
  scrollDownBtn.addEventListener("mouseup", stopScroll);
  scrollDownBtn.addEventListener("mouseleave", stopScroll);
  scrollDownBtn.addEventListener("touchstart", () => startScroll(1));
  scrollDownBtn.addEventListener("touchend", stopScroll);
}

if (scrollUpBtn) {
  scrollUpBtn.addEventListener("mousedown", () => startScroll(-1));
  scrollUpBtn.addEventListener("mouseup", stopScroll);
  scrollUpBtn.addEventListener("mouseleave", stopScroll);
  scrollUpBtn.addEventListener("touchstart", () => startScroll(-1));
  scrollUpBtn.addEventListener("touchend", stopScroll);
}

// entry music pause and play
let music = document.querySelector("#entry-music");
let playpause = document.querySelector(".playpause");

function playMusic() {
  music.muted = true;
  music
    .play()
    .then(() => {
      music.muted = false;
      music.volume = 0.5;
    })
    .catch((err) => {
      console.error("Playback failed:", err);
    });
}

function toggleMusic() {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
  }
}

if (music && playpause) {
  playpause.addEventListener("click", toggleMusic);
  playpause.addEventListener("touchstart", (e) => {
    e.preventDefault();
    toggleMusic();
  });
}

// who music
const who = document.querySelector(".who-scroll");
let scrollWho = 0;

const startBtn = document.querySelector("#who-start-btn");
const whoSong = document.querySelector("#who-song");
const whoStart = document.querySelector(".who-start");

function playSong() {
  if (whoSong.paused) {
    whoSong.currentTime = 0;
    whoSong.volume = 0.5;
    whoSong
      .play()
      .then(() => {
        console.log("🎶 who.mp3 playing");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}

if (startBtn && whoSong) {
  whoStart.addEventListener("click", () => {
    playSong();
    whoStart.style.display = "none";
    who.scrollTop = 0;
    scrollWho = 0;
    requestAnimationFrame(autoWhoScroll);
    setTimeout(() => {
      if (who.scrollTop < who.scrollHeight - who.clientHeight) {
        autoWhoScroll();
      }
    }, 1000);
  });
}

// finance music
const finance = document.querySelector(".finance-intro");
let scrollFinance = 0;

const financeBtn = document.querySelector("#finance-start-btn");
const financeSong = document.querySelector("#finance-song");
const financeStart = document.querySelector(".finance-start");

function playFinanceSong() {
  if (financeSong.paused) {
    financeSong.currentTime = 0;
    financeSong.volume = 0.5;
    financeSong
      .play()
      .then(() => {
        console.log("🎶 who.mp3 playing");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}

if (financeBtn && financeSong) {
  financeStart.addEventListener("click", () => {
    playFinanceSong();
    financeStart.style.display = "none";
    finance.scrollTop = 0;
    scrollFinance = 0;
    requestAnimationFrame(autoFinanceScroll);
  });
}

// automatic finance scroll
function autoFinanceScroll() {
  scrollFinance += 0.3;
  finance.scrollTop = scrollFinance;
  console.log("Scrolling... ", scrollFinance);

  if (scrollFinance < finance.scrollHeight - finance.clientHeight) {
    requestAnimationFrame(autoFinanceScroll);
  }
}

// cards song
const cardsSong = document.querySelector("#cardsSong");
const cardsStart = document.querySelector(".cards-start");
const cardsBtn = document.querySelector("#cards-start-btn");

function playCardsSong() {
  if (cardsSong.paused) {
    cardsSong.currentTime = 0;
    cardsSong.volume = 0.5;
    cardsSong
      .play()
      .then(() => {
        console.log("🎶 cardsSong.mp3 playing");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}

if (cardsBtn && cardsSong) {
  cardsStart.addEventListener("click", () => {
    playCardsSong();
    cardsStart.style.display = "none";
  });
}

// card song
const cardSong = document.querySelector("#cardSong");
const cardStart = document.querySelector(".card-start");
const cardBtn = document.querySelector("#card-start-btn");

function playCardSong() {
  if (cardSong.paused) {
    cardSong.currentTime = 5;
    cardSong.volume = 0.5;
    cardSong
      .play()
      .then(() => {
        console.log("🎶 cardsSong.mp3 playing");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}

if (cardBtn && cardSong) {
  cardStart.addEventListener("click", () => {
    playCardSong();
    cardStart.style.display = "none";
  });
}

// chaos

let container = document.querySelector(".chaos-img");
const chaosBtn = document.querySelector("#chaos-start-btn");
const chaosStart = document.querySelector(".chaos-start");
const chaosEscape = document.querySelector("#chaos-escape");
const chaosSong = document.querySelector("#chaosSong");

const arrayOfImages = [
  "images/chaos1.jpg",
  "images/chaos2.jpg",
  "images/chaos3.jpg",
  "images/chaos4.jpg",
  "images/chaos5.jpg",
  "images/chaos6.jpg",
];

let counter = 0;
let chaosInterval = null;
let imagesShown = 0;
let chaosEscapeShown = false;

function playChaosSong() {
  if (chaosSong.paused) {
    chaosSong.volume = 0.5;
    chaosSong
      .play()
      .then(() => {
        chaosSong.currentTime = 5;
        console.log("🎶 chaosSong.mp3 playing");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}

function imageRotation() {
  container.classList.add("tv-off");

  setTimeout(() => {
    counter = (counter + 1) % arrayOfImages.length;
    imagesShown++;

    container.src = arrayOfImages[counter];

    container.classList.remove("tv-off");
    container.classList.add("tv-on");

    container.addEventListener(
      "animationend",
      () => container.classList.remove("tv-on"),
      { once: true }
    );

    // show escape after one full cycle, only once
    if (imagesShown >= arrayOfImages.length && !chaosEscapeShown) {
      chaosEscape.classList.add("show");
      chaosEscapeShown = true;
    }
  }, 100);
}

chaosBtn.addEventListener("click", () => {
  playChaosSong();
  if (!chaosInterval) {
    chaosInterval = setInterval(imageRotation, 1300);
    chaosStart.style.display = "none";
  }
});
