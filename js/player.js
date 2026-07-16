/*==================================================
        MEDIA PLAYER V4
        PLAYER.JS
==================================================*/
/*------------------------player data------------------------*/

let isPlaying = false;

/*------------------------audio settings------------------------*/

audio.preservesPitch = true;

if ("mozPreservesPitch" in audio) {
    audio.mozPreservesPitch = true;
}

if ("webkitPreservesPitch" in audio) {
    audio.webkitPreservesPitch = true;
}

/*================================================*/



/*------------------------load song------------------------*/

function loadSong(index){

    if(!songs.length) return;

    const song = songs[index];

    audio.src = song.src;
    albumArt.src = song.cover;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    const originalBPM = Number(song.bpm);

    bpmSlider.value = originalBPM;
    bpmValue.textContent = originalBPM;

    audio.playbackRate = 1;

    highlightSong();

}

/*------------------------play song------------------------*/

function playSong(){

    audio.play().catch(err => console.log(err));

    isPlaying = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    albumArt.classList.add("playing");

    playBtn.classList.add("playing");

}


/*------------------------pause song------------------------*/

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    albumArt.classList.remove("playing");

    playBtn.classList.remove("playing");

}


/*------------------------play button event------------------------*/

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});


/*------------------------next button------------------------*/


nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

});


/*------------------------previous button------------------------*/

previousBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

});


/*------------------------update progress------------------------*/

audio.addEventListener("timeupdate",()=>{

    const progress =
    (audio.currentTime/audio.duration)*100;

    progressBar.value=progress;

    currentTime.textContent=
    formatTime(audio.currentTime);

});

/*------------------------seek------------------------*/

progressBar.addEventListener("input",()=>{

    audio.currentTime=
    (progressBar.value/100)*audio.duration;

});


/*------------------------song ended------------------------*/

audio.addEventListener("ended",()=>{

    nextBtn.click();

});


/*------------------------load media data------------------------*/

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent=
    formatTime(audio.duration);

});


/*------------------------BPM slider------------------------*/

bpmSlider.addEventListener("input", () => {

const currentBPM = Number(bpmSlider.value);
const originalBPM = Number(songs[currentSong].bpm);

audio.playbackRate = currentBPM / originalBPM;

bpmValue.textContent = currentBPM;

});




/*==================================================
                END PLAYER.JS
==================================================*/
