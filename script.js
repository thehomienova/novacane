function playMusic () {
  gameMusic.volume = 0.5;
  gameMusic.play();
}

document.addEventListener("load", () => {
  if (gameMusic.paused) {
      playMusic();
  }
})

