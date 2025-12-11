import { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ImageSourcePropType } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ChapterCardProps {
  number: number;
  title: string;
  description: string;
  progress: number;
  onPress: () => void;
  backgroundImage?: ImageSourcePropType;
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
  onPress,
  backgroundImage
}: ChapterCardProps) {
  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.card}
      imageStyle={styles.cardImage}
      resizeMode="cover"
    >
      {/* Overlay para melhorar contraste do texto */}
      <View style={styles.overlay} />
      
      <TouchableOpacity style={styles.cardContent} onPress={onPress}>
        <View style={styles.numberCircle}>
          <Text style={styles.number}>{number}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.arrow}>
          <ChevronRight color={Colors.primary} size={24} />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}, (prevProps, nextProps) => {
  // Custom equality check to optimize memo comparison
  // Returns true if props are equal (skip re-render)
  return (
    prevProps.number === nextProps.number &&
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.progress === nextProps.progress &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.backgroundImage === nextProps.backgroundImage
  );
});
    prevProps.onPress === nextProps.onPress
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  cardImage: {
    borderRadius: 12,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },

  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    color: Colors.text,
    fontWeight: '700',
  },

  content: {
    flex: 1,
  },

  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
    fontWeight: '600',
  },

  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 0,
  },

  arrow: {
    marginLeft: 12,
  },
});