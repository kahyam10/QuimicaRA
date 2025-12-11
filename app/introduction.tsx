import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { AppStyle } from '@/styles/AppStyle';
import { backgroundImage } from '@/constants/Images';

export default function IntroductionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
        <View style={AppStyle.backgroundOverlay}>
          <Text style={AppStyle.bodyText}>
            Bem-vindo ao estudo de química atmosférica em realidade aumentada (RA).
          </Text>
          <Text style={AppStyle.bodyText}>
            Este aplicativo integrado ao livreto permite a observação de compostos atmosféricos de forma dinâmica, interativa e imersiva por meio da RA.
          </Text>
          <Text style={AppStyle.bodyText}>
            Nele, é possível visualizar e estudar compostos presentes na atmosfera de forma tridimensional a partir do reconhecimento de marcadores presentes no livreto, tornando a experiência educacional mais criativa e tangível, superando obstáculos de abstração e tornando a aprendizagem mais envolvente e eficaz.
          </Text>
          <Text style={AppStyle.bodyText}>
            O aplicativo foi organizado em 4 módulos educacionais segmentados por temáticas, visando facilitar a navegação do usuário, permitindo a construção do conhecimento de forma progressiva e personalizada. 
          </Text>
          <Text style={AppStyle.bodyText}>Preparem-se para descobertas surpreendentes no mundo da química atmosférica!</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  background: {
    flex: 1,
    height: '100%',
  },
});
