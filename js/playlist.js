"use strict";

/*==================================================
        MEDIA PLAYER V4
        PLAYLIST.JS
==================================================*/
/*=======================================================================
                               DATA
========================================================================*/

let songs = [];
let currentSong = 0;
let favorites = [];
/*=======================================================================
                               Load Playlist
========================================================================*/

async function loadPlaylist() {

    try {

        const response = await fetch("data/playlist.json");

        songs = await response.json();

        if(!songs.length) return;

        renderPlaylist();

        loadSong(0);

    }

    catch(error) {

        console.error("Failed to load playlist:", error);

    }

}

/*=======================================================================
                               render Playlist
========================================================================*/

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

card.addEventListener("click",()=>{

    currentSong = index;

    loadSong(index);

    playSong();

});

        playlist.appendChild(card);

    });

}


/*=======================================================================
                               highlight song
========================================================================*/
function highlightSong(){

    const cards=document.querySelectorAll(".song-card");

    cards.forEach(card=>card.classList.remove("active"));

    if(cards[currentSong]){

        cards[currentSong].classList.add("active");

    }

}



/*=======================================================================
                               search
========================================================================*/


searchBox.addEventListener("input",()=>{

    const value = searchBox.value.toLowerCase();

    const cards = document.querySelectorAll(".song-card");

    cards.forEach(card=>{

        const text = card.textContent.toLowerCase();

        if(text.includes(value)){

            card.style.display="flex";

        }

        else{

            card.style.display="none";

        }

    });

});

/*=======================================================================
                               favorites
========================================================================*/

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


const savedFavorites = JSON.parse(
    localStorage.getItem("favorites")
);

if(savedFavorites){

    favorites = savedFavorites;

}


