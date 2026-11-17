const houses = [
  {
    id: "letters", name: "Casinha das Letras", short: "Letras", icon: "🔤", color: "yellow", mascot: "🦊",
    activities: [
      { title: "Vamos encontrar as vogais?", instruction: "Toque na letra A.", picture: "🍎", word: "A DE ABELHA", options: ["A", "E", "O"], answer: "A" },
      { title: "Que letra é essa?", instruction: "Observe a letra e escolha igual.", picture: "🦋", word: "LETRA B", options: ["D", "B", "P"], answer: "B" },
      { title: "Qual começa com O?", instruction: "Escolha a primeira letra de OVO.", picture: "🥚", word: "OVO", options: ["A", "O", "U"], answer: "O" },
      { title: "Vamos reconhecer!", instruction: "Qual destas é a letra M?", picture: "🐒", word: "MACACO", options: ["N", "M", "V"], answer: "M" },
      { title: "Desafio das vogais", instruction: "Qual vogal está faltando?", picture: "⭐", word: "A  E  __  O  U", options: ["I", "B", "C"], answer: "I" }
    ]
  },
  {
    id: "syllables", name: "Casinha das Sílabas", short: "Sílabas", icon: "🔠", color: "pink", mascot: "🐸",
    activities: [
      { title: "Qual é a sílaba inicial?", instruction: "BOLA começa com qual sílaba?", picture: "⚽", word: "BOLA", options: ["BO", "LA", "MA"], answer: "BO" },
      { title: "Vamos ouvir e observar!", instruction: "PATO começa com...", picture: "🦆", word: "PATO", options: ["TO", "PA", "PO"], answer: "PA" },
      { title: "Encontre a sílaba!", instruction: "Qual sílaba começa a palavra CASA?", picture: "🏠", word: "CASA", options: ["SA", "CA", "MA"], answer: "CA" },
      { title: "Mais uma descoberta!", instruction: "Qual é a primeira sílaba de BONECA?", picture: "🪆", word: "BONECA", options: ["NE", "CA", "BO"], answer: "BO" },
      { title: "Desafio das sílabas", instruction: "Qual opção começa igual a MACACO?", picture: "🐵", word: "MACACO", options: ["ME", "MA", "MO"], answer: "MA" }
    ]
  },
  {
    id: "words", name: "Casinha das Palavras", short: "Palavras", icon: "📚", color: "blue", mascot: "🐻",
    activities: [
      { title: "Complete a palavra!", instruction: "Escolha a sílaba que falta.", picture: "🐸", word: "SA + __ = SAPO", options: ["PO", "PA", "BO"], answer: "PO" },
      { title: "Vamos montar?", instruction: "Qual sílaba termina a palavra?", picture: "🧅", word: "CE + __ = CEBOLA", options: ["BO", "LA", "CA"], answer: "BO" },
      { title: "Que palavra é essa?", instruction: "Escolha a palavra que combina com a imagem.", picture: "🌙", word: "🌙", options: ["SOL", "LUA", "MAR"], answer: "LUA" },
      { title: "Palavra incompleta", instruction: "Qual sílaba está faltando?", picture: "🧢", word: "BO + __ = BONÉ", options: ["NE", "LA", "TA"], answer: "NE" },
      { title: "Desafio das palavras", instruction: "Qual palavra começa com CA?", picture: "🐶", word: "ESCOLHA A PALAVRA", options: ["BOLA", "CAVALO", "PATO"], answer: "CAVALO" }
    ]
  },
  {
    id: "numbers", name: "Casinha dos Números", short: "Números", icon: "🔢", color: "green", mascot: "🐼",
    activities: [
      { title: "Vamos contar!", instruction: "Quantas maçãs aparecem?", picture: "🍎 🍎", word: "CONTE AS MAÇÃS", options: ["1", "2", "3"], answer: "2" },
      { title: "Qual é o número?", instruction: "Escolha o número três.", picture: "🎈 🎈 🎈", word: "TRÊS", options: ["2", "3", "4"], answer: "3" },
      { title: "Conte os bichinhos!", instruction: "Quantos peixinhos você vê?", picture: "🐟 🐟 🐟 🐟", word: "CONTE OS PEIXES", options: ["3", "4", "5"], answer: "4" },
      { title: "Quem vem depois?", instruction: "Complete a sequência.", picture: "1  •  2  •  __", word: "QUAL VEM DEPOIS?", options: ["3", "4", "5"], answer: "3" },
      { title: "Desafio da contagem", instruction: "Quantas estrelas aparecem?", picture: "⭐ ⭐ ⭐ ⭐ ⭐", word: "CONTE AS ESTRELAS", options: ["4", "5", "6"], answer: "5" }
    ]
  },
  {
    id: "memory", name: "Casinha da Memória", short: "Memória", icon: "🧠", color: "purple", mascot: "🦉",
    activities: [
      { title: "Encontre o par!", instruction: "Escolha a figura que combina com a primeira.", picture: "🐱", word: "GATO", options: ["🐶", "🐱", "🐰"], answer: "🐱" },
      { title: "Quem é igual?", instruction: "Encontre a mesma fruta.", picture: "🍓", word: "MORANGO", options: ["🍎", "🍓", "🍌"], answer: "🍓" },
      { title: "Memória dos animais", instruction: "Qual animal aparece igual?", picture: "🐢", word: "TARTARUGA", options: ["🐸", "🐢", "🐠"], answer: "🐢" },
      { title: "Olho atento!", instruction: "Encontre o objeto igual.", picture: "🚗", word: "CARRO", options: ["🚲", "🚕", "🚗"], answer: "🚗" },
      { title: "Último desafio!", instruction: "Qual figura é igual à apresentada?", picture: "🌻", word: "GIRASSOL", options: ["🌷", "🌻", "🌹"], answer: "🌻" }
    ]
  }
];

const STORAGE_KEY = "vilaAprendizadoV1";
let state = { name: "", unlocked: 0, completed: [], stars: 0 };
let currentHouse = 0;
let currentStep = 0;
let answered = false;
let audioContext = null;

const $ = (id) => document.getElementById(id);
const screens = ["welcome-screen", "village-screen", "game-screen", "complete-screen", "final-screen"];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") state = { ...state, ...saved };
  } catch (_) {}
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function showScreen(id) {
  screens.forEach(screen => $(screen).classList.toggle("hidden", screen !== id));
}
function sound(kind) {
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const notes = kind === "good" ? [523, 659, 784] : kind === "complete" ? [523, 659, 784, 1046] : [220];
    notes.forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime + i * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + i * 0.11 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + i * 0.11 + 0.2);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.start(audioContext.currentTime + i * 0.11);
      oscillator.stop(audioContext.currentTime + i * 0.11 + 0.22);
    });
  } catch (_) {}
}
function updateStars() {
  $("star-total").textContent = state.stars;
  $("game-stars").textContent = state.stars;
}
function renderVillage() {
  $("player-name").textContent = state.name || "explorador";
  updateStars();
  $("houses-grid").innerHTML = houses.map((house, index) => {
    const done = state.completed.includes(index);
    const locked = index > state.unlocked;
    const status = done ? "Concluída! ⭐" : locked ? "Complete a anterior" : "5 desafios";
    return `<button class="house-card ${done ? "done" : ""}" data-house="${index}" ${locked ? "disabled" : ""} aria-label="${house.name}, ${status}">
      ${locked ? '<span class="lock">🔒</span>' : ""}
      <span class="house-emoji">${house.icon}</span>
      <span class="house-name">${house.name}</span>
      <span class="house-status">${status}</span>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-house]").forEach(button => {
    button.addEventListener("click", () => startHouse(Number(button.dataset.house)));
  });
}
function startHouse(index) {
  currentHouse = index; currentStep = 0;
  showScreen("game-screen");
  renderActivity();
}
function renderActivity() {
  answered = false;
  const house = houses[currentHouse];
  const activity = house.activities[currentStep];
  $("game-house-icon").textContent = house.icon;
  $("game-house-name").textContent = house.name;
  $("challenge-mascot").textContent = house.mascot;
  $("challenge-category").textContent = `DESAFIO ${currentStep + 1} • ${house.short.toUpperCase()}`;
  $("challenge-title").textContent = activity.title;
  $("challenge-instruction").textContent = activity.instruction;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("continue-button").classList.add("hidden");
  $("step-label").textContent = `Desafio ${currentStep + 1} de 5`;
  const percent = Math.round((currentStep / 5) * 100);
  $("progress-percent").textContent = `${percent}%`;
  $("progress-fill").style.width = `${percent}%`;
  const isNumberSequence = activity.word.includes("•");
  $("challenge-content").innerHTML = `
    <div class="question-block">
      <div class="question-picture">${activity.picture}</div>
      <div class="question-word">${activity.word}</div>
    </div>
    <div class="options">${activity.options.map(option => `<button class="answer-option" type="button" data-answer="${option.replace(/"/g, "&quot;")}">${option}</button>`).join("")}</div>
  `;
  document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => checkAnswer(button, activity)));
  updateStars();
}
function checkAnswer(button, activity) {
  if (answered) return;
  const correct = button.dataset.answer === activity.answer;
  if (correct) {
    answered = true;
    button.classList.add("correct");
    $("feedback").textContent = ["Muito bem! Você conseguiu! ⭐", "Isso mesmo! Mandou bem! 🎉", "Resposta certa! 🌟"][Math.floor(Math.random() * 3)];
    $("feedback").className = "feedback good";
    state.stars += 1;
    saveState(); updateStars(); sound("good");
    $("continue-button").classList.remove("hidden");
  } else {
    button.classList.add("wrong");
    $("feedback").textContent = "Quase! Tente mais uma vez. 💛";
    $("feedback").className = "feedback try";
    sound("try");
    setTimeout(() => button.classList.remove("wrong"), 450);
  }
}
function finishHouse() {
  if (!state.completed.includes(currentHouse)) state.completed.push(currentHouse);
  state.unlocked = Math.min(4, Math.max(state.unlocked, currentHouse + 1));
  saveState();
  if (state.completed.length === houses.length) {
    $("final-name").textContent = state.name;
    $("certificate-name").textContent = state.name;
    $("final-stars").textContent = state.stars;
    showScreen("final-screen"); sound("complete");
  } else {
    $("complete-title").textContent = `Parabéns, ${state.name}!`;
    $("complete-copy").textContent = `Você terminou a ${houses[currentHouse].name}. A próxima casinha já está esperando por você!`;
    $("completion-stars").textContent = "⭐ ⭐ ⭐ ⭐ ⭐";
    showScreen("complete-screen"); sound("complete");
  }
}
$("welcome-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("student-name").value.trim();
  if (!name) return;
  state.name = name;
  saveState(); renderVillage(); showScreen("village-screen");
});
$("continue-button").addEventListener("click", () => {
  if (currentStep < 4) { currentStep++; renderActivity(); }
  else finishHouse();
});
$("back-home").addEventListener("click", () => { renderVillage(); showScreen("village-screen"); });
$("complete-next").addEventListener("click", () => { renderVillage(); showScreen("village-screen"); });
$("final-home").addEventListener("click", () => { renderVillage(); showScreen("village-screen"); });
$("play-again").addEventListener("click", () => {
  state = { name: state.name, unlocked: 0, completed: [], stars: 0 };
  saveState(); renderVillage(); showScreen("village-screen");
});
$("reset-progress").addEventListener("click", () => {
  if (confirm("Quer recomeçar? Todo o progresso salvo neste computador será apagado.")) {
    state = { name: state.name, unlocked: 0, completed: [], stars: 0 };
    saveState(); renderVillage();
  }
});

loadState();
if (state.name) {
  $("student-name").value = state.name;
  renderVillage();
  showScreen("village-screen");
} else {
  showScreen("welcome-screen");
}
