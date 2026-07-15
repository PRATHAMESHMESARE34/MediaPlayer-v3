/*==================================================
        MEDIA PLAYER V3
        SCRIPT.JS
        PART 1
==================================================*/


/*=========================================
            ELEMENTS
=========================================*/

const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const playlist = document.getElementById("playlist");

const bpmSlider = document.getElementById("bpmSlider");
const bpmValue = document.getElementById("bpmValue");


/*=========================================
        OWNER LOGIN
=========================================*/

const logo = document.getElementById("logo");

const ownerLogin = document.getElementById("ownerLogin");

const ownerPassword =
document.getElementById("ownerPassword");

const loginBtn =
document.getElementById("loginBtn");

const uploadModal =
document.getElementById("uploadModal");
/*=========================================
        OWNER DASHBOARD
=========================================*/

const ownerDashboard =
document.getElementById("ownerDashboard");

const uploadSongsBtn =
document.getElementById("uploadSongsBtn");

const privateLibraryBtn =
document.getElementById("privateLibraryBtn");

const bpmManagerBtn =
document.getElementById("bpmManagerBtn");

const deleteSongsBtn =
document.getElementById("deleteSongsBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const songUpload =
document.getElementById("songUpload");

const dropZone =
document.getElementById("dropZone");

/*=========================================
        UPLOAD FORM
=========================================*/

const uploadTitle =
document.getElementById("uploadTitle");

const uploadArtist =
document.getElementById("uploadArtist");

const uploadBPM =
document.getElementById("uploadBPM");

const coverUpload =
document.getElementById("coverUpload");

const lyricsUpload =
document.getElementById("lyricsUpload");

const libraryType =
document.getElementById("libraryType");

const saveSongBtn =
document.getElementById("saveSongBtn");

let ownerMode = false;

let pressTimer;



/*=========================================
        OWNER PASSWORD
=========================================*/

const OWNER_PASSWORD = "1234";







/*=========================================
        LOAD PLAYLIST FROM JSON
=========================================*/

async function loadPlaylist(){

    try{

        const response = await fetch("data/playlist.json");

        songs = await response.json();

        renderPlaylist();

        loadSong(0);

    }

    catch(error){

        console.error("Playlist Error:", error);

    }

}



/*=========================================
            PLAYER DATA
=========================================*/

let songs = [];

let currentSong = 0;

let isPlaying = false;



/*=========================================
        LOAD SONG
=========================================*/

function loadSong(index){

    if(!songs.length) return;

    const song = songs[index];

    audio.src = song.src;

    albumArt.src = song.cover;

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    bpmSlider.value = song.bpm;

    bpmValue.textContent = song.bpm;

    highlightSong();

}



/*=========================================
        PLAY
=========================================*/

function playSong(){

    audio.play().catch(err => console.log(err));

    isPlaying = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    albumArt.classList.add("playing");

    playBtn.classList.add("playing");

}



/*=========================================
        PAUSE
=========================================*/

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    albumArt.classList.remove("playing");

    playBtn.classList.remove("playing");

}



/*=========================================
        PLAY BUTTON
=========================================*/

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});



/*=========================================
        NEXT
=========================================*/

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

});



/*=========================================
        PREVIOUS
=========================================*/

previousBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

});



/*=========================================
        UPDATE PROGRESS
=========================================*/

audio.addEventListener("timeupdate",()=>{

    const progress =
    (audio.currentTime/audio.duration)*100;

    progressBar.value=progress;

    currentTime.textContent=
    formatTime(audio.currentTime);

});



/*=========================================
        SEEK
=========================================*/

progressBar.addEventListener("input",()=>{

    audio.currentTime=
    (progressBar.value/100)*audio.duration;

});



/*=========================================
        SONG FINISHED
=========================================*/

audio.addEventListener("ended",()=>{

    nextBtn.click();

});



/*=========================================
        DURATION
=========================================*/

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent=
    formatTime(audio.duration);

});



/*=========================================
        FORMAT TIME
=========================================*/

function formatTime(time){

    if(isNaN(time)) return "00:00";

    let min=Math.floor(time/60);

    let sec=Math.floor(time%60);

    if(sec<10) sec="0"+sec;

    return min+":"+sec;

}



/*=========================================
        BPM
=========================================*/

bpmSlider.addEventListener("input",()=>{

    bpmValue.textContent=bpmSlider.value;

});



/*=========================================
        PLAYLIST
=========================================*/

function renderPlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        const card=document.createElement("div");

        card.className="song-card";

        card.innerHTML=`

            <img src="${song.cover}">

            <div class="song-info">

                <h4>${song.title}</h4>

                <p>${song.artist}</p>

            </div>

        `;

        card.onclick=()=>{

            currentSong=index;

            loadSong(index);

            playSong();

        };

        playlist.appendChild(card);

    });

}


/*=========================================
            FAVORITES
=========================================*/

let favorites = [];

function toggleFavorite(id){

    if(favorites.includes(id)){

        favorites = favorites.filter(x=>x!==id);

    }

    else{

        favorites.push(id);

    }

    localStorage.setItem(

        "favorites",

        JSON.stringify(favorites)

    );

}


/*=========================================
        SEARCH
=========================================*/

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input",()=>{

    const value = searchBox.value.toLowerCase();

    const cards = document.querySelectorAll(".song-card");

    cards.forEach(card=>{

        const text = card.innerText.toLowerCase();

        if(text.includes(value)){

            card.style.display="flex";

        }

        else{

            card.style.display="none";

        }

    });

});


/*=========================================
        RESTORE FAVORITES
=========================================*/

const savedFavorites = JSON.parse(
    localStorage.getItem("favorites")
);

if(savedFavorites){

    favorites = savedFavorites;

}




/*=========================================
        HIGHLIGHT
=========================================*/

function highlightSong(){

    const cards=document.querySelectorAll(".song-card");

    cards.forEach(card=>card.classList.remove("active"));

    if(cards[currentSong]){

        cards[currentSong].classList.add("active");

    }

}



/*=========================================
        KEYBOARD
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        playBtn.click();

    }

    if(e.code==="ArrowRight"){

        nextBtn.click();

    }

    if(e.code==="ArrowLeft"){

        previousBtn.click();

    }

    if(e.key==="Escape"){

        ownerLogin.classList.remove("show");

    }

});


/*=========================================
        LONG PRESS LOGO
=========================================*/

logo.addEventListener("mousedown",()=>{

    pressTimer = setTimeout(()=>{

        ownerLogin.classList.add("show");

    },3000);

});

logo.addEventListener("mouseup",()=>{

    clearTimeout(pressTimer);

});

logo.addEventListener("mouseleave",()=>{

    clearTimeout(pressTimer);

});



/*=========================================
        LOGIN
=========================================*/

loginBtn.addEventListener("click",()=>{

    if(ownerPassword.value===OWNER_PASSWORD){

        ownerMode=true;

        ownerPassword.value="";

        ownerLogin.classList.remove("show");

        ownerDashboard.classList.add("show");

    }else{

        alert("Wrong Password");

        ownerPassword.value="";

    }

});


/*=========================================
        CLOSE MODAL
=========================================*/

ownerLogin.addEventListener("click",(e)=>{

    if(e.target===ownerLogin){

        ownerLogin.classList.remove("show");

    }

});

/*=========================================
        LOGOUT
=========================================*/

logoutBtn.addEventListener("click",()=>{

    ownerMode = false;

    ownerDashboard.classList.remove("show");

});

/*=========================================
        OPEN UPLOAD WINDOW
=========================================*/

uploadSongsBtn.addEventListener("click",()=>{

    ownerDashboard.classList.remove("show");

    uploadModal.classList.add("show");

});

/*=========================================
        CLOSE UPLOAD WINDOW
=========================================*/

uploadModal.addEventListener("click",(e)=>{

    if(e.target===uploadModal){

        uploadModal.classList.remove("show");

        ownerDashboard.classList.add("show");

    }

});


/*=========================================
        CLOSE DASHBOARD
=========================================*/

ownerDashboard.addEventListener("click",(e)=>{

    if(e.target===ownerDashboard){

        ownerDashboard.classList.remove("show");

    }

});

/*=========================================
        LOADING SCREEN
=========================================*/

window.addEventListener("load",async()=>{

    await loadPlaylist();

    setTimeout(()=>{

        document
        .getElementById("loading-screen")
        .classList
        .add("fade-out");

    },1200);

});












