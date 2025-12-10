import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

interface ModelViewerProps {
  modelType?: string;
  zoomLevel?: number;
}

export function ModelViewer({ modelType, zoomLevel }: ModelViewerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
});
