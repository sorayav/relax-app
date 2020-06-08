'use strict';

const container = document.querySelector('.container');
const text = document.querySelector('#text');
const pointer = document.querySelector('.pointer-container');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

let interval;
let holdTimeOut;
let breatheOutTimeOut;

const pointerKeyFrames = new KeyframeEffect(pointer, [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}], {duration: totalTime, iterations: Infinity});
const pointerAnimation = new Animation(pointerKeyFrames, document.timeline);

// Audio functions
const player = document.querySelector('.player');
const audioToggle = document.querySelector('.toggle');

const showPlayer = () => {
  player.classList.toggle('hidden');
  const audioText = document.querySelector('.music');

  if (audioText.innerHTML === 'Mostrar música:') {
  audioText.innerHTML = 'Esconder reproductor:';
  } else {
    audioText.innerHTML = 'Mostrar música:';
  }
}
audioToggle.addEventListener('click', showPlayer);

// App functions
function breatheAnimation() {
  pointerAnimation.play();
  text.innerHTML = 'Inspira';
  container.className = 'container grow';

  holdTimeOut = setTimeout(() => {
    text.innerText = 'Aguanta';

    breatheOutTimeOut = setTimeout(() => {
      text.innerText = 'Espira';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

function startAnimation() {
  // window.navigator.vibrate(300);
  if (text.innerHTML === 'Empezar') {
  breatheAnimation();
  interval = setInterval(breatheAnimation, totalTime);
  text.addEventListener('mouseover', () => { text.innerHTML= 'Parar', text.style.fontSize = "1rem" });
  } else {
    pointerAnimation.cancel();
    player.pause();
    clearInterval(interval);
    clearTimeout(holdTimeOut);
    clearTimeout(breatheOutTimeOut);
    container.className = 'container';
    text.innerHTML = 'Empezar';
    text.addEventListener('mouseover', () => { text.innerHTML= 'Empezar' });
  }
}

text.addEventListener('click', startAnimation);
