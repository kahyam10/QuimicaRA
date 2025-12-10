import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Leaf, Factory, Recycle, Wind } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChapterHeader } from '@/components/ChapterHeader';
import { SolutionCard } from '@/components/SolutionCard';
import { QuizModal } from '@/components/QuizModal';

const { width } = Dimensions.get('window');

const solutions = [
  {
    id: 'renewable',
    title: 'Energias Renováveis',
    description: 'Substituição de combustíveis fósseis por fontes renováveis como solar, eólica e hidrelétrica.',
    icon: 'wind',
    benefits: [
      'Redução de emissões de gases de efeito estufa',
      'Menor poluição atmosférica local',
      'Recursos inesgotáveis',
      'Desenvolvimento de novas tecnologias',
    ],
    challenges: [
      'Investimento inicial elevado',
      'Intermitência de algumas fontes',
      'Necessidade de infraestrutura de armazenamento',
      'Adaptação da rede elétrica existente',
    ],
    imageUrl: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
  },
  {
    id: 'efficiency',
    title: 'Eficiência Energética',
    description: 'Desenvolvimento e implementação de tecnologias e práticas que reduzem o consumo de energia.',
    icon: 'factory',
    benefits: [
      'Redução do consumo de energia e emissões',
      'Economia financeira a médio e longo prazo',
      'Menor necessidade de expansão da geração elétrica',
      'Aplicável a diversos setores da economia',
    ],
    challenges: [
      'Custo inicial de modernização',
      'Necessidade de políticas de incentivo',
      'Resistência a mudanças de hábitos',
      'Variação de efetividade conforme o contexto',
    ],
    imageUrl: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg',
  },
  {
    id: 'circular',
    title: 'Economia Circular',
    description: 'Modelo econômico baseado na redução, reutilização, recuperação e reciclagem de materiais e energia.',
    icon: 'recycle',
    benefits: [
      'Redução do consumo de recursos naturais',
      'Menor geração de resíduos e poluentes',
      'Criação de novos modelos de negócio',
      'Estímulo à inovação e design sustentável',
    ],
    challenges: [
      'Necessidade de redesenho de produtos e processos',
      'Desenvolvimento de infraestrutura de reciclagem',
      'Mudança cultural de consumo',
      'Integração de diferentes setores produtivos',
    ],
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
  },
  {
    id: 'preservation',
    title: 'Preservação Florestal',
    description: 'Conservação e restauração de florestas que funcionam como sumidouros de carbono e reguladores climáticos.',
    icon: 'leaf',
    benefits: [
      'Sequestro de carbono atmosférico',
      'Preservação da biodiversidade',
      'Regulação do ciclo hidrológico',
      'Manutenção de serviços ecossistêmicos',
    ],
    challenges: [
      'Pressão econômica para desmatamento',
      'Necessidade de fiscalização eficiente',
      'Equilíbrio entre conservação e desenvolvimento',
      'Financiamento de projetos de restauração',
    ],
    imageUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg',
  },
];

export default function Chapter4Screen() {
  const [selectedSolution, setSelectedSolution] = useState(solutions[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const quizQuestions = [
    {
      question: 'Qual é o principal gás de efeito estufa emitido pela atividade humana?',
      options: ['Metano (CH₄)', 'Dióxido de Carbono (CO₂)', 'Óxido Nitroso (N₂O)', 'Ozônio (O₃)'],
      correctAnswer: 1,
    },
    {
      question: 'Qual destas NÃO é uma fonte renovável de energia?',
      options: ['Solar', 'Eólica', 'Gás Natural', 'Hidrelétrica'],
      correctAnswer: 2,
    },
    {
      question: 'Qual composto químico foi amplamente regulamentado pelo Protocolo de Montreal devido ao seu impacto na camada de ozônio?',
      options: ['CO₂', 'CH₄', 'CFC', 'SO₂'],
      correctAnswer: 2,
    },
    {
      question: 'O que é economia circular?',
      options: [
        'Um sistema financeiro sustentável',
        'Um modelo econômico que elimina resíduos e maximiza o reuso de recursos',
        'Um sistema econômico baseado apenas em energias renováveis',
        'Um modelo de negócio para empresas do setor ambiental'
      ],
      correctAnswer: 1,
    },
    {
      question: 'Qual é o principal mecanismo pelo qual as florestas ajudam a mitigar as mudanças climáticas?',
      options: [
        'Regulação da temperatura',
        'Absorção de poluentes do ar',
        'Sequestro de carbono',
        'Produção de oxigênio'
      ],
      correctAnswer: 2,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ChapterHeader title="Preservação e Soluções" chapterNumber={4} />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.solutionSelector}>
        {solutions.map((solution) => (
          <TouchableOpacity
            key={solution.id}
            style={[
              styles.solutionButton,
              selectedSolution.id === solution.id && styles.selectedSolution
            ]}
            onPress={() => setSelectedSolution(solution)}
          >
            {solution.icon === 'wind' && <Wind size={16} color={selectedSolution.id === solution.id ? Colors.white : Colors.text} style={styles.solutionIcon} />}
            {solution.icon === 'factory' && <Factory size={16} color={selectedSolution.id === solution.id ? Colors.white : Colors.text} style={styles.solutionIcon} />}
            {solution.icon === 'recycle' && <Recycle size={16} color={selectedSolution.id === solution.id ? Colors.white : Colors.text} style={styles.solutionIcon} />}
            {solution.icon === 'leaf' && <Leaf size={16} color={selectedSolution.id === solution.id ? Colors.white : Colors.text} style={styles.solutionIcon} />}
            <Text 
              style={[
                styles.solutionButtonText,
                selectedSolution.id === solution.id && styles.selectedSolutionText
              ]}
            >
              {solution.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedSolution.imageUrl }}
            style={styles.solutionImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.solutionInfoContainer}>
          <Text style={styles.solutionTitle}>{selectedSolution.title}</Text>
          <Text style={styles.solutionDescription}>{selectedSolution.description}</Text>
          
          <Text style={styles.sectionTitle}>Benefícios</Text>
          {selectedSolution.benefits.map((benefit, index) => (
            <View key={`benefit-${index}`} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{benefit}</Text>
            </View>
          ))}
          
          <Text style={styles.sectionTitle}>Desafios</Text>
          {selectedSolution.challenges.map((challenge, index) => (
            <View key={`challenge-${index}`} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{challenge}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.quizButton}
          onPress={() => setShowQuiz(true)}
        >
          <Text style={styles.quizButtonText}>Testar Conhecimentos</Text>
          <ArrowRight color={Colors.white} size={20} />
        </TouchableOpacity>
      </ScrollView>
      
      <QuizModal
        visible={showQuiz}
        onClose={() => setShowQuiz(false)}
        questions={quizQuestions}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  solutionSelector: {
    maxHeight: 50,
    paddingHorizontal: 16,
  },
  solutionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightBackground,
    marginRight: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  solutionIcon: {
    marginRight: 6,
  },
  selectedSolution: {
    backgroundColor: Colors.primary,
  },
  solutionButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
  selectedSolutionText: {
    color: Colors.white,
    fontFamily: 'Inter-Bold',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  solutionImage: {
    width: '100%',
    height: '100%',
  },
  solutionInfoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  solutionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 8,
  },
  solutionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginRight: 10,
  },
  listItemText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  quizButton: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  quizButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
    marginRight: 8,
  },
});