/**
 * Type Definitions para o Projeto MILI
 *
 * Define tipos e enums para toda a aplicação
 */

/**
 * Tipos de modelos 3D disponíveis
 */
export enum ModelType {
  ATMOSPHERE = 'atmosphere',
  LAYERS = 'layers',
  COMPOSITION = 'composition',
  CO2 = 'co2',
  CH4 = 'ch4',
  N2O = 'n2o',
  O3 = 'o3',
  CFC = 'cfc',
}

/**
 * Questão de Quiz
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

/**
 * Seção de um capítulo
 */
export interface ChapterSection {
  id: string;
  title: string;
  content: string;
  modelType: ModelType;
  description: string;
  quiz?: QuizQuestion[];
}

/**
 * Dados de um capítulo completo
 */
export interface Chapter {
  id: number;
  title: string;
  slug: string;
  description: string;
  sections: ChapterSection[];
  icon?: string;
}

/**
 * Progresso do usuário em um capítulo
 */
export interface ChapterProgress {
  chapterId: number;
  completionPercentage: number;
  lastAccessedAt: string;
  completedSections: string[];
  quizScores: Record<string, number>;
}

/**
 * Props para ModelViewer
 */
export interface ModelViewerProps {
  modelType: ModelType | string;
  zoomLevel: number;
}

/**
 * Props para ChapterCard
 */
export interface ChapterCardProps {
  number: number;
  title: string;
  description: string;
  progress: number;
  onPress: () => void;
}

/**
 * Props para QuizModal
 */
export interface QuizModalProps {
  visible: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
}

/**
 * Contexto de progresso
 */
export interface ProgressContextType {
  chapterProgress: Record<number, number>;
  updateProgress: (chapterId: number, progress: number) => void;
  getChapterProgress: (chapterId: number) => number;
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
}

/**
 * Configuração da aplicação
 */
export interface AppConfig {
  version: string;
  language: 'pt' | 'en' | 'es';
  darkMode: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

/**
 * Resposta de API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
}
