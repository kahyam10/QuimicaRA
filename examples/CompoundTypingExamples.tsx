/**
 * Exemplo de Uso Integrado do Sistema de Tipagem de Compostos
 * 
 * Este arquivo demonstra como usar o sistema completo de tipagem
 * de compostos químicos em um componente React Native
 */

import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useCompounds, useComposto, useCapituloCompostos } from '@/hooks/useCompounds';
import { CompoundService, GEOMETRIAS, POLARIDADES } from '@/services/CompoundService';
import { Compound } from '@/types/Compound';
import Colors from '@/constants/Colors';

/**
 * Exemplo 1: Listar todos os compostos de um capítulo
 */
export const CapituloCompostosExample = ({ numeroCapitulo = 1 }) => {
  const { capitulo, compostos } = useCapituloCompostos(numeroCapitulo);

  if (!capitulo) {
    return <Text>Capítulo não encontrado</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{capitulo.titulo}</Text>
      <Text style={styles.descricao}>{capitulo.descricao}</Text>

      {compostos.map((composto) => (
        <View key={composto.id} style={styles.compostCard}>
          <Text style={styles.nomeMolecula}>{composto.nome}</Text>
          <Text style={styles.formula}>{CompoundService.formatarFormula(composto.formula)}</Text>
          <View style={styles.propriedades}>
            <Text style={styles.propriedade}>📐 {composto.geometria}</Text>
            <Text style={styles.propriedade}>⚡ {composto.polaridade}</Text>
            <Text style={styles.propriedade}>∠ {composto.anguloLigacao}</Text>
          </View>
          <Text style={styles.informacoes}>{composto.informacoes}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

/**
 * Exemplo 2: Buscar e exibir detalhes de um composto
 */
export const CompostoDetalheExample = ({ compostId = 'n2' }) => {
  const { composto, valido } = useComposto(compostId);

  if (!valido || !composto) {
    return <Text>Composto não encontrado</Text>;
  }

  const cor = CompoundService.obterCorPorPropriedades(composto);
  const elementos = CompoundService.extrairElementos(composto.formula);
  const totalAtomos = CompoundService.contarAtomos(composto.formula);
  const resumo = CompoundService.gerarResumo(composto);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.headerCard, { backgroundColor: cor + '20' }]}>
        <Text style={styles.nomePrincipal}>{composto.nome}</Text>
        <Text style={[styles.formulaPrincipal, { color: cor }]}>
          {composto.formulaDisplay || composto.formula}
        </Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>🔬 Estrutura Química</Text>
        <View style={styles.dados}>
          <Text style={styles.label}>Geometria:</Text>
          <Text style={styles.valor}>{composto.geometria}</Text>

          <Text style={styles.label}>Polaridade:</Text>
          <Text style={styles.valor}>{composto.polaridade}</Text>

          <Text style={styles.label}>Ângulo de Ligação:</Text>
          <Text style={styles.valor}>{composto.anguloLigacao}</Text>

          <Text style={styles.label}>Ligações:</Text>
          <Text style={styles.valor}>{composto.ligacoes || 'Não especificado'}</Text>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>📊 Análise Atômica</Text>
        <View style={styles.dados}>
          <Text style={styles.label}>Elementos:</Text>
          <Text style={styles.valor}>{elementos.join(', ')}</Text>

          <Text style={styles.label}>Total de Átomos:</Text>
          <Text style={styles.valor}>{totalAtomos}</Text>

          <Text style={styles.label}>Tipo de Molécula:</Text>
          <Text style={styles.valor}>
            {CompoundService.isDiatomico(composto)
              ? 'Diatômica'
              : CompoundService.isTriatomico(composto)
                ? 'Triatômica'
                : 'Poliatômica'}
          </Text>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>ℹ️ Informações</Text>
        <Text style={styles.resumo}>{resumo}</Text>

        {composto.percentualAtmosfera && (
          <View style={styles.dadosAdicionais}>
            <Text style={styles.label}>Percentual na Atmosfera:</Text>
            <Text style={styles.valor}>{composto.percentualAtmosfera}</Text>
          </View>
        )}

        {composto.fonte && (
          <View style={styles.dadosAdicionais}>
            <Text style={styles.label}>Fonte:</Text>
            <Text style={styles.valor}>{composto.fonte}</Text>
          </View>
        )}

        {composto.efeitos && (
          <View style={styles.dadosAdicionais}>
            <Text style={styles.label}>Efeitos:</Text>
            <Text style={styles.valor}>{composto.efeitos}</Text>
          </View>
        )}
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>🎬 Modelo 3D</Text>
        <View style={styles.dados}>
          <Text style={styles.label}>Arquivo:</Text>
          <Text style={styles.valor}>{composto.modelo3D.nomeArquivo}</Text>

          <Text style={styles.label}>Caminho:</Text>
          <Text style={styles.valor}>{composto.modelo3D.pathGLB}</Text>

          <Text style={styles.label}>Escala:</Text>
          <Text style={styles.valor}>{composto.modelo3D.escala}</Text>

          <Text style={styles.label}>Formato:</Text>
          <Text style={styles.valor}>{composto.modelo3D.formato}</Text>

          {composto.modelo3D.animacao && (
            <>
              <Text style={styles.label}>Animação:</Text>
              <Text style={styles.valor}>
                {composto.modelo3D.animacao.tipo} ({composto.modelo3D.animacao.velocidade}s)
              </Text>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * Exemplo 3: Filtrar compostos por propriedades
 */
export const FiltrarCompostosExample = () => {
  const { filtrarCompostos, obterEstatisticas } = useCompounds();

  const polaresLinear = useMemo(
    () => filtrarCompostos({ polaridade: 'Polar', geometria: 'Linear' }),
    []
  );

  const apolares = useMemo(
    () => filtrarCompostos({ polaridade: 'Apolar', ativo: true }),
    []
  );

  const stats = useMemo(() => obterEstatisticas(), []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>📊 Filtros de Compostos</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statLabel}>Total de Compostos: {stats.totalCompostos}</Text>
        <Text style={styles.statLabel}>Polares: {stats.compostosPolares}</Text>
        <Text style={styles.statLabel}>Apolares: {stats.compostosApolares}</Text>
        <Text style={styles.statLabel}>Com Modelo 3D: {stats.compostosComModelo3D}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>⚡ Compostos Polares Lineares</Text>
        {polaresLinear.map((c) => (
          <Text key={c.id} style={styles.item}>
            • {c.nome} ({c.formula})
          </Text>
        ))}
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>🔵 Compostos Apolares</Text>
        {apolares.map((c) => (
          <Text key={c.id} style={styles.item}>
            • {c.nome} ({c.formula})
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

/**
 * Exemplo 4: Buscar compostos relacionados
 */
export const CompostosRelacionadosExample = ({ compostIdReferencia = 'n2' }) => {
  const { getCompostById, filtrarCompostos } = useCompounds();

  const compostRef = getCompostById(compostIdReferencia);
  if (!compostRef) return <Text>Composto não encontrado</Text>;

  const todosCapsitulos = filtrarCompostos({ ativo: true });
  const relacionados = CompoundService.obterCompostosRelacionados(compostRef, todosCapsitulos, 5);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>🔗 Compostos Relacionados</Text>

      <View style={styles.refCard}>
        <Text style={styles.nomeMolecula}>{compostRef.nome}</Text>
        <Text style={styles.formula}>{compostRef.formula}</Text>
      </View>

      <Text style={styles.tituloSecao}>Semelhantes por propriedades:</Text>

      {relacionados.map((composto) => {
        const score = CompoundService.compararCompostos(compostRef, composto);
        return (
          <View key={composto.id} style={styles.relacionadoCard}>
            <View style={styles.relacionadoHeader}>
              <Text style={styles.nomeMolecula}>{composto.nome}</Text>
              <Text style={styles.scoreLabel}>{score.toFixed(0)}% similar</Text>
            </View>
            <Text style={styles.formula}>{composto.formula}</Text>
            <View style={styles.propriedades}>
              <Text style={styles.propriedade}>📐 {composto.geometria}</Text>
              <Text style={styles.propriedade}>⚡ {composto.polaridade}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

/**
 * Exemplo 5: Busca com texto livre
 */
export const BuscaCompostosExample = () => {
  const { buscarCompostos } = useCompounds();
  const [termo, setTermo] = useState('');

  const resultados = useMemo(() => buscarCompostos(termo), [termo]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>🔍 Buscar Compostos</Text>

      <View style={styles.buscaInput}>
        <Text style={styles.label}>Digite o nome, fórmula ou ID:</Text>
        <Text style={styles.inputText}>{termo || 'Exemplo: nitro, CO2, so2'}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>
          Resultados: {resultados.length} encontrados
        </Text>

        {resultados.length === 0 ? (
          <Text style={styles.item}>Nenhum composto encontrado</Text>
        ) : (
          resultados.map((c) => (
            <View key={c.id} style={styles.resultadoItem}>
              <Text style={styles.nomeMolecula}>{c.nome}</Text>
              <Text style={styles.formula}>{c.formula}</Text>
              <Text style={styles.captituloLabel}>Capítulo {c.capitulo}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

// ============ ESTILOS ============

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  descricao: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  compostCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  headerCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  nomePrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  formulaPrincipal: {
    fontSize: 24,
    fontWeight: '600',
  },
  nomeMolecula: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  formula: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  propriedades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  propriedade: {
    fontSize: 12,
    color: Colors.text,
    backgroundColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  informacoes: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  secao: {
    marginBottom: 24,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  dados: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 8,
    marginBottom: 4,
  },
  valor: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  dadosAdicionais: {
    marginTop: 12,
  },
  resumo: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    backgroundColor: Colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  item: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    paddingLeft: 8,
  },
  refCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  relacionadoCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  relacionadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  buscaInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  resultadoItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  captituloLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 4,
  },
});
