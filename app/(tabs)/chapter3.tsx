import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause, RotateCw, RefreshCw } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { SimulationViewer } from '@/components/SimulationViewer';
import { InfoPanel } from '@/components/InfoPanel';

const { width } = Dimensions.get('window');

const simulations = [
  { id: 'greenhouse', name: 'Efeito Estufa', description: 'Simulação do efeito estufa e retenção de calor na atmosfera.' },
  { id: 'ozone', name: 'Depleção de Ozônio', description: 'Visualização da destruição da camada de ozônio por CFCs.' },
  { id: 'acidRain', name: 'Chuva Ácida', description: 'Formação de chuva ácida a partir de poluentes atmosféricos.' },
  { id: 'smog', name: 'Formação de Smog', description: 'Processo de formação de smog fotoquímico em áreas urbanas.' },
];

export default function Chapter3Screen() {
  const [selectedSimulation, setSelectedSimulation] = useState(simulations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const simulationData = {
    'greenhouse': {
      title: 'Efeito Estufa',
      content: 'O efeito estufa é um processo natural que mantém a Terra aquecida. Gases como CO₂, CH₄ e N₂O permitem que a luz solar entre, mas retêm parte do calor. O aumento desses gases na atmosfera intensifica este efeito, causando o aquecimento global.',
      steps: [
        'Radiação solar penetra na atmosfera',
        'Superfície terrestre absorve radiação e aquece',
        'Superfície emite radiação infravermelha',
        'Gases de efeito estufa retêm parte desta radiação',
        'O calor retido aquece a Terra'
      ]
    },
    'ozone': {
      title: 'Depleção de Ozônio',
      content: 'A camada de ozônio na estratosfera protege a Terra da radiação UV nociva. Compostos como CFCs liberam cloro na atmosfera, que destrói moléculas de ozônio em uma reação catalítica, resultando em "buracos" na camada de ozônio.',
      steps: [
        'CFCs são liberados na atmosfera',
        'Radiação UV quebra CFCs, liberando cloro',
        'Átomos de cloro reagem com moléculas de ozônio',
        'Uma molécula de ozônio é destruída',
        'O cloro continua reagindo com mais moléculas de ozônio'
      ]
    },
    'acidRain': {
      title: 'Chuva Ácida',
      content: 'A chuva ácida forma-se quando dióxido de enxofre (SO₂) e óxidos de nitrogênio (NOx) reagem com água, oxigênio e outros produtos químicos na atmosfera, formando soluções diluídas de ácido sulfúrico e ácido nítrico.',
      steps: [
        'Emissão de SO₂ e NOx por indústrias e veículos',
        'Estes gases reagem com oxigênio, vapor de água e oxidantes',
        'Formam-se ácido sulfúrico e ácido nítrico',
        'Estes ácidos caem com a precipitação',
        'Impactam ecossistemas aquáticos, florestas e estruturas'
      ]
    },
    'smog': {
      title: 'Formação de Smog',
      content: 'O smog fotoquímico forma-se quando poluentes primários (NOx e COVs) reagem na presença de luz solar, produzindo poluentes secundários como ozônio troposférico. É comum em áreas urbanas e pode causar problemas respiratórios.',
      steps: [
        'Emissão de NOx e COVs de veículos e indústrias',
        'Radiação solar inicia reações fotoquímicas',
        'Forma-se ozônio troposférico e outros oxidantes',
        'Desenvolve-se uma névoa amarelada',
        'Piora em dias quentes e ensolarados com pouco vento'
      ]
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Logic to reset simulation would go here
  };

  const handleChangeSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(simulationSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSimulationSpeed(speeds[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChapterHeader title="Efeitos na Atmosfera" chapterNumber={3} />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.simulationSelector}>
        {simulations.map((simulation) => (
          <TouchableOpacity
            key={simulation.id}
            style={[
              styles.simulationButton,
              selectedSimulation.id === simulation.id && styles.selectedSimulation
            ]}
            onPress={() => setSelectedSimulation(simulation)}
          >
            <Text 
              style={[
                styles.simulationButtonText,
                selectedSimulation.id === simulation.id && styles.selectedSimulationText
              ]}
            >
              {simulation.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.contentContainer}>
        <View style={styles.simulationContainer}>
          <SimulationViewer 
            simulationType={selectedSimulation.id} 
            isPlaying={isPlaying}
            speed={simulationSpeed}
          />
          
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
              {isPlaying ? (
                <Pause color={Colors.white} size={24} />
              ) : (
                <Play color={Colors.white} size={24} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleReset}>
              <RefreshCw color={Colors.white} size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleChangeSpeed}>
              <Text style={styles.speedText}>{simulationSpeed}x</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView style={styles.infoScrollView}>
          <View style={styles.simulationInfoContainer}>
            <Text style={styles.simulationTitle}>
              {simulationData[selectedSimulation.id].title}
            </Text>
            
            <Text style={styles.simulationDescription}>
              {simulationData[selectedSimulation.id].content}
            </Text>
            
            <Text style={styles.stepsTitle}>Processo:</Text>
            {simulationData[selectedSimulation.id].steps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
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
  simulationSelector: {
    maxHeight: 50,
    paddingHorizontal: 16,
  },
  simulationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightBackground,
    marginRight: 8,
    marginVertical: 8,
  },
  selectedSimulation: {
    backgroundColor: Colors.primary,
  },
  simulationButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
  selectedSimulationText: {
    color: Colors.white,
    fontFamily: 'Inter-Bold',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  simulationContainer: {
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
  speedText: {
    color: Colors.white,
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
  },
  infoScrollView: {
    flex: 1,
  },
  simulationInfoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  simulationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 12,
  },
  simulationDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  stepsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: Colors.white,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  stepText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
});