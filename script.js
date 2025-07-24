// enter home

const enterSound = document.querySelector(".enter-sound");
const enterBtn = document.querySelector(".home-btn");
const homeContainer = document.querySelector(".home-container");
const homeBackground = document.querySelector(".home-body");
const homeLinks = document.querySelector(".home-links");
const home = document.querySelector(".home");
const homeBody = document.querySelector(".home-body-container");
const tuning = document.querySelector(".home-tuning");
const homeEscape = document.querySelector("#home-escape");
let homeEscapeShown = false;

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
    home.style.backgroundSize = "100% 100%";
    home.style.width = "100vw";
    home.style.height = "115vh";
    homeBody.style.backgroundImage = "url(images/borderBackground.jpg)";
    homeBody.style.backgroundSize = "100% 100%";
    homeBody.style.backgroundPosition = "center";
    homeBody.style.backgroundRepeat = "no-repeat";
 
    tuning.style.display = "block";



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
        tuning.style.color = "var(--ghost-white)";
        tuning.style.textShadow = "0 0 1px var(--ghost-white)"; 
        break;
      case 3:
        tuning.style.color = "#FF66D0";
        tuning.style.textShadow = "0 0 2px #FF66D0";
        break;
      case 4:
        tuning.style.color = " #00F0FF";
        tuning.style.textShadow = "0 0 3px #00F0FF";
    
        break;
      case 0:
        tuning.style.color = "green";
        break;
      default:
        tuning.style.color = "white";
        tuning.style.textShadow = "0 0 10px white";
    }

    if (homeTuningShown) {
      tuning.style.opacity = "1";
    }

    // Restart the interval after the longer delay
    if (counter === 5) {
      homeInterval = setInterval(imageRotation, 1000);
    }

    if (imagesShown >= 5 && !homeEscapeShown) {
      console.log(homeEscapeShown, homeTuningShown);
      homeEscape.classList.add("show");
      homeEscapeShown = true;
      tuning.style.opacity = "0";
      homeTuningShown = false;
      setTimeout(() => {

        sessionStorage.setItem("cameFromIndex", "true");
        window.location.href = "tapes.html";
      }, 2000);
    }
  }, 100);
}

if (enterSound && enterBtn) {
  enterBtn.addEventListener("click", (e) => {
    enterSound.play().then(() => {
      enterSound.currentTime = 20;
      enterSound.volume = 0.5;
    });
    homeContainer.style.display = "none";
    homeLinks.style.display = "none";
    home.style.maskImage = "none";
    home.style.webkitMaskImage = "none";
    

    setTimeout(() => {
    e.preventDefault();

    
    if (!homeInterval) {
      homeInterval = setInterval(imageRotation, 1300);
      
    }
  }, 1300);
  });
}

//  tapes song

const tapesVideoBackground = document.querySelector("#tapesVideo");
const tapesSong = document.querySelector("#tapes-song");
const tapesStart = document.querySelector(".tapes-start");
const tapesSongBtn = document.querySelector(".tapes-song-btn");

function playTapesSong() {
  if (tapesSong.paused) {
    tapesSong.volume = 0.5;
    tapesSong.play()
      .then(() => {
        tapesSong.currentTime = 30.5;
        // Some browsers need a second play() after seeking
        return tapesSong.play();
      })
      .then(() => {
        console.log("🎶 tapes.mp3 playing from 31s");
      })
      .catch((err) => {
        console.warn("🔇 playback blocked:", err);
      });
  }
}



// tapes intro 
const tapesIntro = document.querySelector("#tapesIntro");
const tapesIntroContainer = document.querySelector(".tapes-intro-container");
const transition = document.querySelector(".transition-glitch");
const tapesVideo = document.querySelector("#tapesVideo");

let notice;

function showNotice() {
  if (!notice) {
    notice = document.createElement("div");
    notice.innerText = "⚠️ Video failed to load. Try turning off Low Power Mode and refresh the page.";
    notice.style.position = "absolute";
    notice.style.top = "50%";
    notice.style.left = "50%";
    notice.style.transform = "translate(-50%, -50%)";
    notice.style.padding = "1rem 2rem";
    notice.style.fontSize = "1rem";
    notice.style.zIndex = "999999";
    notice.style.backgroundColor = "black";
    notice.style.color = "white";
    notice.style.border = "1px solid white";
    notice.style.textAlign = "center";
    notice.style.maxWidth = "90%";
    document.body.appendChild(notice);
  }
}

function removeNotice() {
  if (notice && notice.parentNode) {
    notice.parentNode.removeChild(notice);
    notice = null;
  }
}

if (tapesIntro) {
  // Try to play the video (if not already playing)
  let playPromise = tapesIntro.play && tapesIntro.play();
  // Set a timeout to check if the video started
  setTimeout(() => {
    if (tapesIntro.paused && tapesVideo.style.display !== "block") {
      showNotice();
    } 
  }, 1500); // 1.5 seconds after page load

  // Remove notice if video starts playing
  tapesIntro.addEventListener("play", removeNotice);
  tapesIntro.addEventListener("playing", removeNotice);
  tapesIntro.addEventListener("ended", removeNotice);
 

}

if (tapesIntro && tapesIntroContainer && sessionStorage.getItem("cameFromIndex") === "true") {
  // Play the intro, but do NOT clear the flag yet

  tapesIntro.addEventListener("timeupdate", () => {
    if (tapesIntro.duration - tapesIntro.currentTime <= 0.4) {
      playTapesSong();
    }
  });

  tapesIntro.addEventListener("timeupdate", () => {
    if (tapesIntro.duration - tapesIntro.currentTime <= 0.1) {
      transition.classList.add("animate");
  setTimeout(() => {
    transition.classList.add("end");
  }, 2000);
    }
  });

  tapesIntro.addEventListener("ended", () => {
    playTapesSong();
    tapesIntro.style.display = "none";
    tapesIntroContainer.style.display = "none";

    if (window.innerWidth > 1024 && tapesVideo) {
      tapesVideo.style.display = "block";
      console.log("tapesSongBtn.style.display", tapesSongBtn.style.display);
      tapesVideo.muted = true;
      tapesVideo.play().catch((err) => {
        console.warn("autoplay blocked:", err);
      });
    }
    // Now clear the flag, so if they leave and come back, intro won't play
    sessionStorage.removeItem("cameFromIndex");

    if (navigator.userAgent.includes("Instagram")) {
      tapesSongBtn.style.display = "none";
    }

    if (navigator.userAgent.includes("Safari") && window.innerWidth < 769) {
      tapesSongBtn.style.display = "block";
    }

  
  });
  

  if (tapesSongBtn) {
    tapesSongBtn.addEventListener("click", () => {
      playTapesSong();
      tapesSongBtn.style.display = "none";
    });
  }

} else if (tapesIntro && tapesIntroContainer) {
  // SKIP the intro: hide intro, glitch, show main content/video, play song
  tapesIntro.style.display = "none";
  tapesIntroContainer.style.display = "none";
  if (transition) transition.style.display = "none";
  if (tapesVideo) {
    if (window.innerWidth > 769) {
      tapesVideo.style.display = "block";
      tapesVideo.muted = true;
      tapesVideo.play().catch((err) => {
        console.warn("autoplay blocked:", err);
      });
    }
  }

  // Optionally, set animation delays here if needed
  const tapesOne = document.querySelector(".tapes-entry-one");
  const tapesTwo = document.querySelector(".tapes-entry-two");
  const tapesThree = document.querySelector(".tapes-entry-three");
  const tapesFour = document.querySelector(".tapes-entry-four");
  if (tapesOne && tapesTwo && tapesThree && tapesFour) {
    tapesOne.style.animationDelay = "2s";
    tapesTwo.style.animationDelay = "3s";
    tapesThree.style.animationDelay = "4s";
    tapesFour.style.animationDelay = "5s";
  }
}

if (tapesIntro) {
  tapesIntro.addEventListener("click", () => {
    tapesIntro.addEventListener("ended", () => {
      playTapesSong();
    });
  });
}

if (window.innerWidth > 1024) {
  if (tapesIntro) {
    tapesIntro.src = "videos/tapesVideoIntro.mp4";
    tapesIntro.load();

  }
}

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

// entry 1 ASS button
const entryAssBtn = document.querySelector(".entry-ass-btn");
const entryAss = document.querySelector(".entry-ass");
const entryAssSound = new Audio("../audio/ass.mp3");

if (entryAssBtn) {
  entryAssBtn.addEventListener("click", () => {

    entryAssSound.play();
    entryAss.classList.add("show");
    
  });
entryAss.addEventListener("animationend", () => {
  entryAss.classList.remove("show");
});
}

// entry 2 FTP button
const entryFtpBtn = document.querySelector(".entry-ftp-btn");
const entryFtp = document.querySelector(".entry-ftp");
const entryFtpSound = new Audio("../audio/ftpSound.wav");

if (entryFtpBtn) {
  entryFtpBtn.addEventListener("click", () => {
    entryFtp.classList.add("show");
    entryFtpSound.play();
  });

  entryFtp.addEventListener("animationend", () => {
    entryFtp.classList.remove("show");
    entryFtpSound.pause();
  });
}

const entryLetBtn = document.querySelector(".entry-let-btn");
const entry = document.querySelector(".entry");
const letGoSound = new Audio("../audio/letgo.flac");

if (entryLetBtn) {
entryLetBtn.addEventListener("click", () => {
  plausible("entry-let-go");
  entry.style.backgroundImage = "url(../images/letgo.png)";
  entry.style.backgroundSize = "100% 100%";
  entry.style.backgroundPosition = "center";
  entry.style.backgroundRepeat = "no-repeat";
  entry.style.width = "100%";
  entry.style.height = "100vh";
  entry.style.opacity = "1";
  entry.style.zIndex = "9999999";
  entry.style.overflow = "hidden";
  entry.style.animation = "collapseIn 3s forwards";
  letGoSound.play();
  entryMain.style.display = "none";
  playpause.style.display = "none";
  setTimeout(() => {
    sessionStorage.setItem("letgo", "true");
    window.location.href = "../index.html";
  }, 3000);
});
}

const entryAlcBtn = document.querySelector(".entry-alc-btn");
const entryAlc = document.querySelector(".entry-alc");

if (entryAlcBtn && entryAlc) {
  entryAlcBtn.addEventListener("click", () => {
    entryAlc.classList.add("show");
    entryAlc.play();
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