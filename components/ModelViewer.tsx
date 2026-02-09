import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

interface ModelViewerProps {
  modelType?: string;
  zoomLevel?: number;
}

export function ModelViewer({ modelType, zoomLevel }: ModelViewerProps) {
  return (
    <View style={styles.container}>
      {/* Placeholder - será substituído pelo modelo 3D */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
