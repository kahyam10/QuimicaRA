# 🔄 Plano de Reestruturação - Mudanças Significativas

## 📋 Resumo de Mudanças

### 1. ModelViewer: Remover Modelo 3D

```
ANTES: GLView com Three.js renderizando modelo 3D
DEPOIS: Quadrado branco simples (placeholder)

Impacto:
  - Simplifica ModelViewer.tsx
  - Remove dependência de expo-three (temporariamente)
  - Reduz lógica complexa
  - Mais rápido de renderizar
```

### 2. Estrutura de Capítulos: 4 → 3

```
ANTES:
  - Capítulo 1: Atmosfera (geral)
  - Capítulo 2: Camadas
  - Capítulo 3: Composição
  - Capítulo 4: Gases do Efeito Estufa

DEPOIS:
  - Capítulo 1: Composição Atmosférica (N₂, O₂, Ar)
  - Capítulo 2: ? (você definirá depois)
  - Capítulo 3: ? (você definirá depois)
```

### 3. Conteúdo do Capítulo 1

```
Moléculas:
  - Nitrogênio (N₂)
  - Oxigênio (O₂)
  - Argônio (Ar)

Propriedades:
  - Fórmula Molecular
  - Geometria Molecular
  - Polaridade
  - Ângulos de Ligação
  - Informações Gerais
```

---

## 🛠️ Ações Necessárias

### Fase 1: ModelViewer Simplificado

- [ ] Substituir GLView + Three.js por View com backgroundColor branca
- [ ] Remover toda lógica de 3D
- [ ] Manter StyleSheet e layout
- [ ] Testar renderização

### Fase 2: Estrutura de Arquivos

- [ ] Deletar capítulo 4
- [ ] Renomear estrutura de 4 para 3 capítulos
- [ ] Atualizar navegação

### Fase 3: Conteúdo Capítulo 1

- [ ] Criar estrutura de dados para moléculas
- [ ] Implementar componentes de exibição
- [ ] Renderizar Nitrogênio, Oxigênio, Argônio
- [ ] Adicionar propriedades e informações

---

## 📁 Arquivos Afetados

### Direto

```
components/ModelViewer.tsx        ← Simplificar (remover 3D)
app/(tabs)/chapter1.tsx          ← Reescrever com novo conteúdo
app/(tabs)/chapter2.tsx          ← Mantém existente (novo conteúdo depois)
app/(tabs)/chapter3.tsx          ← Mantém existente (novo conteúdo depois)
app/(tabs)/chapter4.tsx          ← DELETAR
```

### Suporte

```
types/index.ts                   ← Atualizar tipos de Chapter
constants/                       ← Pode precisar novos dados
```

---

## ✅ Próximos Passos

1. Você quer que eu comece pelo ModelViewer?
2. Ou pela estrutura de capítulos?
3. Você tem os conteúdos dos capítulos 2 e 3?
