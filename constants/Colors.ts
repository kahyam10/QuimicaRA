/**
 * TEMA PROFISSIONAL - QuímicaAPp
 *
 * Paleta de cores coerente e moderna
 * Inspirada em design science/education
 * Otimizada para leitura e acessibilidade
 */

const Colors = {
  // ========== CORES PRINCIPAIS ==========

  // Primária: Azul profundo (confiança, ciência)
  primary: '#1976D2', // Azul forte
  primaryLight: '#42A5F5', // Azul claro
  primaryDark: '#1565C0', // Azul escuro

  // Secundária: Verde (crescimento, natureza)
  secondary: '#388E3C', // Verde forte
  secondaryLight: '#66BB6A', // Verde claro
  secondaryDark: '#2E7D32', // Verde escuro

  // Accent: Laranja (energia, ação)
  accent: '#F57C00', // Laranja
  accentLight: '#FFB74D', // Laranja claro
  accentDark: '#E65100', // Laranja escuro

  // ========== BACKGROUND & SUPERFÍCIES ==========

  // Background: Muito escuro (tema dark profissional)
  darkBackground: '#121212', // Preto profundo (Material Design 3)
  background: '#1E1E1E', // Cinza muito escuro
  surfaceBackground: '#2D2D2D', // Cinza escuro (surface)
  cardBackground: '#272727', // Cinza para cards
  lightBackground: '#3A3A3A', // Cinza claro (hover)

  // ========== TEXTO ==========

  // Texto: Cores claras para dark mode
  text: '#FFFFFF', // Branco puro
  textSecondary: '#B3B3B3', // Cinza claro
  textTertiary: '#808080', // Cinza médio
  lightText: '#FFFFFF', // Alias para branco

  // ========== CORES ESTRUTURAIS ==========

  white: '#FFFFFF',
  black: '#000000',
  border: '#404040', // Borda dark mode
  lightGray: '#505050', // Cinza light
  divider: '#2D2D2D', // Divisor dark

  // ========== CORES DE STATUS ==========

  success: '#66BB6A', // Verde (sucesso)
  warning: '#FFA726', // Laranja (aviso)
  error: '#EF5350', // Vermelho (erro)
  info: '#42A5F5', // Azul (informação)

  // ========== CORES DE MOLÉCULAS (Para educação) ==========

  // Elementos químicos - cores visuais distintas
  nitrogen: '#3498DB', // N₂ - Azul (atmosfera)
  oxygen: '#E74C3C', // O₂ - Vermelho (oxidação)
  argon: '#95A5A6', // Ar - Cinza (inerte)
  carbon: '#2C3E50', // C - Cinza escuro (carbono)
  hydrogen: '#ECF0F1', // H - Branco (leve)
  sulfur: '#F39C12', // S - Amarelo (enxofre)
  nitrogen_oxide: '#E67E22', // NO₂ - Laranja (tóxico)
  ozone: '#8E44AD', // O₃ - Roxo (especial)

  // ========== GRADIENTES ==========

  gradientStart: '#42A5F5', // Azul claro
  gradientEnd: '#1565C0', // Azul escuro

  // ========== SOMBRAS & EFEITOS ==========

  shadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra escura
  shadowColorLight: 'rgba(255, 255, 255, 0.1)', // Sombra clara (highlights)

  // ========== TRANSPARÊNCIAS (Para dark mode) ==========

  overlay: 'rgba(0, 0, 0, 0.7)', // Overlay escuro
  overlayLight: 'rgba(255, 255, 255, 0.1)', // Overlay claro
};

export default Colors;
