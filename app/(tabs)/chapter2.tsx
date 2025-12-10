import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { ModelViewer } from '@/components/ModelViewer';
import { InfoPanel } from '@/components/InfoPanel';
import { CompoundSelector } from '@/components/CompoundSelector';

const { width } = Dimensions.get('window');

const compounds = [
  { id: 'co2', name: 'CO₂', fullName: 'Dióxido de Carbono' },
  { id: 'ch4', name: 'CH₄', fullName: 'Metano' },
  { id: 'n2o', name: 'N₂O', fullName: 'Óxido Nitroso' },
  { id: 'o3', name: 'O₃', fullName: 'Ozônio' },
  { id: 'cfc', name: 'CFC', fullName: 'Clorofluorcarboneto' },
];

export default function Chapter2Screen() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedCompound, setSelectedCompound] = useState(compounds[0]);

  const compoundData = {
    'co2': {
      description: 'Principal gás de efeito estufa produzido pela queima de combustíveis fósseis. Contribui significativamente para o aquecimento global.',
      impact: 'Aumento da temperatura global, acidificação dos oceanos, mudanças nos padrões climáticos.',
      sources: 'Queima de combustíveis fósseis, desmatamento, processos industriais.',
      structure: 'Molécula linear com um átomo de carbono ligado a dois átomos de oxigênio.'
    },
    'ch4': {
      description: 'Gás de efeito estufa potente, com poder de aquecimento 25 vezes maior que o CO₂ ao longo de 100 anos.',
      impact: 'Contribui para o aquecimento global. Reage na atmosfera formando ozônio troposférico.',
      sources: 'Pecuária, cultivo de arroz, aterros sanitários, extração de combustíveis fósseis.',
      structure: 'Molécula tetraédrica com um átomo de carbono ligado a quatro átomos de hidrogênio.'
    },
    'n2o': {
      description: 'Gás de efeito estufa com alto potencial de aquecimento global (298 vezes maior que o CO₂ em 100 anos).',
      impact: 'Contribui para o aquecimento global e a destruição da camada de ozônio.',
      sources: 'Fertilizantes agrícolas, processos industriais, queima de biomassa e combustíveis fósseis.',
      structure: 'Molécula linear com dois átomos de nitrogênio ligados a um átomo de oxigênio.'
    },
    'o3': {
      description: 'Na estratosfera, protege a Terra da radiação UV. Na troposfera, é um poluente e gás de efeito estufa.',
      impact: 'Ozônio troposférico: problemas respiratórios, danos à vegetação. Depleção do ozônio estratosférico: aumento da radiação UV.',
      sources: 'Formado por reações fotoquímicas envolvendo NOx, COVs e luz solar.',
      structure: 'Molécula angular com três átomos de oxigênio.'
    },
    'cfc': {
      description: 'Compostos sintéticos estáveis que destroem o ozônio estratosférico e são potentes gases de efeito estufa.',
      impact: 'Destruição da camada de ozônio, permitindo maior incidência de radiação UV. Contribui para o aquecimento global.',
      sources: 'Historicamente usados em refrigeração, propelentes de aerossóis e espumas (uso reduzido pelo Protocolo de Montreal).',
      structure: 'Moléculas contendo carbono, cloro e flúor em diferentes configurações.'
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChapterHeader title="Compostos Químicos e Impactos" chapterNumber={2} />
      
      <CompoundSelector 
        compounds={compounds} 
        selectedCompound={selectedCompound}
        onSelectCompound={setSelectedCompound}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.modelContainer}>
          <ModelViewer 
            modelType={selectedCompound.id} 
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
        
        <ScrollView style={styles.infoScrollView}>
          <View style={styles.compoundInfoContainer}>
            <Text style={styles.compoundTitle}>{selectedCompound.fullName}</Text>
            <Text style={styles.compoundFormula}>{selectedCompound.name}</Text>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.sectionContent}>{compoundData[selectedCompound.id].description}</Text>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Impactos</Text>
              <Text style={styles.sectionContent}>{compoundData[selectedCompound.id].impact}</Text>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Fontes</Text>
              <Text style={styles.sectionContent}>{compoundData[selectedCompound.id].sources}</Text>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Estrutura</Text>
              <Text style={styles.sectionContent}>{compoundData[selectedCompound.id].structure}</Text>
            </View>
          </View>
        </ScrollView>
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
    height: width * 0.6,
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
  infoScrollView: {
    flex: 1,
  },
  compoundInfoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  compoundTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4,
  },
  compoundFormula: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 6,
  },
  sectionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
});