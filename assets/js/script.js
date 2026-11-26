"use strict";

/* ==========================================================
   Saborea Manilva 2026 · comportamiento de la web
   ========================================================== */

/* ---------- Datos (aquí se cambia el contenido) ---------- */

// Ruta del logo que sustituye al de Manilva Única (cabecera y pie)
const LOGOS = { unica: "assets/img/logos/Logo MD sin fondo.png" };

const EVENT_START = new Date("2026-12-04T18:00:00+01:00");

// Programa. Cada actividad: [hora, tipo, texto ES, texto EN]
// Tipos: i = inauguración y apertura · m = música y conciertos · g = gastronomía y catas · c = concursos
const DAYS = [
  {
    es: "Viernes 4",
    en: "Friday 4",
    items: [
      ["18:30", "i", "Apertura de stands Saborea Manilva", "Saborea Manilva stands open"],
      [
        "19:30",
        "i",
        "Inauguración del alumbrado navideño y de la Feria SABOREA MANILVA con degustación de vino de Manilva venenciado",
        "Christmas lights switch-on and Saborea Manilva fair opening, with a tasting of Manilva wine poured the traditional way",
      ],
      [
        "21:00",
        "m",
        "Actuación musical de la zambomba jerezana “AL SON DE LA NAVIDAD”",
        "Live music by the Jerez zambomba group “AL SON DE LA NAVIDAD”",
      ],
      [
        "23:00",
        "m",
        "Concierto del cantaor “PACO CANDELA”",
        "Concert by singer “PACO CANDELA”",
      ],
    ],
  },
  {
    es: "Sábado 5",
    en: "Saturday 5",
    items: [
      ["11:30", "i", "Apertura de stands Saborea Manilva", "Saborea Manilva stands open"],
      ["11:30", "c", "Concurso del vino de Manilva", "Manilva wine contest"],
      [
        "11:30-13:30",
        "m",
        "Talleres infantiles a cargo de Divershow",
        "Children’s workshops by Divershow",
      ],
      [
        "12:00-14:30",
        "g",
        "Showcooking y degustación gratuita de LA COCINA DE DANI (aforo: 100 personas, por orden de llegada; solicita tu ticket)",
        "Free showcooking and tasting by LA COCINA DE DANI (capacity: 100 people, first come first served – collect your ticket)",
      ],
      [
        "15:00",
        "c",
        "Entrega de premios del concurso del vino",
        "Wine contest awards ceremony",
      ],
      [
        "15:15",
        "g",
        "Degustación de los vinos presentados al concurso",
        "Tasting of the wines entered in the contest",
      ],
      ["16:30-18:30", "g", "Talleres infantiles a cargo de Divershow", "Children’s workshops by Divershow"],
      [
        "17:00",
        "m",
        "Actuación de expresión corporal de Jessica Quiñones",
        "Body expression performance by Jessica Quiñones",
      ],
      ["17:30", "m", "Actuación musical: EL KALÉ", "Live music: EL KALÉ"],
      ["18:30", "m", "Actuación musical: AL LIQUINDOI", "Live music: AL LIQUINDOI"],
      [
        "20:00",
        "m",
        "Actuación musical: ROCKOPOP",
        "Live music: ROCKOPOP",
      ],
      ["23:00", "m", "Actuación musical: COMPÁS FLAMENCO", "Live music: COMPÁS FLAMENCO"],
      ["01:00", "m", "Sesión de DJ: VIOLETTA ARRIAZA", "DJ set: VIOLETTA ARRIAZA"],
    ],
  },
  {
    es: "Domingo 6",
    en: "Sunday 6",
    items: [
      ["11:30", "i", "Apertura de stands Saborea Manilva", "Saborea Manilva stands open"],
      [
        "11:30-13:30",
        "c",
        "Concurso Nacional de Corte de Jamón POPI. Concurso benéfico: con la donación de 3 kilos de alimentos se podrá degustar un plato de jamón",
        "POPI National Ham-Carving Contest. Charity event: donate 3 kilos of food to enjoy a plate of ham",
      ],
      [
        "13:30-14:30",
        "g",
        "Showcooking y degustación gratuita de CARLOS BLANCO “GASTROFACIL LA CALETA DE TARIFA” (aforo: 100 personas, por orden de llegada)",
        "Free showcooking and tasting by CARLOS BLANCO “GASTROFACIL LA CALETA DE TARIFA” (capacity: 100 people, first come first served)",
      ],
      [
        "16:30",
        "g",
        "Degustación gratuita de dulces en los stands “EL NAPIOLITANO” y “VICKY CAKES & SWEETS” (solicita tu ticket)",
        "Free tasting of sweets at the EL NAPIOLITANO and VICKY CAKES & SWEETS stands (collect your ticket)",
      ],
      ["17:30-21:30", "m", "Encuentro provincial de parrandas", "Provincial parranda gathering"],
    ],
  },
];

// Ubicación de la feria y aparcamiento (los mapas y botones se montan con estos datos)
const PLACE = "Plaza de la Vendimia, C. Pedreta, 1, 29691 Manilva, Málaga";
const PARKING_URL = "https://maps.app.goo.gl/CzMgpo2CCop7Ys3q9";

// Tipos de actividad del programa: [ES, EN]
const SCHEDULE_TYPES = {
  i: ["Inauguración y apertura", "Opening"],
  m: ["Música y conciertos", "Music and concerts"],
  g: ["Gastronomía y catas", "Food and tastings"],
  c: ["Concursos", "Contests"],
};

// Stands (el número es la posición en la lista; coincide con el mapa)
const STANDS = [
  [
    "Thermomix",
    "o",
    "Demostraciones de cocina y recetas navideñas.",
    "Cooking demos and Christmas recipes.",
    "https://www.vorwerk.com/es/es/productos/thermomix",
  ],
  [
    "Embutidos y Quesos Trujillo",
    "e",
    "Chorizo, salchichón, morcilla y lomo curados.",
    "Cured chorizo, salchichón, blood sausage and loin.",
    "https://www.instagram.com/quesostrujilloconde_ronda/",
  ],
  [
    "Teba pisando fuerte",
    "v",
    "Vino y cerveza artesanal de Teba (Málaga) de la marca Pisando Fuerte.",
    "Wine and craft beer from Teba (Málaga) under the Pisando Fuerte brand.",
    "https://www.instagram.com/rafaelteba/",
  ],
  [
    "Embutidos Tradicionales Conejo e hijos",
    "e",
    "Jamón, paleta, chorizo y salchichón de elaboración tradicional.",
    "Ham, shoulder, chorizo and salchichón made the traditional way.",
    "https://www.facebook.com/people/Embutidos-tradicionales-conejo-e-hijos/100063643325300/",
  ],
  [
    "Moremiel",
    "d",
    "Apicultores de tradición artesanal. Miel natural y artesana.",
    "Traditional beekeepers. Natural, handcrafted honey.",
    "https://moremiel.es/",
  ],
  [
    "Chacinas Francisca España",
    "e",
    "Morcilla, chorizo, lomo en manteca y chacinas caseras.",
    "Blood sausage, chorizo, loin in lard and homemade cured meats.",
    "https://www.facebook.com/carniceriafremo/?locale=es_ES",
  ],
  [
    "Embutidos de la Sierra Serafín",
    "e",
    "Embutidos ibéricos y quesos curados de la sierra.",
    "Iberian cured meats and aged mountain cheeses.",
    "https://www.facebook.com/EmbutidosSerafin",
  ],
  [
    "Bazar Artesano",
    "o",
    "Artesanía, regalos navideños y decoración hecha a mano.",
    "Crafts, Christmas gifts and handmade decorations.",
  ],
  [
    "El Napiolitano",
    "c",
    "Pizzas artesanas al horno y focaccias.",
    "Handmade oven-baked pizzas and focaccias.",
    "https://www.facebook.com/profile.php?id=100077211339569&locale=be_BY#",
  ],
  [
    "Los sueños de Ana",
    "d",
    "Juguetes infantiles, juegos y detalles dulces para los más pequeños.",
    "Children’s toys, games and sweet little treats for the little ones.",
    "https://www.facebook.com/p/Los-Sue%C3%B1os-de-Ana-61566568775225",
  ],
  [
    "Divershow",
    "o",
    "Juegos, globos y animación para los más pequeños.",
    "Games, balloons and entertainment for children.",
  ],

  [
    "Aura C&S",
    "o",
    "Moda, complementos y accesorios para todos los gustos y ocasiones.",
    "Fashion, accessories and bits and bobs to suit all tastes and occasions.",
    "https://www.instagram.com/auras_cys/",
  ],
  [
    "Bodegas Bocanegra",
    "v",
    "Bodega de Manilva con tradición vinícola desde 1860. Vinos monovarietales de Moscatel, jóvenes y frescos, como El Barbudo y Doña María.",
    "Manilva winery with winemaking tradition since 1860. Young, fresh single-variety Moscatel wines such as El Barbudo and Doña María.",
    "https://bodegasbocanegra.com",
  ],
  [
    "Bodega la Hija de Gregorio",
    "v",
    "Bodega familiar de tercera generación. Blanco seco y dulce de Moscatel de Alejandría de viñedos centenarios de Manilva.",
    "Third-generation family winery. Dry white and sweet wines from Muscat of Alexandria grown on century-old Manilva vineyards.",
    "https://bodegasanagarcia.com",
  ],
  [
    "Vicky Cakes & Sweets",
    "d",
    "Repostería de Sabinillas: tartas y pasteles personalizados, galletas y dulces tradicionales rumanos.",
    "Pastry shop from Sabinillas: custom cakes and pastries, cookies and traditional Romanian sweets.",
    "https://www.facebook.com/vicky2409/?locale=es_ES",
  ],
  [
    "Nilva Enoturismo",
    "v",
    "Bodega artesanal ecológica. Moscatel de Alejandría de viñas viejas frente al mar y visitas guiadas al CIVIMA, la bodega y el viñedo con cata.",
    "Organic craft winery. Muscat of Alexandria from old vines facing the sea, with guided visits to CIVIMA, the winery and the vineyard, with tasting.",
    "https://nilva.es",
  ],
  [
    "Bodegas Manilva",
    "v",
    "Bodega de Manilva desde 2017. Vino blanco seco Kalma, 100% Moscatel de Alejandría (D.O. Sierras de Málaga), de viña vieja con vistas al mar.",
    "Manilva winery since 2017. Kalma dry white wine, 100% Muscat of Alexandria (D.O. Sierras de Málaga), from old vines with sea views.",
    "https://bodegasmanilva.com",
  ],
  [
    "Bar Ocaña",
    "c",
    "Tapas, raciones, cafés y repostería.",
    "Tapas, shared plates, coffee and pastries.",
    "https://www.instagram.com/cafeteriaplazamanilva/",
  ],
  [
    "La Caleta Tarifa",
    "c",
    "Pescado frito, arroces y raciones de mar.",
    "Fried fish, rice dishes and seafood plates.",
    " https://www.instagram.com/caletatarifa/",
  ],
  [
    "Lo de Nora",
    "o",
    "Complementos y artículos de regalo para Navidad.",
    "Accessories and Christmas gift items.",
  ],
  [
    "Hamburgueseria Manso",
    "c",
    "Hamburguesería gourmet del Puerto de la Duquesa, con carne de ganadería familiar.",
    "Gourmet burger restaurant from Puerto de la Duquesa, made with meat from a family farm.",
    "https://www.instagram.com/manso_laduquesa/?hl=es",
  ],
  [
    "Del Jamón al plato",
    "e",
    "Jamón ibérico cortado a cuchillo y servido al plato, con pan y aceite.",
    "Iberian ham hand-carved and served by the plate, with bread and olive oil.",
    "https://deljamonalplato.es/",
  ],
  [
    "Foodtruck Los Saleritos",
    "c",
    "Perritos, hamburguesas, camperos y muchos más. Tartas y churros con chocolate.",
    "Hot dogs, burgers, campero sandwiches and much more. Cakes and churros with chocolate.",
    "https://www.instagram.com/lossaleritos?gwpx=MXZyZTg0bmFxeXF4bw==",
  ],
];

// Tipos de producto: [ES, EN]. Los colores están en styles.css (--t-e, --t-d...)
const PRODUCT_TYPES = {
  e: ["Embutidos y quesos", "Cured meats and cheese"],
  d: ["Dulces y miel", "Sweets and honey"],
  v: ["Vino", "Wine"],
  c: ["Para comer allí", "Food to eat here"],
  o: ["Otros y artesanía", "Other and crafts"],
};

// ===== FOTOS DE LAS EDICIONES ANTERIORES =====
// 1) Guarda las fotos en estas carpetas con estos nombres: 01.jpg, 02.jpg, 03.jpg...
//      fotos/2023/    fotos/2024/    fotos/2025/
// 2) Escribe aquí cuántas fotos hay en cada carpeta (0 = se muestran huecos de ejemplo).
const PHOTO_COUNT = { 2023: 33, 2024: 24, 2025: 25 };
const PHOTO_EXT = "jpg";
const numbered = (folder, count) =>
  Array.from({ length: count }, (_, i) => {
    const name = `${String(i + 1).padStart(2, "0")}.${PHOTO_EXT}`;
    return {
      src: `${folder}${name}`,
      thumb: `${folder}thumbs/${name}`,
    };
  });

// Ediciones anteriores: número [romano, ordinal EN], recuadros y fotos.
// dates: [ES, EN] bajo el título. Cada recuadro: [título ES, título EN, texto ES, texto EN].
// Las fotos se cargan solas desde fotos/AÑO/ según PHOTO_COUNT (más arriba).
const EDITIONS = {
  2023: {
    num: ["I", "1st"],
    dates: [
      "Del 7 al 10 de diciembre de 2023, en una gran carpa en la Plaza de la Vendimia",
      "7 to 10 December 2023, in a large marquee at Plaza de la Vendimia",
    ],
    boxes: [
      [
        "Inauguración",
        "Opening",
        "Arrancó con una degustación de vino de Manilva venenciado, con jamón y queso.",
        "It opened with a tasting of Manilva wine served the traditional way, with ham and cheese.",
      ],
      [
        "Alumbrado navideño",
        "Christmas lights",
        "Encendido del alumbrado navideño del pueblo.",
        "Village’s Christmas lights switch-on.",
      ],
      [
        "Mercado gastronómico",
        "Food market",
        "Stands con productos artesanales de la zona.",
        "Stands with local handmade products.",
      ],
      [
        "Música y teatro",
        "Music and theatre",
        "Zambombás, parrandas y teatro para todos los públicos.",
        "Zambombás, parrandas and theatre for all audiences.",
      ],
    ],
    photos: numbered("assets/img/2023/", PHOTO_COUNT[2023]),
  },
  2024: {
    num: ["II", "2nd"],
    dates: [
      "Del 5 al 8 de diciembre de 2024, en la Plaza de la Vendimia",
      "5 to 8 December 2024, at Plaza de la Vendimia",
    ],
    boxes: [
      [
        "Inauguración",
        "Opening",
        "Encendido del alumbrado navideño con zambombás y flamenco.",
        "Christmas lights switch-on with zambombás and flamenco.",
      ],
      [
        "Vino y cocina",
        "Wine and cooking",
        "Concurso del vino de Manilva, showcooking y una cata guiada de miel.",
        "Manilva wine contest, showcooking and a guided honey tasting.",
      ],
      [
        "Jamón solidario",
        "Charity ham",
        "Concurso Nacional de Corte de Jamón “Popi”: 3 kilos de alimentos por un plato de jamón.",
        "“Popi” National Ham-Carving Contest: 3 kilos of food for a plate of ham.",
      ],
      [
        "Tradición y baile",
        "Tradition and dance",
        "Sendero por las fuentes y las viñas, tortas fritas con chocolate, taller de bachata y encuentro de parrandas.",
        "Walk through the springs and vineyards, fried cakes with chocolate, a bachata workshop and a parranda gathering.",
      ],
    ],
    photos: numbered("assets/img/2024/", PHOTO_COUNT[2024]),
  },
  2025: {
    num: ["III", "3rd"],
    dates: [
      "Del 5 al 7 de diciembre de 2025, en la Plaza de la Vendimia",
      "5 to 7 December 2025, at Plaza de la Vendimia",
    ],
    boxes: [
      [
        "Concurso del vino",
        "Wine contest",
        "Premios a los mejores caldos de Manilva y catas abiertas al público.",
        "Prizes for the best Manilva wines and tastings open to the public.",
      ],
      [
        "Corte de jamón",
        "Ham carving",
        "Concurso nacional con profesionales del sector.",
        "National contest with industry professionals.",
      ],
      [
        "Cocina en directo",
        "Live cooking",
        "Showcooking con chefs y talleres de cocina y repostería infantil.",
        "Showcooking with chefs and children’s cooking and baking workshops.",
      ],
      [
        "Ambiente navideño",
        "Christmas atmosphere",
        "Alumbrado, parrandas y zambombás flamencas.",
        "Christmas lights, parrandas and flamenco zambombás.",
      ],
      [
        "Música y espectáculos",
        "Music and shows",
        "Musical infantil, escuelas de danza y conciertos como Malamanera y DJs locales.",
        "Children’s musical, dance schools and concerts by bands such as Malamanera and local DJs.",
      ],
    ],
    photos: numbered("assets/img/2025/", PHOTO_COUNT[2025]),
  },
};
const PLACEHOLDER_SLIDES = 6;
let editionYear = 2025;

/* ---------- Utilidades ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// "Menos movimiento": lo pide el sistema (reducedMq) o el botón "Parar animaciones"
const reducedMq = matchMedia("(prefers-reduced-motion:reduce)");
const REDUCED_MOTION = {
  get matches() {
    return document.documentElement.classList.contains("a11y-nm");
  },
};

/* ---------- Idiomas: ES, EN, FR, DE ---------- */

const LANGS = ["es", "en", "fr", "de"];
const LANG_KEY = "saborea-lang";
const i18nMissing = new Set();

// Traducciones al francés y al alemán: "texto en español": ["francés", "alemán"].
const I18N = {
  // --- Navegación y cabecera ---
  "Saltar al contenido": ["Aller au contenu", "Zum Inhalt springen"],
  Inicio: ["Accueil", "Start"],
  Programa: ["Programme", "Programm"],
  Stands: ["Stands", "Stände"],
  Mapa: ["Carte", "Karte"],
  "Descubre Manilva": ["Découvrir Manilva", "Manilva entdecken"],
  "Ediciones anteriores": ["Éditions précédentes", "Frühere Ausgaben"],
  "Edición 2023": ["Édition 2023", "Ausgabe 2023"],
  "Edición 2024": ["Édition 2024", "Ausgabe 2024"],
  "Edición 2025": ["Édition 2025", "Ausgabe 2025"],

  // --- Portada ---
  "IV Edición Feria Gastronómica": [
    "IVe édition · Foire gastronomique",
    "IV. Ausgabe · Gastronomiemesse",
  ],
  "4 al 6 de diciembre": ["Du 4 au 6 décembre", "4. bis 6. Dezember"],
  "Entrada libre y gratuita": ["Entrée libre et gratuite", "Eintritt frei"],
  "Acceso adaptado a personas con movilidad reducida": [
    "Accès adapté aux personnes à mobilité réduite",
    "Barrierefreier Zugang für Mobilitätseingeschränkte",
  ],

  // --- Información práctica ---
  "Información práctica": [
    "Informations pratiques",
    "Praktische Informationen",
  ],
  Cuándo: ["Quand", "Wann"],
  "4 al 6 de diciembre de 2026": [
    "Du 4 au 6 décembre 2026",
    "4. bis 6. Dezember 2026",
  ],
  "Horario de stands": ["Horaires des stands", "Öffnungszeiten der Stände"],
  "Viernes desde las 18:00. Sábado y domingo desde las 11:30 hasta cierre": [
    "Vendredi à partir de 18 h. Samedi et dimanche à partir de 11 h 30 jusqu'à la fermeture",
    "Freitag ab 18:00 Uhr. Samstag und Sonntag ab 11:30 Uhr bis zum Schluss",
  ],
  Entrada: ["Entrée", "Eintritt"],
  "Evento gratuito, entrada libre": [
    "Événement gratuit, entrée libre",
    "Kostenlose Veranstaltung, freier Eintritt",
  ],
  Accesibilidad: ["Accessibilité", "Barrierefreiheit"],
  "Entrada accesible y adaptada para personas con movilidad reducida": [
    "Entrée accessible et adaptée aux personnes à mobilité réduite",
    "Barrierefreier, für Menschen mit eingeschränkter Mobilität angepasster Eingang",
  ],
  "Cómo llegar": ["Comment venir", "Anreise"],
  "Mapa de la ubicación y dónde aparcar": [
    "Carte de l'emplacement et où se garer",
    "Karte des Standorts und Parkmöglichkeiten",
  ],
  "Descargue el programa": [
    "Télécharger le programme",
    "Programm herunterladen",
  ],
  "Descargue el cartel principal": [
    "Télécharger l'affiche principale",
    "Hauptplakat herunterladen",
  ],
  "Descargue el cartel de Paco Candela": [
    "Télécharger l'affiche de Paco Candela",
    "Plakat von Paco Candela herunterladen",
  ],
  "Pulsa para mostrar u ocultar cada tipo de actividad:": [
    "Appuyez pour afficher ou masquer chaque type d'activité :",
    "Tippen Sie, um jede Aktivitätsart ein- oder auszublenden:",
  ],
  Ubicación: ["Emplacement", "Standort"],
  "El mapa muestra la plaza de la Vendimia.": [
    "La carte montre la place de la Vendimia.",
    "Die Karte zeigt die Plaza de la Vendimia.",
  ],
  "Abrir en Google Maps": ["Ouvrir dans Google Maps", "In Google Maps öffnen"],
  "Dónde aparcar": ["Où se garer", "Parken"],
  "El mapa muestra los aparcamientos cercanos a la plaza. Más zonas de aparcamiento, por confirmar.":
    [
      "La carte montre les parkings proches de la place. D'autres zones de stationnement restent à confirmer.",
      "Die Karte zeigt die Parkplätze in der Nähe des Platzes. Weitere Parkflächen werden noch bestätigt.",
    ],
  "Ver aparcamiento recomendado": [
    "Voir le parking recommandé",
    "Empfohlenen Parkplatz ansehen",
  ],

  // --- Stands ---
  "Productores, bodegas y cocinas de Manilva y la comarca.": [
    "Producteurs, caves et cuisines de Manilva et de sa région.",
    "Produzenten, Weingüter und Küchen aus Manilva und der Umgebung.",
  ],

  // --- Mapa de la feria ---
  "Mapa de la feria": ["Plan de la foire", "Plan der Messe"],
  "Plano ilustrativo. Elige un tipo para resaltar sus stands y pulsa uno para ver su tarjeta.":
    [
      "Plan illustratif. Choisissez un type pour mettre en avant ses stands, puis appuyez sur l'un d'eux pour voir sa fiche.",
      "Illustrativer Plan. Wählen Sie eine Art, um die Stände hervorzuheben, und tippen Sie auf einen, um seine Karte zu sehen.",
    ],
  "Amplía con + y − o pellizcando, y arrastra para moverte por el plano.": [
    "Zoomez avec + et − ou en pinçant, et faites glisser pour vous déplacer sur le plan.",
    "Zoomen Sie mit + und − oder per Pinch-Geste und ziehen Sie, um sich auf dem Plan zu bewegen.",
  ],
  Escenario: ["Scène", "Bühne"],
  Barra: ["Bar", "Bar"],
  "Zona de eventos": ["Espace événements", "Veranstaltungsbereich"],
  Mesas: ["Tables", "Tische"],
  "Salida de emergencia": ["Sortie de secours", "Notausgang"],
  Ambulancia: ["Ambulance", "Krankenwagen"],
  "Información de interés": ["Informations utiles", "Nützliche Informationen"],
  "Habrá aseos adicionales. Consulta en el puesto de información dónde encontrarlos.":
    [
      "Des toilettes supplémentaires seront disponibles. Renseignez-vous au point d'information pour savoir où les trouver.",
      "Es wird zusätzliche Toiletten geben. Am Infostand erfahren Sie, wo Sie sie finden.",
    ],
  "La Policía Local se encuentra muy cercana.": [
    "La police locale se trouve tout près.",
    "Die Ortspolizei ist ganz in der Nähe.",
  ],

  // --- Descubre Manilva ---
  "¿Qué hacer en Manilva?": [
    "Que faire à Manilva ?",
    "Was kann man in Manilva unternehmen?",
  ],
  "El visitante de nuestra localidad y de sus alrededores cuenta con múltiples oportunidades de enriquecimiento cultural y de esparcimiento para los sentidos.":
    [
      "Les visiteurs de notre commune et de ses environs disposent de nombreuses occasions d'enrichissement culturel et de plaisir pour les sens.",
      "Besucher unserer Gemeinde und ihrer Umgebung finden vielfältige Möglichkeiten zur kulturellen Bereicherung und zum Genuss für die Sinne.",
    ],
  "No en vano, el paso de los siglos y el tránsito de gentes por estas tierras ha deparado un patrimonio tan rico como sugerente. En el Patrimonio Cultural de Manilva sobresalen dos grandes yacimientos arqueológicos, ambos declarados Bien de Interés Cultural: Los Castillejos de Alcorrín y el «Entorno del Castillo de la Duquesa».":
    [
      "Ce n'est pas un hasard : le passage des siècles et des peuples sur ces terres a laissé un patrimoine aussi riche que suggestif. Dans le patrimoine culturel de Manilva se distinguent deux grands sites archéologiques, tous deux déclarés biens d'intérêt culturel : Los Castillejos de Alcorrín et les abords du château de la Duquesa.",
      "Der Lauf der Jahrhunderte und der Menschen durch diese Länder hat ein ebenso reiches wie reizvolles Erbe hinterlassen. Im kulturellen Erbe von Manilva ragen zwei große archäologische Stätten hervor, die beide zum Kulturgut erklärt wurden: Los Castillejos de Alcorrín und die Umgebung des Castillo de la Duquesa.",
    ],
  "El yacimiento romano del «Entorno del Castillo de la Duquesa» tiene una cronología que va desde el siglo I d. C. hasta el V d. C. El conjunto está compuesto por necrópolis, villa, termas y factoría de salazón de pescado. Surge este enclave como consecuencia de la industria conservera que giraba en torno a la pesca del atún en almadrabas.":
    [
      "Le site romain des abords du château de la Duquesa s'étend du Ier siècle apr. J.-C. au Ve siècle apr. J.-C. L'ensemble comprend une nécropole, une villa, des thermes et une fabrique de salaison de poisson. Ce site est né de l'industrie de la conserve liée à la pêche au thon à l'almadraba.",
      "Die römische Stätte rund um das Castillo de la Duquesa reicht vom 1. bis zum 5. Jahrhundert n. Chr. Sie umfasst eine Nekropole, eine Villa, Thermen und eine Fischsalzerei. Entstanden ist der Ort durch die Konservenindustrie rund um den Thunfischfang mit Almadrabas.",
    ],
  Monumentos: ["Monuments", "Denkmäler"],
  "Qué ver (pulsa para mostrar u ocultar)": [
    "À voir (appuyez pour afficher ou masquer)",
    "Sehenswertes (tippen zum Ein- oder Ausblenden)",
  ],
  "Rutas sugeridas": ["Itinéraires suggérés", "Vorgeschlagene Routen"],
  "Plano ilustrado: las distancias y los trazados son aproximados.": [
    "Plan illustré : les distances et les tracés sont approximatifs.",
    "Illustrierter Plan: Entfernungen und Wege sind ungefähr.",
  ],
  "Más información turística": [
    "Plus d'informations touristiques",
    "Weitere Touristeninformationen",
  ],

  // --- Ediciones, carrusel y pie ---
  "Pulsa una foto para verla en grande y pasar a la siguiente.": [
    "Appuyez sur une photo pour l'agrandir et passer à la suivante.",
    "Tippen Sie auf ein Foto, um es zu vergrößern und zum nächsten zu wechseln.",
  ],
  "Sabías que": ["Le saviez-vous ?", "Wussten Sie schon?"],
  Organizadores: ["Organisateurs", "Veranstalter"],
  Contacto: ["Contact", "Kontakt"],
  "Horario: L-V 8:30-14:00 h": [
    "Horaires : lun.-ven. 8h30-14h00",
    "Öffnungszeiten: Mo.–Fr. 8:30–14:00 Uhr",
  ],
  Síguenos: ["Suivez-nous", "Folgen Sie uns"],

  // --- Accesibilidad ---
  "Opciones de accesibilidad": [
    "Options d'accessibilité",
    "Barrierefreiheitsoptionen",
  ],
  "Tamaño del texto": ["Taille du texte", "Textgröße"],
  "Alto contraste": ["Contraste élevé", "Hoher Kontrast"],
  "Letra más legible": ["Police plus lisible", "Besser lesbare Schrift"],
  "Más espacio entre letras y líneas": [
    "Plus d'espace entre les lettres et les lignes",
    "Mehr Abstand zwischen Buchstaben und Zeilen",
  ],
  "Subrayar enlaces": ["Souligner les liens", "Links unterstreichen"],
  "Parar animaciones": ["Arrêter les animations", "Animationen stoppen"],
  Restablecer: ["Réinitialiser", "Zurücksetzen"],

  // --- Rótulos del plano de Manilva ---
  Sierra: ["Montagne", "Berge"],
  "Viñedos de moscatel": ["Vignobles de muscat", "Muskatweinberge"],
  "Mar Mediterráneo": ["Mer Méditerranée", "Mittelmeer"],
  "Manilva y su costa": ["Manilva et sa côte", "Manilva und seine Küste"],
  "Sierra, viñedos y mar": [
    "Montagne, vignobles et mer",
    "Berge, Weinberge und Meer",
  ],

  // --- Programa: días, actividades y tipos ---
  "Viernes 4": ["Vendredi 4", "Freitag 4"],
  "Sábado 5": ["Samedi 5", "Samstag 5"],
  "Domingo 6": ["Dimanche 6", "Sonntag 6"],
  "Apertura de stands": ["Ouverture des stands", "Öffnung der Stände"],
  "Apertura de stands Saborea Manilva": [
    "Ouverture des stands Saborea Manilva",
    "Öffnung der Stände von Saborea Manilva",
  ],
  "Inauguración del alumbrado navideño y de la Feria SABOREA MANILVA con degustación de vino de Manilva venenciado": [
    "Inauguration de l'éclairage de Noël et de la foire SABOREA MANILVA, avec dégustation de vin de Manilva servi au venenciador",
    "Eröffnung der Weihnachtsbeleuchtung und der Messe SABOREA MANILVA, mit Verkostung von Manilva-Wein, traditionell mit dem Venenciador eingeschenkt",
  ],
  "Actuación musical de la zambomba jerezana “AL SON DE LA NAVIDAD”": [
    "Concert de la zambomba jerezane « AL SON DE LA NAVIDAD »",
    "Musikauftritt der Jerez-Zambomba-Gruppe „AL SON DE LA NAVIDAD“",
  ],
  "Concierto del cantaor “PACO CANDELA”": [
    "Concert du chanteur « PACO CANDELA »",
    "Konzert des Sängers „PACO CANDELA“",
  ],
  "Concurso del vino de Manilva": [
    "Concours des vins de Manilva",
    "Weinwettbewerb von Manilva",
  ],
  "Showcooking y degustación gratuita de la cocina de Dani, Cafetería Plaza (aforo: 100 personas)":
    [
      "Showcooking et dégustation gratuite de la cuisine de Dani, Cafetería Plaza (100 personnes maximum)",
      "Showcooking und kostenlose Verkostung der Küche von Dani, Cafetería Plaza (max. 100 Personen)",
    ],
  "Showcooking y degustación gratuita de LA COCINA DE DANI (aforo: 100 personas, por orden de llegada; solicita tu ticket)":
    [
      "Showcooking et dégustation gratuite de LA COCINA DE DANI (100 personnes maximum, dans l'ordre d'arrivée – retirez votre ticket)",
      "Showcooking und kostenlose Verkostung von LA COCINA DE DANI (max. 100 Personen, nach Ankunftsreihenfolge – Ticket abholen)",
    ],
  "Entrega de premios del concurso del vino": [
    "Remise des prix du concours des vins",
    "Preisverleihung des Weinwettbewerbs",
  ],
  "Degustación de los vinos presentados al concurso": [
    "Dégustation des vins présentés au concours",
    "Verkostung der eingereichten Weine",
  ],
  "Cata de vinos": ["Dégustation de vins", "Weinprobe"],
  "Actuación musical: Malamanera": [
    "Concert : Malamanera",
    "Musikauftritt: Malamanera",
  ],
  "Actuación musical: ROCKOPOP": [
    "Concert : ROCKOPOP",
    "Musikauftritt: ROCKOPOP",
  ],
  "Actuación musical: COMPÁS FLAMENCO": [
    "Concert : COMPÁS FLAMENCO",
    "Musikauftritt: COMPÁS FLAMENCO",
  ],
  "Sesión de DJ: VIOLETTA ARRIAZA": [
    "Set DJ : VIOLETTA ARRIAZA",
    "DJ-Set: VIOLETTA ARRIAZA",
  ],
  "Talleres infantiles a cargo de Divershow": [
    "Ateliers pour enfants animés par Divershow",
    "Kinderworkshops von Divershow",
  ],
  "Showcooking y degustación gratuita de restaurante MARYMAR (aforo: 100 personas, por orden de llegada; solicita tu ticket)":
    [
      "Showcooking et dégustation gratuite du restaurant MARYMAR (100 personnes maximum, dans l'ordre d'arrivée – retirez votre ticket)",
      "Showcooking und kostenlose Verkostung des Restaurants MARYMAR (max. 100 Personen, nach Ankunftsreihenfolge – Ticket abholen)",
    ],
  "Actuación de expresión corporal de Jessica Quiñones": [
    "Spectacle d'expression corporelle de Jessica Quiñones",
    "Auftritt mit Körperausdruck von Jessica Quiñones",
  ],
  "Actuación musical: EL KALÉ": ["Concert : EL KALÉ", "Musikauftritt: EL KALÉ"],
  "Actuación musical: AL LIQUINDOI": ["Concert : AL LIQUINDOI", "Musikauftritt: AL LIQUINDOI"],
  "Concurso Nacional de Corte de Jamón POPI. Concurso benéfico: con la donación de 3 kilos de alimentos se podrá degustar un plato de jamón":
    [
      "Concours national de découpe de jambon POPI. Événement caritatif : en donnant 3 kilos de denrées alimentaires, vous pourrez déguster une assiette de jambon",
      "Nationaler POPI-Schinkenwettbewerb. Wohltätigkeitsveranstaltung: Mit einer Spende von 3 Kilo Lebensmitteln erhalten Sie eine Portion Schinken",
    ],
  "Showcooking y degustación gratuita de La Caleta (aforo: 100 personas)": [
    "Showcooking et dégustation gratuite de La Caleta (100 personnes maximum)",
    "Showcooking und kostenlose Verkostung von La Caleta (max. 100 Personen)",
  ],
  "Showcooking y degustación gratuita de CARLOS BLANCO “GASTROFACIL LA CALETA DE TARIFA” (aforo: 100 personas, por orden de llegada)":
    [
      "Showcooking et dégustation gratuite de CARLOS BLANCO « GASTROFACIL LA CALETA DE TARIFA » (100 personnes maximum, dans l'ordre d'arrivée)",
      "Showcooking und kostenlose Verkostung von CARLOS BLANCO „GASTROFACIL LA CALETA DE TARIFA“ (max. 100 Personen, nach Ankunftsreihenfolge)",
    ],
  "Degustación gratuita de dulces en los stands “EL NAPIOLITANO” y “VICKY CAKES & SWEETS” (solicita tu ticket)":
    [
      "Dégustation gratuite de douceurs aux stands « EL NAPIOLITANO » et « VICKY CAKES & SWEETS » (retirez votre ticket)",
      "Kostenlose Verkostung von Süßigkeiten an den Ständen „EL NAPIOLITANO“ und „VICKY CAKES & SWEETS“ (Ticket abholen)",
    ],
  "Encuentro provincial de parrandas": [
    "Rencontre provinciale de parrandas",
    "Treffen der Parrandas aus der Provinz",
  ],
  "Inauguración y apertura": [
    "Inauguration et ouverture",
    "Eröffnung und Auftakt",
  ],
  "Música y conciertos": ["Musique et concerts", "Musik und Konzerte"],
  "Gastronomía y catas": [
    "Gastronomie et dégustations",
    "Gastronomie und Verkostungen",
  ],
  Concursos: ["Concours", "Wettbewerbe"],

  // --- Stands: descripciones y tipos de producto ---
  "Chorizo, salchichón, morcilla y lomo curados.": [
    "Chorizo, saucisson, boudin et filet de porc séchés.",
    "Chorizo, Salchichón, Blutwurst und geräucherte Schweinelende.",
  ],
  "Vino y cerveza artesanal de Teba (Málaga) de la marca Pisando Fuerte.": [
    "Vin et bière artisanale de Teba (Málaga) de la marque Pisando Fuerte.",
    "Wein und handwerklich gebrautes Bier aus Teba (Málaga) der Marke Pisando Fuerte.",
  ],
  "Jamón, paleta, chorizo y salchichón de elaboración tradicional.": [
    "Jambon, épaule, chorizo et saucisson de fabrication traditionnelle.",
    "Schinken, Schulter, Chorizo und Salchichón nach traditioneller Herstellung.",
  ],
  "Apicultores de tradición artesanal. Miel natural y artesana.": [
    "Apiculteurs de tradition artisanale. Miel naturelle et artisanale.",
    "Imker in handwerklicher Tradition. Natürlicher, handwerklich hergestellter Honig.",
  ],
  "Morcilla, chorizo, lomo en manteca y chacinas caseras.": [
    "Boudin, chorizo, filet de porc confit et charcuteries maison.",
    "Blutwurst, Chorizo, in Schmalz eingelegte Schweinelende und hausgemachte Wurstwaren.",
  ],
  "Artesanía, regalos navideños y decoración hecha a mano.": [
    "Artisanat, cadeaux de Noël et décoration faite main.",
    "Handwerk, Weihnachtsgeschenke und handgemachte Dekoration.",
  ],
  "Embutidos ibéricos y quesos curados de la sierra.": [
    "Charcuterie ibérique et fromages affinés de la montagne.",
    "Iberische Wurstwaren und gereifter Bergkäse.",
  ],
  "Pizzas artesanas al horno y focaccias.": [
    "Pizzas artisanales au four et focaccias.",
    "Handgemachte Ofenpizzas und Focaccias.",
  ],
  "Moda, complementos y accesorios para todos los gustos y ocasiones.": [
    "Mode, compléments et accessoires pour tous les goûts et toutes les occasions.",
    "Mode, Ergänzungen und Accessoires für jeden Geschmack und Anlass.",
  ],
  "Juguetes infantiles, juegos y detalles dulces para los más pequeños.": [
    "Jouets pour enfants, jeux et douceurs pour les plus petits.",
    "Kinderspielzeug, Spiele und süße Kleinigkeiten für die Kleinsten.",
  ],
  "Demostraciones de cocina y recetas navideñas.": [
    "Démonstrations de cuisine et recettes de Noël.",
    "Kochvorführungen und Weihnachtsrezepte.",
  ],
  "Juegos, globos y animación para los más pequeños.": [
    "Jeux, ballons et animations pour les plus petits.",
    "Spiele, Luftballons und Unterhaltung für die Kleinsten.",
  ],
  "Bodega de Manilva con tradición vinícola desde 1860. Vinos monovarietales de Moscatel, jóvenes y frescos, como El Barbudo y Doña María.":
    [
      "Cave de Manilva à la tradition viticole depuis 1860. Vins monocépages de muscat, jeunes et frais, comme El Barbudo et Doña María.",
      "Weingut aus Manilva mit Weinbautradition seit 1860. Junge, frische sortenreine Muskatweine wie El Barbudo und Doña María.",
    ],
  "Bodega familiar de tercera generación. Blanco seco y dulce de Moscatel de Alejandría de viñedos centenarios de Manilva.":
    [
      "Cave familiale de troisième génération. Blanc sec et doux de muscat d'Alexandrie issu de vignes centenaires de Manilva.",
      "Familienweingut in dritter Generation. Trockener und süßer Weißwein aus Muskat von Alexandria von jahrhundertealten Reben aus Manilva.",
    ],
  "Repostería de Sabinillas: tartas y pasteles personalizados, galletas y dulces tradicionales rumanos.":
    [
      "Pâtisserie de Sabinillas : gâteaux personnalisés, biscuits et douceurs traditionnelles roumaines.",
      "Konditorei aus Sabinillas: individuelle Torten und Kuchen, Kekse und traditionelle rumänische Süßigkeiten.",
    ],
  "Bodega artesanal ecológica. Moscatel de Alejandría de viñas viejas frente al mar y visitas guiadas al CIVIMA, la bodega y el viñedo con cata.":
    [
      "Cave artisanale biologique. Muscat d'Alexandrie de vieilles vignes face à la mer et visites guidées du CIVIMA, de la cave et du vignoble avec dégustation.",
      "Ökologisches Handwerksweingut. Muskat von Alexandria aus alten Reben mit Meerblick sowie geführte Besichtigungen von CIVIMA, Weingut und Weinberg mit Verkostung.",
    ],
  "Bodega de Manilva desde 2017. Vino blanco seco Kalma, 100% Moscatel de Alejandría (D.O. Sierras de Málaga), de viña vieja con vistas al mar.":
    [
      "Cave de Manilva depuis 2017. Vin blanc sec Kalma, 100 % muscat d'Alexandrie (A.O.C. Sierras de Málaga), de vieilles vignes avec vue sur la mer.",
      "Weingut aus Manilva seit 2017. Trockener Weißwein Kalma, 100 % Muskat von Alexandria (D.O. Sierras de Málaga), aus alten Reben mit Meerblick.",
    ],
  "Tapas, raciones, cafés y repostería.": [
    "Tapas, portions, cafés et pâtisseries.",
    "Tapas, Portionen, Kaffee und Gebäck.",
  ],
  "Pescado frito, arroces y raciones de mar.": [
    "Poisson frit, riz et portions de la mer.",
    "Frittierter Fisch, Reisgerichte und Meeresfrüchte-Portionen.",
  ],
  "Complementos y artículos de regalo para Navidad.": [
    "Accessoires et articles cadeaux pour Noël.",
    "Accessoires und Geschenkartikel für Weihnachten.",
  ],
  "Hamburguesería gourmet del Puerto de la Duquesa, con carne de ganadería familiar.":
    [
      "Burger gourmet du port de la Duquesa, avec de la viande d'élevage familial.",
      "Gourmet-Burger aus Puerto de la Duquesa mit Fleisch aus familiärer Aufzucht.",
    ],
  "Jamón ibérico cortado a cuchillo y servido al plato, con pan y aceite.": [
    "Jambon ibérique coupé au couteau et servi dans l'assiette, avec pain et huile.",
    "Iberischer Schinken, handgeschnitten und auf dem Teller serviert, mit Brot und Öl.",
  ],
  "Embutidos y quesos": ["Charcuterie et fromages", "Wurstwaren und Käse"],
  "Dulces y miel": ["Douceurs et miel", "Süßigkeiten und Honig"],
  "Para comer allí": ["À manger sur place", "Zum Essen vor Ort"],
  "Otros y artesanía": ["Autres et artisanat", "Sonstiges und Handwerk"],
  "Por asignar.": ["À attribuer.", "Noch zuzuweisen."],
  "Perritos, hamburguesas, camperos y muchos más. Tartas y churros con chocolate.": [
    "Hot-dogs, hamburgers, sandwichs camperos et bien plus encore. Tartes et churros au chocolat.",
    "Hot Dogs, Hamburger, Campero-Sandwiches und vieles mehr. Kuchen und Churros mit Schokolade.",
  ],

  // --- Ediciones anteriores ---
  "Del 7 al 10 de diciembre de 2023, en una gran carpa en la Plaza de la Vendimia":
    [
      "Du 7 au 10 décembre 2023, dans un grand chapiteau sur la plaza de la Vendimia",
      "Vom 7. bis 10. Dezember 2023 in einem großen Festzelt auf der Plaza de la Vendimia",
    ],
  Inauguración: ["Inauguration", "Eröffnung"],
  "Arrancó con una degustación de vino de Manilva venenciado, con jamón y queso.":
    [
      "Elle a débuté par une dégustation de vin de Manilva servi au venenciador, avec jambon et fromage.",
      "Sie begann mit einer Verkostung von Manilva-Wein, traditionell mit dem Venenciador eingeschenkt, mit Schinken und Käse.",
    ],
  "Alumbrado navideño": ["Illuminations de Noël", "Weihnachtsbeleuchtung"],
  "Encendido del alumbrado navideño del pueblo.": [
    "Illumination des décorations de Noël du village.",
    "Einschalten der Weihnachtsbeleuchtung des Dorfes.",
  ],
  "Mercado gastronómico": ["Marché gastronomique", "Gastronomiemarkt"],
  "Stands con productos artesanales de la zona.": [
    "Stands de produits artisanaux de la région.",
    "Stände mit handwerklichen Produkten aus der Region.",
  ],
  "Música y teatro": ["Musique et théâtre", "Musik und Theater"],
  "Zambombás, parrandas y teatro para todos los públicos.": [
    "Zambombás, parrandas et théâtre pour tous les publics.",
    "Zambombás, Parrandas und Theater für jedes Publikum.",
  ],
  "Del 5 al 8 de diciembre de 2024, en la Plaza de la Vendimia": [
    "Du 5 au 8 décembre 2024, sur la plaza de la Vendimia",
    "Vom 5. bis 8. Dezember 2024 auf der Plaza de la Vendimia",
  ],
  "Encendido del alumbrado navideño con zambombás y flamenco.": [
    "Illumination de Noël avec zambombás et flamenco.",
    "Einschalten der Weihnachtsbeleuchtung mit Zambombás und Flamenco.",
  ],
  "Vino y cocina": ["Vin et cuisine", "Wein und Küche"],
  "Concurso del vino de Manilva, showcooking y una cata guiada de miel.": [
    "Concours des vins de Manilva, showcooking et dégustation guidée de miel.",
    "Weinwettbewerb von Manilva, Showcooking und geführte Honigverkostung.",
  ],
  "Jamón solidario": ["Jambon solidaire", "Schinken für den guten Zweck"],
  "Concurso Nacional de Corte de Jamón “Popi”: 3 kilos de alimentos por un plato de jamón.":
    [
      "Concours national de découpe de jambon « Popi » : 3 kilos de denrées alimentaires pour une assiette de jambon.",
      "Nationaler Schinkenwettbewerb „Popi“: 3 Kilo Lebensmittel für eine Portion Schinken.",
    ],
  "Tradición y baile": ["Tradition et danse", "Tradition und Tanz"],
  "Sendero por las fuentes y las viñas, tortas fritas con chocolate, taller de bachata y encuentro de parrandas.":
    [
      "Sentier entre sources et vignes, gâteaux frits au chocolat, atelier de bachata et rencontre de parrandas.",
      "Wanderweg zu Quellen und Weinbergen, gebackene Teigwaren mit Schokolade, Bachata-Workshop und Parranda-Treffen.",
    ],
  "Del 5 al 7 de diciembre de 2025, en la Plaza de la Vendimia": [
    "Du 5 au 7 décembre 2025, sur la plaza de la Vendimia",
    "Vom 5. bis 7. Dezember 2025 auf der Plaza de la Vendimia",
  ],
  "Concurso del vino": ["Concours des vins", "Weinwettbewerb"],
  "Premios a los mejores caldos de Manilva y catas abiertas al público.": [
    "Prix des meilleurs crus de Manilva et dégustations ouvertes au public.",
    "Preise für die besten Weine von Manilva und offene Verkostungen.",
  ],
  "Corte de jamón": ["Découpe de jambon", "Schinkenschnitt"],
  "Concurso nacional con profesionales del sector.": [
    "Concours national avec des professionnels du secteur.",
    "Nationaler Wettbewerb mit Branchenprofis.",
  ],
  "Cocina en directo": ["Cuisine en direct", "Live-Kochen"],
  "Showcooking con chefs y talleres de cocina y repostería infantil.": [
    "Showcooking avec des chefs et ateliers de cuisine et de pâtisserie pour enfants.",
    "Showcooking mit Köchen sowie Koch- und Backworkshops für Kinder.",
  ],
  "Ambiente navideño": ["Ambiance de Noël", "Weihnachtsstimmung"],
  "Alumbrado, parrandas y zambombás flamencas.": [
    "Illuminations, parrandas et zambombás flamencas.",
    "Beleuchtung, Parrandas und Flamenco-Zambombás.",
  ],
  "Música y espectáculos": ["Musique et spectacles", "Musik und Shows"],
  "Musical infantil, escuelas de danza y conciertos como Malamanera y DJs locales.":
    [
      "Comédie musicale pour enfants, écoles de danse et concerts comme Malamanera et DJ locaux.",
      "Kindermusical, Tanzschulen und Konzerte wie Malamanera und lokale DJs.",
    ],

  // --- Descubre Manilva: tipos de tarjeta ---
  Historia: ["Histoire", "Geschichte"],
  Vino: ["Vin", "Wein"],
  Gastronomía: ["Gastronomie", "Gastronomie"],
  "La feria": ["Saborea", "Saborea"],
  "Playa y paseo": ["Plage et promenade", "Strand und Promenade"],
  Saborea: ["Saborea", "Saborea"],
  Parques: ["Parcs", "Parks"],

  // --- Descubre Manilva: artículos ---
  "Frontera y señorío": ["Frontière et seigneurie", "Grenze und Herrschaft"],
  "Tras la conquista cristiana de Casares en 1485, Manilva quedó integrada en su señorío y permaneció vinculada a esta villa durante siglos. En 1530 surgió el Cortijo de Manilva, un asentamiento impulsado para repoblar y proteger los terrenos cercanos a la costa.":
    [
      "Après la conquête chrétienne de Casares en 1485, Manilva fut intégrée à sa seigneurie et resta liée à cette ville pendant des siècles. En 1530 naquit le Cortijo de Manilva, un établissement créé pour repeupler et protéger les terres proches de la côte.",
      "Nach der christlichen Eroberung von Casares im Jahr 1485 wurde Manilva in dessen Herrschaft eingegliedert und blieb jahrhundertelang mit dieser Stadt verbunden. 1530 entstand der Cortijo de Manilva, eine Siedlung, die gegründet wurde, um die küstennahen Ländereien neu zu besiedeln und zu schützen.",
    ],
  "Cuando Manilva fue azúcar": [
    "Quand Manilva était sucre",
    "Als Manilva Zucker war",
  ],
  "Durante siglos, el cultivo de la caña de azúcar tuvo un papel importante en la economía de Manilva. A finales del siglo XIX, la familia Larios impulsó la modernización de esta actividad con la creación del Ingenio de San Luis de Sabinillas, una de las industrias azucareras más occidentales del litoral mediterráneo.":
    [
      "Pendant des siècles, la culture de la canne à sucre a joué un rôle important dans l'économie de Manilva. À la fin du XIXe siècle, la famille Larios favorisa la modernisation de cette activité avec la création de l'Ingenio de San Luis de Sabinillas, l'une des industries sucrières les plus occidentales du littoral méditerranéen.",
      "Jahrhundertelang spielte der Zuckerrohranbau eine wichtige Rolle in der Wirtschaft von Manilva. Ende des 19. Jahrhunderts förderte die Familie Larios die Modernisierung dieses Wirtschaftszweigs mit der Gründung des Ingenio de San Luis de Sabinillas, einer der westlichsten Zuckerfabriken der Mittelmeerküste.",
    ],
  "Un museo para la viña": [
    "Un musée pour la vigne",
    "Ein Museum für den Weinberg",
  ],
  "El CIVIMA, Centro de Interpretación de las Viñas de Manilva, abrió sus puertas en octubre de 2013. Cuenta con unos 1.000 m² dedicados a la cultura del vino, con bodega, laboratorio y espacios expositivos. Se encuentra junto a la Plaza de la Vendimia.":
    [
      "Le CIVIMA, Centre d'interprétation des vignes de Manilva, a ouvert ses portes en octobre 2013. Il dispose d'environ 1 000 m² consacrés à la culture du vin, avec cave, laboratoire et espaces d'exposition. Il se trouve à côté de la plaza de la Vendimia.",
      "Das CIVIMA, das Interpretationszentrum der Weinberge von Manilva, wurde im Oktober 2013 eröffnet. Es verfügt über rund 1.000 m², die der Weinkultur gewidmet sind, mit Weingut, Labor und Ausstellungsräumen. Es liegt neben der Plaza de la Vendimia.",
    ],
  "Moscatel frente al mar": ["Muscat face à la mer", "Muskat am Meer"],
  "La uva Moscatel de Alejandría forma parte de la identidad agrícola de Manilva. Sus viñedos crecen en laderas cercanas al Mediterráneo y han dado lugar tradicionalmente a uvas frescas, pasas y vinos dulces. Actualmente también se elaboran vinos blancos secos, como los de la bodega Nilva.":
    [
      "Le raisin muscat d'Alexandrie fait partie de l'identité agricole de Manilva. Ses vignes poussent sur des coteaux proches de la Méditerranée et ont traditionnellement donné des raisins frais, des raisins secs et des vins doux. Aujourd'hui, des vins blancs secs sont également produits, comme ceux de la cave Nilva.",
      "Die Muskat-Traube von Alexandria gehört zur landwirtschaftlichen Identität von Manilva. Ihre Weinberge wachsen an Hängen nahe dem Mittelmeer und lieferten traditionell frische Trauben, Rosinen und Süßweine. Heute werden auch trockene Weißweine erzeugt, wie die des Weinguts Nilva.",
    ],
  "Salvar las viñas": ["Sauver les vignes", "Die Weinberge retten"],
  "La bodega Nilva estima que el 75% de las viñas de la zona han desaparecido en los últimos 25 años. Nació en 2014 con el proyecto de recuperar las cepas viejas de moscatel y compartirlas con los visitantes.":
    [
      "La cave Nilva estime que 75 % des vignes de la zone ont disparu au cours des 25 dernières années. Elle est née en 2014 avec le projet de récupérer les vieux ceps de muscat et de les partager avec les visiteurs.",
      "Das Weingut Nilva schätzt, dass 75 % der Weinberge in der Region in den letzten 25 Jahren verschwunden sind. Es entstand 2014 mit dem Ziel, die alten Muskat-Reben zu retten und sie mit Besuchern zu teilen.",
    ],
  "Cuatro bodegas, un mismo moscatel": [
    "Quatre caves, un même muscat",
    "Vier Weingüter, ein Muskat",
  ],
  "Ana García, Bocanegra, Manilva y Nilva son las cuatro bodegas presentes en la feria. Todas trabajan el moscatel de Alejandría y las encontrarás en los stands de vino.":
    [
      "Ana García, Bocanegra, Manilva et Nilva sont les quatre caves présentes à la foire. Toutes travaillent le muscat d'Alexandrie et vous les trouverez aux stands de vin.",
      "Ana García, Bocanegra, Manilva und Nilva sind die vier Weingüter auf der Messe. Alle arbeiten mit dem Muskat von Alexandria, und Sie finden sie an den Weinständen.",
    ],
  "La Fiesta de la Vendimia": ["La Fête des vendanges", "Das Weinlesefest"],
  "La Feria de la Vendimia es una de las celebraciones más tradicionales de Manilva, dedicada a la cultura del vino y a las raíces vitivinícolas del municipio. Durante la feria se rinde homenaje a la uva y al trabajo de los viticultores con actividades, degustaciones, música y tradiciones populares.":
    [
      "La Feria de la Vendimia est l'une des célébrations les plus traditionnelles de Manilva, consacrée à la culture du vin et aux racines viticoles de la commune. Pendant la fête, un hommage est rendu au raisin et au travail des viticulteurs à travers des activités, des dégustations, de la musique et des traditions populaires.",
      "Das Traubenlesefest ist eines der traditionellsten Feste von Manilva und der Weinkultur sowie den Weinbautraditionen der Gemeinde gewidmet. Während des Festes werden die Trauben und die Arbeit der Winzer mit Aktivitäten, Verkostungen, Musik und Volkstraditionen geehrt.",
    ],
  "Del mar a la mesa": ["De la mer à la table", "Vom Meer auf den Tisch"],
  "La cercanía del Mediterráneo marca la gastronomía de Manilva. El pescado fresco, los mariscos y los productos de la costa son protagonistas de una cocina ligada al mar, donde destacan preparaciones como los espetos de sardinas y la fritura malagueña.":
    [
      "La proximité de la Méditerranée marque la gastronomie de Manilva. Le poisson frais, les fruits de mer et les produits de la côte sont les protagonistes d'une cuisine liée à la mer, où se distinguent des préparations comme les brochettes de sardines et la friture à la malaguène.",
      "Die Nähe zum Mittelmeer prägt die Gastronomie von Manilva. Frischer Fisch, Meeresfrüchte und Produkte der Küste stehen im Mittelpunkt einer dem Meer verbundenen Küche, in der Gerichte wie Sardinenspieße und die Frittüre nach Málaga-Art hervorstechen.",
    ],
  "Cocina marinera": ["Cuisine de la mer", "Seemannsküche"],
  "Papas guisadas con raya, fideos con almejas, potaje de jibias con garbanzos, sopa de pescado, tortilla de bacalao o boquerones en escabeche: platos tradicionales de la cocina marinera de Manilva.":
    [
      "Pommes de terre mijotées à la raie, nouilles aux palourdes, potage de seiches aux pois chiches, soupe de poisson, omelette à la morue ou anchois marinés : plats traditionnels de la cuisine maritime de Manilva.",
      "Geschmorte Kartoffeln mit Rochen, Nudeln mit Venusmuscheln, Tintenfisch-Kichererbsen-Eintopf, Fischsuppe, Stockfisch-Omelett oder marinierte Sardellen: traditionelle Gerichte der Seemannsküche von Manilva.",
    ],
  "La moraga": ["La moraga", "Die Moraga"],
  "La moraga es una tradición muy arraigada en Manilva que consiste en reunirse junto al mar para asar sardinas en espetos sobre las brasas, especialmente durante las noches de verano. Para facilitar esta costumbre, el Ayuntamiento tiene barcas municipales habilitadas en distintos puntos del litoral, que pueden solicitarse mediante reserva durante la temporada estival.":
    [
      "La moraga est une tradition très ancrée à Manilva : se réunir au bord de la mer pour griller des sardines en brochettes sur les braises, surtout pendant les soirées d'été. Pour faciliter cette coutume, la mairie met à disposition des barques municipales à différents points du littoral, réservables pendant la saison estivale.",
      "Die Moraga ist eine tief verwurzelte Tradition in Manilva: Man trifft sich am Meer, um Sardinen an Holzspießen über der Glut zu grillen, besonders an Sommerabenden. Um diesen Brauch zu erleichtern, stellt die Stadtverwaltung an verschiedenen Küstenabschnitten Gemeindeboote bereit, die in der Sommersaison reserviert werden können.",
    ],
  "Vino de la tierra": ["Vin du terroir", "Wein aus der Region"],
  "Vinos de Manilva, que se juzgan por categorías en el Concurso del Vino de Manilva. El sábado 5 de diciembre el jurado se reúne a las 11:30, los premios se entregan a las 15:00, se degustan los vinos presentados a las 15:15 y a las 16:00 hay cata.":
    [
      "Vins de Manilva, jugés par catégories lors du Concours des vins de Manilva. Le samedi 5 décembre, le jury se réunit à 11 h 30, les prix sont remis à 15 h, les vins présentés sont dégustés à 15 h 15 et une dégustation a lieu à 16 h.",
      "Weine aus Manilva, die beim Weinwettbewerb von Manilva nach Kategorien bewertet werden. Am Samstag, 5. Dezember, tagt die Jury um 11:30 Uhr, die Preise werden um 15:00 Uhr vergeben, die eingereichten Weine werden um 15:15 Uhr verkostet und um 16:00 Uhr findet eine Weinprobe statt.",
    ],
  "Tapas y embutidos": ["Tapas et charcuterie", "Tapas und Wurstwaren"],
  "Tapas con productos de la zona, además de embutidos, jamón y queso para acompañar el vino.":
    [
      "Tapas à base de produits locaux, ainsi que charcuterie, jambon et fromage pour accompagner le vin.",
      "Tapas mit Produkten aus der Region sowie Wurstwaren, Schinken und Käse zum Wein.",
    ],
  "Showcooking y degustaciones": [
    "Showcooking et dégustations",
    "Showcooking und Verkostungen",
  ],
  "Showcooking con degustación gratuita, con aforo de 100 personas cada uno: el sábado 5 de diciembre de 12:00 a 14:30 con la cocina de Dani (cafetería de la plaza) y el domingo 6 de diciembre de 13:30 a 14:30 con La Caleta.":
    [
      "Showcooking avec dégustation gratuite, limité à 100 personnes chaque fois : le samedi 5 décembre de 12 h à 14 h 30 avec la cuisine de Dani (cafétéria de la place) et le dimanche 6 décembre de 13 h 30 à 14 h 30 avec La Caleta.",
      "Showcooking mit kostenloser Verkostung, jeweils für 100 Personen: am Samstag, 5. Dezember, von 12:00 bis 14:30 Uhr mit der Küche von Dani (Cafeteria am Platz) und am Sonntag, 6. Dezember, von 13:30 bis 14:30 Uhr mit La Caleta.",
    ],
  "Jamón y cortadores": ["Jambon et découpeurs", "Schinken und Schnittmeister"],
  "El domingo 6 de diciembre, de 11:30 a 13:30, se celebra el Concurso Nacional de Corte de Jamón POPI. Se trata de un evento benéfico en el que, mediante la donación de 3 kilos de alimentos, los asistentes podrán disfrutar de un plato de jamón.":
    [
      "Le dimanche 6 décembre, de 11 h 30 à 13 h 30, se déroule le Concours national de découpe de jambon POPI. Il s'agit d'un événement caritatif où, en échange d'un don de 3 kilos de denrées alimentaires, les participants pourront déguster une assiette de jambon.",
      "Am Sonntag, 6. Dezember, findet von 11:30 bis 13:30 Uhr der nationale POPI-Schinkenwettbewerb statt. Es ist eine Wohltätigkeitsveranstaltung, bei der die Besucher gegen eine Spende von 3 Kilo Lebensmitteln eine Portion Schinken genießen können.",
    ],
  "Repostería navideña": ["Pâtisserie de Noël", "Weihnachtsgebäck"],
  "En ediciones anteriores se ha celebrado un concurso de dulces navideños caseros, con entrega de premios.":
    [
      "Lors des éditions précédentes, un concours de douceurs de Noël faites maison a été organisé, avec remise des prix.",
      "In früheren Ausgaben fand ein Wettbewerb für hausgemachtes Weihnachtsgebäck mit Preisverleihung statt.",
    ],

  // --- Mapa de Manilva: sitios ---
  "Casco histórico y Santa Ana": [
    "Centre historique et Santa Ana",
    "Altstadt und Santa Ana",
  ],
  "El núcleo tradicional del pueblo conserva calles tranquilas y un fuerte vínculo con los viñedos. En la Plaza de la Iglesia se alza la iglesia parroquial de Santa Ana, construida entre 1776 y 1783 sobre un templo más pequeño de finales del siglo XVI. Contribuyeron a la obra el obispado, los vecinos y el Duque de Arcos, señor de la villa.":
    [
      "Le cœur traditionnel du village conserve des rues tranquilles et un lien fort avec les vignes. Sur la plaza de la Iglesia se dresse l'église paroissiale de Santa Ana, construite entre 1776 et 1783 sur un édifice plus petit de la fin du XVIe siècle. L'évêché, les habitants et le duc d'Arcos, seigneur de la ville, ont contribué aux travaux.",
      "Der traditionelle Ortskern bewahrt ruhige Gassen und eine enge Verbindung zu den Weinbergen. Auf der Plaza de la Iglesia steht die Pfarrkirche Santa Ana, erbaut zwischen 1776 und 1783 auf einem kleineren Gotteshaus aus dem späten 16. Jahrhundert. Zum Bau trugen das Bistum, die Anwohner und der Herzog von Arcos, Herr der Stadt, bei.",
    ],
  "Paseo marítimo de Sabinillas": [
    "Promenade maritime de Sabinillas",
    "Strandpromenade von Sabinillas",
  ],
  "Restaurantes, cafés y chiringuitos a pie de playa, en el corazón de San Luis de Sabinillas.":
    [
      "Restaurants, cafés et paillotes les pieds dans le sable, au cœur de San Luis de Sabinillas.",
      "Restaurants, Cafés und Strandbars direkt am Strand, im Herzen von San Luis de Sabinillas.",
    ],
  "Playa de Sabinillas": ["Plage de Sabinillas", "Strand von Sabinillas"],
  "Playa urbana de unos 1.700 m, separada del pueblo por el paseo marítimo. En temporada alta suele estar muy concurrida.":
    [
      "Plage urbaine d'environ 1 700 m, séparée du village par la promenade maritime. En haute saison, elle est généralement très fréquentée.",
      "Städtischer Strand von rund 1.700 m, durch die Strandpromenade vom Ort getrennt. In der Hochsaison ist er meist sehr belebt.",
    ],
  "Puerto de la Duquesa": ["Port de la Duquesa", "Hafen von La Duquesa"],
  "Puerto deportivo con 328 amarres y restaurantes en tres niveles. Se llega desde Sabinillas por un paseo llano de menos de un kilómetro.":
    [
      "Port de plaisance avec 328 anneaux et des restaurants sur trois niveaux. On y accède depuis Sabinillas par une promenade plate de moins d'un kilomètre.",
      "Yachthafen mit 328 Liegeplätzen und Restaurants auf drei Ebenen. Von Sabinillas aus erreicht man ihn über einen flachen Spazierweg von weniger als einem Kilometer.",
    ],
  "Castillo de la Duquesa": ["Château de la Duquesa", "Castillo de la Duquesa"],
  "Fortín de 1767 levantado para defender la costa, en el antiguo barrio de pescadores del Castillo. Lo construyó a sus expensas el sevillano Francisco Paulino, y el rey le concedió el mando de una compañía de caballería. Alberga el Museo Arqueológico Municipal, cuyos objetos provienen del yacimiento romano del «Entorno del Castillo de la Duquesa» (siglos I-V d. C.). Entrada gratuita, de lunes a viernes de 8:00 a 15:00.":
    [
      "Petit fort de 1767 élevé pour défendre la côte, dans l'ancien quartier de pêcheurs du Castillo. Il fut construit à ses frais par le Sévillan Francisco Paulino, à qui le roi confia le commandement d'une compagnie de cavalerie. Il abrite le musée archéologique municipal, dont les pièces proviennent du site romain des abords du château de la Duquesa (Ier-Ve siècle apr. J.-C.). Entrée gratuite, du lundi au vendredi de 8 h à 15 h.",
      "Kleine Festung von 1767, errichtet zur Verteidigung der Küste, im alten Fischerviertel El Castillo. Sie wurde auf eigene Kosten vom Sevillianer Francisco Paulino gebaut, dem der König das Kommando über eine Kavalleriekompanie verlieh. Sie beherbergt das Städtische Archäologische Museum, dessen Objekte aus der römischen Stätte rund um das Castillo de la Duquesa stammen (1.–5. Jahrhundert n. Chr.). Eintritt frei, montags bis freitags von 8:00 bis 15:00 Uhr.",
    ],
  "Playa de la Duquesa - El Castillo": [
    "Plage de la Duquesa - El Castillo",
    "Strand von La Duquesa - El Castillo",
  ],
  "Playa de arena oscura junto al barrio de pescadores del Castillo.": [
    "Plage de sable sombre à côté du quartier de pêcheurs du Castillo.",
    "Dunkler Sandstrand neben dem Fischerviertel El Castillo.",
  ],
  "Los Castillejos de Alcorrín": [
    "Los Castillejos de Alcorrín",
    "Los Castillejos de Alcorrín",
  ],
  "Yacimiento arqueológico del siglo IX a. C., formado por una gran fortaleza amurallada declarada Bien de Interés Cultural. En él conviven elementos propios del mundo autóctono con técnicas constructivas de clara afinidad fenicia.":
    [
      "Site archéologique du IXe siècle av. J.-C., formé par une grande forteresse entourée de murs et classée bien d'intérêt culturel. On y trouve côte à côte des éléments du monde autochtone et des techniques de construction clairement phéniciennes.",
      "Archäologische Stätte aus dem 9. Jahrhundert v. Chr. mit einer großen ummauerten Festung, die zum Kulturgut erklärt wurde. Hier treffen einheimische Elemente auf Bauweisen mit deutlicher phönizischer Prägung.",
    ],
  "Torre de Chullera": ["Torre de Chullera", "Torre de Chullera"],
  "En Chullera, en el extremo suroeste del litoral, existen dos torres almenaras: una troncónica y otra más antigua de base cruzada, la primitiva torre de tiempos nazaríes. En 1497 ya se la denominaba Torre de la Chullera en las Instrucciones para la guarda de la Costa dadas por los Reyes Católicos.":
    [
      "À Chullera, à l'extrémité sud-ouest du littoral, se dressent deux tours de guet : l'une tronconique et l'autre, plus ancienne, à base en croix, la tour primitive de l'époque nasride. Dès 1497, elle était déjà appelée Torre de la Chullera dans les instructions pour la garde de la côte données par les Rois Catholiques.",
      "In Chullera, am südwestlichen Ende der Küste, stehen zwei Wachtürme: einer mit Kegelstumpfform und ein älterer mit kreuzförmigem Grundriss, der ursprüngliche Turm aus nasridischer Zeit. Bereits 1497 wurde er in den Anweisungen der Katholischen Könige zur Küstenwache Torre de la Chullera genannt.",
    ],
  "El Ingenio Chico": ["El Ingenio Chico", "El Ingenio Chico"],
  "Uno de los dos ingenios de azúcar que construyó el Duque de Arcos en estas tierras. El acueducto conserva la unión con el resto de la construcción en tapial, recordándonos las construcciones medievales y haciéndonos pensar en la mano de obra de tradición morisca.":
    [
      "L'un des deux moulins à sucre construits par le duc d'Arcos sur ces terres. L'aqueduc conserve le lien avec le reste de la construction en pisé, rappelant les bâtiments médiévaux et évoquant la main-d'œuvre de tradition morisque.",
      "Eine der beiden Zuckerfabriken, die der Herzog von Arcos auf diesen Ländereien errichten ließ. Der Aquädukt bewahrt die Verbindung zum übrigen Bau aus Stampflehm, erinnert an mittelalterliche Bauwerke und lässt an die Arbeitskräfte maurischer Tradition denken.",
    ],
  "Iglesia de San Luis de Sabinillas": [
    "Église de San Luis de Sabinillas",
    "Kirche von San Luis de Sabinillas",
  ],
  "La parroquia de San Luis de Sabinillas se encuentra en el núcleo urbano de San Luis de Sabinillas, en la Plaza de San Luis.":
    [
      "La paroisse de San Luis de Sabinillas se trouve dans le centre urbain de San Luis de Sabinillas, sur la plaza de San Luis.",
      "Die Pfarrei San Luis de Sabinillas befindet sich im Ortskern von San Luis de Sabinillas, an der Plaza de San Luis.",
    ],
  "Parque Villa Matilde": ["Parc Villa Matilde", "Villa-Matilde-Park"],
  "Parque en Sabinillas. La casa que le da nombre fue propiedad de don Ignacio Infante, hermano de Blas Infante, y se expone en ella restos romanos hallados en Manilva.":
    [
      "Parc à Sabinillas. La maison qui lui donne son nom appartenait à don Ignacio Infante, frère de Blas Infante, et présente des vestiges romains retrouvés à Manilva.",
      "Park in Sabinillas. Das namensgebende Haus gehörte Don Ignacio Infante, dem Bruder von Blas Infante, und zeigt römische Funde aus Manilva.",
    ],
  "Parque del Duque": ["Parc du Duque", "Parque del Duque"],
  "Zona verde de Sabinillas para pasear y descansar a pocos minutos del paseo marítimo.":
    [
      "Espace vert de Sabinillas pour se promener et se reposer à quelques minutes de la promenade maritime.",
      "Grünfläche in Sabinillas zum Spazieren und Ausruhen, wenige Minuten von der Strandpromenade entfernt.",
    ],

  // --- Mapa de Manilva: rutas ---
  "Ruta del vino": ["Route du vin", "Weinroute"],
  "Del pueblo a la viña: la plaza, el centro de interpretación y el casco histórico.":
    [
      "Du village à la vigne : la place, le centre d'interprétation et le centre historique.",
      "Vom Dorf zum Weinberg: der Platz, das Interpretationszentrum und die Altstadt.",
    ],
  "Ruta de la costa": ["Route de la côte", "Küstenroute"],
  "Del castillo al paseo de Sabinillas, pasando por el puerto.": [
    "Du château à la promenade de Sabinillas, en passant par le port.",
    "Von der Festung zur Promenade von Sabinillas, vorbei am Hafen.",
  ],
  "Un día completo": ["Une journée complète", "Ein ganzer Tag"],
  "Mañana en el pueblo y tarde en la costa, de la plaza al castillo.": [
    "Matinée au village et après-midi sur la côte, de la place au château.",
    "Vormittag im Dorf und Nachmittag an der Küste, vom Platz zur Festung.",
  ],

  // --- Textos cortos de la interfaz ---
  "Ver en mapa": ["Voir sur la carte", "Auf der Karte sehen"],
  "Ir a su página": ["Aller sur son site", "Zur Website"],
  "Foto no disponible": ["Photo non disponible", "Foto nicht verfügbar"],
  "Filtrar los stands por tipo": [
    "Filtrer les stands par type",
    "Stände nach Art filtern",
  ],
  "FILTRAR ACTIVIDADES POR TIPO": [
    "FILTRER LES ACTIVITÉS PAR TYPE",
    "AKTIVITÄTEN NACH ART FILTERN",
  ],
  "Selecciona las categorías que quieres ver en el programa.": [
    "Sélectionnez les catégories que vous souhaitez voir dans le programme.",
    "Wählen Sie die Kategorien aus, die Sie im Programm sehen möchten.",
  ],
  Anterior: ["Précédent", "Zurück"],
  Siguiente: ["Suivant", "Weiter"],
  "Ver todos los sitios": ["Voir tous les lieux", "Alle Orte anzeigen"],
  "Quitar la ruta": ["Supprimer l'itinéraire", "Route entfernen"],
  "Ver enlace": ["Voir le lien", "Link ansehen"],
  "Ver ubicación": ["Voir l'emplacement", "Standort ansehen"],
  "Pulsa un punto del plano o elige una ruta.": [
    "Appuyez sur un point du plan ou choisissez un itinéraire.",
    "Tippen Sie auf einen Punkt im Plan oder wählen Sie eine Route.",
  ],
  Información: ["Information", "Info"],
  Entrada: ["Entrée", "Eingang"],
};

let lang = "es";

function t(es, en, fr, de) {
  if (lang === "es") return es;
  if (lang === "en") return en;
  const tr = I18N[es] || I18N[String(es).trim()];
  if (tr) return lang === "fr" ? tr[0] : tr[1];
  const extra = lang === "fr" ? fr : de;
  if (extra !== undefined) return extra;
  if (en !== es) i18nMissing.add(es);
  return en;
}

function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved)) lang = saved;
  } catch (e) {}
}

function setLang(code) {
  if (!LANGS.includes(code) || code === lang) return;
  lang = code;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
  renderAll();
}

function make(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function button(className, text) {
  const b = make("button", className, text);
  b.type = "button";
  return b;
}

/* ---------- Textos y selector de idioma ---------- */

function renderStatic() {
  document.documentElement.lang = lang;
  $("header nav").setAttribute(
    "aria-label",
    t("Principal", "Main", "Navigation principale", "Hauptnavigation"),
  );
  $$("[data-es]").forEach((el) => {
    el.textContent = t(el.dataset.es, el.dataset.en);
  });
  $$("#langs button").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang)),
  );
  $("#langs").setAttribute(
    "aria-label",
    t("Idioma", "Language", "Langue", "Sprache"),
  );
  // Un botón por cartel
  [
    ["#dlProgram", "CartelHorarios.jpeg", "Cartel de Horarios Saborea 2026.jpeg"],
    [
      "#dlMain",
      "20261125_Otros_cartel principal.jpeg",
      "Cartel principal Saborea 2026.jpeg",
    ],
    [
      "#dlCandela",
      "20261125_Otros_Concierto Candela.jpeg",
      "Concierto Paco Candela Saborea 2026.jpeg",
    ],
  ].forEach(([sel, file, name]) => {
    const a = $(sel);
    if (!a) return;
    a.href = encodeURI(`assets/horarios/${file}`);
    a.download = name;
  });
  $("#lbPrev").setAttribute(
    "aria-label",
    t("Foto anterior", "Previous photo", "Photo précédente", "Vorheriges Foto"),
  );
  $("#lbNext").setAttribute(
    "aria-label",
    t("Foto siguiente", "Next photo", "Photo suivante", "Nächstes Foto"),
  );
  $("#lbClose").setAttribute(
    "aria-label",
    t("Cerrar", "Close", "Fermer", "Schließen"),
  );
  $("#lb").setAttribute(
    "aria-label",
    t(
      "Fotos de la edición",
      "Edition photos",
      "Photos de l'édition",
      "Fotos der Ausgabe",
    ),
  );
  $$("[data-logo]").forEach((img) => (img.src = LOGOS[img.dataset.logo]));
}

/* ---------- Programa y filtros por tipo ---------- */

const hiddenTypes = new Set();

function renderSchedule() {
  const filters = $("#lg");

  // Encabezado dentro del recuadro
  const heading = make("div", "filter-heading");

  const title = make("div", "filter-title");
  const filterIcon = make("i", "fa-solid fa-filter");
  filterIcon.setAttribute("aria-hidden", "true");

  const titleText = make(
    "b",
    "",
    t("FILTRAR ACTIVIDADES POR TIPO", "FILTER ACTIVITIES BY TYPE"),
  );

  title.append(filterIcon, titleText);

  const description = make(
    "p",
    "",
    t(
      "Selecciona las categorías que quieres ver en el programa.",
      "Select the categories you want to see in the programme.",
    ),
  );

  heading.append(title, description);

  // Botones de categorías
  const buttons = Object.entries(SCHEDULE_TYPES).map(([key, names]) => {
    const b = button("c-" + key, t(...names));

    b.setAttribute("aria-pressed", String(!hiddenTypes.has(key)));

    b.onclick = () => {
      hiddenTypes.has(key) ? hiddenTypes.delete(key) : hiddenTypes.add(key);

      renderSchedule();
      revealNew();
    };

    return b;
  });

  // El encabezado y los botones quedan dentro del mismo recuadro
  filters.replaceChildren(heading, ...buttons);

  // Actividades por días
  $("#days").replaceChildren(
    ...DAYS.map((day) => {
      const [weekday, number] = t(day.es, day.en).split(" ");
      const card = make("div", "dc");
      const head = make("div", "dh");

      head.append(
        make("b", "n script", number),
        make(
          "span",
          "",
          weekday + t(", diciembre", ", December", ", décembre", ", Dezember"),
        ),
      );

      const list = make("ul", "tl");

      day.items.forEach((item) => {
        const key = item[1];

        if (hiddenTypes.has(key)) return;

        const li = make("li", "c-" + key);

        li.append(
          make("time", "", item[0] + " h"),
          make("span", "tx", t(item[2], item[3])),
        );

        list.append(li);
      });

      card.append(head, list);
      return card;
    }),
  );
}

/* ---------- Stands ---------- */

function renderStands() {
  $("#stands").replaceChildren(
    ...STANDS.map(([name, type, descEs, descEn, web], i) => {
      const n = i + 1;
      const card = make("div", "stand");
      card.id = "stand-" + n;
      card.dataset.t = type;

      // Imagen del stand
      const photo = make("div", "ph");
      const img = make("img");

      img.loading = "lazy";
      img.decoding = "async";
      img.width = 1000;
      img.height = 750;
      img.src = `assets/img/stands/${n}.jpg`;
      img.alt = name;

      // Mostrar un mensaje si la imagen no existe
      img.onerror = () => {
        photo.replaceChildren(
          make("span", "", t("Foto no disponible", "Photo unavailable")),
        );
      };

      photo.append(img);

      // Botones: "Ver en mapa" y, si tiene web, "Ir a su página"
      const actions = make("div", "stand-btns");

      const seeOnMap = button("vm", t("Ver en mapa", "See on map"));
      seeOnMap.dataset.n = n;
      actions.append(seeOnMap);

      if (web) {
        const link = make("a", "vm", t("Ir a su página", "Visit website"));
        link.href = web;
        link.target = "_blank";
        link.rel = "noopener";

        const icon = make("i", "fa-solid fa-arrow-up-right-from-square");
        icon.setAttribute("aria-hidden", "true");
        link.append(icon);

        actions.append(link);
      }

      // Información del stand
      const body = make("div", "t");
      body.append(
        make("span", "tg", t(...PRODUCT_TYPES[type])),
        make("b", "", `${n}. ${name}`),
        make("p", "", t(descEs, descEn)),
        actions,
      );

      card.append(photo, body);
      return card;
    }),
  );
}

/* ---------- Mapa: nombres dentro de los stands ---------- */

// Parte el nombre en líneas de como máximo maxChars caracteres
function wrapName(name, maxChars) {
  const lines = [];
  let line = "";
  name.split(" ").forEach((word) => {
    const next = line ? line + " " + word : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else line = next;
  });
  if (line) lines.push(line);
  return lines;
}

// Escribe en cada stand del plano su número y su nombre (desde STANDS), ajustado al recuadro
function renderMapLabels() {
  const NS = "http://www.w3.org/2000/svg";
  const addText = (g, x, y, style, text) => {
    const el = document.createElementNS(NS, "text");
    el.setAttribute("class", "mp-n");
    el.setAttribute("x", x);
    el.setAttribute("y", y);
    el.setAttribute("style", style);
    el.textContent = text;
    g.append(el);
  };

  $$(".mp-s").forEach((g) => {
    const n = Number(g.dataset.n);
    const [name, type] = STANDS[n - 1];
    const shown = name;
    g.dataset.t = type;
    g.setAttribute("aria-label", `${n}. ${shown}`);
    $("title", g).textContent = `${n}. ${shown}`;

    const rect = $("rect", g);
    const x = parseFloat(rect.getAttribute("x"));
    const y = parseFloat(rect.getAttribute("y"));
    const w = parseFloat(rect.getAttribute("width"));
    const h = parseFloat(rect.getAttribute("height"));

    // letra lo más grande posible (de 14 a 10) para que quepa en 3 líneas
    let size = 14,
      lines;
    for (; size >= 10; size--) {
      const max = Math.floor((w - 12) / (size * 0.56));
      lines = wrapName(shown, max);
      if (lines.length <= 3 && lines.every((l) => l.length <= max)) break;
    }

    // número + nombre, centrados en vertical dentro del stand
    const lineH = size * 1.15;
    const top = y + (h - (20 + lines.length * lineH)) / 2;
    $$("text", g).forEach((el) => el.remove());
    addText(g, x + w / 2, top + 8, "font-size:16px;font-weight:700", n);
    lines.forEach((l, i) =>
      addText(
        g,
        x + w / 2,
        top + 20 + lineH / 2 + i * lineH,
        `font-size:${size}px`,
        l,
      ),
    );
  });
}

/* ---------- Mapa: filtros por tipo ---------- */

const highlightedTypes = new Set();

function applyMapFilter() {
  const any = highlightedTypes.size > 0;
  $$(".mp-s").forEach((g) =>
    g.classList.toggle("dim", any && !highlightedTypes.has(g.dataset.t)),
  );
}

function renderMapFilters() {
  const box = $("#mf");
  box.setAttribute("role", "group");
  box.setAttribute(
    "aria-label",
    t("Filtrar los stands por tipo", "Filter stands by type"),
  );
  box.replaceChildren(
    ...Object.entries(PRODUCT_TYPES).map(([key, names]) => {
      const b = button("", t(...names));
      b.dataset.t = key;
      b.setAttribute("aria-pressed", String(highlightedTypes.has(key)));
      b.onclick = () => {
        highlightedTypes.has(key)
          ? highlightedTypes.delete(key)
          : highlightedTypes.add(key);
        b.setAttribute("aria-pressed", String(highlightedTypes.has(key)));
        applyMapFilter();
      };
      return b;
    }),
  );
}

/* ---------- Mapa: ampliar y mover (pellizcar, arrastrar o botones) ---------- */

const MAP_MAX_ZOOM = 4;
const mapView = { scale: 1, x: 0, y: 0 };
const mapPointers = new Map(); // dedos o ratón que están tocando el plano
let mapPinch = null; // distancia y zoom al empezar a pellizcar
let mapMoved = 0; // cuánto se ha arrastrado, para no confundirlo con un toque

function applyMapView() {
  const pane = $("#mapView");
  const box = pane.parentElement;
  const w = box.clientWidth;
  const h = box.clientHeight;
  // el plano no puede salirse del recuadro
  mapView.x = Math.min(0, Math.max(w - w * mapView.scale, mapView.x));
  mapView.y = Math.min(0, Math.max(h - h * mapView.scale, mapView.y));
  pane.style.transform = `translate(${mapView.x}px, ${mapView.y}px) scale(${mapView.scale})`;
  pane.classList.toggle("zoomed", mapView.scale > 1.01);
}

// Cambia el zoom manteniendo fijo el punto (cx, cy)
function zoomMapAt(cx, cy, scale) {
  const next = Math.min(MAP_MAX_ZOOM, Math.max(1, scale));
  const k = next / mapView.scale;
  mapView.x = cx - (cx - mapView.x) * k;
  mapView.y = cy - (cy - mapView.y) * k;
  mapView.scale = next;
  applyMapView();
}

function resetMapView() {
  mapView.scale = 1;
  mapView.x = 0;
  mapView.y = 0;
  applyMapView();
}

function setupMapGestures() {
  const pane = $("#mapView");
  const box = pane.parentElement;
  const rel = (e) => {
    const r = box.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const center = () => ({ x: box.clientWidth / 2, y: box.clientHeight / 2 });

  pane.addEventListener("pointerdown", (e) => {
    mapPointers.set(e.pointerId, rel(e));
    mapMoved = 0;
    if (mapPointers.size === 2) {
      const [a, b] = [...mapPointers.values()];
      mapPinch = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale: mapView.scale,
      };
    }
  });

  addEventListener("pointermove", (e) => {
    if (!mapPointers.has(e.pointerId)) return;
    const prev = mapPointers.get(e.pointerId);
    const now = rel(e);
    mapPointers.set(e.pointerId, now);
    mapMoved += Math.abs(now.x - prev.x) + Math.abs(now.y - prev.y);

    if (mapPointers.size === 2 && mapPinch) {
      const [a, b] = [...mapPointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomMapAt(
        (a.x + b.x) / 2,
        (a.y + b.y) / 2,
        mapPinch.scale * (dist / mapPinch.dist),
      );
    } else if (mapPointers.size === 1 && mapView.scale > 1.01) {
      mapView.x += now.x - prev.x;
      mapView.y += now.y - prev.y;
      applyMapView();
      pane.classList.add("panning");
    }
  });

  const release = (e) => {
    mapPointers.delete(e.pointerId);
    if (mapPointers.size < 2) mapPinch = null;
    if (!mapPointers.size) pane.classList.remove("panning");
  };
  addEventListener("pointerup", release);
  addEventListener("pointercancel", release);

  // si se ha arrastrado, no cuenta como pulsar un stand
  pane.addEventListener(
    "click",
    (e) => {
      if (mapMoved > 8) {
        e.stopPropagation();
        e.preventDefault();
      }
      mapMoved = 0;
    },
    true,
  );

  // ordenador: Ctrl + rueda del ratón para ampliar
  box.addEventListener(
    "wheel",
    (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const p = rel(e);
      zoomMapAt(p.x, p.y, mapView.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
    },
    { passive: false },
  );

  $("#zoomIn").addEventListener("click", () =>
    zoomMapAt(center().x, center().y, mapView.scale * 1.5),
  );
  $("#zoomOut").addEventListener("click", () =>
    zoomMapAt(center().x, center().y, mapView.scale / 1.5),
  );
  $("#zoomReset").addEventListener("click", resetMapView);
  addEventListener("resize", applyMapView);
}

/* ---------- Ediciones anteriores: galería y visor ---------- */

// Fotos de la edición (o huecos mientras no haya fotos)
const editionPhotos = (year) =>
  EDITIONS[year].photos.length
    ? EDITIONS[year].photos
    : Array.from({ length: PLACEHOLDER_SLIDES }, () => null);

const photoLabel = (i, total) =>
  t(
    `Foto ${i + 1} de ${total}`,
    `Photo ${i + 1} of ${total}`,
    `Photo ${i + 1} sur ${total}`,
    `Foto ${i + 1} von ${total}`,
  );

// Contenido de una foto: la imagen, o un hueco si todavía no está
function photoContent(photo, i, year) {
  if (!photo)
    return make(
      "div",
      "ph",
      t(
        `Foto ${i + 1} de ${year} (pendiente)`,
        `Photo ${i + 1}, ${year} (coming soon)`,
        `Photo ${i + 1} de ${year} (à venir)`,
        `Foto ${i + 1}, ${year} (folgt)`,
      ),
    );
  const img = make("img");
  img.loading = "lazy";
  img.decoding = "async";
  img.width = 1400;
  img.height = 1050;
  img.dataset.full = photo.src;
  // Si la miniatura no existe en el servidor, usar la foto grande como respaldo
  img.onerror = () => {
    const fullUrl = new URL(photo.src, location.href).href;
    if (img.src !== fullUrl) img.src = fullUrl;
  };
  img.src = photo.thumb || photo.src;
  img.alt =
    photo.alt ||
    t(
      `Edición ${year}, foto ${i + 1}`,
      `${year} edition, photo ${i + 1}`,
      `Édition ${year}, photo ${i + 1}`,
      `Ausgabe ${year}, Foto ${i + 1}`,
    );
  return img;
}

function renderEditions() {
  const year = String(editionYear);
  const photos = editionPhotos(year);
  $("#edTitle").textContent = t(
    `Edición ${year}`,
    `${year} edition`,
    `Édition ${year}`,
    `Ausgabe ${year}`,
  );
  $("#edDates").textContent = t(...EDITIONS[year].dates);
  const ordinalFr =
    { 2023: "Ire", 2024: "IIe", 2025: "IIIe" }[year] || EDITIONS[year].num[0];
  $("#edNum").textContent = t(
    `${EDITIONS[year].num[0]} Edición`,
    `${EDITIONS[year].num[1]} edition`,
    `${ordinalFr} édition`,
    `${EDITIONS[year].num[0]}. Ausgabe`,
  );
  $("#edHighlights").replaceChildren(
    ...EDITIONS[year].boxes.map((item) => {
      const box = make("div", "box");
      box.append(
        make("b", "", t(item[0], item[1])),
        make("span", "", t(item[2], item[3])),
      );
      return box;
    }),
  );
  $("#gallery").replaceChildren(
    ...photos.map((photo, i) => {
      const thumb = button("thumb");
      thumb.dataset.i = i;
      const label = photoLabel(i, photos.length);
      thumb.setAttribute(
        "aria-label",
        t(
          `Abrir la ${label.toLowerCase()}`,
          `Open ${label.toLowerCase()}`,
          `Ouvrir la ${label.toLowerCase()}`,
          `Öffnen: ${label}`,
        ),
      );
      thumb.append(photoContent(photo, i, year));
      return thumb;
    }),
  );
  revealNew();
}

// Visor: se abre al pulsar una foto y se pasan una detrás de otra
let viewerOpener = null;

const viewerOpen = () => !$("#lb").hidden;

function viewerIndex() {
  const track = $("#lbTrack");
  return Math.round(track.scrollLeft / track.clientWidth) || 0;
}

// Sube a la foto grande solo la diapositiva actual y sus vecinas (el resto se queda en miniatura)
function loadFullAround(index) {
  const slides = $$(".lb-slide");
  [index - 1, index, index + 1].forEach((j) => {
    const img = slides[j] && slides[j].querySelector("img[data-full]");
    if (img && !img.dataset.fullLoaded) {
      img.dataset.fullLoaded = "1";
      img.src = img.dataset.full;
    }
  });
}

function updateViewer() {
  const total = $$(".lb-slide").length;
  const index = Math.min(viewerIndex(), total - 1);
  loadFullAround(index);
  $("#lbCount").textContent = `${index + 1} / ${total}`;
  $("#lbPrev").disabled = index <= 0;
  $("#lbNext").disabled = index >= total - 1;
}

function viewerGo(i) {
  const track = $("#lbTrack");
  const last = $$(".lb-slide").length - 1;
  const behavior = REDUCED_MOTION.matches ? "auto" : "smooth";
  track.scrollTo({
    left: Math.max(0, Math.min(i, last)) * track.clientWidth,
    behavior,
  });
}

function openViewer(index, opener) {
  const year = String(editionYear);
  const photos = editionPhotos(year);
  $("#lbTrack").replaceChildren(
    ...photos.map((photo, i) => {
      const slide = make("div", "lb-slide");
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-label", photoLabel(i, photos.length));
      const pic = make("div", "pic"); // marco del mismo tamaño para todas las fotos
      pic.append(photoContent(photo, i, year));
      slide.append(pic);
      return slide;
    }),
  );
  viewerOpener = opener;
  $("#lb").hidden = false;
  document.body.classList.add("lb-open");
  $("#lbTrack").scrollTo({
    left: index * $("#lbTrack").clientWidth,
    behavior: "auto",
  });
  updateViewer();
  $("#lbClose").focus();
}

function closeViewer() {
  if (!viewerOpen()) return;
  $("#lb").hidden = true;
  document.body.classList.remove("lb-open");
  if (viewerOpener) viewerOpener.focus();
}

// Mantiene el foco del teclado dentro del visor mientras está abierto
function trapFocus(e) {
  const items = [$("#lbClose"), $("#lbPrev"), $("#lbNext")].filter(
    (b) => !b.disabled,
  );
  const i = items.indexOf(document.activeElement);
  const next = e.shiftKey
    ? i <= 0
      ? items.length - 1
      : i - 1
    : i === items.length - 1
      ? 0
      : i + 1;
  e.preventDefault();
  items[next].focus();
}

/* ---------- Cómo llegar: mapas y botones ---------- */

function setupLocation() {
  const q = encodeURIComponent(PLACE);
  $("#mapPlace").src =
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415.4784599100609!2d-5.248163327171457!3d36.37606307263556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0cdbabd903048d%3A0xff4b10a4261384da!2sPlaza%20De%20La%20Vendimia!5e1!3m2!1ses!2ses!4v1793091294047!5m2!1ses!2ses`;
  $("#mapParking").src =
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d698.7573533539946!2d-5.248898263395008!3d36.37509925763102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0cdb72f2ca8cfd%3A0x16471b0584648d30!2sAparcamiento!5e1!3m2!1ses!2ses!4v1793091537902!5m2!1ses!2ses`;
  $("#goGoogle").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  $("#goApple").href = `https://maps.apple.com/?q=${q}`;
  $("#goWaze").href = `https://waze.com/ul?q=${q}&navigate=yes`;
  $("#goParking").href = `https://maps.app.goo.gl/v1W8nLMjzUvsyy796`;
}

/* ---------- Cuenta atrás ---------- */

function tick() {
  const box = $("#count");
  const diff = EVENT_START - new Date();

  if (diff <= 0) {
    box.replaceChildren(
      make(
        "p",
        "count-done",
        t(
          "¡Saborea ya está aquí!",
          "Saborea is here!",
          "Saborea est déjà là !",
          "Saborea ist da!",
        ),
      ),
    );
    return;
  }

  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const two = (n) => String(n).padStart(2, "0");

  const parts = [
    [
      days,
      t(
        days === 1 ? "día" : "días",
        days === 1 ? "day" : "days",
        days === 1 ? "jour" : "jours",
        days === 1 ? "Tag" : "Tage",
      ),
    ],
    [
      two(Math.floor((total % 86400) / 3600)),
      t("horas", "hours", "heures", "Stunden"),
    ],
    [two(Math.floor((total % 3600) / 60)), t("min", "min", "min", "Min.")],
    [two(total % 60), t("seg", "sec", "s", "Sek.")],
  ];

  // Se crean los cuatro bloques una vez y luego solo se cambia el texto (sin parpadeo)
  if (box.children.length !== 4 || box.querySelector(".count-done")) {
    box.replaceChildren(
      ...parts.map(() => {
        const d = make("div");
        d.append(make("b"), document.createTextNode(""));
        return d;
      }),
    );
  }
  parts.forEach(([value, label], i) => {
    const d = box.children[i];
    d.firstChild.textContent = value;
    d.lastChild.textContent = label;
  });
}

/* ---------- Decoración de Descubre Manilva ---------- */

// Guirnalda colgante de Descubre Manilva: festones con bombillas siguiendo la curva
function buildTalesLights() {
  const box = $("#talesLights");
  if (!box) return;
  const NS = "http://www.w3.org/2000/svg";
  const SWAGS = 7; // número de arcos
  const SAG = 34; // caída máxima del arco, en px
  const H = 70; // alto del SVG, en px
  const step = 100 / SWAGS;

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 100 ${H}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  let d = "M0,1";
  for (let s = 0; s < SWAGS; s++) {
    const x0 = s * step;
    d += ` Q${x0 + step / 2},${1 + SAG * 2} ${x0 + step},1`;
  }
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "tales-cable");
  svg.append(path);
  box.append(svg);

  // dos bombillas por arco, colocadas sobre la curva (t = 0.3 y 0.7)
  let n = 0;
  for (let s = 0; s < SWAGS; s++) {
    [0.3, 0.7].forEach((tt) => {
      const x = s * step + step * tt;
      const y = 1 + 4 * tt * (1 - tt) * SAG;
      const bulb = make("i");
      bulb.style.setProperty("--n", n++);
      bulb.style.left = x + "%";
      bulb.style.top = y + "px";
      box.append(bulb);
    });
  }
}

/* ---------- Aparición al hacer scroll ---------- */

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      )
    : null;

function revealNew() {
  if (!revealObserver) return;
  $$(".box, .how-card, .dc, .stand, .mapbox, .thumb, #p-inicio h3").forEach(
    (el) => {
      if (el.dataset.reveal) return;
      el.dataset.reveal = "1";
      el.classList.add("rv");
      revealObserver.observe(el);
    },
  );
}

/* ---------- Navegación entre páginas ---------- */

// Secciones de Inicio a las que se llega con un enlace (#horario, #llegar)
const SECTIONS = { horario: "#programa", llegar: "#llegar" };

let currentPage = "inicio";
let routed = false; // false hasta la primera ruta (para no mover el foco al cargar)
let pendingJump = null; // { sel, cls }: elemento al que ir tras cambiar de página

// Quita cualquier resaltado anterior (si no, al volver a mostrar la página se repite su animación)
function clearHighlights() {
  $$(".pulse, .ping, .hl").forEach((el) => {
    clearTimeout(el._hlTimer);
    el.classList.remove("pulse", "ping", "hl");
  });
}

function highlight(el, cls, ms = 4500) {
  clearHighlights();
  void el.getBoundingClientRect(); // reinicia la animación
  el.classList.add(cls);
  el._hlTimer = setTimeout(() => el.classList.remove(cls), ms);
}

function updateHeader() {
  document.body.classList.toggle(
    "sc",
    scrollY > 40 || currentPage !== "inicio",
  );
}

function closeSub() {
  $("#subMenu").hidden = true;
  $("#subBtn").setAttribute("aria-expanded", "false");
}

function route() {
  clearHighlights();
  const raw = (location.hash || "#inicio").slice(1);
  const edition = /^edicion-(\d{4})$/.exec(raw);
  const validEdition = edition && EDITIONS[edition[1]];
  const page = SECTIONS[raw]
    ? "inicio"
    : validEdition
      ? "ediciones"
      : document.getElementById("p-" + raw)
        ? raw
        : "inicio";
  if (validEdition) editionYear = Number(edition[1]);
  if (page === "ediciones") renderEditions();

  $$(".page").forEach((p) => p.classList.toggle("on", p.id === "p-" + page));
  const activeHref =
    raw === "horario"
      ? "#horario"
      : page === "ediciones"
        ? "#edicion-" + editionYear
        : "#" + page;
  if (page === "ediciones") $("#subBtn").setAttribute("aria-current", "page");
  else $("#subBtn").removeAttribute("aria-current");
  $$("nav a").forEach((a) => {
    if (a.getAttribute("href") === activeHref)
      a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  const samePage = currentPage === page;
  const behavior = REDUCED_MOTION.matches ? "auto" : "smooth";
  currentPage = page;
  closeSub();
  closeViewer();
  if (!samePage) talesStart(page);

  // al cambiar de página, el foco pasa al título (lectores de pantalla y teclado)
  if (!samePage && routed) {
    const heading = $("#p-" + page + " h1, #p-" + page + " h3");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }
  routed = true;

  if (SECTIONS[raw]) {
    if (!samePage) scrollTo(0, 0);
    const target = $(SECTIONS[raw]);
    setTimeout(
      () => {
        target.scrollIntoView({ behavior, block: "start" });
        highlight(target, "hl");
      },
      samePage ? 0 : 220,
    );
  } else {
    scrollTo({ top: 0, behavior: samePage ? behavior : "auto" });
  }
  updateHeader();

  if (pendingJump) {
    const { sel, cls } = pendingJump;
    pendingJump = null;
    const target = $(sel);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior, block: "center", inline: "center" });
        highlight(target, cls);
      }, 260);
    }
  }
}

function go(hash, jump) {
  pendingJump = jump;
  if (location.hash === hash) route();
  else location.hash = hash;
}

const goToStand = (n) => go("#productos", { sel: `#stand-${n}`, cls: "pulse" });

function goToMap(n) {
  resetMapView(); // que el stand se vea aunque el plano estuviera ampliado
  highlightedTypes.clear(); // por si el stand quedara apagado por un filtro
  renderMapFilters();
  applyMapFilter();
  go("#mapa", { sel: `.mp-s[data-n="${n}"]`, cls: "ping" });
}

/* ---------- Arranque ---------- */

function renderAll() {
  renderStatic();
  renderSchedule();
  renderStands();
  renderMapLabels();
  renderMapFilters();
  applyMapFilter();
  renderEditions();
  renderQueHacer();
  // El plano de "Qué hacer" ya está dibujado: se repinta para traducir
  // rótulos y fichas en el mismo instante del cambio de idioma.
  if ($("#qmPins")) renderQueHacerMap();
  renderTales();
  renderA11y();
  syncTalesPause();
  tick();
}

/* ---------- Eventos ---------- */

addEventListener("hashchange", route);
addEventListener("scroll", updateHeader, { passive: true });
addEventListener("keydown", (e) => {
  const open = viewerOpen();
  if (e.key === "Escape") {
    closeSub();
    closeViewer();
  }
  if (open && e.key === "ArrowLeft") viewerGo(viewerIndex() - 1);
  if (open && e.key === "ArrowRight") viewerGo(viewerIndex() + 1);
  if (open && e.key === "Tab") trapFocus(e);
});

$("#langs").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-lang]");
  if (b) setLang(b.dataset.lang);
});

// Submenú de Ediciones
$("#subBtn").addEventListener("click", () => {
  const opening = $("#subMenu").hidden;
  $("#subMenu").hidden = !opening;
  $("#subBtn").setAttribute("aria-expanded", String(opening));
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".sub")) closeSub();
});

// Pulsar un enlace de la página en la que ya estás no cambia el hash: se fuerza la ruta
$$('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", () => {
    const href = a.getAttribute("href");
    if (href === (location.hash || "#inicio")) setTimeout(route, 0);
  }),
);

// Mapa: pulsar un stand lleva a su tarjeta
const mapBox = $(".mapbox");
mapBox.addEventListener("click", (e) => {
  const g = e.target.closest("g[data-n]");
  if (g) goToStand(g.dataset.n);
});
mapBox.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const g = e.target.closest("g[data-n]");
  if (g) {
    e.preventDefault();
    goToStand(g.dataset.n);
  }
});

// Stands: "Ver en mapa"
$("#stands").addEventListener("click", (e) => {
  const b = e.target.closest("button.vm");
  if (b) goToMap(b.dataset.n);
});

// Galería: pulsar una foto abre el visor
$("#gallery").addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (thumb) openViewer(Number(thumb.dataset.i), thumb);
});

// Visor de fotos
$("#lbClose").addEventListener("click", closeViewer);
$("#lbPrev").addEventListener("click", () => viewerGo(viewerIndex() - 1));
$("#lbNext").addEventListener("click", () => viewerGo(viewerIndex() + 1));
$("#lbTrack").addEventListener("scroll", updateViewer, { passive: true });
$("#lb").addEventListener("click", (e) => {
  // pulsar fuera de la foto cierra el visor
  if (e.target.id === "lb" || e.target.classList.contains("lb-slide"))
    closeViewer();
});

// ===== DESCUBRE MANILVA (carrusel del pie) =====
// Tipos: h = historia · v = vino · g = gastronomía · f = la feria
const KIND_NAMES = {
  h: ["Historia", "History", "fa-landmark"],
  v: ["Vino", "Wine", "fa-wine-glass"],
  g: ["Gastronomía", "Gastronomy", "fa-fish"],
  f: ["Saborea", "Saborea", "fa-champagne-glasses"],
};

// Crea el icono Font Awesome de un tipo
function kindIcon(kind) {
  const i = make("i", "fa-solid " + KIND_NAMES[kind][2]);
  i.setAttribute("aria-hidden", "true");
  return i;
}

// Etiqueta con icono + nombre (para las tarjetas)
function kindLabel(kind) {
  const span = make("span", "k");
  span.append(
    kindIcon(kind),
    " " + t(KIND_NAMES[kind][0], KIND_NAMES[kind][1]),
  );
  return span;
}

// Con qué tema arranca el carrusel en cada página
const TALES_START = {
  inicio: "h",
  productos: "v",
  mapa: "g",
  quehacer: "g",
  ediciones: "f",
};

const ARTICLES = [
  [
    "h",
    "Frontera y señorío",
    "Frontier and lordship",
    "Tras la conquista cristiana de Casares en 1485, Manilva quedó integrada en su señorío y permaneció vinculada a esta villa durante siglos. En 1530 surgió el Cortijo de Manilva, un asentamiento impulsado para repoblar y proteger los terrenos cercanos a la costa.",
    "After the Christian conquest of Casares in 1485, Manilva became part of its lordship and remained linked to the town for centuries. In 1530, the Cortijo de Manilva settlement emerged as an initiative to repopulate and protect the areas near the coast.",
  ],

  [
    "h",
    "Cuando Manilva fue azúcar",
    "When sugar shaped Manilva",
    "Durante siglos, el cultivo de la caña de azúcar tuvo un papel importante en la economía de Manilva. A finales del siglo XIX, la familia Larios impulsó la modernización de esta actividad con la creación del Ingenio de San Luis de Sabinillas, una de las industrias azucareras más occidentales del litoral mediterráneo.",
    "For centuries, sugar cane cultivation played an important role in Manilva's economy. In the late 19th century, the Larios family helped modernise the industry with the creation of the San Luis de Sabinillas sugar factory, one of the westernmost sugar industries on the Mediterranean coast.",
  ],

  [
    "h",
    "Un museo para la viña",
    "A centre for the vineyards",
    "El CIVIMA, Centro de Interpretación de las Viñas de Manilva, abrió sus puertas en octubre de 2013. Cuenta con unos 1.000 m² dedicados a la cultura del vino, con bodega, laboratorio y espacios expositivos. Se encuentra junto a la Plaza de la Vendimia.",
    "CIVIMA, the Manilva Vineyards Interpretation Centre, opened in October 2013. It has around 1,000 m² dedicated to wine culture, including a winery, laboratory and exhibition spaces. It is located next to Plaza de la Vendimia.",
  ],

  [
    "v",
    "Moscatel frente al mar",
    "Muscat by the sea",
    "La uva Moscatel de Alejandría forma parte de la identidad agrícola de Manilva. Sus viñedos crecen en laderas cercanas al Mediterráneo y han dado lugar tradicionalmente a uvas frescas, pasas y vinos dulces. Actualmente también se elaboran vinos blancos secos, como los de la bodega Nilva.",
    "Muscat of Alexandria grapes are part of Manilva's agricultural identity. The vineyards grow on hillsides near the Mediterranean and have traditionally produced fresh grapes, raisins and sweet wines. Today, dry white wines are also made, such as those produced by Nilva winery.",
  ],

  [
    "v",
    "Salvar las viñas",
    "Saving the vineyards",
    "La bodega Nilva estima que el 75% de las viñas de la zona han desaparecido en los últimos 25 años. Nació en 2014 con el proyecto de recuperar las cepas viejas de moscatel y compartirlas con los visitantes.",
    "Nilva winery estimates that 75% of the local vineyards have disappeared in the last 25 years. It was founded in 2014 to recover the old Muscat vines and share them with visitors.",
  ],

  [
    "v",
    "Cuatro bodegas, un mismo moscatel",
    "Four wineries, one Muscat",
    "Ana García, Bocanegra, Manilva y Nilva son las cuatro bodegas presentes en la feria. Todas trabajan el moscatel de Alejandría y las encontrarás en los stands de vino.",
    "Ana García, Bocanegra, Manilva and Nilva are the four wineries at the fair. All of them work with Muscat of Alexandria, and you will find them at the wine stands.",
  ],

  [
    "v",
    "La Fiesta de la Vendimia",
    "The Grape Harvest Festival",
    "La Feria de la Vendimia es una de las celebraciones más tradicionales de Manilva, dedicada a la cultura del vino y a las raíces vitivinícolas del municipio. Durante la feria se rinde homenaje a la uva y al trabajo de los viticultores con actividades, degustaciones, música y tradiciones populares.",
    "The Grape Harvest Festival is one of Manilva's most traditional celebrations, dedicated to wine culture and the municipality's winemaking heritage. During the festival, tribute is paid to grapes and the work of local winegrowers through activities, tastings, music and popular traditions.",
  ],

  [
    "g",
    "Del mar a la mesa",
    "From sea to table",
    "La cercanía del Mediterráneo marca la gastronomía de Manilva. El pescado fresco, los mariscos y los productos de la costa son protagonistas de una cocina ligada al mar, donde destacan preparaciones como los espetos de sardinas y la fritura malagueña.",
    "The proximity of the Mediterranean shapes Manilva's gastronomy. Fresh fish, seafood and local coastal produce are at the heart of a cuisine closely linked to the sea, featuring dishes such as grilled sardine skewers and Málaga-style fried fish.",
  ],

  [
    "g",
    "Cocina marinera",
    "Seafaring cuisine",
    "Papas guisadas con raya, fideos con almejas, potaje de jibias con garbanzos, sopa de pescado, tortilla de bacalao o boquerones en escabeche: platos tradicionales de la cocina marinera de Manilva.",
    "Stewed potatoes with skate, noodles with clams, cuttlefish and chickpea stew, fish soup, salt cod omelette or pickled anchovies: traditional dishes of Manilva's seafaring cuisine.",
  ],

  [
    "g",
    "La moraga",
    "The moraga",
    "La moraga es una tradición muy arraigada en Manilva que consiste en reunirse junto al mar para asar sardinas en espetos sobre las brasas, especialmente durante las noches de verano. Para facilitar esta costumbre, el Ayuntamiento tiene barcas municipales habilitadas en distintos puntos del litoral, que pueden solicitarse mediante reserva durante la temporada estival.",
    "The moraga is a long-standing tradition in Manilva, bringing people together by the sea to grill sardines on wooden skewers over hot embers, especially on summer evenings. To support this tradition, the Town Council have municipal boats at various points along the coastline, which residents can reserve during the summer season.",
  ],

  [
    "f",
    "Vino de la tierra",
    "Local wine",
    "Vinos de Manilva, que se juzgan por categorías en el Concurso del Vino de Manilva. El sábado 5 de diciembre el jurado se reúne a las 11:30, los premios se entregan a las 15:00, se degustan los vinos presentados a las 15:15 y a las 16:00 hay cata.",
    "Manilva wines, judged by category at the Manilva Wine Contest. On Saturday 5 December the jury meets at 11:30, prizes are awarded at 15:00, the wines entered are tasted at 15:15 and there is a wine tasting at 16:00.",
  ],

  [
    "f",
    "Tapas y embutidos",
    "Tapas and cured meats",
    "Tapas con productos de la zona, además de embutidos, jamón y queso para acompañar el vino.",
    "Tapas made with local products, plus cured meats, ham and cheese to go with the wine.",
  ],

  [
    "f",
    "Showcooking y degustaciones",
    "Showcooking and tastings",
    "Showcooking con degustación gratuita, con aforo de 100 personas cada uno: el sábado 5 de diciembre de 12:00 a 14:30 con la cocina de Dani (cafetería de la plaza) y el domingo 6 de diciembre de 13:30 a 14:30 con La Caleta.",
    "Showcooking with free tasting, limited to 100 people each: on Saturday 5 December from 12:00 to 14:30 with Dani's cuisine (the square's café) and on Sunday 6 December from 13:30 to 14:30 with La Caleta.",
  ],

  [
    "f",
    "Jamón y cortadores",
    "Ham and carvers",
    "El domingo 6 de diciembre, de 11:30 a 13:30, se celebra el Concurso Nacional de Corte de Jamón POPI. Se trata de un evento benéfico en el que, mediante la donación de 3 kilos de alimentos, los asistentes podrán disfrutar de un plato de jamón.",
    "On Sunday 6 December, from 11:30 to 13:30, the POPI National Ham-Carving Competition takes place. This is a charity event where visitors can enjoy a plate of ham in exchange for donating 3 kilos of food.",
  ],

  [
    "f",
    "Repostería navideña",
    "Christmas sweets",
    "En ediciones anteriores se ha celebrado un concurso de dulces navideños caseros, con entrega de premios.",
    "Previous editions have included a homemade Christmas sweets contest, with prizes.",
  ],
];

/* ---------- Descubre Manilva: carrusel del pie ---------- */

const TALES_MS = 4500;
const TALES_SLIDE_MS = 500;
let talesPos = 0;
let talesView = 0;
let talesPaused = false;
let talesHover = false;
let talesTimer = null;
let talesBusy = false;

const talesPerView = () => (innerWidth >= 1000 ? 3 : innerWidth >= 700 ? 2 : 1);

function scheduleTales() {
  clearTimeout(talesTimer);
  if (talesPaused || talesHover) return;
  talesTimer = setTimeout(() => {
    if (document.hidden) scheduleTales();
    else talesGo(1);
  }, TALES_MS);
}

// Se pintan las tarjetas visibles + 1 a cada lado, para poder deslizar en ambos sentidos
function renderTales() {
  const n = ARTICLES.length;
  talesView = talesPerView();
  talesBusy = false;

  const slots = [];
  for (let i = -1; i <= talesView; i++) {
    const idx = (((talesPos + i) % n) + n) % n;
    const [kind, titleEs, titleEn, textEs, textEn] = ARTICLES[idx];

    const slot = make("div", "art-slot");
    slot.style.flexBasis = 100 / talesView + "%";
    // las tarjetas fuera de pantalla no se leen dos veces
    if (i < 0 || i >= talesView) slot.setAttribute("aria-hidden", "true");

    const card = make("article", "art");
    card.dataset.k = kind;
    card.append(
      kindLabel(kind),
      make("h4", "", t(titleEs, titleEn)),
      make("p", "", t(textEs, textEn)),
    );
    slot.append(card);
    slots.push(slot);
  }

  const track = $("#talesTrack");
  track.style.transition = "none";
  track.style.transform = `translateX(-${100 / talesView}%)`;
  track.replaceChildren(...slots);
  fixTalesHeight();

  $("#talesPrev").setAttribute("aria-label", t("Anterior", "Previous"));
  $("#talesNext").setAttribute("aria-label", t("Siguiente", "Next"));
}

// Fija la altura del carrusel a la de la tarjeta más alta, para que no "baile"
function fixTalesHeight() {
  const track = $("#talesTrack");
  const viewport = track.parentElement;
  const view = talesPerView();

  // maqueta invisible con TODAS las tarjetas, al mismo ancho que el carrusel real
  const probe = make("div", "tales-track");
  probe.style.cssText =
    "position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;width:" +
    track.offsetWidth +
    "px";
  probe.setAttribute("aria-hidden", "true");
  ARTICLES.forEach(([kind, titleEs, titleEn, textEs, textEn]) => {
    const slot = make("div", "art-slot");
    slot.style.flexBasis = 100 / view + "%";
    const card = make("article", "art");
    card.dataset.k = kind;
    card.append(
      kindLabel(kind),
      make("h4", "", t(titleEs, titleEn)),
      make("p", "", t(textEs, textEn)),
    );
    slot.append(card);
    probe.append(slot);
  });

  viewport.append(probe);
  const tallest = Math.max(...$$(".art", probe).map((c) => c.offsetHeight));
  probe.remove();

  track.style.minHeight = tallest + "px";
}

// Pasa UNA tarjeta (dir = 1 siguiente, -1 anterior) con deslizamiento
function talesGo(dir) {
  if (talesBusy) return;
  const n = ARTICLES.length;
  const finish = () => {
    talesPos = (((talesPos + dir) % n) + n) % n;
    renderTales();
    scheduleTales();
  };

  clearTimeout(talesTimer);

  if (REDUCED_MOTION.matches) {
    finish();
    return;
  }

  talesBusy = true;
  const track = $("#talesTrack");
  track.style.transition = `transform ${TALES_SLIDE_MS}ms ease`;
  track.style.transform = `translateX(-${(100 / talesView) * (1 + dir)}%)`;
  setTimeout(finish, TALES_SLIDE_MS + 20);
}

function setupTalesNav() {
  $("#talesPrev").addEventListener("click", () => talesGo(-1));
  $("#talesNext").addEventListener("click", () => talesGo(1));
}

// Al cambiar de página, el carrusel arranca por un tema distinto
function talesStart(page) {
  const i = ARTICLES.findIndex((a) => a[0] === TALES_START[page]);
  if (i >= 0) talesPos = i;
  renderTales();
  scheduleTales();
}

// Página «¿Qué hacer en Manilva?»: todos los artículos de Descubre Manilva
function renderQueHacer() {
  const list = $("#quehacerList");
  if (!list) return;
  list.replaceChildren(
    ...ARTICLES.map(([kind, titleEs, titleEn, textEs, textEn]) => {
      const box = make("div", "box");
      box.dataset.k = kind;
      const title = make("b");
      title.append(
        kindIcon(kind),
        ` ${t(KIND_NAMES[kind][0], KIND_NAMES[kind][1])} · ${t(titleEs, titleEn)}`,
      );
      box.append(title, make("span", "", t(textEs, textEn)));
      return box;
    }),
  );
}

// Descubre Manilva
// El botón «¿Qué hacer en Manilva?» es un enlace normal a #quehacer.

const talesBox = $("#tales");
const talesHold = (on) => {
  talesHover = on;
  if (on) clearTimeout(talesTimer);
  if (!on) scheduleTales();
};

if (matchMedia("(hover:hover)").matches) {
  talesBox.addEventListener("mouseenter", () => talesHold(true));
  talesBox.addEventListener("mouseleave", () => talesHold(false));
}
talesBox.addEventListener("focusin", (e) => {
  if (e.target.matches(":focus-visible")) talesHold(true);
});
talesBox.addEventListener("focusout", (e) => {
  if (!talesBox.contains(e.relatedTarget)) talesHold(false);
});
addEventListener("resize", () => {
  if (talesPerView() !== talesView) renderTales();
  else fixTalesHeight();
});

/* ---------- Accesibilidad ---------- */

const A11Y_KEY = "saborea-a11y";
const FS_STEPS = [1, 1.15, 1.3, 1.5, 1.75, 2];
const A11Y_FLAGS = ["hc", "rf", "sp", "ul", "nm"];
const a11yDefaults = () => ({
  fs: 0,
  hc: false,
  rf: false,
  sp: false,
  ul: false,
  nm: reducedMq.matches, // si el sistema ya pide menos movimiento, se respeta
});
const a11y = a11yDefaults();
let talesManual = false; // pausa del carrusel pedida con su botón

function loadA11y() {
  try {
    Object.assign(a11y, JSON.parse(localStorage.getItem(A11Y_KEY) || "{}"));
  } catch (e) {}
  a11y.fs = Math.min(FS_STEPS.length - 1, Math.max(0, Number(a11y.fs) || 0));
}

function saveA11y() {
  try {
    localStorage.setItem(A11Y_KEY, JSON.stringify(a11y));
  } catch (e) {}
}

// Pausa del carrusel: por su botón o por "Parar animaciones"
function syncTalesPause() {
  talesPaused = a11y.nm || talesManual;
  const b = $("#talesPause");
  if (b) {
    const icon = make(
      "i",
      "fa-solid " + (talesPaused ? "fa-play" : "fa-pause"),
    );
    icon.setAttribute("aria-hidden", "true");
    b.replaceChildren(icon);
    b.setAttribute("aria-pressed", String(talesPaused));
    b.setAttribute(
      "aria-label",
      t(
        talesPaused
          ? "Reanudar el carrusel de curiosidades"
          : "Pausar el carrusel de curiosidades",
        talesPaused ? "Resume the facts carousel" : "Pause the facts carousel",
        talesPaused
          ? "Reprendre le carrousel d'anecdotes"
          : "Mettre en pause le carrousel d'anecdotes",
        talesPaused
          ? "Wissenskarussell fortsetzen"
          : "Wissenskarussell anhalten",
      ),
    );
    b.disabled = a11y.nm;
  }
  if (talesPaused) clearTimeout(talesTimer);
  else scheduleTales();
}

// Pinta el estado del panel (textos, botones pulsados, tamaño)
function renderA11y() {
  const down = $("#fsDown");
  const up = $("#fsUp");
  $("#fsVal").textContent = Math.round(FS_STEPS[a11y.fs] * 100) + "%";
  down.disabled = a11y.fs === 0;
  up.disabled = a11y.fs === FS_STEPS.length - 1;
  down.setAttribute("aria-disabled", String(down.disabled));
  up.setAttribute("aria-disabled", String(up.disabled));
  down.setAttribute(
    "aria-label",
    t(
      "Reducir el texto",
      "Decrease text size",
      "Réduire le texte",
      "Text verkleinern",
    ),
  );
  up.setAttribute(
    "aria-label",
    t(
      "Aumentar el texto",
      "Increase text size",
      "Agrandir le texte",
      "Text vergrößern",
    ),
  );
  $$("[data-opt]").forEach((b) =>
    b.setAttribute("aria-pressed", String(!!a11y[b.dataset.opt])),
  );
}

// Aplica los ajustes a toda la página
function applyA11y() {
  const root = document.documentElement;
  const scale = FS_STEPS[a11y.fs];
  root.style.setProperty("--fs", scale);
  root.classList.toggle("a11y-big", scale >= 1.3);
  A11Y_FLAGS.forEach((k) => root.classList.toggle("a11y-" + k, !!a11y[k]));
  renderA11y();
  syncTalesPause();
  if ($("#qmPins")) renderQmPins(); // las chinchetas siguen el tamaño del texto
}

function setupA11y() {
  const btn = $("#a11yBtn");
  const panel = $("#a11yPanel");
  const scrim = $("#a11yScrim");

  // al abrir el panel, un velo oscurece solo la página (no el botón ni el panel)
  const open = (show) => {
    panel.hidden = !show;
    scrim.hidden = !show;
    btn.setAttribute("aria-expanded", String(show));
  };
  scrim.addEventListener("click", () => open(false));
  btn.addEventListener("click", () => open(panel.hidden));
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".a11y")) open(false);
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      open(false);
      btn.focus();
    }
  });

  const step = (d) => {
    const next = Math.min(FS_STEPS.length - 1, Math.max(0, a11y.fs + d));
    if (next === a11y.fs) return;
    a11y.fs = next;
    saveA11y();
    applyA11y();
  };
  $("#fsDown").addEventListener("click", () => step(-1));
  $("#fsUp").addEventListener("click", () => step(1));

  $$("[data-opt]").forEach((b) =>
    b.addEventListener("click", () => {
      const k = b.dataset.opt;
      a11y[k] = !a11y[k];
      saveA11y();
      applyA11y();
    }),
  );

  $("#a11yReset").addEventListener("click", () => {
    Object.assign(a11y, a11yDefaults());
    talesManual = false;
    saveA11y();
    applyA11y();
  });

  const talesPauseBtn = $("#talesPause");
  if (talesPauseBtn) {
    talesPauseBtn.addEventListener("click", () => {
      talesManual = !talesManual;
      syncTalesPause();
    });
  }

  // "Saltar al contenido" (sin tocar la ruta por hash)
  const skip = $(".skip");
  if (skip) {
    skip.addEventListener("click", (e) => {
      e.preventDefault();
      const main = $("main");
      main.setAttribute("tabindex", "-1");
      main.focus();
    });
  }

  // Altura real de la cabecera (cambia con el tamaño del texto)
  const header = $("header");
  const setHeaderHeight = () =>
    document.documentElement.style.setProperty(
      "--hh",
      header.offsetHeight + "px",
    );
  if ("ResizeObserver" in window)
    new ResizeObserver(setHeaderHeight).observe(header);
  else addEventListener("resize", setHeaderHeight);
  setHeaderHeight();
}

/* ---------- Inicio de la aplicación ---------- */

loadLang();
loadA11y();
setupA11y();
applyA11y();

// Lista de textos que se han quedado sin traducción (solo para pruebas).
window.__i18nMissing = () => [...i18nMissing];

setupLocation();
setupMapGestures();
setupTalesNav();
renderAll();
route();
scheduleTales();
setInterval(tick, 1000);
// cuando cargan las fuentes cambia el alto del texto: se vuelve a medir
if (document.fonts && document.fonts.ready)
  document.fonts.ready.then(fixTalesHeight);

/* ==========================================================
   Mapa de "Que hacer en Manilva?"
   ----------------------------------------------------------
   Parte final de este mismo archivo: usa las utilidades
   definidas arriba ($, $$, make, button, t, wrapName, lang).
   No las redeclares aqui: son del mismo archivo.
   ========================================================== */
const MAPA_KINDS = {
  h: ["Historia", "History", "fa-landmark", "🏰"],
  v: ["Vino", "Wine", "fa-wine-glass", "🍷"],
  g: ["Gastronomía", "Gastronomy", "fa-fish", "🐟"],
  p: ["Playa y paseo", "Beach and promenade", "fa-umbrella-beach", "🏖️"],
  f: ["Saborea", "Saborea", "fa-champagne-glasses", "🥂"],
  k: ["Parques", "Parks", "fa-tree", "🌳"],
};

// Un icono propio para cada sitio (el color sigue siendo el de su tipo)
const MAPA_ICONS = {
  plaza: "🍇",
  civima: "🍷",
  casco: "⛪",
  paseo: "🍽️",
  playaS: "🏖️",
  puerto: "⛵",
  castillo: "🏰",
  playaD: "🌊",
  castillejos: "🏺",
  torre: "🗼",
  ingenio: "🍬",
  villaMatilde: "🌳",
  parqueDuque: "⛲",
  iglesiaSL: "🔔",
};

// Sitios: [id, tipo, latitud, longitud, dónde va el nombre (t arriba, b abajo, l izquierda, r derecha),
//          nombre ES, nombre EN, texto ES, texto EN]
// Las coordenadas son aproximadas (salvo la plaza): conviene revisarlas.
const MAPA_PLACES = [
  [
    "plaza",
    "f",
    36.3761,
    -5.2482,
    "t",
    "Plaza de la Vendimia",
    "Plaza de la Vendimia",
    "Sede de Saborea Manilva. En la plaza se escenifica el pisado de la uva y se reparten racimos entre los asistentes.",
    "Home of Saborea Manilva. The grape treading is re-enacted here and bunches of grapes are handed out.",
  ],
  [
    "civima",
    "v",
    36.375,
    -5.2458,
    "t",
    "CIVIMA",
    "CIVIMA",
    "Centro de Interpretación de las Viñas de Manilva. Abrió en 2013, ocupa unos 1.000 m² entre bodega, laboratorio y salas de exposición, y está muy cerca de la Plaza de la Vendimia.",
    "Manilva Vineyards Interpretation Centre. It opened in 2013, covers about 1,000 m² of winery, laboratory and exhibition rooms, and is very close to Plaza de la Vendimia.",
  ],
  [
    "casco",
    "h",
    36.3764,
    -5.2512,
    "b",
    "Casco histórico y Santa Ana",
    "Old town and Santa Ana",
    "El núcleo tradicional del pueblo conserva calles tranquilas y un fuerte vínculo con los viñedos. En la Plaza de la Iglesia se alza la iglesia parroquial de Santa Ana, construida entre 1776 y 1783 sobre un templo más pequeño de finales del siglo XVI. Contribuyeron a la obra el obispado, los vecinos y el Duque de Arcos, señor de la villa.",
    "The traditional heart of the village has quiet streets and a strong link to the vineyards. The parish church of Santa Ana stands in the Plaza de la Iglesia, built between 1776 and 1783 on top of a smaller church from the late 16th century. The bishopric, the townspeople and the Duke of Arcos, lord of the town, contributed to the works.",
  ],
  [
    "paseo",
    "g",
    36.364,
    -5.224,
    "r",
    "Paseo marítimo de Sabinillas",
    "Sabinillas promenade",
    "Restaurantes, cafés y chiringuitos a pie de playa, en el corazón de San Luis de Sabinillas.",
    "Restaurants, cafés and beach bars right on the seafront, in the heart of San Luis de Sabinillas.",
  ],
  [
    "playaS",
    "p",
    36.3648,
    -5.2205,
    "r",
    "Playa de Sabinillas",
    "Sabinillas beach",
    "Playa urbana de unos 1.700 m, separada del pueblo por el paseo marítimo. En temporada alta suele estar muy concurrida.",
    "Urban beach about 1,700 m long, separated from the town by the promenade. It is usually very busy in high season.",
  ],
  [
    "puerto",
    "g",
    36.356,
    -5.2292,
    "b",
    "Puerto de la Duquesa",
    "Puerto de la Duquesa",
    "Puerto deportivo con 328 amarres y restaurantes en tres niveles. Se llega desde Sabinillas por un paseo llano de menos de un kilómetro.",
    "Marina with 328 berths and restaurants on three levels. It is a flat walk of under a kilometre from Sabinillas.",
  ],
  [
    "castillo",
    "h",
    36.356,
    -5.2325,
    "t",
    "Castillo de la Duquesa",
    "Castillo de la Duquesa",
    "Fortín de 1767 levantado para defender la costa, en el antiguo barrio de pescadores del Castillo. Lo construyó a sus expensas el sevillano Francisco Paulino, y el rey le concedió el mando de una compañía de caballería. Alberga el Museo Arqueológico Municipal, cuyos objetos provienen del yacimiento romano del «Entorno del Castillo de la Duquesa» (siglos I-V d. C.). Entrada gratuita, de lunes a viernes de 8:00 a 15:00.",
    "Fort built in 1767 to defend the coast, in the old fishing quarter of El Castillo. It was built at his own expense by the Sevillian Francisco Paulino, whom the king rewarded with the command of a cavalry company. It houses the Municipal Archaeological Museum, whose objects come from the Roman site around Castillo de la Duquesa (1st-5th century AD). Free entry, Monday to Friday 8:00 to 15:00.",
  ],
  [
    "playaD",
    "p",
    36.353,
    -5.236,
    "b",
    "Playa de la Duquesa - El Castillo",
    "La Duquesa - El Castillo beach",
    "Playa de arena oscura junto al barrio de pescadores del Castillo.",
    "Dark-sand beach next to the old fishing quarter of El Castillo.",
  ],
  [
    "castillejos",
    "h",
    36.3437,
    -5.2648,
    "t",
    "Los Castillejos de Alcorrín",
    "Los Castillejos de Alcorrín",
    "Yacimiento arqueológico del siglo IX a. C., formado por una gran fortaleza amurallada declarada Bien de Interés Cultural. En él conviven elementos propios del mundo autóctono con técnicas constructivas de clara afinidad fenicia.",
    "An archaeological site dating back to the 9th century BC, featuring a large walled fortress declared an Asset of Cultural Interest. It combines elements of the native world with building techniques of clear Phoenician influence",
  ],
  [
    "torre",
    "h",
    36.3386,
    -5.2655,
    "r",
    "Torre de Chullera",
    "Torre de Chullera",
    "En Chullera, en el extremo suroeste del litoral, existen dos torres almenaras: una troncónica y otra más antigua de base cruzada, la primitiva torre de tiempos nazaríes. En 1497 ya se la denominaba Torre de la Chullera en las Instrucciones para la guarda de la Costa dadas por los Reyes Católicos.",
    "In Chullera, at the south-western end of the coast, stand two watchtowers: one truncated-cone shaped and an older one with a cross-shaped base, the original Nasrid-period tower. By 1497 it was already called Torre de la Chullera in the instructions for guarding the coast issued by the Catholic Monarchs.",
  ],
  [
    "ingenio",
    "h",
    36.3829,
    -5.2522,
    "r",
    "El Ingenio Chico",
    "El Ingenio Chico",
    "Uno de los dos ingenios de azúcar que construyó el Duque de Arcos en estas tierras. El acueducto conserva la unión con el resto de la construcción en tapial, recordándonos las construcciones medievales y haciéndonos pensar en la mano de obra de tradición morisca.",
    "One of the two sugar mills built by the Duke of Arcos in these lands. The aqueduct still preserves its link with the rest of the rammed-earth building, recalling medieval construction and evoking the labour of Moorish tradition.",
  ],
  [
    "iglesiaSL",
    "h",
    36.366,
    -5.2265,
    "b",
    "Iglesia de San Luis de Sabinillas",
    "Church of San Luis de Sabinillas",
    "La parroquia de San Luis de Sabinillas se encuentra en el núcleo urbano de San Luis de Sabinillas, en la Plaza de San Luis.",
    "The parish of San Luis de Sabinillas is located in the town centre of San Luis de Sabinillas, in Plaza de San Luis.",
  ],
  [
    "villaMatilde",
    "k",
    36.3678,
    -5.2296,
    "l",
    "Parque Villa Matilde",
    "Villa Matilde Park",
    "Parque en Sabinillas. La casa que le da nombre fue propiedad de don Ignacio Infante, hermano de Blas Infante, y se expone en ella restos romanos hallados en Manilva.",
    "Park in Sabinillas. The house that gives it its name belonged to Don Ignacio Infante, brother of Blas Infante, and displays Roman remains found in Manilva.",
  ],
  [
    "parqueDuque",
    "k",
    36.369,
    -5.225,
    "b",
    "Parque del Duque",
    "Duque Park",
    "Zona verde de Sabinillas para pasear y descansar a pocos minutos del paseo marítimo.",
    "Green space in Sabinillas to stroll and rest, a few minutes from the promenade.",
  ],
];

// Enlaces propios de cada sitio (opcional).
// Pega la dirección entre las comillas, de uno en uno, y guarda.
// Si un sitio se queda con "" el botón abre su ubicación en Google Maps.
const MAPA_LINKS = {
  plaza: "https://maps.app.goo.gl/xHkdQqQUym7BTSB39", // Plaza de la Vendimia
  civima: "https://maps.app.goo.gl/e3TrLu63kjsxf4hE9", // CIVIMA
  casco: "https://maps.app.goo.gl/AaSbJsmyhWWLeFDz9", // Casco histórico y Santa Ana
  paseo: "https://maps.app.goo.gl/DaNT6PpxYgEe9HUy7", // Paseo marítimo de Sabinillas
  playaS: "https://maps.app.goo.gl/HbLbTg7miuNaMD11A", // Playa de Sabinillas
  puerto: "https://maps.app.goo.gl/TQqQ3fe16g5ErAt39", // Puerto de la Duquesa
  castillo: "https://maps.app.goo.gl/8S5NcU7RGpGEqqNd6", // Castillo de la Duquesa
  playaD: "https://maps.app.goo.gl/SZhQfqCKK8zdRtQD8", // Playa de la Duquesa - El Castillo
  castillejos: "https://maps.app.goo.gl/1SVgTSQ9PXg8gx1p8", // Los Castillejos de Alcorrín
  torre: "https://maps.app.goo.gl/G8a4TgaXDNK6Pz919", // Torre de Chullera
  ingenio: "https://maps.app.goo.gl/SR3hQkJUpDS1RbPm7", // El Ingenio Chico
  iglesiaSL: "https://maps.app.goo.gl/CQP7rHzuAH6y4yZF7", // Iglesia de San Luis de Sabinillas
  villaMatilde: "https://maps.app.goo.gl/idE6VtGhZi1ucyiq8", // Parque Villa Matilde
  parqueDuque: "https://maps.app.goo.gl/HTMddRRkRGx3q6uh8", // Parque del Duque
};

// Rutas: [id, nombre ES, nombre EN, texto ES, texto EN, paradas en orden]
const MAPA_ROUTES = [
  [
    "vino",
    "Ruta del vino",
    "Wine route",
    "Del pueblo a la viña: la plaza, el centro de interpretación y el casco histórico.",
    "From the village to the vineyards: the square, the interpretation centre and the old town.",
    ["plaza", "civima", "casco"],
  ],
  [
    "costa",
    "Ruta de la costa",
    "Coastal route",
    "Del castillo al paseo de Sabinillas, pasando por el puerto.",
    "From the castle to the Sabinillas promenade, via the marina.",
    ["castillo", "puerto", "paseo", "playaS"],
  ],
  [
    "dia",
    "Un día completo",
    "A full day",
    "Mañana en el pueblo y tarde en la costa, de la plaza al castillo.",
    "Morning in the village, afternoon on the coast, from the square to the castle.",
    ["plaza", "civima", "casco", "paseo", "puerto", "castillo"],
  ],
];

// El plano se muestra siempre completo (1200 x 1100).
const MAPA_VIEW = [0, 0, 1200, 1100];

// Costa (latitud, longitud) de noreste a suroeste; el mar queda al sureste.
// Los extremos salen del plano a propósito.
const MAPA_COAST = [
  [36.377, -5.195],
  [36.3735, -5.205],
  [36.369, -5.213],
  [36.3648, -5.22],
  [36.3612, -5.225],
  [36.356, -5.2292],
  [36.3553, -5.2325],
  [36.351, -5.24],
  [36.3455, -5.25],
  [36.3405, -5.262],
  [36.335, -5.276],
];

// Proyección: latitud/longitud a puntos del plano (1200 x 1100)
const QM_W = 1200,
  QM_H = 1100,
  QM_SCALE = 190,
  QM_LON0 = -5.272,
  QM_LAT1 = 36.39;
const qmX = (lon) => Math.round((lon - QM_LON0) * 89.68 * QM_SCALE);
const qmY = (lat) => Math.round((QM_LAT1 - lat) * 110.57 * QM_SCALE);

// Posición dibujada de cada sitio (separados para que no se pisen)
const MAPA_POS = {
  plaza: [400, 300],
  civima: [560, 340],
  casco: [240, 320],
  ingenio: [640, 190],
  villaMatilde: [640, 450],
  iglesiaSL: [760, 470],
  parqueDuque: [525, 525],
  playaS: [920, 500],
  paseo: [820, 655],
  puerto: [740, 720],
  castillo: [590, 770],
  playaD: [470, 855],
  castillejos: [230, 920],
  torre: [110, 1040],
};
const qmPos = (id) => {
  if (MAPA_POS[id]) return MAPA_POS[id];
  const p = MAPA_PLACES.find((x) => x[0] === id);
  return [qmX(p[3]), qmY(p[2])];
};

const qmState = { hidden: new Set(), route: null, sel: null };
const QM_NS = "http://www.w3.org/2000/svg";

function qmSvgEl(tag, attrs = {}, text) {
  const el = document.createElementNS(QM_NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (text !== undefined) el.textContent = text;
  return el;
}

// Curva suave que pasa cerca de todos los puntos
function qmSmooth(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = Math.round((pts[i][0] + pts[i + 1][0]) / 2);
    const my = Math.round((pts[i][1] + pts[i + 1][1]) / 2);
    d += ` Q${pts[i][0]},${pts[i][1]} ${mx},${my}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last[0]},${last[1]}`;
}

// Generador pseudoaleatorio con semilla: el plano sale siempre igual
function qmRng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let z = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

// Altura (y) de la costa en una x dada, para saber qué es mar y qué es tierra
function qmCoastY(coast, x) {
  for (let i = 0; i < coast.length - 1; i++) {
    const [x1, y1] = coast[i],
      [x2, y2] = coast[i + 1];
    if (x <= x1 && x >= x2) return y1 + ((y2 - y1) * (x1 - x)) / (x1 - x2);
  }
  return x > coast[0][0] ? coast[0][1] : coast[coast.length - 1][1];
}

// Curva de nivel: contorno cerrado y suave alrededor de un monte
function qmBlob(cx, cy, rx, ry, k, jit) {
  const n = jit.length;
  const pts = jit.map((j, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx * k * j, cy + Math.sin(a) * ry * k * j];
  });
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const m0 = mid(pts[n - 1], pts[0]);
  let d = `M${m0[0] | 0},${m0[1] | 0}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += ` Q${pts[i][0] | 0},${pts[i][1] | 0} ${m[0] | 0},${m[1] | 0}`;
  }
  return d + "Z";
}

// Dibuja una sola vez el fondo ilustrado: relieve, mar, playas, viñedos, arroyos, casas, carreteras, puerto...
function setupQueHacerMap() {
  const svg = $("#qmSvg");
  if (!svg) return;
  const coast = MAPA_COAST.map(([la, lo]) => [qmX(lo), qmY(la)]);
  const coastD = qmSmooth(coast);
  const landD = `M-100,-100 L1400,-100 ${coastD.replace("M", "L")} Z`;
  const inlandD = qmSmooth(
    MAPA_COAST.map(([la, lo]) => [qmX(lo) - 40, qmY(la) - 56]),
  );
  const pinAt = MAPA_PLACES.map((p) => qmPos(p[0]));
  const at = (id) => qmPos(id);
  const [plazaX, plazaY] = at("plaza");
  const [paseoX, paseoY] = at("paseo");
  const [portX, portY] = at("puerto");
  const rnd = qmRng(11);
  const onLand = (x, y, m) => y < qmCoastY(coast, x) - m;
  const nearPin = (x, y, d) =>
    pinAt.some(([px, py]) => Math.hypot(px - x, py - 28 - y) < d);
  const road = (d, w) =>
    `<path class="qm-road-c" d="${d}" style="stroke-width:${w + 4}"/><path class="qm-road-f" d="${d}" style="stroke-width:${w}"/><path class="qm-road-d" d="${d}"/>`;

  // relieve: montes con curvas de nivel (cada nivel más alto es más oscuro)
  let relief = "";
  [
    [250, 30, 560, 260],
    [900, 10, 540, 220],
    [-60, 330, 250, 270],
  ].forEach(([cx, cy, rx, ry]) => {
    const base = Array.from({ length: 16 }, () => 0.88 + rnd() * 0.24);
    [1, 0.82, 0.65, 0.5, 0.36, 0.24].forEach((k, i) => {
      const jit = base.map((v) => v * (1 + (rnd() - 0.5) * 0.08));
      relief += `<path class="qm-ct${i % 3 === 0 ? " qm-ct-i" : ""}" d="${qmBlob(cx, cy, rx, ry, k, jit)}"/>`;
    });
  });
  let peaks = "";
  for (let i = 0; i < 30; i++) {
    const x = rnd() * 1180 + 10,
      y = rnd() * 170 + 14;
    if (Math.abs(x - 720) < 130 && y < 130) continue;
    peaks += `M${x | 0},${y | 0}l9,-15l9,15`;
  }

  // viñedos de moscatel (con racimos y casas de viña)
  const vineShapes = [
    "M170,350 Q230,300 330,345 Q400,380 380,450 Q300,520 200,490 Q130,440 170,350Z",
    "M520,340 Q620,305 705,365 Q735,435 645,485 Q565,475 505,425 Q485,375 520,340Z",
    "M390,575 Q480,530 575,570 Q615,630 535,675 Q440,665 390,615Z",
  ];
  const vines = vineShapes
    .map(
      (d) =>
        `<path class="qm-vinebg" d="${d}"/><path class="qm-vines" d="${d}"/>`,
    )
    .join("");
  const grape = (x, y) =>
    `<g class="qm-grape" transform="translate(${x} ${y})"><path d="M0,-4 q6,-10 14,-6 q-4,8 -14,6Z" fill="#7d9a54" stroke="#5f7d3e" stroke-width=".8"/>` +
    [
      [-6, 0],
      [0, 0],
      [6, 0],
      [-3, 6],
      [3, 6],
      [0, 12],
    ]
      .map(
        ([cx, cy]) =>
          `<circle cx="${cx}" cy="${cy}" r="3.4" fill="#7a2d52" stroke="#4f1c35" stroke-width=".6"/>`,
      )
      .join("") +
    `</g>`;
  const grapes = [
    [262, 405],
    [215, 440],
    [335, 400],
    [600, 395],
    [650, 440],
    [470, 610],
    [535, 625],
  ]
    .map(([x, y]) => grape(x, y))
    .join("");
  const farm = (x, y) =>
    `<g transform="translate(${x} ${y})"><rect x="-13" y="-8" width="26" height="16" fill="#f1dfb8" stroke="#b98a3e" stroke-width="1"/><path d="M-16,-8 L0,-21 L16,-8Z" fill="#c9633d" stroke="#8a3f20" stroke-width="1"/><rect x="-3" y="0" width="6" height="8" fill="#8a5a14"/></g>`;
  const farms = farm(300, 392) + farm(585, 425);

  // arroyos que bajan de la sierra al mar
  const rivers = [
    "M600,330 C580,430 650,470 615,560 S690,660 656,740",
    "M760,170 C720,290 800,350 770,430 S840,520 801,605",
    "M980,190 C955,300 1030,370 985,430 S990,450 960,470",
  ]
    .map((d) => `<path class="qm-river" d="${d}"/>`)
    .join("");

  // árboles sueltos por la tierra (fuera de viñedos, pueblo y puntos)
  const vineBox = [
    [140, 290, 580, 530],
    [470, 300, 760, 510],
    [360, 520, 640, 700],
  ];
  let trees = "";
  for (let i = 0; i < 300; i++) {
    const x = rnd() * 1180 + 10,
      y = rnd() * 940 + 140;
    const inVines = vineBox.some(
      ([x1, y1, x2, y2]) => x > x1 && x < x2 && y > y1 && y < y2,
    );
    const inTown = x > 310 && x < 510 && y > 230 && y < 350;
    if (!onLand(x, y, 50) || inVines || inTown || nearPin(x, y, 55)) continue;
    trees += `<circle class="qm-tree" cx="${x | 0}" cy="${y | 0}" r="${(4 + rnd() * 3).toFixed(1)}"/>`;
  }

  // casas: pueblo, Sabinillas, barrio del Castillo y puerto
  let houses = "";
  const house = (x, y, i) => {
    const w = 9 + rnd() * 6,
      h = 7 + rnd() * 5;
    const fill = i % 4 === 0 ? "#c9633d" : i % 2 ? "#fffaf0" : "#f1dfb8";
    houses += `<rect class="qm-house" x="${x | 0}" y="${y | 0}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="1.5" style="fill:${fill}"/>`;
  };
  for (let i = 0; i < 44; i++) house(330 + rnd() * 170, 248 + rnd() * 90, i);
  for (let i = 0; i < 66; i++) {
    const x = 748 + rnd() * 190;
    house(x, qmCoastY(coast, x) - 34 - rnd() * 74, i);
  }
  for (let i = 0; i < 18; i++) {
    const x = 604 + rnd() * 76;
    house(x, qmCoastY(coast, x) - 28 - rnd() * 44, i);
  }
  for (let i = 0; i < 14; i++) {
    const x = 692 + rnd() * 90;
    house(x, qmCoastY(coast, x) - 36 - rnd() * 40, i);
  }

  // olas y barquitos
  let waves = "";
  for (let i = 0; i < 140; i++) {
    const x = rnd() * 1180 + 10,
      y = rnd() * 1080 + 10;
    if (y < qmCoastY(coast, x) + 90) continue;
    if (x > 620 && y > 925) continue;
    if (Math.hypot(x - 1100, y - 700) < 72) continue;
    if (x > 690 && x < 1110 && y > 790 && y < 850) continue;
    waves += `M${x | 0},${y | 0}q6,-6 12,0t12,0`;
  }
  const boat = (x, y) =>
    `<g transform="translate(${x} ${y})"><path d="M-9,0 L9,0 L5,6 L-5,6Z" fill="#fffaf0" stroke="#1f3566" stroke-width="1.2"/><path d="M0,-2 L0,-16 L9,-4Z" fill="#fffaf0" stroke="#1f3566" stroke-width="1.2"/></g>`;
  const boats = [
    [800, 760],
    [1000, 600],
    [900, 690],
    [740, 870],
    [1120, 470],
    [560, 930],
  ]
    .map(([x, y]) => boat(x, y))
    .join("");
  const moored = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<ellipse cx="${portX + 14 + i * 7}" cy="${portY + 24 + (i % 2) * 7}" rx="3" ry="6" fill="#fffaf0" stroke="#1f3566" stroke-width="1"/>`,
    )
    .join("");

  svg.innerHTML = `
    <defs>
      <linearGradient id="qmSea" x1="0" y1="0" x2=".35" y2="1">
        <stop offset="0" stop-color="#cfe6ee"/><stop offset="1" stop-color="#9fc9de"/>
      </linearGradient>
      <linearGradient id="qmLand" x1="0" y1="0" x2=".3" y2="1">
        <stop offset="0" stop-color="#e5d8a8"/><stop offset=".3" stop-color="#efe5c2"/>
        <stop offset=".65" stop-color="#f7f0da"/><stop offset="1" stop-color="#f8f1de"/>
      </linearGradient>
      <pattern id="qmVines" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
        <path d="M0 5.5H11" stroke="#5f7d3e" stroke-opacity=".42" stroke-width="2.4"/>
      </pattern>
      <clipPath id="qmLandClip"><path d="${landD}"/></clipPath>
    </defs>
    <rect class="qm-sea" x="-100" y="-100" width="1500" height="1400"/>
    <path class="qm-shallow1" d="${coastD}"/>
    <path class="qm-shallow2" d="${coastD}"/>
    <path class="qm-wave" d="${waves}"/>
    <path class="qm-land" d="${landD}"/>

    <g clip-path="url(#qmLandClip)">
      ${relief}
      <path class="qm-peak" d="${peaks}"/>
      ${rivers}
      ${vines}
      ${grapes}
      ${farms}
      ${trees}
      ${road(inlandD, 6)}
      ${road(`M${plazaX},${plazaY} C560,330 700,450 ${paseoX},${paseoY}`, 8)}
      ${road(`M${paseoX},${paseoY} C795,610 755,670 ${portX},${portY}`, 5)}
      ${houses}
    </g>
    <text class="qm-script" x="720" y="96" data-es="Sierra" data-en="Hills"></text>
    <text class="qm-zone" x="270" y="560" data-es="Viñedos de moscatel" data-en="Muscat vineyards"></text>
    <text class="qm-zone qm-dir" x="1110" y="300" data-es="Estepona ›" data-en="Estepona ›"></text>
    <text class="qm-zone qm-dir" x="95" y="1000" data-es="‹ Gibraltar" data-en="‹ Gibraltar"></text>

    <path class="qm-sand" d="${coastD}"/>
    <path class="qm-foam" d="${coastD}" transform="translate(5 4)"/>
    <path class="qm-coast" d="${coastD}"/>
    <path class="qm-pier" d="M${portX},${portY + 6} q4,34 42,30 q24,-3 30,-22"/>
    ${moored}
    ${boats}

    <text class="qm-script qm-sea-t" x="900" y="830" data-es="Mar Mediterráneo" data-en="Mediterranean Sea"></text>
    <g transform="translate(1100 700)">
      <circle r="46" fill="#fffaf0" fill-opacity=".75" stroke="#a97a2c" stroke-width="2"/>
      <path d="M0,-40 L9,0 L0,40 L-9,0Z" fill="#1f3566"/>
      <path d="M-40,0 L0,-9 L40,0 L0,9Z" fill="#a97a2c"/>
      <text class="qm-n" y="-55">N</text>
    </g>
    <rect class="qm-cart" x="640" y="940" width="520" height="130" rx="14"/>
    <rect class="qm-cart2" x="648" y="948" width="504" height="114" rx="10"/>
    <text class="qm-script qm-cart-t" x="900" y="1004" data-es="Manilva y su costa" data-en="Manilva and its coast"></text>
    <text class="qm-zone" x="900" y="1040" data-es="Sierra, viñedos y mar" data-en="Hills, vineyards and sea"></text>

    <rect class="qm-veil" x="-100" y="-100" width="1500" height="1400"/>
    <path class="qm-route-bg" id="qmRouteBg" d=""/>
    <path class="qm-route" id="qmRoute" d=""/>
    <g id="qmPins"></g>`;

  // pulsar (o Enter / Espacio) en un punto lo selecciona; volver a pulsar lo suelta
  const pick = (e) => {
    const pin = e.target.closest(".qm-pin");
    if (!pin || pin.classList.contains("off")) return false;
    const id = pin.dataset.id;
    qmState.sel = qmState.sel === id ? null : id;
    renderQueHacerMap();
    // El plano se vuelve a dibujar: devolvemos el foco a la misma chincheta
    // para que el teclado no pierda la posición.
    const again = svg.querySelector(`.qm-pin[data-id="${id}"]`);
    if (again) again.focus({ preventScroll: true });
    return true;
  };
  svg.addEventListener("click", pick);
  svg.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && pick(e)) e.preventDefault();
  });
}

const qmPlace = (id) => MAPA_PLACES.find((p) => p[0] === id);

// Qué sitios se pueden elegir ahora: el resto baja de opacidad y no responde
function qmAvailable() {
  const route = MAPA_ROUTES.find((r) => r[0] === qmState.route);
  return MAPA_PLACES.filter((p) => {
    if (qmState.hidden.has(p[1])) return false;
    if (route && !route[5].includes(p[0])) return false;
    return true;
  }).map((p) => p[0]);
}

// Un tipo no está disponible si no tiene nada que ver con la ruta elegida
function qmKindOff(kind) {
  const route = MAPA_ROUTES.find((r) => r[0] === qmState.route);
  if (route) return !route[5].some((id) => qmPlace(id)[1] === kind);
  return false;
}

// Tamaño de los puntos: constante en pantalla, no en unidades del plano.
// Crece con el tamaño de texto elegido en Accesibilidad.
function qmPinScale(view, svg) {
  const vw = view[2];
  const measured = svg.getBoundingClientRect().width;
  const px = measured || Math.min(innerWidth - 36, 1200);
  const unit = px / vw;
  return Math.max(1.6, Math.min(4.5, (14 * FS_STEPS[a11y.fs]) / (16 * unit)));
}

function renderQmPins() {
  const svg = $("#qmSvg");
  if (!svg) return;
  const view = MAPA_VIEW;
  const route = MAPA_ROUTES.find((r) => r[0] === qmState.route);
  const order = route ? route[5] : [];
  const free = qmAvailable();
  const scale = qmPinScale(view, svg);

  const routeD = order
    .map((id, i) => {
      const [rx, ry] = qmPos(id);
      return `${i ? "L" : "M"}${rx},${ry}`;
    })
    .join(" ");
  $("#qmRoute").setAttribute("d", routeD);
  $("#qmRouteBg").setAttribute("d", routeD);
  svg.classList.toggle("focus", free.length < MAPA_PLACES.length);

  const pins = MAPA_PLACES.map(([id, kind, lat, lon, pos, nameEs, nameEn]) => {
    const [px, py] = qmPos(id);
    const name = t(nameEs, nameEn);
    const sel = qmState.sel === id;
    const off = !free.includes(id);
    const g = qmSvgEl("g", {
      class: "qm-pin" + (off ? " off" : "") + (sel ? " sel" : ""),
      "data-id": id,
      "data-k": kind,
      tabindex: off ? "-1" : "0",
      role: "button",
      "aria-label": name,
      "aria-pressed": String(sel),
      "aria-disabled": String(off),
      transform: `translate(${px} ${py}) scale(${scale * (sel ? 1.18 : 1)})`,
    });
    // zona táctil invisible y generosa (unos 44 px reales)
    g.append(
      qmSvgEl("circle", { class: "qm-hit", cx: 0, cy: -26, r: 36 }),
      // chincheta: la punta marca el sitio
      qmSvgEl("path", {
        class: "qm-dot",
        d: "M0,0 C-6,-9 -21,-17 -21,-31 A21,21 0 1 1 21,-31 C21,-17 6,-9 0,0Z",
      }),
      qmSvgEl("circle", { class: "qm-ring", cx: 0, cy: -31, r: 15 }),
      qmSvgEl(
        "text",
        { class: "qm-ic", x: 0, y: -31 },
        MAPA_ICONS[id] || MAPA_KINDS[kind][3],
      ),
    );

    // nombre junto al punto, en líneas cortas
    const lines = wrapName(name, 16);
    const lh = 17;
    const side = pos === "l" || pos === "r";
    const lbl = qmSvgEl("text", {
      class: "qm-lbl",
      "text-anchor": pos === "l" ? "end" : pos === "r" ? "start" : "middle",
    });
    if (side) lbl.setAttribute("dominant-baseline", "central");
    const x = pos === "l" ? -29 : pos === "r" ? 29 : 0;
    const y0 =
      pos === "t"
        ? -(60 + (lines.length - 1) * lh)
        : pos === "b"
          ? 26
          : -31 - ((lines.length - 1) * lh) / 2;
    lines.forEach((l, i) =>
      lbl.append(qmSvgEl("tspan", { x, y: y0 + i * lh }, l)),
    );
    g.append(lbl);

    // número de parada si hay una ruta elegida
    const n = order.indexOf(id);
    if (n >= 0) {
      const badge = qmSvgEl("g", {
        class: "qm-badge",
        transform: "translate(18 -52)",
      });
      badge.append(
        qmSvgEl("circle", { r: 10 }),
        qmSvgEl("text", {}, String(n + 1)),
      );
      g.append(badge);
    }
    return { g, sel };
  });
  // el punto elegido va el último, para que quede por encima
  pins.sort((a, b) => a.sel - b.sel);
  $("#qmPins").replaceChildren(...pins.map((p) => p.g));
}

function renderQmPanel() {
  const panel = $("#qmPanel");
  const route = MAPA_ROUTES.find((r) => r[0] === qmState.route);
  const place = qmState.sel ? qmPlace(qmState.sel) : null;
  const nodes = [];

  if (place) {
    const kind = place[1];
    panel.dataset.k = kind;
    const label = make("span", "k");
    const icon = make(
      "span",
      "",
      (MAPA_ICONS[qmState.sel] || MAPA_KINDS[kind][3]) + " ",
    );
    label.append(icon, t(MAPA_KINDS[kind][0], MAPA_KINDS[kind][1]));
    const name = t(place[5], place[6]);
    nodes.push(
      label,
      make("h4", "", name),
      make("p", "", t(place[7], place[8])),
    );
    if (!route) {
      const back = button(
        "qm-clear",
        t("Ver todos los sitios", "Show all places"),
      );
      back.onclick = () => {
        qmState.sel = null;
        renderQueHacerMap();
        const p = $("#qmPanel");
        p.setAttribute("tabindex", "-1");
        p.focus({ preventScroll: true });
      };
      nodes.push(back);
    }

    // Botón con el enlace del sitio: si tiene uno propio en MAPA_LINKS se
    // usa ese; si no, se abre su ubicación (latitud y longitud del plano).
    const own = (MAPA_LINKS[place[0]] || "").trim();
    const loc = make("a", "qm-loc");
    loc.href =
      own ||
      `https://www.google.com/maps/search/?api=1&query=${place[2]},${place[3]}`;
    loc.target = "_blank";
    loc.rel = "noopener noreferrer";
    const locIcon = make(
      "i",
      "fa-solid " + (own ? "fa-link" : "fa-map-location-dot"),
    );
    locIcon.setAttribute("aria-hidden", "true");
    loc.append(
      locIcon,
      " " +
        t(
          own ? "Ver enlace" : "Ver ubicación",
          own ? "View link" : "View location",
        ),
    );
    loc.setAttribute(
      "aria-label",
      own
        ? t(
            `Abrir el enlace de ${name} (se abre en una pestaña nueva)`,
            `Open the link for ${name} (opens in a new tab)`,
            `Ouvrir le lien de ${name} (s'ouvre dans un nouvel onglet)`,
            `Link zu ${name} öffnen (öffnet in einem neuen Tab)`,
          )
        : t(
            `Ver la ubicación de ${name} en el mapa (se abre en una pestaña nueva)`,
            `View the location of ${name} on the map (opens in a new tab)`,
            `Voir l'emplacement de ${name} sur la carte (s'ouvre dans un nouvel onglet)`,
            `Standort von ${name} auf der Karte ansehen (öffnet in einem neuen Tab)`,
          ),
    );
    nodes.push(loc);
  } else {
    delete panel.dataset.k;
  }

  if (route) {
    nodes.push(
      make("h4", "qm-rt", t(route[1], route[2])),
      make("p", "", t(route[3], route[4])),
    );
    const list = make("ol", "qm-stops");
    route[5].forEach((id) => {
      const p = qmPlace(id);
      const b = button("", t(p[5], p[6]));
      b.onclick = () => {
        qmState.sel = id;
        renderQueHacerMap();
        const pin = $(`#qmSvg .qm-pin[data-id="${id}"]`);
        if (pin) pin.focus({ preventScroll: true });
      };
      const li = make("li");
      li.append(b);
      list.append(li);
    });
    const off = button("qm-clear", t("Quitar la ruta", "Clear route"));
    off.onclick = () => {
      const id = route[0];
      qmState.route = null;
      renderQueHacerMap();
      const again = $(`#qmRoutes button[data-r="${id}"]`);
      if (again) again.focus({ preventScroll: true });
    };
    nodes.push(list, off);
  }

  if (!nodes.length) {
    nodes.push(
      make(
        "p",
        "note",
        t(
          "Pulsa un punto del plano o elige una ruta.",
          "Tap a point on the map or pick a route.",
        ),
      ),
    );
  }
  panel.replaceChildren(...nodes);
}

// Se llama al arrancar y cada vez que cambia el idioma o algún filtro
function renderQueHacerMap() {
  const svg = $("#qmSvg");
  if (!svg) return;

  $("#qmKinds").replaceChildren(
    ...Object.entries(MAPA_KINDS).map(([k, names]) => {
      const b = button("", t(names[0], names[1]));
      b.dataset.k = k;
      b.disabled = qmKindOff(k);
      b.setAttribute("aria-pressed", String(!qmState.hidden.has(k)));
      b.onclick = () => {
        qmState.hidden.has(k)
          ? qmState.hidden.delete(k)
          : qmState.hidden.add(k);
        if (qmState.sel && qmState.hidden.has(qmPlace(qmState.sel)[1]))
          qmState.sel = null;
        renderQueHacerMap();
        const again = $(`#qmKinds button[data-k="${k}"]`);
        if (again) again.focus({ preventScroll: true });
      };
      return b;
    }),
  );

  $("#qmRoutes").replaceChildren(
    ...MAPA_ROUTES.map((r) => {
      const b = button("", t(r[1], r[2]));
      b.dataset.r = r[0];
      b.setAttribute("aria-pressed", String(qmState.route === r[0]));
      b.onclick = () => {
        qmState.route = qmState.route === r[0] ? null : r[0];
        if (qmState.route && qmState.sel && !r[5].includes(qmState.sel))
          qmState.sel = null;
        renderQueHacerMap();
        const again = $(`#qmRoutes button[data-r="${r[0]}"]`);
        if (again) again.focus({ preventScroll: true });
      };
      return b;
    }),
  );

  svg.setAttribute("viewBox", MAPA_VIEW.join(" "));
  svg.classList.add("full");

  // Los rótulos del plano se crean después de renderStatic(): hay que
  // rellenarlos aquí para que no salgan vacíos al cargar la página.
  svg.querySelectorAll("[data-es]").forEach((el) => {
    el.textContent = t(el.dataset.es, el.dataset.en);
  });

  svg.setAttribute(
    "aria-label",
    t(
      "Plano ilustrado de Manilva, Sabinillas y el Castillo de la Duquesa",
      "Illustrated map of Manilva, Sabinillas and Castillo de la Duquesa",
      "Plan illustré de Manilva, Sabinillas et du château de la Duquesa",
      "Illustrierter Plan von Manilva, Sabinillas und Castillo de la Duquesa",
    ),
  );
  renderQmPins();
  renderQmPanel();
}

/* ---------- Arranque del mapa ---------- */

function startQueHacerMap() {
  const svg = $("#qmSvg");
  if (!svg) return;
  setupQueHacerMap();
  renderQueHacerMap();

  // El plano arranca oculto (la página no está activa): al mostrarse o al
  // cambiar de tamaño hay que recalcular el tamaño de los puntos.
  if ("ResizeObserver" in window) {
    let last = 0;
    new ResizeObserver(() => {
      const w = svg.getBoundingClientRect().width;
      if (!w || Math.abs(w - last) < 2) return;
      last = w;
      renderQmPins();
    }).observe(svg);
  } else {
    addEventListener("resize", renderQmPins);
  }
}

startQueHacerMap();
