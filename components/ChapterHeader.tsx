import { memo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChapterHeaderProps {
  title: string;
  chapterNumber: number | string;
}

/**
 * ChapterHeader Component
 * 
 * Fase 2 Optimization: Wrapped in React.memo to prevent unnecessary re-renders
 * useCallback memoizes the back button handler to maintain referential equality
 * 
 * Expected improvement: -40-60% unnecessary re-renders
 */
export const ChapterHeader = memo(function ChapterHeader({ 
  title, 
  chapterNumber 
}: ChapterHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Memoized callback to prevent creating new function on each render
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <ChevronLeft color={Colors.white} size={24} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.chapterNumber}>Capítulo {chapterNumber}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom equality check
  // Returns true if props are equal (skip re-render)
  return (
    prevProps.title === nextProps.title &&
    prevProps.chapterNumber === nextProps.chapterNumber
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    backgroundColor: Colors.primary, // Azul
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Branco semi-transparente
    marginRight: 12,
  },

  titleContainer: {
    flex: 1,
  },

  chapterNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: Colors.white, // Branco
    marginBottom: 2,
    fontWeight: '600',
  },

  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.white, // Branco
    fontWeight: '600',
  },
});