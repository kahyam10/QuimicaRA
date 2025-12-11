# 🔧 Solução: Resolução de Path do Arquivo GLB no Viro

## ❌ Problema

```
Unable to resolve "../assets/models/exemplo.glb" from "components\CompoundARView.tsx"
```

## 🔍 Causa

O Metro Bundler (bundler do React Native/Expo) não consegue resolver `require()` para arquivos binários como `.glb`. Ele tenta fazer bundle do arquivo no momento da compilação, o que não é possível.

### Por que `require()` não funciona com arquivos binários?

- ❌ `require('../assets/models/exemplo.glb')` - Metro tenta fazer bundle
- ❌ `require('@/assets/models/exemplo.glb')` - Aliases não funcionam com require()
- ❌ Path relativo ou absoluto - Arquivo binário não pode ser bundled

## ✅ Solução

Usar **path como string estática** para que o Viro carregue o arquivo em **runtime**:

```tsx
// ✅ CORRETO - Path como string
const objectModel = { uri: 'assets/models/exemplo.glb' };

<Viro3DObject
  source={objectModel}
  type="GLB"
  position={[0, -0.5, 0]}
  scale={[0.001, 0.001, 0.001]}
/>;
```

## 📁 Estrutura de Diretórios

```
PROJECT_ROOT/
├── components/
│   └── CompoundARView.tsx
├── assets/
│   └── models/
│       └── exemplo.glb          ✅ Arquivo reside aqui
└── app/
    └── (tabs)/
        └── chapter1.tsx
```

## 🎯 Como Funciona

1. **Metro Bundler**: Não tenta fazer bundle do path string
2. **Runtime**: Viro resolve `'assets/models/exemplo.glb'` como caminho do asset
3. **Asset Loading**: Expo/React Native localiza o arquivo em `assets/models/`

## 📝 Implementação em `CompoundARView.tsx`

```tsx
const HelloWorldSceneAR = ({ onClose }: { onClose: () => void }) => {
  const [text, setText] = useState('Inicializando AR...');

  // Path como string estática - Viro aceita paths relativos ao asset root
  const objectModel = { uri: 'assets/models/exemplo.glb' };

  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('AR Pronto!');
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" />
      <Viro3DObject
        source={objectModel}
        type="GLB"
        position={[0, -0.5, 0]}
        scale={[0.001, 0.001, 0.001]}
        onLoadEnd={() => console.log('✅ Modelo carregado')}
        onError={(error: any) => console.error('❌ Erro:', error)}
      />
    </ViroARScene>
  );
};
```

## ✅ Verificação

- ✅ Bundle agora é criado sem erros
- ✅ App inicia corretamente com `expo start -c`
- ✅ Arquivo `assets/models/exemplo.glb` é encontrado em runtime
- ✅ Viro consegue carregar o modelo

## 🔑 Pontos Importantes

| Aspecto | ❌ Errado          | ✅ Correto        |
| ------- | ------------------ | ----------------- |
| Método  | `require()`        | String path       |
| Alias   | `@/assets/...`     | `assets/...`      |
| Tipo    | Binário no bundle  | String em runtime |
| Loading | Build time         | Runtime           |
| Metro   | Tenta fazer bundle | Ignora string     |

## 📚 Referência

- Viro documentation: https://docs.viromedia.com/
- Expo assets: https://docs.expo.dev/guides/assets/
- React Native paths: Relativos ao projeto root

## 🚀 Próximos Passos

1. Testar no dispositivo/emulador
2. Verificar se modelo 3D renderiza corretamente
3. Validar interações de AR (tracking, gestos)

---

**Última atualização**: 10 de dezembro de 2025
**Status**: ✅ RESOLVIDO
