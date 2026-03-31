import { StyleSheet, View, Dimensions, Text, ScrollView, ImageBackground, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { aboutFullImage } from '@/constants/Images';
import { Users } from 'lucide-react-native';

const { height } = Dimensions.get('window');

const desenvolvedores = [
  {
    nome: 'Emiliana de Souza Lisbôa',
    papel: 'Aluna de Mestrado',
    especialidade: 'Licenciatura em Química',
    foto: require('@/assets/photos/emiliana.jpeg'),
    descricao: 'Teve a ideia do projeto e conduziu toda a pesquisa, desde o levantamento do conteúdo sobre química atmosférica até o desenvolvimento e os testes do aplicativo, como parte do seu trabalho de mestrado.',
  },
  {
    nome: 'Dr. André Gustavo de Araujo Fernandes',
    papel: 'Professor Orientador',
    especialidade: 'Doutor em Química Analítica e Inorgânica (USP)',
    foto: require('@/assets/photos/andre.jpeg'),
    descricao: 'Orientou o desenvolvimento do projeto desde a sua concepção, contribuindo com sua experiência em química para embasar o conteúdo científico do aplicativo.',
  },
  {
    nome: 'Dr. Antônio de Santana Santos',
    papel: 'Professor Co-orientador',
    especialidade: 'Doutor em Química Analítica (UNICAMP)',
    foto: require('@/assets/photos/antonio_santana.jpeg'),
    descricao: 'Esteve presente em diferentes etapas do projeto, contribuindo com seu olhar crítico e auxiliando na construção de um trabalho mais consistente e bem fundamentado.',
  },
  {
    nome: 'Kahyam Souza Santos',
    papel: 'Desenvolvedor(a) de Projeto 1',
    especialidade: 'Analista de Sistemas e Desenvolvedor Full Stack',
    foto: require('@/assets/photos/kahyam.jpg'),
    descricao: 'Trabalhou no desenvolvimento técnico do app, cuidando da parte de realidade aumentada, da interface e de deixar a experiência mais fluida para o usuário. Também ficou responsável por integrar os dados e modelos de química atmosférica, assegurando que o conteúdo estivesse correto e que as visualizações funcionassem como esperado.',
  },
  {
    nome: 'Rodrigo Sá de Jesus',
    papel: 'Desenvolvedor(a) de Projeto 2',
    especialidade: 'Engenheiro Químico',
    foto: require('@/assets/photos/rodrigo.jpeg'),
    descricao: 'Trabalhou na supervisão geral de elaboração do aplicativo.',
  },
];

export default function DesenvolvedoresScreen() {
  return (
    <View style={styles.container}>
      <ChapterHeader chapterNumber="" title="Desenvolvedores" />

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
            <Text style={styles.cardTitle}>Equipe de Desenvolvimento</Text>
            <Text style={styles.cardText}>
              Este aplicativo foi desenvolvido como parte de um projeto educacional voltado ao ensino de química atmosférica com o suporte de Realidade Aumentada.
            </Text>
          </View>

          {desenvolvedores.map((dev, index) => (
            <View key={index} style={styles.devCard}>
              {/* Header: foto + nome/papel/especialidade */}
              <View style={styles.devHeader}>
                <Image source={dev.foto} style={styles.devAvatar} resizeMode="cover" />
                <View style={styles.devHeaderInfo}>
                  <Text style={styles.devNome}>{dev.nome}</Text>
                  <Text style={styles.devPapel}>{dev.papel}</Text>
                  {dev.especialidade && (
                    <Text style={styles.devEspecialidade}>{dev.especialidade}</Text>
                  )}
                </View>
              </View>
              {/* Descrição full-width */}
              <Text style={styles.devDescricao}>{dev.descricao}</Text>
            </View>
          ))}

          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Instituição</Text>
            <Text style={styles.cardText}>
                Projeto desenvolvido no âmbito acadêmico com foco na inovação pedagógica e no ensino de ciências por meio de tecnologias imersivas.
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
  devCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'column',
    gap: 12,
  },
  devHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  devAvatar: {
    width: 72,
    height: 96,
    borderRadius: 8,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  devHeaderInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 4,
  },
  devInfo: {
    flex: 1,
  },
  devNome: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  devPapel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 3,
  },
  devEspecialidade: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  devDescricao: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
});
