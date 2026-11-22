# 🔐 Operação Enigma: A Fuga do Laboratório Quântico
### Jogo Educacional em Estilo Escape Room focado em Análise Combinatória
**Projeto do 1º Ano — Bacharelado em Sistemas de Informação**  
**Disciplinas:** Matemática Discreta e Desenvolvimento Web  
**Tecnologias:** HTML5, CSS3 e JavaScript Puro (Vanilla JS) — *Sem frameworks ou bibliotecas externas*.

---

## 🧭 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)
2. [História e Narrativa](#-história-e-narrativa)
3. [Como Funciona o Jogo (Regras)](#-como-funciona-o-jogo-regras)
4. [Estrutura dos Arquivos](#-estrutura-dos-arquivos)
5. [Como o Código foi Construído](#-como-o-código-foi-construído)
6. [Efeitos Sonoros com Web Audio API](#-efeitos-sonoros-com-web-audio-api)
7. [Como Jogar no seu Computador](#-como-jogar-no-seu-computador)
8. [Como Publicar no GitHub Pages](#-como-publicar-no-github-pages)
9. [Gabarito Completo com as 50 Questões e Resoluções](#-gabarito-completo-com-as-50-questões-e-resoluções)
   - [Fase 1: Princípio Fundamental da Contagem (PFC)](#fase-1--sala-de-triagem-pfc)
   - [Fase 2: Permutação Simples e com Repetição](#fase-2--sala-de-servidores-permutações)
   - [Fase 3: Arranjo Simples](#fase-3--cofre-de-credenciais-arranjo-simples)
   - [Fase 4: Combinação Simples](#fase-4--laboratório-de-criptografia-combinação-simples)
   - [Fase 5: Restrições e Casos Especiais](#fase-5--núcleo-central-restrições-e-casos-especiais)
10. [Dicas para a Apresentação do Trabalho](#-dicas-para-a-apresentação-do-trabalho)

---

## 🎯 Sobre o Projeto

O **Operação Enigma** é um jogo digital educativo criado para tornar o aprendizado de **Análise Combinatória** mais prático, visual e divertido. 

Em vez de apenas resolver exercícios em listas de papel, o jogador entra em um cenário de **Escape Room** onde precisa destravar portas eletrônicas, computadores e cofres resolvendo problemas matemáticos de contagem.

### O que o jogo ensina na prática:
- **PFC (Princípio Fundamental da Contagem):** multiplicar as opções de etapas que acontecem em sequência.
- **Permutações:** anagramas, filas e trocas de ordem de todos os elementos (com e sem letras repetidas).
- **Arranjos:** situações onde a **ordem faz diferença** (cargos, senhas ordenadas, pódios).
- **Combinações:** situações onde a **ordem não importa** (grupos de pessoas, equipes, duplas, conexões de cabos).
- **Problemas com restrições:** itens que precisam ficar juntos (método do bloco), pelo menos um (método do complementar) e casos separados.

---

## 🧪 História e Narrativa

> *Você é um estagiário de TI que ficou preso no Laboratório de Pesquisas Quânticas após um teste com o reator falhar e o sistema de emergência trancar todas as portas.*  
> *O suprimento de oxigênio do setor dura apenas 20 minutos. Cada porta está trancada por uma fechadura eletrônica que só aceita códigos gerados por cálculos combinatórios.*  
> *Para escapar com vida, você precisa inspecionar os equipamentos de cada sala, resolver os enigmas e destrancar as portas até chegar à saída de emergência.*

### As 5 Salas do Complexo:
1. **Fase 1 — Sala de Triagem (Fácil):**  
   Identificação de crachás e amostras.  
   *Objetivo:* **1 acerto** para abrir a primeira porta.
2. **Fase 2 — Sala de Servidores (Básico):**  
   Anagramas de sistemas operacionais e organização de racks.  
   *Objetivo:* **2 acertos** para abrir a porta blindada.
3. **Fase 3 — Cofre de Credenciais (Intermediário):**  
   Senhas alfanuméricas e cargos de acesso ao sistema.  
   *Objetivo:* **2 acertos** para destrancar a porta do cofre.
4. **Fase 4 — Laboratório de Criptografia (Avançado):**  
   Cálculo de chaves de segurança e equipes de cientistas.  
   *Objetivo:* **3 acertos** para desativar a barreira criptografada.
5. **Fase 5 — Núcleo Central / Saída (Difícil):**  
   Desafios com restrições antes que o oxigênio termine.  
   *Objetivo:* **4 acertos** para abrir a saída de emergência e vencer o jogo.

---

## ⚖️ Como Funciona o Jogo (Regras)

- **Total de acertos para vencer:** São necessários **12 acertos** no total ($1 + 2 + 2 + 3 + 4 = 12$).
- **Sistema de Vidas:** O jogador começa com **5 vidas** (❤️). Cada código incorreto desconta 1 vida. Se perder todas as vidas, o jogo termina em **Derrota**.
- **Cronômetro de Oxigênio:** São **20 minutos** regressivos. Se o tempo zerar antes de sair da Fase 5, o jogador perde. Quando falta menos de 1 minuto, o relógio fica vermelho e toca bipes de alerta. O cronômetro é **pausado durante as transições de sala** para não prejudicar o jogador enquanto a porta abre.
- **Objetos Interativos em cada Sala:**
  - 📋 / 📝 / 🗝️ / 📖 / 📡 **Pistas:** Dicas teóricas deixadas no cenário com as fórmulas e conceitos daquela matéria.
  - 💻 / 🗄️ / 🔐 / 🧮 / ⚛️ **Desafios:** Equipamentos que abrem as questões. Cada sala tem exatamente a quantidade de desafios necessária para abrir a porta.
  - **Equipamentos Resolvidos:** Ao acertar o desafio de um equipamento, ele recebe a etiqueta verde **`RESOLVIDO ✓`** e não pode ser clicado novamente.
  - 🚪 **Porta:** Mostra quantos códigos ainda faltam para destrancar a sala.
- **Se errar uma questão:** O jogador perde 1 vida, mas **não perde os acertos que já conseguiu**. Uma nova questão inédita do mesmo assunto é sorteada para aquele equipamento e a tela mostra a explicação passo a passo para que o jogador aprenda com o erro.
- **Sorteio sem repetição:** O jogo nunca repete uma questão já jogada durante a mesma partida.
- **Botão Jogar Novamente:** Permite reiniciar a qualquer momento nas telas de vitória ou derrota, zerando vidas, acertos e o relógio.

---

## 📂 Estrutura dos Arquivos

O projeto foi dividido em apenas 4 arquivos principais, fáceis de entender e de manter:

```text
projetoanalise/
├── index.html       # Telas do jogo, botões, modais e barra superior (HUD)
├── style.css        # Visual escuro com cores por fase, animações e responsividade
├── questions.js     # Banco de dados com as 50 questões, alternativas e resoluções
├── script.js        # Lógica do jogo (estado, sorteio, cronômetro, áudio e cliques)
└── README.md        # Documentação do trabalho e gabarito completo
```

---

## 🛠️ Como o Código foi Construído

Para facilitar a explicação na apresentação do 1º ano, o código foi feito de forma direta e limpa:

1. **Apenas HTML5, CSS3 e JavaScript Puro (Vanilla JS):**  
   Não usamos React, Bootstrap, Tailwind ou pacotes externos. Isso garante que qualquer pessoa possa abrir o projeto sem precisar instalar nada e que cada linha de código seja fácil de explicar.
2. **Variáveis de Estado Claras:**  
   No início do `script.js`, guardamos o estado da partida em variáveis simples:
   - `faseAtual`: número de 1 a 5 indicando a sala.
   - `acertosFase`: acertos conquistados na sala atual.
   - `acertosTotais`: acertos somados no jogo (de 0 a 12).
   - `vidas`: quantidade de vidas restantes (de 5 a 0).
   - `tempoRestante`: segundos restantes no cronômetro.
   - `questoesUsadas`: lista com os números das questões já jogadas para não repetir.
   - `botaoDesafioAtual`: guarda qual botão de equipamento foi clicado para marcá-lo como `RESOLVIDO ✓` ao acertar.
3. **Manipulação Simples do DOM:**  
   Usamos métodos padrão como `document.getElementById()`, `document.querySelectorAll()`, `addEventListener()` e classes CSS (`.classList.add()`, `.classList.remove()`).
4. **Cores Dinâmicas no CSS:**  
   Criamos uma variável CSS `--cor-fase`. Quando o jogador avança de fase, o JavaScript só muda a classe da tela (ex: de `.fase-1` para `.fase-2`), e todas as bordas, títulos e sombras mudam de cor automaticamente.

---

## 🔊 Efeitos Sonoros com Web Audio API

Em vez de usar arquivos `.mp3` pesados (que poderiam quebrar links no GitHub Pages), o jogo usa a **Web Audio API**, que já vem embutida no próprio navegador:
- Criamos um sintetizador simples com a função `tocarNota(frequencia, duracao, tipoOnda, volume)`.
- O navegador gera os sons na hora usando pequenos osciladores digitais:
  - **Clique:** som curto em onda quadrada.
  - **Acerto:** arpejo alegre subindo 4 notas.
  - **Erro:** som grave de alarme avisando o código inválido.
  - **Porta abrindo:** batida grave com som eletrônico de liberação.
  - **Bipe dos 10 segundos finais:** aviso sonoro a cada segundo quando o oxigênio está no fim.
  - **Vitória e Derrota:** melodias sintetizadas ao concluir a partida.
- Inclui um botão funcional **"🔊 Som / 🔇 Mudo"** para quem preferir jogar em silêncio.

---

## 🚀 Como Jogar no seu Computador

Você não precisa instalar Node.js nem programas complexos.

### Opção 1: Abrir direto no navegador (Mais rápido)
1. Abra a pasta do projeto no explorador de arquivos do seu computador.
2. Dê dois cliques no arquivo `index.html`.
3. O jogo vai abrir direto no Chrome, Edge, Firefox ou Safari.

### Opção 2: Usar um servidor local simples
Se você usa o VS Code:
- Clique com o botão direito sobre o arquivo `index.html` e escolha **"Open with Live Server"**.

Ou pelo terminal (com Python):
```bash
python3 -m http.server 8000
```
E acesse no navegador: `http://localhost:8000`

---

## 🌐 Como Publicar no GitHub Pages

Para colocar o jogo na internet gratuitamente e enviar o link para o professor:

1. Crie um repositório público no seu GitHub (ex: `fuga-laboratorio-combinatoria`).
2. Envie os arquivos (`index.html`, `style.css`, `questions.js`, `script.js` e `README.md`) para o repositório.
3. No repositório no GitHub, clique na aba **Settings** (Configurações).
4. No menu à esquerda, clique em **Pages**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
6. Aguarde cerca de 1 minuto e recarregue a página. O link do seu jogo estará disponível lá (ex: `https://seu-usuario.github.io/fuga-laboratorio-combinatoria/`).

---

## 📖 Gabarito Completo com as 50 Questões e Resoluções

Todas as 50 questões foram resolvidas, revisadas e verificadas para garantir precisão matemática.

---

### FASE 1 — SALA DE TRIAGEM (PFC)
*Tema: Princípio Fundamental da Contagem (Multiplicação de opções em etapas)*

#### Questão 101
- **Enunciado:** Na Sala de Triagem, cada crachá de acesso é formado por 1 cor (entre 4 cores disponíveis) e 1 número (entre 5 números disponíveis). Quantos crachás diferentes podem ser gerados?
- **Alternativas:** A) 9 | B) **20** | C) 24 | D) 16
- **Resposta Correta:** **20**
- **Resolução:** São duas etapas independentes: escolher a cor (4 opções) e escolher o número (5 opções). Pelo PFC: $4 \times 5 = 20$ crachás.

#### Questão 102
- **Enunciado:** O terminal pede uma senha de 3 algarismos (0 a 9), sendo permitido repetir algarismos. Quantas senhas diferentes existem?
- **Alternativas:** A) 720 | B) 30 | C) **1.000** | D) 999
- **Resposta Correta:** **1.000**
- **Resolução:** Como pode repetir, cada uma das 3 posições tem 10 opções (0 a 9): $10 \times 10 \times 10 = 1.000$ senhas.

#### Questão 103
- **Enunciado:** Para passar pela descontaminação você precisa vestir um uniforme completo. Há 3 jalecos, 4 calças e 2 pares de botas disponíveis. De quantas maneiras diferentes você pode se vestir?
- **Alternativas:** A) 9 | B) 12 | C) **24** | D) 18
- **Resposta Correta:** **24**
- **Resolução:** Três escolhas em sequência (jaleco, calça e botas): $3 \times 4 \times 2 = 24$ maneiras.

#### Questão 104
- **Enunciado:** Do Corredor A ao Corredor B existem 3 portas; do Corredor B até a Sala C existem 4 dutos de ventilação. De quantas maneiras você pode ir de A até C passando por B?
- **Alternativas:** A) 7 | B) **12** | C) 14 | D) 64
- **Resposta Correta:** **12**
- **Resolução:** Etapa 1 ($A \to B$): 3 opções. Etapa 2 ($B \to C$): 4 opções. Como as etapas acontecem uma após a outra, multiplicamos: $3 \times 4 = 12$ caminhos.

#### Questão 105
- **Enunciado:** O código de uma amostra biológica é formado por 2 letras (do alfabeto de 26 letras, podendo repetir) seguidas de 1 algarismo (0 a 9). Quantos códigos distintos existem?
- **Alternativas:** A) 650 | B) **6.760** | C) 6.500 | D) 676
- **Resposta Correta:** **6.760**
- **Resolução:** 1ª letra: 26 opções; 2ª letra: 26 opções; algarismo: 10 opções. Pelo PFC: $26 \times 26 \times 10 = 6.760$ códigos.

#### Questão 106
- **Enunciado:** Um sensor transmite mensagens de 8 bits, em que cada bit pode ser 0 ou 1. Quantas mensagens diferentes podem ser transmitidas?
- **Alternativas:** A) 16 | B) 64 | C) 128 | D) **256**
- **Resposta Correta:** **256**
- **Resolução:** Cada bit tem 2 possibilidades (0 ou 1): $2^8 = 256$ mensagens.

#### Questão 107
- **Enunciado:** O teclado da porta exige uma senha de 4 algarismos (0 a 9) SEM repetir algarismos. Quantas senhas são possíveis?
- **Alternativas:** A) **5.040** | B) 10.000 | C) 210 | D) 40
- **Resposta Correta:** **5.040**
- **Resolução:** Sem repetição, cada posição tem uma opção a menos: $10 \times 9 \times 8 \times 7 = 5.040$ senhas.

#### Questão 108
- **Enunciado:** Usando apenas os algarismos 1, 2, 3, 4 e 5, quantos números de 3 algarismos DISTINTOS podem ser formados?
- **Alternativas:** A) 125 | B) 15 | C) 10 | D) **60**
- **Resposta Correta:** **60**
- **Resolução:** Centena: 5 opções; dezena: 4 opções; unidade: 3 opções. Total: $5 \times 4 \times 3 = 60$ números.

#### Questão 109
- **Enunciado:** O sistema de triagem numera os pacientes apenas com números PARES de 3 algarismos (de 100 a 999). Quantos números estão disponíveis?
- **Alternativas:** A) 500 | B) **450** | C) 900 | D) 405
- **Resposta Correta:** **450**
- **Resolução:** Centena: 9 opções (1 a 9, pois não começa em 0); dezena: 10 opções (0 a 9); unidade: 5 opções pares (0, 2, 4, 6, 8). Total: $9 \times 10 \times 5 = 450$ números.

#### Questão 110
- **Enunciado:** Para gerar uma chave aleatória, o computador lança uma moeda 3 vezes e, depois, um dado de 6 faces 1 vez. Quantas sequências de resultados são possíveis?
- **Alternativas:** A) 12 | B) 24 | C) 36 | D) **48**
- **Resposta Correta:** **48**
- **Resolução:** Moeda: $2 \times 2 \times 2 = 8$ opções. Dado: 6 opções. Total: $8 \times 6 = 48$ sequências.

---

### FASE 2 — SALA DE SERVIDORES (PERMUTAÇÕES)
*Tema: Permutação Simples ($n!$) e com Repetição ($\frac{n!}{a! \cdot b! \dots}$)*

#### Questão 201
- **Enunciado:** Quantos anagramas (reorganizações de todas as letras) podem ser formados com a palavra CHAVE?
- **Alternativas:** A) 24 | B) 25 | C) **120** | D) 60
- **Resposta Correta:** **120**
- **Resolução:** CHAVE tem 5 letras distintas: $P_5 = 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$ anagramas.

#### Questão 202
- **Enunciado:** Quantos anagramas podem ser formados com a palavra CODIGO?
- **Alternativas:** A) 720 | B) **360** | C) 180 | D) 120
- **Resposta Correta:** **360**
- **Resolução:** CODIGO tem 6 letras, com a letra O repetida 2 vezes: $\frac{6!}{2!} = \frac{720}{2} = 360$ anagramas.

#### Questão 203
- **Enunciado:** Seis servidores diferentes devem ser instalados em um rack com exatamente 6 posições. De quantas maneiras os servidores podem ser organizados?
- **Alternativas:** A) 36 | B) **720** | C) 120 | D) 46.656
- **Resposta Correta:** **720**
- **Resolução:** Mudar a ordem de 6 objetos distintos: $6! = 720$ maneiras.

#### Questão 204
- **Enunciado:** Quantos anagramas podem ser formados com a palavra BANANA?
- **Alternativas:** A) 720 | B) 120 | C) 36 | D) **60**
- **Resposta Correta:** **60**
- **Resolução:** BANANA tem 6 letras: A aparece 3 vezes e N aparece 2 vezes. $\frac{6!}{3! \times 2!} = \frac{720}{6 \times 2} = \frac{720}{12} = 60$ anagramas.

#### Questão 205
- **Enunciado:** O nome do servidor principal é ALGORITMO. Quantos anagramas podem ser formados com essa palavra?
- **Alternativas:** A) 40.320 | B) **181.440** | C) 90.720 | D) 362.880
- **Resposta Correta:** **181.440**
- **Resolução:** ALGORITMO tem 9 letras e apenas a letra O se repete (2 vezes): $\frac{9!}{2!} = \frac{362.880}{2} = 181.440$ anagramas.

#### Questão 206
- **Enunciado:** Quantos anagramas podem ser formados com a palavra MATEMATICA?
- **Alternativas:** A) **151.200** | B) 75.600 | C) 302.400 | D) 3.628.800
- **Resposta Correta:** **151.200**
- **Resolução:** MATEMATICA tem 10 letras: A (3 vezes), M (2 vezes) e T (2 vezes). $\frac{10!}{3! \times 2! \times 2!} = \frac{3.628.800}{6 \times 2 \times 2} = 151.200$ anagramas.

#### Questão 207
- **Enunciado:** Quantos anagramas da palavra DADOS começam com a letra D?
- **Alternativas:** A) 12 | B) 60 | C) **24** | D) 120
- **Resposta Correta:** **24**
- **Resolução:** Fixamos uma letra D na primeira posição. Sobram as letras A, D, O, S (4 letras distintas): $4! = 24$ anagramas.

#### Questão 208
- **Enunciado:** Um pacote de dados tem 7 bits, sendo exatamente 4 zeros e 3 uns. Quantas sequências diferentes existem?
- **Alternativas:** A) 128 | B) 21 | C) 5.040 | D) **35**
- **Resposta Correta:** **35**
- **Resolução:** Permutação com repetição de 7 símbolos: $\frac{7!}{4! \times 3!} = \frac{5.040}{24 \times 6} = 35$ sequências.

#### Questão 209
- **Enunciado:** Cinco cientistas vão se sentar em fila diante dos monitores. Ana e Beto precisam ficar JUNTOS (lado a lado). De quantas maneiras a fila pode ser formada?
- **Alternativas:** A) **48** | B) 120 | C) 24 | D) 96
- **Resposta Correta:** **48**
- **Resolução:** Juntamos Ana e Beto como um único bloco. Agora temos 4 elementos (o bloco + 3 pessoas): $4! = 24$. Dentro do bloco, Ana e Beto podem trocar de lugar entre si ($2! = 2$). Total: $24 \times 2 = 48$ maneiras.

#### Questão 210
- **Enunciado:** Quantos anagramas podem ser formados com a palavra REDE?
- **Alternativas:** A) 24 | B) 6 | C) **12** | D) 8
- **Resposta Correta:** **12**
- **Resolução:** REDE tem 4 letras e a letra E aparece 2 vezes: $\frac{4!}{2!} = \frac{24}{2} = 12$ anagramas.

---

### FASE 3 — COFRE DE CREDENCIAIS (ARRANJO SIMPLES)
*Tema: Arranjo Simples (A ORDEM dos elementos faz diferença)*  
*Fórmula:* $A(n, p) = \frac{n!}{(n - p)!}$

#### Questão 301
- **Enunciado:** Dos 8 técnicos presos no complexo, serão escolhidos um Líder, um Vice-líder e um Operador de Rádio (cargos diferentes). De quantas maneiras isso pode ser feito?
- **Alternativas:** A) 56 | B) **336** | C) 24 | D) 512
- **Resposta Correta:** **336**
- **Resolução:** Como os cargos são diferentes, a ordem importa (é Arranjo): $A(8, 3) = 8 \times 7 \times 6 = 336$ maneiras.

#### Questão 302
- **Enunciado:** O cofre usa uma senha de 4 LETRAS DISTINTAS escolhidas entre as 26 letras do alfabeto. Quantas senhas são possíveis?
- **Alternativas:** A) 456.976 | B) 14.950 | C) **358.800** | D) 104
- **Resposta Correta:** **358.800**
- **Resolução:** Em senhas a ordem importa: $A(26, 4) = 26 \times 25 \times 24 \times 23 = 358.800$ senhas.

#### Questão 303
- **Enunciado:** Dez robôs de segurança disputam uma corrida de teste. De quantas formas distintas pode ser formado o pódio (1º, 2º e 3º lugares)?
- **Alternativas:** A) **720** | B) 120 | C) 1.000 | D) 30
- **Resposta Correta:** **720**
- **Resolução:** No pódio as colocações são distintas: $A(10, 3) = 10 \times 9 \times 8 = 720$ pódios.

#### Questão 304
- **Enunciado:** O cofre principal usa uma senha de 5 algarismos DISTINTOS (0 a 9). Quantas senhas são possíveis?
- **Alternativas:** A) 252 | B) 100.000 | C) 15.120 | D) **30.240**
- **Resposta Correta:** **30.240**
- **Resolução:** $A(10, 5) = 10 \times 9 \times 8 \times 7 \times 6 = 30.240$ senhas.

#### Questão 305
- **Enunciado:** Usando os algarismos de 1 a 9, quantos números de 3 algarismos DISTINTOS podem ser formados?
- **Alternativas:** A) 84 | B) **504** | C) 729 | D) 336
- **Resposta Correta:** **504**
- **Resolução:** A posição dos números muda o resultado ($123 \neq 321$): $A(9, 3) = 9 \times 8 \times 7 = 504$ números.

#### Questão 306
- **Enunciado:** Três credenciais diferentes (Admin, Root e Guest) serão entregues a 3 dos 7 analistas do laboratório, e cada analista recebe no máximo uma. De quantas maneiras a distribuição pode ser feita?
- **Alternativas:** A) 35 | B) 21 | C) 343 | D) **210**
- **Resposta Correta:** **210**
- **Resolução:** As credenciais dão poderes diferentes: $A(7, 3) = 7 \times 6 \times 5 = 210$ maneiras.

#### Questão 307
- **Enunciado:** Há 6 chaves diferentes e 4 fechaduras distintas no cofre. Cada fechadura recebe exatamente uma chave, sem repetir chaves. De quantas maneiras as chaves podem ser posicionadas?
- **Alternativas:** A) 15 | B) 720 | C) **360** | D) 1.296
- **Resposta Correta:** **360**
- **Resolução:** As fechaduras são diferentes: $A(6, 4) = 6 \times 5 \times 4 \times 3 = 360$ maneiras.

#### Questão 308
- **Enunciado:** O log do cofre indica que o número de arranjos de n senhas tomadas 2 a 2 é 56, ou seja, A(n,2) = 56. Qual é o valor de n?
- **Alternativas:** A) 7 | B) 14 | C) **8** | D) 28
- **Resposta Correta:** **8**
- **Resolução:** $A(n, 2) = n \times (n - 1) = 56$. Dois números inteiros consecutivos multiplicados que dão 56 são $8 \times 7$. Logo, $n = 8$.

#### Questão 309
- **Enunciado:** Cada login do cofre tem 2 letras distintas (de 26) seguidas de 3 algarismos distintos (de 0 a 9). Quantos logins diferentes existem?
- **Alternativas:** A) **468.000** | B) 676.000 | C) 1.370 | D) 234.000
- **Resposta Correta:** **468.000**
- **Resolução:** Letras: $26 \times 25 = 650$. Algarismos: $10 \times 9 \times 8 = 720$. Pelo PFC: $650 \times 720 = 468.000$ logins.

#### Questão 310
- **Enunciado:** Com os algarismos 0, 1, 2, 3, 4 e 5, quantos números de 4 algarismos DISTINTOS podem ser formados?
- **Alternativas:** A) 360 | B) 240 | C) 1.296 | D) **300**
- **Resposta Correta:** **300**
- **Resolução:** O primeiro dígito (milhar) não pode ser zero (5 opções). Para o segundo, sobram 5 opções (pois o zero agora pode entrar). Para o terceiro, 4 opções. Para o quarto, 3 opções. Total: $5 \times 5 \times 4 \times 3 = 300$ números.

---

### FASE 4 — LABORATÓRIO DE CRIPTOGRAFIA (COMBINAÇÃO SIMPLES)
*Tema: Combinação Simples (A ORDEM dos elementos NÃO importa)*  
*Fórmula:* $C(n, p) = \frac{n!}{p! \cdot (n - p)!}$

#### Questão 401
- **Enunciado:** Para operar a Máquina Enigma é preciso formar uma equipe de 3 técnicos dentre 8 disponíveis (sem cargos: todos têm a mesma função). Quantas equipes são possíveis?
- **Alternativas:** A) 336 | B) 24 | C) **56** | D) 512
- **Resposta Correta:** **56**
- **Resolução:** A equipe $\{A, B, C\}$ é exatamente a mesma que $\{C, B, A\}$ (a ordem não importa): $C(8, 3) = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = \frac{336}{6} = 56$ equipes.

#### Questão 402
- **Enunciado:** Dez cientistas se encontram no laboratório e cada um aperta a mão de todos os outros uma única vez. Quantos apertos de mão ocorrem?
- **Alternativas:** A) **45** | B) 90 | C) 100 | D) 20
- **Resposta Correta:** **45**
- **Resolução:** Cada aperto de mão envolve uma dupla de pessoas, e o aperto entre A e B é o mesmo que entre B e A: $C(10, 2) = \frac{10 \times 9}{2} = 45$ apertos de mão.

#### Questão 403
- **Enunciado:** O protocolo exige escolher 6 chaves criptográficas de um conjunto de 10 (a ordem de escolha não importa). Quantas seleções são possíveis?
- **Alternativas:** A) 60 | B) 5.040 | C) 151.200 | D) **210**
- **Resposta Correta:** **210**
- **Resolução:** Escolher 6 entre 10 é o mesmo que deixar 4 de fora: $C(10, 6) = C(10, 4) = \frac{10 \times 9 \times 8 \times 7}{4 \times 3 \times 2 \times 1} = 210$ seleções.

#### Questão 404
- **Enunciado:** Sete terminais precisam ser interligados. Cada cabo conecta exatamente 2 terminais e cada par de terminais recebe um único cabo. Quantos cabos são necessários para ligar todos os pares?
- **Alternativas:** A) 14 | B) 42 | C) **21** | D) 49
- **Resposta Correta:** **21**
- **Resolução:** Cada cabo liga um par de terminais e a ordem não importa: $C(7, 2) = \frac{7 \times 6}{2} = 21$ cabos.

#### Questão 405
- **Enunciado:** Sobre uma placa existem 9 sensores, sem que 3 deles estejam alinhados. Quantos triângulos podem ser formados com vértices nesses sensores?
- **Alternativas:** A) **84** | B) 27 | C) 504 | D) 36
- **Resposta Correta:** **84**
- **Resolução:** Um triângulo é formado por qualquer grupo de 3 pontos: $C(9, 3) = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} = 84$ triângulos.

#### Questão 406
- **Enunciado:** Uma força-tarefa terá 2 engenheiros e 3 químicos. Há 5 engenheiros e 6 químicos disponíveis. Quantas forças-tarefa diferentes podem ser formadas?
- **Alternativas:** A) 30 | B) **200** | C) 462 | D) 120
- **Resposta Correta:** **200**
- **Resolução:** Engenheiros: $C(5, 2) = \frac{5 \times 4}{2} = 10$. Químicos: $C(6, 3) = \frac{6 \times 5 \times 4}{6} = 20$. Pelo PFC: $10 \times 20 = 200$ forças-tarefa.

#### Questão 407
- **Enunciado:** A fechadura do laboratório tem o formato de um polígono regular de 10 lados. Quantas diagonais esse polígono possui?
- **Alternativas:** A) 45 | B) 20 | C) 70 | D) **35**
- **Resposta Correta:** **35**
- **Resolução:** Total de segmentos entre dois vértices: $C(10, 2) = 45$. Subtraindo os 10 lados que não são diagonais: $45 - 10 = 35$ diagonais.

#### Questão 408
- **Enunciado:** O sistema precisa escolher 4 algoritmos de criptografia, dentre 12 disponíveis, para um teste conjunto (a ordem não importa). Quantas escolhas são possíveis?
- **Alternativas:** A) 11.880 | B) 48 | C) 220 | D) **495**
- **Resposta Correta:** **495**
- **Resolução:** $C(12, 4) = \frac{12 \times 11 \times 10 \times 9}{4 \times 3 \times 2 \times 1} = 495$ escolhas.

#### Questão 409
- **Enunciado:** O painel mostra a equação C(n,2) = 28. Qual é o valor de n?
- **Alternativas:** A) **8** | B) 7 | C) 14 | D) 56
- **Resposta Correta:** **8**
- **Resolução:** $C(n, 2) = \frac{n \times (n - 1)}{2} = 28 \implies n \times (n - 1) = 56$. Como $8 \times 7 = 56$, temos $n = 8$.

#### Questão 410
- **Enunciado:** Será formado um grupo de 5 pesquisadores escolhidos entre 7, mas a Dra. Lia, chefe do laboratório, obrigatoriamente faz parte do grupo. Quantos grupos são possíveis?
- **Alternativas:** A) 21 | B) **15** | C) 6 | D) 35
- **Resposta Correta:** **15**
- **Resolução:** A Dra. Lia já tem vaga garantida. Sobram 4 vagas para escolher entre os 6 pesquisadores restantes: $C(6, 4) = C(6, 2) = \frac{6 \times 5}{2} = 15$ grupos.

---

### FASE 5 — NÚCLEO CENTRAL (RESTRIÇÕES E CASOS ESPECIAIS)
*Tema: Problemas com Restrições, Divisão em Casos e Método do Complementar*

#### Questão 501
- **Enunciado:** Quantos anagramas da palavra ENIGMA começam por VOGAL e terminam por CONSOANTE?
- **Alternativas:** A) 720 | B) 144 | C) **216** | D) 432
- **Resposta Correta:** **216**
- **Resolução:** ENIGMA tem 3 vogais (E, I, A) e 3 consoantes (N, G, M).  
  - 1ª letra (vogal): 3 opções.  
  - Última letra (consoante): 3 opções.  
  - As 4 letras do meio permutam livremente: $4! = 24$.  
  Total: $3 \times 24 \times 3 = 216$ anagramas.

#### Questão 502
- **Enunciado:** Uma equipe de 4 pessoas para desligar o reator será formada a partir de 6 físicos e 5 programadoras. A equipe deve ter PELO MENOS uma programadora. Quantas equipes são possíveis?
- **Alternativas:** A) 330 | B) **315** | C) 150 | D) 300
- **Resposta Correta:** **315**
- **Resolução:** Usamos o método do complementar: Total de equipes menos equipes só com físicos.  
  - Total geral de equipes com 4 pessoas de 11: $C(11, 4) = 330$.  
  - Equipes formadas apenas por físicos: $C(6, 4) = 15$.  
  - Equipes com ao menos uma programadora: $330 - 15 = 315$ equipes.

#### Questão 503
- **Enunciado:** Sete agentes devem passar em fila pelo scanner. Os agentes X e Y são rivais e NÃO podem ficar lado a lado. Quantas filas são possíveis?
- **Alternativas:** A) 1.440 | B) 5.040 | C) **3.600** | D) 4.320
- **Resposta Correta:** **3.600**
- **Resolução:**  
  - Total de filas com 7 pessoas: $7! = 5.040$.  
  - Filas com X e Y juntos (formando um bloco): $6! \times 2! = 720 \times 2 = 1.440$.  
  - Filas onde X e Y NÃO estão juntos: $5.040 - 1.440 = 3.600$ filas.

#### Questão 504
- **Enunciado:** A senha do núcleo tem 2 letras distintas (de 26) seguidas de 2 algarismos distintos, sendo que o ÚLTIMO algarismo deve ser ÍMPAR. Quantas senhas são possíveis?
- **Alternativas:** A) 32.500 | B) **29.250** | C) 58.500 | D) 23.400
- **Resposta Correta:** **29.250**
- **Resolução:**  
  - Letras: $26 \times 25 = 650$.  
  - Algarismos (começando pela restrição do último algarismo):  
    - Último algarismo (ímpar: 1, 3, 5, 7, 9): 5 opções.  
    - Penúltimo algarismo (qualquer um dos 10, exceto o já usado): 9 opções.  
    - Total para os algarismos: $9 \times 5 = 45$.  
  Total geral: $650 \times 45 = 29.250$ senhas.

#### Questão 505
- **Enunciado:** Uma comissão terá 3 engenheiros (escolhidos entre 7) e 2 programadores (escolhidos entre 5). Porém, o engenheiro Rui se recusa a trabalhar com a programadora Sara. Quantas comissões são possíveis?
- **Alternativas:** A) 350 | B) 60 | C) 310 | D) **290**
- **Resposta Correta:** **290**
- **Resolução:**  
  - Total de comissões sem restrição: $C(7, 3) \times C(5, 2) = 35 \times 10 = 350$.  
  - Comissões proibidas (com Rui e Sara juntos):  
    - Mais 2 engenheiros entre os 6 restantes: $C(6, 2) = 15$.  
    - Mais 1 programador entre os 4 restantes: $C(4, 1) = 4$.  
    - Reuniões proibidas: $15 \times 4 = 60$.  
  - Comissões permitidas: $350 - 60 = 290$.

#### Questão 506
- **Enunciado:** Quantos números PARES de 4 algarismos DISTINTOS podem ser formados com os algarismos de 0 a 9?
- **Alternativas:** A) 2.520 | B) **2.296** | C) 1.792 | D) 504
- **Resposta Correta:** **2.296**
- **Resolução:** Separamos em 2 casos por causa do zero:  
  - **Caso 1 — Termina em 0:** milhar tem 9 opções, centena tem 8, dezena tem 7 $\implies 9 \times 8 \times 7 = 504$.  
  - **Caso 2 — Termina em 2, 4, 6 ou 8 (4 opções):** milhar não pode ser 0 nem o número final (8 opções); centena tem 8 opções; dezena tem 7 $\implies 4 \times 8 \times 8 \times 7 = 1.792$.  
  Total: $504 + 1.792 = 2.296$ números pares.

#### Questão 507
- **Enunciado:** Quantos anagramas da palavra QUANTICO apresentam todas as VOGAIS JUNTAS (em qualquer ordem)?
- **Alternativas:** A) **2.880** | B) 40.320 | C) 576 | D) 120
- **Resposta Correta:** **2.880**
- **Resolução:** QUANTICO tem 4 vogais (U, A, I, O) e 4 consoantes (Q, N, T, C).  
  - Juntamos as 4 vogais em 1 bloco: bloco + 4 consoantes = 5 elementos $\implies 5! = 120$.  
  - As 4 vogais trocam de lugar dentro do bloco: $4! = 24$.  
  Total: $120 \times 24 = 2.880$ anagramas.

#### Questão 508
- **Enunciado:** De 10 hackers, será montada uma equipe de 4 pessoas e, dentro dela, será escolhido um líder. De quantas formas isso pode ser feito?
- **Alternativas:** A) 210 | B) **840** | C) 5.040 | D) 420
- **Resposta Correta:** **840**
- **Resolução:**  
  1ª etapa: Escolher o grupo de 4 pessoas entre 10: $C(10, 4) = 210$.  
  2ª etapa: Escolher 1 líder entre os 4 membros: 4 opções.  
  Pelo PFC: $210 \times 4 = 840$ formas.

#### Questão 509
- **Enunciado:** Um robô anda em uma grade de dutos, partindo do ponto (0,0) até a saída em (4,3), movendo-se 1 unidade por vez apenas para a DIREITA ou para CIMA. Ele deve OBRIGATORIAMENTE passar pelo ponto de recarga (2,1). Quantos caminhos são possíveis?
- **Alternativas:** A) 35 | B) 9 | C) 24 | D) **18**
- **Resposta Correta:** **18**
- **Resolução:**  
  - Trecho 1 de $(0,0)$ até $(2,1)$: 2 passos para a direita e 1 para cima: $\frac{3!}{2! \times 1!} = 3$.  
  - Trecho 2 de $(2,1)$ até $(4,3)$: 2 passos para a direita e 2 para cima: $\frac{4!}{2! \times 2!} = 6$.  
  Total: $3 \times 6 = 18$ caminhos.

#### Questão 510
- **Enunciado:** O código final da saída tem 5 algarismos (0 a 9) e possui PELO MENOS UM algarismo repetido. Quantos códigos satisfazem essa condição?
- **Alternativas:** A) 30.240 | B) 100.000 | C) **69.760** | D) 70.000
- **Resposta Correta:** **69.760**
- **Resolução:** Método do complementar: Total geral de códigos menos códigos onde todos os algarismos são diferentes.  
  - Total geral de 5 dígitos: $10^5 = 100.000$.  
  - Códigos com todos os dígitos distintos: $10 \times 9 \times 8 \times 7 \times 6 = 30.240$.  
  - Códigos com pelo menos uma repetição: $100.000 - 30.240 = 69.760$ códigos.

---

## 🎤 Dicas para a Apresentação do Trabalho

Um roteiro simples de 5 minutos para você apresentar com segurança para os professores:

1. **Introdução (1 min):**  
   Apresente o tema (Análise Combinatória), o estilo de Escape Room e o motivo do projeto: ajudar os estudantes a entender na prática quando usar PFC, Arranjo, Permutação e Combinação.
2. **Demonstração Rápida (2 min):**  
   Inicie uma partida e mostre a Sala 1:
   - Clique na prancheta para mostrar a dica teórica.
   - Clique no terminal para responder a primeira questão.
   - Mostre o feedback com a explicação matemática e a porta se destrancando com efeito sonoro.
   - Mostre que, nas salas seguintes, cada trava tem seu próprio equipamento e, ao acertar, o objeto ganha o selo `RESOLVIDO ✓`.
3. **Explicação do Código (1 min):**  
   Destaque que o código foi feito em **HTML, CSS e JavaScript puros**, sem dependências externas. Mostre como o áudio funciona direto no navegador via `AudioContext` e como o sorteio sem repetição garante uma experiência dinâmica.
4. **Gabarito e Conclusão (1 min):**  
   Abra o botão "📚 Banco de Questões (Gabarito)" no menu principal para mostrar que as 50 questões cobrem toda a matéria com resoluções passo a passo.

---

**Projeto desenvolvido para a disciplina de Matemática Discreta — 1º ano de Sistemas de Informação.**
