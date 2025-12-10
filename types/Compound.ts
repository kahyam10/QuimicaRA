/**
 * Tipagem completa para compostos químicos
 * Inclui dados estruturais, visuais e de arquivo
 */

/**
 * Interface para representar um composto/molécula
 * Estende os dados de estrutura química com informações de visualização 3D
 */
export interface Compound {
  // ===== Identificação =====
  id: string; // ID único: 'n2', 'o2', 'so2', etc.
  nome: string; // Nome completo: 'Nitrogênio', 'Dióxido de Enxofre'
  nomeCurto?: string; // Nome abreviado: 'N₂', 'SO₂' (para exibição rápida)

  // ===== Fórmula Química =====
  formula: string; // Fórmula: 'N₂', 'SO₂', 'CO₂'
  formulaDisplay?: string; // Fórmula formatada com subscritos: 'N₂', 'SO₂'

  // ===== Estrutura Química =====
  geometria: string; // 'Linear', 'Angular', 'Tetraédrica', 'Trigonal'
  polaridade: string; // 'Polar', 'Apolar'
  anguloLigacao: string; // '180°', '119°', etc.
  ligacoes?: string; // Descrição das ligações: 'Tripla ligação N≡N', 'Duas ligações duplas S=O'

  // ===== Informações Gerais =====
  informacoes: string; // Descrição detalhada do composto
  percentualAtmosfera?: string; // Percentual na atmosfera: '78%', '0,093%'
  fonte?: string; // Origem: 'Natural', 'Antropogênica', 'Ambas'
  efeitos?: string; // Efeitos ambientais ou na saúde

  // ===== Visualização 3D / Modelo =====
  modelo3D: Modelo3D;

  // ===== Metadados =====
  capitulo: number; // Número do capítulo: 1, 2, 3
  ordem: number; // Ordem de exibição dentro do capítulo
  ativo: boolean; // Se deve ser exibido na interface
}

/**
 * Interface para dados do modelo 3D
 * Referencia arquivos GLB/GLTF e metadados
 */
export interface Modelo3D {
  // ===== Arquivo =====
  pathGLB: string; // Caminho relativo ao projeto: 'assets/models/ejemplo.glb'
  pathOBJ?: string; // Caminho alternativo OBJ (se aplicável)
  nomeArquivo: string; // Nome descritivo: 'nitrogen_molecule.glb'

  // ===== Apresentação Visual =====
  escala: number; // Escala da apresentação: 0.8, 1.0, 1.2
  rotacaoInicial?: {
    x: number; // Rotação inicial em X
    y: number; // Rotação inicial em Y
    z: number; // Rotação inicial em Z
  };
  posicao?: {
    x: number;
    y: number;
    z: number;
  };

  // ===== Animação =====
  animacao?: AnimacaoModelo;

  // ===== Propriedades de Renderização =====
  cor?: string; // Cor principal em hex: '#FF0000'
  transparencia?: number; // 0-1 (0 = transparente, 1 = opaco)
  brilho?: number; // Intensidade do brilho

  // ===== Metadados =====
  formato: 'GLB' | 'GLTF' | 'OBJ' | 'FBX'; // Tipo de arquivo 3D
  tamanhoArquivo?: number; // Tamanho em KB
  descricao?: string; // Descrição da visualização
}

/**
 * Interface para animações do modelo 3D
 */
export interface AnimacaoModelo {
  tipo: 'rotacao' | 'oscilacao' | 'pulso' | 'nenhuma';
  velocidade: number; // Velocidade em segundos por volta (1-5)
  eixo?: 'x' | 'y' | 'z' | 'xyz'; // Eixo de rotação
  amplitude?: number; // Amplitude para oscilação (0-1)
}

/**
 * Interface para metadados de capítulo
 */
export interface CapituloCompounds {
  id: string; // 'cap1', 'cap2', 'cap3'
  numero: number; // 1, 2, 3
  titulo: string; // 'Composição Atmosférica'
  descricao: string;
  compostos: Compound[];
}

/**
 * Type para respostas de busca de compostos
 */
export interface CompoundSearchResult {
  encontrado: boolean;
  composto?: Compound;
  erro?: string;
}

/**
 * Type para filtros de busca
 */
export interface CompoundFilterOptions {
  capitulo?: number;
  polaridade?: 'Polar' | 'Apolar';
  geometria?: string;
  ativo?: boolean;
  temModelo3D?: boolean;
}

/**
 * Type para validação de compostos
 */
export interface CompoundValidation {
  valido: boolean;
  erros: string[];
  avisos: string[];
}

/**
 * Tipo utilitário: Chaves de um Compound
 */
export type CompoundKeys = keyof Compound;

/**
 * Tipo utilitário: Chaves de Modelo3D
 */
export type Modelo3DKeys = keyof Modelo3D;
