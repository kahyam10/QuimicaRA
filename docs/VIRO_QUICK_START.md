# ⚡ Guia Rápido - Viro AR

**Use este guia para implementar rapidamente o Viro em seus capítulos.**

---

## 🎯 5 Passos para Adicionar AR em um Capítulo

### Passo 1: Importar o Componente

```tsx
import { CompoundModelViewer } from '@/components/CompoundModelViewer';
```

### Passo 2: Adicionar o Componente no JSX

```tsx
<CompoundModelViewer
  compoundName="Água (H₂O)"
  modelPath="assets/models/h2o.glb"
  size="medium"
/>
```

### Passo 3: Adicionar o Arquivo GLB

```
assets/models/h2o.glb  ← Colocar o arquivo aqui
```

### Passo 4: Testar

```bash
npm run ios
# ou
expo start
```

### Passo 5: Pronto! 🎉

Clique no botão PLAY e a visualização 3D abrirá.

---

## 📋 Componente CompoundModelViewer

### Props Disponíveis

| Prop           | Tipo                           | Obrigatório | Padrão      | Descrição              |
| -------------- | ------------------------------ | ----------- | ----------- | ---------------------- |
| `compoundName` | string                         | ✅          | -           | Nome do composto       |
| `modelPath`    | string                         | ✅          | -           | Caminho do arquivo GLB |
| `size`         | 'small' \| 'medium' \| 'large' | ❌          | 'medium'    | Tamanho do frame       |
| `buttonText`   | string                         | ❌          | 'VER EM AR' | Texto do botão         |

### Exemplos de Tamanhos

```tsx
{
  /* Pequeno - 120px */
}
<CompoundModelViewer
  compoundName="Molécula"
  modelPath="assets/models/small.glb"
  size="small"
/>;

{
  /* Médio - 180px (padrão) */
}
<CompoundModelViewer
  compoundName="Molécula"
  modelPath="assets/models/medium.glb"
  size="medium"
/>;

{
  /* Grande - 240px */
}
<CompoundModelViewer
  compoundName="Molécula"
  modelPath="assets/models/large.glb"
  size="large"
/>;
```

---

## 📁 Estrutura de Pastas para Modelos

```
assets/
├── models/
│   ├── h2o.glb              ✅ Água
│   ├── co2.glb              ✅ Dióxido de Carbono
│   ├── nh3.glb              ✅ Amônia
│   ├── o3.glb               ✅ Ozônio
│   ├── no2.glb              ✅ Dióxido de Nitrogênio
│   ├── n2o.glb              ✅ Óxido Nitroso
│   └── ...
└── images/
    └── ...
```

---

## 💡 Dicas Importantes

### 1. Tamanho do Arquivo GLB

- ✅ **Ideal**: 1-5 MB
- ⚠️ **Máximo**: 10 MB
- ❌ **Evitar**: Acima de 10 MB (lentidão)

### 2. Qualidade do Modelo

- ✅ **Polígonos**: 10k - 50k
- ✅ **Formato**: GLB (binário é melhor que GLTF)
- ✅ **Texturas**: JPEG ou WebP comprimidas

### 3. Posicionamento

```tsx
// O modelo é renderizado em:
position={[0, -0.5, 0]}  // Centro, um pouco abaixo
scale={[0.001, 0.001, 0.001]}  // Escala 0.1% (ajustar conforme necessário)
```

### 4. Iluminação

A iluminação ambiente é branca com intensidade 1.2:

```tsx
<ViroAmbientLight color="#ffffff" intensity={1.2} />
```

---

## 🎨 Integração com Tema Dark Mode

Todos os componentes já usam as cores do tema:

```typescript
// Cores usadas automaticamente
Colors.primary; // #1976D2 (Azul)
Colors.cardBackground; // #272727 (Cinza escuro)
Colors.text; // #FFFFFF (Branco)
Colors.textSecondary; // #B3B3B3 (Cinza)
Colors.border; // #404040 (Cinza escuro)
Colors.darkBackground; // #121212 (Preto)
```

---

## 🔄 Fluxo de Interação

```
1. Usuário vê o frame com botão PLAY
   ↓
2. Clica no botão PLAY
   ↓
3. Modal abre com cabeçalho e rodapé
   ↓
4. Cena AR é carregada
   ↓
5. Modelo 3D renderizado com iluminação
   ↓
6. Usuário pode mover o dispositivo para explorar
   ↓
7. Clica no botão X para fechar
   ↓
8. Volta ao conteúdo do capítulo
```

---

## ❌ Problemas Comuns

### Modelo não aparece

**Solução**: Verifique o caminho do arquivo:

```tsx
// ❌ Errado
modelPath = 'models/h2o.glb';

// ✅ Correto
modelPath = 'assets/models/h2o.glb';
```

### Modelo muito pequeno/grande

**Solução**: Ajuste a escala:

```tsx
// No arquivo ViroARViewer.tsx, procure por:
scale={[0.001, 0.001, 0.001]}

// Ajuste os valores:
// Aumentar: [0.002, 0.002, 0.002]
// Diminuir: [0.0005, 0.0005, 0.0005]}
```

### Modal não fecha

**Solução**: Verifique se o botão X está sendo renderizado.

---

## 🚀 Próximos Recursos (Futura Implementação)

### Rotação Automática

```tsx
// Adicionar ao Viro3DObject
animation={{
  name: 'rotate',
  loop: true,
}}
animations={[{
  name: 'rotate',
  keyframeSequence: [
    [0, [0, 0, 0]],
    [1, [0, 360, 0]],
  ],
}]}
```

### Efeitos de Reação

```tsx
// Adicionar ViroParticleEmitter
<ViroParticleEmitter
  position={[0, 0, -1]}
  emissionRatePerSecond={100}
  particleLifespan={2000}
/>
```

### Texto 3D

```tsx
// Adicionar rótulos
<ViroText
  text="H₂O"
  position={[0, 0.5, -1]}
  scale={[0.5, 0.5, 0.5]}
  color={Colors.primary}
/>
```

---

## 📚 Arquivos de Referência

1. **ViroARViewer.tsx** - Componente modal principal
2. **CompoundModelViewer.tsx** - Componente com botão PLAY
3. **VIRO_AR_IMPLEMENTATION.md** - Documentação técnica completa
4. **VIRO_INTEGRATION_EXAMPLES.md** - 3 exemplos práticos
5. **VIRO_SUMMARY.md** - Resumo geral do projeto

---

## ✅ Checklist para Implementar

```
[ ] Preparar modelos GLB em assets/models/
[ ] Importar CompoundModelViewer no capítulo
[ ] Adicionar <CompoundModelViewer /> no JSX
[ ] Testar em dispositivo real
[ ] Ajustar tamanhos e posições se necessário
[ ] Verificar iluminação e renderização
[ ] Documentar propriedades específicas do composto
```

---

## 🎓 Aprenda Mais

- [Documentação Viro Completa](https://docs.viromedia.com/)
- [Exemplos do GitHub](https://github.com/viromedia/viro)
- [Exportar de Blender para GLB](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
- [Ferramenta de Validação GLB](https://gltf-viewer.donmccurdy.com/)

---

## 🎉 Você está pronto!

**O projeto MILI agora possui:**

- ✅ Dark mode profissional
- ✅ Realidade aumentada
- ✅ Documentação completa
- ✅ Exemplos prontos para uso

**Comece a adicionar modelos 3D e integre em seus capítulos! 🚀**
