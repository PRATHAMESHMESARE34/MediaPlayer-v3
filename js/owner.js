"use strict";

/*==================================================
        MEDIA PLAYER V4
        OWNER.JS
==================================================*/



/*=======================================================================
                            OWNER DATA
========================================================================*/

let ownerMode = false;

let pressTimer;

const OWNER_PASSWORD = "1234";


logo.addEventListener("mousedown",()=>{

    pressTimer = setTimeout(()=>{

        ownerLogin.classList.add("show");

    },3000);

});

logo.addEventListener("mouseup",()=>{

    clearTimeout(pressTimer);

});

logo.addEventListener("mouseleave",()=>{

    clearTimeout(pressTimer);

});


loginBtn.addEventListener("click",()=>{

    if(ownerPassword.value===OWNER_PASSWORD){

        ownerMode = true;

        ownerPassword.value = "";

        ownerLogin.classList.remove("show");

        ownerDashboard.classList.add("show");

    }

    else{

        alert("Wrong Password");

        ownerPassword.value = "";

    }

});


ownerLogin.addEventListener("click",(e)=>{

    if(e.target===ownerLogin){

        ownerLogin.classList.remove("show");

    }

});

logoutBtn.addEventListener("click",()=>{

    ownerMode = false;

    ownerDashboard.classList.remove("show");

});

uploadSongsBtn.addEventListener("click",()=>{

    ownerDashboard.classList.remove("show");

    uploadModal.classList.add("show");

});


uploadModal.addEventListener("click",(e)=>{

    if(e.target===uploadModal){

        uploadModal.classList.remove("show");

        ownerDashboard.classList.add("show");

    }

});


ownerDashboard.addEventListener("click",(e)=>{

    if(e.target===ownerDashboard){

        ownerDashboard.classList.remove("show");

    }

});
