import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
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
            moleculas={capitulo3.moleculas}
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
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 130,
  },
  selectorContainer: {
    height: 100,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
