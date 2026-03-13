import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { ChapterCard } from '@/components/ChapterCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChapterHeader } from '@/components/ChapterHeader';
import { cap3Image } from '@/constants/Images';

export default function Chapter3Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ChapterHeader
        chapterNumber={3}
        title="Efeitos na Atmosfera"
      />
      
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradientContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Selecione um Tema</Text>
            <Text style={styles.subtitle}>
              Explore os diferentes aspectos dos efeitos atmosféricos
            </Text>
          </View>

          <Text style={styles.themesTitle}>Temas</Text>

          <ChapterCard
            number={1}
            title="Efeito Estufa"
            description="Conheça os principais gases responsáveis pelo efeito estufa."
            progress={0}
            backgroundImage={cap3Image}
            onPress={() => router.push('/chapter3a')}
          />

          <ChapterCard
            number={2}
            title="Camada de Ozônio"
            description="Estude os compostos que afetam a camada protetora de ozônio."
            progress={0}
            backgroundImage={cap3Image}
            onPress={() => router.push('/chapter3b')}
          />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  gradientContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.9,
  },
  themesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
});
