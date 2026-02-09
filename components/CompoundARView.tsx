import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, LogBox } from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  Viro3DObject,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingReason,
  ViroText,
} from '@reactvision/react-viro';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// Suprimir logs desnecessários do Viro
LogBox.ignoreLogs([
  'ErrorTracker initialized',
  'ViroCore:',
]);

interface CompoundARViewProps {
  objectModel: any;
  onClose: () => void;
}

/**
 * Visualizador de Composto em AR
 * Renderiza diretamente sem Modal para compatibilidade com Viro
 * 
 * Implementação baseada em exemplo oficial Viro
 * Carrega o modelo GLB passado como prop
 */
export function CompoundARView({ objectModel, onClose }: CompoundARViewProps) {
  const [scale, setScale] = useState<[number, number, number]>([1.1, 1.1, 1.1]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, -65, 0]);

  const renderScene = () => (
    <HelloWorldSceneAR 
      onClose={onClose} 
      objectModel={objectModel}
      scale={scale}
      rotation={rotation}
    />
  );

  const handleZoomIn = () => {
    setScale(prev => {
      const newScale = Math.min(0.5, prev[0] * 1.2);
      return [newScale, newScale, newScale];
    });
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(0.05, prev[0] * 0.8);
      return [newScale, newScale, newScale];
    });
  };

  const handleRotate = () => {
    setRotation(prev => [prev[0], prev[1] + 30, prev[2]]);
  };

  const handleReset = () => {
    setScale([0.1, 0.1, 0.1]);
    setRotation([0, 0, 0]);
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{ scene: renderScene }}
        style={styles.navigator}
        key={`ar-scene-${scale[0]}-${rotation[1]}`}
        viroAppProps={{ scale, rotation, objectModel, onClose }}
      />
      
      {/* Botão flutuante para fechar */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X color={Colors.white} size={28} />
      </TouchableOpacity>

      {/* Controles na parte inferior */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
          <ZoomOut color={Colors.white} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <ZoomIn color={Colors.white} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleRotate}>
          <RotateCcw color={Colors.white} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <X color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Cena AR com controles por botões
 * Botões para aumentar/diminuir zoom e rotacionar
 */
const HelloWorldSceneAR = ({ 
  onClose, 
  objectModel,
  scale,
  rotation
}: { 
  onClose: () => void; 
  objectModel: any;
  scale: [number, number, number];
  rotation: [number, number, number];
}) => {
  const [text, setText] = useState("Inicializando AR...");

  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    console.log("AR tracking state:", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("AR Pronto!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("AR Indisponível");
    } else {
      setText("Inicializando AR...");
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Iluminação ambiente branca com intensidade aumentada */}
      <ViroAmbientLight color="#ffffff" intensity={200} />

      {/* Luz direcional adicional para melhor visualização */}
      {/* <ViroAmbientLight color="#ffffff" intensity={1} /> */}

      {/* Objeto 3D principal do composto */}
      <Viro3DObject
        source={objectModel}
        type="GLB"
        position={[0, -0.5, -1]}
        scale={scale}
        rotation={rotation}
        onLoadStart={() => console.log('🔄 Carregando modelo 3D...')}
        onLoadEnd={() => console.log('✅ Modelo carregado com sucesso')}
        onError={(error: any) => {
          console.error('❌ Erro ao carregar modelo:', error);
        }}
      />
           <ViroText
        text="Auto Plane"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 1, -2]}      />
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    position: 'relative',
  },
  navigator: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'rgba(200, 0, 0, 0.6)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
