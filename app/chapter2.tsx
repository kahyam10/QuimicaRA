import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useState, useCallback } from 'react';
import Colors from '@/constants/Colors';
import { capitulo2, Molecula } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';
import { MoleculaSelector } from '@/components/MoleculaSelector';
import { MoleculaCard } from '@/components/MoleculaCard';
import { ModelViewer } from '@/components/ModelViewer';
import { CompoundARView } from '@/components/CompoundARView';
import { Play } from 'lucide-react-native';
import { enxofreImage } from '@/constants/Images';

const { height } = Dimensions.get('window');

// Carregar o modelo GLB para AR
let objectModel: any = null;
let modelLoadError: string | null = null;

try {
  objectModel = require('../assets/models/argonio.glb');
  console.log('✅ Modelo GLB carregado com sucesso (Chapter 2)');
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  modelLoadError = `Erro ao carregar modelo GLB: ${errorMessage}`;
  console.error('❌ ' + modelLoadError);
}

export default function Chapter2Screen() {
  const [selectedMolecula, setSelectedMolecula] = useState<Molecula>(capitulo2.moleculas[0]);
  const [showAR, setShowAR] = useState(false);

  const handleSelectMolecula = useCallback((molecula: Molecula) => {
    setSelectedMolecula(molecula);
  }, []);

  // Se AR está visível, mostrar apenas o viewer AR
  if (showAR) {
    if (modelLoadError || !objectModel) {
      return (
        <View style={styles.container}>
          <ChapterHeader
            chapterNumber={capitulo2.numero}
            title={capitulo2.titulo}
          />
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Erro ao carregar modelo AR</Text>
            <Text style={styles.errorMessage}>
              {modelLoadError || 'Modelo GLB não disponível'}
            </Text>
            <TouchableOpacity 
              style={styles.errorButton}
              onPress={() => setShowAR(false)}
            >
              <Text style={styles.errorButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
    return (
      <CompoundARView
        objectModel={objectModel}
        onClose={() => setShowAR(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber={capitulo2.numero} title={capitulo2.titulo} />

      {/* Visualizador 3D / Botão AR com imagem de fundo */}
      <ImageBackground 
        source={enxofreImage} 
        style={styles.viewerContainer}
        imageStyle={styles.viewerBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.viewerOverlay} />
        <ModelViewer modelType={selectedMolecula?.id} zoomLevel={1} />
        <TouchableOpacity
          style={styles.arButton}
          onPress={() => setShowAR(true)}
        >
          <Play color={Colors.white} size={24} />
          <Text style={styles.arButtonText}>VER EM AR</Text>
        </TouchableOpacity>
      </ImageBackground>

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
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  viewerBackgroundImage: {
    resizeMode: 'contain',
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
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
