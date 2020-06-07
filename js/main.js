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
  if (text.innerHTML === 'Empezar') {
  breatheAnimation();
  interval = setInterval(breatheAnimation, totalTime);
  text.addEventListener('mouseover', () => { text.innerHTML= 'Parar', text.style.fontSize = "1rem" });
  } else {
    pointerAnimation.cancel();
    clearInterval(interval);
    clearTimeout(holdTimeOut);
    clearTimeout(breatheOutTimeOut);
    container.className = 'container';
    text.innerHTML = 'Empezar';
    text.addEventListener('mouseover', () => { text.innerHTML= 'Empezar' });
  }
}

text.addEventListener('click', startAnimation);

// Audio functions

const player = document.querySelector('.player');
const audioToggle = document.querySelector('.toggle');

function activePlayer() {
  player.classList.toggle('hidden');
}
audioToggle.addEventListener('click', activePlayer);