# 📝 Exemplo de Integração do Viro em Capítulos

Este arquivo mostra como integrar o visualizador 3D em cada capítulo de forma limpa e profissional.

---

## ✅ Implementação Básica

### Exemplo 1: Capítulo com Um Composto

```typescript
// app/(tabs)/chapter1.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { CompoundModelViewer } from '@/components/CompoundModelViewer';
import Colors from '@/constants/Colors';

export default function Chapter1() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Introdução */}
      <Text style={styles.title}>Água - H₂O</Text>

      <Text style={styles.description}>
        A água é um composto químico covalente formado por dois átomos de
        hidrogênio e um átomo de oxigênio. É a substância mais abundante do
        planeta Terra.
      </Text>

      {/* Visualizador 3D */}
      <CompoundModelViewer
        compoundName="Molécula de Água (H₂O)"
        modelPath="assets/models/h2o.glb"
        size="medium"
        buttonText="VER EM AR"
      />

      {/* Propriedades */}
      <Text style={styles.sectionTitle}>Propriedades</Text>

      <View style={styles.propertyCard}>
        <Text style={styles.propertyLabel}>Fórmula Molecular:</Text>
        <Text style={styles.propertyValue}>H₂O</Text>
      </View>

      <View style={styles.propertyCard}>
        <Text style={styles.propertyLabel}>Ponto de Fusão:</Text>
        <Text style={styles.propertyValue}>0°C</Text>
      </View>

      <View style={styles.propertyCard}>
        <Text style={styles.propertyLabel}>Ponto de Ebulição:</Text>
        <Text style={styles.propertyValue}>100°C</Text>
      </View>

      <Text style={styles.sectionTitle}>Ligação Covalente</Text>
      <Text style={styles.description}>
        A água apresenta ligações covalentes entre os átomos de hidrogênio e
        oxigênio, formando uma molécula altamente polar que funciona como
        solvente universal.
      </Text>

      {/* Estrutura Eletrônica */}
      <CompoundModelViewer
        compoundName="Estrutura Eletrônica - H₂O"
        modelPath="assets/models/h2o_orbitals.glb"
        size="small"
        buttonText="VER ORBITAIS"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  propertyCard: {
    backgroundColor: Colors.cardBackground,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  propertyLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  propertyValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '700',
    marginTop: 4,
  },
});
```

---

## ✅ Implementação com Múltiplos Compostos

### Exemplo 2: Capítulo com Vários Compostos

```typescript
// app/(tabs)/chapter2.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { CompoundModelViewer } from '@/components/CompoundModelViewer';
import Colors from '@/constants/Colors';

const COMPOUNDS = [
  {
    name: 'Dióxido de Carbono',
    formula: 'CO₂',
    path: 'assets/models/co2.glb',
    description:
      'Gás essencial para a fotossíntese. Forma-se pela oxidação de compostos carbônicos.',
  },
  {
    name: 'Monóxido de Carbono',
    formula: 'CO',
    path: 'assets/models/co.glb',
    description:
      'Gás incolor e inodoro, produto da combustão incompleta de combustíveis.',
  },
  {
    name: 'Ozônio',
    formula: 'O₃',
    path: 'assets/models/o3.glb',
    description:
      'Gás com aroma característico. Forma-se pela ação da luz ultravioleta.',
  },
];

export default function Chapter2() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Compostos de Carbono e Oxigênio</Text>

      <Text style={styles.description}>
        Explore as diferentes formas como carbono e oxigênio se combinam para
        formar compostos com propriedades únicas.
      </Text>

      {COMPOUNDS.map((compound, index) => (
        <CompoundSection key={index} compound={compound} />
      ))}
    </ScrollView>
  );
}

interface Compound {
  name: string;
  formula: string;
  path: string;
  description: string;
}

function CompoundSection({ compound }: { compound: Compound }) {
  return (
    <View style={styles.section}>
      <Text style={styles.compoundTitle}>{compound.name}</Text>
      <Text style={styles.formula}>Fórmula: {compound.formula}</Text>

      <Text style={styles.description}>{compound.description}</Text>

      <CompoundModelViewer
        compoundName={compound.name}
        modelPath={compound.path}
        size="medium"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  compoundTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  formula: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
});
```

---

## ✅ Implementação Avançada com Contexto

### Exemplo 3: Capítulo com Navegação de Compostos

```typescript
// app/(tabs)/chapter3.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { CompoundModelViewer } from '@/components/CompoundModelViewer';
import Colors from '@/constants/Colors';

interface ChemicalCompound {
  id: string;
  name: string;
  formula: string;
  modelPath: string;
  description: string;
  properties: {
    label: string;
    value: string;
  }[];
}

const NITROGEN_COMPOUNDS: ChemicalCompound[] = [
  {
    id: 'nh3',
    name: 'Amônia',
    formula: 'NH₃',
    modelPath: 'assets/models/nh3.glb',
    description:
      'Composto nitrogenado essencial para a síntese de aminoácidos.',
    properties: [
      { label: 'Ponto de ebulição', value: '-33°C' },
      { label: 'Solubilidade', value: 'Muito solúvel em água' },
      { label: 'pH em solução', value: 'Básico (alcalino)' },
    ],
  },
  {
    id: 'n2o',
    name: 'Óxido Nitroso',
    formula: 'N₂O',
    modelPath: 'assets/models/n2o.glb',
    description: 'Gás inerte com propriedades anestésicas e relaxantes.',
    properties: [
      { label: 'Ponto de ebulição', value: '-88°C' },
      { label: 'Estado', value: 'Gás incolor' },
      { label: 'Aroma', value: 'Levemente doce' },
    ],
  },
  {
    id: 'no2',
    name: 'Dióxido de Nitrogênio',
    formula: 'NO₂',
    modelPath: 'assets/models/no2.glb',
    description: 'Gás corrosivo e tóxico, importante poluente atmosférico.',
    properties: [
      { label: 'Cor', value: 'Marrom-avermelhada' },
      { label: 'Aroma', value: 'Pungente e irritante' },
      { label: 'Toxicidade', value: 'Tóxico em altas concentrações' },
    ],
  },
];

export default function Chapter3() {
  const [selectedCompound, setSelectedCompound] = useState(
    NITROGEN_COMPOUNDS[0]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Compostos de Nitrogênio</Text>

        {/* Seletor de Compostos */}
        <FlatList
          data={NITROGEN_COMPOUNDS}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.compoundButton,
                selectedCompound.id === item.id && styles.compoundButtonActive,
              ]}
              onPress={() => setSelectedCompound(item)}
            >
              <Text
                style={[
                  styles.compoundButtonText,
                  selectedCompound.id === item.id &&
                    styles.compoundButtonTextActive,
                ]}
              >
                {item.formula}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          scrollEnabled={false}
          contentContainerStyle={styles.compoundList}
        />

        {/* Detalhes do Composto Selecionado */}
        <Text style={styles.compoundName}>{selectedCompound.name}</Text>
        <Text style={styles.description}>{selectedCompound.description}</Text>

        {/* Visualizador 3D */}
        <CompoundModelViewer
          compoundName={selectedCompound.name}
          modelPath={selectedCompound.modelPath}
          size="large"
        />

        {/* Propriedades */}
        <Text style={styles.propertiesTitle}>Propriedades</Text>
        {selectedCompound.properties.map((prop, index) => (
          <View key={index} style={styles.propertyItem}>
            <Text style={styles.propertyLabel}>{prop.label}</Text>
            <Text style={styles.propertyValue}>{prop.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  compoundList: {
    marginBottom: 16,
    gap: 8,
  },
  compoundButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.surfaceBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  compoundButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  compoundButtonText: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  compoundButtonTextActive: {
    color: Colors.text,
  },
  compoundName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  propertiesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  propertyItem: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary,
    borderRadius: 6,
  },
  propertyLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  propertyValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '700',
    marginTop: 4,
  },
});
```

---

## 📋 Checklist de Implementação

- [ ] Criar pasta `assets/models/`
- [ ] Adicionar modelos GLB dos compostos
- [ ] Implementar exemplo 1 em chapter1.tsx
- [ ] Implementar exemplo 2 em chapter2.tsx
- [ ] Implementar exemplo 3 em chapter3.tsx
- [ ] Testar em dispositivo real com Expo
- [ ] Ajustar tamanhos e posições conforme necessário

---

**Pronto para implementar! 🚀**
