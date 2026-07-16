"use strict";

/*==================================================
        MEDIA PLAYER V4
        ELEMENTS.JS
==================================================*/

/*=========================================
            PLAYER
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

const bpmSlider = document.getElementById("bpmSlider");
const bpmValue = document.getElementById("bpmValue");

/*=========================================
            PLAYLIST
=========================================*/

const playlist = document.getElementById("playlist");
const searchBox = document.getElementById("searchBox");

/*=========================================
            OWNER
=========================================*/

const logo = document.getElementById("logo");

const ownerLogin = document.getElementById("ownerLogin");
const ownerPassword = document.getElementById("ownerPassword");
const loginBtn = document.getElementById("loginBtn");

const ownerDashboard = document.getElementById("ownerDashboard");
const uploadModal = document.getElementById("uploadModal");

const uploadSongsBtn = document.getElementById("uploadSongsBtn");

/*=========================================
            UPLOAD
=========================================*/

const songUpload = document.getElementById("songUpload");

const uploadTitle = document.getElementById("uploadTitle");
const uploadArtist = document.getElementById("uploadArtist");
const uploadBPM = document.getElementById("uploadBPM");

const coverUpload = document.getElementById("coverUpload");
const lyricsUpload = document.getElementById("lyricsUpload");

const libraryType = document.getElementById("libraryType");

const generateJsonBtn = document.getElementById("generateJsonBtn");
const copyJsonBtn = document.getElementById("copyJsonBtn");
const jsonOutput = document.getElementById("jsonOutput");

const coverPreview = document.getElementById("coverPreview");

/*=========================================
              BPM plus/minus
=========================================*/

const minusBPM =
document.getElementById("minusBPM");

const plusBPM =
document.getElementById("plusBPM");

