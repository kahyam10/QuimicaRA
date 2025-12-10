import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterCard } from '@/components/ChapterCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundImage } from '@/constants/Images';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground style={styles.header} source={backgroundImage} resizeMode="cover" imageStyle={styles.headerImage}>
   
            <Text style={styles.title}>Química Atmosférica</Text>
            <Text style={styles.subtitle}>
              Explorando os compostos e reações da atmosfera terrestre
            </Text>
          </ImageBackground>

          <View style={styles.introContainer}>
    
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push('/introduction')}
            >
              <Text style={styles.startButtonText}>Introdução</Text>
              <ChevronRight color={Colors.white} size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.chaptersTitle}>Capítulos</Text>

          <ChapterCard
            number={1}
            title="Composição Atmosférica"
            description="Estudo da estrutura e composição das camadas atmosféricas."
            progress={0}
            onPress={() => router.push('/chapter1')}
          />

          <ChapterCard
            number={2}
            title="Compostos Químicos e Impactos"
            description="Análise dos principais compostos químicos e seus efeitos."
            progress={0}
            onPress={() => router.push('/chapter2')}
          />

          <ChapterCard
            number={3}
            title="Efeitos na Atmosfera"
            description="Compreensão dos impactos dos compostos nas mudanças atmosféricas."
            progress={0}
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
    height: 220,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },

  headerImage: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: 8,
  },

  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '700',
  },

  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
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
    color: Colors.text,
    marginRight: 8,
    fontWeight: '600',
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
