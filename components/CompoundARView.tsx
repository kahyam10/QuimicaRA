import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, LogBox, PanResponder, GestureResponderEvent } from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  Viro3DObject,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingReason,
} from '@reactvision/react-viro';
import { X } from 'lucide-react-native';
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
 * Carrega o modelo GL B passado como prop
 */
export function CompoundARView({ objectModel, onClose }: CompoundARViewProps) {
  const renderScene = () => <HelloWorldSceneAR onClose={onClose} objectModel={objectModel} />;

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{ scene: renderScene }}
        style={styles.navigator}
      />
      
      {/* Botão flutuante para fechar */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X color={Colors.white} size={28} />
      </TouchableOpacity>
    </View>
  );
}

/**
 * Cena AR com controles de gesto
 * Suporta: Pinch para zoom, Two-finger rotate para girar
 */
const HelloWorldSceneAR = ({ onClose, objectModel }: { onClose: () => void; objectModel: any }) => {
  const [text, setText] = useState("Inicializando AR...");
  const [scale, setScale] = useState([0.1, 0.1, 0.1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  
  const lastDistanceRef = useRef(0);
  const lastAngleRef = useRef(0);

  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    console.log("AR tracking state:", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("AR Pronto! Pinche para zoom, gire com 2 dedos");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("AR Indisponível");
    } else {
      setText("Inicializando AR...");
    }
  };

  // Detectar gestos de pinch (zoom) e rotação
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt: GestureResponderEvent) => {
        const touches = evt.nativeEvent.touches;
        
        // Se houver 2 dedos
        if (touches.length === 2) {
          const touch1 = touches[0];
          const touch2 = touches[1];
          
          // Calcular distância entre os dedos (para pinch zoom)
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Se foi inicializado, calcular mudança de escala
          if (lastDistanceRef.current > 0) {
            const scaleFactor = distance / lastDistanceRef.current;
            const newScale = Math.max(0.05, Math.min(0.5, scale[0] * scaleFactor));
            setScale([newScale, newScale, newScale]);
          }
          lastDistanceRef.current = distance;
          
          // Calcular ângulo entre os dedos (para rotação)
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          if (lastAngleRef.current !== 0) {
            const angleDiff = angle - lastAngleRef.current;
            setRotation([rotation[0], rotation[1] + angleDiff, rotation[2]]);
          }
          lastAngleRef.current = angle;
        } else {
          // Reset quando soltar
          lastDistanceRef.current = 0;
          lastAngleRef.current = 0;
        }
      },
      onPanResponderRelease: () => {
        lastDistanceRef.current = 0;
        lastAngleRef.current = 0;
      },
    })
  ).current;

  return (
    <View style={styles.sceneContainer} {...panResponder.panHandlers}>
      <ViroARScene onTrackingUpdated={onInitialized}>
        {/* Iluminação ambiente branca com intensidade aumentada */}
        <ViroAmbientLight color="#ffffff" intensity={2} />

        {/* Luz direcional adicional para melhor visualização */}
        <ViroAmbientLight color="#ffffff" intensity={1} />

        {/* Objeto 3D principal do composto */}
        <Viro3DObject
          source={objectModel}
          type="GLB"
          position={[0, -0.5, -1]}
          scale={scale as [number, number, number]}
          rotation={rotation as [number, number, number]}
          onLoadStart={() => console.log('🔄 Carregando modelo 3D...')}
          onLoadEnd={() => console.log('✅ Modelo carregado com sucesso')}
          onError={(error: any) => {
            console.error('❌ Erro ao carregar modelo:', error);
          }}
        />
      </ViroARScene>
    </View>
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
});
