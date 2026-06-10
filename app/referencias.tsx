import { StyleSheet, View, Dimensions, Text, ScrollView, ImageBackground } from 'react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { aboutFullImage } from '@/constants/Images';
import { BookMarked } from 'lucide-react-native';

const { height } = Dimensions.get('window');

const referencias = [
  {
    autores: 'DUARTE, Hélio A.',
    titulo: 'Ligações Químicas: Ligação Iônica, Covalente e Metálica',
    detalhes: 'Cadernos Temáticos de Química Nova na Escola, São Paulo, n. 4, maio 2001.',
  },
  {
    autores: 'ERBE, Margarete Casagrande Lass.',
    titulo: 'Química Ambiental',
    detalhes: 'Curitiba: Instituto Federal do Paraná, 2016.',
  },
  {
    autores: '',
    titulo: 'Geometria Molecular: confeccionando moléculas',
    detalhes: 'In: EPELQUI. São Mateus: UFES, [s.d.].',
  },
  {
    autores: 'MOZETO, Antonio Aparecido.',
    titulo: 'Química Atmosférica: a química sobre nossas cabeças',
    detalhes: 'Cadernos Temáticos de Química Nova na Escola, São Paulo, n. 1, p. 41-49, maio 2001.',
  },
  {
    autores: 'SCHIRMER, Wilson N.',
    titulo: 'Química da atmosfera: constituintes naturais, poluentes e suas reações',
    detalhes: '[S.l.: s.n.], [s.d.].',
  },
  {
    autores: 'UNIVERSIDADE ESTADUAL PAULISTA (UNESP). Secretaria da Educação do Estado de São Paulo (SEESP).',
    titulo: 'Formação docente: cursos de especialização para o quadro do magistério da SEESP, ensino fundamental II e ensino médio: a química da biosfera',
    detalhes: 'São Paulo: UNESP, [s.d.].',
  },
  {
    autores: 'UNIVERSIDADE FEDERAL DE SERGIPE (UFS). Centro de Educação a Distância (CESAD).',
    titulo: 'Química da atmosfera — Parte I',
    detalhes: '[S.l.: s.n.], [s.d.].',
  },
  {
    autores: 'UNIVERSIDADE FEDERAL DE SERGIPE (UFS). Centro de Educação a Distância (CESAD).',
    titulo: 'Química da atmosfera — Parte II',
    detalhes: '[S.l.: s.n.], [s.d.].',
  },
];

export default function ReferenciasScreen() {
  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber="" title="Referências" />

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
            <Text style={styles.cardTitle}>Referências Bibliográficas</Text>
            <Text style={styles.cardText}>
              O conteúdo deste aplicativo foi embasado nas seguintes fontes científicas e didáticas:
            </Text>
          </View>

          {referencias.map((ref, index) => (
            <View key={index} style={styles.refCard}>
              <View style={styles.refIndex}>
                <Text style={styles.refIndexText}>{index + 1}</Text>
              </View>
              <View style={styles.refContent}>
                {ref.autores ? <Text style={styles.refAutores}>{ref.autores}</Text> : null}
                <Text style={styles.refTitulo}>{ref.titulo}.</Text>
                <Text style={styles.refDetalhes}>{ref.detalhes}</Text>
              </View>
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
  refCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  refIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  refIndexText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },
  refContent: {
    flex: 1,
  },
  refAutores: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  refTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  refDetalhes: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
});
