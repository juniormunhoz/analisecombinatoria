/* =========================================================
   OPERAÇÃO ENIGMA: A FUGA DO LABORATÓRIO QUÂNTICO
   script.js — Lógica do jogo
   ---------------------------------------------------------
   Organização do arquivo:
    1. Constantes de configuração
    2. Dados das salas (cenário)
    3. Variáveis de estado da partida
    4. Módulo de áudio (Web Audio API)
    5. Funções utilitárias
    6. Telas, modais e HUD
    7. Cenário da sala e objetos
    8. Desafios (questões e resolução)
    9. Progressão (portas, vitória e derrota)
   10. Cronômetro
   11. Banco de questões (gabarito)
   12. Eventos de clique (inicialização)
   ========================================================= */


/* =========================================================
   1. CONSTANTES DE CONFIGURAÇÃO
   ========================================================= */
const ACERTOS_POR_FASE = [1, 2, 2, 3, 4]; // acertos para passar de cada fase (1 a 5)
const TOTAL_FASES = 5;
const TOTAL_ACERTOS = 12;                 // 1 + 2 + 2 + 3 + 4 = 12
const VIDAS_INICIAIS = 5;
const TEMPO_INICIAL = 20 * 60;            // 20 minutos (em segundos)


/* =========================================================
   2. DADOS DAS SALAS
   Cada sala possui a quantidade exata de objetos do tipo
   'desafio' correspondente ao número de acertos exigidos.
   Tipos de objeto:
   - 'desafio' → abre uma questão combinatória
   - 'pista'   → mostra uma dica teórica na caixa de mensagens
   - 'porta'   → mostra o status da fechadura
   ========================================================= */
const SALAS = [
  {
    nome: 'Sala de Triagem',
    nivel: 'Nível Fácil',
    tema: 'Princípio Fundamental da Contagem (PFC)',
    descricao: 'Luzes de emergência piscam em vermelho. Macas reviradas e um terminal ligado... A porta exige 1 código de acesso.',
    objetos: [
      { icone: '📋', nome: 'Prancheta', tipo: 'pista', texto: 'Anotação do Dr. Hall: "Quando uma decisão é tomada em ETAPAS independentes, MULTIPLIQUE as opções de cada etapa. É o Princípio Fundamental da Contagem!"' },
      { icone: '💻', nome: 'Terminal de Triagem', tipo: 'desafio' },
      { icone: '🚪', nome: 'Porta da Sala', tipo: 'porta' }
    ]
  },
  {
    nome: 'Sala de Servidores',
    nivel: 'Nível Básico',
    tema: 'Permutação Simples e com Repetição',
    descricao: 'O zumbido dos servidores é forte e o ar está quente. Dois equipamentos pedem autenticação. São necessários 2 códigos.',
    objetos: [
      { icone: '🗄️', nome: 'Rack de Servidores', tipo: 'desafio' },
      { icone: '📝', nome: 'Post-it', tipo: 'pista', texto: 'Post-it no monitor: "Permutar = reorganizar TODOS os elementos → n!. Se houver letras repetidas, divida pelos fatoriais de cada repetição: n! / (a! · b! · ...)"' },
      { icone: '📟', nome: 'Painel de Diagnóstico', tipo: 'desafio' },
      { icone: '🚪', nome: 'Porta Blindada', tipo: 'porta' }
    ]
  },
  {
    nome: 'Cofre de Credenciais',
    nivel: 'Nível Intermediário',
    tema: 'Arranjo Simples',
    descricao: 'Uma sala estreita com arquivos metálicos. Dois dispositivos de segurança guardam a saída. São necessários 2 códigos.',
    objetos: [
      { icone: '🗝️', nome: 'Quadro de Chaves', tipo: 'pista', texto: 'Gravado no quadro: "Se a ORDEM importa (cargos, posições, senhas, pódios), é ARRANJO: A(n,p) = n! / (n − p)!"' },
      { icone: '🔐', nome: 'Cofre Digital', tipo: 'desafio' },
      { icone: '🪪', nome: 'Leitor Biométrico', tipo: 'desafio' },
      { icone: '🚪', nome: 'Porta do Cofre', tipo: 'porta' }
    ]
  },
  {
    nome: 'Laboratório de Criptografia',
    nivel: 'Nível Avançado',
    tema: 'Combinação Simples',
    descricao: 'Telas exibem cifras numéricas em cascata. Três módulos criptográficos controlam a trava da porta. São necessários 3 códigos.',
    objetos: [
      { icone: '📖', nome: 'Caderno do Cientista', tipo: 'pista', texto: 'Página aberta: "Se a ORDEM NÃO importa (grupos, equipes, comissões, conexões), é COMBINAÇÃO: C(n,p) = n! / (p! · (n − p)!)"' },
      { icone: '🧮', nome: 'Máquina Enigma', tipo: 'desafio' },
      { icone: '📡', nome: 'Decodificador de Rede', tipo: 'desafio' },
      { icone: '🔑', nome: 'Matriz de Chaves', tipo: 'desafio' },
      { icone: '🚪', nome: 'Porta Criptografada', tipo: 'porta' }
    ]
  },
  {
    nome: 'Núcleo Central',
    nivel: 'Nível Difícil',
    tema: 'Restrições e Integração de Conceitos',
    descricao: 'O reator quântico pulsa no centro. Quatro travas de segurança precisam ser desativadas antes que o oxigênio acabe! São necessários 4 códigos.',
    objetos: [
      { icone: '📡', nome: 'Painel de Lasers', tipo: 'pista', texto: 'Aviso de segurança: "Estratégias: 1) comece pela RESTRIÇÃO; 2) elementos juntos formam um BLOCO; 3) use o COMPLEMENTAR (total − casos proibidos); 4) divida em CASOS se necessário."' },
      { icone: '⚛️', nome: 'Reator Quântico', tipo: 'desafio' },
      { icone: '🖥️', nome: 'Console de Controle', tipo: 'desafio' },
      { icone: '🔋', nome: 'Trava de Contenção', tipo: 'desafio' },
      { icone: '🚨', nome: 'Painel de Oxigênio', tipo: 'desafio' },
      { icone: '🚪', nome: 'Saída de Emergência', tipo: 'porta' }
    ]
  }
];


/* =========================================================
   3. VARIÁVEIS DE ESTADO DA PARTIDA
   ========================================================= */
let faseAtual = 1;              // fase em que o jogador está (1 a 5)
let acertosFase = 0;            // acertos na fase atual
let acertosTotais = 0;          // acertos somados de todas as fases (meta: 12)
let vidas = VIDAS_INICIAIS;     // vidas restantes (5 a 0)
let tempoRestante = TEMPO_INICIAL; // cronômetro regressivo em segundos
let questoesUsadas = [];        // guarda os IDs das questões já jogadas na partida
let questaoAtual = null;        // questão aberta no momento
let questaoRespondida = false;  // impede cliques múltiplos na mesma questão
let ultimaRespostaCerta = false;// lembra se a última resposta foi certa
let botaoDesafioAtual = null;   // guarda o elemento <button> do objeto de desafio clicado
let intervaloCronometro = null; // referência do setInterval do relógio
let jogoAtivo = false;          // true enquanto a partida está em andamento
let emTransicao = false;        // true durante a animação de troca de sala


/* =========================================================
   4. MÓDULO DE ÁUDIO (Web Audio API)
   Sons sintetizados diretamente pelo navegador via osciladores,
   sem necessidade de arquivos de áudio externos (.mp3/.wav).
   ========================================================= */
let audioCtx = null; // contexto de áudio
let somAtivo = true; // estado do som (ligado/mudo)

// Inicia ou retoma o AudioContext após o primeiro clique do usuário
function iniciarAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Toca uma nota simples: frequência em Hz, duração em segundos, tipo de onda e volume
function tocarNota(frequencia, duracao, tipo, volume, atraso) {
  if (!somAtivo || !audioCtx) return;

  const inicio = audioCtx.currentTime + (atraso || 0);
  const oscilador = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();

  oscilador.type = tipo || 'sine';
  oscilador.frequency.setValueAtTime(frequencia, inicio);

  // Volume decai suavemente até zero
  ganho.gain.setValueAtTime(volume || 0.2, inicio);
  ganho.gain.exponentialRampToValueAtTime(0.001, inicio + duracao);

  oscilador.connect(ganho);
  ganho.connect(audioCtx.destination);

  oscilador.start(inicio);
  oscilador.stop(inicio + duracao);
}

// Efeitos sonoros diretos do jogo
function somClique() {
  tocarNota(650, 0.07, 'square', 0.06);
}

function somAcerto() {
  tocarNota(523, 0.15, 'triangle', 0.25, 0);
  tocarNota(659, 0.15, 'triangle', 0.25, 0.1);
  tocarNota(784, 0.15, 'triangle', 0.25, 0.2);
  tocarNota(1047, 0.35, 'triangle', 0.25, 0.3);
}

function somErro() {
  tocarNota(220, 0.25, 'sawtooth', 0.18, 0);
  tocarNota(160, 0.4, 'sawtooth', 0.18, 0.25);
}

function somPorta() {
  tocarNota(90, 0.2, 'square', 0.25, 0);
  tocarNota(60, 0.3, 'square', 0.25, 0.15);
  tocarNota(784, 0.2, 'sine', 0.2, 0.5);
  tocarNota(988, 0.2, 'sine', 0.2, 0.6);
  tocarNota(1319, 0.5, 'sine', 0.2, 0.7);
}

function somVitoria() {
  const notas = [523, 659, 784, 1047, 784, 1047];
  notas.forEach(function (freq, i) {
    tocarNota(freq, 0.3, 'triangle', 0.25, i * 0.15);
  });
}

function somDerrota() {
  const notas = [392, 330, 262, 196];
  notas.forEach(function (freq, i) {
    tocarNota(freq, 0.45, 'sawtooth', 0.15, i * 0.3);
  });
}

function somBip() {
  tocarNota(1000, 0.06, 'square', 0.08);
}

// Botão de ligar/desligar som
function alternarSom() {
  somAtivo = !somAtivo;
  iniciarAudio();
  if (somAtivo) {
    somClique();
  }
  atualizarBotoesSom();
}

function atualizarBotoesSom() {
  document.querySelectorAll('.btn-som').forEach(function (botao) {
    botao.textContent = somAtivo ? '🔊 Som' : '🔇 Mudo';
  });
}


/* =========================================================
   5. FUNÇÕES UTILITÁRIAS
   ========================================================= */

// Formata segundos em texto "mm:ss" (ex: 125 -> "02:05")
function formatarTempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return String(minutos).padStart(2, '0') + ':' + String(resto).padStart(2, '0');
}

// Embaralha alternativas usando o algoritmo Fisher-Yates
function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copia[i];
    copia[i] = copia[j];
    copia[j] = temp;
  }
  return copia;
}

// Sorteia questão da fase que ainda NÃO foi usada na partida
function sortearQuestao(fase) {
  let disponiveis = QUESTOES.filter(function (q) {
    return q.fase === fase && !questoesUsadas.includes(q.id);
  });

  // Se por acaso acabarem as inéditas, libera as da fase novamente
  if (disponiveis.length === 0) {
    questoesUsadas = questoesUsadas.filter(function (id) {
      return Math.floor(id / 100) !== fase;
    });
    disponiveis = QUESTOES.filter(function (q) {
      return q.fase === fase;
    });
  }

  const indice = Math.floor(Math.random() * disponiveis.length);
  const sorteada = disponiveis[indice];
  questoesUsadas.push(sorteada.id);
  return sorteada;
}

// Reinicia uma animação CSS no elemento
function reiniciarAnimacao(elemento, classe) {
  elemento.classList.remove(classe);
  void elemento.offsetWidth;
  elemento.classList.add(classe);
}


/* =========================================================
   6. TELAS, MODAIS E HUD
   ========================================================= */

function mostrarTela(idTela) {
  document.querySelectorAll('.tela').forEach(function (tela) {
    tela.classList.remove('ativa');
  });
  document.getElementById(idTela).classList.add('ativa');
}

function abrirModal(idModal) {
  document.getElementById(idModal).classList.add('aberto');
}

function fecharModal(idModal) {
  document.getElementById(idModal).classList.remove('aberto');
}

function atualizarHUD() {
  document.getElementById('hud-fase').textContent = faseAtual + '/' + TOTAL_FASES;
  document.getElementById('hud-acertos-fase').textContent = acertosFase + '/' + ACERTOS_POR_FASE[faseAtual - 1];
  document.getElementById('hud-acertos-totais').textContent = acertosTotais + '/' + TOTAL_ACERTOS;

  let coracoes = '';
  for (let i = 0; i < VIDAS_INICIAIS; i++) {
    coracoes += (i < vidas) ? '❤️' : '🖤';
  }
  document.getElementById('hud-vidas').textContent = coracoes;

  atualizarCronometro();
}

function atualizarCronometro() {
  const elemento = document.getElementById('hud-tempo');
  elemento.textContent = formatarTempo(tempoRestante);
  elemento.classList.toggle('tempo-critico', tempoRestante <= 60);
}

function mostrarMensagem(texto) {
  const caixa = document.getElementById('mensagem-sala');
  caixa.textContent = texto;
  reiniciarAnimacao(caixa, 'animar');
}


/* =========================================================
   7. CENÁRIO DA SALA E OBJETOS
   ========================================================= */

function carregarSala() {
  const sala = SALAS[faseAtual - 1];
  botaoDesafioAtual = null;

  document.getElementById('tela-jogo').className = 'tela ativa fase-' + faseAtual;
  document.getElementById('sala-nivel').textContent = 'Fase ' + faseAtual + ' • ' + sala.nivel + ' • ' + sala.tema;
  document.getElementById('sala-nome').textContent = sala.nome;

  renderizarObjetos(sala);
  atualizarCadeados();
  mostrarMensagem(sala.descricao);

  reiniciarAnimacao(document.getElementById('sala'), 'animar-entrada');
}

function renderizarObjetos(sala) {
  const container = document.getElementById('sala-objetos');
  container.innerHTML = '';

  sala.objetos.forEach(function (objeto) {
    const botao = document.createElement('button');
    botao.className = 'objeto objeto-' + objeto.tipo;
    botao.innerHTML =
      '<span class="objeto-icone">' + objeto.icone + '</span>' +
      '<span class="objeto-nome">' + objeto.nome + '</span>';

    // Passamos tanto os dados do objeto quanto o próprio botão DOM
    botao.addEventListener('click', function () {
      clicarObjeto(objeto, botao);
    });

    container.appendChild(botao);
  });
}

function atualizarCadeados() {
  const necessarios = ACERTOS_POR_FASE[faseAtual - 1];
  let html = '';
  for (let i = 0; i < necessarios; i++) {
    if (i < acertosFase) {
      html += '<span class="cadeado aberto">🔓</span>';
    } else {
      html += '<span class="cadeado">🔒</span>';
    }
  }
  document.getElementById('cadeados').innerHTML = html;
}

function clicarObjeto(objeto, botao) {
  if (!jogoAtivo || emTransicao) return;
  somClique();

  if (objeto.tipo === 'pista') {
    mostrarMensagem(objeto.icone + ' ' + objeto.texto);

  } else if (objeto.tipo === 'porta') {
    const faltam = ACERTOS_POR_FASE[faseAtual - 1] - acertosFase;
    mostrarMensagem('🔒 A porta está trancada. Faltam ' + faltam + ' código(s) para destravá-la. Procure os objetos marcados como DESAFIO.');
    reiniciarAnimacao(document.getElementById('painel-fechadura'), 'tremer');

  } else if (objeto.tipo === 'desafio') {
    // Se este equipamento já foi resolvido, avisa o jogador e não abre a questão
    if (botao.classList.contains('resolvido')) {
      mostrarMensagem('✅ Este equipamento já foi desbloqueado! Procure outro objeto com DESAFIO na sala.');
      return;
    }

    // Guarda a referência do botão clicado para marcar como resolvido ao acertar
    botaoDesafioAtual = botao;
    abrirDesafio(objeto);
  }
}


/* =========================================================
   8. DESAFIOS (QUESTÕES E RESOLUÇÃO)
   ========================================================= */

function abrirDesafio(objeto) {
  if (questaoAtual === null) {
    questaoAtual = sortearQuestao(faseAtual);
    exibirQuestao(questaoAtual, objeto);
  }
  abrirModal('modal-questao');
}

function exibirQuestao(questao, objeto) {
  questaoRespondida = false;

  document.getElementById('questao-origem').textContent = objeto.icone + ' ' + objeto.nome + ' — código ' + (acertosFase + 1) + ' de ' + ACERTOS_POR_FASE[faseAtual - 1];
  document.getElementById('questao-tema').textContent = questao.tema;
  document.getElementById('questao-enunciado').textContent = questao.enunciado;

  const container = document.getElementById('questao-alternativas');
  container.innerHTML = '';
  const letras = ['A', 'B', 'C', 'D'];

  embaralhar(questao.alternativas).forEach(function (alternativa, i) {
    const botao = document.createElement('button');
    botao.className = 'alternativa';
    botao.textContent = letras[i] + ') ' + alternativa;
    botao.dataset.valor = alternativa;
    botao.addEventListener('click', function () {
      responder(botao);
    });
    container.appendChild(botao);
  });

  document.getElementById('questao-feedback').classList.add('oculto');
  document.getElementById('btn-continuar').classList.add('oculto');
  document.getElementById('btn-fechar-questao').classList.remove('oculto');
}

function responder(botaoEscolhido) {
  if (questaoRespondida || !jogoAtivo) return;
  questaoRespondida = true;

  const acertou = botaoEscolhido.dataset.valor === questaoAtual.respostaCorreta;
  ultimaRespostaCerta = acertou;

  document.querySelectorAll('.alternativa').forEach(function (botao) {
    botao.disabled = true;
    if (botao.dataset.valor === questaoAtual.respostaCorreta) {
      botao.classList.add('correta');
    }
  });

  const feedback = document.getElementById('questao-feedback');
  let titulo = '';

  if (acertou) {
    acertosFase++;
    acertosTotais++;

    // Marca o objeto físico da sala como RESOLVIDO
    if (botaoDesafioAtual) {
      botaoDesafioAtual.classList.add('resolvido');
    }

    somAcerto();
    feedback.className = 'feedback sucesso';
    titulo = '✅ CÓDIGO ACEITO! Este equipamento foi desbloqueado.';
  } else {
    vidas--;
    botaoEscolhido.classList.add('errada');
    somErro();
    reiniciarAnimacao(document.getElementById('caixa-questao'), 'tremer');
    feedback.className = 'feedback erro';
    titulo = '❌ CÓDIGO INVÁLIDO! Você perdeu 1 vida. Veja a resolução:';
  }

  feedback.innerHTML =
    '<strong>' + titulo + '</strong>' +
    '<p class="resolucao">📐 ' + questaoAtual.resolucao + '</p>';

  const botaoContinuar = document.getElementById('btn-continuar');
  if (vidas <= 0) {
    botaoContinuar.textContent = 'Ver resultado ➜';
  } else if (acertosFase >= ACERTOS_POR_FASE[faseAtual - 1]) {
    botaoContinuar.textContent = '🚪 Abrir a porta';
  } else {
    botaoContinuar.textContent = 'Continuar ➜';
  }

  botaoContinuar.classList.remove('oculto');
  document.getElementById('btn-fechar-questao').classList.add('oculto');

  atualizarHUD();
  atualizarCadeados();
}

function continuarAposResposta() {
  somClique();
  fecharModal('modal-questao');
  questaoAtual = null; // libera para sortear nova questão

  // 1) Se zerou as vidas -> Derrota
  if (vidas <= 0) {
    fimDeJogo(false, 'vidas');
    return;
  }

  // 2) Se completou os acertos da sala -> Destranca a porta
  const faltam = ACERTOS_POR_FASE[faseAtual - 1] - acertosFase;
  if (faltam <= 0) {
    destrancarPorta();
    return;
  }

  // 3) Mensagem de feedback na sala
  if (ultimaRespostaCerta) {
    mostrarMensagem('🔓 Trava liberada! Faltam ' + faltam + ' código(s). Procure outro equipamento marcado como DESAFIO.');
  } else {
    mostrarMensagem('⚠️ Alarme disparado! A trava falhou e um novo desafio foi gerado. Faltam ' + faltam + ' código(s).');
  }
}


/* =========================================================
   9. PROGRESSÃO: PORTAS, VITÓRIA E DERROTA
   ========================================================= */

function destrancarPorta() {
  emTransicao = true;
  somPorta();

  const porta = document.querySelector('.objeto-porta');
  porta.classList.add('destrancada');
  porta.querySelector('.objeto-icone').textContent = '🔓';
  porta.querySelector('.objeto-nome').textContent = 'Destrancada!';
  mostrarMensagem('✅ ACESSO LIBERADO! A porta pneumática se abre com um chiado...');

  setTimeout(function () {
    if (!jogoAtivo) return;

    if (faseAtual === TOTAL_FASES) {
      fimDeJogo(true);
      return;
    }

    const proximaSala = SALAS[faseAtual];
    document.getElementById('transicao-texto').innerHTML =
      '🔓 Sala ' + faseAtual + ' destrancada!<br><small>Entrando em: Sala ' + (faseAtual + 1) + ' — ' + proximaSala.nome + '</small>';
    document.getElementById('transicao').classList.add('ativa');

    setTimeout(function () {
      if (!jogoAtivo) return;
      faseAtual++;
      acertosFase = 0;
      carregarSala();
      atualizarHUD();
      document.getElementById('transicao').classList.remove('ativa');
      emTransicao = false;
    }, 2200);
  }, 1500);
}

function fimDeJogo(vitoria, motivo) {
  jogoAtivo = false;
  emTransicao = false;
  clearInterval(intervaloCronometro);
  fecharModal('modal-questao');
  document.getElementById('transicao').classList.remove('ativa');

  const tempoGasto = formatarTempo(TEMPO_INICIAL - tempoRestante);
  const erros = VIDAS_INICIAIS - vidas;

  if (vitoria) {
    somVitoria();
    montarEstatisticas('estatisticas-vitoria', [
      ['⏱️ Tempo gasto', tempoGasto],
      ['🫁 Oxigênio restante', formatarTempo(tempoRestante)],
      ['✅ Acertos', acertosTotais + '/' + TOTAL_ACERTOS],
      ['❌ Erros cometidos', erros],
      ['❤️ Vidas restantes', vidas]
    ]);
    mostrarTela('tela-vitoria');
  } else {
    somDerrota();
    const textoMotivo = (motivo === 'tempo')
      ? 'O oxigênio acabou! O sistema de segurança venceu desta vez...'
      : 'Você perdeu todas as vidas! O sistema bloqueou o laboratório definitivamente...';
    document.getElementById('motivo-derrota').textContent = textoMotivo;
    montarEstatisticas('estatisticas-derrota', [
      ['🚪 Sala alcançada', faseAtual + '/' + TOTAL_FASES + ' — ' + SALAS[faseAtual - 1].nome],
      ['⏱️ Tempo gasto', tempoGasto],
      ['✅ Acertos', acertosTotais + '/' + TOTAL_ACERTOS],
      ['❌ Erros cometidos', erros]
    ]);
    mostrarTela('tela-derrota');
  }
}

function montarEstatisticas(idLista, linhas) {
  let html = '';
  linhas.forEach(function (linha) {
    html += '<li><span>' + linha[0] + '</span><strong>' + linha[1] + '</strong></li>';
  });
  document.getElementById(idLista).innerHTML = html;
}

function iniciarPartida() {
  iniciarAudio();
  somClique();

  faseAtual = 1;
  acertosFase = 0;
  acertosTotais = 0;
  vidas = VIDAS_INICIAIS;
  tempoRestante = TEMPO_INICIAL;
  questoesUsadas = [];
  questaoAtual = null;
  questaoRespondida = false;
  botaoDesafioAtual = null;
  jogoAtivo = true;
  emTransicao = false;

  mostrarTela('tela-jogo');
  carregarSala();
  atualizarHUD();
  iniciarCronometro();
}


/* =========================================================
   10. CRONÔMETRO
   Pausa automaticamente quando 'emTransicao' for true.
   ========================================================= */
function iniciarCronometro() {
  clearInterval(intervaloCronometro);
  intervaloCronometro = setInterval(function () {
    // Não desconta tempo enquanto o jogador assiste à transição da porta
    if (emTransicao) return;

    tempoRestante--;
    atualizarCronometro();

    if (tempoRestante > 0 && tempoRestante <= 10) {
      somBip();
    }

    if (tempoRestante <= 0) {
      fimDeJogo(false, 'tempo');
    }
  }, 1000);
}


/* =========================================================
   11. BANCO DE QUESTÕES (GABARITO DO PROJETO)
   ========================================================= */
function montarGabarito() {
  let html = '';

  for (let fase = 1; fase <= TOTAL_FASES; fase++) {
    const sala = SALAS[fase - 1];
    const questoesDaFase = QUESTOES.filter(function (q) {
      return q.fase === fase;
    });

    html += '<section class="gabarito-fase fase-' + fase + '">';
    html += '<h3>Fase ' + fase + ' — ' + sala.nome + ' (' + sala.tema + ') • ' + questoesDaFase.length + ' questões</h3>';

    questoesDaFase.forEach(function (q) {
      let alternativas = '';
      q.alternativas.forEach(function (alt) {
        const classe = (alt === q.respostaCorreta) ? ' class="gabarito-correta"' : '';
        alternativas += '<li' + classe + '>' + alt + '</li>';
      });

      html +=
        '<details class="gabarito-questao">' +
          '<summary><strong>#' + q.id + '</strong> ' + q.enunciado + '</summary>' +
          '<p><em>Tema:</em> ' + q.tema + '</p>' +
          '<ol type="A">' + alternativas + '</ol>' +
          '<p class="gabarito-resposta">✅ Resposta correta: ' + q.respostaCorreta + '</p>' +
          '<p class="resolucao">📐 ' + q.resolucao + '</p>' +
        '</details>';
    });

    html += '</section>';
  }

  document.getElementById('gabarito-conteudo').innerHTML = html;
}

function alternarGabarito() {
  const itens = document.querySelectorAll('.gabarito-questao');
  const algumFechado = Array.from(itens).some(function (item) {
    return !item.open;
  });
  itens.forEach(function (item) {
    item.open = algumFechado;
  });
}


/* =========================================================
   12. EVENTOS DE CLIQUE (INICIALIZAÇÃO)
   ========================================================= */
document.getElementById('btn-iniciar').addEventListener('click', iniciarPartida);

document.querySelectorAll('.btn-som').forEach(function (botao) {
  botao.addEventListener('click', alternarSom);
});

document.getElementById('btn-gabarito').addEventListener('click', function () {
  iniciarAudio();
  somClique();
  abrirModal('modal-gabarito');
});

document.getElementById('btn-fechar-gabarito').addEventListener('click', function () {
  somClique();
  fecharModal('modal-gabarito');
});

document.getElementById('btn-expandir').addEventListener('click', function () {
  somClique();
  alternarGabarito();
});

document.getElementById('btn-fechar-questao').addEventListener('click', function () {
  somClique();
  fecharModal('modal-questao');
  mostrarMensagem('⏳ O desafio continua pendente. Clique novamente no objeto quando estiver pronto.');
});

document.getElementById('btn-continuar').addEventListener('click', continuarAposResposta);

document.querySelectorAll('.btn-reiniciar').forEach(function (botao) {
  botao.addEventListener('click', iniciarPartida);
});

document.querySelectorAll('.btn-menu').forEach(function (botao) {
  botao.addEventListener('click', function () {
    somClique();
    mostrarTela('tela-inicial');
  });
});

montarGabarito();
atualizarBotoesSom();
