import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { ModelViewer } from '@/components/ModelViewer';
import { InfoPanel } from '@/components/InfoPanel';

const { width } = Dimensions.get('window');

export default function Chapter1Screen() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: 'Composição da Atmosfera',
      content: 'A atmosfera da Terra é composta principalmente de nitrogênio (78%), oxigênio (21%), argônio (0,9%) e outros gases em pequenas quantidades como dióxido de carbono, metano e vapor de água.',
      modelInfo: {
        type: 'atmosphere',
        description: 'Representação das camadas da atmosfera terrestre.',
      }
    },
    {
      title: 'Camadas Atmosféricas',
      content: 'A atmosfera é dividida em troposfera, estratosfera, mesosfera, termosfera e exosfera. Cada camada tem características próprias de temperatura, pressão e composição.',
      modelInfo: {
        type: 'layers',
        description: 'Modelo das diferentes camadas atmosféricas.',
      }
    },
    {
      title: 'Variações na Composição',
      content: 'A composição da atmosfera varia com a altitude. A troposfera contém a maior parte do vapor d\'água e aerossóis, enquanto as camadas superiores contêm mais gases ionizados.',
      modelInfo: {
        type: 'composition',
        description: 'Variação dos gases atmosféricos com a altitude.',
      }
    }
  ];
  
  const currentSectionData = sections[currentSection];

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25);
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChapterHeader title="Composição Atmosférica" chapterNumber={1} />
      
      <View style={styles.contentContainer}>
        <View style={styles.modelContainer}>
          <ModelViewer 
            modelType={currentSectionData.modelInfo.type} 
            zoomLevel={zoomLevel}
          />
          
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
              <ZoomIn color={Colors.white} size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
              <ZoomOut color={Colors.white} size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <RotateCw color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        
        <InfoPanel 
          title={currentSectionData.title}
          content={currentSectionData.content}
          modelDescription={currentSectionData.modelInfo.description}
        />
      </View>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentSection === 0 && styles.disabledButton]} 
          onPress={handlePrevSection}
          disabled={currentSection === 0}
        >
          <ChevronLeft color={currentSection === 0 ? Colors.lightGray : Colors.primary} size={24} />
          <Text style={[styles.navButtonText, currentSection === 0 && styles.disabledText]}>Anterior</Text>
        </TouchableOpacity>
        
        <Text style={styles.pageIndicator}>{currentSection + 1}/{sections.length}</Text>
        
        <TouchableOpacity 
          style={[styles.navButton, currentSection === sections.length - 1 && styles.disabledButton]} 
          onPress={handleNextSection}
          disabled={currentSection === sections.length - 1}
        >
          <Text style={[styles.navButtonText, currentSection === sections.length - 1 && styles.disabledText]}>Próximo</Text>
          <ChevronRight color={currentSection === sections.length - 1 ? Colors.lightGray : Colors.primary} size={24} />
        </TouchableOpacity>
      </View>
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