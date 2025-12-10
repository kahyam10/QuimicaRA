/**
 * TEMA BRANCO E AZUL - QuímicaAPp
 *
 * Paleta de cores profissional e moderna
 * Tema light com azul como cor primária
 * Otimizado para leitura e acessibilidade
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

  // Background: Tema Light profissional
  darkBackground: '#FFFFFF', // Branco puro (background principal)
  background: '#F5F7FA', // Cinza muito claro (backgrounds alternativos)
  surfaceBackground: '#FFFFFF', // Branco (surface principal)
  cardBackground: '#F5F7FA', // Cinza claro (cards)
  lightBackground: '#E3F2FD', // Azul muito claro (hover/highlighted)

  // ========== TEXTO ==========

  // Texto: Cores escuras para light mode
  text: '#1A1A1A', // Cinza muito escuro (quase preto)
  textSecondary: '#616161', // Cinza médio
  textTertiary: '#9E9E9E', // Cinza claro
  lightText: '#1A1A1A', // Alias para escuro

  // ========== CORES ESTRUTURAIS ==========

  white: '#FFFFFF',
  black: '#000000',
  border: '#E0E0E0', // Borda cinza claro
  lightGray: '#BDBDBD', // Cinza light
  divider: '#EEEEEE', // Divisor claro

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

  shadowColor: 'rgba(0, 0, 0, 0.15)', // Sombra suave (light mode)
  shadowColorLight: 'rgba(25, 118, 210, 0.1)', // Sombra azul clara (highlights)

  // ========== TRANSPARÊNCIAS (Para light mode) ==========

  overlay: 'rgba(0, 0, 0, 0.3)', // Overlay escuro suave
  overlayLight: 'rgba(25, 118, 210, 0.1)', // Overlay azul claro
};

export default Colors;
