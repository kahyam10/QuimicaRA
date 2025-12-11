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
      <Text style={[styles.buttonNome, isSelected && styles.buttonNomeActive]}>
        {molecula.nome}
      </Text>
      <Text style={[styles.buttonFormula, isSelected && styles.buttonFormulaActive]}>
        {molecula.formula}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary, // Fundo azul
    flex: 1, // Ocupa 100% da largura disponível
  },

  content: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 0,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },

  button: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: '#D3D3D3', // Cinza claro (não selecionado)
    marginRight: 0,
    minWidth: 0,
    flex: 1, // Cada botão ocupa espaço igual
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

  buttonNome: {
    fontSize: 13,
    color: '#AAAAAA', // Cinza mais claro (não selecionado)
    marginBottom: 2,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
  },

  buttonNomeActive: {
    color: Colors.primary, // Azul (selecionado)
  },

  buttonFormula: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999999', // Cinza escuro (não selecionado)
    fontFamily: 'Inter-Bold',
  },

  buttonFormulaActive: {
    color: Colors.primary, // Azul (selecionado)
  },
});
