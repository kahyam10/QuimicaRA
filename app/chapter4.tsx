import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Colors from '@/constants/Colors';
import { capitulo4 } from '@/constants/ChapterContent';
import { ChapterHeader } from '@/components/ChapterHeader';

export default function Chapter4Screen() {
  return (
    <View style={styles.container}>
      <ChapterHeader
        chapterNumber={capitulo4.numero}
        title={capitulo4.titulo}
      />

      {/* Conteúdo scrollável */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sobre Preservação</Text>
            <Text style={styles.cardText}>{capitulo4.introducao}</Text>
          </View>

          {/* Lista de soluções */}
          {capitulo4.solucoes.map((solucao, index) => (
            <View key={solucao.id} style={styles.solutionCard}>
              <View style={styles.solutionHeader}>
                <View style={styles.solutionBullet}>
                  <Text style={styles.solutionBulletText}>{index + 1}</Text>
                </View>
                <Text style={styles.solutionTitle}>Solução {index + 1}</Text>
              </View>
              <Text style={styles.solutionText}>{solucao.texto}</Text>
            </View>
          ))}
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
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
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
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
  solutionCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  solutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  solutionBullet: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solutionBulletText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  solutionText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
  },
});
