/*==================================================
        MEDIA PLAYER V3
        SCRIPT.JS
        PART 1
==================================================*/



const songUpload =
document.getElementById("songUpload");


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












