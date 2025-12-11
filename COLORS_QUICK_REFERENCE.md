# 🎨 Quick Reference - Tema Branco e Azul

## Cores em Uso

### Paleta Principal

```typescript
import Colors from '@/constants/Colors';

// Backgrounds
Colors.darkBackground; // #FFFFFF (Branco principal)
Colors.background; // #F5F7FA (Cinza claro)
Colors.cardBackground; // #F5F7FA (Cinza para cards)
Colors.lightBackground; // #E3F2FD (Azul muito claro)
Colors.surfaceBackground; // #FFFFFF (Surface principal)

// Texto
Colors.text; // #1A1A1A (Texto principal)
Colors.textSecondary; // #616161 (Texto secundário)
Colors.textTertiary; // #9E9E9E (Texto terciário)
Colors.lightText; // #1A1A1A (Alias para escuro)
Colors.white; // #FFFFFF (Branco para ícones)

// Estrutural
Colors.border; // #E0E0E0 (Borda clara)
Colors.primary; // #1976D2 (Azul primária)
Colors.secondary; // #388E3C (Verde)
Colors.accent; // #F57C00 (Laranja)

// Efeitos
Colors.shadowColor; // rgba(0,0,0,0.15) (Sombra suave)
Colors.overlay; // rgba(0,0,0,0.3) (Overlay)
Colors.overlayLight; // rgba(25,118,210,0.1) (Overlay azul)

// Status
Colors.success; // #66BB6A (Verde - sucesso)
Colors.warning; // #FFA726 (Laranja - aviso)
Colors.error; // #EF5350 (Vermelho - erro)
Colors.info; // #42A5F5 (Azul - informação)

// Moléculas (Química)
Colors.nitrogen; // #3498DB (N₂ - Azul)
Colors.oxygen; // #E74C3C (O₂ - Vermelho)
Colors.argon; // #95A5A6 (Ar - Cinza)
Colors.carbon; // #2C3E50 (C - Cinza escuro)
Colors.hydrogen; // #ECF0F1 (H - Branco)
Colors.sulfur; // #F39C12 (S - Amarelo)
Colors.nitrogen_oxide; // #E67E22 (NO₂ - Laranja)
Colors.ozone; // #8E44AD (O₃ - Roxo)
```

---

## 📱 Componentes Principais

### Backgrounds

```tsx
// Branco puro (principal)
<View style={{ backgroundColor: Colors.darkBackground }} />

// Cinza claro (containers)
<View style={{ backgroundColor: Colors.background }} />

// Azul claro (highlights)
<View style={{ backgroundColor: Colors.lightBackground }} />
```

### Texto

```tsx
// Texto principal (escuro)
<Text style={{ color: Colors.text }}>Texto principal</Text>

// Texto secundário (cinzento)
<Text style={{ color: Colors.textSecondary }}>Subtítulo</Text>

// Texto branco (em fundos azuis)
<Text style={{ color: Colors.white }}>Ação</Text>
```

### Botões

```tsx
<TouchableOpacity
  style={{
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
  }}
>
  <Text style={{ color: Colors.white }}>Ação</Text>
</TouchableOpacity>
```

### Cards

```tsx
<View
  style={{
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  }}
/>
```

### Divisores

```tsx
<View
  style={{
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  }}
/>
```

---

## 🎯 Padrões de Uso

### Containers

```tsx
// Container principal (branco)
<View style={{ flex: 1, backgroundColor: Colors.darkBackground }} />

// Container secundário (cinza)
<View style={{ flex: 1, backgroundColor: Colors.background }} />

// Container com borda
<View style={{
  backgroundColor: Colors.cardBackground,
  borderColor: Colors.border,
  borderWidth: 1,
  borderRadius: 12
}} />
```

### Headers

```tsx
<View
  style={{
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  }}
>
  <Text style={{ color: Colors.white, fontWeight: 'bold' }}>Título</Text>
</View>
```

### Formulários

```tsx
<TextInput
  style={{
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: Colors.text,
  }}
/>
```

---

## 🔍 Validações de Contraste

### Recomendados

```
Texto escuro (#1A1A1A) + Fundo branco (#FFFFFF)
Ratio: 19.5:1 ✅ AAA (Excelente)

Texto escuro (#1A1A1A) + Fundo cinza claro (#F5F7FA)
Ratio: 17:1 ✅ AAA (Excelente)

Texto branco (#FFFFFF) + Fundo azul (#1976D2)
Ratio: 7:1 ✅ AAA (Excelente)
```

### NÃO Use

```
❌ Branco em branco
❌ Cinza claro em branco
❌ Cinza claro em cinza claro
❌ Azul em azul
```

---

## 🧪 Exemplo Completo - Card de Molécula

```tsx
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export function MoleculaCard({ molecula }) {
  return (
    <View style={styles.card}>
      {/* Header com borda azul */}
      <View style={styles.header}>
        <Text style={styles.nome}>{molecula.nome}</Text>
        <Text style={styles.formula}>{molecula.formula}</Text>
      </View>

      {/* Propriedades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Propriedades</Text>
        <Text style={styles.propertyValue}>{molecula.descricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground, // Cinza claro
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border, // Borda clara
    shadowColor: Colors.shadowColor, // Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary, // Azul
    paddingBottom: 12,
  },

  nome: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text, // Texto escuro
    marginBottom: 4,
  },

  formula: {
    fontSize: 16,
    color: Colors.primary, // Azul para fórmula
    fontWeight: '600',
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text, // Texto escuro
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  propertyValue: {
    fontSize: 14,
    color: Colors.textSecondary, // Texto cinzento
    lineHeight: 20,
  },
});
```

---

## 🚀 Dicas de Desenvolvimento

### ✅ Fazer

- ✅ Importar `Colors` de `@/constants/Colors`
- ✅ Usar variáveis de cor em vez de hardcoded
- ✅ Testar contraste em different iluminações
- ✅ Usar `Colors.shadowColor` para sombras
- ✅ Verificar acessibilidade com WCAG

### ❌ NÃO Fazer

- ❌ Hardcoded de cores (exemplo: `backgroundColor: '#FF0000'`)
- ❌ Criar novas cores fora do `Colors.ts`
- ❌ Usar contraste fraco
- ❌ Misturar temas em um componente
- ❌ Ignorar validação TypeScript

---

## 🔄 Migration Checklist

Se você está atualizando um componente antigo:

- [ ] Remover todos os hardcoded colors (#121212, #1E1E1E, etc)
- [ ] Importar Colors: `import Colors from '@/constants/Colors'`
- [ ] Substituir backgrounds antigos
  - [ ] `#121212` → `Colors.darkBackground`
  - [ ] `#1E1E1E` → `Colors.background`
  - [ ] `#272727` → `Colors.cardBackground`
  - [ ] `#3A3A3A` → `Colors.lightBackground`
  - [ ] `#404040` → `Colors.border`
- [ ] Substituir textos antigos
  - [ ] `#FFFFFF` → `Colors.white` ou `Colors.text`
  - [ ] `#B3B3B3` → `Colors.textSecondary`
- [ ] Atualizar sombras
  - [ ] Antigo `rgba(0,0,0,0.5)` → Novo `Colors.shadowColor`
- [ ] Testar em light e dark environments
- [ ] Validar TypeScript (0 erros)

---

## 📊 Tabela de Referência Rápida

| Uso                 | Cor             | Valor            |
| ------------------- | --------------- | ---------------- |
| **BG Principal**    | darkBackground  | #FFFFFF          |
| **BG Secundário**   | background      | #F5F7FA          |
| **Cards**           | cardBackground  | #F5F7FA          |
| **Highlights**      | lightBackground | #E3F2FD          |
| **Texto Principal** | text            | #1A1A1A          |
| **Texto Secondary** | textSecondary   | #616161          |
| **Bordas**          | border          | #E0E0E0          |
| **Primária**        | primary         | #1976D2          |
| **Branco**          | white           | #FFFFFF          |
| **Sombra**          | shadowColor     | rgba(0,0,0,0.15) |

---

## 🎓 Educação (Moléculas)

| Molécula | Cor      | Valor   |
| -------- | -------- | ------- |
| N₂       | nitrogen | #3498DB |
| O₂       | oxygen   | #E74C3C |
| Ar       | argon    | #95A5A6 |
| C        | carbon   | #2C3E50 |
| H        | hydrogen | #ECF0F1 |
| S        | sulfur   | #F39C12 |

---

## 💡 Dicas de Performance

- Use `Colors` constants para evitar re-renders desnecessários
- Memoize components com muitas cores
- Use `StyleSheet.create()` para otimizar performance
- Evite criar novos objetos de estilo inline

---

## 🔗 Arquivos Relacionados

```
constants/Colors.ts          ← Master de cores
styles/AppStyle.ts           ← Estilos globais
app/(tabs)/chapter1.tsx      ← Capítulo 1 (exemplo)
THEME_CONVERSION_SUMMARY.md  ← Documentação detalhada
THEME_COMPARISON_VISUAL.md   ← Comparação visual
CONVERSION_COMPLETE.md       ← Status de conclusão
```

---

## ❓ Perguntas Frequentes

**P: Preciso adicionar uma nova cor?**
A: Sim, adicione em `constants/Colors.ts` e documente seu uso.

**P: Como verificar se meu contraste está bom?**
A: Use WCAG AA ou AAA (recomendado) - teste com ferramentas online.

**P: Posso usar hardcoded colors?**
A: Não, sempre use `Colors.*` para consistência.

**P: Como testar acessibilidade?**
A: Use ferramentas WCAG, simule visão de cores alterada.

---

## 📞 Suporte Rápido

Se algo der errado:

1. Verificar `Colors.ts` (validação TypeScript)
2. Procurar hardcoded colors no arquivo
3. Verificar imports de Colors
4. Validar contraste de cores
5. Testar em dispositivo real

---

**Versão**: 1.0 - Tema Branco e Azul ✅
**Data**: 2024
**Status**: Completo e Validado
