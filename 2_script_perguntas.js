const SUPABASE_URL = 'https://qqzdtvmrjnpqnjfabhdy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MkHtYJXjNmNHJ2VC33RnPQ_tyU97EX-';

const params = new URLSearchParams(window.location.search);
const categoria = params.get('categoria');
const dificuldade = params.get('dificuldade');
const tipo = params.get('tipo');

console.log('categoria:', categoria);
console.log('dificuldade:', dificuldade);
console.log('tipo:', tipo);

const dificuldadeMap = {
    "Fácil": "Fácil",
    "Médio": "Médio",
    "Difícil": "Difícil"
};

async function buscarPergunta() {
    const jaExibidas = JSON.parse(sessionStorage.getItem('jaExibidas')) || [];

    const url = `${SUPABASE_URL}/rest/v1/perguntas?categoria=eq.${encodeURIComponent(categoria)}&dificuldade=eq.${encodeURIComponent(dificuldade)}&tipo=eq.${encodeURIComponent(tipo)}`;

    const resposta = await fetch(url, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });

    const perguntas = await resposta.json();
    console.log(perguntas);

    const disponiveis = perguntas.filter(p => !jaExibidas.includes(p.id));

    if (disponiveis.length === 0) {
        document.getElementById('pergunta').innerText = 'Você respondeu todas as perguntas disponíveis para essa combinação! Volte e tente outra.';
        document.getElementById('alternativas').style.display = 'none';
        return null;
    }

    const sorteada = disponiveis[Math.floor(Math.random() * disponiveis.length)];

    jaExibidas.push(sorteada.id);
    sessionStorage.setItem('jaExibidas', JSON.stringify(jaExibidas));

    return sorteada;
}

async function exibirPergunta() {
    const perguntaSorteada = await buscarPergunta();
    if (!perguntaSorteada) return;

    document.getElementById('pergunta').innerText = perguntaSorteada.pergunta;

    const alternativas = document.getElementById('alternativas');
    const letras = ['A', 'B', 'C', 'D'];
    const lista = [...perguntaSorteada.alternativas].sort(() => Math.random() - 0.5);

    alternativas.innerHTML = lista
        .map((alternativa, indice) => `
            <button class="btn-alternativa">
                <span class="let">${letras[indice]}</span>
                <span>${alternativa}</span>
            </button>
        `)
        .join('');

    document.querySelectorAll('.btn-alternativa').forEach(botao => {
        botao.addEventListener('click', function () {
            const respostaSelecionada = botao.querySelectorAll('span')[1].innerText;

            if (respostaSelecionada === perguntaSorteada.correta) {
                document.querySelector('.respostaCerta').style.display = 'block';
            } else {
                document.querySelector('.respostaErrada').style.display = 'block';
                document.querySelector('.respostaErrada p').innerText = `Errou! A alternativa correta é: ${perguntaSorteada.correta}`;
            }

            document.querySelectorAll('.btn-alternativa').forEach(b => {
                b.disabled = true;
            });
        });
    });
}

exibirPergunta();