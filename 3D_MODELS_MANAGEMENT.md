# 📦 Gerenciamento de Arquivos 3D (GLB, GLTF, etc)

## 🚨 Status Atual
- ✅ Arquivos `.glb` **REMOVIDOS** do repositório Git
- ✅ Adicionado ao `.gitignore` para não serem rastreados
- ✅ Arquivos continuam **localmente** em `assets/models/`

## 📁 Estrutura de Arquivos 3D

```
PROJECT_ROOT/
├── assets/
│   └── models/
│       └── exemplo.glb          ← Arquivo local (não commitado)
│       └── README.md            ← Instruções
└── src/
    └── obj/
        └── exemplo.glb          ← Backup local (não commitado)
```

## ❌ Por que NÃO usar Git para arquivos 3D?

### 1. **Tamanho de Arquivo**
```
exemplo.glb: ~45 MB
↓
Cada commit duplica a história
↓
Repositório cresce exponencialmente
```

### 2. **Performance**
- ❌ Clone/Pull fica muito lento
- ❌ Git não consegue fazer diff de binários
- ❌ Merges de binários são impossíveis

### 3. **Melhor Prática**
Arquivos binários grandes devem ser:
- 📦 Armazenados em **CDN** (CloudFlare, Bunny, etc)
- 📦 Armazenados em **Cloud Storage** (AWS S3, Azure Blob, etc)
- 📦 Armazenados em **Git LFS** (se absolutamente necessário)
- ✅ Versionados separadamente via releases/artifacts

## ✅ Padrão Correto

### Arquivo Local
```
assets/models/exemplo.glb (LOCAL ONLY)
↓
src/App.tsx: { uri: 'assets/models/exemplo.glb' }
↓
Expo/React Native localiza em runtime
```

### Arquivo em Produção
```
AWS S3 / CDN
↓
https://cdn.seu-site.com/models/exemplo.glb
↓
src/App.tsx: { uri: 'https://cdn.seu-site.com/models/exemplo.glb' }
```

## 🔧 Como Gerenciar Modelos 3D

### Para Desenvolvimento Local

1. **Colocar arquivo em `assets/models/`:**
   ```bash
   cp seu-modelo.glb assets/models/exemplo.glb
   ```

2. **Usar no código:**
   ```tsx
   const objectModel = { uri: 'assets/models/exemplo.glb' };
   ```

3. **Git ignora automaticamente:**
   ```bash
   git status
   # (Nenhum arquivo .glb aparece)
   ```

### Para Distribuição/Produção

1. **Fazer upload para CDN:**
   ```bash
   # AWS S3
   aws s3 cp assets/models/exemplo.glb s3://seu-bucket/models/exemplo.glb
   
   # Ou CloudFlare
   # Ou outro serviço de storage
   ```

2. **Atualizar código:**
   ```tsx
   // Ambiente de desenvolvimento
   const DEV_MODEL = 'assets/models/exemplo.glb';
   
   // Ambiente de produção
   const PROD_MODEL = 'https://cdn.seu-site.com/models/exemplo.glb';
   
   const objectModel = { uri: __DEV__ ? DEV_MODEL : PROD_MODEL };
   ```

## 📋 Checklist de Arquivos 3D

| Arquivo | Formato | Tamanho | Git | Local | CDN |
|---------|---------|---------|-----|-------|-----|
| `exemplo.glb` | Binary | ~45 MB | ❌ | ✅ | ⏳ Futura |
| `README.md` | Text | ~3 KB | ✅ | ✅ | N/A |

## 🔄 Se Você Clonar o Repositório

Após fazer `git clone`:

1. **Arquivo não estará em `assets/models/`:**
   ```bash
   ls assets/models/
   # Apenas README.md
   ```

2. **Adicionar arquivo manualmente:**
   ```bash
   # Obter de outro desenvolvedor via email/Slack
   # Ou fazer download de CDN (quando configurado)
   cp ~/downloads/exemplo.glb assets/models/
   ```

3. **Git não rastreará:**
   ```bash
   git status
   # Nada aparece (ignorado por .gitignore)
   ```

## 🚀 Próximos Passos

### Curto Prazo
- ✅ Arquivos 3D locais funcionando
- ✅ Git não rastreando binários

### Médio Prazo
- ⏳ Configurar upload automático para CDN
- ⏳ Criar script de sincronização de modelos
- ⏳ Documentar para novo desenvolvedor

### Longo Prazo
- ⏳ Integrar com pipeline CI/CD
- ⏳ Versionamento automático de modelos
- ⏳ Sistema de assets management

## 📚 Extensões do .gitignore

```gitignore
# Todos os formatos 3D comuns
*.glb      # GL Transmission Format (Binary)
*.gltf     # GL Transmission Format (ASCII)
*.obj      # Wavefront OBJ
*.mtl      # Material Template Library
*.fbx      # Autodesk FBX
*.dae      # COLLADA
*.blend    # Blender project
*.max      # 3ds Max
*.ma       # Maya ASCII
*.mb       # Maya Binary
*.usdz     # USDZ (Apple)
```

## 🎯 Resumo

| Aspecto | ❌ Antes | ✅ Agora |
|---------|---------|---------|
| `.glb` no Git | Sim (45 MB) | Não |
| `.gitignore` | Não tinha | Adicionado |
| Arquivo local | Sincronizado | Local only |
| Repositório | Grande | Pequeno |
| Clone/Pull | Lento | Rápido |
| Merges | Problemático | OK |

---
**Última atualização**: 10 de dezembro de 2025  
**Status**: ✅ CONFIGURADO
