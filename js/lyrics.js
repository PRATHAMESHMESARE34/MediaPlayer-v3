/*==================================================
        MEDIA PLAYER V4
        LYRICS.JS
==================================================*/

/*=========================
        DATA
=========================*/

let lyrics = [];
let currentLyric = -1;

/*=========================
        ELEMENTS
=========================*/

const lyricsBtn = document.getElementById("lyricsBtn");
const lyricsPanel = document.getElementById("lyricsPanel");
const closeLyrics = document.getElementById("closeLyrics");
const lyricsContent = document.getElementById("lyricsContent");

/*=========================
        PANEL
=========================*/

lyricsBtn.addEventListener("click", () => {

    lyricsPanel.classList.add("show");

});

closeLyrics.addEventListener("click", () => {

    lyricsPanel.classList.remove("show");

});

lyricsPanel.addEventListener("click", (e) => {

    if(e.target === lyricsPanel){

        lyricsPanel.classList.remove("show");

    }

});
