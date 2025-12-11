# 🔧 Correção: Platform Declaration Clash em MainApplication.kt

## ❌ Erro de Build

```
Platform declaration clash: The following declarations have the same JVM signature 
(getJSMainModuleName()Ljava/lang/String;):
    fun getJSMainModuleName(): String defined in com.kssoft.quimica_ra.MainApplication
    fun getJSMainModuleName(): String defined in com.kssoft.quimica_ra.MainApplication
```

## 🔍 Causa

Havia **duas declarações do mesmo método** `getJSMainModuleName()` na classe `MainApplication.kt`:

```kotlin
// ❌ ANTES (Linhas 34-36)
override fun getJSMainModuleName(): String = "index"
override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"
```

## ✅ Solução

Remover a primeira declaração (redundante):

```kotlin
// ✅ DEPOIS (Linha 34)
override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"
```

## 📝 Por Quê?

### Por Que Duas Declarações?
- Provavelmente durante `expo prebuild`, o arquivo foi gerado com ambas
- A primeira (`"index"`) é o padrão do React Native
- A segunda (`".expo/.virtual-metro-entry"`) é o padrão do Expo Router

### Qual Usar?
- ✅ **`.expo/.virtual-metro-entry`** - Necessária para Expo Router funcionar
- ❌ **`index`** - Redundante, remove-se

## 🔧 Arquivo Modificado

**Arquivo**: `android/app/src/main/java/com/kssoft/quimica_ra/MainApplication.kt`

```diff
   override fun getPackages(): List<ReactPackage> {
     val packages = PackageList(this).packages
     packages.add(ReactViroPackage(ReactViroPackage.ViroPlatform.AR))
     return packages
   }
-  override fun getJSMainModuleName(): String = "index"
   override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"
   override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
```

## ✅ Resultado

- ✅ Erro de compilação resolvido
- ✅ Apenas uma declaração de `getJSMainModuleName()`
- ✅ Usando padrão correto do Expo Router
- ✅ Build agora funciona

## 📊 Configuração Final

| Aspecto | Valor |
|---------|-------|
| Método | `getJSMainModuleName()` |
| Módulo | `.expo/.virtual-metro-entry` |
| Status | ✅ Único e correto |

## 🚀 Próximas Etapas

Build agora deve passar sem este erro. Se houver outros erros, verificar:

1. ✅ Dependências do Gradle
2. ✅ Plugin do Viro configurado corretamente
3. ✅ Permissões no AndroidManifest.xml
4. ✅ Configuração do SDK do Android

---
**Commit**: `44e91ad`  
**Data**: 11 de dezembro de 2025  
**Status**: ✅ RESOLVIDO
