function formatTime(time){

    if(isNaN(time)) return "00:00";

    let min=Math.floor(time/60);

    let sec=Math.floor(time%60);

    if(sec<10) sec="0"+sec;

    return min+":"+sec;

}

function highlightSong(){

    const cards=document.querySelectorAll(".song-card");

    cards.forEach(card=>card.classList.remove("active"));

    if(cards[currentSong]){

        cards[currentSong].classList.add("active");

    }

}