/**
 * Hook para carregar e gerenciar dados de compostos
 * Fornece funções para busca, filtro e validação de compostos
 */

import { useCallback, useMemo } from 'react';
import {
  Compound,
  CapituloCompounds,
  CompoundFilterOptions,
  CompoundValidation,
} from '@/types/Compound';
import compoundsData from '@/data/compounds.json';

/**
 * Hook principal para gerenciar dados de compostos
 */
export const useCompounds = () => {
  // Tipagem dos dados JSON
  interface CompoundsJSON {
    capitulos: CapituloCompounds[];
  }

  const data = compoundsData as CompoundsJSON;

  /**
   * Obtém todos os compostos de um capítulo
   */
  const getCompostsByCapitulo = useCallback(
    (numeroCapitulo: number): Compound[] => {
      const capitulo = data.capitulos.find(
        (cap) => cap.numero === numeroCapitulo
      );
      return capitulo ? capitulo.compostos : [];
    },
    [data]
  );

  /**
   * Obtém um composto específico pelo ID
   */
  const getCompostById = useCallback(
    (id: string): Compound | undefined => {
      for (const capitulo of data.capitulos) {
        const composto = capitulo.compostos.find((c) => c.id === id);
        if (composto) return composto;
      }
      return undefined;
    },
    [data]
  );

  /**
   * Obtém um composto pelo nome
   */
  const getCompostByName = useCallback(
    (nome: string): Compound | undefined => {
      for (const capitulo of data.capitulos) {
        const composto = capitulo.compostos.find(
          (c) => c.nome.toLowerCase() === nome.toLowerCase()
        );
        if (composto) return composto;
      }
      return undefined;
    },
    [data]
  );

  /**
   * Obtém um composto pela fórmula química
   */
  const getCompostByFormula = useCallback(
    (formula: string): Compound | undefined => {
      for (const capitulo of data.capitulos) {
        const composto = capitulo.compostos.find(
          (c) => c.formula.toLowerCase() === formula.toLowerCase()
        );
        if (composto) return composto;
      }
      return undefined;
    },
    [data]
  );

  /**
   * Filtra compostos baseado em critérios
   */
  const filtrarCompostos = useCallback(
    (opcoes: CompoundFilterOptions): Compound[] => {
      let resultado: Compound[] = [];

      // Se filtrar por capítulo, inicia com compostos desse capítulo
      if (opcoes.capitulo !== undefined) {
        resultado = getCompostsByCapitulo(opcoes.capitulo);
      } else {
        // Caso contrário, pega todos
        resultado = data.capitulos.flatMap((cap) => cap.compostos);
      }

      // Aplica filtros adicionais
      if (opcoes.ativo !== undefined) {
        resultado = resultado.filter((c) => c.ativo === opcoes.ativo);
      }

      if (opcoes.polaridade !== undefined) {
        resultado = resultado.filter((c) => c.polaridade === opcoes.polaridade);
      }

      if (opcoes.geometria !== undefined) {
        resultado = resultado.filter((c) => c.geometria === opcoes.geometria);
      }

      if (opcoes.temModelo3D !== undefined) {
        resultado = resultado.filter(
          (c) => !!c.modelo3D && (opcoes.temModelo3D as boolean)
        );
      }

      return resultado;
    },
    [data, getCompostsByCapitulo]
  );

  /**
   * Obtém todas as fórmulas únicas
   */
  const getTodasAsFormulas = useCallback((): string[] => {
    const formulas = new Set<string>();
    data.capitulos.forEach((cap) => {
      cap.compostos.forEach((comp) => {
        formulas.add(comp.formula);
      });
    });
    return Array.from(formulas).sort();
  }, [data]);

  /**
   * Obtém todas as geometrias únicas
   */
  const getTodasAsGeometrias = useCallback((): string[] => {
    const geometrias = new Set<string>();
    data.capitulos.forEach((cap) => {
      cap.compostos.forEach((comp) => {
        geometrias.add(comp.geometria);
      });
    });
    return Array.from(geometrias).sort();
  }, [data]);

  /**
   * Valida a estrutura de um composto
   */
  const validarComposto = useCallback(
    (composto: Compound): CompoundValidation => {
      const erros: string[] = [];
      const avisos: string[] = [];

      // Validações obrigatórias
      if (!composto.id) erros.push('ID do composto é obrigatório');
      if (!composto.nome) erros.push('Nome do composto é obrigatório');
      if (!composto.formula) erros.push('Fórmula química é obrigatória');
      if (!composto.geometria) erros.push('Geometria molecular é obrigatória');
      if (!composto.polaridade) erros.push('Polaridade é obrigatória');

      // Validações de modelo 3D
      if (!composto.modelo3D) {
        avisos.push('Composto não possui modelo 3D');
      } else {
        if (!composto.modelo3D.pathGLB) {
          avisos.push('Modelo 3D não possui path GLB definido');
        }
        if (!composto.modelo3D.formato) {
          erros.push('Formato do modelo 3D é obrigatório');
        }
      }

      // Validações de metadados
      if (!composto.capitulo) erros.push('Número do capítulo é obrigatório');
      if (composto.ordem === undefined || composto.ordem === null) {
        erros.push('Ordem de exibição é obrigatória');
      }

      return {
        valido: erros.length === 0,
        erros,
        avisos,
      };
    },
    []
  );

  /**
   * Obtém estatísticas dos compostos
   */
  const obterEstatisticas = useCallback(() => {
    const todosCapsitulosStat = data.capitulos;
    const todosCompostos = data.capitulos.flatMap((cap) => cap.compostos);
    const polares = todosCompostos.filter((c) => c.polaridade === 'Polar');
    const apolares = todosCompostos.filter((c) => c.polaridade === 'Apolar');
    const comModelo3D = todosCompostos.filter((c) => c.modelo3D);

    return {
      totalCapitulos: todosCapsitulosStat.length,
      totalCompostos: todosCompostos.length,
      compostosPolares: polares.length,
      compostosApolares: apolares.length,
      compostosComModelo3D: comModelo3D.length,
      percentualComModelo3D: (
        (comModelo3D.length / todosCompostos.length) *
        100
      ).toFixed(2),
    };
  }, [data]);

  /**
   * Busca compostos por texto (nome, fórmula ou ID)
   */
  const buscarCompostos = useCallback(
    (termo: string): Compound[] => {
      const termoLower = termo.toLowerCase();
      const resultado: Compound[] = [];

      data.capitulos.forEach((cap) => {
        cap.compostos.forEach((comp) => {
          if (
            comp.nome.toLowerCase().includes(termoLower) ||
            comp.formula.toLowerCase().includes(termoLower) ||
            comp.id.toLowerCase().includes(termoLower) ||
            (comp.nomeCurto &&
              comp.nomeCurto.toLowerCase().includes(termoLower))
          ) {
            resultado.push(comp);
          }
        });
      });

      return resultado;
    },
    [data]
  );

  return {
    // Métodos de busca
    getCompostsByCapitulo,
    getCompostById,
    getCompostByName,
    getCompostByFormula,
    filtrarCompostos,
    buscarCompostos,

    // Métodos de listagem
    getTodasAsFormulas,
    getTodasAsGeometrias,

    // Métodos de validação e análise
    validarComposto,
    obterEstatisticas,

    // Dados brutos
    todosOsCapitulos: data.capitulos,
  };
};

/**
 * Hook secundário para trabalhar com um capítulo específico
 */
export const useCapituloCompostos = (numeroCapitulo: number) => {
  const { getCompostsByCapitulo } = useCompounds();

  const compostos = useMemo(() => {
    return getCompostsByCapitulo(numeroCapitulo);
  }, [numeroCapitulo, getCompostsByCapitulo]);

  const capitulo = useMemo(() => {
    const data = compoundsData as { capitulos: CapituloCompounds[] };
    return data.capitulos.find((cap) => cap.numero === numeroCapitulo);
  }, [numeroCapitulo]);

  return {
    capitulo,
    compostos,
    totalCompostos: compostos.length,
  };
};

/**
 * Hook para buscar um composto específico
 */
export const useComposto = (id: string) => {
  const { getCompostById, validarComposto } = useCompounds();

  const composto = useMemo(() => {
    return getCompostById(id);
  }, [id, getCompostById]);

  const validacao = useMemo(() => {
    if (!composto) {
      return {
        valido: false,
        erros: ['Composto não encontrado'],
        avisos: [],
      };
    }
    return validarComposto(composto);
  }, [composto, validarComposto]);

  return {
    composto,
    validacao,
    carregado: !!composto,
    valido: validacao.valido,
  };
};
