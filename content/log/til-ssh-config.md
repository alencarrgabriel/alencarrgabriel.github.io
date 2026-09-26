---
title: "TIL: ~/.ssh/config salva tempo em CTFs"
date: 2026-09-25
type: til
tags: [ssh, ctf, productivity, til]
summary: "Configurar aliases SSH no ~/.ssh/config evita digitar IPs e flags toda vez que você reconecta a uma máquina do HTB."
draft: true
lang: pt
---

Estava reconectando à mesma box do HTB umas 10 vezes por dia e toda vez digitava:

```bash
ssh -i ~/.ssh/htb_key svc@10.10.11.208
```

Descobri que o `~/.ssh/config` aceita aliases:

```
Host busqueda
    HostName 10.10.11.208
    User svc
    IdentityFile ~/.ssh/htb_key
    StrictHostKeyChecking no
```

Agora é só:

```bash
ssh busqueda
```

> [!TIP]
> `StrictHostKeyChecking no` evita o prompt de confirmação quando a box reseta e troca de fingerprint. Nunca use isso fora do ambiente de lab.

Funciona também com `scp` e `rsync` — útil para exfiltrar arquivos do alvo sem lembrar o IP.
