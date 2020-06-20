let popup = document.getElementById('popup');

// hide popup on click close 
document.getElementById('close').onclick = function() {
    popup.classList.remove('active');
};

function positionPopup (){
    if(popup.offsetHeight >= window.innerHeight) {
        popup.classList.add('top');
    }
}

positionPopup ();
