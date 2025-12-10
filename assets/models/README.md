# 📁 Modelos 3D - Compostos Químicos

Esta pasta contém os modelos 3D dos compostos químicos em formato GLB.

## 📋 Compostos Necessários

Você precisa adicionar os seguintes arquivos GLB nesta pasta:

### Capítulo 1

- [ ] `h2o.glb` - Água
- [ ] `h2o_orbitals.glb` - Estrutura eletrônica da água (opcional)

### Capítulo 2

- [ ] `co2.glb` - Dióxido de Carbono
- [ ] `co.glb` - Monóxido de Carbono
- [ ] `o3.glb` - Ozônio

### Capítulo 3

- [ ] `nh3.glb` - Amônia
- [ ] `n2o.glb` - Óxido Nitroso
- [ ] `no2.glb` - Dióxido de Nitrogênio

## 🎯 Como Obter os Modelos

### Opção 1: Usar Blender (Recomendado)

1. Abrir Blender
2. Criar modelo molecular (ou usar plugin)
3. Exportar como GLB
   - File → Export As → glTF Binary (.glb)

### Opção 2: Usar Bibliotecas Online

- [Protein Data Bank](https://www.rcsb.org/) - Proteínas e moléculas
- [PubChem 3D Conformers](https://pubchem.ncbi.nlm.nih.gov/)
- [Sketchfab](https://sketchfab.com/) - Modelos 3D gratuitos

### Opção 3: Gerar com Python

```python
# Usando py3Dmol e Blender
import py3Dmol

# Carregar molécula e exportar como GLB
# (requer configuração adicional)
```

## 📦 Requisitos de Arquivo

### Tamanho

- ✅ Ideal: 1-5 MB
- ⚠️ Máximo: 10 MB
- ❌ Evitar: Acima de 10 MB

### Qualidade

- ✅ Polígonos: 10k - 50k
- ✅ Texturas: Comprimidas (JPEG/WebP)
- ✅ Formato: GLB (binário)

### Escala

- ✅ Modelo deve caber em 1m³
- ✅ Centro no origin (0, 0, 0)
- ✅ Sem escalas externas aplicadas

## 🧪 Como Testar um Modelo

1. Colocar arquivo GLB nesta pasta
2. Adicionar em um capítulo:

```tsx
<CompoundModelViewer
  compoundName="Água (H₂O)"
  modelPath="assets/models/h2o.glb"
  size="medium"
/>
```

3. Executar: `npm run ios` ou `expo start`
4. Clicar no botão PLAY para visualizar

## ⚙️ Validar Modelo GLB

Use esta ferramenta para verificar se o GLB é válido:
https://gltf-viewer.donmccurdy.com/

**Upload o arquivo para validação antes de usar no app.**

## 🎨 Nomes Recomendados

Use nomes consistentes em minúsculas e underscore:

```
✅ Correto:
h2o.glb
co2.glb
nh3.glb
no2.glb
h2o_orbitals.glb

❌ Incorreto:
H2O.glb
CO_2.glb
Ammonia.glb
```

## 📝 Documentação de Cada Composto

Após adicionar o modelo, documente no README do composto:

```markdown
### Molécula: Água (H₂O)

**Arquivo**: h2o.glb
**Polígonos**: 15,000
**Tamanho**: 2.3 MB
**Texturas**: Sim
**Origem**: Blender (auto-gerado)

**Escala no App**:

- scale: [0.001, 0.001, 0.001]
- position: [0, -0.5, 0]

**Tempo de Carregamento**: ~1.2s
```

## 🔗 Próximos Passos

1. [ ] Preparar/obter todos os modelos GLB
2. [ ] Validar cada modelo com gltf-viewer
3. [ ] Colocar nesta pasta
4. [ ] Ajustar escala/posição se necessário
5. [ ] Integrar nos capítulos

---

**Status**: ⏳ Aguardando modelos 3D
**Prioridade**: 🔴 Alta (necessário para funcionar)

---

**Última atualização**: 10 de dezembro de 2025
