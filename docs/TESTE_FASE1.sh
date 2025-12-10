#!/bin/bash
# Script de Testes para Validar Otimizações Fase 1

echo "╔════════════════════════════════════════════════════════════════════════════════╗"
echo "║                        TESTES - FASE 1 OTIMIZAÇÕES                            ║"
echo "╚════════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para testar
test_feature() {
    local name=$1
    local test_cmd=$2
    
    echo -n "Testando $name... "
    if eval "$test_cmd" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSOU${NC}"
        return 0
    else
        echo -e "${RED}❌ FALHOU${NC}"
        return 1
    fi
}

# Testes
echo "🧪 TESTE 1: Error Boundary Existe"
test_feature "Arquivo ErrorBoundary" "[ -f 'components/ErrorBoundary.tsx' ]"

echo ""
echo "🧪 TESTE 2: Types Definidos"
test_feature "Arquivo types/index.ts" "[ -f 'types/index.ts' ]"
test_feature "Arquivo utils/validators.ts" "[ -f 'utils/validators.ts' ]"

echo ""
echo "🧪 TESTE 3: Error Tracking Configurado"
test_feature "Arquivo sentry.ts" "[ -f 'utils/sentry.ts' ]"

echo ""
echo "🧪 TESTE 4: Layout Modificado"
test_feature "app/_layout.tsx contém ErrorBoundary" "grep -q 'ErrorBoundary' 'app/_layout.tsx'"

echo ""
echo "🧪 TESTE 5: ModelViewer Otimizado"
test_feature "ModelViewer contém dispose" "grep -q 'dispose()' 'components/ModelViewer.tsx'"

echo ""
echo "╔════════════════════════════════════════════════════════════════════════════════╗"
echo "║                           PRÓXIMAS ETAPAS                                     ║"
echo "╚════════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "1. Iniciar aplicação:"
echo "   $ npm run dev"
echo ""
echo "2. Testar Error Boundary:"
echo "   - Abra um componente"
echo "   - Adicione: throw new Error('Teste!');"
echo "   - Você deve ver a UI de fallback"
echo ""
echo "3. Verificar Types:"
echo "   $ tsc --noEmit"
echo ""
echo "4. Testar Memory Cleanup:"
echo "   - Abra ModelViewer"
echo "   - Monitore memória no DevTools"
echo "   - Feche - memória deve voltar"
echo ""
echo "✅ Testes Concluídos!"
