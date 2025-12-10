# 🌐 Implementação do Viro AR - Guia Completo

**Data**: 10 de dezembro de 2025  
**Status**: ✅ Configuração Completa

---

## 📦 O Que Foi Alterado

### 1. **Dependências (package.json)**

- ✅ **Removido**: `expo-three` e `three`
- ✅ **Adicionado**: `@reactvision/react-viro@^2.43.3`
- ✅ **Removido**: `@types/three`

### 2. **Novos Componentes Criados**

#### `components/ViroARViewer.tsx`

Componente principal para visualização de modelos 3D em AR.

**Características:**

- Modal com header e footer
- Integração completa com ViroARSceneNavigator
- Suporte para modelos GLB/GLTF
- Iluminação ambiente configurável
- Botão flutuante para fechar
- Loading state

**Recursos do Viro Implementados:**

```typescript
// Importações
import {
  ViroARScene, // Cena de realidade aumentada
  ViroAmbientLight, // Iluminação ambiente
  Viro3DObject, // Renderização de modelos 3D
  ViroARSceneNavigator, // Navegador de cenas
  ViroTrackingStateConstants, // Estados de rastreamento
} from '@reactvision/react-viro';
```

**Exemplo de Uso:**

```tsx
<ViroARViewer
  visible={arVisible}
  objectPath="assets/models/h2o.glb"
  compoundName="Água (H₂O)"
  onClose={() => setArVisible(false)}
/>
```

---

#### `components/CompoundModelViewer.tsx`

Componente reutilizável com botão PLAY para abrir visualização 3D.

**Características:**

- Frame com botão PLAY centralizado
- 3 tamanhos (small, medium, large)
- Integração com ViroARViewer
- Label customizável
- Design responsivo

**Exemplo de Uso:**

```tsx
<CompoundModelViewer
  compoundName="Água (H₂O)"
  modelPath="assets/models/h2o.glb"
  size="medium"
  buttonText="VER EM AR"
/>
```

---

## 🎯 Como Implementar em Cada Capítulo

### Estrutura Recomendada

```typescript
// Em cada chapter*.tsx

import { CompoundModelViewer } from '@/components/CompoundModelViewer';

export default function Chapter1() {
  return (
    <ScrollView>
      {/* Conteúdo do capítulo */}
      <Text>Introdução ao Composto...</Text>

      {/* Visualizador 3D */}
      <CompoundModelViewer
        compoundName="Água (H₂O)"
        modelPath="assets/models/h2o.glb"
        size="medium"
      />

      {/* Mais conteúdo */}
      <Text>Propriedades químicas...</Text>
    </ScrollView>
  );
}
```

---

## 🚀 Recursos Adicionais do Viro para Implementação Futura

### 1. **ViroImage** - Detecção de Imagens

```tsx
import { ViroARImageMarker } from '@reactvision/react-viro';

<ViroARImageMarker target="target_image_name">
  {/* Conteúdo renderizado sobre a imagem */}
</ViroARImageMarker>;
```

**Caso de Uso:** Detectar uma imagem impressa de um elemento e renderizar seu modelo 3D sobre ela.

---

### 2. **ViroOmniLight** - Iluminação 3D com Sombras

```tsx
import { ViroOmniLight } from '@reactvision/react-viro';

<ViroOmniLight
  position={[0, 1, 0]}
  color="#ffffff"
  intensity={1.0}
  attenuationStartDistance={5}
  attenuationEndDistance={10}
/>;
```

**Caso de Uso:** Adicionar iluminação realística com sombras aos modelos.

---

### 3. **ViroSpotLight** - Iluminação Direcional

```tsx
import { ViroSpotLight } from '@reactvision/react-viro';

<ViroSpotLight
  position={[2, 2, 2]}
  direction={[0, -1, 0]}
  color="#ffffff"
  intensity={1.0}
  innerAngle={45}
  outerAngle={90}
/>;
```

**Caso de Uso:** Iluminação focada em área específica do modelo.

---

### 4. **ViroAnimations** - Animações de Objetos

```tsx
<Viro3DObject
  source={{ uri: modelPath }}
  type="GLB"
  animation={{
    name: 'spin',
    delay: 0,
    loop: true,
    onStart: () => console.log('Spinning'),
    onFinish: () => console.log('Done'),
  }}
  animations={[
    {
      name: 'spin',
      keyframeSequence: [
        [0, [0, 0, 0]],
        [1, [0, 360, 0]],
      ],
    },
  ]}
/>
```

**Caso de Uso:** Rotações automáticas, animações de escala, etc.

---

### 5. **ViroParticleEmitter** - Efeitos de Partículas

```tsx
import { ViroParticleEmitter } from '@reactvision/react-viro';

<ViroParticleEmitter
  position={[0, 0, -1]}
  duration={2000}
  fixedWorldCoordinates={false}
  particleLifespan={2000}
  emissionRatePerSecond={100}
  scale={[0.05, 0.05, 0.05]}
  materials={['particle_texture']}
  opacity={1.0}
/>;
```

**Caso de Uso:** Animação de reações químicas, efeitos visuais.

---

### 6. **ViroText** - Texto 3D

```tsx
import { ViroText } from '@reactvision/react-viro';

<ViroText
  text="H₂O"
  scale={[0.5, 0.5, 0.5]}
  position={[0, 0.5, -1]}
  rotation={[0, 0, 0]}
  fontSize={20}
  color={Colors.primary}
/>;
```

**Caso de Uso:** Rótulos e identificadores do composto.

---

### 7. **ViroQuad** - Planos 2D em 3D

```tsx
import { ViroQuad } from '@reactvision/react-viro';

<ViroQuad
  position={[0, 0, -1]}
  scale={[1, 1, 1]}
  materials={['image_material']}
  onTap={() => console.log('Quad tapped')}
/>;
```

**Caso de Uso:** Exibir imagens como planos dentro de AR.

---

### 8. **ViroButton** - Botões Interativos

```tsx
import { ViroButton } from '@reactvision/react-viro';

<ViroButton
  position={[0, -1, 0]}
  onClick={() => handleButtonPress()}
  text="Mais Info"
  textFontSize={14}
/>;
```

**Caso de Uso:** Botões interativos dentro da cena AR.

---

### 9. **ViroPortal** - Portais Entre Cenas

```tsx
import { ViroPortal, ViroPortalScene } from '@reactvision/react-viro';

<ViroPortal passThrough={true} position={[0, 0, -1]}>
  <ViroPortalScene {...otherProps} />
</ViroPortal>;
```

**Caso de Uso:** Navegar entre diferentes visualizações de compostos.

---

### 10. **ViroBox/ViroSphere** - Primitivos Geométricos

```tsx
import { ViroBox, ViroSphere } from '@reactvision/react-viro';

// Cubo
<ViroBox
  position={[0, 0, -1]}
  scale={[0.5, 0.5, 0.5]}
  materials={['box_material']}
  color={Colors.primary}
/>

// Esfera
<ViroSphere
  position={[0, 0, -1]}
  scale={[0.5, 0.5, 0.5]}
  materials={['sphere_material']}
  color={Colors.secondary}
/>
```

**Caso de Uso:** Criar modelos simples diretamente no código.

---

## 📋 Fluxo de Implementação Recomendado

### Fase 1: Setup Básico ✅ CONCLUÍDO

- [x] Remover expo-three
- [x] Instalar react-viro
- [x] Criar ViroARViewer
- [x] Criar CompoundModelViewer

### Fase 2: Integração nos Capítulos

- [ ] Adicionar CompoundModelViewer em chapter1.tsx
- [ ] Adicionar CompoundModelViewer em chapter2.tsx
- [ ] Adicionar CompoundModelViewer em chapter3.tsx
- [ ] Preparar modelos 3D dos compostos (GLB)

### Fase 3: Enhancements Avançados

- [ ] Adicionar ViroText com nomes dos compostos
- [ ] Implementar ViroAnimations (rotação automática)
- [ ] Adicionar iluminação com ViroOmniLight
- [ ] Criar efeitos de reação com ViroParticleEmitter

### Fase 4: Interatividade

- [ ] Adicionar botões interativos dentro da AR
- [ ] Implementar gestos (pinch to zoom, rotation)
- [ ] Adicionar informações detalhadas em popups

---

## 🔧 Configuração de Modelos 3D

### Formatos Suportados

- **GLB** (Binary glTF) ✅ Recomendado
- **GLTF** (glTF JSON + bin)
- **OBJ** (com material)
- **FBX** (com limitações)

### Otimização de Modelos

```
1. Reduzir polygons: 10k - 50k polígonos ideal
2. Usar texturas comprimidas (WebP, JPEG)
3. Escala apropriada (testar com position/scale)
4. Formato: GLB é melhor que GLTF para mobile
```

### Local dos Modelos

```
assets/models/
├── h2o.glb          (Água)
├── co2.glb          (Dióxido de Carbono)
├── nh3.glb          (Amônia)
├── o3.glb           (Ozônio)
└── ...
```

---

## 📚 Exemplo Completo de Integração

```tsx
// chapter1.tsx
import { ScrollView, View } from 'react-native';
import { CompoundModelViewer } from '@/components/CompoundModelViewer';

export default function Chapter1() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Capítulo 1: Água
        </Text>

        <Text style={{ marginTop: 12, lineHeight: 24 }}>
          A água é um composto químico formado por moléculas de H₂O...
        </Text>

        {/* Visualizador 3D */}
        <CompoundModelViewer
          compoundName="Água (H₂O)"
          modelPath="assets/models/h2o.glb"
          size="medium"
        />

        <Text style={{ marginTop: 12, lineHeight: 24 }}>
          A molécula é polar, permitindo que funcione como solvente universal...
        </Text>

        <CompoundModelViewer
          compoundName="Água Estrutura Eletrônica"
          modelPath="assets/models/h2o_orbitals.glb"
          size="small"
        />
      </View>
    </ScrollView>
  );
}
```

---

## ✅ Próximos Passos

1. **Preparar Modelos 3D**

   - Exportar modelos dos compostos em GLB
   - Colocar em `assets/models/`

2. **Testar Componentes**

   - Executar `npm run ios` ou `expo start`
   - Testar ViroARViewer em dispositivo real

3. **Implementar em Capítulos**

   - Adicionar CompoundModelViewer em cada chapter
   - Ajustar tamanhos e posições

4. **Melhorias Avançadas**
   - Adicionar animações
   - Implementar gestos interativos
   - Adicionar efeitos de partículas

---

## 🔗 Recursos Úteis

- [Documentação React Viro](https://docs.viromedia.com/docs/introduction-viro)
- [Exemplos de Código](https://github.com/viromedia/viro)
- [Formatos 3D Suportados](https://docs.viromedia.com/docs/3d-object)
- [APIs de Iluminação](https://docs.viromedia.com/docs/3d-lighting)

---

**Status**: ✅ Pronto para implementação nos capítulos!
