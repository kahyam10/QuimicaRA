#!/usr/bin/env node

/**
 * CHECKLIST FINAL - FASE 1 OTIMIZAÇÕES
 *
 * Use este arquivo para verificar se tudo está implementado corretamente.
 * Execute: node CHECKLIST_FINAL.js
 */

const fs = require('fs');
const path = require('path');

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// Função para imprimir seção
function section(title) {
  console.log('\n' + colors.bold + colors.cyan + '━'.repeat(80) + colors.reset);
  console.log(colors.bold + colors.cyan + title + colors.reset);
  console.log(colors.bold + colors.cyan + '━'.repeat(80) + colors.reset);
}

// Função para verificar arquivo
function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? colors.green + '✅' : colors.red + '❌';
  console.log(`${status} ${colors.reset} ${description}`);
  return exists;
}

// Função para verificar conteúdo
function checkContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(
      `${colors.red}❌${colors.reset} ${description} (arquivo não encontrado)`
    );
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const found = content.includes(searchString);
  const status = found ? colors.green + '✅' : colors.red + '❌';
  console.log(`${status} ${colors.reset} ${description}`);
  return found;
}

// Main
console.log(
  colors.bold + colors.blue + '╔' + '═'.repeat(78) + '╗' + colors.reset
);
console.log(
  colors.bold +
    colors.blue +
    '║  CHECKLIST FINAL - FASE 1 OTIMIZAÇÕES                                      ║' +
    colors.reset
);
console.log(
  colors.bold + colors.blue + '╚' + '═'.repeat(78) + '╝' + colors.reset
);

let totalChecks = 0;
let passedChecks = 0;

// SEÇÃO 1: Arquivos Criados
section('1️⃣  ARQUIVOS CRIADOS');

const files = [
  ['components/ErrorBoundary.tsx', 'Error Boundary Component'],
  ['utils/sentry.ts', 'Error Tracking System'],
  ['types/index.ts', 'Type Definitions'],
  ['utils/validators.ts', 'Validation Functions'],
  ['RELATORIO_OTIMIZACOES.md', 'Optimization Report'],
  ['PROGRESSO_OTIMIZACAO_FASE1.md', 'Phase 1 Progress'],
  ['LEIA-ME-OTIMIZACAO.md', 'Quick Start Guide'],
  ['RESUMO_FASE1.txt', 'Phase 1 Summary'],
  ['ANTES_E_DEPOIS.md', 'Before/After Comparison'],
];

files.forEach(([file, desc]) => {
  if (checkFile(file, desc)) passedChecks++;
  totalChecks++;
});

// SEÇÃO 2: Modificações no Código
section('2️⃣  MODIFICAÇÕES NO CÓDIGO');

const modifications = [
  ['app/_layout.tsx', 'import { ErrorBoundary }', 'ErrorBoundary imported'],
  ['app/_layout.tsx', '<ErrorBoundary', 'ErrorBoundary integrated'],
  ['app/_layout.tsx', 'initErrorTracking', 'Error tracking initialized'],
  [
    'components/ModelViewer.tsx',
    'animationFrameId',
    'Animation frame ref added',
  ],
  ['components/ModelViewer.tsx', 'dispose()', 'Geometry/Material disposal'],
  [
    'components/ModelViewer.tsx',
    'cancelAnimationFrame',
    'Animation frame cleanup',
  ],
  ['components/ModelViewer.tsx', 'geometry.dispose()', 'Three.js cleanup'],
];

modifications.forEach(([file, search, desc]) => {
  if (checkContent(file, search, desc)) passedChecks++;
  totalChecks++;
});

// SEÇÃO 3: Funcionalidades
section('3️⃣  FUNCIONALIDADES IMPLEMENTADAS');

const features = [
  [
    'components/ErrorBoundary.tsx',
    'class ErrorBoundary extends React.Component',
    'Error Boundary class',
  ],
  [
    'components/ErrorBoundary.tsx',
    'getDerivedStateFromError',
    'Error catching',
  ],
  ['utils/sentry.ts', 'class ErrorTracker', 'Error tracker class'],
  ['utils/sentry.ts', 'captureException', 'Exception capturing'],
  ['types/index.ts', 'enum ModelType', 'ModelType enum'],
  ['types/index.ts', 'interface Chapter', 'Chapter interface'],
  [
    'utils/validators.ts',
    'function validateModelViewerProps',
    'Props validation',
  ],
];

features.forEach(([file, search, desc]) => {
  if (checkContent(file, search, desc)) passedChecks++;
  totalChecks++;
});

// SEÇÃO 4: Documentação
section('4️⃣  DOCUMENTAÇÃO COMPLETA');

const docs = [
  [
    'RELATORIO_OTIMIZACOES.md',
    'Error Boundary Implementation',
    'Error Boundary docs',
  ],
  [
    'RELATORIO_OTIMIZACOES.md',
    'Gerenciamento de Memória em Three.js',
    'Memory management docs',
  ],
  [
    'PROGRESSO_OTIMIZACAO_FASE1.md',
    'Fase 1 - Crítico (COMPLETO)',
    'Phase 1 completion',
  ],
  ['LEIA-ME-OTIMIZACAO.md', 'Como Usar', 'Usage instructions'],
  ['ANTES_E_DEPOIS.md', 'ANTES', 'Before/After guide'],
];

docs.forEach(([file, search, desc]) => {
  if (checkContent(file, search, desc)) passedChecks++;
  totalChecks++;
});

// RESUMO FINAL
section('📊 RESUMO FINAL');

const percentage = Math.round((passedChecks / totalChecks) * 100);
const percentColor =
  percentage === 100
    ? colors.green
    : percentage >= 80
    ? colors.yellow
    : colors.red;

console.log(
  `\n${colors.bold}Total de verificações: ${totalChecks}${colors.reset}`
);
console.log(
  `${colors.bold}Verificações aprovadas: ${colors.green}${passedChecks}${colors.reset}`
);
console.log(
  `${colors.bold}Percentual de conclusão: ${percentColor}${percentage}%${colors.reset}\n`
);

// Status final
if (percentage === 100) {
  console.log(
    colors.bold +
      colors.green +
      '✅ FASE 1 - COMPLETA COM SUCESSO!' +
      colors.reset
  );
  console.log(colors.green + 'Todas as verificações passaram.' + colors.reset);
  console.log(colors.green + 'Você está pronto para a Fase 2.' + colors.reset);
  process.exit(0);
} else if (percentage >= 80) {
  console.log(
    colors.bold + colors.yellow + '⚠️  FASE 1 - QUASE COMPLETA' + colors.reset
  );
  console.log(
    colors.yellow +
      'Alguns itens ainda precisam ser verificados.' +
      colors.reset
  );
  process.exit(0);
} else {
  console.log(
    colors.bold + colors.red + '❌ FASE 1 - INCOMPLETA' + colors.reset
  );
  console.log(colors.red + 'Verifique os itens com erro acima.' + colors.reset);
  process.exit(1);
}
