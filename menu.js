document.querySelectorAll('.g').forEach(div => {
    const audio = new Audio('assets/sound/hover.wav');

    div.addEventListener('mouseenter', () => {
        audio.currentTime = 0; 
        audio.play();
    });
    div.addEventListener('click', () => {
        const modalId = div.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    });

    const musica = document.getElementById('menuMusic');
    if (musica) {
        musica.volume = 0.15;
    }
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});


document.querySelectorAll('.sair').forEach(botao => {
    botao.addEventListener('click', () => {
        const modal = botao.closest('.modal-overlay'); // sobe até o modal mais próximo
        if (modal) {
            modal.classList.remove('active');
        }
    });
    });

    


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

