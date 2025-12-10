# 📁 Estrutura do Projeto QuímicaAPp

```
MILI/
│
├── 📁 app/                          # Aplicação React Native + Expo Router
│   ├── 📁 (tabs)/                   # Layout com abas (Expo Router group)
│   │   ├── 📄 _layout.tsx           # Layout das abas (Capítulos)
│   │   ├── 📄 index.tsx             # Home/Dashboard
│   │   ├── 📄 chapter1.tsx          # Cap 1: Composição Atmosférica
│   │   ├── 📄 chapter2.tsx          # Cap 2: Compostos Químicos
│   │   ├── 📄 chapter3.tsx          # Cap 3: Efeitos na Atmosfera
│   │   ├── 📄 introduction.tsx       # Introdução
│   │   └── 📄 +not-found.tsx        # Página 404
│   │
│   ├── 📄 _layout.tsx               # Layout raiz (navegação)
│   ├── 📄 index.tsx                 # Página inicial
│   └── 📄 +not-found.tsx            # 404
│
├── 📁 assets/                       # Recursos estáticos
│   └── 📁 images/                   # Imagens do projeto
│
├── 📁 components/                   # Componentes React reutilizáveis
│   ├── 📄 ChapterCard.tsx           # Card de capítulo
│   ├── 📄 ChapterHeader.tsx         # Cabeçalho do capítulo (otimizado)
│   ├── 📄 CompoundSelector.tsx      # Seletor de compostos
│   ├── 📄 InfoPanel.tsx             # Painel de informações
│   ├── 📄 ModelViewer.tsx           # Visualizador de modelo (placeholder)
│   ├── 📄 QuizModal.tsx             # Modal de quiz
│   ├── 📄 SimulationViewer.tsx      # Visualizador de simulação
│   ├── 📄 SolutionCard.tsx          # Card de solução
│   ├── 📄 MoleculaCard.tsx          # Card de molécula (novo)
│   └── 📄 MoleculaSelector.tsx      # Seletor de moléculas (novo)
│
├── 📁 constants/                    # Constantes e dados
│   ├── 📄 Colors.ts                 # Tema de cores
│   ├── 📄 Images.ts                 # Referências de imagens
│   └── 📄 ChapterContent.ts         # Dados de capítulos e moléculas
│
├── 📁 hooks/                        # Custom Hooks
│   └── 📄 useFrameworkReady.ts      # Hook de framework readiness
│
├── 📁 styles/                       # Estilos globais
│   └── 📄 AppStyle.ts               # Estilos da aplicação
│
├── 📁 docs/                         # 📚 DOCUMENTAÇÃO (NOVO)
│   ├── 📄 INDEX.md                  # Índice de documentação
│   ├── 📄 README.md                 # Visão geral
│   ├── 📄 QUICK_START.md            # Guia rápido
│   ├── 📄 IMPLEMENTATION_COMPLETE.md
│   ├── 📄 GUIDE_ADD_CHAPTERS.md
│   ├── 📄 CHAPTER2_COMPLETE.md
│   ├── 📄 CHAPTER3_COMPLETE.md
│   ├── 📄 DESIGN_IMPROVEMENTS.md
│   ├── 📄 FASE2_INDEX.md
│   ├── 📄 FASE2_PROGRESS.md
│   ├── 📄 FASE2_TASK1_LAZY_LOADING.md
│   ├── 📄 FASE2_TASK2_REACT_MEMO.md
│   ├── 📄 FASE2_TASK3_MODEL_CACHE.md
│   ├── 📄 FASE2_FINAL_SUMMARY.md
│   ├── 📄 FASE4_TASK1_COMPLETE.md
│   ├── 📄 EXPO_LAN_SETUP.md
│   ├── 📄 EXPO_SETUP_COMPLETE.md
│   ├── 📄 BENCHMARKS_REPORT.md
│   ├── 📄 PROJECT_STATUS_*.md       # Múltiplos relatórios de status
│   ├── 📄 RESTRUCTURING_*.md        # Documentos de reestruturação
│   └── ... (41 mais arquivos)
│
├── 📄 app.json                      # Configuração Expo
├── 📄 package.json                  # Dependências do projeto
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 expo-env.d.ts                 # Tipos ambiente Expo
├── 📄 .gitignore                    # Git ignore
├── 📄 .env (se existir)             # Variáveis de ambiente
│
└── 📁 node_modules/                 # Dependências instaladas (gitignored)
```

---

## 🗂️ Organização por Função

### 📱 Aplicação

```
app/
├── Layout principal + Rotas (Expo Router)
└── (tabs)/ - Estrutura com abas
    ├── Dashboard/Home
    ├── Capítulo 1 (Composição)
    ├── Capítulo 2 (Poluentes)
    ├── Capítulo 3 (Efeitos)
    └── Introdução
```

### 🧩 Componentes Reutilizáveis

```
components/
├── Apresentação (ChapterCard, ChapterHeader)
├── Moléculas (MoleculaCard, MoleculaSelector) ✨ NOVO
├── Visualização (ModelViewer, SimulationViewer)
├── Interação (QuizModal, CompoundSelector)
└── Informação (InfoPanel, SolutionCard)
```

### ⚙️ Configuração & Dados

```
constants/
├── Colors.ts        - Tema de cores (dark mode)
├── Images.ts        - Referências de assets
└── ChapterContent.ts - Dados de moléculas (3 chapters, 11 molecules)

styles/
└── AppStyle.ts - Estilos compartilhados

hooks/
└── useFrameworkReady.ts - Lógica compartilhada
```

### 📚 Documentação

```
docs/
├── Índices (INDEX.md, README.md)
├── Guias (QUICK_START.md, GUIDE_ADD_CHAPTERS.md)
├── Capítulos (CHAPTER*.md)
├── Fases (FASE2_*, FASE4_*.md)
├── Setup (EXPO_*.md)
├── Melhorias (DESIGN_*, IMPROVEMENTS_*.md)
├── Status (PROJECT_STATUS_*.md, RESTRUCTURING_*.md)
└── Relatórios (BENCHMARKS_REPORT.md, RELATORIO_*.md)
```

---

## 📊 Estatísticas do Projeto

| Categoria        | Quantidade             |
| ---------------- | ---------------------- |
| Capítulos        | 3                      |
| Moléculas        | 11                     |
| Componentes      | 11                     |
| Screens (Abas)   | 4 (Home + 3 Capítulos) |
| Documentos       | 48                     |
| Linhas de Código | ~3.500+                |

---

## 🎯 Próximos Passos

1. **Verificar docs/** 📖

   - Todos os `.md` estão organizados em `/docs`
   - Usar `docs/INDEX.md` como navegação central

2. **Adicionar Capítulo 4** (se necessário)

   - Seguir padrão em `docs/GUIDE_ADD_CHAPTERS.md`

3. **Phase 4 - Testes**
   - Consultar `docs/FASE4_*.md`

---

**Última atualização:** 10 de dezembro de 2025
**Estrutura:** ✅ Organizada
**Documentação:** ✅ Centralizada em /docs
