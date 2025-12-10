# 🚀 Guia Rápido: Acessar Expo com IP da Máquina

## ✅ Configuração Aplicada

Seu Expo agora está rodando em **LAN mode** usando o IP da máquina em vez de `localhost`.

### IP da Sua Máquina

```
192.168.1.246
```

### URL de Acesso

```
exp://192.168.1.246:8082
```

---

## 📱 Como Acessar do Celular

### Via QR Code

1. Abra o terminal onde Expo está rodando
2. Procure pelo **QR Code**
3. Use o app **Expo Go** no celular para escanear
4. O app abrirá automaticamente

### Via Link Direto

1. Copie o link: `exp://192.168.1.246:8082`
2. Abra no app **Expo Go**
3. Ou paste na barra de endereço do navegador se tiver Expo instalado

### Via Localhost (mesmo computador)

```
http://localhost:8082
```

---

## 🔧 Comandos Úteis

### Iniciar com LAN Mode (IP da máquina)

```bash
npx expo start --lan
```

### Iniciar com Tunnel (melhor para fora da rede)

```bash
npx expo start --tunnel
```

### Iniciar com Localhost (só localhost)

```bash
npx expo start --localhost
```

### Iniciar com Port Customizado

```bash
npx expo start --lan --port 8090
```

---

## 📡 Diferença Entre Modos

| Modo          | URL                        | Quando Usar           | Alcance         |
| ------------- | -------------------------- | --------------------- | --------------- |
| **LAN**       | `exp://192.168.1.246:8082` | Desenvolvimento local | Mesma rede WiFi |
| **Tunnel**    | `exp://u.expo.dev/xxx`     | Fora da rede          | Internet públca |
| **Localhost** | `http://localhost:8082`    | Mesmo computador      | Só local        |

---

## ✨ Benefícios do LAN Mode

✅ Acessa do celular na mesma rede
✅ Testa de verdade no dispositivo
✅ Vê gestos e performance real
✅ Mais rápido que Tunnel

---

## 🆘 Se Não Funcionar

### Problema: "Não consegue conectar"

**Solução:**

1. Celular deve estar na **mesma rede WiFi**
2. Verifique firewall do Windows (pode bloquear)
3. Tente permitir `node.exe` no firewall

### Problema: "QR Code não escaneia"

**Solução:**

1. Verifique se Expo Go está instalado
2. Tente copiar o link manualmente
3. Use o Tunnel mode como fallback

### Problema: "Porta 8082 em uso"

**Solução:**

1. Expo escolhe automaticamente outra porta
2. Verifique qual porta no terminal
3. Ou use: `npx expo start --lan --port 9000`

---

## 📝 Nota: Arquivo app.json Atualizado

Adicionamos configuração `devClient` ao `app.json`:

```json
"devClient": {
  "scheme": "myapp"
}
```

Isso garante que o deep linking funcione corretamente no desenvolvimento.

---

## ✅ Status Atual

```
🟢 Expo rodando em LAN mode
🟢 IP: 192.168.1.246:8082
🟢 QR Code disponível
🟢 Pronto para testar no celular
```

---

**Próximo passo:** Escaneie o QR Code com Expo Go no celular para testar! 📱
