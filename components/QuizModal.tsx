import { useState, useEffect, memo, useCallback } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { XCircle, CheckCircle, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModalProps {
  visible: boolean;
  onClose: () => void;
  questions: Question[];
}

function QuizModalContent({ visible, onClose, questions }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    if (visible) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setScore(0);
      setShowResults(false);
    }
  }, [visible]);
  
  const handleSelectAnswer = useCallback((index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }, [currentQuestion, questions, isAnswered]);
  
  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  }, [currentQuestion, questions.length]);
  
  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  }, []);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <XCircle color={Colors.text} size={24} />
          </TouchableOpacity>
          
          {!showResults ? (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
              </View>
              
              <Text style={styles.questionNumber}>Questão {currentQuestion + 1} de {questions.length}</Text>
              <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
              
              <View style={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === index && styles.selectedOption,
                      isAnswered && index === questions[currentQuestion].correctAnswer && styles.correctOption,
                      isAnswered && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && styles.incorrectOption,
                    ]}
                    onPress={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                  >
                    <Text style={[styles.optionText, (selectedAnswer === index || (isAnswered && index === questions[currentQuestion].correctAnswer)) && styles.selectedOptionText]}>
                      {option}
                    </Text>
                    {isAnswered && index === questions[currentQuestion].correctAnswer && (
                      <CheckCircle color={Colors.white} size={20} style={styles.optionIcon} />
                    )}
                    {isAnswered && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                      <AlertCircle color={Colors.white} size={20} style={styles.optionIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              
              {isAnswered && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                  <Text style={styles.nextButtonText}>
                    {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          ) : (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Resultados do Quiz</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Você acertou {score} de {questions.length} questões</Text>
                <Text style={styles.percentageText}>{Math.round((score / questions.length) * 100)}%</Text>
              </View>
              <View style={styles.feedbackContainer}>
                {score === questions.length && <Text style={styles.excellentFeedback}>Excelente!</Text>}
                {score >= questions.length / 2 && score < questions.length && <Text style={styles.goodFeedback}>Bom trabalho!</Text>}
                {score < questions.length / 2 && <Text style={styles.improveFeedback}>Continue estudando!</Text>}
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={[styles.actionButton, styles.restartButton]} onPress={handleRestartQuiz}>
                  <Text style={styles.actionButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.closeQuizButton]} onPress={onClose}>
                  <Text style={styles.actionButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export const QuizModal = memo(QuizModalContent);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  progressContainer: {
    height: 6,
    backgroundColor: Colors.lightBackground,
    borderRadius: 3,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  questionNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 12,
  },
  questionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 24,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: Colors.primary,
  },
  correctOption: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  incorrectOption: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  selectedOptionText: {
    color: Colors.white,
    fontFamily: 'Inter-Bold',
  },
  optionIcon: {
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  resultsContainer: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  resultsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  percentageText: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: Colors.primary,
  },
  feedbackContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  excellentFeedback: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.success,
    textAlign: 'center',
  },
  goodFeedback: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.primary,
    textAlign: 'center',
  },
  improveFeedback: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.warning,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  restartButton: {
    backgroundColor: Colors.primary,
  },
  closeQuizButton: {
    backgroundColor: Colors.lightBackground,
  },
  actionButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
});
