// 1. BANCO DE DADOS CATEGORIZADO
const quiz = [
    { q: "Quem é o principal autor de Provérbios?", a: ["Davi","Salomão","Moisés","Paulo"], c: 1, d: "f" },
    { q: "O temor do Senhor é o princípio da:", a: ["Fé","Vida","Sabedoria","Lei"], c: 2, d: "f" },
    { q: "Confia no Senhor de todo o teu...", a: ["Caminho","Coração","Entendimento","Espírito"], c: 1, d: "f" },
    { q: "A resposta branda desvia o:", a: ["Orgulho","Pecado","Furor","Caminho"], c: 2, d: "f" },
    { q: "O orgulho precede a:", a: ["Vitória","Glória","Queda","Sabedoria"], c: 2, d: "f" },
    { q: "Quem encontra uma esposa encontra:", a: ["Problemas","Alegria momentânea","Algo bom","Sabedoria apenas"], c: 2, d: "f" },
    { q: "A língua tem poder de:", a: ["Nada","Apenas falar","Vida e morte","Confusão"], c: 2, d: "f" },
    { q: "Quem escreveu Provérbios 30?", a: ["Salomão","Agur","Davi","Isaías"], c: 1, d: "f" },
    { q: "O preguiçoso deve aprender com:", a: ["Leão","Formiga","Águia","Cavalo"], c: 1, d: "f" },
    { q: "Quantas coisas o Senhor odeia?", a: ["5","6","7","8"], c: 2, d: "f" },
    { q: "Quem reuniu alguns provérbios?", a: ["Profetas","Sacerdotes","Homens de Ezequias","Levitas"], c: 2, d: "f" },
    { q: "A palavra certa é comparada a:", a: ["Ouro","Prata","Maçãs de ouro","Pérolas"], c: 2, d: "f" },
    { q: "A sabedoria é descrita como:", a: ["Rei","Anjo","Mulher que clama","Sacerdote"], c: 2, d: "f" },
    { q: "Provérbios 31 fala sobre:", a: ["Rei","Mulher virtuosa","Profeta","Guerreiro"], c: 1, d: "f" },
    { q: "Melhor é o pouco com justiça do que:", a: ["Muito com paz","Muito com injustiça","Pouco com sabedoria","Muito com fé"], c: 1, d: "f" }
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
