import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

/**
 * ESTILOS GLOBAIS - QuímicaAPp
 *
 * Tema dark mode profissional com paleta coerente
 * Otimizado para educação e leitura
 */

export const AppStyle = StyleSheet.create({
  // ========== CONTAINERS ==========

  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  backgroundOverlay: {
    padding: 16,
    backgroundColor: Colors.background,
    height: '100%',
  },

  // ========== HEADER ==========

  header: {
    height: 220,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  // ========== TEXTO ==========

  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '700',
  },

  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  bodyText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 20,
  },

  // ========== CONTAINERS ==========

  introContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    margin: 16,
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

  // ========== CARDS ==========

  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  // ========== BOTÕES & INTERAÇÕES ==========

  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: Colors.text,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    fontWeight: '600',
  },

  // ========== DIVIDERS & BORDERS ==========

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },

  section: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.text,
    marginBottom: 12,
    fontWeight: '600',
  },
});
