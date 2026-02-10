import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ViroARViewer } from './ViroARViewer';

interface CompoundModelViewerProps {
  /**
   * Nome do composto químico
   * Exemplo: "Água (H₂O)", "Dióxido de Carbono (CO₂)"
   */
  compoundName: string;

  /**
   * Caminho do arquivo GLB/GLTF do modelo 3D
   * Exemplo: "assets/models/water.glb", "https://example.com/models/co2.glb"
   */
  modelPath: string;

  /**
   * Tamanho do botão (opcional)
   * "small" | "medium" | "large"
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Texto customizado do botão (opcional)
   * @default "VER EM RA"
   */
  buttonText?: string;
}

/**
 * Componente CompoundModelViewer
 * 
 * Renderiza um botão "PLAY" que abre a visualização 3D em AR do composto químico.
 * O botão fica centralizado e permite que o usuário veja o composto em tempo real.
 * 
 * Uso:
 * ```tsx
 * <CompoundModelViewer
 *   compoundName="Água (H₂O)"
 *   modelPath="assets/models/h2o.glb"
 *   size="medium"
 * />
 * ```
 */
export function CompoundModelViewer({
  compoundName,
  modelPath,
  size = 'medium',
  buttonText = 'VER EM RA',
}: CompoundModelViewerProps) {
  const [arVisible, setArVisible] = useState(false);

  return (
    <>
      {/* Frame com botão PLAY centralizado */}
      <View style={[styles.frame, styles[`frame_${size}`]]}>
        <View style={styles.frameContent}>
          <TouchableOpacity
            style={[styles.playButton, styles[`playButton_${size}`]]}
            onPress={() => setArVisible(true)}
            activeOpacity={0.85}
          >
            <Play
              color={Colors.text}
              size={size === 'small' ? 28 : size === 'large' ? 48 : 40}
              fill={Colors.primary}
            />
          </TouchableOpacity>

          <Text style={[styles.buttonLabel, styles[`buttonLabel_${size}`]]}>
            {buttonText}
          </Text>
        </View>
      </View>

      {/* Modal de visualização AR */}
      <ViroARViewer
        visible={arVisible}
        objectPath={modelPath}
        compoundName={compoundName}
        onClose={() => setArVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  /**
   * Frame Container
   */
  frame: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 12,
  },

  frame_small: {
    height: 120,
  },

  frame_medium: {
    height: 180,
  },

  frame_large: {
    height: 240,
  },

  frameContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${Colors.background}99`, // Fundo semi-transparente
  },

  /**
   * Play Button
   */
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: `${Colors.primary}20`, // Fundo semi-transparente do primary
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 12,
  },

  playButton_small: {
    width: 56,
    height: 56,
  },

  playButton_medium: {
    width: 80,
    height: 80,
  },

  playButton_large: {
    width: 100,
    height: 100,
  },

  /**
   * Button Label
   */
  buttonLabel: {
    color: Colors.text,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  buttonLabel_small: {
    fontSize: 11,
  },

  buttonLabel_medium: {
    fontSize: 13,
  },

  buttonLabel_large: {
    fontSize: 15,
  },
});
