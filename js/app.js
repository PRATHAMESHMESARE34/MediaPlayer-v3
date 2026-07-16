/*==================================================
        MEDIA PLAYER V4
        APP.JS
==================================================*/

/*=========================================
        START APPLICATION
=========================================*/

window.addEventListener("load", async () => {

    await loadPlaylist();

    setTimeout(() => {

        document
            .getElementById("loading-screen")
            .classList
            .add("fade-out");

    }, 1200);

});
