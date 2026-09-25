---
title: "HTB — NomeDaMaquina"  # ou THM, PortSwigger, etc.
date: 2026-01-01              # data de publicação (não da release da box)
type: writeup
tags: [htb, linux]            # plataforma, SO, vulnerabilidades, técnicas
summary: "Uma linha: o que é a box e o vetor principal."
series: ""                    # opcional — agrupa com outros posts
difficulty: easy              # easy | medium | hard
platform: htb                 # htb | thm | portswigger | outro
draft: true                   # true até a box ser aposentada ou você ter permissão
lang: pt                      # pt | en
---

## Recon

```bash
nmap -sC -sV -oN nmap/initial TARGET_IP
```

O que encontrei, portas abertas, serviços, versões relevantes.

## Enumeração

Aprofunde em cada serviço interessante. Web: dirbuster/feroxbuster, cabeçalhos, código-fonte.
Outras portas: banners, exploits públicos conhecidos.

## Exploração

Descreva o vetor principal. Inclua o payload exato que funcionou e **por que** ele funciona.

> [!WARNING]
> Se incluir credenciais ou hashes, lembre de apagar ou substituir por placeholders antes de publicar.

## Pós-exploração / Privesc

O que você encontrou depois do foothold. `sudo -l`, SUID, cron jobs, capabilities, etc.

## Lições aprendidas

- O que esse lab ensina que vai além do CTF?
- Qual é a versão corrigida / mitigação?
- Padrão que você vai usar em outras boxes?
