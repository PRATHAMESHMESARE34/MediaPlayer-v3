/*==================================================
        MEDIA PLAYER V4
        LYRICS.JS
==================================================*/
/*=========================
        WAKE LOCK
=========================*/

let wakeLock = null;

async function enableWakeLock(){

    try{

        if("wakeLock" in navigator){

            wakeLock = await navigator.wakeLock.request("screen");

            console.log("Wake Lock Enabled");

        }

    }

    catch(err){

        console.log("Wake Lock Error:", err);

    }

}

async function disableWakeLock(){

    if(wakeLock){

        await wakeLock.release();

        wakeLock = null;

        console.log("Wake Lock Disabled");

    }

}

/*=========================
        DATA
=========================*/

let lyrics = [];
let currentLyric = -1;

/*=========================
        ELEMENTS
=========================*/
const lyricsContent = document.getElementById("lyricsContent");

/*=========================
        PANEL
=========================*/

lyricsBtn.addEventListener("click", () => {

    lyricsPanel.classList.add("show");
    enableWakeLock();

});

closeLyrics.addEventListener("click", () => {

    lyricsPanel.classList.remove("show");
    disableWakeLock();

});

/*=========================
        LOAD LYRICS
=========================*/

async function loadLyrics(path){

    lyrics = [];

    currentLyric = -1;

    lyricsContent.innerHTML =
    "<div class='lyric-line'>Loading Lyrics...</div>";

    if(!path){

        lyricsContent.innerHTML =
        "<div class='lyric-line active'>No Lyrics Available</div>";

        return;

    }

    try{

        const response = await fetch(path);

        if(!response.ok){

            throw new Error("Lyrics not found");

        }

        const text = await response.text();

        parseLyrics(text);

    }

    catch(error){

        lyricsContent.innerHTML =
        "<div class='lyric-line active'>No Lyrics Available</div>";

        console.error(error);

    }

}

lyricsPanel.addEventListener("click", (e) => {

    if(e.target === lyricsPanel){

        lyricsPanel.classList.remove("show");

    }

});

/*=========================
        PARSE LRC
=========================*/

function parseLyrics(text){

    lyrics = [];

    const lines = text.split("\n");

    const regex =
    /\[(\d+):(\d+\.\d+)\](.*)/;

    lines.forEach(line=>{

        const match = line.match(regex);

        if(!match) return;

        const minutes =
        Number(match[1]);

        const seconds =
        Number(match[2]);

        const time =
        minutes*60+seconds;

        lyrics.push({

            time,

            text: match[3].trim()

        });

    });

    lyrics.sort((a,b)=>a.time-b.time);

}

/*=========================
        UPDATE LYRICS
=========================*/

function updateLyrics(){

    if(!lyrics.length) return;

    const time = audio.currentTime;

    for(let i=0;i<lyrics.length;i++){

        if(
            i===lyrics.length-1 ||
            (time>=lyrics[i].time && time<lyrics[i+1].time)
        ){

            if(currentLyric!==i){

                currentLyric=i;

                renderLyrics();

            }

            break;

        }

    }

}

/*=========================
        RENDER
=========================*/

function renderLyrics(){

    lyricsContent.innerHTML="";

    for(let i=currentLyric-2;i<=currentLyric+3;i++){

        if(i<0 || i>=lyrics.length) continue;

        const div=document.createElement("div");

        div.className="lyric-line";

        if(i===currentLyric){

            div.classList.add("active");

        }

        div.textContent=lyrics[i].text;

        lyricsContent.appendChild(div);

    }

}

/*=========================
    AUDIO TIME UPDATE
=========================*/

audio.addEventListener("timeupdate", updateLyrics);

document.addEventListener("visibilitychange", async () => {

    if(
        wakeLock !== null &&
        document.visibilityState === "visible" &&
        lyricsPanel.classList.contains("show")
    ){

        enableWakeLock();

    }

});
