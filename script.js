// 1. BANCO DE DADOS CATEGORIZADO
const quiz = [
    // FÁCIL (1-10)
    { q: "Quem é o principal autor associado ao Livro de Provérbios?", a: ["Davi", "Moisés", "Salomão", "Paulo"], c: 2, d: "f" },
    { q: "Provérbios faz parte de qual tipo de livro da Bíblia?", a: ["Histórico", "Poético", "Evangelho", "Profético"], c: 1, d: "f" },
    { q: "Complete: 'O temor do Senhor é o princípio da __.'", a: ["Justiça", "Paz", "Fé", "Sabedoria"], c: 3, d: "f" },
    { q: "Provérbios ensina mais sobre:", a: ["Sabedoria", "Fama", "Milagres", "Prosperidade"], c: 0, d: "f" },
    { q: "O livro de Provérbios tem mais:", a: ["Profecias", "Histórias", "Conselhos práticos", "Genealogias"], c: 2, d: "f" },
    { q: "O que devemos guardar acima de tudo, segundo Provérbios?", a: ["A mente", "Os olhos", "A vida", "O coração"], c: 3, d: "f" },
    { q: "Complete: 'A resposta branda desvia o __.'", a: ["Orgulho", "Furor", "Insensato", "Mal"], c: 1, d: "f" },
    { q: "O que Provérbios diz sobre ouvir conselhos?", a: ["É para crianças", "Torna a pessoa sábia", "É cansativo", "Torna a pessoa boa"], c: 1, d: "f" },
    { q: "Quem anda com os sábios se torna:", a: ["Forte", "Sábio", "Bom", "Rico"], c: 1, d: "f" },
    { q: "O que é abominação para Deus em Provérbios?", a: ["Orgulho", "Dormir muito", "Briga", "Não se casar"], c: 0, d: "f" },

    // MÉDIO (11-20)
    { q: "Em Provérbios, o que é melhor do que ouro e prata?", a: ["Poder", "Vida", "Sabedoria", "Mulher virtuosa"], c: 2, d: "m" },
    { q: "Segundo Provérbios, como devemos responder à ira?", a: ["Com resposta branda", "Fugindo de problemas", "Ignorando", "Com uma surra"], c: 0, d: "m" },
    { q: "O que Provérbios diz sobre a língua?", a: ["Serve para ensinar", "Deve falar pouco", "Pode ferir mais do que armas", "Tem poder de vida e morte"], c: 3, d: "m" },
    { q: "Qual é o destino do preguiçoso segundo Provérbios?", a: ["Anda na tolice", "Caminha para a pobreza", "Perde o discernimento", "Acaba dependendo dos outros"], c: 1, d: "m" },
    { q: "O que Provérbios fala sobre amizades?", a: ["O isolamento preserva a sabedoria", "A convivência molda o caráter do homem", "As amizades não influenciam as decisões", "Influenciam nosso comportamento"], c: 3, d: "m" },
    { q: "Segundo Provérbios, o que acontece com quem controla a língua?", a: ["Evita problemas", "Se alegra", "Não comete erros", "Ganha influência"], c: 0, d: "m" },
    { q: "O que Provérbios diz sobre o amigo verdadeiro?", a: ["É sempre feliz", "Evita confrontos", "Ama em todo tempo", "É quase um parente"], c: 2, d: "m" },
    { q: "De acordo com o livro de Provérbios, melhor é:", a: ["Ser conhecido e ter prestígio", "Ser rico e ter respeito", "Ser pobre e íntegro", "Exercer liderança"], c: 2, d: "m" },
    { q: "O que Provérbios fala sobre a inveja?", a: ["Corrói por dentro", "Impulsiona o crescimento", "Traz à tona o caráter", "É ambição saudável"], c: 0, d: "m" },
    { q: "Quem é a mulher descrita em Provérbios 31?", a: ["Uma profetisa", "Uma mulher virtuosa", "Uma sacerdotisa", "Uma rainha guerreira"], c: 1, d: "m" },

    // DIFÍCIL (21-30)
    { q: "Em Provérbios, o ferro com ferro se afia. O que isso simboliza?", a: ["A disciplina", "Trabalho duro", "Amizade verdadeira", "O crescimento mútuo"], c: 3, d: "d" },
    { q: "Em Provérbios é dito que muitas palavras trazem:", a: ["Conhecimento", "Pecado", "Sabedoria", "Arrependimento"], c: 1, d: "d" },
    { q: "Provérbios adverte a não se gloriar do:", a: ["Dinheiro", "Amanhã", "Presente", "Passado"], c: 1, d: "d" },
    { q: "Qual característica é constantemente associada ao sábio em Provérbios?", a: ["Riqueza", "Conhecimento", "Humildade", "Alegria"], c: 2, d: "d" },
    { q: "Provérbios ensina que quem encobre suas transgressões:", a: ["Não prosperará", "Será esquecido", "Viverá angustiado", "Será morto"], c: 0, d: "d" },
    { q: "Complete: 'O coração alegre é como bom __.'", a: ["Tesouro", "Conselho", "Alimento", "Remédio"], c: 3, d: "d" },
    { q: "Provérbios compara o insensato que repete sua insensatez a:", a: ["Leão que ruge", "Um cão que volta ao seu vômito", "Pássaro que retorna ao ninho", "Homem sem fundamento"], c: 1, d: "d" },
    { q: "Segundo Provérbios, toda palavra de Deus é pura e:", a: ["Lâmpada para os pés", "Água viva", "Escudo para os que confiam nele", "Ouro refinado"], c: 2, d: "d" },
    { q: "Provérbios aconselha: 'Compra a verdade e não a vendas; também a…'", a: ["Prudência e temor", "Sabedoria, instrução e entendimento", "Justiça e misericórdia", "Fé e humildade"], c: 1, d: "d" },
    { q: "Provérbios afirma que 'comer muito mel não é bom'. O que isso simboliza?", a: ["Excesso de prazeres", "Pensar só em si mesmo", "Muitas riquezas", "Aproveitar-se de autoridade"], c: 0, d: "d" }
];

// 2. VARIÁVEIS DE ESTADO
let current = 0;
let totalScore = 0;
let playerFullName = "";
let timer;
let timeLeft;
const TIME_PER_QUESTION = 15; // segundos
let hits = 0;
let misses = 0;
let combo = 0;
let maxCombo = 0; // Para curiosidade no final

// Pesos de dificuldade
const weights = { f: 1, m: 1.5, d: 2 };

// 3. CONFIGURAÇÃO SUPABASE
const SB_URL = "https://grkitlnsashyruvtbbaf.supabase.co";
const SB_KEY = "sb_publishable_yUMvZjmpiMrqKtWpk8dp8Q_GQd_LfAV";
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

// 4. INÍCIO DO JOGO
function startGame() {
    const nome = document.getElementById("firstName").value.trim();
    const sobrenome = document.getElementById("lastName").value.trim();

    if (nome === "" || sobrenome === "") {
        alert("Preencha seu nome!");
        return;
    }

    playerFullName = `${nome} ${sobrenome}`;
    current = 0;
    totalScore = 0;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("display-name").innerText = playerFullName;
    loadQuestion();
}

// 5. LÓGICA DO QUIZ
function loadQuestion() {
    clearInterval(timer);
    timeLeft = TIME_PER_QUESTION;
    
    const q = quiz[current];
    const questionEl = document.getElementById("question");
    const answersDiv = document.getElementById("answers");
    const nextBtn = document.getElementById("nextBtn");

    nextBtn.style.display = "none";
    answersDiv.innerHTML = "";
    
    // Cor por dificuldade
    const diffColors = { f: "#28a745", m: "#ffc107", d: "#dc3545" };
    questionEl.style.color = diffColors[q.d];
    questionEl.innerText = q.q;

    // Barra de Progresso
    updateProgressBar();

    // Alternativas coloridas (estilo variado)
    const btnColors = ["#4a90e2", "#9b59b6", "#e67e22", "#1abc9c"];

    q.a.forEach((answer, index) => {
        let btn = document.createElement("button");
        btn.innerText = answer;
        btn.style.borderBottom = `4px solid ${btnColors[index]}`;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    const timerDisplay = document.getElementById("timer-display");
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Tempo: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1); // Estourou o tempo
        }
    }, 1000);
}

function updateProgressBar() {
    const progress = ((current) / quiz.length) * 100;
    document.getElementById("progress-inner").style.width = `${progress}%`;
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const q = quiz[current];
    const buttons = document.querySelectorAll("#answers button");
    
    const correctSnd = document.getElementById("correctSound");
    const wrongSnd = document.getElementById("wrongSound");
    const comboEl = document.getElementById("stat-combo");

    // Desabilitar botões e mostrar cores
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.c) btn.classList.add("correct");
        if (i === selectedIndex && i !== q.c) btn.classList.add("wrong");
    });

    if (selectedIndex === q.c) {
        // LÓGICA DE ACERTO
        hits++;
        combo++;
        if (combo > maxCombo) maxCombo = combo;

        // Tocar som de acerto (resetando o tempo para permitir cliques rápidos)
        correctSnd.currentTime = 0;
        correctSnd.play().catch(e => console.log("Erro ao tocar som:", e));

        // Cálculo de pontos: (Dificuldade + Tempo) * Combo
        const basePoints = Math.round((weights[q.d] * 100) + (timeLeft * 10));
        totalScore += basePoints * combo;

        // Efeito visual de "pulo" no combo
        comboEl.classList.add("bump");
        setTimeout(() => comboEl.classList.remove("bump"), 200);
        
    } else {
        // LÓGICA DE ERRO
        misses++;
        combo = 0; // Reset do combo

        // Tocar som de erro
        wrongSnd.currentTime = 0;
        wrongSnd.play().catch(e => console.log("Erro ao tocar som:", e));
    }

    // Atualizar os números na tela
    document.getElementById("stat-hits").innerText = hits;
    document.getElementById("stat-misses").innerText = misses;
    comboEl.innerText = combo;

    // Mostrar botão de próxima
    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    current++;
    if (current < quiz.length) {
        loadQuestion();
    } else {
        finishGame();
    }
}

async function finishGame() {
    document.getElementById("quiz-container").innerHTML = "<h2>Salvando pontuação...</h2>";
    
    await saveScore(playerFullName, totalScore);
    
    alert(`Fim de jogo! Pontuação Total: ${totalScore}`);
    showLeaderboard();
}

async function saveScore(name, pts) {
    // Busca recorde atual
    const { data: player } = await supabaseClient
        .from('ranking')
        .select('pontuacao')
        .eq('nome', name)
        .maybeSingle();

    if (player && pts <= player.pontuacao) {
        return; // Não atualiza se for menor
    }

    // Upsert (Se o nome for igual, o SQL Unique trata e o Supabase atualiza)
    const { error } = await supabaseClient
        .from('ranking')
        .upsert({ nome: name, pontuacao: pts }, { onConflict: 'nome' });

    if (error) console.error("Erro:", error.message);
}

async function showLeaderboard() {
    hideAllScreens();
    document.getElementById("leaderboard-screen").style.display = "block";
    
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "<li>Carregando...</li>";

    const { data: ranking, error } = await supabaseClient
        .from('ranking')
        .select('*')
        .order('pontuacao', { ascending: false })
        .limit(10);

    if (error) {
        list.innerHTML = "<li>Erro ao carregar.</li>";
        return;
    }

    list.innerHTML = ranking.map((item, index) => {
        // Lógica das medalhas
        let positionDisplay;
        if (index === 0) positionDisplay = "🥇";
        else if (index === 1) positionDisplay = "🥈";
        else if (index === 2) positionDisplay = "🥉";
        else positionDisplay = `<span style="margin-left:8px">#${index + 1}</span>`;

        return `<li>
            <span>${positionDisplay} ${item.nome}</span> 
            <strong>${item.pontuacao} pts</strong>
        </li>`;
    }).join("");
}

function hideAllScreens() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("leaderboard-screen").style.display = "none";
}

function goHome() {
    location.reload(); // Recarrega para limpar estados
}
