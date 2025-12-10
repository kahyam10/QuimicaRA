# 🚀 Guia Rápido - Sistema de Tipagem de Compostos

**Data**: 10 de dezembro de 2025
**Versão**: 1.0.0

---

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Obter Compostos de um Capítulo

```typescript
import { useCapituloCompostos } from '@/hooks/useCompounds';

export default function Chapter1() {
  const { compostos } = useCapituloCompostos(1);

  return compostos.map((c) => (
    <Text key={c.id}>
      {c.nome} - {c.formula}
    </Text>
  ));
}
```

### 2️⃣ Buscar um Composto Específico

```typescript
import { useComposto } from '@/hooks/useCompounds';

export default function Details() {
  const { composto } = useComposto('n2');

  return (
    <View>
      <Text>{composto?.nome}</Text>
      <Text>{composto?.formula}</Text>
    </View>
  );
}
```

### 3️⃣ Filtrar Compostos

```typescript
import { useCompounds } from '@/hooks/useCompounds';

export default function Polares() {
  const { filtrarCompostos } = useCompounds();
  const polares = filtrarCompostos({ polaridade: 'Polar' });

  return polares.map((c) => <Text key={c.id}>{c.nome}</Text>);
}
```

---

## 📚 Cheat Sheet

### Hooks Disponíveis

| Hook                      | Uso                              |
| ------------------------- | -------------------------------- |
| `useCompounds()`          | Acesso completo a todos os dados |
| `useCapituloCompostos(n)` | Compostos de um capítulo         |
| `useComposto(id)`         | Um composto específico           |

### Métodos do Hook `useCompounds()`

```typescript
// BUSCA
getCompostsByCapitulo(numero); // Todos de um capítulo
getCompostById(id); // Por ID
getCompostByName(nome); // Por nome
getCompostByFormula(formula); // Por fórmula
buscarCompostos(termo); // Busca por texto

// FILTRO
filtrarCompostos({ polaridade, geometria, capitulo, ativo, temModelo3D });

// LISTAGEM
getTodasAsFormulas(); // Array de fórmulas
getTodasAsGeometrias(); // Array de geometrias

// ANÁLISE
validarComposto(composto); // Validar dados
obterEstatisticas(); // Stats gerais

// DATA
todosOsCapitulos; // Array de capítulos
```

### Métodos do `CompoundService`

```typescript
// VALIDAÇÃO
CompoundService.validarComposto(c);
CompoundService.validarModelo3D(m);

// ANÁLISE QUÍMICA
CompoundService.extrairElementos(formula); // ['H', 'O']
CompoundService.contarAtomos(formula); // 3
CompoundService.isDiatomico(composto); // boolean
CompoundService.isTriatomico(composto); // boolean

// COMPARAÇÃO
CompoundService.compararCompostos(c1, c2); // score 0-100
CompoundService.compararPropriedades(c1, c2); // { iguais, diferentes }
CompoundService.obterCompostosRelacionados(c, lista);

// FORMATAÇÃO
CompoundService.formatarFormula('H2O'); // 'H₂O'

// CORES
CompoundService.obterCorPorPropriedades(c); // '#FF6B6B'

// FILTRO
CompoundService.filtrarPorPropriedades(lista, filtros);
CompoundService.ordenarCompostos(lista, 'nome');

// UTILITÁRIOS
CompoundService.gerarResumo(composto); // String descritiva
CompoundService.exportarJSON(composto); // JSON string
CompoundService.importarJSON(json); // Composto
```

---

## 🎨 Estrutura do Composto

```typescript
{
  id: 'n2',                          // Identificador único
  nome: 'Nitrogênio',                // Nome completo
  formula: 'N₂',                     // Fórmula química
  geometria: 'Linear',               // Forma molecular
  polaridade: 'Apolar',              // Polar/Apolar
  anguloLigacao: '180°',             // Ângulo
  informacoes: '...',                // Descrição
  capitulo: 1,                       // Número do capítulo
  ordem: 1,                          // Ordem de exibição
  ativo: true,                       // Se está ativo

  // Modelo 3D
  modelo3D: {
    pathGLB: 'assets/models/ejemplo.glb',
    nomeArquivo: 'nitrogen_molecule.glb',
    escala: 1.0,
    formato: 'GLB',
    animacao: {
      tipo: 'rotacao',
      velocidade: 4,
      eixo: 'y'
    },
    cor: '#78E3F8'
  }
}
```

---

## 🔍 Exemplos Comuns

### Exemplo 1: Mostrar todos os compostos com modelo 3D

```typescript
const { filtrarCompostos } = useCompounds();
const comComModelo = filtrarCompostos({ temModelo3D: true });
```

### Exemplo 2: Listar apenas moléculas lineares

```typescript
const { filtrarCompostos } = useCompounds();
const lineares = filtrarCompostos({ geometria: 'Linear' });
```

### Exemplo 3: Contar átomos em uma molécula

```typescript
const atomos = CompoundService.contarAtomos('SO₂'); // 3
```

### Exemplo 4: Obter compostos semelhantes

```typescript
const { getCompostById, filtrarCompostos } = useCompounds();
const n2 = getCompostById('n2');
const todos = filtrarCompostos({ ativo: true });
const similares = CompoundService.obterCompostosRelacionados(n2, todos);
```

### Exemplo 5: Validar um composto

```typescript
const validacao = CompoundService.validarComposto(meuComposto);
if (validacao.valido) {
  // Usar composto
} else {
  console.error(validacao.erros);
}
```

### Exemplo 6: Buscar por texto livre

```typescript
const { buscarCompostos } = useCompounds();
const resultados = buscarCompostos('nitro'); // Busca 'Nitrogênio', 'Dióxido de Nitrogênio'
```

### Exemplo 7: Obter estatísticas

```typescript
const { obterEstatisticas } = useCompounds();
const stats = obterEstatisticas();
// {
//   totalCapitulos: 3,
//   totalCompostos: 11,
//   compostosPolares: 5,
//   compostosApolares: 6,
//   compostosComModelo3D: 11,
//   percentualComModelo3D: "100.00"
// }
```

---

## 📊 Dados Disponíveis

### Capítulo 1 (3 compostos)

- ✅ N₂ - Nitrogênio
- ✅ O₂ - Oxigênio
- ✅ Ar - Argônio

### Capítulo 2 (2 compostos)

- ✅ SO₂ - Dióxido de Enxofre
- ✅ NO₂ - Dióxido de Nitrogênio

### Capítulo 3 (6 compostos)

- ✅ CO₂ - Dióxido de Carbono
- ✅ CH₄ - Metano
- ✅ N₂O - Óxido Nitroso
- ✅ H₂O - Água
- ✅ O₃ - Ozônio
- ✅ CFCl₃ - CFC-11

---

## 🗂️ Arquivo de Dados

**Localização**: `/data/compounds.json`

Contém toda a estrutura de dados em JSON com:

- ✅ 3 capítulos
- ✅ 11 compostos
- ✅ Modelos 3D para cada um
- ✅ Propriedades químicas
- ✅ Metadados completos

---

## ⚠️ Dicas Importantes

### 1. TypeScript + Autocomplete

```typescript
// O IDE vai sugerir automaticamente
const composto: Compound = { ... };
composto.  // ← Vê todas as propriedades
```

### 2. Validação é Automática

```typescript
const validacao = CompoundService.validarComposto(c);
// Retorna: { valido: boolean, erros: [], avisos: [] }
```

### 3. Cores por Propriedades

```typescript
const cor = CompoundService.obterCorPorPropriedades(composto);
// Retorna cor automaticamente baseada em polaridade + geometria
```

### 4. Filtros Combinam

```typescript
filtrarCompostos({
  capitulo: 1,
  polaridade: 'Apolar',
  ativo: true,
  // Todos os filtros são AND
});
```

### 5. Busca é Flexível

```typescript
buscarCompostos('n2'); // Encontra por ID
buscarCompostos('nitrô'); // Encontra por nome
buscarCompostos('N₂'); // Encontra por fórmula
```

---

## 🔗 Arquivos de Referência

| Arquivo                               | Descrição             |
| ------------------------------------- | --------------------- |
| `types/Compound.ts`                   | Interfaces TypeScript |
| `data/compounds.json`                 | Dados em JSON         |
| `hooks/useCompounds.ts`               | Hooks React           |
| `services/CompoundService.ts`         | Serviço de utilidades |
| `examples/CompoundTypingExamples.tsx` | Exemplos de uso       |
| `docs/COMPOUND_TYPING_SYSTEM.md`      | Documentação completa |

---

## ❓ FAQ

**P: Como adicionar um novo composto?**
R: Edite `/data/compounds.json` e adicione um novo objeto seguindo a estrutura. Valide com `CompoundService.validarComposto()`.

**P: Como mudar o modelo 3D de um composto?**
R: Edite a propriedade `modelo3D.pathGLB` no JSON do composto.

**P: Como filtrar por múltiplas propriedades?**
R: Use `filtrarCompostos()` com um objeto contendo os filtros.

**P: Como obter a cor automaticamente?**
R: Use `CompoundService.obterCorPorPropriedades(composto)`.

**P: Como validar dados antes de usar?**
R: Use `CompoundService.validarComposto()` que retorna erros e avisos.

---

## 🎓 Próximas Etapas

1. ✅ Integrar em `chapter1.tsx`, `chapter2.tsx`, `chapter3.tsx`
2. ✅ Usar no seletor de moléculas para dados dinâmicos
3. ✅ Implementar busca global na app
4. ✅ Adicionar comparador visual de moléculas
5. ✅ Criar página de detalhes com modelo 3D

---

**Versão**: 1.0.0 ✅
**Status**: Pronto para Produção
**Última atualização**: 10/12/2025
