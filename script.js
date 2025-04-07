// entry scroll 
const entryMain = document.querySelector('.entry-main');
let scrollInterval;

function startScroll(direction) {
  scrollInterval = setInterval(() => {
    entryMain.scrollBy({ top: direction * 2, behavior: 'auto' });
  }, 1);
}

function stopScroll() {
  clearInterval(scrollInterval);
}

const scrollDownBtn = document.querySelector('.scrollDown');
const scrollUpBtn = document.querySelector('.scrollUp');

if (scrollDownBtn) {
  scrollDownBtn.addEventListener('mousedown', () => startScroll(1));
  scrollDownBtn.addEventListener('mouseup', stopScroll);
  scrollDownBtn.addEventListener('mouseleave', stopScroll);
  scrollDownBtn.addEventListener('touchstart', () => startScroll(1));
  scrollDownBtn.addEventListener('touchend', stopScroll);
}

if (scrollUpBtn) {
  scrollUpBtn.addEventListener('mousedown', () => startScroll(-1));
  scrollUpBtn.addEventListener('mouseup', stopScroll);
  scrollUpBtn.addEventListener('mouseleave', stopScroll);
  scrollUpBtn.addEventListener('touchstart', () => startScroll(-1));
  scrollUpBtn.addEventListener('touchend', stopScroll);
}

// entry music pause and play 
let music = document.querySelector("#entry-music");
let playpause = document.querySelector(".playpause");

function playMusic () {
  music.muted = true;     
  music.play().then(() => {
      music.muted = false;  
      music.volume = 0.5;
  }).catch(err => {
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
    toggleMusic()
});
}

// who music 
const startBtn = document.querySelector("#who-start-btn");
const whoSong = document.querySelector("#who-song");
const whoStart = document.querySelector(".who-start")

function playSong () {
  console.log("🔘 Button clicked");
  if (whoSong.paused) {
    whoSong.currentTime = 8;
    whoSong.volume = 0.5;
    whoSong.play().then(() => {
      console.log("🎶 who.mp3 playing");
    }).catch(err => {
      console.warn("🔇 playback blocked:", err);
    });
  }
}

if (startBtn && whoSong) {
  whoStart.addEventListener("click", () => {
    playSong();
    whoStart.style.display="none";
  })

}



