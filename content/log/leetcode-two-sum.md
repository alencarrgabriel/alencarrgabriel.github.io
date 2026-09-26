---
title: "LeetCode #1 — Two Sum"
date: 2026-09-25
type: leetcode
tags: [leetcode, arrays, hash-map, easy]
summary: "Clássico de hash map. O truque é guardar o complemento enquanto itera, não o valor em si."
difficulty: easy
platform: leetcode
draft: true
lang: pt
---

## Problema

Dado um array `nums` e um inteiro `target`, retorne os índices dos dois números que somam `target`.

```
Input:  nums = [2,7,11,15], target = 9
Output: [0,1]  // nums[0] + nums[1] = 9
```

## Primeira ideia

Força bruta O(n²): dois loops aninhados, testa todos os pares.

```python
for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] + nums[j] == target:
            return [i, j]
```

Funciona, mas não passa em arrays grandes.

## Onde travei

Tentei primeiro guardar os **valores** no map e depois verificar se o complemento existe. O problema é que posso achar o mesmo índice duas vezes. A solução é guardar `{valor: índice}` e checar **antes** de inserir.

## Solução

```python
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
```

Uma única passagem. O `seen[complement]` já tem o índice do número que completa a soma.

## Complexidade

| | |
|---|---|
| Tempo | O(n) |
| Espaço | O(n) |

## Padrão reconhecido

**Hash map para lookup O(1)**. Aparece em dezenas de problemas: 3Sum, 4Sum, Subarray Sum Equals K, Group Anagrams. Sempre que você precisar saber "já vi esse valor antes?", um map é a ferramenta certa.
