import { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { backgroundImage } from '@/constants/Images';
import { Download } from 'lucide-react-native';

const { height } = Dimensions.get('window');

const livretoPdf = require('@/assets/data/LIVRETO.pdf');

export default function DownloadScreen() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    try {
      setDownloading(true);

      const asset = Asset.fromModule(livretoPdf);
      await asset.downloadAsync();
      const sourceUri = asset.localUri ?? asset.uri;

      const destUri = `${FileSystem.cacheDirectory}Livreto-Clima-Quimico-RA.pdf`;
      const existing = await FileSystem.getInfoAsync(destUri);
      if (existing.exists) {
        await FileSystem.deleteAsync(destUri, { idempotent: true });
      }
      await FileSystem.copyAsync({ from: sourceUri, to: destUri });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(destUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Baixar Livreto de Marcadores',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert(
          'Download concluído',
          Platform.OS === 'web'
            ? 'O livreto foi preparado para download.'
            : `O livreto foi salvo em:\n${destUri}`
        );
      }
    } catch (error) {
      Alert.alert(
        'Erro no download',
        'Não foi possível baixar o livreto. Tente novamente.'
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber="" title="Download" />

      <ImageBackground
        source={backgroundImage}
        style={styles.viewerContainer}
        imageStyle={styles.viewerBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.viewerOverlay} />
        <Download color={Colors.white} size={80} strokeWidth={1.5} />
      </ImageBackground>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 45 }}
      >
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Livreto de Marcadores</Text>
            <Text style={styles.cardText}>
              Para utilização desse APP, o usuário deverá fazer o download do livreto que contém os marcadores de visualizações dos compostos 3D em Realidade Aumentada.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Como usar</Text>
            <Text style={styles.cardText}>
              Após realizar o download, imprima o livreto e aponte a câmera do dispositivo para os marcadores indicados em cada capítulo. Os compostos químicos serão exibidos em 3D diretamente na tela.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.downloadButton, downloading && styles.downloadButtonDisabled]}
            onPress={handleDownload}
            activeOpacity={0.85}
            disabled={downloading}
          >
            {downloading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <Download color={Colors.white} size={22} strokeWidth={2} />
                <Text style={styles.downloadButtonText}>Baixar Livreto (PDF)</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardHighlight}>
              Tenha o livreto em mãos para uma experiência completa em Realidade Aumentada!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  viewerContainer: {
    height: height * 0.25,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  viewerBackgroundImage: {
    resizeMode: 'contain',
  },
  viewerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
  cardHighlight: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.primary,
    lineHeight: 26,
    textAlign: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  downloadButtonDisabled: {
    opacity: 0.7,
  },
  downloadButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
});
