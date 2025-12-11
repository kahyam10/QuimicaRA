import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { memo, useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { Molecula } from '@/constants/ChapterContent';

interface MoleculaSelectorProps {
  moleculas: Molecula[];
  onSelectMolecula: (molecula: Molecula) => void;
  selectedId?: string;
}

export const MoleculaSelector = memo(function MoleculaSelector({
  moleculas,
  onSelectMolecula,
  selectedId,
}: MoleculaSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {moleculas.map((molecula) => (
        <MoleculaButton
          key={molecula.id}
          molecula={molecula}
          isSelected={selectedId === molecula.id}
          onPress={() => onSelectMolecula(molecula)}
        />
      ))}
    </ScrollView>
  );
});

interface MoleculaButtonProps {
  molecula: Molecula;
  isSelected: boolean;
  onPress: () => void;
}

const MoleculaButton = memo(function MoleculaButton({
  molecula,
  isSelected,
  onPress,
}: MoleculaButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.buttonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonFormula, isSelected && styles.buttonFormulaActive]}>
        {molecula.formula}
      </Text>
      <Text style={[styles.buttonNome, isSelected && styles.buttonNomeActive]}>
        {molecula.nome}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary, // Fundo azul
    flexGrow: 0,
  },

  content: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: '#D3D3D3', // Cinza claro (não selecionado)
    marginRight: 0,
    minWidth: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  buttonActive: {
    borderColor: 'transparent',
    backgroundColor: Colors.white, // Branco (selecionado)
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },

  buttonFormula: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999999', // Cinza escuro (não selecionado)
    fontFamily: 'Inter-Bold',
  },

  buttonFormulaActive: {
    color: Colors.primary, // Azul (selecionado)
  },

  buttonNome: {
    fontSize: 12,
    color: '#AAAAAA', // Cinza mais claro (não selecionado)
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },

  buttonNomeActive: {
    color: Colors.primary, // Azul (selecionado)
  },
});
