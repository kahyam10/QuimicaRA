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
let objectModel: any = null;
let modelLoadError: string | null = null;

try {
  objectModel = require('../assets/models/exemplo.glb');
  console.log('✅ Modelo GLB carregado com sucesso');
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  modelLoadError = `Erro ao carregar modelo GLB: ${errorMessage}`;
  console.error('❌ ' + modelLoadError);
}

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
    if (modelLoadError || !objectModel) {
      return (
        <View style={styles.container}>
          <ChapterHeader
            chapterNumber={capitulo1.numero}
            title={capitulo1.titulo}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.darkBackground,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
