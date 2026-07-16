"use strict";

/*==================================================
        MEDIA PLAYER V4
        UPLOAD.JS
==================================================*/


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











