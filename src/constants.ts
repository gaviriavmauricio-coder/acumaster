import { Mission, CompendiumEntry } from "./types";

export const INITIAL_MISSIONS: Mission[] = [
  // Nivel 1: Fundamentos
  { id: "m1-1", title: "El Equilibrio Yin-Yang", description: "Identifica las manifestaciones de la dualidad en el cuerpo.", level: 1, xpReward: 50, status: "available", category: "Yin/Yang" },
  { id: "m1-2", title: "Ciclo de Generación (Sheng)", description: "Domina cómo un elemento nutre al siguiente.", level: 1, xpReward: 50, status: "available", category: "5 Elementos" },
  { id: "m1-3", title: "Ciclo de Control (Ke)", description: "Aprende a frenar los excesos energéticos.", level: 1, xpReward: 50, status: "available", category: "5 Elementos" },
  { id: "m1-4", title: "Las 5 Sustancias", description: "Diferencia entre Qi, Xue, Jinye, Shen y Jing.", level: 1, xpReward: 50, status: "available", category: "Sustancias Vitales" },
  { id: "m1-5", title: "Etiología: Factores Externos", description: "Los 6 excesos climáticos y su ataque al cuerpo.", level: 1, xpReward: 50, status: "available", category: "Etiología" },

  // Nivel 2: Meridianos
  { id: "m2-1", title: "El Pulmón y el Intestino Grueso", description: "Recorrido y puntos clave del elemento Metal.", level: 2, xpReward: 100, status: "available", category: "Meridianos" },
  { id: "m2-2", title: "Estómago y Bazo", description: "La raíz del Qi adquirido y su canalización.", level: 2, xpReward: 100, status: "available", category: "Meridianos" },
  { id: "m2-3", title: "Corazón e Intestino Delgado", description: "El emperador y el clasificador de lo puro.", level: 2, xpReward: 100, status: "available", category: "Meridianos" },
  { id: "m2-4", title: "Vejiga y Riñón", description: "El almacenamiento de la esencia y el agua.", level: 2, xpReward: 100, status: "available", category: "Meridianos" },
  { id: "m2-5", title: "Puntos Shu-Antiguos", description: "Pozos, Manantiales, Arroyos, Ríos y Mares.", level: 2, xpReward: 100, status: "available", category: "Puntos" },

  // Nivel 3: Zang-Fu
  { id: "m3-1", title: "Fisiología del Hígado", description: "El general que planifica y almacena la sangre.", level: 3, xpReward: 150, status: "available", category: "Zang-Fu" },
  { id: "m3-2", title: "El Bazo y la Transformación", description: "El transporte de la esencia de los alimentos.", level: 3, xpReward: 150, status: "available", category: "Zang-Fu" },
  { id: "m3-3", title: "Riñón: La Puerta de la Vida", description: "El Ming Men y el fuego ministerial.", level: 3, xpReward: 150, status: "available", category: "Zang-Fu" },
  { id: "m3-4", title: "Síndromes de Calor", description: "Identificación de patrones de exceso y deficiencia.", level: 3, xpReward: 150, status: "available", category: "Síndromes" },
  { id: "m3-5", title: "Relación Corazón-Riñón", description: "El eje Shao Yin y el equilibrio Fuego-Agua.", level: 3, xpReward: 150, status: "available", category: "Zang-Fu" },

  // Nivel 4: Práctica
  { id: "m4-1", title: "Diagnóstico por la Lengua", description: "Color, forma y saburra como mapas internos.", level: 4, xpReward: 200, status: "available", category: "Diagnóstico" },
  { id: "m4-2", title: "Los 28 Pulsos", description: "Sutilezas en la arteria radial.", level: 4, xpReward: 200, status: "available", category: "Diagnóstico" },
  { id: "m4-3", title: "Técnicas de Tonificación", description: "Cómo nutrir el vacío con la aguja.", level: 4, xpReward: 200, status: "available", category: "Punción" },
  { id: "m4-4", title: "Dispersión del Exceso", description: "Eliminar el estancamiento de Qi y Sangre.", level: 4, xpReward: 200, status: "available", category: "Punción" },
  { id: "m4-5", title: "Moxibustión y Ventosas", description: "Terapias de calor y succión.", level: 4, xpReward: 200, status: "available", category: "Técnicas" }
];

export const COMPENDIUM_DATA: CompendiumEntry[] = [
  // --- NIVEL 1: BIOENERGÉTICA Y FUNDAMENTOS ---
  {
    id: "t-chi-origen",
    title: "T'CHI: El Principio Único",
    category: "Bioenergética",
    level: 1,
    content: "Según Nogueira en su obra 'Acupuntura I', el T'CHI es el impulso motor universal que se manifiesta en diversos estados y formas (el T'CHI encierra la cifra 2 en su simbolismo). La materia es simplemente un estado de condensación de la energía y ésta, al dispersarse, retorna a su estado inicial. Dominar este Principio supone controlar sus manifestaciones en provecho del desarrollo armónico del ser humano.",
    metaphor: "Como el chispazo de vida en el embrión que inicia la frecuencia intrínseca del individuo.",
    example: "Toda enfermedad física ha experimentado previamente una fase de desorden energético sutil.",
    exercise: "¿Cómo definirías el T'CHI en relación con la materia según la visión bioenergética?"
  },
  {
    id: "ley-relatividad-yin-yang",
    title: "Ley de Relatividad Yin-Yang",
    category: "Fundamentos",
    level: 1,
    content: "Nada es puramente Yin o Yang; son fuerzas opuestas pero complementarias fruto del DAO. El Yin retiene al Yang para que no se expansione y el Yang protege al Yin alimentándolo. En fisiología, se observa en la alternancia bipolar de sistemas antagónicos como el Simpático-Parasimpático o la Sístole-Diástole.",
    metaphor: "Como un imán: por muchas divisiones que hagas, siempre tendrá dos polos (+ y -) inseparables.",
    example: "El día es Yang y la noche es Yin, pero existe el Yang en el Yin (medianoche al amanecer) y el Yin en el Yang (mediodía al crepúsculo).",
    exercise: "Si una persona tiene fiebre alta (calor) y agitación, ¿qué polaridad está predominando?"
  },
  {
    id: "ciclos-wu-xing-avanzado",
    title: "Dinámica de los 5 Movimientos",
    category: "5 Elementos",
    level: 1,
    content: "WU XING rige las reglas de acción mutua y equilibrio. Sheng (Generación): La Madre nutre al Hijo (Madera alimenta Fuego). Ke (Control): El Abuelo domina al Nieto (Agua apaga Fuego). Patológicamente aparecen la Invasión (Cheng) y el Menosprecio (Wu), donde el exceso de un elemento ataca desmedidamente a otro.",
    metaphor: "Un sistema de pesos y contrapesos galáctico que mantiene la vida en movimiento constante.",
    example: "Si el Hígado (Madera) está en plenitud por cólera, invade al Bazo (Tierra), causando náuseas y vómitos.",
    exercise: "Si el Fuego es 'Hijo' de la Madera, ¿quién es la 'Madre' de la Madera?"
  },

  // --- NIVEL 2: ENERGÍAS HUMANAS Y MERIDIANOS ---
  {
    id: "energias-rong-wei-zong",
    title: "Trilogía: Rong, Wei y Zong",
    category: "Energías",
    level: 2,
    content: "Rong (Nutricia): Formada por alimentos y aire; circula por los meridianos nutriendo los sistemas. Wei (Defensiva): Energía purificada etérea que forma el 'halo energético' protector externo. Zong (Ancestral): El capital genético heredado en la concepción, irrecuperable y determinante de los impulsos de crecimiento (ciclos de 7 años en mujeres y 8 en hombres).",
    metaphor: "Zong es la batería original del coche, Rong es el combustible que añadimos y Wei es la carrocería protectora.",
    example: "El Wei Qi circula 25 veces por el exterior de día (Yang) y 25 veces por el interior (Zang-Fu) de noche (Yin).",
    exercise: "¿Qué energía crees que se debilita si una persona se resfría con cualquier corriente de aire?"
  },
  {
    id: "recalentadores-alquimia",
    title: "El Triple Recalentador (San Jiao)",
    category: "Fisiología",
    level: 2,
    content: "Shangjiao (Superior): Corazón y Pulmón, distribuye el Rong. Zhongjiao (Medio): Bazo y Estómago, la 'fábrica de los cereales'. Xiajiao (Inferior): Hígado, Riñón, Vejiga e Intestinos, gestiona el Wei y la eliminación. Regula el 'feed-back' orgánico-visceral para mantener la homeostasis.",
    metaphor: "Una caldera: el agua se calienta abajo, el vapor sube al centro y se distribuye como rocío arriba.",
    example: "El estancamiento en el recalentador medio produce flemas (Humedad-Tan) que nublan la mente (Shen).",
    exercise: "¿En qué recalentador situarías la función de los Riñones?"
  },

  // --- NIVEL 3: PSICONEUROACUPUNTURA (PNA) ---
  {
    id: "pna-mecanismo-integracion",
    title: "Mecanismo de Integración en PNA",
    category: "PNA",
    level: 3,
    content: "La PNA de Moltó entiende al ser humano como una RED cibernética interactiva. A diferencia del modelo occidental de 'archivadores' (especialidades aisladas), en PNA cualquier cambio en una 'coraza' Reichiana afecta a toda la estructura psique-soma-energía.",
    metaphor: "Un archivador configurado en red: tiras de un cajón y todos los demás vibran por los campos de fuerza.",
    example: "Un bloqueo en el anillo diafragmático (15RM) puede causar angustia y a su vez problemas digestivos crónicos.",
    exercise: "¿Por qué la PNA prefiere el concepto de 'Red' al de 'Archivador lineal'?"
  },
  {
    id: "las-3-formulas-pna",
    title: "Estrategia: Las 3 Fórmulas",
    category: "PNA",
    level: 3,
    content: "Fórmula Primaria: Punto determinado por la emoción predominante del sueño. Fórmula Secundaria: Basada en la diferenciación de patrones de la MTC (Mo-Alarma para Yang/Qi y Shu-Dorsal para Yin/Xue). Fórmula Terciaria: Puntos específicos enfocados al síntoma o sentimiento (ej. 7P + 3ID para el duelo).",
    metaphor: "Primaria es el software profundo (inconsciente), Secundaria el sistema operativo y Terciaria las herramientas de usuario.",
    example: "Para un vacío de sangre en Corazón, usaríamos C14 (Mo) y C15 (Shu) en la fórmula secundaria.",
    exercise: "Si un paciente tiene pesadillas recurrentes de terror, ¿qué Fase debemos tratar en la fórmula primaria?"
  },

  // --- NIVEL 4: DIAGNÓSTICO Y PUNTOLOGÍA PSIQUIÁTRICA ---
  {
    id: "puntos-maestros-shen",
    title: "Puntos Maestros del Shen",
    category: "Psiquiatría",
    level: 4,
    content: "20DM (Bai Hui): Conexión con el Cosmos (Campo Punto Cero) y aumento del margen de tolerancia. 17RM (Shanzhong): 'Punto Potencia Hombre', calma la angustia y opresión torácica. 4IG (Hegu): Limpiador emocional post-catarsis. 12RM (Zhongwan): Fundamental para normalizar rasgos de personalidad.",
    metaphor: "Las llaves de la cerradura de la mente: el 17RM es el 'Lorazepam' natural del cuerpo.",
    example: "En un ataque de pánico se usa la combinación MC3 + SJ10 + C4 + C7 + MC7 + P10.",
    exercise: "¿Qué punto usarías para una persona que no puede expresar lo que siente (nudo en la garganta)?"
  },
  {
    id: "anillos-reich-mtc",
    title: "Anillos de Reich en MTC",
    category: "PNA",
    level: 4,
    content: "La PNA integra los 7 anillos de Reich con la acupuntura: 1. Ocular (20DM/Yintang). 2. Oral (24RM). 3. Cervical (22-23RM). 4. Torácico (17RM). 5. Diafragmático (15RM). 6. Abdominal (12RM). 7. Pélvico (6RM/1RM). El desbloqueo de estos anillos libera corazas musculares y emociones reprimidas.",
    metaphor: "Como anillos de un árbol: cada capa guarda historias de represión o traumas no resueltos.",
    example: "La tensión en el anillo pélvico (1RM) está ligada a inseguridad básica y bloqueos del Chakra Raíz.",
    exercise: "¿Qué centro del Shen punturarías para liberar el anillo torácico relacionado con la tristeza profunda?"
  },
  {
    id: "planos-energeticos",
    title: "Planos Energéticos y Bipolaridad",
    category: "Bioenergética",
    level: 3,
    content: "Los 12 meridianos se agrupan en 6 Planos Energéticos que actúan como bisagras entre el exterior y el interior: Tai Yang (V-ID), Yang Ming (E-IG), Shao Yang (VB-SJ), Tai Yin (B-P), Shao Yin (R-C) y Jue Yin (H-MC). Cada plano tiene una función de ajuste térmico y presurización.",
    metaphor: "Como las capas de una cebolla que protegen el núcleo central de las agresiones climáticas.",
    example: "El plano Yang Ming (Estómago-IG) es el más rico en Qi y Sangre, siendo fundamental en procesos febriles.",
    exercise: "¿Qué dos órganos componen el eje Shao Yin?"
  },
  {
    id: "campo-punto-cero",
    title: "20DM y el Campo Punto Cero",
    category: "PNA",
    level: 4,
    content: "El punto 20DM (Bai Hui) no solo es 'Cien reuniones', sino el punto de contacto con el Campo Punto Cero o Vacío Cuántico según la PNA. Su estimulación permite elevar el margen de tolerancia a la frustración y reconectar al individuo con su propósito vital.",
    metaphor: "La antena parabólica que sintoniza la frecuencia del Cosmos con la vibración biológica.",
    example: "En cuadros de depresión profunda o desorientación vital, el 20DM es el primer paso para la reconexión.",
    exercise: "Localiza el 20DM en la coronilla. ¿Cómo te sientes al presionarlo suavemente?"
  },
  {
    id: "pna-5-capas",
    title: "Teoría de las 5 Capas de Descarga",
    category: "PNA",
    level: 3,
    content: "La PNA propone que las emociones no resueltas se descargan a través de 5 capas: 1. Psicológica, 2. Energética (Meridianos), 3. Funcional (Zang-Fu), 4. Orgánica (Lesión física) y 5. Estructural. Tratar en capas superficiales previene la enfermedad degenerativa.",
    metaphor: "Un pararrayos: la terapia desvía el rayo emocional antes de que queme la estructura de la casa.",
    example: "Una rabia contenida (Capa 1) se convierte en bloqueo de Qi de Hígado (Capa 2) antes de ser una gastritis (Capa 3).",
    exercise: "¿En qué capa crees que se encuentra una emoción que ya está causando dolor físico?"
  },
  {
    id: "puntos-xi-profundos",
    title: "Puntos Xi: El Desbloqueo Agudo",
    category: "Puntos",
    level: 2,
    content: "Los puntos Xi son 'lugares de reunión de la energía y la sangre'. Se utilizan en casos de dolor agudo u obstrucciones severas en los meridianos. Ejemplos: 6P (Kongzui) para pulmón, 4MC (Ximen) para el corazón.",
    metaphor: "Como válvulas de alivio que liberan la presión de una tubería a punto de estallar.",
    example: "En una crisis de asma aguda con dolor torácico, el punto 6P puede ser vital.",
    exercise: "Si hay un dolor punzante en el estómago, ¿qué punto Xi buscarías (E34)?"
  },
  {
    id: "tecnica-nudo-raiz",
    title: "Técnica Nudo-Raíz (Jie-Gen)",
    category: "Punción",
    level: 4,
    content: "La raíz (Gen) se sitúa en los extremos (dedos del pie), y el Nudo (Jie) en las zonas de unión (cabeza para Yang, tórax/abdomen para Yin). Esta técnica permite regular planos completos (ej. Tai Yang) tratando la fuente y el destino.",
    metaphor: "Como tensar una cuerda desde ambos extremos para quitarle los nudos intermedios.",
    example: "Para una cefalea de plano Yang Ming, se puede usar la raíz (45E) y el nudo (7E/8E).",
    exercise: "¿Dónde se sitúa la 'Raíz' de un meridiano que termina en el pie?"
  },
  {
    id: "penetracion-energia-perversa-v2",
    title: "Vías de Penetración de la Noxa",
    category: "Bioenergética",
    level: 3,
    content: "Las energías perversas (Xie Qi) siguen un camino lógico de ataque: 1. Neutralización por Wei Qi en el halo protector. 2. Afectación de ramificaciones Tendinomusculares. 3. Bloqueo en punto Ting (Pozo). 4. Primera barrera en Punto King (Río). 5. Alteración del Luo Longitudinal. 6. Segunda barrera en Punto Ho (Mar). 7. Tercera barrera en Meridiano Distinto. 8. Afectación del órgano (Zang-Fu). Comprender este avance es vital para detener la enfermedad en etapas superficiales.",
    metaphor: "Las murallas de una fortaleza: cada nivel de defensa superado acerca al enemigo al centro de mando.",
    example: "Un dolor muscular súbito indica que el Wei Qi no pudo filtrar la noxa y ésta ha llegado a los Tendinomusculares.",
    exercise: "¿Cuál es el punto de entrada de la noxa en el sistema de meridianos?"
  },
  {
    id: "grandes-barreras-lan",
    title: "Las Grandes Barreras Lan Gan",
    category: "Fisiología",
    level: 4,
    content: "El organismo posee barreras de control de presión energética: La Gran Barrera del Daimai (Ecuador), la Barrera Pubiana (Trópico), la Barrera Diafragmática (17RM), la Barrera Cefálica (20DM) y la de los He Inferiores. Estas barreras regulan la homeostasis y evitan que los excesos de un nivel dañen a otros.",
    metaphor: "Diques reguladores que gestionan el caudal de un gran río para evitar desbordamientos.",
    example: "El uso del 17RM libera la barrera diafragmática, permitiendo que la energía del tórax descienda al abdomen.",
    exercise: "¿Qué punto es el maestro de la barrera diafragmática?"
  }
];
