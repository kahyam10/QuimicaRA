import { StyleSheet, View, Dimensions, Text, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { backgroundImage } from '@/constants/Images';
import { BookOpen } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function IntroductionScreen() {
  return (
    <View style={styles.container}>
      <ChapterHeader
        chapterNumber=""
        title="Introdução"
      />

      {/* Área do ícone (substituindo o viewer 3D) */}
      <ImageBackground
        source={backgroundImage}
        style={styles.viewerContainer}
        imageStyle={styles.viewerBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.viewerOverlay} />
        <BookOpen color={Colors.white} size={80} strokeWidth={1.5} />
      </ImageBackground>

      {/* Conteúdo scrollável */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bem-vindo ao Química RA</Text>
            <Text style={styles.cardText}>
              Este aplicativo integrado ao livreto permite a observação de compostos atmosféricos de forma dinâmica, interativa e imersiva por meio da Realidade Aumentada.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Visualização Tridimensional</Text>
            <Text style={styles.cardText}>
              Nele, é possível visualizar e estudar compostos presentes na atmosfera de forma tridimensional, tornando a experiência educacional mais criativa e tangível, superando obstáculos de abstração e tornando a aprendizagem mais envolvente e eficaz.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Organização Modular</Text>
            <Text style={styles.cardText}>
              O aplicativo foi organizado em 4 módulos educacionais segmentados por temáticas, visando facilitar a navegação do usuário, permitindo a construção do conhecimento de forma progressiva e personalizada.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHighlight}>
              Preparem-se para descobertas surpreendentes no mundo da química atmosférica!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé fixo (simulando o selector) */}
      <SafeAreaView edges={['bottom']} style={styles.footerSection}>
        <Text style={styles.footerText}>Deslize para começar sua jornada</Text>
      </SafeAreaView>
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
  footerSection: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    minHeight: 85,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
