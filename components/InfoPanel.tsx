import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Info } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface InfoPanelProps {
  title: string;
  content: string;
  modelDescription: string;
}

/**
 * InfoPanel Component
 * 
 * Fase 2 Optimization: Wrapped in React.memo to prevent unnecessary re-renders
 * This component only re-renders when its content (title, content, modelDescription) changes
 * 
 * Expected improvement: -40-60% unnecessary re-renders
 */
export const InfoPanel = memo(function InfoPanel({ 
  title, 
  content, 
  modelDescription 
}: InfoPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      
      <View style={styles.modelInfoContainer}>
        <Info size={18} color={Colors.primary} style={styles.infoIcon} />
        <Text style={styles.modelDescription}>{modelDescription}</Text>
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom equality check
  // Returns true if props are equal (skip re-render)
  return (
    prevProps.title === nextProps.title &&
    prevProps.content === nextProps.content &&
    prevProps.modelDescription === nextProps.modelDescription
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  content: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  modelInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
    padding: 12,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  modelDescription: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});