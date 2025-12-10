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
    backgroundColor: Colors.background,
  },

  content: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceBackground,
    marginRight: 8,
    minWidth: 110,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
  },

  buttonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.5,
    elevation: 6,
  },

  buttonFormula: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontFamily: 'Inter-Bold',
  },

  buttonFormulaActive: {
    color: Colors.text,
  },

  buttonNome: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },

  buttonNomeActive: {
    color: Colors.text,
  },
});
