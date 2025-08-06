document.querySelectorAll('.g').forEach(div => {
    const audio = new Audio('assets/sound/hover.wav');

    div.addEventListener('mouseenter', () => {
        audio.currentTime = 0; 
        audio.play();
    });

    const musica = document.getElementById('menuMusic');
    musica.volume = 0.15;
});
