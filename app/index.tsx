import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterCard } from '@/components/ChapterCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundImage, capaImage, cap1Image, cap2Image, cap3Image } from '@/constants/Images';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.container}
    >
      <StatusBar hidden={true} translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground 
            style={styles.header} 
            source={capaImage} 
            resizeMode="cover" 
            imageStyle={styles.headerImage}
          >
            <View style={styles.headerOverlay} />
            <View style={styles.headerContent}>
              <Text style={styles.title}>Clima Químico AR</Text>
              <Text style={styles.subtitle}>
                Explorando os compostos e reações da atmosfera terrestre
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.introSection}>
            <ChapterCard
              number={0}
              title="Introdução"
              progress={0}
              backgroundImage={backgroundImage}
              showNumber={false}
              onPress={() => router.push('/introduction')}
            />
          </View>

          <Text style={styles.chaptersTitle}>Capítulos</Text>

          <ChapterCard
            number={1}
            title="Composição Atmosférica"
            description="Estudo da estrutura e composição das camadas atmosféricas."
            progress={0}
            backgroundImage={cap1Image}
            onPress={() => router.push('/chapter1')}
          />

          <ChapterCard
            number={2}
            title="Compostos Químicos e Impactos"
            description="Análise dos principais compostos químicos e seus efeitos."
            progress={0}
            backgroundImage={cap2Image}
            onPress={() => router.push('/chapter2')}
          />

          <ChapterCard
            number={3}
            title="Efeitos na Atmosfera"
            description="Compreensão dos impactos dos compostos nas mudanças atmosféricas."
            progress={0}
            backgroundImage={cap3Image}
            onPress={() => router.push('/chapter3')}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  header: {
    height: 280,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    overflow: 'hidden',
  },

  headerImage: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: 0,
  },

  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  introSection: {
    marginTop: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  introContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 12,
    fontWeight: '600',
  },

  introText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },

  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },

  chaptersTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginTop: 8,
    marginBottom: 12,
    marginHorizontal: 16,
    fontWeight: '600',
  },
});