import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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

interface CompoundARViewProps {
  objectPath: string;
  onClose: () => void;
}

/**
 * Visualizador de Composto em AR
 * Renderiza diretamente sem Modal para compatibilidade com Viro
 * 
 * Implementação baseada em exemplo oficial Viro
 * Usa require() para carregamento correto de arquivos GLB
 */
export function CompoundARView({ objectPath, onClose }: CompoundARViewProps) {
  const renderScene = () => <HelloWorldSceneAR onClose={onClose} />;

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
 * Cena AR com implementação correta
 * Baseada no exemplo HelloWorldSceneAR oficial
 */
const HelloWorldSceneAR = ({ onClose }: { onClose: () => void }) => {
  const [text, setText] = useState("Inicializando AR...");
  
  // Usar require() para carregamento correto do arquivo GLB
  const objectModel = require('@/assets/models/exemplo.glb');

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
      {/* Iluminação ambiente branca */}
      <ViroAmbientLight color="#ffffff" />

      {/* Objeto 3D principal do composto */}
      <Viro3DObject
        source={objectModel}
        type="GLB"
        position={[0, -0.5, 0]}
        scale={[0.001, 0.001, 0.001]}
        onLoadStart={() => console.log('🔄 Carregando modelo 3D...')}
        onLoadEnd={() => console.log('✅ Modelo carregado com sucesso')}
        onError={(error: any) => {
          console.error('❌ Erro ao carregar modelo:', error);
        }}
      />
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
