'use strict';

const container = document.querySelector('.container');
const text = document.querySelector('#text');
const pointer = document.querySelector('.pointer-container');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
let interval;
const pointerKeyFrames = new KeyframeEffect(pointer, [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}], {duration: totalTime, iterations: Infinity});
const pointerAnimation = new Animation(pointerKeyFrames, document.timeline);

// breatheAnimation();

function breatheAnimation() {
  pointerAnimation.play();
  text.innerHTML = 'Inspira';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Aguanta';

    setTimeout(() => {
      text.innerText = 'Espira';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

function startAnimation() {
  if (text.innerHTML === 'Empezar') {
  breatheAnimation();
  interval = setInterval(breatheAnimation, totalTime);
  // text.addEventListener('mouseover', () => { text.innerHTML= 'Parar'});
  } else {
    pointerAnimation.cancel();
    
    clearInterval(interval);
    clearTimeout(breatheTime);
    clearTimeout(holdTime);
    clearTimeout(totalTime);
    text.innerHTML="Empezar";
  //  document.addEventListener('transitionend', () => {text.innerHTML="Empezar"});
  }
}

text.addEventListener('click', startAnimation);