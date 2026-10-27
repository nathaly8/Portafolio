/**
 * Contenido orientativo de la plantilla de caso.
 * Vive solo aquí: no se guarda en la base de datos ni se usa en casos reales.
 */
export const caseTemplateDemo = {
  title: 'Plantilla de caso · Vista previa',
  category: 'Disciplina',
  type: 'Tipo de trabajo',
  status: 'Borrador',
  role: 'Tu rol en el proyecto',
  team: 'Quiénes más participaron',
  duration: 'Duración del trabajo',
  summary:
    'Resumen de 30 segundos: qué era, qué hiciste tú y en qué quedó. Sirve para que alguien decida en medio minuto si quiere leer el caso completo.',
  contribution:
    'Mi aporte, separado del equipo: tu rol concreto, las decisiones que tomaste y las partes que llevaste de principio a fin.',
  cover_image: '',
  cover_alt: '',
  cover_caption: 'Pie de la portada: qué se ve y por qué importa para el caso.',
  external_link: '',
  sections: [
    {
      title: 'Algo no estaba funcionando',
      blocks: [
        {
          type: 'html',
          content:
            '<p>Escribe aquí el contexto: qué estaba pasando, para quién y por qué importaba. Sin adjetivos de más: hechos, personas y negocio.</p><p>Después, el reto concreto que había que resolver.</p>',
        },
        {
          type: 'image',
          caption: 'Imagen con pie: qué se ve y por qué importa. Se carga con retardo y sin marco gigante.',
        },
      ],
    },
    {
      title: 'La pregunta que guio el trabajo',
      blocks: [
        {
          type: 'html',
          content:
            '<p>La pregunta que ordenó todo lo demás: corta, concreta y en lenguaje de persona. Por ejemplo: «¿por qué la gente abandona en el paso 3?». No es un objetivo de negocio disfrazado.</p>',
        },
      ],
    },
    {
      title: 'Lo que descubrimos',
      blocks: [
        {
          type: 'html',
          content:
            '<p>Los hallazgos, con la evidencia al lado: entrevistas, datos, observación. Si algo no lo comprobaste, dilo tal cual.</p>',
        },
        {
          type: 'quote',
          quote: 'Aquí una cita anonimizada que resuma el hallazgo principal.',
          attribution: 'Participante 1 · entrevista, mes y año',
        },
        {
          type: 'image',
          caption: 'Evidencia visual: un mapa, una captura del proceso o una foto de sesión.',
        },
      ],
    },
    {
      title: 'Las decisiones que marcaron el rumbo',
      blocks: [
        {
          type: 'decision',
          finding: 'Lo que descubriste, con la evidencia que lo respalda.',
          decision: 'La decisión que tomaste a partir de ese hallazgo.',
          reason: 'Por qué esa decisión resolvía el problema.',
          alternative: 'Qué alternativa descartaste y por qué.',
        },
        {
          type: 'decision',
          finding: 'Un segundo hallazgo, si hubo más de una decisión importante.',
          decision: 'La decisión correspondiente.',
          reason: 'El criterio que la sostiene.',
          alternative: 'La opción que quedó fuera.',
        },
      ],
    },
    {
      title: 'Así tomó forma',
      blocks: [
        {
          type: 'html',
          content:
            '<p>La solución: qué se diseñó, cómo se ve y cómo funciona. Pantallas, flujos o mapa de servicio, lo que corresponda a este caso.</p>',
        },
        {
          type: 'compare',
          before_caption: 'Antes: cómo se veía o cómo funcionaba.',
          after_caption: 'Después: qué cambió y por qué mejora.',
        },
        {
          type: 'gallery',
          images: [
            { caption: 'Pie de la primera imagen.' },
            { caption: 'Pie de la segunda imagen.' },
          ],
        },
      ],
    },
    {
      title: 'Lo que pudimos comprobar',
      blocks: [
        {
          type: 'html',
          content:
            '<p><strong>Resultados reales</strong></p><p>Solo lo que puedes respaldar con datos o evidencia. Si todavía no hay números, dilo aquí sin inventarlos.</p>',
        },
        {
          type: 'html',
          content:
            '<p><strong>Evaluación del prototipo</strong></p><p>Qué probaste, con quién y qué aprendiste de esa prueba.</p>',
        },
        {
          type: 'html',
          content:
            '<p><strong>Hipótesis sin validar</strong></p><p>Lo que todavía no está comprobado y cómo se podría comprobar más adelante.</p>',
        },
      ],
    },
    {
      title: 'Lo que me llevo',
      blocks: [
        {
          type: 'html',
          content: '<p>El aprendizaje que se puede aplicar a otro proyecto.</p>',
        },
        {
          type: 'html',
          content: '<p>El siguiente paso: qué haría después de esto.</p>',
        },
      ],
    },
  ],
};