import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from 'expo-camera';
import { X, ScanLine, CircleAlert } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface QRScannerModalProps {
  /** Controla a exibição do modal/câmera. */
  visible: boolean;
  /** Nome do elemento esperado (ex.: "Dióxido de Carbono"). */
  expectedName: string;
  /** Textos alternativos também aceitos como QR válido (ex.: variações de grafia). */
  acceptedAliases?: string[];
  /** Chamado quando o QR code lido corresponde ao elemento. */
  onSuccess: () => void;
  /** Chamado quando o usuário fecha a câmera sem ler o QR correto. */
  onClose: () => void;
}

/**
 * Normaliza um texto para comparação: remove BOM, minúsculas, sem acentos e sem espaços extras.
 */
function normalize(value: string): string {
  return value
    .replace(/^\ufeff/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export function QRScannerModal({
  visible,
  expectedName,
  acceptedAliases,
  onSuccess,
  onClose,
}: QRScannerModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Trava para evitar múltiplos disparos do mesmo frame de leitura.
  const lockedRef = useRef(false);

  // Reinicia o estado sempre que a câmera é aberta.
  useEffect(() => {
    if (visible) {
      lockedRef.current = false;
      setErrorMessage(null);
    }
  }, [visible]);

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (lockedRef.current) return;
    lockedRef.current = true;

    const scanned = normalize(result.data ?? '');
    const accepted = [expectedName, ...(acceptedAliases ?? [])].map(normalize);

    if (accepted.includes(scanned)) {
      // Vibração curta de confirmação.
      Vibration.vibrate(120);
      onSuccess();
      return;
    }

    // QR code de outro elemento: avisa e mantém a câmera aberta para nova tentativa.
    // Padrão de vibração de erro (duas vibrações curtas).
    Vibration.vibrate([0, 80, 80, 80]);
    setErrorMessage(
      `Este QR code não pertence a ${expectedName}. Aponte para o QR code correto.`
    );
    setTimeout(() => {
      lockedRef.current = false;
    }, 1500);
  };

  if (!visible) return null;

  // Permissão ainda sendo carregada.
  const renderContent = () => {
    if (!permission) {
      return (
        <View style={styles.centered}>
          <Text style={styles.infoText}>Verificando permissão da câmera...</Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.centered}>
          <CircleAlert color={Colors.white} size={48} />
          <Text style={styles.permissionTitle}>Câmera necessária</Text>
          <Text style={styles.infoText}>
            Para ler o QR code e exibir a Realidade Aumentada, o app precisa de
            acesso à câmera.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Permitir câmera</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <Text style={styles.title} numberOfLines={1}>
              Leia o QR code de {expectedName}
            </Text>
          </View>

          <View style={styles.frameWrapper}>
            <View style={styles.frame}>
              <ScanLine color={Colors.white} size={64} />
            </View>
            <Text style={styles.instruction}>
              Aponte a câmera para o QR code correspondente a {expectedName}.
            </Text>
          </View>

          <View style={styles.bottomBar}>
            {errorMessage ? (
              <View style={styles.errorBox}>
                <CircleAlert color={Colors.white} size={20} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : (
              <View style={styles.spacer} />
            )}
          </View>
        </View>
      </CameraView>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {renderContent()}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <X color={Colors.white} size={26} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  topBar: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  frameWrapper: {
    alignItems: 'center',
    gap: 20,
  },
  frame: {
    width: 240,
    height: 240,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  instruction: {
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
    opacity: 0.9,
  },
  bottomBar: {
    minHeight: 120,
    paddingHorizontal: 24,
    paddingBottom: 48,
    justifyContent: 'flex-end',
  },
  spacer: {
    height: 1,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.error,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  errorText: {
    flex: 1,
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
    backgroundColor: Colors.black,
  },
  permissionTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  infoText: {
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 8,
  },
  permissionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
