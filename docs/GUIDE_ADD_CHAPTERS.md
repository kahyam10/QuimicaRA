# 📖 Guia para Adicionar Capítulos 2 e 3

## 🚀 Como Adicionar Novos Capítulos

A estrutura está pronta e é **muito fácil** adicionar novos capítulos. Aqui está o passo a passo:

---

## 1️⃣ Adicionar Dados em `ChapterContent.ts`

Abra o arquivo `constants/ChapterContent.ts` e siga o padrão do Capítulo 1:

### Exemplo - Capítulo 2

```typescript
// Copie este padrão para cada molécula do Capítulo 2:

const moleculaExemplo: Molecula = {
  id: 'id-unico',
  nome: 'Nome da Molécula',
  formula: 'Fórmula', // Ex: CO₂, H₂O, etc
  geometria: 'Geometria Molecular', // Ex: Linear, Trigonal, Tetraédrica
  polaridade: 'Apolar/Polar/Não aplicável',
  anguloLigacao: 'Ângulo em graus', // Ex: 180°, 120°, 109.5°
  percentualAtmosfera: 'X%', // Opcional, remova se não houver
  informacoes: 'Descrição detalhada da molécula...',
};

// Depois crie o capítulo:
export const capitulo2: Capitulo = {
  id: 'cap2',
  numero: 2,
  titulo: 'Seu Título Aqui',
  descricao: 'Descrição do capítulo',
  moleculas: [moleculaExemplo, moleculaExemplo2, ...],
};

// Adicione ao array de capítulos:
export const CAPITULOS = [capitulo1, capitulo2];
```

---

## 2️⃣ Criar Arquivo de Capítulo

Copie `app/(tabs)/chapter1.tsx` e renomeie para `chapter2.tsx`:

```bash
cp app/\(tabs\)/chapter1.tsx app/\(tabs\)/chapter2.tsx
```

### Faça estas alterações:

```typescript
// Mude a importação:
import { capitulo1, Molecula } from '@/constants/ChapterContent';
// Para:
import { capitulo2, Molecula } from '@/constants/ChapterContent';

// Mude a inicialização:
const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo1.moleculas[0]);
// Para:
const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo2.moleculas[0]);

// Mude as referencias:
<ChapterHeader chapterNumber={capitulo1.numero} title={capitulo1.titulo} />
moleculas={capitulo1.moleculas}
// Para:
<ChapterHeader chapterNumber={capitulo2.numero} title={capitulo2.titulo} />
moleculas={capitulo2.moleculas}
```

---

## 3️⃣ Atualizar Rotas (Se Necessário)

Se você adicionou os tabs no `_layout.tsx`, certifique-se de que os novos capítulos estão acessíveis.

---

## 📋 Checklist para Cada Novo Capítulo

- [ ] Dados adicionados em `ChapterContent.ts`
- [ ] Arquivo `chapter{N}.tsx` criado
- [ ] Importações corrigidas
- [ ] Variáveis `capitulo1` → `capitulo{N}`
- [ ] Rota configurada em `_layout.tsx`
- [ ] Testado no Expo
- [ ] Sem TypeScript errors
- [ ] Conteúdo aparece corretamente

---

## 🎯 Exemplo Completo: Capítulo 2

Aqui está um exemplo de como seria um Capítulo 2 fictício:

### Em `ChapterContent.ts`:

```typescript
// CAPÍTULO 2: Exemplo de Moléculas Compostas

const dioxide: Molecula = {
  id: 'co2',
  nome: 'Dióxido de Carbono',
  formula: 'CO₂',
  geometria: 'Linear',
  polaridade: 'Apolar',
  anguloLigacao: '180°',
  percentualAtmosfera: '0.04%',
  informacoes:
    'Molécula essencial para a fotossíntese. Composta por um carbono central...',
};

const agua: Molecula = {
  id: 'h2o',
  nome: 'Água',
  formula: 'H₂O',
  geometria: 'Trigonal Planar (Bent)',
  polaridade: 'Polar',
  anguloLigacao: '104.5°',
  informacoes:
    'Molécula polar essencial para a vida. Apresenta ligações de hidrogênio...',
};

export const capitulo2: Capitulo = {
  id: 'cap2',
  numero: 2,
  titulo: 'Moléculas Comuns',
  descricao: 'Explorar as moléculas mais presentes no cotidiano',
  moleculas: [dioxide, agua],
};
```

### Em `app/(tabs)/chapter2.tsx`:

```typescript
import { capitulo2, Molecula } from '@/constants/ChapterContent';

export default function Chapter2Screen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(
    capitulo2.moleculas[0]
  );
  // ... resto do código igual ao chapter1, apenas mude capitulo1 → capitulo2
}
```

---

## ⚡ Atalho Rápido (Terminal)

Se preferir, pode usar PowerShell para copiar o arquivo:

```powershell
# Para Capítulo 2
Copy-Item "e:\PROJECT\MILI\app\(tabs)\chapter1.tsx" -Destination "e:\PROJECT\MILI\app\(tabs)\chapter2.tsx"

# Para Capítulo 3
Copy-Item "e:\PROJECT\MILI\app\(tabs)\chapter1.tsx" -Destination "e:\PROJECT\MILI\app\(tabs)\chapter3.tsx"
```

Depois você só precisa editar as importações e variáveis em cada arquivo.

---

## 🔍 Validação

Após adicionar um novo capítulo, verifique:

```bash
# Verifique se há erros TypeScript
npm run type-check

# Ou reinicie o Expo
npm run ios
expo start
```

Se houver erro do tipo `Cannot find module`, certifique-se de:

1. ✅ Exportou `capitulo2` em `ChapterContent.ts`
2. ✅ A importação está correta
3. ✅ O arquivo `chapter2.tsx` existe

---

## 💡 Dicas

### ✅ Copiar é mais seguro que criar do zero

Copiar `chapter1.tsx` garante que toda a estrutura de imports e styles está correta.

### ✅ Sempre validar imports

Cada novo capítulo deve ter:

```typescript
import { capitulo2, Molecula } from '@/constants/ChapterContent'; // Seu capítulo
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';
```

### ✅ Testar imediatamente

Depois de fazer as mudanças, teste logo no Expo para detectar erros rápido.

### ✅ Reutilizar componentes

Todos os componentes foram criados para serem reutilizáveis. Não precisa duplicar código!

---

## 📞 Se Encontrar Erros

### "Cannot find module 'ChapterContent'"

- Verifique se exportou o novo capítulo em `ChapterContent.ts`
- Exemplo: `export const capitulo2: Capitulo = { ... };`

### "Type 'Molecula' is not assignable"

- Verifique se todas as propriedades obrigatórias estão presentes
- Propriedades obrigatórias: `id`, `nome`, `formula`, `geometria`, `polaridade`, `anguloLigacao`, `informacoes`
- Opcional: `percentualAtmosfera`

### Capítulo não aparece na navegação

- Certifique-se de que foi adicionado ao `_layout.tsx` ou tabbar apropriado
- Verifique se o arquivo está na pasta correta: `app/(tabs)/`

---

## 🎯 Próximos Passos

1. **Prepare o conteúdo do Capítulo 2**

   - Coloque o conteúdo em texto
   - Identifique as moléculas principais
   - Organize as propriedades

2. **Passe o conteúdo**

   - Me envie no mesmo formato do Capítulo 1
   - Inclua: Nome, Fórmula, Geometria, Polaridade, Ângulo, Informações

3. **Faremos juntos**
   - Adicionar os dados em `ChapterContent.ts`
   - Criar os arquivos de capítulo
   - Testar tudo junto

---

## 📊 Estrutura Final (Com 3 Capítulos)

```
CAPITULOS = [
  {
    numero: 1,
    titulo: "Composição Atmosférica",
    moleculas: [N₂, O₂, Ar]
  },
  {
    numero: 2,
    titulo: "Seu Título Aqui",
    moleculas: [molécula1, molécula2, ...]
  },
  {
    numero: 3,
    titulo: "Outro Título",
    moleculas: [molécula1, molécula2, ...]
  }
]
```

---

**Quando quiser adicionar Capítulo 2 e 3, é só avisar! 📚**
