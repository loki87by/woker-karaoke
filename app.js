import { TEXT, PIC_ARRAY } from "./consts.js";
const BODY = document.querySelector("body");
const body = document.querySelector(".karaoke");
const gallery = document.querySelector(".img-container");
const button = document.getElementById("play");
const SONG = "./song.mp3";
const audio = new Audio();
audio.src = SONG;
audio.onloadeddata = () => {button.classList.remove('hidden')}

const createElement = (tagName, params, container, text) => {
  const element = document.createElement(tagName);

  if (text) {
    element.textContent = text;
  }

  Object.entries(params).forEach((param) => {
    element.setAttribute(String(param[0]), String(param[1]));
  });

  if (container) {
    container.appendChild(element);
  }

  return element;
};

function launchFullScreen() {
  if (BODY.requestFullScreen) {
    BODY.requestFullScreen();
  } else if (BODY.mozRequestFullScreen) {
    BODY.mozRequestFullScreen();
  } else if (BODY.webkitRequestFullScreen) {
    BODY.webkitRequestFullScreen();
  }
}

function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

function textPainter(time, selector) {
  const letterTime = time / selector.children.length;
  const letters = Array.from(selector.children);
  for (let i = 0; i < letters.length; i++) {
    const currentTime = letterTime * i;
    setTimeout(() => {
      letters[i].classList.add("painted-text");
    }, currentTime);
  }
}

function createString(string) {
  const oldDiv = document.querySelector(".text-container");
  if(oldDiv) {
  oldDiv.remove();
  }
  const arr = string.split("");
  const div = createElement("div", { class: "text-container" }, body);
  arr.forEach((i) => {
    createElement("pre", {}, div, i);
  });
}

function createSongElement(time, array) {
  for (let i = 0; i < array.length; i++) {
    let currentTime = time * (i + 1)
    setTimeout(() => {
    createString(array[i]);
    const div = document.querySelector(".text-container");
    textPainter(time, div);
    }, currentTime);
  }
}

function karaoke(waiting) {
  setTimeout(() => {
    body.classList.remove('hidden')
    gallery.classList.remove('img-container_big')
    createSongElement(3050, TEXT[0]);
    setTimeout(() => {
      createSongElement(3050, TEXT[1]);
    }, 3050 * 4 + 950);
    /* припев */
    setTimeout(() => {
      createSongElement(3300, TEXT[2]);
    }, 3050 * 8 + 4400);
    setTimeout(() => {
      createSongElement(3300, TEXT[2]);
    }, 3050 * 8 + 3300 * 4 + 4500);
    /* куплет 2 */
    setTimeout(() => {
      createSongElement(3110, TEXT[3]);
    }, 3050 * 8 + 3300 * 8 + 5600);
    setTimeout(() => {
      createSongElement(3110, TEXT[4]);
    }, 3050 * 12 + 3300 * 8 + 6400);
    setTimeout(() => {
      /* припев */
      createSongElement(3300, TEXT[5]);
    }, 3050 * 16 + 3300 * 8 + 6900);
    setTimeout(() => {
      createSongElement(3300, TEXT[5]);
    }, 3050 * 16 + 3300 * 12 + 6900);
  }, waiting);
}

function playAudio() {
  audio.play()
  setTimeout(() => {
    const oldImage = document.querySelector('.image')
    oldImage.remove()
    button.classList.remove('hidden')
    cancelFullscreen()
    const oldDiv = document.querySelector(".text-container");
    if(oldDiv) {
    oldDiv.remove();
    }
    gallery.classList.add('img-container_big')
    createElement('img', {class: 'image image_big', alt: 'img', src: PIC_ARRAY[39]}, gallery)
  }, audio.duration * 1000);
}

function gallerySwitcher() {
  setTimeout(() => {
  button.classList.add('hidden')
  }, 1000)
  for(let i=0; i < PIC_ARRAY.length; i++){
    const img = createElement('img', {class: 'image', alt: 'img', src: PIC_ARRAY[i]})
    if(i < 4) {
      img.classList.add('image_big')
    }
    setTimeout(() => {
      const oldImage = document.querySelector('.image')
      oldImage.remove()
      gallery.appendChild(img)
    }, 6000 * i);
  }
}

function startSong() {
  launchFullScreen()
  playAudio();
  karaoke(25000);
  gallerySwitcher()
  setTimeout(() => {
    const oldDiv = document.querySelector(".text-container");
    if(oldDiv) {
    oldDiv.remove();
    }
  }, 3050 * 16 + 3300 * 16 + 6900);
}

button.addEventListener("click", startSong);
