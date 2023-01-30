let trackArt = document.querySelector(".track-art")
let trackArtImg = document.querySelector(".track-art .imgWrapper")
let trackName = document.querySelector(".track-name")
let trackArtist = document.querySelector(".track-artist")
let currentTime = document.querySelector(".current-time")
let seekSlider = document.querySelector(".seek_slider")
let totalDuration = document.querySelector(".total-duration")
let volumeSlider = document.querySelector(".volume_slider")
let player = document.querySelector(".player");
let wrapper = document.querySelector(".wrapper");

// buttons
let random = document.querySelector(".fa-random")
let backward = document.querySelector(".fa-step-backward")
let play = document.querySelector(".fa-play")
let fordward = document.querySelector(".fa-step-fordward")
let repeat = document.querySelector(".fa-repeat")

// visualizer
let visualizer = document.querySelector(".visualizer")

let source = [{
        photo: './assets/fallingdown.jpg',
        name: 'Falling Down',
        artist: 'Wid Cards',
        file: './assets/fallingdown.mp3'
    },
    {
        photo: './assets/stay.png',
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        file: './assets/stay.mp3'
    },
    {
        photo: './assets/faded.png',
        name: 'Faded',
        artist: 'Alan Walker',
        file: './assets/Faded.mp3'
    },
    {
        photo: './assets/ratherbe.jpg',
        name: 'Rather Be',
        artist: 'Clean Bandit',
        file: './assets/Rather Be.mp3'
    }
];

let playing = false;
let randomAud = true;

function randomCheck() {
    randomAud = !randomAud;
    random.classList.toggle("checked", !randomAud);
}

let musicFile = new Audio(source[0]["file"]);
updateTrackInfo()

// play and pause the music file, update the UI
play.addEventListener("click", () => {
    playing ? Pause() : Play()
})

function Play() {
    musicFile.play()
    playing = true;
    play.classList = `fa fa-pause fa-3x`
    visualizer.classList.add("loader")
    trackArtImg.classList.add("rotate")
}

function Pause() {
    musicFile.pause()
    playing = false;
    play.classList = `fa fa-play fa-3x`;
    visualizer.classList.remove("loader");
    trackArtImg.classList.remove("rotate")
}

// move to the next track, update the UI and audio source
function next() {
    if (!randomAud) {
        randomSource()
    } else {
        source.push(source.shift());
    }
    backgroundColorChanger()
    updateTrackInfo()
    Pause()
    Play()
}

// move to the previous track, update the UI and audio source
function back() {
    source.unshift(source.pop());
    backgroundColorChanger()
    updateTrackInfo()
    Pause()
    Play()
}

// repeat the current track
function repeatAudio() {
    musicFile.currentTime = 0;
}

// choose the random track from the source array
function randomSource() {
    let randomNum = Math.floor(Math.random() * (source.length - 1)) + 1;
    source.unshift(source.splice(randomNum, 1)[0])
}

//function to change the color of background
function backgroundColorChanger() {
    let randomHex1 = Math.floor(Math.random() * 16000000).toString(16);
    let randomHex2 = Math.floor(Math.random() * 16000000).toString(16);
    let angle1 = '45deg';
    let angle2 = '-45deg';
    player.style.background = `linear-gradient(${angle1},#${randomHex1} ,#${randomHex2} )`;
    // wrapper.style.background = `linear-gradient(${angle2},#${randomHex1} ,#${randomHex2})`;
}
backgroundColorChanger()

// volume controler
volumeSlider.addEventListener("input", () => {
    musicFile.volume = Number(volumeSlider.value) / 100;
})


musicFile.ontimeupdate = () => {
    currentTime.innerHTML = formatTime(musicFile.currentTime);
    seekSlider.value = (musicFile.currentTime / musicFile.duration) * 100;
    if(musicFile.currentTime == musicFile.duration) next()
};

musicFile.onloadedmetadata = () => {
    totalDuration.innerHTML = formatTime(musicFile.duration);
};

seekSlider.oninput = () => {
    musicFile.currentTime = (seekSlider.value * musicFile.duration) / 100;
};

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateTrackInfo() {
    musicFile.src = source[0]["file"];
    trackName.textContent = source[0]["name"];
    trackArtist.textContent = source[0]["artist"];
    trackArtImg.innerHTML = `<img src=${source[0]["photo"]}>`;
}