/**
 * Tipos e dados para os capítulos
 */

export interface Molecula {
  id: string;
  nome: string;
  formula: string;
  geometria: string;
  polaridade: string;
  anguloLigacao: string;
  informacoes: string;
  percentualAtmosfera?: string;
  path?: string;
  /** Caminho para modelo 3D variante (representação alternativa) */
  variantPath?: string;
}

export interface Capitulo {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
  moleculas: Molecula[];
}

// ====== CAPÍTULO 1: Composição Atmosférica ======

const nitogenio: Molecula = {
  id: 'n2',
  nome: 'Nitrogênio',
  formula: 'N₂',
  geometria: 'Linear',
  polaridade: 'Apolar',
  anguloLigacao: '180°',
  percentualAtmosfera: '78%',
  informacoes:
    'A molécula de gás nitrogênio representa 78% da composição química da atmosfera. É uma molécula diatômica, apresenta uma ligação tripla entre os átomos de nitrogênio.',
  path: 'assets/models/nitrogenio.glb',
};

const oxigenio: Molecula = {
  id: 'o2',
  nome: 'Oxigênio',
  formula: 'O₂',
  geometria: 'Linear',
  polaridade: 'Apolar',
  anguloLigacao: '180°',
  percentualAtmosfera: '21%',
  informacoes:
    'O gás oxigênio é o segundo componente em maior quantidade presente na atmosfera, cerca de 21%. Apresenta-se sob a forma de uma molécula diatômica, formada por uma ligação dupla entre os átomos de oxigênio. O gás oxigênio reage com algumas substâncias dando origem a óxidos como CO₂, SO₂ e NO₂.',
  path: 'assets/models/oxigenio.glb',
};

const argonio: Molecula = {
  id: 'ar',
  nome: 'Argônio',
  formula: 'Ar',
  geometria: 'Átomo único, portanto não forma molécula. (Não aplicável)',
  polaridade: 'Não aplicável',
  anguloLigacao: 'Não aplicável',
  percentualAtmosfera: '0,093%',
  informacoes:
    'O argônio é uma substância gasosa presente na atmosfera com 0,093% da sua composição. É um gás nobre e por apresentar camada de valência completa é inerte.',
  path: 'assets/models/argonio.glb',
};

export const capitulo1: Capitulo = {
  id: 'cap1',
  numero: 1,
  titulo: 'Composição Atmosférica',
  descricao:
    'Estude os principais gases que compõem nossa atmosfera e suas características químicas.',
  moleculas: [nitogenio, oxigenio, argonio],
};

// ====== CAPÍTULO 2: Compostos Químicos e Seus Impactos ======

const dioxidoEnxofre: Molecula = {
  id: 'so2',
  nome: 'Dióxido de Enxofre',
  formula: 'SO₂',
  geometria: 'Angular',
  polaridade: 'Polar',
  anguloLigacao: '119°',
  informacoes:
    'O dióxido de enxofre gasoso possui concentração variável na atmosfera e é produzido diretamente a partir da queima de combustíveis fósseis como gasolina, assim como de erupções vulcânicas. Apresenta o enxofre como átomo central e liga-se a dois átomos de oxigênio para formar a molécula.',
  path: 'assets/models/dioxido_enxofre.glb',
  variantPath: 'assets/models/dioxido_enxofre_2.glb',
};

const dioxidoNitrogenio: Molecula = {
  id: 'no2',
  nome: 'Dióxido de Nitrogênio',
  formula: 'NO₂',
  geometria: 'Angular',
  polaridade: 'Polar',
  anguloLigacao: '134°',
  informacoes:
    'O dióxido de nitrogênio gasoso não possui concentração fixa na atmosfera, sendo maior em áreas urbanas e pode ter origem natural ou artificial. Quando dissolvido na água presente na atmosfera, forma o ácido nítrico (HNO₃).',
  path: 'assets/models/dioxido_nitrogenio.glb',
  variantPath: 'assets/models/dioxido_nitrogenio_2.glb',
};

export const capitulo2: Capitulo = {
  id: 'cap2',
  numero: 2,
  titulo: 'Compostos Químicos e Seus Impactos',
  descricao:
    'Explore os poluentes atmosféricos e seus efeitos sobre a qualidade do ar.',
  moleculas: [dioxidoEnxofre, dioxidoNitrogenio],
};

// ====== CAPÍTULO 3: Efeitos na Atmosfera ======

// Gases do Efeito Estufa
const dioxidoCarbono: Molecula = {
  id: 'co2',
  nome: 'Dióxido de Carbono',
  formula: 'CO₂',
  geometria: 'Linear',
  polaridade: 'Apolar',
  anguloLigacao: '180°',
  informacoes:
    'O dióxido de carbono é considerado o principal responsável pelo efeito estufa e é oriundo da combustão do carvão, lenha e petróleo além de erupções vulcânicas. Sua concentração global tem aumentado trazendo, como consequência, o aumento da temperatura da Terra e modificações climáticas. Sua molécula apresenta o carbono como átomo central e dois átomos de oxigênio nas extremidades com ligações duplas.',
  path: 'assets/models/dioxido_carbono.glb',
};

const metano: Molecula = {
  id: 'ch4',
  nome: 'Metano',
  formula: 'CH₄',
  geometria: 'Tetraédrica',
  polaridade: 'Apolar',
  anguloLigacao: '109,5°',
  informacoes:
    'O metano também é considerado um causador do efeito estufa. Esse composto forma-se a partir da ligação de um átomo central de carbono com 4 átomos de hidrogênio por meio de ligações simples.',
  path: 'assets/models/metano.glb',
};

const oxidoNitroso: Molecula = {
  id: 'n2o',
  nome: 'Óxido Nitroso',
  formula: 'N₂O',
  geometria: 'Linear',
  polaridade: 'Levemente polar',
  anguloLigacao: '180° (N-N-O)',
  informacoes:
    'O óxido nitroso é um gás estufa e também um dos antecessores da destruição da camada de ozônio. É um gás emitido principalmente por fontes naturais através de ações bacterianas.',
  path: 'assets/models/oxido_nitroso.glb',
};

const agua: Molecula = {
  id: 'h2o',
  nome: 'Água',
  formula: 'H₂O',
  geometria: 'Angular',
  polaridade: 'Polar',
  anguloLigacao: '104,5°',
  informacoes:
    'Água em fase vapor é também considerada um gás estufa e também participa do ciclo hidrológico. Formada a partir da ligação de um átomo de oxigênio central com dois átomos de hidrogênio através de ligações simples.',
  path: 'assets/models/agua.glb',
};

// Compostos da Camada de Ozônio
const ozonio: Molecula = {
  id: 'o3',
  nome: 'Ozônio',
  formula: 'O₃',
  geometria: 'Angular',
  polaridade: 'Polar',
  anguloLigacao: '116,8°',
  informacoes:
    'O ozônio é uma substância gasosa formada a partir da ligação de 3 átomos de oxigênio por meio de ligações simples e dupla. O ozônio forma uma camada protetora pois impede que 95% da radiação ultravioleta atinja a superfície da Terra.',
  path: 'assets/models/ozonio.glb',
  variantPath: 'assets/models/ozonio2.glb',
};

const clorofluorcarbonos: Molecula = {
  id: 'cfc11',
  nome: 'Clorofluorcarbonos',
  formula: 'CFC-11 (CCl₃F)',
  geometria: 'Tetraédrica',
  polaridade: 'Polar',
  anguloLigacao: '109,5°',
  informacoes:
    'Substância gasosa responsável pela depleção da camada de ozônio na estratosfera. Ela é formada a partir de ligações simples do carbono que é o átomo central, com 3 átomos de cloro e 1 de flúor.',
  path: 'assets/models/clorofluorcarbono.glb',
};

export const capitulo3: Capitulo = {
  id: 'cap3',
  numero: 3,
  titulo: 'Efeitos na Atmosfera',
  descricao:
    'Estude os gases do efeito estufa e os compostos que afetam a camada de ozônio.',
  moleculas: [
    dioxidoCarbono,
    metano,
    oxidoNitroso,
    agua,
    ozonio,
    clorofluorcarbonos,
  ],
};

// ====== SUBCAPÍTULOS DO CAPÍTULO 3 ======

export const capitulo3a: Capitulo = {
  id: 'cap3a',
  numero: 3,
  titulo: 'Efeito Estufa',
  descricao: 'Conheça os principais gases responsáveis pelo efeito estufa.',
  moleculas: [dioxidoCarbono, metano, oxidoNitroso, agua],
};

export const capitulo3b: Capitulo = {
  id: 'cap3b',
  numero: 3,
  titulo: 'Camada de Ozônio',
  descricao: 'Estude os compostos que afetam a camada protetora de ozônio.',
  moleculas: [ozonio, clorofluorcarbonos],
};

// ====== CAPÍTULO 4: Preservação e Possíveis Soluções ======

export interface Solucao {
  id: string;
  texto: string;
}

export interface CapituloTexto {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
  introducao: string;
  solucoes: Solucao[];
}

export const capitulo4: CapituloTexto = {
  id: 'cap4',
  numero: 4,
  titulo: 'Preservação e Possíveis Soluções',
  descricao:
    'Estratégias e ações para mitigar a emissão de compostos poluentes e proteger o meio ambiente.',
  introducao:
    'Algumas soluções podem ser utilizadas com o objetivo de mitigar a emissão de compostos poluentes que trazem consequências devastadoras para o meio ambiente:',
  solucoes: [
    {
      id: 'sol1',
      texto:
        'A diminuição e/ou substituição de combustíveis fósseis por alternativas de fontes de energias limpas e renováveis',
    },
    {
      id: 'sol2',
      texto:
        'Redução da utilização de meios de transportes movidos a combustíveis fósseis por transportes menos poluentes como veículos elétricos ou bicicletas',
    },
    {
      id: 'sol3',
      texto: 'Incentivo à utilização de transportes coletivos',
    },
    {
      id: 'sol4',
      texto: 'Incentivo a redução de emissões de CO₂, como créditos de carbono',
    },
    {
      id: 'sol5',
      texto: 'Reflorestamento e conservação florestal',
    },
    {
      id: 'sol6',
      texto: 'Incentivos a práticas cotidianas individuais',
    },
    {
      id: 'sol7',
      texto:
        'Criação e adoção de políticas públicas assim como conscientização coletiva para diminuição de compostos poluentes',
    },
  ],
};

// ====== DADOS PARA EXPORTAR ======

export const CAPITULOS: Capitulo[] = [capitulo1, capitulo2, capitulo3];

export const MOLECULAS_MAP: Record<string, Molecula> = {
  n2: nitogenio,
  o2: oxigenio,
  ar: argonio,
  so2: dioxidoEnxofre,
  no2: dioxidoNitrogenio,
  co2: dioxidoCarbono,
  ch4: metano,
  n2o: oxidoNitroso,
  h2o: agua,
  o3: ozonio,
  cfc11: clorofluorcarbonos,
};
