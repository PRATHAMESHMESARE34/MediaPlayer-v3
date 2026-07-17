/*==================================================
                LYRICS PANEL
==================================================*/

console.log("lyrics.js loaded");

if (lyricsBtn && lyricsPanel && closeLyrics) {

    lyricsBtn.addEventListener("click", () => {

        console.log("Lyrics button clicked");

        lyricsPanel.classList.add("show");

    });

    closeLyrics.addEventListener("click", () => {

        lyricsPanel.classList.remove("show");

    });

    lyricsPanel.addEventListener("click", (e) => {

        if (e.target === lyricsPanel) {
            lyricsPanel.classList.remove("show");
        }

    });

} else {
    console.error("Lyrics elements not found");
}
