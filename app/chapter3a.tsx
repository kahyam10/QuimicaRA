import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo3a, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';
import { CompoundARView } from '@/components/CompoundARView';
import { Play } from 'lucide-react-native';
import { cap3FullImage } from '@/constants/Images';

const { height } = Dimensions.get('window');

// ===== Carregar modelos GLB do Efeito Estufa =====
interface ModelEntry { primary: any; variant?: any; }
const modelRegistry: Record<string, ModelEntry> = {};

// CO₂ - Dióxido de Carbono
try { modelRegistry['co2'] = { primary: require('../assets/models/dioxido_carbono.glb') }; } catch(e) { console.error('❌ Erro ao carregar modelo CO₂'); }

// CH₄ - Metano
try { modelRegistry['ch4'] = { primary: require('../assets/models/metano.glb') }; } catch(e) { console.error('❌ Erro ao carregar modelo CH₄'); }

// N₂O - Óxido Nitroso
try { modelRegistry['n2o'] = { primary: require('../assets/models/oxido_nitroso.glb') }; } catch(e) { console.error('❌ Erro ao carregar modelo N₂O'); }

// H₂O - Água
try { modelRegistry['h2o'] = { primary: require('../assets/models/agua.glb') }; } catch(e) { console.error('❌ Erro ao carregar modelo H₂O'); }

export default function Chapter3aScreen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo3a.moleculas[0]);
  const [showAR, setShowAR] = useState(false);

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  const currentModels = modelRegistry[selectedMolecula?.id];

  // Se AR está visível
  if (showAR) {
    const model = currentModels?.primary;

    if (!model) {
      return (
        <View style={styles.container}>
          <ChapterHeader chapterNumber={capitulo3a.numero} title={capitulo3a.titulo} />
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Erro ao carregar modelo RA</Text>
            <Text style={styles.errorMessage}>Modelo GLB não disponível para {selectedMolecula?.nome}</Text>
            <TouchableOpacity style={styles.errorButton} onPress={() => setShowAR(false)}>
              <Text style={styles.errorButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <CompoundARView
        objectModel={model}
        onClose={() => setShowAR(false)}
        modelLabel={selectedMolecula.nome}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber={capitulo3a.numero} title={capitulo3a.titulo} />

      {/* Visualizador 3D / Botão AR */}
      <ImageBackground
        source={cap3FullImage}
        style={styles.viewerContainer}
        imageStyle={styles.viewerBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.viewerOverlay} />
        <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />

        <TouchableOpacity style={styles.arButton} onPress={() => setShowAR(true)}>
          <Play color={Colors.white} size={24} />
          <Text style={styles.arButtonText}>VER EM RA</Text>
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <MoleculaCard molecula={selectedMolecula} />
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.selectorSection}>
        <View style={styles.selectorContainer}>
          <MoleculaSelector
            moleculas={capitulo3a.moleculas}
            selectedId={selectedMolecula?.id}
            onSelectMolecula={handleSelectMolecula}
          />
        </View>
      </SafeAreaView>
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
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  viewerBackgroundImage: {
    width: '100%',
  },
  viewerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  arButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
  arButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  errorButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
