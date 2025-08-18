let volumeSom = 50;
let volumeMusica = 0;
let audioHover = null;
let musicaMenu = null;

document.addEventListener("DOMContentLoaded", function() {
    inicializarAudio();
    configurarEventosModosJogo();
    configurarEventosModais();
    configurarEventosConfiguracoes();
    configurarTeclasRapidas();
});

function inicializarAudio() {
    audioHover = new Audio("assets/sound/hover.wav");
    musicaMenu = document.getElementById("menuMusic");
    
    if (musicaMenu) {
        musicaMenu.volume = volumeMusica / 100;
    }
}

function configurarEventosModosJogo() {
    const modosJogo = document.querySelectorAll(".modo-jogo");
    
    modosJogo.forEach(modoJogo => {
        modoJogo.addEventListener("mouseenter", () => {
            reproduzirSomHover();
        });
        
        modoJogo.addEventListener("click", () => {
            const idModal = modoJogo.getAttribute("data-modal");
            abrirModal(idModal);
        });
    });
}

function configurarEventosModais() {
    const sobreposicoesModal = document.querySelectorAll(".sobreposicao-modal");
    
    sobreposicoesModal.forEach(sobreposicao => {
        sobreposicao.addEventListener("click", (evento) => {
            if (evento.target === sobreposicao) {
                fecharModal(sobreposicao);
            }
        });
    });
    
    const botoesVoltar = document.querySelectorAll(".botao-voltar");
    botoesVoltar.forEach(botao => {
        botao.addEventListener("click", () => {
            const modal = botao.closest(".sobreposicao-modal");
            fecharModal(modal);
        });
    });
    
    const botoesConfigModal = document.querySelectorAll(".botao-configuracoes-modal");
    botoesConfigModal.forEach(botao => {
        botao.addEventListener("click", () => {
            abrirModal("modal-configuracoes");
        });
    });
}

function configurarEventosConfiguracoes() {
    const botaoConfigCabecalho = document.getElementById("botao-configuracoes");
    if (botaoConfigCabecalho) {
        botaoConfigCabecalho.addEventListener("click", () => {
            abrirModal("modal-configuracoes");
        });
    }
    
    const controleVolumeSom = document.getElementById("volume-som");
    const controleVolumeMusica = document.getElementById("volume-musica");
    const valorSom = document.getElementById("valor-som");
    const valorMusica = document.getElementById("valor-musica");
    
    if (controleVolumeSom) {
        controleVolumeSom.addEventListener("input", (evento) => {
            volumeSom = parseInt(evento.target.value);
            valorSom.textContent = volumeSom + "%";
            atualizarVolumeSom();
        });
    }
    
    if (controleVolumeMusica) {
        controleVolumeMusica.addEventListener("input", (evento) => {
            volumeMusica = parseInt(evento.target.value);
            valorMusica.textContent = volumeMusica + "%";
            atualizarVolumeMusica();
            if (musicaMenu && musicaMenu.paused) {
                musicaMenu.play().catch(erro => {
                    console.log("Erro ao iniciar música:", erro);
                });
            }
        });
    }
    
    const botaoContinuar = document.getElementById("botao-continuar");
    if (botaoContinuar) {
        botaoContinuar.addEventListener("click", () => {
            fecharModal(document.getElementById("modal-configuracoes"));
        });
    }
    
    const botaoSairJogo = document.getElementById("botao-sair-jogo");
    if (botaoSairJogo) {
        botaoSairJogo.addEventListener("click", () => {
            confirmarSaidaJogo();
        });
    }
}

function configurarTeclasRapidas() {
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharTodosModais();
        }
    });
}

function reproduzirSomHover() {
    if (audioHover && volumeSom > 0) {
        audioHover.currentTime = 0;
        audioHover.volume = volumeSom / 100;
        audioHover.play().catch(erro => {
            console.log("Erro ao reproduzir som:", erro);
        });
    }
}

function atualizarVolumeSom() {
    if (audioHover) {
        audioHover.volume = volumeSom / 100;
    }
}

function atualizarVolumeMusica() {
    if (musicaMenu) {
        musicaMenu.volume = volumeMusica / 100;
    }
}

function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.classList.add("ativo");
    }
}

function fecharModal(modal) {
    if (modal) {
        modal.classList.remove("ativo");
    }
}

function fecharTodosModais() {
    const modaisAtivos = document.querySelectorAll(".sobreposicao-modal.ativo");
    modaisAtivos.forEach(modal => {
        fecharModal(modal);
    });
}

function confirmarSaidaJogo() {
    const confirmacao = confirm("Tem certeza que deseja sair do jogo?");
    if (confirmacao) {
        window.close();
        
        setTimeout(() => {
            window.location.href = "about:blank";
        }, 100);
    }
}