export const BLOCK_TYPES = [
  { value: 'html', label: 'Texto' },
  { value: 'image', label: 'Imagen con pie' },
  { value: 'compare', label: 'Comparación antes / después' },
  { value: 'quote', label: 'Cita anonimizada' },
  { value: 'decision', label: 'Decisión (hallazgo → decisión)' },
  { value: 'gallery', label: 'Galería' },
  { value: 'split', label: 'Imagen con texto al lado' },
];

export const TEMPLATE_SECTIONS = [
  { title: 'Algo no estaba funcionando', hint: 'Contexto y reto.' },
  { title: 'La pregunta que guio el trabajo', hint: 'La pregunta que ordenó todo lo demás.' },
  { title: 'Lo que descubrimos', hint: 'Evidencia y hallazgos.' },
  {
    title: 'Las decisiones que marcaron el rumbo',
    hint: 'Hallazgo → decisión → por qué, y qué alternativa descartaste.',
  },
  { title: 'Así tomó forma', hint: 'Solución: pantallas, flujos o mapa de servicio.' },
  {
    title: 'Lo que pudimos comprobar',
    hint: 'Distingue resultados reales, evaluación del prototipo e hipótesis sin validar.',
  },
  { title: 'Lo que me llevo', hint: 'Aprendizaje y siguiente paso.' },
];

export const templateSections = () =>
  TEMPLATE_SECTIONS.map((s) => ({ title: s.title, blocks: [] }));

export function blockHasContent(block, preview = false) {
  if (!block) return false;
  switch (block.type) {
    case 'html':
      return !!block.content;
    case 'image':
      return !!(block.image || preview);
    case 'compare':
      return !!(block.before_image || block.after_image || preview);
    case 'quote':
      return !!block.quote;
    case 'decision':
      return !!(block.finding || block.decision || block.reason || block.alternative);
    case 'gallery':
      return (block.images || []).length > 0 || preview;
    case 'split':
      return !!(block.image || block.content || block.heading || preview);
    default:
      return false;
  }
}

export function visibleSections(sections, preview = false) {
  return (sections || []).filter((section) =>
    (section.blocks || []).some((block) => blockHasContent(block, preview))
  );
}

export const sectionAnchor = (index) => `caso-${index + 1}`;

export const sectionNumber = (index) => String(index + 1).padStart(2, '0');