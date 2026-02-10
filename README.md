# QuímicaApp - Aplicativo Educacional de Realidade Aumentada

![Expo](https://img.shields.io/badge/Expo-53.0.19-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Viro React](https://img.shields.io/badge/Viro%20React-2.43.3-orange)

## 📋 Sobre o Projeto

O **QuímicaApp** é um aplicativo educacional desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC) que utiliza **Realidade Aumentada (RA)** para ensinar conceitos de química de forma interativa e imersiva. O aplicativo permite que estudantes visualizem modelos 3D de compostos químicos e moléculas em ambiente AR através da câmera do celular.

### 🎯 Objetivos

- Facilitar o aprendizado de química através de visualização 3D interativa
- Utilizar tecnologia AR para tornar conceitos abstratos mais tangíveis
- Proporcionar experiência educacional acessível em dispositivos móveis Android
- Adaptar controles de interface para diferentes fabricantes de smartphones

## 🛠️ Tecnologias Utilizadas

### Framework Principal

#### **Expo SDK 53.0.19**
Framework que facilita o desenvolvimento React Native, fornecendo:
- Build automatizado para Android/iOS
- Hot reload durante desenvolvimento
- Gerenciamento de dependências nativas
- APIs simplificadas para câmera, sensores e permissões

#### **React Native 0.79.5**
Biblioteca JavaScript para criar aplicativos nativos:
- Componentes nativos (View, Text, TouchableOpacity)
- Ponte JavaScript-Native para performance
- Nova arquitetura com Fabric e TurboModules
- Suporte a gestos nativos via PanResponder

#### **TypeScript 5.x**
Superset de JavaScript que adiciona tipagem estática:
- Detecção de erros em tempo de desenvolvimento
- Autocompletar inteligente
- Refatoração segura
- Documentação de tipos para APIs

### SDK de Realidade Aumentada

#### **@reactvision/react-viro 2.43.3**
SDK especializado em AR/VR para React Native:

**Componentes Principais:**
- `ViroARSceneNavigator`: Container principal que gerencia cenas AR
- `ViroARScene`: Cena individual onde objetos 3D são renderizados
- `ViroNode`: Nó de transformação (posição, rotação, escala) para objetos 3D
- `Viro3DObject`: Renderizador de modelos 3D (formatos .obj, .gltf, .glb)
- `ViroAmbientLight`: Iluminação ambiente para realismo dos modelos

**Funcionalidades:**
- Detecção automática de superfícies planas (ARPlaneDetection)
- Sistema de coordenadas 3D cartesiano
- Suporte a texturas e materiais PBR (Physically Based Rendering)
- Controle de câmera e perspectiva em tempo real
- Gestos nativos (pinça para zoom, rotação com 1-2 dedos)

**Sistema de Rotação:**
```typescript
// Rotação em graus [X, Y, Z]
<ViroNode rotation={[rotationX, rotationY, 0]}>
  <Viro3DObject source={modelo} />
</ViroNode>
```

### UI e Ícones

#### **lucide-react-native 0.475.0**
Biblioteca de ícones vetoriais otimizados:
- Ícones usados: ChevronUp, ChevronDown, ChevronLeft, ChevronRight
- SVG renderizado como componente React Native
- Personalização de tamanho e cor
- Performance otimizada para mobile

### Detecção de Dispositivos

#### **Platform API (React Native)**
Sistema nativo para identificar fabricante do dispositivo:

```typescript
const isXiaomiDevice = Platform.OS === 'android' && (
  Platform.constants?.Brand?.toLowerCase().includes('xiaomi') ||
  Platform.constants?.Manufacturer?.toLowerCase().includes('xiaomi') ||
  Platform.constants?.Model?.toLowerCase().includes('redmi')
);
```

**Razão:** Dispositivos Xiaomi/MIUI têm comportamento diferente para gestos multi-toque, exigindo controles por botões ao invés de gestos nativos.

## 🏗️ Arquitetura do Projeto

```
QuimicaAPp/
├── app/                          # Rotas Expo Router
│   ├── _layout.tsx              # Layout raiz (ThemeProvider, SafeArea)
│   ├── index.tsx                # Tela inicial
│   ├── introduction.tsx         # Introdução ao app
│   ├── chapter1.tsx             # Capítulo 1 - Compostos
│   ├── chapter2.tsx             # Capítulo 2 - Moléculas
│   └── chapter3.tsx             # Capítulo 3 - Simulações
│
├── components/                   # Componentes reutilizáveis
│   ├── CompoundARView.tsx       # ⭐ Visualizador AR principal
│   ├── CompoundSelector.tsx     # Seletor de compostos químicos
│   ├── InfoPanel.tsx            # Painel de informações do composto
│   ├── LoadingScreen.tsx        # Tela de carregamento
│   └── ErrorBoundary.tsx        # Tratamento de erros
│
├── constants/                    # Configurações estáticas
│   ├── ChapterContent.ts        # Conteúdo dos capítulos
│   └── Colors.ts                # Paleta de cores do tema
│
├── data/                         # Dados estruturados
│   └── compounds.json           # Base de dados de compostos químicos
│
├── assets/                       # Recursos estáticos
│   ├── models/                  # Modelos 3D (.glb)
│   └── images/                  # Imagens e ícones
│
├── types/                        # Definições TypeScript
│   └── compound.ts              # Interface de Compound
│
└── docs/                         # Documentação técnica
    ├── VIRO_AR_IMPLEMENTATION.md
    ├── VIRO_INTEGRATION_EXAMPLES.md
    └── VIRO_SUMMARY.md
```

## 🎮 Sistema de Controles Adaptativos

### Dispositivos Xiaomi/MIUI
**Problema:** Gestos multi-toque não funcionam corretamente devido a otimizações da MIUI.

**Solução:** Botões direcionais visíveis para controle manual:
- 🔼 Rotação vertical +15° (eixo X)
- 🔽 Rotação vertical -15° (eixo X)
- ◀️ Rotação horizontal -15° (eixo Y)
- ▶️ Rotação horizontal +15° (eixo Y)
- 🤏 Pinça com 2 dedos: Zoom (todos os dispositivos)

### Outros Dispositivos Android
**Controles nativos via PanResponder:**
- Pinça com 2 dedos: Zoom in/out (escala)
- Arrastar 2 dedos: Rotação livre no eixo Y
- Interface limpa sem botões extras

## 📊 Estrutura de Dados

### Interface de Composto Químico

```typescript
interface Compound {
  id: string;                    // Identificador único
  name: string;                  // Nome do composto (ex: "Água")
  formula: string;               // Fórmula química (ex: "H₂O")
  description: string;           // Descrição educacional
  modelPath: string;             // Caminho do modelo 3D
  category: 'organic' | 'inorganic' | 'molecule';
  properties: {
    molarMass: number;           // Massa molar (g/mol)
    boilingPoint?: number;       // Ponto de ebulição (°C)
    meltingPoint?: number;       // Ponto de fusão (°C)
    density?: number;            // Densidade (g/cm³)
  };
}
```

### Exemplo de compounds.json

```json
{
  "id": "h2o",
  "name": "Água",
  "formula": "H₂O",
  "description": "Composto essencial para vida, formado por 2 átomos de hidrogênio e 1 de oxigênio",
  "modelPath": require("../assets/models/h2o.glb"),
  "category": "inorganic",
  "properties": {
    "molarMass": 18.015,
    "boilingPoint": 100,
    "meltingPoint": 0,
    "density": 1.0
  }
}
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ e npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Smartphone Android com câmera
- Expo Go instalado no celular

### Passos de Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/QuimicaApp.git
cd QuimicaAPp

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start

# 4. No celular com Expo Go, escaneie o QR code exibido no terminal
```

### Compilação para Android (APK)

```bash
# Build de desenvolvimento
npx expo build:android

# Build de produção (requer conta Expo)
eas build --platform android --profile production
```

## 📱 Fluxo de Uso

1. **Tela Inicial:** Apresentação do app e objetivos educacionais
2. **Introdução:** Tutorial sobre como usar os controles AR
3. **Seleção de Capítulo:** Escolha entre Compostos, Moléculas ou Simulações
4. **Seleção de Composto:** Lista de compostos químicos disponíveis
5. **Visualização AR:** 
   - Aponte a câmera para uma superfície plana
   - Aguarde detecção automática do plano
   - Modelo 3D aparece na tela
   - Use controles para rotacionar e explorar
6. **Painel de Informações:** Dados científicos do composto selecionado

## 🧪 Capítulos Disponíveis

### Capítulo 1: Compostos Inorgânicos
- Água (H₂O)
- Gás Carbônico (CO₂)
- Amônia (NH₃)
- Ácido Sulfúrico (H₂SO₄)

### Capítulo 2: Moléculas Orgânicas
- Metano (CH₄)
- Etanol (C₂H₅OH)
- Glicose (C₆H₁₂O₆)
- Benzeno (C₆H₆)

### Capítulo 3: Simulações Interativas
- Reações químicas animadas
- Ligações moleculares em tempo real

## 🔧 Resolução de Problemas

### Metro Bundler Cache

Se encontrar erros de "já declarado" ou "duplicate declaration":

```bash
npx expo start --clear
```

### Permissões de Câmera

O app solicita automaticamente permissão de câmera. Se negada, vá em:
**Configurações > Apps > QuímicaApp > Permissões > Câmera**

### Modelos 3D não carregam

- Verifique conexão de internet (modelos podem estar em CDN)
- Confirme formato do arquivo (.glb recomendado)
- Verifique caminho em `compounds.json`

## 📚 Documentação Técnica

Para detalhes de implementação, consulte:

- [docs/VIRO_AR_IMPLEMENTATION.md](docs/VIRO_AR_IMPLEMENTATION.md) - Guia de implementação do Viro SDK
- [docs/VIRO_INTEGRATION_EXAMPLES.md](docs/VIRO_INTEGRATION_EXAMPLES.md) - Exemplos de código
- [docs/VIRO_SUMMARY.md](docs/VIRO_SUMMARY.md) - Resumo das funcionalidades

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** com os seguintes objetivos acadêmicos:

1. Demonstrar viabilidade de AR em educação científica
2. Comparar eficácia de aprendizado com métodos tradicionais
3. Avaliar usabilidade em diferentes dispositivos móveis
4. Propor metodologia replicável para outras disciplinas

### Metodologia de Desenvolvimento

- **Fase 1:** Pesquisa bibliográfica sobre AR educacional
- **Fase 2:** Prototipagem com Viro SDK e testes de viabilidade
- **Fase 3:** Implementação de controles adaptativos (Xiaomi)
- **Fase 4:** Otimização de performance e cache de modelos
- **Fase 5:** Testes de usabilidade com estudantes

## 👥 Contribuindo

Este é um projeto acadêmico, mas sugestões são bem-vindas:

1. Fork o repositório
2. Crie uma branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Contato

Desenvolvedor: [Seu Nome]  
Email: [seu.email@exemplo.com]  
Universidade: [Nome da Universidade]  
Orientador: [Nome do Orientador]

---

**Desenvolvido com ❤️ usando Expo + Viro React**
