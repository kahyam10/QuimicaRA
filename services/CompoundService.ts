/**
 * Serviço utilitário para operações com compostos
 * Fornece funções puras para validação, transformação e comparação
 */

import { Compound, Modelo3D, CompoundValidation } from '@/types/Compound';

/**
 * Classe de serviço para operações com compostos
 */
export class CompoundService {
  /**
   * Valida se um composto possui todos os campos obrigatórios
   */
  static validarComposto(composto: any): CompoundValidation {
    const erros: string[] = [];
    const avisos: string[] = [];

    // Campos obrigatórios
    const camposObrigatorios = [
      'id',
      'nome',
      'formula',
      'geometria',
      'polaridade',
      'capitulo',
      'ordem',
    ];

    camposObrigatorios.forEach((campo) => {
      if (!composto[campo]) {
        erros.push(`Campo obrigatório faltando: ${campo}`);
      }
    });

    // Validações específicas
    if (composto.id && !/^[a-z0-9]+$/.test(composto.id)) {
      erros.push('ID deve conter apenas letras minúsculas e números');
    }

    if (composto.capitulo && (composto.capitulo < 1 || composto.capitulo > 3)) {
      erros.push('Capítulo deve estar entre 1 e 3');
    }

    if (composto.ordem && composto.ordem < 1) {
      erros.push('Ordem deve ser maior que 0');
    }

    // Validações de modelo 3D
    if (!composto.modelo3D) {
      avisos.push('Composto não possui modelo 3D associado');
    } else {
      const validacaoModelo = CompoundService.validarModelo3D(
        composto.modelo3D
      );
      if (!validacaoModelo.valido) {
        erros.push(...validacaoModelo.erros);
      }
      avisos.push(...validacaoModelo.avisos);
    }

    return {
      valido: erros.length === 0,
      erros,
      avisos,
    };
  }

  /**
   * Valida um modelo 3D
   */
  static validarModelo3D(modelo: any): CompoundValidation {
    const erros: string[] = [];
    const avisos: string[] = [];

    if (!modelo.pathGLB && !modelo.pathOBJ) {
      erros.push('Modelo 3D deve ter ao menos um path (GLB ou OBJ)');
    }

    if (!modelo.formato) {
      erros.push('Formato do modelo é obrigatório');
    }

    if (!['GLB', 'GLTF', 'OBJ', 'FBX'].includes(modelo.formato)) {
      erros.push(`Formato inválido: ${modelo.formato}`);
    }

    if (!modelo.escala || modelo.escala <= 0) {
      avisos.push('Escala do modelo não definida ou inválida');
    }

    if (
      modelo.transparencia !== undefined &&
      (modelo.transparencia < 0 || modelo.transparencia > 1)
    ) {
      erros.push('Transparência deve estar entre 0 e 1');
    }

    return {
      valido: erros.length === 0,
      erros,
      avisos,
    };
  }

  /**
   * Compara dois compostos por similaridade química
   * Retorna um score de 0 a 100
   */
  static compararCompostos(comp1: Compound, comp2: Compound): number {
    let pontos = 0;
    const maxPontos = 100;

    if (comp1.polaridade === comp2.polaridade) pontos += 25;
    if (comp1.geometria === comp2.geometria) pontos += 25;
    if (comp1.capitulo === comp2.capitulo) pontos += 25;
    if (comp1.fonte === comp2.fonte) pontos += 25;

    return (pontos / maxPontos) * 100;
  }

  /**
   * Formata a fórmula química para exibição
   * Converte subscritos de caracteres Unicode
   */
  static formatarFormula(formula: string): string {
    const subscritosMap: { [key: string]: string } = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉',
    };

    return formula.replace(/[0-9]/g, (match) => subscritosMap[match] || match);
  }

  /**
   * Extrai os elementos químicos de uma fórmula
   */
  static extrairElementos(formula: string): string[] {
    const elementos = formula.match(/[A-Z][a-z]?/g) || [];
    return [...new Set(elementos)];
  }

  /**
   * Conta o número total de átomos em uma fórmula
   */
  static contarAtomos(formula: string): number {
    const atomos = formula.match(/[A-Z][a-z]?\d*/g) || [];
    return atomos.reduce((total, atomo) => {
      const numero = atomo.match(/\d+/)?.[0];
      return total + (numero ? parseInt(numero) : 1);
    }, 0);
  }

  /**
   * Verifica se um composto é uma molécula diatômica
   */
  static isDiatomico(composto: Compound): boolean {
    return CompoundService.contarAtomos(composto.formula) === 2;
  }

  /**
   * Verifica se um composto é uma molécula triatômica
   */
  static isTriatomico(composto: Compound): boolean {
    return CompoundService.contarAtomos(composto.formula) === 3;
  }

  /**
   * Calcula uma cor baseada em propriedades químicas
   * Retorna um hex color baseado na polaridade e geometria
   */
  static obterCorPorPropriedades(composto: Compound): string {
    const cores: { [key: string]: string } = {
      // Polares lineares
      'Polar:Linear': '#FF6B6B',
      // Polares angulares
      'Polar:Angular': '#FFD93D',
      // Polares tetraédricas
      'Polar:Tetraédrica': '#6BCB77',
      // Apolares lineares
      'Apolar:Linear': '#4D96FF',
      // Apolares tetraédricas
      'Apolar:Tetraédrica': '#9D84B7',
      // Padrão
      default: '#A0AEC0',
    };

    const chave = `${composto.polaridade}:${composto.geometria}`;
    return cores[chave] || cores['default'];
  }

  /**
   * Gera um resumo textual das propriedades do composto
   */
  static gerarResumo(composto: Compound): string {
    const elementos = CompoundService.extrairElementos(composto.formula).join(
      ', '
    );
    const atomos = CompoundService.contarAtomos(composto.formula);
    const tipo = CompoundService.isDiatomico(composto)
      ? 'diatômico'
      : CompoundService.isTriatomico(composto)
      ? 'triatômico'
      : 'poliatômico';

    return `${composto.nome} (${composto.formula}) é uma molécula ${tipo} composta por ${elementos}. ${composto.informacoes}`;
  }

  /**
   * Compara dois compostos por propriedades
   */
  static compararPropriedades(
    comp1: Compound,
    comp2: Compound
  ): {
    iguais: string[];
    diferentes: string[];
  } {
    const iguais: string[] = [];
    const diferentes: string[] = [];

    const propriedades: (keyof Compound)[] = [
      'polaridade',
      'geometria',
      'capitulo',
      'fonte',
    ];

    propriedades.forEach((prop) => {
      if (comp1[prop] === comp2[prop]) {
        iguais.push(prop as string);
      } else {
        diferentes.push(prop as string);
      }
    });

    return { iguais, diferentes };
  }

  /**
   * Filtra compostos por múltiplas propriedades
   */
  static filtrarPorPropriedades(
    compostos: Compound[],
    filtros: {
      polaridade?: string;
      geometria?: string;
      capitulo?: number;
      fonte?: string;
      temModelo3D?: boolean;
    }
  ): Compound[] {
    return compostos.filter((composto) => {
      if (filtros.polaridade && composto.polaridade !== filtros.polaridade)
        return false;
      if (filtros.geometria && composto.geometria !== filtros.geometria)
        return false;
      if (filtros.capitulo && composto.capitulo !== filtros.capitulo)
        return false;
      if (filtros.fonte && composto.fonte !== filtros.fonte) return false;
      if (filtros.temModelo3D && !composto.modelo3D) return false;
      return true;
    });
  }

  /**
   * Ordena compostos por critério
   */
  static ordenarCompostos(
    compostos: Compound[],
    ordenarPor: 'nome' | 'ordem' | 'capitulo' | 'formula' = 'ordem'
  ): Compound[] {
    const copia = [...compostos];

    switch (ordenarPor) {
      case 'nome':
        return copia.sort((a, b) => a.nome.localeCompare(b.nome));
      case 'formula':
        return copia.sort((a, b) => a.formula.localeCompare(b.formula));
      case 'capitulo':
        return copia.sort(
          (a, b) => a.capitulo - b.capitulo || a.ordem - b.ordem
        );
      case 'ordem':
      default:
        return copia.sort((a, b) => a.ordem - b.ordem);
    }
  }

  /**
   * Obtém compostos relacionados por propriedades similares
   */
  static obterCompostosRelacionados(
    composto: Compound,
    compostos: Compound[],
    limite = 3
  ): Compound[] {
    const relacionados = compostos
      .filter((c) => c.id !== composto.id)
      .map((c) => ({
        composto: c,
        score: CompoundService.compararCompostos(composto, c),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limite)
      .map((item) => item.composto);

    return relacionados;
  }

  /**
   * Exporta um composto como JSON
   */
  static exportarJSON(composto: Compound): string {
    return JSON.stringify(composto, null, 2);
  }

  /**
   * Importa um composto a partir de JSON
   */
  static importarJSON(json: string): Compound | null {
    try {
      const dados = JSON.parse(json);
      const validacao = CompoundService.validarComposto(dados);
      if (!validacao.valido) {
        console.error('Validação falhou:', validacao.erros);
        return null;
      }
      return dados as Compound;
    } catch (erro) {
      console.error('Erro ao importar JSON:', erro);
      return null;
    }
  }
}

/**
 * Constantes para geometrias comuns
 */
export const GEOMETRIAS = {
  LINEAR: 'Linear',
  ANGULAR: 'Angular',
  TETRAEDRICA: 'Tetraédrica',
  TRIGONAL_PLANAR: 'Trigonal Planar',
  PIRAMIDAL: 'Piramidal',
  OCTAEDRICA: 'Octaédrica',
} as const;

/**
 * Constantes para polaridades
 */
export const POLARIDADES = {
  POLAR: 'Polar',
  APOLAR: 'Apolar',
  NAO_APLICAVEL: 'Não aplicável',
} as const;

/**
 * Constantes para tipos de animação
 */
export const TIPOS_ANIMACAO = {
  ROTACAO: 'rotacao',
  OSCILACAO: 'oscilacao',
  PULSO: 'pulso',
  NENHUMA: 'nenhuma',
} as const;
