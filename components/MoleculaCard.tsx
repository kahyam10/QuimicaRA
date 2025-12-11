import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Molecula } from '@/constants/ChapterContent';

interface MoleculaCardProps {
  molecula: Molecula;
}

export const MoleculaCard = memo(function MoleculaCard({ molecula }: MoleculaCardProps) {
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);

  const properties = [
    { label: "Fórmula Molecular", value: molecula.formula },
    { label: "Geometria Molecular", value: molecula.geometria },
    { label: "Polaridade", value: molecula.polaridade },
    { label: "Ângulos de Ligação", value: molecula.anguloLigacao },
  ];

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

        {/* Informações Gerais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Gerais</Text>
          <Text style={styles.informacoes}>{molecula.informacoes}</Text>
        </View>

        {/* Propriedades Moleculares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propriedades Moleculares</Text>
          
          {properties.map((property, index) => (
            <PropertyCard
              key={index}
              label={property.label}
              value={property.value}
              isExpanded={expandedProperty === property.label}
              onPress={() => setExpandedProperty(
                expandedProperty === property.label ? null : property.label
              )}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
});

interface PropertyCardProps {
  label: string;
  value: string;
  isExpanded: boolean;
  onPress: () => void;
}

const PropertyCard = memo(function PropertyCard({ 
  label, 
  value, 
  isExpanded, 
  onPress 
}: PropertyCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.propertyCard, isExpanded && styles.propertyCardExpanded]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.propertyHeader}>
        <Text style={styles.propertyLabel}>{label}</Text>
        <ChevronDown 
          size={20} 
          color={Colors.primary}
          style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
        />
      </View>
      
      {isExpanded && (
        <View style={styles.propertyContent}>
          <Text style={styles.propertyValue}>{value}</Text>
        </View>
      )}
    </TouchableOpacity>
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

  propertyCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  propertyCardExpanded: {
    borderColor: Colors.primary,
    backgroundColor: '#E3F2FD',
  },

  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  propertyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontFamily: 'Inter-Bold',
    flex: 1,
  },

  propertyContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  propertyValue: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },

  informacoes: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
  },
});
