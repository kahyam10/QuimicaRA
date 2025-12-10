import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo3, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';

const { height } = Dimensions.get('window');

export default function Chapter3Screen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo3.moleculas[0]);

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber={capitulo3.numero} title={capitulo3.titulo} />

      <View style={styles.content}>
        <View style={styles.viewerContainer}>
          <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />
        </View>

        <View style={styles.selectorSection}>
          <Text style={styles.selectorLabel}>Selecione uma Molécula</Text>
          <View style={styles.selectorContainer}>
            <MoleculaSelector
              moleculas={capitulo3.moleculas}
              selectedId={selectedMolecula?.id}
              onSelectMolecula={handleSelectMolecula}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <MoleculaCard molecula={selectedMolecula} />
        </View>
      </View>
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
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectorSection: {
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 12,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
  },
  selectorContainer: {
    height: 110,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
});
