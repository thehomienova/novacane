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

// scroll down
scrollDownBtn.addEventListener('mousedown', () => startScroll(1));
scrollDownBtn.addEventListener('mouseup', stopScroll);
scrollDownBtn.addEventListener('mouseleave', stopScroll);
scrollDownBtn.addEventListener('touchstart', () => startScroll(1));
scrollDownBtn.addEventListener('touchend', stopScroll);

// scroll up
scrollUpBtn.addEventListener('mousedown', () => startScroll(-1));
scrollUpBtn.addEventListener('mouseup', stopScroll);
scrollUpBtn.addEventListener('mouseleave', stopScroll);
scrollUpBtn.addEventListener('touchstart', () => startScroll(-1));
scrollUpBtn.addEventListener('touchend', stopScroll);

