import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  Viro3DObject,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
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
 */
export function CompoundARView({ objectPath, onClose }: CompoundARViewProps) {
  const sceneRef = useRef<any>(null);

  const renderScene = () => (
    <ViroARScene ref={sceneRef} onTrackingUpdated={(state: any) => {
      console.log('AR Tracking State:', state);
    }}>
      {/* Iluminação ambiente branca */}
      <ViroAmbientLight color="#ffffff" intensity={1.2} />

      {/* Objeto 3D principal do composto */}
      <Viro3DObject
        source={{ uri: objectPath }}
        type="GLB"
        position={[0, -0.5, 0]}
        scale={[0.001, 0.001, 0.001]}
        rotation={[0, 0, 0]}
        onLoadStart={() => console.log('🔄 Carregando modelo 3D...')}
        onLoadEnd={() => console.log('✅ Modelo carregado com sucesso')}
        onError={(error: any) => {
          console.error('❌ Erro ao carregar modelo:', error);
        }}
      />
    </ViroARScene>
  );

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
