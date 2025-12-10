import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { memo } from 'react';
import Colors from '@/constants/Colors';
import { Molecula } from '@/constants/ChapterContent';

interface MoleculaCardProps {
  molecula: Molecula;
}

export const MoleculaCard = memo(function MoleculaCard({ molecula }: MoleculaCardProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.nome}>{molecula.nome}</Text>
          <Text style={styles.formula}>{molecula.formula}</Text>
          {molecula.percentualAtmosfera && (
            <Text style={styles.percentual}>{molecula.percentualAtmosfera} da atmosfera</Text>
          )}
        </View>

        {/* Propriedades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propriedades Moleculares</Text>

          <PropertyRow label="Fórmula Molecular" value={molecula.formula} />
          <PropertyRow label="Geometria Molecular" value={molecula.geometria} />
          <PropertyRow label="Polaridade" value={molecula.polaridade} />
          <PropertyRow label="Ângulos de Ligação" value={molecula.anguloLigacao} />
        </View>

        {/* Informações Gerais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Gerais</Text>
          <Text style={styles.informacoes}>{molecula.informacoes}</Text>
        </View>
      </View>
    </ScrollView>
  );
});

interface PropertyRowProps {
  label: string;
  value: string;
}

const PropertyRow = memo(function PropertyRow({ label, value }: PropertyRowProps) {
  return (
    <View style={styles.propertyRow}>
      <Text style={styles.propertyLabel}>{label}:</Text>
      <Text style={styles.propertyValue}>{value}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },

  card: {
    flex: 1,
    padding: 20,
    paddingTop: 16,
  },

  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 16,
  },

  nome: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },

  formula: {
    fontSize: 20,
    color: Colors.primary,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    fontWeight: '600',
  },

  percentual: {
    fontSize: 14,
    color: Colors.secondary,
    fontFamily: 'Inter-Regular',
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  propertyRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },

  propertyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginRight: 8,
    minWidth: 180,
    fontFamily: 'Inter-Bold',
  },

  propertyValue: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    fontFamily: 'Inter-Regular',
  },

  informacoes: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
});
