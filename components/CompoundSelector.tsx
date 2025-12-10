import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

interface Compound {
  id: string;
  name: string;
  fullName: string;
}

interface CompoundSelectorProps {
  compounds: Compound[];
  selectedCompound: Compound;
  onSelectCompound: (compound: Compound) => void;
}

export function CompoundSelector({ 
  compounds, 
  selectedCompound, 
  onSelectCompound 
}: CompoundSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compostos Químicos</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {compounds.map((compound) => (
          <TouchableOpacity
            key={compound.id}
            style={[
              styles.compoundButton,
              selectedCompound.id === compound.id && styles.selectedCompound
            ]}
            onPress={() => onSelectCompound(compound)}
          >
            <Text 
              style={[
                styles.compoundName,
                selectedCompound.id === compound.id && styles.selectedCompoundText
              ]}
            >
              {compound.name}
            </Text>
            <Text 
              style={[
                styles.compoundFullName,
                selectedCompound.id === compound.id && styles.selectedCompoundText
              ]}
            >
              {compound.fullName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  compoundButton: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedCompound: {
    backgroundColor: Colors.primary,
  },
  compoundName: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 4,
  },
  compoundFullName: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text,
  },
  selectedCompoundText: {
    color: Colors.white,
  },
});