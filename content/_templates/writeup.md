---
title: "Natas — Level 0 → 10"  # ou "HTB — Máquina", "PortSwigger — Lab X"
date: 2026-01-01              # data de publicação
type: writeup
tags: [natas, natas-0-10]     # plataforma, técnica e a tag do item do roadmap
summary: "Uma linha: o alvo e a falha principal."
# cover: ./img/nome-da-imagem.jpg   # opcional — imagem de capa
series: ""                    # opcional — agrupa com outros posts
difficulty: easy              # easy | medium | hard
platform: overthewire         # htb | thm | portswigger | overthewire | beecrowd | outro
draft: true                   # HTB: só publique de máquina aposentada
lang: pt                      # pt | en
---

> [!WARNING]
> Não publique senhas, flags nem credenciais reais. Descreva o método e use placeholders.

## Resumo executivo

Em 2–3 frases: o que foi testado, o que foi encontrado e qual o impacto.

| Alvo | Plataforma | Data | Severidade máxima |
|------|------------|------|-------------------|
| nome | plataforma | AAAA-MM-DD | Crítica / Alta / Média / Baixa |

## Escopo

O que estava dentro do teste (host, aplicação, níveis) e as regras (ex.: só o que a plataforma permite).

## Metodologia

Como você abordou: reconhecimento, enumeração, exploração, pós-exploração. Ferramentas usadas.

```bash
nmap -sC -sV -oN nmap/initial TARGET_IP
```

## Achados

### F-01 — Título da vulnerabilidade

- **Severidade:** Alta
- **Categoria:** ex. SQL injection, broken access control
- **Evidência:** comando, request/response ou captura que prova o problema

```http
GET /index.php?id=1' OR '1'='1 HTTP/1.1
```

- **Impacto:** o que um atacante consegue fazer com isso
- **Causa raiz:** por que a falha existe
- **Correção:** como mitigar (código, configuração, processo)

### F-02 — Outro achado

Repita a estrutura acima para cada achado.

## Conclusão e lições

- O que esse alvo ensina além do exercício?
- Qual padrão você vai reconhecer em outros alvos?
- O que faria diferente na próxima vez?
