
/*==================================================
                LYRICS PANEL
==================================================*/

lyricsBtn.addEventListener("click",()=>{

    lyricsPanel.classList.add("show");

});

closeLyrics.addEventListener("click",()=>{

    lyricsPanel.classList.remove("show");

});

lyricsPanel.addEventListener("click",(e)=>{

    if(e.target===lyricsPanel){

        lyricsPanel.classList.remove("show");

    }

});
