"""
OPERAÇÃO ENIGMA: A FUGA DO LABORATÓRIO QUÂNTICO
jogo.py — Versão simplificada em Python com interface gráfica (Tkinter)

Requer apenas Python 3 (a biblioteca tkinter já vem instalada).
Para executar:
    python3 jogo.py
"""

import random
import tkinter as tk
from questoes import QUESTOES, SALAS


# =========================================================
# 1. CONFIGURAÇÕES E CORES
# =========================================================
TOTAL_FASES = len(SALAS)
TOTAL_ACERTOS = sum(sala["acertos_necessarios"] for sala in SALAS)  # 12
VIDAS_INICIAIS = 5
TEMPO_INICIAL = 20 * 60  # 20 minutos em segundos

COR_FUNDO = "#0f172a"
COR_PAINEL = "#1e293b"
COR_BOTAO = "#334155"
COR_BOTAO_HOVER = "#475569"
COR_TEXTO = "#f8fafc"
COR_TEXTO_SUAVE = "#cbd5e1"
COR_VERDE = "#16a34a"
COR_VERMELHO = "#dc2626"

FONTE = "Helvetica"


# =========================================================
# 2. ESTADO DA PARTIDA
# =========================================================
estado = {
    "fase_atual": 1,
    "acertos_fase": 0,
    "acertos_totais": 0,
    "vidas": VIDAS_INICIAIS,
    "tempo_restante": TEMPO_INICIAL,
    "jogo_ativo": False,
    "id_timer": None,
    # Mantemos os IDs usados mesmo entre partidas para demorar a repetir questões
    "questoes_usadas": set(),
    # Guarda os nomes dos equipamentos já resolvidos na sala atual
    "desafios_resolvidos": set(),
    # Guarda uma questão aberta mas ainda não respondida por equipamento
    "questoes_pendentes": {},
    # Dados do desafio aberto no momento
    "objeto_atual": None,
    "questao_atual": None,
    "respondida": False,
}

# Referências globais para a janela e áreas da interface
janela = None
frame_hud = None
frame_conteudo = None
labels_hud = {}


# =========================================================
# 3. FUNÇÕES DE LÓGICA DO JOGO
# =========================================================
def formatar_tempo(segundos):
    """Converte segundos em texto no formato mm:ss."""
    minutos = segundos // 60
    resto = segundos % 60
    return f"{minutos:02d}:{resto:02d}"


def sortear_questao(fase):
    """Sorteia uma questão da fase sem repetir até todas as 10 serem usadas."""
    disponiveis = [
        q for q in QUESTOES
        if q["fase"] == fase and q["id"] not in estado["questoes_usadas"]
    ]

    # Se todas as 10 questões da fase já foram usadas, libera apenas essa fase
    if not disponiveis:
        ids_da_fase = {q["id"] for q in QUESTOES if q["fase"] == fase}
        estado["questoes_usadas"] -= ids_da_fase
        disponiveis = [q for q in QUESTOES if q["fase"] == fase]

    sorteada = random.choice(disponiveis)
    estado["questoes_usadas"].add(sorteada["id"])
    return sorteada


def sala_atual():
    """Retorna o dicionário da sala correspondente à fase atual."""
    return SALAS[estado["fase_atual"] - 1]


def cancelar_timer():
    """Cancela o cronômetro ativo, se houver."""
    if estado["id_timer"] is not None:
        janela.after_cancel(estado["id_timer"])
        estado["id_timer"] = None


def iniciar_partida():
    """Reinicia os dados da partida e abre a Fase 1."""
    cancelar_timer()

    estado["fase_atual"] = 1
    estado["acertos_fase"] = 0
    estado["acertos_totais"] = 0
    estado["vidas"] = VIDAS_INICIAIS
    estado["tempo_restante"] = TEMPO_INICIAL
    estado["jogo_ativo"] = True
    estado["desafios_resolvidos"] = set()
    estado["questoes_pendentes"] = {}
    estado["objeto_atual"] = None
    estado["questao_atual"] = None
    estado["respondida"] = False

    mostrar_hud()
    atualizar_hud()
    mostrar_tela_sala()
    ticar_cronometro()


def ticar_cronometro():
    """Diminui 1 segundo do relógio a cada 1000 ms enquanto o jogo estiver ativo."""
    if not estado["jogo_ativo"]:
        return

    estado["tempo_restante"] -= 1
    atualizar_hud()

    if estado["tempo_restante"] <= 0:
        finalizar_jogo(vitoria=False, motivo="tempo")
        return

    estado["id_timer"] = janela.after(1000, ticar_cronometro)


def finalizar_jogo(vitoria, motivo=""):
    """Encerra a partida e mostra a tela de vitória ou derrota."""
    estado["jogo_ativo"] = False
    cancelar_timer()
    ocultar_hud()
    mostrar_tela_final(vitoria, motivo)


# =========================================================
# 4. AUXILIARES DE INTERFACE (HUD E LIMPEZA)
# =========================================================
def limpar_conteudo():
    """Remove todos os widgets da área principal antes de desenhar outra tela."""
    for widget in frame_conteudo.winfo_children():
        widget.destroy()


def criar_hud():
    """Monta a barra superior com Fase, Acertos, Vidas e Oxigênio."""
    itens = [
        ("fase", "Fase"),
        ("acertos_fase", "Na sala"),
        ("acertos_totais", "Totais"),
        ("vidas", "Vidas"),
        ("tempo", "Oxigênio"),
    ]

    for chave, rotulo in itens:
        bloco = tk.Frame(frame_hud, bg=COR_PAINEL, padx=12, pady=6)
        bloco.pack(side="left", expand=True, fill="x", padx=3)

        tk.Label(
            bloco, text=rotulo, bg=COR_PAINEL, fg=COR_TEXTO_SUAVE,
            font=(FONTE, 9)
        ).pack()

        valor = tk.Label(
            bloco, text="", bg=COR_PAINEL, fg=COR_TEXTO,
            font=(FONTE, 12, "bold")
        )
        valor.pack()
        labels_hud[chave] = valor


def mostrar_hud():
    frame_hud.pack(fill="x", padx=16, pady=(12, 4), before=frame_conteudo)


def ocultar_hud():
    frame_hud.pack_forget()


def atualizar_hud():
    """Atualiza os textos e cores da barra superior."""
    sala = sala_atual()
    labels_hud["fase"].config(
        text=f"{estado['fase_atual']}/{TOTAL_FASES}", fg=sala["cor"]
    )
    labels_hud["acertos_fase"].config(
        text=f"{estado['acertos_fase']}/{sala['acertos_necessarios']}"
    )
    labels_hud["acertos_totais"].config(
        text=f"{estado['acertos_totais']}/{TOTAL_ACERTOS}"
    )

    coracoes = "❤️" * estado["vidas"] + "🖤" * (VIDAS_INICIAIS - estado["vidas"])
    labels_hud["vidas"].config(text=coracoes)

    cor_tempo = COR_VERMELHO if estado["tempo_restante"] <= 60 else COR_TEXTO
    labels_hud["tempo"].config(
        text=formatar_tempo(estado["tempo_restante"]), fg=cor_tempo
    )


# =========================================================
# 5. TELAS DO JOGO
# =========================================================
def mostrar_tela_inicial():
    """Exibe o menu principal com a narrativa e as regras."""
    cancelar_timer()
    estado["jogo_ativo"] = False
    ocultar_hud()
    limpar_conteudo()

    painel = tk.Frame(frame_conteudo, bg=COR_PAINEL, padx=32, pady=28)
    painel.pack(expand=True, fill="both", padx=24, pady=20)

    tk.Label(
        painel,
        text="⚠ ALERTA DE CONTENÇÃO — LABORATÓRIO QUÂNTICO ⚠",
        bg=COR_PAINEL, fg="#f87171", font=(FONTE, 10, "bold")
    ).pack(pady=(0, 8))

    tk.Label(
        painel,
        text="Operação Enigma",
        bg=COR_PAINEL, fg="#38bdf8", font=(FONTE, 28, "bold")
    ).pack()

    tk.Label(
        painel,
        text="A Fuga do Laboratório Quântico — Análise Combinatória",
        bg=COR_PAINEL, fg=COR_TEXTO_SUAVE, font=(FONTE, 12)
    ).pack(pady=(2, 18))

    narrativa = (
        "Um experimento no reator quântico falhou e o sistema de segurança "
        "trancou as 5 salas do complexo. Cada porta só abre com códigos "
        "obtidos resolvendo desafios de Análise Combinatória. "
        "Investigue os objetos, leia as pistas e escape antes que o oxigênio acabe!"
    )
    tk.Label(
        painel, text=narrativa, bg=COR_PAINEL, fg=COR_TEXTO,
        font=(FONTE, 11), wraplength=660, justify="center"
    ).pack(pady=(0, 18))

    regras = (
        "📜 REGRAS RÁPIDAS\n"
        "• 5 salas e 12 códigos para escapar (1 + 2 + 2 + 3 + 4).\n"
        "• 5 vidas: cada resposta incorreta desconta 1 vida.\n"
        "• 20 minutos de oxigênio no cronômetro.\n"
        "• Banco com 50 questões inéditas: se errar, você mantém seus acertos "
        "e recebe uma nova questão sem repetir."
    )
    tk.Label(
        painel, text=regras, bg=COR_FUNDO, fg=COR_TEXTO_SUAVE,
        font=(FONTE, 10), justify="left", padx=18, pady=14
    ).pack(fill="x", pady=(0, 24))

    tk.Button(
        painel,
        text="🚀 Iniciar Fuga",
        command=iniciar_partida,
        bg="#0284c7", fg=COR_TEXTO, activebackground="#0369a1",
        activeforeground=COR_TEXTO, font=(FONTE, 14, "bold"),
        padx=28, pady=10, relief="flat", cursor="hand2"
    ).pack()


def mostrar_tela_sala(mensagem=None):
    """Desenha a sala atual com seus objetos interativos, cadeados e mensagens."""
    limpar_conteudo()
    sala = sala_atual()

    painel = tk.Frame(frame_conteudo, bg=COR_PAINEL, padx=24, pady=20)
    painel.pack(expand=True, fill="both", padx=16, pady=(6, 16))

    # Cabeçalho da sala
    tk.Label(
        painel,
        text=f"Fase {sala['fase']} • {sala['nivel']} • {sala['tema']}",
        bg=COR_PAINEL, fg=sala["cor"], font=(FONTE, 10, "bold")
    ).pack()

    tk.Label(
        painel, text=sala["nome"], bg=COR_PAINEL, fg=COR_TEXTO,
        font=(FONTE, 22, "bold")
    ).pack(pady=(2, 14))

    # Grade com os objetos clicáveis da sala
    grade = tk.Frame(painel, bg=COR_PAINEL)
    grade.pack(expand=True, fill="both", pady=6)

    colunas = 3
    for col in range(colunas):
        grade.columnconfigure(col, weight=1)

    for indice, objeto in enumerate(sala["objetos"]):
        linha = indice // colunas
        coluna = indice % colunas
        resolvido = objeto["nome"] in estado["desafios_resolvidos"]

        if objeto["tipo"] == "desafio":
            if resolvido:
                etiqueta = "✓ RESOLVIDO"
                cor_fundo = COR_VERDE
            else:
                etiqueta = "DESAFIO"
                cor_fundo = COR_BOTAO
        elif objeto["tipo"] == "pista":
            etiqueta = "PISTA"
            cor_fundo = "#1e3a5f"
        else:
            etiqueta = "PORTA"
            cor_fundo = "#3b2f4a"

        texto_btn = f"{objeto['icone']}\n{objeto['nome']}\n[{etiqueta}]"
        botao = tk.Button(
            grade,
            text=texto_btn,
            command=lambda obj=objeto: clicar_objeto(obj),
            bg=cor_fundo, fg=COR_TEXTO,
            activebackground=COR_BOTAO_HOVER, activeforeground=COR_TEXTO,
            font=(FONTE, 11, "bold"),
            height=4, relief="flat", cursor="hand2",
            wraplength=200
        )
        botao.grid(row=linha, column=coluna, padx=8, pady=8, sticky="nsew")

    # Fechadura (cadeados abertos e fechados)
    necessarios = sala["acertos_necessarios"]
    cadeados = "🔓 " * estado["acertos_fase"] + "🔒 " * (necessarios - estado["acertos_fase"])
    tk.Label(
        painel,
        text=f"Fechadura da porta:  {cadeados.strip()}",
        bg=COR_PAINEL, fg=COR_TEXTO, font=(FONTE, 12, "bold")
    ).pack(pady=(10, 8))

    # Caixa de mensagens (narrativa, pistas e avisos)
    texto_msg = mensagem if mensagem is not None else sala["descricao"]
    label_msg = tk.Label(
        painel,
        text=texto_msg,
        bg=COR_FUNDO, fg=COR_TEXTO_SUAVE,
        font=(FONTE, 10), wraplength=700, justify="left",
        padx=16, pady=12, anchor="w"
    )
    label_msg.pack(fill="x", pady=(4, 0))
    estado["label_mensagem"] = label_msg


def mostrar_tela_questao(objeto, questao):
    """Exibe a questão sorteada com as 4 alternativas embaralhadas."""
    limpar_conteudo()
    sala = sala_atual()
    estado["objeto_atual"] = objeto
    estado["questao_atual"] = questao
    estado["respondida"] = False

    painel = tk.Frame(frame_conteudo, bg=COR_PAINEL, padx=26, pady=18)
    painel.pack(expand=True, fill="both", padx=16, pady=(6, 16))

    # Topo: equipamento + botão voltar (antes de responder)
    topo = tk.Frame(painel, bg=COR_PAINEL)
    topo.pack(fill="x")

    tk.Label(
        topo,
        text=f"{objeto['icone']} {objeto['nome']} — código {estado['acertos_fase'] + 1} de {sala['acertos_necessarios']}",
        bg=COR_PAINEL, fg=sala["cor"], font=(FONTE, 10, "bold")
    ).pack(side="left")

    btn_voltar = tk.Button(
        topo,
        text="← Voltar à sala",
        command=lambda: mostrar_tela_sala(
            "⏳ O desafio continua pendente. Você pode consultar a pista e voltar quando quiser."
        ),
        bg=COR_BOTAO, fg=COR_TEXTO, activebackground=COR_BOTAO_HOVER,
        activeforeground=COR_TEXTO, font=(FONTE, 9),
        padx=10, pady=3, relief="flat", cursor="hand2"
    )
    btn_voltar.pack(side="right")

    tk.Label(
        painel, text=f"Tema: {questao['tema']}",
        bg=COR_PAINEL, fg=COR_TEXTO_SUAVE, font=(FONTE, 9, "italic"),
        anchor="w"
    ).pack(fill="x", pady=(6, 8))

    # Enunciado
    tk.Label(
        painel, text=questao["enunciado"],
        bg=COR_FUNDO, fg=COR_TEXTO, font=(FONTE, 11, "bold"),
        wraplength=740, justify="left", anchor="w", padx=16, pady=10
    ).pack(fill="x", pady=(0, 10))

    # Alternativas embaralhadas
    frame_alts = tk.Frame(painel, bg=COR_PAINEL)
    frame_alts.pack(fill="x")

    alternativas = questao["alternativas"][:]
    random.shuffle(alternativas)
    letras = ["A", "B", "C", "D"]
    botoes_alt = []

    for i, valor in enumerate(alternativas):
        btn = tk.Button(
            frame_alts,
            text=f"{letras[i]}) {valor}",
            bg=COR_BOTAO, fg=COR_TEXTO,
            activebackground=COR_BOTAO_HOVER, activeforeground=COR_TEXTO,
            font=(FONTE, 11), anchor="w", padx=16, pady=6,
            relief="flat", cursor="hand2"
        )
        btn.pack(fill="x", pady=3)
        botoes_alt.append((btn, valor))

    # Área de feedback (aparece após responder)
    label_feedback = tk.Label(
        painel, text="", bg=COR_PAINEL, fg=COR_TEXTO,
        font=(FONTE, 10), wraplength=740, justify="left",
        anchor="w", padx=14, pady=8
    )

    btn_continuar = tk.Button(
        painel, text="Continuar ➜",
        command=continuar_apos_resposta,
        bg="#0284c7", fg=COR_TEXTO, activebackground="#0369a1",
        activeforeground=COR_TEXTO, font=(FONTE, 11, "bold"),
        padx=22, pady=8, relief="flat", cursor="hand2"
    )

    # Liga o clique de cada alternativa à função responder_questao
    for btn, valor in botoes_alt:
        btn.config(
            command=lambda b=btn, v=valor: responder_questao(
                b, v, botoes_alt, btn_voltar, label_feedback, btn_continuar
            )
        )


def mostrar_tela_final(vitoria, motivo):
    """Exibe a tela final de vitória ou derrota com estatísticas."""
    limpar_conteudo()

    painel = tk.Frame(frame_conteudo, bg=COR_PAINEL, padx=32, pady=28)
    painel.pack(expand=True, fill="both", padx=24, pady=20)

    tempo_gasto = formatar_tempo(TEMPO_INICIAL - estado["tempo_restante"])
    erros = VIDAS_INICIAIS - estado["vidas"]

    if vitoria:
        icone = "🏆"
        titulo = "Você escapou!"
        cor_titulo = "#4ade80"
        texto = (
            "A porta do Núcleo Central se abre e o ar fresco invade o corredor. "
            "Graças ao seu domínio de Análise Combinatória, a Operação Enigma foi um sucesso!"
        )
        resumo = (
            f"⏱️ Tempo gasto: {tempo_gasto}\n"
            f"🫁 Oxigênio restante: {formatar_tempo(estado['tempo_restante'])}\n"
            f"✅ Acertos: {estado['acertos_totais']}/{TOTAL_ACERTOS}\n"
            f"❌ Erros cometidos: {erros}\n"
            f"❤️ Vidas restantes: {estado['vidas']}"
        )
    else:
        icone = "💀"
        titulo = "Fuga fracassada"
        cor_titulo = "#f87171"
        if motivo == "tempo":
            texto = "O oxigênio acabou! O sistema de segurança venceu desta vez..."
        else:
            texto = "Você perdeu todas as vidas! O laboratório foi bloqueado..."
        sala = sala_atual()
        resumo = (
            f"🚪 Sala alcançada: {estado['fase_atual']}/{TOTAL_FASES} — {sala['nome']}\n"
            f"⏱️ Tempo gasto: {tempo_gasto}\n"
            f"✅ Acertos: {estado['acertos_totais']}/{TOTAL_ACERTOS}\n"
            f"❌ Erros cometidos: {erros}"
        )

    tk.Label(painel, text=icone, bg=COR_PAINEL, font=(FONTE, 38)).pack()
    tk.Label(
        painel, text=titulo, bg=COR_PAINEL, fg=cor_titulo,
        font=(FONTE, 24, "bold")
    ).pack(pady=(4, 10))

    tk.Label(
        painel, text=texto, bg=COR_PAINEL, fg=COR_TEXTO,
        font=(FONTE, 11), wraplength=640, justify="center"
    ).pack(pady=(0, 18))

    tk.Label(
        painel, text=resumo, bg=COR_FUNDO, fg=COR_TEXTO_SUAVE,
        font=(FONTE, 11), justify="left", padx=22, pady=16
    ).pack(fill="x", pady=(0, 22))

    botoes = tk.Frame(painel, bg=COR_PAINEL)
    botoes.pack()

    tk.Button(
        botoes, text="🔁 Jogar Novamente", command=iniciar_partida,
        bg="#0284c7", fg=COR_TEXTO, activebackground="#0369a1",
        activeforeground=COR_TEXTO, font=(FONTE, 12, "bold"),
        padx=20, pady=8, relief="flat", cursor="hand2"
    ).pack(side="left", padx=8)

    tk.Button(
        botoes, text="🏠 Menu Inicial", command=mostrar_tela_inicial,
        bg=COR_BOTAO, fg=COR_TEXTO, activebackground=COR_BOTAO_HOVER,
        activeforeground=COR_TEXTO, font=(FONTE, 12),
        padx=20, pady=8, relief="flat", cursor="hand2"
    ).pack(side="left", padx=8)


# =========================================================
# 6. AÇÕES DO JOGADOR
# =========================================================
def clicar_objeto(objeto):
    """Trata o clique em uma pista, porta ou equipamento de desafio."""
    if not estado["jogo_ativo"]:
        return

    if objeto["tipo"] == "pista":
        estado["label_mensagem"].config(
            text=f"{objeto['icone']} {objeto['texto']}", fg="#bae6fd"
        )

    elif objeto["tipo"] == "porta":
        faltam = sala_atual()["acertos_necessarios"] - estado["acertos_fase"]
        estado["label_mensagem"].config(
            text=f"🔒 A porta está trancada. Faltam {faltam} código(s). Clique nos objetos marcados como [DESAFIO].",
            fg="#fde68a"
        )

    elif objeto["tipo"] == "desafio":
        nome = objeto["nome"]
        if nome in estado["desafios_resolvidos"]:
            estado["label_mensagem"].config(
                text="✅ Este equipamento já foi desbloqueado! Escolha outro objeto [DESAFIO] na sala.",
                fg="#86efac"
            )
            return

        # Reaproveita a questão se o jogador voltou para ver a pista; senão sorteia uma nova
        if nome not in estado["questoes_pendentes"]:
            estado["questoes_pendentes"][nome] = sortear_questao(estado["fase_atual"])

        mostrar_tela_questao(objeto, estado["questoes_pendentes"][nome])


def responder_questao(botao_clicado, valor_escolhido, botoes_alt, btn_voltar, label_feedback, btn_continuar):
    """Valida a resposta, exibe a resolução passo a passo e atualiza o placar."""
    if estado["respondida"] or not estado["jogo_ativo"]:
        return

    estado["respondida"] = True
    btn_voltar.pack_forget()

    questao = estado["questao_atual"]
    nome_objeto = estado["objeto_atual"]["nome"]
    acertou = (valor_escolhido == questao["resposta_correta"])

    # Limpa a pendência: se errar, o próximo clique no objeto sorteará outra questão inédita
    estado["questoes_pendentes"].pop(nome_objeto, None)

    # Desabilita alternativas e destaca a resposta certa
    for btn, valor in botoes_alt:
        btn.config(state="disabled", disabledforeground=COR_TEXTO)
        if valor == questao["resposta_correta"]:
            btn.config(bg=COR_VERDE)

    if acertou:
        estado["acertos_fase"] += 1
        estado["acertos_totais"] += 1
        estado["desafios_resolvidos"].add(nome_objeto)
        titulo = "✅ CÓDIGO ACEITO! Equipamento desbloqueado."
        cor_fb = "#14532d"
    else:
        estado["vidas"] -= 1
        botao_clicado.config(bg=COR_VERMELHO)
        titulo = "❌ CÓDIGO INVÁLIDO! Você perdeu 1 vida. Veja a resolução:"
        cor_fb = "#7f1d1d"

    atualizar_hud()

    label_feedback.config(
        text=f"{titulo}\n\n📐 {questao['resolucao']}",
        bg=cor_fb
    )
    label_feedback.pack(fill="x", pady=(12, 10))

    # Define o texto do botão continuar
    sala = sala_atual()
    if estado["vidas"] <= 0:
        btn_continuar.config(text="Ver resultado ➜")
    elif estado["acertos_fase"] >= sala["acertos_necessarios"]:
        if estado["fase_atual"] == TOTAL_FASES:
            btn_continuar.config(text="🏆 Abrir Saída de Emergência!")
        else:
            btn_continuar.config(text="🚪 Destrancar porta e avançar ➜")
    else:
        btn_continuar.config(text="Voltar para a sala ➜")

    btn_continuar.pack()


def continuar_apos_resposta():
    """Decide o próximo passo após ler o feedback: derrota, próxima sala ou voltar à sala."""
    if estado["vidas"] <= 0:
        finalizar_jogo(vitoria=False, motivo="vidas")
        return

    sala = sala_atual()
    faltam = sala["acertos_necessarios"] - estado["acertos_fase"]

    if faltam <= 0:
        if estado["fase_atual"] == TOTAL_FASES:
            finalizar_jogo(vitoria=True)
            return

        # Avança para a próxima sala
        estado["fase_atual"] += 1
        estado["acertos_fase"] = 0
        estado["desafios_resolvidos"] = set()
        estado["questoes_pendentes"] = {}
        atualizar_hud()
        proxima = sala_atual()
        mostrar_tela_sala(
            f"🔓 Porta destrancada! Você entrou na Fase {proxima['fase']}: {proxima['nome']}.\n"
            f"{proxima['descricao']}"
        )
        return

    mostrar_tela_sala(
        f"🔓 Faltam {faltam} código(s) para destrancar a porta. "
        "Clique em um equipamento [DESAFIO] ou consulte a [PISTA]."
    )


# =========================================================
# 7. INICIALIZAÇÃO DA JANELA
# =========================================================
def iniciar_aplicacao():
    global janela, frame_hud, frame_conteudo

    janela = tk.Tk()
    janela.title("Operação Enigma: A Fuga do Laboratório Quântico")
    janela.geometry("860x720")
    janela.minsize(780, 660)
    janela.configure(bg=COR_FUNDO)

    frame_hud = tk.Frame(janela, bg=COR_FUNDO)
    criar_hud()

    frame_conteudo = tk.Frame(janela, bg=COR_FUNDO)
    frame_conteudo.pack(expand=True, fill="both")

    mostrar_tela_inicial()
    janela.mainloop()


if __name__ == "__main__":
    iniciar_aplicacao()
