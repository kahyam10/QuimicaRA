import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { aboutFullImage } from '@/constants/Images';
import { Users, BookMarked, ChevronRight } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function SobreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber="" title="Sobre" />

      {/* Imagem de capa */}
      <ImageBackground
        source={aboutFullImage}
        style={styles.viewerContainer}
        imageStyle={styles.viewerBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.viewerOverlay} />
      </ImageBackground>

      {/* Conteúdo scrollável */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sobre o Aplicativo</Text>
            <Text style={styles.cardText}>
              O Química RA é um aplicativo educacional desenvolvido para complementar o estudo da química atmosférica por meio da Realidade Aumentada, tornando o aprendizado mais imersivo e interativo.
            </Text>
          </View>

          {/* Botão Desenvolvedores */}
          <TouchableOpacity style={styles.navCard} onPress={() => router.push('/desenvolvedores')}>
            <View style={styles.navCardIcon}>
              <Users color={Colors.primary} size={32} strokeWidth={1.8} />
            </View>
            <View style={styles.navCardContent}>
              <Text style={styles.navCardTitle}>Desenvolvedores</Text>
              <Text style={styles.navCardSubtitle}>Conheça a equipe por trás do projeto</Text>
            </View>
            <ChevronRight color={Colors.primary} size={22} />
          </TouchableOpacity>

          {/* Botão Referências */}
          <TouchableOpacity style={styles.navCard} onPress={() => router.push('/referencias')}>
            <View style={styles.navCardIcon}>
              <BookMarked color={Colors.primary} size={32} strokeWidth={1.8} />
            </View>
            <View style={styles.navCardContent}>
              <Text style={styles.navCardTitle}>Referências</Text>
              <Text style={styles.navCardSubtitle}>Fontes bibliográficas utilizadas no conteúdo</Text>
            </View>
            <ChevronRight color={Colors.primary} size={22} />
          </TouchableOpacity>
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
    width: '100%',
    height: height * 0.25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  viewerBackgroundImage: {
    width: '100%',
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
  cardText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
  navCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  navCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navCardContent: {
    flex: 1,
  },
  navCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  navCardSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
