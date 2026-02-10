import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, LogBox, PanResponder, GestureResponderEvent, Platform } from 'react-native';
import {
  ViroARScene,
  ViroAmbientLight,
  Viro3DObject,
  ViroNode,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroTrackingReason,
} from '@reactvision/react-viro';
import { X, ZoomIn, ZoomOut, RefreshCw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// Detectar se é dispositivo Xiaomi/MIUI
const isXiaomiDevice = Platform.OS === 'android' && 
  (Platform.constants?.Brand?.toLowerCase().includes('xiaomi') || 
   Platform.constants?.Manufacturer?.toLowerCase().includes('xiaomi') ||
   Platform.constants?.Model?.toLowerCase().includes('redmi'));

// Suprimir logs desnecessários do Viro
LogBox.ignoreLogs([
  'ErrorTracker initialized',
  'ViroCore:',
]);

interface CompoundARViewProps {
  objectModel: any;
  onClose: () => void;
  /** Label exibido no topo da tela AR (ex: "Ozônio — Modelo 1") */
  modelLabel?: string;
}

/**
 * Visualizador de Composto em AR com gestos + botões de fallback
 *
 * 3 camadas de controle para máxima compatibilidade:
 *
 * 1️⃣ Gestos customizados via PanResponder (funciona em TODOS dispositivos incluindo Xiaomi):
 *    - Detecta 2 dedos e calcula distância/ângulo manualmente
 *    - Captura eventos ANTES da MIUI interceptar
 *
 * 2️⃣ Gestos nativos Viro (funciona em Samsung e maioria dos dispositivos):
 *    - onRotate, onPinch, onDrag do Viro
 *
 * 3️⃣ Botões de UI (funciona em TODOS dispositivos):
 *    - Controles visuais como fallback final
 */
export function CompoundARView({ objectModel, onClose, modelLabel }: CompoundARViewProps) {
  // Estado compartilhado entre botões de UI e a cena AR
  const [scaleVal, setScaleVal] = useState(1.1);
  const [rotationY, setRotationY] = useState(-65);
  const [rotationX, setRotationX] = useState(0);
  const [position, setPosition] = useState<[number, number, number]>([0, -0.5, -1]);

  // Refs para detector de gestos customizado (MIUI-compatible)
  const initialDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1.1);

  /**
   * Calcula distância euclidiana entre dois pontos de toque
   */
  const getTouchDistance = (touches: any[]) => {
    const [touch1, touch2] = touches;
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * PanResponder customizado — pinça para zoom (funciona em todos dispositivos)
   */
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt) => {
      const touches = evt.nativeEvent.touches;

      if (touches.length === 2) {
        // Início de gesto com 2 dedos - pinça para zoom
        initialDistanceRef.current = getTouchDistance(touches);
        initialScaleRef.current = scaleVal;
      }
    },

    onPanResponderMove: (evt) => {
      const touches = evt.nativeEvent.touches;

      if (touches.length === 2 && initialDistanceRef.current) {
        // Gesto com 2 dedos ativo — calcular pinça (zoom)
        const currentDistance = getTouchDistance(touches);
        const scaleFactor = currentDistance / initialDistanceRef.current;
        const newScale = Math.max(0.1, Math.min(5.0, initialScaleRef.current * scaleFactor));
        setScaleVal(newScale);
      }
    },

    onPanResponderRelease: () => {
      // Limpar refs ao soltar os dedos
      initialDistanceRef.current = null;
    },
  }), [scaleVal]);

  const handleZoomIn = useCallback(() => {
    setScaleVal(prev => Math.min(5.0, prev * 1.25));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScaleVal(prev => Math.max(0.1, prev * 0.8));
  }, []);

  const handleReset = useCallback(() => {
    setScaleVal(1.1);
    setRotationY(-65);
    setRotationX(0);
    setPosition([0, -0.5, -1]);
  }, []);

  const handleRotateLeft = useCallback(() => {
    setRotationY(prev => prev - 15);
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotationY(prev => prev + 15);
  }, []);

  const handleRotateUp = useCallback(() => {
    setRotationX(prev => Math.max(-90, prev - 15));
  }, []);

  const handleRotateDown = useCallback(() => {
    setRotationX(prev => Math.min(90, prev + 15));
  }, []);

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{ scene: InteractiveARScene }}
        viroAppProps={{
          objectModel,
          externalScale: scaleVal,
          externalRotationY: rotationY,
          externalRotationX: rotationX,
          externalPosition: position,
          setExternalScale: setScaleVal,
          setExternalRotationY: setRotationY,
          setExternalRotationX: setRotationX,
          setExternalPosition: setPosition,
        }}
        style={styles.navigator}
      />
      
      {/* Camada de detecção de gestos customizados sobre o AR */}
      <View
        style={StyleSheet.absoluteFill}
        {...panResponder.panHandlers}
        pointerEvents="box-none"
      />

      {/* Botão flutuante para fechar */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X color={Colors.white} size={28} />
      </TouchableOpacity>

      {/* Label do modelo (quando fornecido) */}
      {modelLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{modelLabel}</Text>
        </View>
      )}

      {/* Botões de rotação direcional - apenas para Xiaomi */}
      {isXiaomiDevice && (
        <View style={styles.rotationControlsContainer}>
          <View style={styles.rotationRow}>
            <TouchableOpacity style={styles.rotationButton} onPress={handleRotateUp}>
              <ChevronUp color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.rotationRow}>
            <TouchableOpacity style={styles.rotationButton} onPress={handleRotateLeft}>
              <ChevronLeft color={Colors.white} size={24} />
            </TouchableOpacity>
            <View style={styles.rotationSpacer} />
            <TouchableOpacity style={styles.rotationButton} onPress={handleRotateRight}>
              <ChevronRight color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.rotationRow}>
            <TouchableOpacity style={styles.rotationButton} onPress={handleRotateDown}>
              <ChevronDown color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Controles de zoom e reset */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
          <ZoomOut color={Colors.white} size={22} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButtonReset} onPress={handleReset}>
          <RefreshCw color={Colors.white} size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <ZoomIn color={Colors.white} size={22} />
        </TouchableOpacity>
      </View>

      {/* Instruções de gestos */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Use 2 dedos para zoom (pinça)
        </Text>
      </View>
    </View>
  );
}

/**
 * Cena AR Interativa — abordagem híbrida
 *
 * Os gestos nativos Viro (onRotate, onPinch, onDrag) são mantidos para
 * dispositivos que os suportam (Samsung, Pixel, etc).
 *
 * Simultaneamente, a cena recebe valores de escala e rotação do componente
 * pai via viroAppProps, que são alterados pelos botões de UI. Ambas as
 * fontes de entrada são combinadas para o resultado final.
 */
function InteractiveARScene(props?: any) {
  const appProps =
    props?.sceneNavigator?.viroAppProps ||
    props?.arSceneNavigator?.viroAppProps;

  const objectModel = appProps?.objectModel;
  const externalScale: number = appProps?.externalScale ?? 1.1;
  const externalRotationY: number = appProps?.externalRotationY ?? -65;
  const externalRotationX: number = appProps?.externalRotationX ?? 0;
  const externalPosition: [number, number, number] = appProps?.externalPosition ?? [0, -0.5, -1];
  const setExternalScale: ((fn: (prev: number) => number) => void) | undefined = appProps?.setExternalScale;
  const setExternalRotationY: ((fn: (prev: number) => number) => void) | undefined = appProps?.setExternalRotationY;
  const setExternalRotationX: ((fn: (prev: number) => number) => void) | undefined = appProps?.setExternalRotationX;
  const setExternalPosition: ((pos: [number, number, number]) => void) | undefined = appProps?.setExternalPosition;

  // Offset de gestos nativos Viro (delta adicional)
  const [gestureRotationDelta, setGestureRotationDelta] = useState(0);
  const [gestureScaleMultiplier, setGestureScaleMultiplier] = useState(1);
  const [statusText, setStatusText] = useState('Inicializando RA...');

  // Refs para calcular deltas incrementais dos gestos nativos
  const lastRotationRef = useRef(0);
  const lastPinchRef = useRef(1);

  // Valores finais combinados (botões + gestos nativos)
  const finalScale = Math.max(0.1, Math.min(5.0, externalScale * gestureScaleMultiplier));
  const finalRotationY = externalRotationY + gestureRotationDelta;

  /** Callback de tracking do AR */
  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setStatusText('');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setStatusText('RA Indisponível');
    }
  };

  /**
   * Gesto de rotação com dois dedos (Viro nativo)
   * Funciona em Samsung etc. Em Xiaomi pode não disparar — por isso
   * existem os botões de fallback.
   */
  const handleRotate = (rotateState: number, rotationFactor: number, source: any) => {
    if (rotateState === 1) {
      // Início do gesto
      lastRotationRef.current = 0;
    }

    const delta = rotationFactor - lastRotationRef.current;
    setGestureRotationDelta(prev => prev - delta);
    lastRotationRef.current = rotationFactor;

    if (rotateState === 3) {
      // Fim do gesto — consolidar o delta nos controles externos
      if (setExternalRotationY) {
        const totalDelta = gestureRotationDelta;
        setExternalRotationY((prev: number) => prev + totalDelta);
        setGestureRotationDelta(0);
      }
      lastRotationRef.current = 0;
    }
  };

  /**
   * Gesto de pinça com dois dedos (Viro nativo)
   * Funciona em Samsung etc. Em Xiaomi pode não disparar.
   */
  const handlePinch = (pinchState: number, scaleFactor: number, source: any) => {
    if (pinchState === 1) {
      // Início do gesto
      lastPinchRef.current = 1;
    }

    const ratio = scaleFactor / lastPinchRef.current;
    setGestureScaleMultiplier(prev => Math.max(0.1, Math.min(5.0, prev * ratio)));
    lastPinchRef.current = scaleFactor;

    if (pinchState === 3) {
      // Fim do gesto — consolidar o multiplicador nos controles externos
      if (setExternalScale) {
        const totalMultiplier = gestureScaleMultiplier;
        setExternalScale((prev: number) => Math.max(0.1, Math.min(5.0, prev * totalMultiplier)));
        setGestureScaleMultiplier(1);
      }
      lastPinchRef.current = 1;
    }
  };

  /**
   * Gesto de arrastar com um dedo (Viro nativo)
   * Funciona em todos os dispositivos.
   */
  const handleDrag = (dragToPos: [number, number, number], source: any) => {
    if (setExternalPosition) {
      setExternalPosition(dragToPos);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Iluminação ambiente */}
      <ViroAmbientLight color="#ffffff" intensity={200} />

      {/* ViroNode wrapper — rotação X e Y */}
      <ViroNode
        position={externalPosition}
        scale={[finalScale, finalScale, finalScale]}
        rotation={[externalRotationX, finalRotationY, 0]}
        onRotate={!isXiaomiDevice ? handleRotate : undefined}
        onPinch={!isXiaomiDevice ? handlePinch : undefined}
        onDrag={!isXiaomiDevice ? handleDrag : undefined}
        dragType={!isXiaomiDevice ? "FixedDistance" : undefined}
      >
        <Viro3DObject
          source={objectModel}
          type="GLB"
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          onLoadStart={() => console.log('🔄 Carregando modelo 3D...')}
          onLoadEnd={() => console.log('✅ Modelo carregado com sucesso')}
          onError={(error: any) => console.error('❌ Erro ao carregar modelo:', error)}
        />
      </ViroNode>
    </ViroARScene>
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
  labelContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 100,
  },
  labelText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  rotationControlsContainer: {
    position: 'absolute',
    top: 140,
    right: 20,
    zIndex: 100,
  },
  rotationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  rotationButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 4,
  },
  rotationSpacer: {
    width: 48,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  controlButtonReset: {
    backgroundColor: 'rgba(200, 60, 60, 0.7)',
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 100,
  },
  instructionText: {
    color: Colors.white,
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
});
