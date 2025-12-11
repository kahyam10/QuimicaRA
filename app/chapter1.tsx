import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo1, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';
import { CompoundARView } from '@/components/CompoundARView';
import { Play } from 'lucide-react-native';

const { height } = Dimensions.get('window');

// Carregar o modelo GLB
const objectModel = require('../assets/models/exemplo.glb');

export default function Chapter1Screen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(
    capitulo1.moleculas[0]
  );
  const [showAR, setShowAR] = useState(false);

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  // Se AR está visível, mostrar apenas o viewer AR
  if (showAR) {
    return (
      <CompoundARView
        objectModel={objectModel}
        onClose={() => setShowAR(false)}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ChapterHeader
          chapterNumber={capitulo1.numero}
          title={capitulo1.titulo}
        />

        {/* Visualizador 3D / Botão AR */}
        <View style={styles.viewerContainer}>
          <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />
          <TouchableOpacity
            style={styles.arButton}
            onPress={() => setShowAR(true)}
          >
            <Play color={Colors.white} size={24} />
            <Text style={styles.arButtonText}>VER EM AR</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo scrollável (descrição) */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            <MoleculaCard molecula={selectedMolecula} />
          </View>
        </ScrollView>

        {/* Carousel fixo na base */}
        <View style={styles.selectorSection}>
          <View style={styles.selectorContainer}>
            <MoleculaSelector
              moleculas={capitulo1.moleculas}
              selectedId={selectedMolecula?.id}
              onSelectMolecula={handleSelectMolecula}
            />
          </View>
        </View>
      </View>
    </>
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
    position: 'relative',
  },
  selectorSection: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  selectorContainer: {
    minHeight: 85,
  },
  arButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  arButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
