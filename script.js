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
        JSON GENERATOR
=========================================*/

const generateJsonBtn =
document.getElementById("generateJsonBtn");

const copyJsonBtn =
document.getElementById("copyJsonBtn");

const jsonOutput =
document.getElementById("jsonOutput");

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

/*=========================================
        UPLOAD FORM
=========================================*/


const coverPreview =
document.getElementById("coverPreview");

let ownerMode = false;

let pressTimer;



/*=========================================
        OWNER PASSWORD
=========================================*/

const OWNER_PASSWORD = "1234";


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

/*=========================================
        COVER PREVIEW
=========================================*/

coverUpload.addEventListener("change",()=>{

    const file = coverUpload.files[0];

    if(!file) return;

    coverPreview.src = URL.createObjectURL(file);

});

/*=========================================
        GENERATE JSON
=========================================*/

generateJsonBtn.addEventListener("click",()=>{

    if(!songUpload.files.length){

        alert("Please select a song.");

        return;

    }

    const songName =
    songUpload.files[0].name;

    const coverName =
    coverUpload.files.length
    ? coverUpload.files[0].name
    : "default-cover.png";

    const lyricsName =
    lyricsUpload.files.length
    ? lyricsUpload.files[0].name
    : "";

    const json = {

        title: uploadTitle.value,

        artist: uploadArtist.value,

        bpm: Number(uploadBPM.value),

        src: "assets/songs/" + songName,

        cover: "assets/images/" + coverName,

        lyrics: lyricsName
            ? "assets/Lyrics/" + lyricsName
            : "",

        library: libraryType.value

    };

    jsonOutput.value =
    JSON.stringify(json,null,2);

});

/*=========================================
        COPY JSON
=========================================*/

copyJsonBtn.addEventListener("click",()=>{

    if(jsonOutput.value===""){

        alert("Generate JSON first.");

        return;

    }

    navigator.clipboard.writeText(jsonOutput.value);

    alert("✅ JSON copied!");

});












