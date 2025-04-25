function criarTabuleiro(tamanho) {
  const tabuleiro = [];
  for (let i = 0; i < tamanho; i++) {
    const linha = [];
    for (let j = 0; j < tamanho; j++) {
      linha.push({ temBarco: false, clicado: false });
    }
    tabuleiro.push(linha);
  }

  // Coloca 3 barcos aleatórios
  let barcos = 0;
  while (barcos < 3) {
    let x = Math.floor(Math.random() * tamanho);
    let y = Math.floor(Math.random() * tamanho);
    if (!tabuleiro[x][y].temBarco) {
      tabuleiro[x][y].temBarco = true;
      barcos++;
    }
  }

  return tabuleiro;
}

let tabuleiro = [];
let tirosRestantes = 10;
let barcosAfundados = 0;

function iniciarJogo() {
  const dificuldade = document.getElementById("dificuldade").value;
  let tamanho = 5;

  if (dificuldade === "medio") tamanho = 6;
  if (dificuldade === "dificil") tamanho = 7;

  tabuleiro = criarTabuleiro(tamanho);
  tirosRestantes = 10;
  barcosAfundados = 0;

  renderizarTabuleiro();
  document.getElementById("status").innerText = `Tiros restantes: ${tirosRestantes}`;
  document.getElementById("mensagem").innerText = "";
}

function renderizarTabuleiro() {
  const divTabuleiro = document.getElementById("tabuleiro");
  divTabuleiro.innerHTML = "";

  tabuleiro.forEach((linha, i) => {
    linha.forEach((celula, j) => {
      const btn = document.createElement("button");
      btn.className = "celula";
      btn.disabled = celula.clicado;
      btn.innerText = celula.clicado ? (celula.temBarco ? "🚢" : "🌊") : "";
      btn.onclick = () => clicarCelula(i, j);
      divTabuleiro.appendChild(btn);
    });
    const br = document.createElement("br");
    divTabuleiro.appendChild(br);
  });
}

function clicarCelula(x, y) {
  if (tabuleiro[x][y].clicado) return;

  tabuleiro[x][y].clicado = true;
  tirosRestantes--;

  if (tabuleiro[x][y].temBarco) {
    barcosAfundados++;
    document.getElementById("mensagem").innerText = "Você acertou um barco!";
  } else {
    document.getElementById("mensagem").innerText = "Água!";
  }

  if (barcosAfundados === 3) {
    document.getElementById("mensagem").innerText = "Parabéns! Você venceu!";
    desativarTabuleiro();
  } else if (tirosRestantes <= 0) {
    document.getElementById("mensagem").innerText = "Fim de jogo! Você perdeu.";
    desativarTabuleiro();
  }

  document.getElementById("status").innerText = `Tiros restantes: ${tirosRestantes}`;
  renderizarTabuleiro();
}

function desativarTabuleiro() {
  tabuleiro.forEach(linha => linha.forEach(celula => celula.clicado = true));
}