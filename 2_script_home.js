 const selecao = {
    categoria: null,
    dificuldade: null,
    tipo: null
}

const categoriaIds = {
    "Entretenimento": [10, 11, 12, 14, 15, 16, 29, 31, 32],
    "Esportes": 21,
    "Conhecimentos Gerais": 9,
    "Animais": 27
};
 
 const botoes = document.querySelectorAll('.btn-categoria, .btn-row');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
 
if (botao.classList.contains('btn-categoria')) {
    document.querySelectorAll('.btn-categoria').forEach(b => {
        b.classList.remove('selecionado');
    });
    selecao.categoria = botao.innerText;
    botao.classList.add('selecionado')
    iniciarQuiz();
}

if (botao.dataset.grupo === 'dificuldade') {
    document.querySelectorAll('[data-grupo="dificuldade"]').forEach(b => {
        b.classList.remove('selecionado');
    });
    selecao.dificuldade = botao.innerText;
    botao.classList.add('selecionado')
    iniciarQuiz();
}

if (botao.dataset.grupo === 'tipo') {
    document.querySelectorAll('[data-grupo="tipo"]').forEach(b => {
        b.classList.remove('selecionado');
    });
    selecao.tipo = botao.innerText;
    botao.classList.add('selecionado')
    iniciarQuiz();
}

        });
    });

function iniciarQuiz() {
    if (selecao.categoria !== null && selecao.dificuldade !== null && selecao.tipo !== null) {
        document.querySelector('.btn-iniciar').disabled = false;
    }
}

document.querySelector('.btn-iniciar').addEventListener('click', function() {
    let categoriaId = categoriaIds[selecao.categoria];

    if (Array.isArray(categoriaId)) {
        categoriaId = categoriaId[Math.floor(Math.random() * categoriaId.length)];
    }

window.location.href = '2_perguntas.html?categoria=' + selecao.categoria + '&dificuldade=' + selecao.dificuldade + '&tipo=' + selecao.tipo;
});