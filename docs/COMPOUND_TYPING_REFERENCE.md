# 📖 REFERÊNCIA RÁPIDA - Tipagem de Compostos

**Copy-paste instantâneo para começar a usar!**

---

## 1️⃣ Importar Dados

```typescript
import {
  useCompounds,
  useCapituloCompostos,
  useComposto,
} from '@/hooks/useCompounds';
import { CompoundService } from '@/services/CompoundService';
```

---

## 2️⃣ Padrão: Listar Compostos de um Capítulo

```typescript
export const ListarCompostos = () => {
  const { compostos } = useCapituloCompostos(1); // Capítulo 1

  return compostos.map((c) => (
    <Text key={c.id}>
      {c.nome} ({c.formula})
    </Text>
  ));
};
```

---

## 3️⃣ Padrão: Buscar um Composto

```typescript
export const BuscarComposto = () => {
  const { composto, valido } = useComposto('n2');

  if (!valido) return <Text>Não encontrado</Text>;

  return (
    <Text>
      {composto?.nome} - {composto?.formula}
    </Text>
  );
};
```

---

## 4️⃣ Padrão: Filtrar Compostos

```typescript
export const FiltrarPolares = () => {
  const { filtrarCompostos } = useCompounds();
  const polares = filtrarCompostos({
    polaridade: 'Polar',
    capitulo: 2,
  });

  return polares.map((c) => <Text key={c.id}>{c.nome}</Text>);
};
```

---

## 5️⃣ Padrão: Validar Dados

```typescript
const validacao = CompoundService.validarComposto(meuComposto);

if (!validacao.valido) {
  console.error('Erros:', validacao.erros);
  console.warn('Avisos:', validacao.avisos);
}
```

---

## 6️⃣ Padrão: Análise Química

```typescript
const formula = 'SO₂';
const elementos = CompoundService.extrairElementos(formula); // ['S', 'O']
const atomos = CompoundService.contarAtomos(formula); // 3
const isDia = CompoundService.isDiatomico(composto); // false
const isTria = CompoundService.isTriatomico(composto); // true
```

---

## 7️⃣ Padrão: Comparar Moléculas

```typescript
const { getCompostById } = useCompounds();
const n2 = getCompostById('n2');
const o2 = getCompostById('o2');

const score = CompoundService.compararCompostos(n2, o2);
// Retorna 0-100 (similaridade)

const props = CompoundService.compararPropriedades(n2, o2);
// { iguais: ['polaridade'], diferentes: ['geometria'] }
```

---

## 8️⃣ Padrão: Obter Cor Automática

```typescript
export const CompostoComCor = ({ composto }) => {
  const cor = CompoundService.obterCorPorPropriedades(composto);

  return (
    <View style={{ backgroundColor: cor, padding: 10 }}>
      <Text>{composto.nome}</Text>
    </View>
  );
};
```

---

## 9️⃣ Padrão: Compostos Relacionados

```typescript
const { getCompostById, filtrarCompostos } = useCompounds();
const n2 = getCompostById('n2');
const todos = filtrarCompostos({ ativo: true });

const relacionados = CompoundService.obterCompostosRelacionados(
  n2,
  todos,
  5 // Número máximo
);
```

---

## 🔟 Padrão: Busca com Texto Livre

```typescript
const { buscarCompostos } = useCompounds();

// Todos funcionam:
const r1 = buscarCompostos('nitro'); // Por nome
const r2 = buscarCompostos('N₂'); // Por fórmula
const r3 = buscarCompostos('n2'); // Por ID
```

---

## 1️⃣1️⃣ Padrão: Estatísticas

```typescript
const { obterEstatisticas } = useCompounds();
const stats = obterEstatisticas();

console.log(`Total: ${stats.totalCompostos}`);
console.log(`Polares: ${stats.compostosPolares}`);
console.log(`Com Modelo 3D: ${stats.compostosComModelo3D}`);
```

---

## 1️⃣2️⃣ Padrão: Ordenar Compostos

```typescript
const { filtrarCompostos } = useCompounds();
const compostos = filtrarCompostos({ capitulo: 1 });

const ordenados = CompoundService.ordenarCompostos(compostos, 'nome');
// Opções: 'nome', 'ordem', 'capitulo', 'formula'
```

---

## 1️⃣3️⃣ Padrão: Filtro Avançado

```typescript
const { filtrarCompostos } = useCompounds();

const resultado = filtrarCompostos({
  capitulo: 2,
  polaridade: 'Polar',
  ativo: true,
  temModelo3D: true,
  // Todos os filtros são AND
});
```

---

## 1️⃣4️⃣ Padrão: Acessar Modelo 3D

```typescript
const { composto } = useComposto('n2');

if (composto?.modelo3D) {
  const pathGLB = composto.modelo3D.pathGLB; // 'assets/models/...'
  const escala = composto.modelo3D.escala; // 1.0
  const formato = composto.modelo3D.formato; // 'GLB'
  const animacao = composto.modelo3D.animacao; // { tipo, velocidade, eixo }
  const cor = composto.modelo3D.cor; // '#78E3F8'
}
```

---

## 1️⃣5️⃣ Padrão: Componente com Dados Dinâmicos

```typescript
export const CompostoCard = ({ compostId }) => {
  const { composto, valido } = useComposto(compostId);

  if (!valido) return null;

  const cor = CompoundService.obterCorPorPropriedades(composto!);
  const elementos = CompoundService.extrairElementos(composto!.formula);

  return (
    <View style={{ backgroundColor: cor }}>
      <Text>{composto?.nome}</Text>
      <Text>{CompoundService.formatarFormula(composto!.formula)}</Text>
      <Text>Elementos: {elementos.join(', ')}</Text>
      <Text>
        {composto?.polaridade} • {composto?.geometria}
      </Text>
    </View>
  );
};
```

---

## 💡 Dicas Práticas

✅ Use `useCompounds()` quando precisar múltiplas operações
✅ Use `useCapituloCompostos(n)` para um capítulo específico
✅ Use `useComposto(id)` quando já sabe o ID
✅ Sempre valide com `CompoundService.validarComposto()`
✅ Cores são automáticas com `obterCorPorPropriedades()`
✅ Todos os métodos são tipados (autocomplete no IDE)
✅ JSON fica em sync com TypeScript automaticamente

---

## 🎨 Constantes Úteis

```typescript
import {
  GEOMETRIAS,
  POLARIDADES,
  TIPOS_ANIMACAO,
} from '@/services/CompoundService';

// GEOMETRIAS
const g = [GEOMETRIAS.LINEAR, GEOMETRIAS.ANGULAR, GEOMETRIAS.TETRAEDRICA];

// POLARIDADES
const p = [POLARIDADES.POLAR, POLARIDADES.APOLAR];

// TIPOS_ANIMACAO
const a = [TIPOS_ANIMACAO.ROTACAO, TIPOS_ANIMACAO.OSCILACAO];
```

---

## 📚 Como Usar Cada Arquivo

| Arquivo                       | Importar                                       | Usar                        |
| ----------------------------- | ---------------------------------------------- | --------------------------- |
| `types/Compound.ts`           | `import { Compound } from '@/types/Compound'`  | `const c: Compound = {}`    |
| `data/compounds.json`         | Automático                                     | Via hooks                   |
| `hooks/useCompounds.ts`       | `import { useCompounds } from '@/hooks'`       | `useCapituloCompostos(1)`   |
| `services/CompoundService.ts` | `import { CompoundService } from '@/services'` | `CompoundService.validar()` |

---

## 📊 Estrutura Rápida de um Composto

```json
{
  "id": "n2",
  "nome": "Nitrogênio",
  "formula": "N₂",
  "geometria": "Linear",
  "polaridade": "Apolar",
  "anguloLigacao": "180°",
  "informacoes": "Descrição...",
  "capitulo": 1,
  "ordem": 1,
  "ativo": true,
  "modelo3D": {
    "pathGLB": "assets/models/ejemplo.glb",
    "escala": 1.0,
    "formato": "GLB",
    "animacao": { "tipo": "rotacao", "velocidade": 4, "eixo": "y" },
    "cor": "#78E3F8"
  }
}
```

---

## 🔄 Tipos de Retorno

| Método                       | Retorna                   |
| ---------------------------- | ------------------------- |
| `getCompostsByCapitulo(n)`   | `Compound[]`              |
| `getCompostById(id)`         | `Compound \| undefined`   |
| `buscarCompostos(termo)`     | `Compound[]`              |
| `filtrarCompostos(opcoes)`   | `Compound[]`              |
| `compararCompostos(c1, c2)`  | `number (0-100)`          |
| `validarComposto(c)`         | `CompoundValidation`      |
| `contarAtomos(f)`            | `number`                  |
| `isDiatomico(c)`             | `boolean`                 |
| `formatarFormula(f)`         | `string`                  |
| `obterCorPorPropriedades(c)` | `string (hex)`            |
| `obterEstatisticas()`        | `{ total, polares, ... }` |

---

## 🎯 Fluxo Típico de Uso

```typescript
// 1. Importar
import { useCapituloCompostos } from '@/hooks/useCompounds';
import { CompoundService } from '@/services/CompoundService';

// 2. Usar no componente
const { compostos } = useCapituloCompostos(1);

// 3. Validar se necessário
const validacao = CompoundService.validarComposto(c);

// 4. Processar dados
const cor = CompoundService.obterCorPorPropriedades(c);
const atomos = CompoundService.contarAtomos(c.formula);

// 5. Renderizar
return <Text style={{ color: cor }}>{c.nome}</Text>;
```

---

**Pronto para começar!** 🚀
