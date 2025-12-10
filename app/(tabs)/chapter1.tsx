import { StyleSheet, View, Dimensions, Text, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo1, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';
import { CompoundModelViewer } from '@/components/CompoundModelViewer';

const { height } = Dimensions.get('window');

export default function Chapter1Screen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo1.moleculas[0]);

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber={capitulo1.numero} title={capitulo1.titulo} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.viewerContainer}>
          <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />
        </View>

        <View style={styles.selectorSection}>
          <Text style={styles.selectorLabel}>Selecione uma Molécula</Text>
          <View style={styles.selectorContainer}>
            <MoleculaSelector
              moleculas={capitulo1.moleculas}
              selectedId={selectedMolecula?.id}
              onSelectMolecula={handleSelectMolecula}
            />
          </View>
        </View>

        {/* Visualizador 3D em AR */}
        <View style={styles.arViewerSection}>
          <Text style={styles.arViewerLabel}>Explorar em Realidade Aumentada</Text>
          <CompoundModelViewer
            compoundName={selectedMolecula.nome}
            modelPath="assets/models/exemplo.glb"
            size="medium"
            buttonText="🔍 VER EM AR"
          />
        </View>

        <View style={styles.infoContainer}>
          <MoleculaCard molecula={selectedMolecula} />
        </View>
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
    flex: 1,
    flexDirection: 'column',
  },
  viewerContainer: {
    height: height * 0.25,
    backgroundColor: Colors.darkBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  selectorSection: {
    backgroundColor: '#282828',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary || '#2196F3',
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary || '#2196F3',
    marginBottom: 12,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
  },
  selectorContainer: {
    height: 110,
  },
  arViewerSection: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  arViewerLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
