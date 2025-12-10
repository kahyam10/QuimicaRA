import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { ModelViewer } from '@/components/ModelViewer';
import { InfoPanel } from '@/components/InfoPanel';
import { AppStyle } from '@/styles/AppStyle';
import { backgroundImage } from '@/constants/Images';

const { width } = Dimensions.get('window');

export default function Chapter1Screen() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentSection, setCurrentSection] = useState(0);

 
  


  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage}  resizeMode="cover" style={{height:"100%"}} >

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
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  modelContainer: {
    height: width * 0.7,
    backgroundColor: Colors.darkBackground,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.primary,
    marginHorizontal: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: Colors.lightGray,
  },
  pageIndicator: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
});