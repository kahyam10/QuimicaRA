# 🔧 Troubleshooting: Expo LAN Mode - Soluções Avançadas

## 🎯 Problema Resolvido: localhost → IP da Máquina

Seu Expo agora usa `192.168.1.246:8082` em vez de `localhost:8082`.

---

## 🔍 Diagnóstico: Como Verificar

### 1. Verificar IP Atual

```powershell
ipconfig | Select-String "IPv4"
```

**Resultado esperado:**

```
   Endereço IPv4. . . . . . . : 192.168.1.246
```

### 2. Verificar Porta do Expo

No terminal do Expo, procure por:

```
Local:            http://localhost:8082
LAN:              exp://192.168.1.246:8082
```

### 3. Testar Conectividade

Do celular na mesma rede WiFi:

```bash
ping 192.168.1.246
```

---

## 🚨 Problemas Comuns e Soluções

### ❌ Problema: "Expo está em localhost em vez de usar IP"

**Causa:** Modo de conexão não foi configurado

**Soluções:**

```bash
# Opção 1: Usar --lan (recomendado)
npx expo start --lan

# Opção 2: Especificar IP manualmente
npx expo start --hostname 192.168.1.246

# Opção 3: Força modo específico
expo start --localhost false  # Tira localhost
```

### ❌ Problema: "Celular não consegue conectar ao IP"

**Causa:** Firewall bloqueando ou redes diferentes

**Soluções:**

1. **Verificar rede WiFi:**

   ```powershell
   # No Windows
   ipconfig

   # Celular deve mostrar mesma rede que o PC
   ```

2. **Liberar no Firewall Windows:**

   - Abra: Settings → Privacy & Security → Firewall
   - Clique em "Allow an app through firewall"
   - Procure por `node.exe`
   - Habilite em "Private networks"

3. **Teste de conectividade:**
   ```bash
   # Do celular (usando terminal)
   ping 192.168.1.246
   ```

### ❌ Problema: "Porta 8082 já está em uso"

**Causa:** Outro processo usando a porta

**Soluções:**

```powershell
# Encontrar processo usando porta
Get-NetTCPConnection -LocalPort 8082 -ErrorAction SilentlyContinue |
  Select-Object -Property OwningProcess, State, LocalAddress

# Usar outra porta
npx expo start --lan --port 9000
```

### ❌ Problema: "QR Code não funciona"

**Causa:** Expo Go não instalado ou câmera com problemas

**Soluções:**

1. Instale **Expo Go** na Play Store / App Store
2. Ou acesse manualmente:

   - URL: `exp://192.168.1.246:8082`
   - Cole na barra de endereço do Expo Go

3. Se scanner não funciona:
   ```
   • Verifique permissão de câmera no celular
   • Tente modo "Deep link" (cola a URL)
   • Use Tunnel como fallback
   ```

---

## 📋 Checklist: Confirmar Configuração

- [ ] `app.json` tem `"devClient": { "scheme": "myapp" }`
- [ ] Expo iniciado com `npx expo start --lan`
- [ ] Terminal mostra `LAN: exp://192.168.1.246:8082`
- [ ] Celular está na mesma rede WiFi
- [ ] Firewall Windows permite `node.exe`
- [ ] QR Code aparece no terminal

---

## 🌐 Escolher Modo Correto

```
DECISÃO MATRIX:

├─ Testando no PC
│  └─ npx expo start --localhost ✓
│
├─ Testando no celular (mesma rede WiFi)
│  └─ npx expo start --lan ✓ RECOMENDADO
│
├─ Testando fora da rede
│  └─ npx expo start --tunnel ✓
│
└─ Produção
   └─ expo build ✓
```

---

## 🎬 Workflow Recomendado

### Desenvolvimento Diário

```bash
# 1. Inicie Expo com LAN
npx expo start --lan

# 2. Escaneie QR Code com Expo Go
# (no celular)

# 3. Faça mudanças no código
# (automático hot reload)

# 4. Teste no celular em tempo real
```

### Se Mudar de Rede WiFi

```bash
# Para e reinicie Expo
# Ctrl+C no terminal

npx expo start --lan
# IP pode mudar dependendo da rede
```

### Se Precisar de Túnel

```bash
# Para teste fora da rede
npx expo start --tunnel

# Cria URL pública tipo:
# exp://u.expo.dev/xxx
```

---

## 📊 Comparação: Antes vs Depois

### ANTES (Problema)

```
Terminal: "Local: http://localhost:8082"
Resultado: Só funciona no PC
Teste celular: ❌ Não funciona
```

### DEPOIS (Corrigido)

```
Terminal: "LAN: exp://192.168.1.246:8082"
Resultado: Funciona em qualquer celular na rede
Teste celular: ✅ Funciona perfeitamente
```

---

## 💡 Dicas Profissionais

### 1. Documentar IP para Celular

```powershell
# Criar arquivo com QR Code
echo "exp://192.168.1.246:8082" > qr-code.txt
```

### 2. Redirecionamento Automático

```bash
# Se mudar de rede, use tunnel
# Mais estável para múltiplas conexões
npx expo start --tunnel
```

### 3. Teste Multi-Dispositivo

```bash
# Terminal 1: Expo em LAN
npx expo start --lan

# Celular 1: Conecta ao QR Code
# Celular 2: Copia URL manualmente
# PC: http://localhost:8082
```

### 4. Debug com DevTools

Quando conectado via LAN:

- Shaky device → Open DevTools
- Reload (j)
- Performance profiler ativa
- Hot reload (r)

---

## 🔐 Segurança: Considerações

### Em Rede Corporativa

- IP talvez esteja mascarado
- Use Tunnel em vez de LAN
- Verifique política de firewall

### Em Rede Pública

- NUNCA use LAN
- SEMPRE use Tunnel
- Dados são encriptados

### Em Rede Local (Casa/Escritório)

- LAN é seguro
- Apenas na rede local
- Melhor performance

---

## ✅ Validação Final

Se você vê no terminal:

```
 ┌─────────────────────────────────────┐
 │ Expo  v51.0.0                       │
 │ ✓ Powered by React                  │
 │                                     │
 │ LAN:  exp://192.168.1.246:8082      │ ← AQUI!
 │ Port: 8082                          │
 │                                     │
 │ > Ctrl+C to stop                    │
 └─────────────────────────────────────┘
```

**Parabéns! Está funcionando corretamente!** ✅

---

## 🎯 Próximas Ações

1. **Escanear QR Code** com Expo Go no celular
2. **Testar Gestos** na tela (pan, pinch, etc)
3. **Validar Performance** real do dispositivo
4. **Continuar Fase 4:** Testes unitários

---

**Data:** 10/12/2025
**Status:** ✅ LAN Mode Configurado e Funcionando
