import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo2, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';

const { height } = Dimensions.get('window');

export default function Chapter2Screen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo2.moleculas[0]);

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber={capitulo2.numero} title={capitulo2.titulo} />

      <View style={styles.viewerContainer}>
        <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <MoleculaCard molecula={selectedMolecula} />
        </View>
      </ScrollView>

      <View style={styles.selectorSection}>
        <View style={styles.selectorContainer}>
          <MoleculaSelector
            moleculas={capitulo2.moleculas}
            selectedId={selectedMolecula?.id}
            onSelectMolecula={handleSelectMolecula}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    flexDirection: 'column',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    minHeight: 85,
  },
  selectorContainer: {
    minHeight: 85,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
