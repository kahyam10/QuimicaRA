import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo3b, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';
import { CompoundARView } from '@/components/CompoundARView';
import { Play } from 'lucide-react-native';
import { cap3FullImage } from '@/constants/Images';

const { height } = Dimensions.get('window');

// ===== Carregar modelos GLB da Camada de Ozônio =====
interface ModelEntry { primary: any; /* variant?: any; */ }
const modelRegistry: Record<string, ModelEntry> = {};

// O₃ - Ozônio (com variante)
try {
  const primary = require('../assets/models/ozonio.glb');
  // let variant = null;
  // try { variant = require('../assets/models/ozonio2.glb'); } catch(e) {}
  modelRegistry['o3'] = { primary };
} catch(e) { console.error('❌ Erro ao carregar modelo O₃'); }

// CFC-11 - Clorofluorcarbonos
try { modelRegistry['cfc11'] = { primary: require('../assets/models/clorofluorcarbono.glb') }; } catch(e) { console.error('❌ Erro ao carregar modelo CFC-11'); }

export default function Chapter3bScreen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo3b.moleculas[0]);
  const [showAR, setShowAR] = useState(false);
  // const [arModelVersion, setArModelVersion] = useState<'primary' | 'variant'>('primary');

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  const currentModels = modelRegistry[selectedMolecula?.id];
  // const hasVariant = !!currentModels?.variant;

  const openAR = () => {
    // setArModelVersion(version); // Modelo 2 desabilitado
    setShowAR(true);
  };

  // Se AR está visível
  if (showAR) {
    const model = currentModels?.primary;
    // const model = arModelVersion === 'variant' && currentModels?.variant
    //   ? currentModels.variant
    //   : currentModels?.primary;

    if (!model) {
      return (
        <View style={styles.container}>
          <ChapterHeader chapterNumber={capitulo3b.numero} title={capitulo3b.titulo} />
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

    const versionLabel = selectedMolecula.nome;
    // const versionLabel = hasVariant
    //   ? `${selectedMolecula.nome} — ${arModelVersion === 'primary' ? 'Modelo 1' : 'Modelo 2'}`
    //   : selectedMolecula.nome;

    return (
      <CompoundARView
        objectModel={model}
        onClose={() => setShowAR(false)}
        modelLabel={versionLabel}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber={capitulo3b.numero} title={capitulo3b.titulo} />

      {/* Visualizador 3D / Botões AR */}
      <ImageBackground
        source={cap3FullImage}
        style={styles.viewerContainer}
        imageStyle={styles.viewerBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.viewerOverlay} />
        <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />

        {/* Botão AR único (Modelo 2 desabilitado) */}
        {/* {hasVariant ? (
          <View style={styles.arButtonsRow}>
            <TouchableOpacity style={styles.arButtonSmall} onPress={() => openAR('primary')}>
              <Play color={Colors.white} size={18} />
              <Text style={styles.arButtonSmallText}>MODELO 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.arButtonSmall, styles.arButtonVariant]} onPress={() => openAR('variant')}>
              <Play color={Colors.white} size={18} />
              <Text style={styles.arButtonSmallText}>MODELO 2</Text>
            </TouchableOpacity>
          </View>
        ) : ( */}
          <TouchableOpacity style={styles.arButton} onPress={() => openAR()}>
            <Play color={Colors.white} size={24} />
            <Text style={styles.arButtonText}>VER EM RA</Text>
          </TouchableOpacity>
        {/* )} */}
      </ImageBackground>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <MoleculaCard molecula={selectedMolecula} />
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.selectorSection}>
        <View style={styles.selectorContainer}>
          <MoleculaSelector
            moleculas={capitulo3b.moleculas}
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
  arButtonsRow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  arButtonSmall: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  arButtonVariant: {
    backgroundColor: Colors.accent,
  },
  arButtonSmallText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
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
