// enter home

const enterSound = document.querySelector(".enter-sound");
const enterBtn = document.querySelector(".home-btn");
const homeContainer = document.querySelector(".home-container");
const homeLinks = document.querySelector(".home-links");
const home = document.querySelector(".home");
const tuning = document.querySelector(".home-tuning");

const arrayOfImages = [
  "images/chaos1.jpg",
  "images/chaos2.jpg",
  "images/chaos3.jpg",
  "images/chaos4.jpg",
  "images/chaos5.jpg",
];

let counter = 0;
let homeInterval = null;
let imagesShown = 0;
let homeTuningShown = true;

function imageRotation() {
  home.classList.add("tv-off");

  setTimeout(() => {
    counter = (counter + 1) % arrayOfImages.length;
    imagesShown++;

    home.style.backgroundImage = `url(${arrayOfImages[counter]})`;
    home.classList.remove("tv-off");
    home.classList.add("tv-on");
    home.style.height = "100vh";
    home.style.backgroundSize = "100% 100%";
    home.style.backgroundColor = "black";

    home.addEventListener(
      "animationend",
      () => home.classList.remove("tv-on"),
      { once: true }
    );
    switch (counter) {
      case 1:
        tuning.style.color = "#00FEEB";
        break;
      case 2:
        tuning.style.color = "#FF2A2A";
        tuning.style.textShadow = "0 0 8px #FF2A2A";
        break;
      case 3:
        tuning.style.color = "#FF66D0";
        tuning.style.textShadow = "0 0 10px #FF66D0";
        break;
      case 4:
        tuning.style.color = " #00F0FF";
        tuning.style.textShadow = "0 0 10px #00F0FF";
        break;
      case 0:
        tuning.style.color = "green";
        break;
      default:
        console.log("default");
    }

    if (homeTuningShown) {
      tuning.style.opacity = "1";
    }

    if (imagesShown >= 5 && homeTuningShown) {
      tuning.style.opacity = "0";
      homeTuningShown = false;
      setTimeout(() => {
        window.location.href = "tapes.html";
      }, 2500);
    }
  }, 100);
}

if (enterSound && enterBtn) {
  enterBtn.addEventListener("click", (e) => {
    e.preventDefault();

    homeContainer.style.display = "none";
    homeLinks.style.display = "none";

    if (!homeInterval) {
      homeInterval = setInterval(imageRotation, 1300);
      enterSound.play().then(() => {
        enterSound.currentTime = 25;
        enterSound.volume = 1;
      });
    }
  });
}

// enter tapes

const tapesBtn = document.querySelector("#tapes-start-btn");
const tapesSong = document.querySelector("#tapes-song");
const tapesStart = document.querySelector(".tapes-start");

function playTapesSong() {
  if (tapesSong.paused) {
    tapesSong.currentTime = 0;
    tapesSong.volume = 0.5;
    tapesSong
      .play()
      .then(() => {
        console.log("🎶 who.mp3 playing");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}

if (tapesBtn && tapesSong) {
  tapesStart.addEventListener("click", () => {
    playTapesSong();
    tapesStart.style.display = "none";
  });
}

// tapes intro
const tapesIntro = document.querySelector("#tapesIntro");

if (tapesIntro) {
  tapesIntro.addEventListener("ended", () => {
    const tapesVideo = document.getElementById("tapesVideo");
    document.getElementById("tapesIntro").style.display = "none";

    if (window.innerWidth > 769) {
      tapesVideo.style.display = "block";
      tapesVideo.muted = true;
      tapesVideo.play().catch((err) => {
        console.warn("autoplay blocked:", err);
      });
    }
  });
}

// tapes video background

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

const startBtn = document.querySelector("#who-start-btn");
const whoSong = document.querySelector("#who-song");
const whoStart = document.querySelector(".who-start");

function playSong() {
  if (whoSong.paused) {
    whoSong.currentTime = 18;
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
