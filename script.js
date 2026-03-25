// 1. BANCO DE DADOS DE PERGUNTAS
const quiz = [
    { q: "Quem é o principal autor de Provérbios?", a: ["Davi","Salomão","Moisés","Paulo"], c: 1 },
    { q: "O temor do Senhor é o princípio da:", a: ["Fé","Vida","Sabedoria","Lei"], c: 2 },
    { q: "Confia no Senhor de todo o teu...", a: ["Caminho","Coração","Entendimento","Espírito"], c: 1 },
    { q: "A resposta branda desvia o:", a: ["Orgulho","Pecado","Furor","Caminho"], c: 2 },
    { q: "O orgulho precede a:", a: ["Vitória","Glória","Queda","Sabedoria"], c: 2 },
    { q: "Quem encontra uma esposa encontra:", a: ["Problemas","Alegria momentânea","Algo bom","Sabedoria apenas"], c: 2 },
    { q: "A língua tem poder de:", a: ["Nada","Apenas falar","Vida e morte","Confusão"], c: 2 },
    { q: "Quem escreveu Provérbios 30?", a: ["Salomão","Agur","Davi","Isaías"], c: 1 },
    { q: "O preguiçoso deve aprender com:", a: ["Leão","Formiga","Águia","Cavalo"], c: 1 },
    { q: "Quantas coisas o Senhor odeia?", a: ["5","6","7","8"], c: 2 },
    { q: "Quem reuniu alguns provérbios?", a: ["Profetas","Sacerdotes","Homens de Ezequias","Levitas"], c: 2 },
    { q: "A palavra certa é comparada a:", a: ["Ouro","Prata","Maçãs de ouro","Pérolas"], c: 2 },
    { q: "A sabedoria é descrita como:", a: ["Rei","Anjo","Mulher que clama","Sacerdote"], c: 2 },
    { q: "Provérbios 31 fala sobre:", a: ["Rei","Mulher virtuosa","Profeta","Guerreiro"], c: 1 },
    { q: "Melhor é o pouco com justiça do que:", a: ["Muito com paz","Muito com injustiça","Pouco com sabedoria","Muito com fé"], c: 1 }
];

// 2. VARIÁVEIS DE ESTADO
let current = 0;
let score = 0;
let playerFullName = "";

// 3. CONTROLE DE TELAS
function hideAllScreens() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("leaderboard-screen").style.display = "none";
}

function startGame() {
    const nome = document.getElementById("firstName").value.trim();
    const sobrenome = document.getElementById("lastName").value.trim();

    if (nome === "" || sobrenome === "") {
        alert("Por favor, preencha seu nome e sobrenome!");
        return;
    }

    playerFullName = `${nome} ${sobrenome}`;
    current = 0;
    score = 0;

    hideAllScreens();
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("display-name").innerText = playerFullName;
    loadQuestion();
}

function showLeaderboard() {
    hideAllScreens();
    document.getElementById("leaderboard-screen").style.display = "block";
    displayLeaderboard();
}

function goHome() {
    hideAllScreens();
    document.getElementById("start-screen").style.display = "block";
}

// 4. LÓGICA DO QUIZ
function loadQuestion() {
    document.getElementById("nextBtn").style.display = "none";
    let q = quiz[current];
    document.getElementById("question").innerText = q.q;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.a.forEach((answer, index) => {
        let btn = document.createElement("button");
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(btn, index);
        answersDiv.appendChild(btn);
    });
}

function checkAnswer(btn, index) {
    let correct = quiz[current].c;
    let buttons = document.querySelectorAll("#answers button");

    buttons.forEach((b, i) => {
        b.disabled = true;
        if(i === correct) b.classList.add("correct");
        if(i === index && i !== correct) b.classList.add("wrong");
    });

    if(index === correct) score++;
    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    current++;
    if(current < quiz.length){
        loadQuestion();
    } else {
        finishGame();
    }
}

function finishGame() {
    saveScore(playerFullName, score);
    alert(`Fim de jogo! Você acertou ${score} de ${quiz.length}`);
    showLeaderboard();
}

// 5. CONFIGURAÇÃO SUPABASE
const SB_URL = "https://grkitlnsashyruvtbbaf.supabase.co";
const SB_KEY = "sb_publishable_yUMvZjmpiMrqKtWpk8dp8Q_GQd_LfAV";

const supabaseClient = supabase.createClient(SB_URL, SB_KEY); 

// 6. SISTEMA DE RANKING (SQL REAL)
async function saveScore(name, pts) {
    console.log("Verificando recorde no SQL...");

    // 1. Primeiro, buscamos se o jogador já existe e qual a pontuação dele
    const { data: existingPlayer, error: fetchError } = await supabaseClient
        .from('ranking')
        .select('pontuacao')
        .eq('nome', name)
        .single();

    // 2. Se o jogador já existe e a pontuação nova NÃO é maior, não fazemos nada
    if (existingPlayer && pts <= existingPlayer.pontuacao) {
        console.log("Pontuação menor ou igual ao recorde atual. Nada alterado.");
        return;
    }

    // 3. Se não existe ou se a pontuação é maior, usamos o upsert
    // O 'onConflict' diz: "se o nome for igual, atualize o resto"
    const { error } = await supabaseClient
        .from('ranking')
        .upsert({ nome: name, pontuacao: pts }, { onConflict: 'nome' });

    if (error) {
        console.error("Erro ao atualizar ranking:", error.message);
    } else {
        console.log("Recorde atualizado com sucesso!");
    }
}

// 7. SISTEMA DE LEADERBOARD
async function displayLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "<li>Carregando ranking global...</li>";

    const { data: ranking, error } = await supabaseClient
        .from('ranking')
        .select('nome, pontuacao')
        .order('pontuacao', { ascending: false })
        .limit(10);

    if (error) {
        console.error("Erro ao buscar ranking:", error.message);
        list.innerHTML = "<li>Erro ao carregar dados do servidor.</li>";
        return;
    }

    if (!ranking || ranking.length === 0) {
        list.innerHTML = "<li>Nenhum recorde mundial ainda!</li>";
        return;
    }

    list.innerHTML = ranking.map((item, index) => 
        `<li><span>#${index + 1} ${item.nome}</span> <strong>${item.pontuacao} pts</strong></li>`
    ).join("");
}
