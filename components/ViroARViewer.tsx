import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  Viro3DObject,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
} from '@reactvision/react-viro';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ViroARViewerProps {
  visible: boolean;
  objectPath: string;
  compoundName: string;
  onClose: () => void;
}

/**
 * Componente de Visualizador AR com Viro
 * 
 * Recursos do Viro implementados:
 * - ViroARScene: Cena de realidade aumentada
 * - ViroAmbientLight: Iluminação ambiente (sem sombras)
 * - Viro3DObject: Renderização de modelos 3D em formato GLB/GLTF
 * - ViroTrackingStateConstants: Estados de rastreamento AR
 * - ViroARSceneNavigator: Navegador de cenas com suporte a AR
 * 
 * Recursos adicionais do Viro para futura implementação:
 * - ViroImage: Detecção e renderização em imagens
 * - ViroOmniLight: Iluminação 3D com sombras realísticas
 * - ViroSpotLight: Iluminação direcional e focada
 * - ViroAnimations: Animações de objetos 3D (rotação, escala, posição)
 * - ViroParticleEmitter: Efeitos de partículas (fumaça, vapor, etc)
 * - ViroText: Texto 3D renderizado no espaço AR
 * - ViroPortal: Portais para navegar entre diferentes cenas AR
 * - ViroButton: Botões interativos selecionáveis em AR
 * - ViroQuad: Plano 2D em 3D (útil para exibir imagens)
 * - ViroBox/ViroSphere: Primitivos geométricos 3D
 */
export function ViroARViewer({
  visible,
  objectPath,
  compoundName,
  onClose,
}: ViroARViewerProps) {
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header com nome do composto e botão fechar */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{compoundName}</Text>
          <TouchableOpacity onPress={onClose} style={styles.headerCloseButton}>
            <X color={Colors.text} size={28} />
          </TouchableOpacity>
        </View>

        {/* Container da cena AR */}
        <View style={styles.arContainer}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingText}>Carregando modelo 3D...</Text>
            </View>
          )}

          <ARSceneComponent objectPath={objectPath} onClose={onClose} />
        </View>

        {/* Footer com instruções */}
        <View style={styles.footer}>
          <Text style={styles.instructionText}>
            💡 Mova seu dispositivo para explorar o composto em 3D
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

/**
 * Componente da Cena AR
 * Renderiza o objeto 3D com iluminação
 */
function ARSceneComponent({ objectPath, onClose }: { objectPath: string; onClose: () => void }) {
  const [trackingState, setTrackingState] = useState(ViroTrackingStateConstants.TRACKING_NORMAL);

  const onInitialized = (state: any, reason: any) => {
    console.log('AR Tracking:', state, 'Reason:', reason);
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Iluminação ambiente branca */}
      <ViroAmbientLight color="#ffffff" intensity={1.2} />

      {/* Objeto 3D principal do composto */}
      <Viro3DObject
        source={{ uri: objectPath }}
        type="GLB"
        position={[0, -0.5, 0]}
        scale={[0.001, 0.001, 0.001]}
        rotation={[0, 0, 0]}
        onLoadStart={() => console.log('Carregando modelo...')}
        onLoadEnd={() => console.log('Modelo carregado com sucesso')}
        onError={(error: any) => console.log('Erro ao carregar modelo:', error)}
      />

      {/* Botão flutuante para fechar a visualização AR */}
      <TouchableOpacity
        style={styles.arCloseButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <X color={Colors.text} size={20} />
      </TouchableOpacity>
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  header: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  headerCloseButton: {
    padding: 8,
    marginRight: -8,
  },
  arContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  arCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    padding: 10,
    zIndex: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  footer: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  instructionText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});
