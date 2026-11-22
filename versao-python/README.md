# 🔐 Operação Enigma — Versão Python (Tkinter)

Versão simplificada do jogo educacional **Operação Enigma: A Fuga do Laboratório Quântico**, feita apenas com **Python 3** e a biblioteca padrão **`tkinter`** (sem instalar nenhum pacote externo).

## 📂 Arquivos

- `questoes.py` — Dados das 5 salas e banco completo com as **50 questões** de Análise Combinatória (10 por fase) com resoluções passo a passo.
- `jogo.py` — Interface gráfica em `tkinter` e lógica do jogo (estado, sorteio sem repetição, cronômetro de 20 minutos, 5 vidas e 5 fases).

## ▶️ Como executar no seu computador

1. Certifique-se de ter o **Python 3** instalado (`python --version` ou `python3 --version`).
2. Baixe os arquivos desta pasta (`jogo.py` e `questoes.py`) para a mesma pasta no seu computador.
3. Abra o terminal nessa pasta e execute:

```bash
# No Linux / macOS:
python3 jogo.py

# No Windows:
python jogo.py
```

> **Observação no Linux (Ubuntu/Debian):** caso o `tkinter` não venha pré-instalado no sistema, instale com `sudo apt install python3-tk`. No Windows e macOS (instalador oficial do Python), o `tkinter` já vem incluído.

## 🧠 Como funciona o sorteio sem repetição

O jogo mantém um conjunto (`set`) chamado `questoes_usadas` com os IDs das questões já sorteadas. Enquanto o aplicativo estiver aberto (inclusive se você reiniciar a partida após errar ou perder), nenhuma questão daquela fase é repetida até que todas as 10 questões da fase tenham sido usadas.
