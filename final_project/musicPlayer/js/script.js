const musicContainer = document.getElementById("music-container");
const imgContainer = document.getElementsByClassName("img-container")[0];
const musicInfoTop = document.getElementsByClassName("music-info-top")[0];
const navigation = document.getElementsByClassName("navigation")[0];

const playBackBtn = document.getElementById("playback-speed");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const eqToggleBtn = document.getElementById("eqToggleBtn");

const changeSchemeButtons = document.getElementById("changeSchemeButtons");

const chooseScheme = document.getElementById("chooseScheme");
const normalScheme = document.getElementById("normalScheme");
const shuffleScheme = document.getElementById("shuffleScheme");
const repeatScheme = document.getElementById("repeatScheme");

const audio = document.createElement("audio");
audio.src = "./songs/Ed Sheeran - The A Team.mp3";
audio.setAttribute("id", "audio");
musicContainer.appendChild(audio);

const progress = document.getElementsByClassName("progress")[0];
const progressContainer =
  document.getElementsByClassName("progress-container")[0];

const title = document.getElementById("title");
const cover = document.getElementById("cover");
const searchContainer = document.getElementById("search-container");
const searchbar = document.getElementById("search");
const suggestions = document.getElementsByClassName("suggestion");

const file = document.getElementById("random-file"); //user's file

const themeToggleBtn = document.getElementById("toggle-theme");
const randomPlayToggleBtn = document.getElementById("toggle-random-play"); //file handle
const bubblesToggleBtn = document.getElementById("toggle-bubbles");
const rainToggleBtn = document.getElementById("toggle-rain");
const visualizerToggleBtn = document.getElementById("toggle-visualizer");
const circularVisualizerToggleBtn = document.getElementById(
  "toggle-circular-visualizer"
);
const carouselToggleBtn = document.getElementById("toggle-carousel");
const awesomeMixToggleBtn = document.getElementById("toggle-awesome-mix");

//song titles
const songs = [
  "ACDC - Jail Break",
  "Banners - Shine A Light",
  "Beck - Dreams",
  "Blue Swede - Hooked On A Feeling",
  "Caroline Pennell - Leaving on a Jet Plane",
  "Coldplay - Yellow",
  "Ed Sheeran - The A Team",
  "George Harrison-My Sweet Lord",
  "Hinder - Lips Of An Angel",
  "Junip - Don't Let It Pass",
  "Queen - Bohemian Rhapsody",
  "Queen - I Want To Break Free",
  "Red Hot Chili Peppers - Can't Stop",
  "Redbone - Come and Get Your Love",
  "Sano Prakash - Atomic Bush",
];

// initial playback speed is 1
// let playbackRate = 1;

let playlistMode = false;
let playlistSongIndex = 0;
let playlistArray;

let playBackChosen = 2;
const playbackRates = [0.7, 0.9, 1, 1.2, 1.5, 2];
const playbackRateNames = [
  "opera",
  "relaxed",
  "record",
  "upbeat",
  "extreme",
  "Eminem",
];

const playbackIcons = [
  "./res/images/icons/opera.png",
  "./res/images/icons/bath-solid.svg",
  "./res/images/icons/vinyl-record.png",
  "./res/images/icons/drumsticks.png",
  "./res/images/icons/hand.png",
  "./res/images/icons/rap.png",
];

let darkMode = true;
let normalMode = true;
let randomPlayMode = false;
let bubbleMode = false;
let rainMode = false;
let carouselMode = false;
let visualizerMode = false;
let normalVisualizer = false;
let circularVisualizer = false;
let awesomeMixMode = false;

//keep track of songs
let songIndex = 2;

//switching options
const changeSchemes = ["normal", "shuffle", "repeat"];

//current changing schemeIndex & scheme
let currentSchemeIndex = 0;
let currentScheme = changeSchemes[currentSchemeIndex];

function toggleSchemeButtons() {
  if (!chooseScheme.classList.contains("on")) {
    chooseScheme.classList.add("on");
    normalScheme.style.transform = "translateX(-200%)";
    shuffleScheme.style.transform = "translateY(190%)";
    repeatScheme.style.transform = "translateX(200%)";
  } else {
    chooseScheme.classList.remove("on");
    normalScheme.style.transform = "translateX(0%)";
    shuffleScheme.style.transform = "translateY(0%)";
    repeatScheme.style.transform = "translateX(0%)";
  }
}

//initially load song info into DOM
loadSong(songs[songIndex]);

//update Song details
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `./songs/${song}.mp3`;
  cover.src = `./cover/${song}.png`;
}

function changeScheme(schemeIndex) {
  const schemeButtons =
    changeSchemeButtons.getElementsByClassName("changeScheme");
  for (let i = 0; i < schemeButtons.length; i++) {
    schemeButtons[i].style.zIndex = "1";
  }
  schemeButtons[schemeIndex].style.zIndex = 3;
  currentSchemeIndex = schemeIndex;
}

function changePlaybackRate() {
  playBackChosen++;

  if (playBackChosen > playbackRates.length - 1) {
    playBackChosen = 0;
  }
  displayHint(playbackRateNames[playBackChosen]);
  if (musicContainer.classList.contains("awesome-mix-mode")) {
    const wheels = document.getElementsByClassName("wheels")[0];
    wheels.className = `wheels speed-${playBackChosen}`;
  }
  if (musicContainer.classList.contains("normal-mode")) {
    imgContainer.className = `img-container speed-${playBackChosen}`;
  }
  playBackBtn.style.backgroundImage = `url(${playbackIcons[playBackChosen]})`;

  let currentWidth = progress.style.width.split("%").join("");
  let totalTime = audio.duration;

  let currentTime = (totalTime * currentWidth) / 100;
  audio.currentTime = currentTime;
  playSong();
}

function playSong() {
  audio.playbackRate = playbackRates[playBackChosen];

  musicContainer.classList.add("playing");
  audio.play();
}

function pauseSong() {
  audio.pause();
  musicContainer.classList.remove("playing");
}

function nextSong() {
  if (playlistMode) {
    setTimeout(() => {
      if (changeSchemes[currentSchemeIndex] === "normal") {
        playlistSongIndex = (playlistSongIndex + 1) % playlistArray.length;
      } else if (changeSchemes[currentSchemeIndex] === "shuffle") {
        playlistSongIndex = Math.floor(Math.random() * playlistArray.length);
      } else if (changeSchemes[currentSchemeIndex] === "repeat") {
        playlistSongIndex = playlistSongIndex;
      }
      loadSong(songs[playlistArray[playlistSongIndex]]);
      playSong();
    }, 200);
  } else {
    setTimeout(() => {
      if (changeSchemes[currentSchemeIndex] === "normal") {
        songIndex = (songIndex + 1) % songs.length;
      } else if (changeSchemes[currentSchemeIndex] === "shuffle") {
        songIndex = Math.floor(Math.random() * songs.length);
      } else if (changeSchemes[currentSchemeIndex] === "repeat") {
        songIndex = songIndex;
      }
      loadSong(songs[songIndex]);
      playSong();
    }, 200);
  }
}

function previousSong() {
  if (changeSchemes[currentSchemeIndex] === "normal") {
    songIndex = (songs.length + (songIndex - 1)) % songs.length;
  } else if (changeSchemes[currentSchemeIndex] === "shuffle") {
    songIndex = Math.floor(Math.random() * songs.length);
  } else if (changeSchemes[currentSchemeIndex] === "repeat") {
    songIndex = songIndex;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function findSong(songWord) {
  const toclear = searchContainer.getElementsByClassName("suggestion");
  for (let i = 0; i < toclear.length; i++) {
    clearSuggestion(toclear[i]);
  }
  if (songWord.length > 2) {
    for (let i = 0; i < toclear.length; i++) {
      if (toclear[i].innerHTML.toLowerCase().includes(songWord.toLowerCase())) {
        toclear[i].style.display = "block";
      } else {
        toclear[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < toclear.length; i++) {
      clearSuggestion(toclear[i]);
    }
    for (let i = 0; i < toclear.length; i++) {
      toclear[i].style.display = "block";
    }
  }
}

function displaySuggestion(songTitle, songPosition) {
  const newSuggestion = document.createElement("div");
  newSuggestion.classList.add("suggestion");
  newSuggestion.setAttribute("songIndex", songPosition);
  newSuggestion.setAttribute("tab-index", songPosition);

  const addToPlaylistBtn = document.createElement("button");
  addToPlaylistBtn.className = "add-to-playlist";
  newSuggestion.innerHTML = songTitle.split("-").join("<br>");
  newSuggestion.appendChild(addToPlaylistBtn);
  searchContainer.appendChild(newSuggestion);
}

function clearSuggestion(suggestionDOM) {
  suggestionDOM.style.display = "none";
}

function populateSong() {
  songs.forEach((song, index) => {
    displaySuggestion(song, index);
  });
}

function toggleSuggestionsFront() {
  for (let i = 0; i < suggestions.length; i++) {
    suggestions[i].style.left = "0px";
  }
}
function toggleSuggestionsBack() {
  for (let i = 0; i < suggestions.length; i++) {
    suggestions[i].style.left = "-450px";
  }
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function skipTo(e) {
  const totalWidth = this.clientWidth;
  const skippedWidth = e.offsetX;
  const totalDuration = audio.duration;

  const progressPercent = (skippedWidth / totalWidth) * totalDuration;

  audio.currentTime = progressPercent.toFixed(2);
}

function toggleEqualizer(eqBtn) {
  const eq = document.getElementsByClassName("grid")[0];

  if (eq.style.display !== "grid") {
    eq.style.display = "grid";
    musicContainer.style.filter = "blur(2px)";
    if (!musicContainer.classList.contains("stick-to-bottom")) {
      if (musicContainer.classList.contains("awesome-mix-mode")) {
        eq.style.top = "40vh";
      } else {
        eq.style.bottom = getBoundary(imgContainer).top + 100 + "px";
      }
    } else {
      eq.style.bottom = "30vh";
    }
  } else {
    musicContainer.style.filter = "blur(0px)";
    eq.style.display = "none";
  }
}

function playListSound() {
  const playListSound = new Audio("./res/sounds/click1.wav");
  playListSound.play();
}

// scheme button event listeners
chooseScheme.addEventListener("click", toggleSchemeButtons);
normalScheme.addEventListener("click", () => {
  changeScheme(0);
  toggleSchemeButtons();
});
shuffleScheme.addEventListener("click", () => {
  changeScheme(1);
  toggleSchemeButtons();
});
repeatScheme.addEventListener("click", () => {
  changeScheme(2);
  toggleSchemeButtons();
});

// BUTTON event listeners

playBackBtn.addEventListener("click", changePlaybackRate);

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("playing");

  if (!isPlaying) {
    setupContext();
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", previousSong);

eqToggleBtn.addEventListener("click", (eqToggleEvent) => {
  toggleEqualizer(eqToggleEvent.target);
});

//update progress bar while the song is playing

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("mouseup", skipTo);

themeToggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.className = "paper night";
    displayHint(`Dark theme`);
    themeToggleBtn.classList.add("active");
  } else {
    document.body.className = "paper day";
    displayHint(`Daylight theme`);
    themeToggleBtn.classList.remove("active");
  }
});

randomPlayToggleBtn.addEventListener("click", (randomPlayBtnClk) => {
  randomPlayMode = !randomPlayMode;
  if (randomPlayMode) {
    file.style.top =
      getBoundary(randomPlayBtnClk.target.parentNode).top - 70 + "px";
    displayHint(`upload a file to play`);
    randomPlayToggleBtn.classList.add("active");
  } else {
    file.style.top = "-10vh";
    randomPlayToggleBtn.classList.remove("active");
  }
});

bubblesToggleBtn.addEventListener("click", () => {
  bubbleMode = !bubbleMode;
  if (bubbleMode) {
    bubblesToggleBtn.classList.add("active");
    startBubbles();
  } else {
    bubblesToggleBtn.classList.remove("active");
    endBubbles();
  }
});
rainToggleBtn.addEventListener("click", () => {
  rainMode = !rainMode;
  if (rainMode) {
    rainToggleBtn.classList.add("active");
    initRain();
  } else {
    rainToggleBtn.classList.remove("active");
    endRain();
  }
});
visualizerToggleBtn.addEventListener("click", () => {
  visualizerMode = !visualizerMode;
  if (visualizerMode) {
    if (circularVisualizer) {
      circularVisualizerToggleBtn.click();
    }
    normalVisualizer = true;
    visualizerToggleBtn.classList.add("active");
    renderFrame();
  } else {
    normalVisualizer = false;
    visualizerToggleBtn.classList.remove("active");
    clearCanvas();
  }
});
circularVisualizerToggleBtn.addEventListener("click", () => {
  visualizerMode = !visualizerMode;
  if (visualizerMode) {
    if (normalVisualizer) {
      visualizerToggleBtn.click();
    }
    circularVisualizer = true;
    document.getElementById("canvas").classList.add("circular");
    circularVisualizerToggleBtn.classList.add("active");
    renderFrame();
  } else {
    circularVisualizer = false;
    document.getElementById("canvas").classList.remove("circular");
    circularVisualizerToggleBtn.classList.remove("active");
    clearCanvas();
  }
});
carouselToggleBtn.addEventListener("click", () => {
  carouselMode = !carouselMode;
  if (carouselMode) {
    musicContainer.classList.remove("stick-to-center");
    musicContainer.classList.add("stick-to-bottom");
    carouselToggleBtn.classList.add("active");
    startCarousel();
  } else {
    musicContainer.classList.remove("stick-to-bottom");
    musicContainer.classList.add("stick-to-center");
    carouselToggleBtn.classList.remove("active");
    stopCarousel();
  }
});
awesomeMixToggleBtn.addEventListener("click", () => {
  awesomeMixMode = !awesomeMixMode;
  if (awesomeMixMode) {
    awesomeMixToggleBtn.classList.add("active");
    initAwesomeMixCasettePlayer();
    musicContainer.className = "awesome-mix-mode";
  } else {
    awesomeMixToggleBtn.classList.remove("active");
    stopAwesomeMixCasettePlayer();
    initNormalPlayer();
    musicContainer.className = "normal-mode";
  }
});

populateSong();
