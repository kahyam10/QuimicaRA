import { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ChapterCardProps {
  number: number;
  title: string;
  description: string;
  progress: number;
  onPress: () => void;
}

/**
 * ChapterCard Component
 * 
 * Fase 2 Optimization: Wrapped in React.memo to prevent unnecessary re-renders
 * When parent component updates, this component only re-renders if props change
 * 
 * Expected improvement: -40-60% unnecessary re-renders
 */
export const ChapterCard = memo(function ChapterCard({ 
  number, 
  title, 
  description, 
  progress, 
  onPress 
}: ChapterCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.numberCircle}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}% Completo</Text>
      </View>
      <View style={styles.arrow}>
        <ChevronRight color={Colors.primary} size={24} />
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  // Custom equality check to optimize memo comparison
  // Returns true if props are equal (skip re-render)
  return (
    prevProps.number === nextProps.number &&
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.progress === nextProps.progress &&
    prevProps.onPress === nextProps.onPress
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  number: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.lightBackground,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.primary,
  },
  arrow: {
    marginLeft: 8,
  },
});