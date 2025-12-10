/**
 * Validadores Zod para o Projeto MILI
 *
 * Instalar com: npm install zod
 */

// Nota: Este arquivo demonstra como usar Zod para validação
// Para usar, descomente as importações e instale o pacote

// import { z } from 'zod';
// import { ModelType } from './types';

/**
 * Placeholder para schema de ModelType
 * Quando Zod estiver instalado, use:
 *
 * export const ModelTypeSchema = z.enum([
 *   ModelType.ATMOSPHERE,
 *   ModelType.LAYERS,
 *   ModelType.COMPOSITION,
 *   ModelType.CO2,
 *   ModelType.CH4,
 *   ModelType.N2O,
 *   ModelType.O3,
 *   ModelType.CFC,
 * ]);
 */

/**
 * Placeholder para schema de ModelViewerProps
 * Quando Zod estiver instalado, use:
 *
 * export const ModelViewerPropsSchema = z.object({
 *   modelType: ModelTypeSchema,
 *   zoomLevel: z.number().min(0.5).max(2),
 * });
 */

/**
 * Placeholder para schema de QuizQuestion
 * Quando Zod estiver instalado, use:
 *
 * export const QuizQuestionSchema = z.object({
 *   id: z.string(),
 *   question: z.string(),
 *   options: z.array(z.string()).min(2),
 *   correctAnswer: z.number().int().min(0),
 *   explanation: z.string().optional(),
 * });
 */

/**
 * Placeholder para schema de ChapterSection
 * Quando Zod estiver instalado, use:
 *
 * export const ChapterSectionSchema = z.object({
 *   id: z.string(),
 *   title: z.string(),
 *   content: z.string(),
 *   modelType: ModelTypeSchema,
 *   description: z.string(),
 *   quiz: z.array(QuizQuestionSchema).optional(),
 * });
 */

/**
 * Placeholder para schema de Chapter
 * Quando Zod estiver instalado, use:
 *
 * export const ChapterSchema = z.object({
 *   id: z.number().int().positive(),
 *   title: z.string(),
 *   slug: z.string(),
 *   description: z.string(),
 *   sections: z.array(ChapterSectionSchema),
 *   icon: z.string().optional(),
 * });
 */

/**
 * Função auxiliar para validar ModelViewerProps
 *
 * @param props - Props a validar
 * @returns Props validadas ou null se inválidas
 */
export function validateModelViewerProps(props: unknown): {
  modelType: string;
  zoomLevel: number;
} | null {
  try {
    if (typeof props !== 'object' || props === null) {
      return null;
    }

    const obj = props as Record<string, unknown>;

    if (
      typeof obj.modelType !== 'string' ||
      typeof obj.zoomLevel !== 'number' ||
      obj.zoomLevel < 0.5 ||
      obj.zoomLevel > 2
    ) {
      console.warn('Invalid ModelViewerProps:', props);
      return null;
    }

    return {
      modelType: obj.modelType,
      zoomLevel: obj.zoomLevel,
    };
  } catch (error) {
    console.error('Error validating ModelViewerProps:', error);
    return null;
  }
}

/**
 * Função auxiliar para validar QuizQuestion
 */
export function validateQuizQuestion(question: unknown): boolean {
  try {
    if (typeof question !== 'object' || question === null) {
      return false;
    }

    const q = question as Record<string, unknown>;

    return (
      typeof q.id === 'string' &&
      typeof q.question === 'string' &&
      Array.isArray(q.options) &&
      q.options.every((opt) => typeof opt === 'string') &&
      typeof q.correctAnswer === 'number' &&
      q.correctAnswer >= 0 &&
      q.correctAnswer < q.options.length
    );
  } catch (error) {
    return false;
  }
}

/**
 * Função auxiliar para validar Chapter
 */
export function validateChapter(chapter: unknown): boolean {
  try {
    if (typeof chapter !== 'object' || chapter === null) {
      return false;
    }

    const c = chapter as Record<string, unknown>;

    return (
      typeof c.id === 'number' &&
      c.id > 0 &&
      typeof c.title === 'string' &&
      typeof c.slug === 'string' &&
      typeof c.description === 'string' &&
      Array.isArray(c.sections) &&
      c.sections.length > 0
    );
  } catch (error) {
    return false;
  }
}

/**
 * Instruções para usar Zod:
 *
 * 1. Instalar: npm install zod
 * 2. Descomente os imports e schemas acima
 * 3. Use em componentes:
 *
 *    const props = ModelViewerPropsSchema.parse({
 *      modelType: 'atmosphere',
 *      zoomLevel: 1,
 *    });
 *
 * 4. Com try-catch para erros customizados:
 *
 *    try {
 *      ModelViewerPropsSchema.parse(unknownProps);
 *    } catch (error) {
 *      if (error instanceof z.ZodError) {
 *        console.error('Validation error:', error.errors);
 *      }
 *    }
 */
