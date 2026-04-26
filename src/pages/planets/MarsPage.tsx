import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqPageSchemaFromList,
  getWebPageSchema,
  type JsonLd,
  SITE_ORIGIN,
} from '../../data/schema-entities';
import marsAssetsRaw from '../../../blog-images-folder/mars/components.json';

type MarsAssets = {
  components: {
    hero: { url: string };
    decorativeQuill: { url: string };
    gemstoneCoral: { url: string };
    glyphAries: { url: string };
    glyphScorpio: { url: string };
    chariot: { url: string };
    planetDot: { url: string };
    planetSphere: { url: string };
    seal: { url: string };
    symbolMars: { url: string };
    yantra: { url: string };
    iconSpear: { url: string };
  };
  shared: {
    doodleCrystal: { url: string };
    doodleNamaste: { url: string };
    iconCrown: { url: string };
    iconFlame: { url: string };
  };
  sharedLegacy: {
    items: {
      parchmentStripe: string;
      parchmentStickyNote: string;
      diya: string;
      featherDoodle: string;
      bgLarge: string;
      allFooterImages: string;
    };
  };
};

const marsAssets = marsAssetsRaw as MarsAssets;

const HERO_URL = marsAssets.components.hero.url;
const CORAL_URL = marsAssets.components.gemstoneCoral.url;
const PLANET_SPHERE_URL = marsAssets.components.planetSphere.url;
const SEAL_URL = marsAssets.components.seal.url;
const SYMBOL_MARS_URL = marsAssets.components.symbolMars.url;
const YANTRA_URL = marsAssets.components.yantra.url;
const SPEAR_URL = marsAssets.components.iconSpear.url;
const QUILL_URL = marsAssets.components.decorativeQuill.url;
const CRYSTAL_URL = marsAssets.shared.doodleCrystal.url;
const CROWN_URL = marsAssets.shared.iconCrown.url;
const FLAME_URL = marsAssets.shared.iconFlame.url;
const STICKY_NOTE_URL = marsAssets.sharedLegacy.items.parchmentStickyNote;
const DIYA_URL = marsAssets.sharedLegacy.items.diya;
const FEATHER_URL = marsAssets.sharedLegacy.items.featherDoodle;

const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE = 'Mangala (Mars), The Warrior of Energy | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Mangala (Mars), the planet of courage, strength, and determination. Mantras, gemstone (Red Coral), remedies, and Vedic traditions to awaken Mangala's blessings.";
const PAGE_KEYWORDS =
  'mangala, mars in vedic astrology, mangala mantra, mars remedies, red coral, moonga, courage astrology, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/mars`;

const pageShellStyle = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.94), rgba(245,230,200,0.95)), url(${PAGE_PARCHMENT_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const cardTextureStyle = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.94), rgba(245,230,200,0.94)), url(${PARCHMENT_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

type IconName =
  | 'planet'
  | 'fire'
  | 'nature'
  | 'metal'
  | 'day'
  | 'discipline'
  | 'warrior'
  | 'sign'
  | 'up'
  | 'down'
  | 'direction'
  | 'symbol'
  | 'benefit'
  | 'connect'
  | 'gem'
  | 'quote'
  | 'faq'
  | 'triangle'
  | 'aries'
  | 'scorpio'
  | 'red'
  | 'spear'
  | 'hanuman';

type QuickFact = {
  icon?: IconName;
  assetUrl?: string;
  label: string;
  value: string;
};

type MantraBlock = {
  title: string;
  devanagari: string;
  iast: string;
  meaning: string;
};

type DetailRow = {
  icon?: IconName;
  assetUrl?: string;
  label: string;
  value: string;
};

type InsightSection = {
  title: string;
  paragraphs: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type Association = {
  title: string;
  subtitle: string;
  icon?: IconName;
  assetUrl?: string;
};

const quickFacts: QuickFact[] = [
  { icon: 'planet', label: 'Planet', value: 'Mangala' },
  { icon: 'fire', label: 'Element', value: 'Fire' },
  { icon: 'triangle', label: 'Nature', value: 'Masculine' },
  { icon: 'metal', label: 'Metal', value: 'Copper' },
  { icon: 'day', label: 'Day', value: 'Tuesday' },
  { icon: 'direction', label: 'Direction', value: 'South' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Mangala Mantra',
    devanagari:
      'धरणीगर्भसम्भूतं विद्युत्कान्ति समप्रभम्। कुमारं शक्तिधरं मङ्गलं प्रणतोऽस्मि देवकरम्॥',
    iast:
      "Dharaṇī-garbha-sambhūtaṁ vidyutkānti samaprabham Kumāraṁ śaktidharaṁ maṅgalaṁ praṇato'smi devakaram",
    meaning:
      'I bow to Mangala, born from the womb of Earth, shining like lightning, the divine warrior who holds the power to protect.',
  },
  {
    title: 'Beej Mantra for Mangala',
    devanagari: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥',
    iast: 'Om Krāṁ Krīṁ Krauṁ Saḥ Bhaumāya Namaḥ',
    meaning: 'Salutations to Mangala, Mars, the bestower of strength and courage.',
  },
];

const lifeRows: DetailRow[] = [
  { assetUrl: FLAME_URL, label: 'Represents', value: 'Courage, Energy, Action, Discipline' },
  {
    assetUrl: CROWN_URL,
    label: 'Governs',
    value: 'Discipline, Warrior spirit, Land, Siblings, Real estate, Physical strength',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Aries (Mesha), Scorpio (Vrischika)' },
  { icon: 'up', label: 'Exalted In', value: 'Capricorn (Makara)' },
  { icon: 'down', label: 'Debilitated In', value: 'Cancer (Karka)' },
  { icon: 'direction', label: 'Direction', value: 'South' },
  { assetUrl: SPEAR_URL, label: 'Symbol', value: 'Red color, Spear, Triangle' },
];

const benefits = [
  'Boosts courage and self-confidence',
  'Enhances physical strength and stamina',
  'Helps in victory over enemies',
  'Brings discipline and determination',
  'Removes fear and laziness',
  'Supports in real estate and land matters',
  'Promotes protection and safety',
];

const connectPractices = [
  'Chant Mangala mantra on Tuesdays.',
  'Offer red lentils, Masoor Dal.',
  'Donate red cloth or jaggery.',
  'Wear Red Coral, Moonga, in copper.',
  'Visit Hanuman temple.',
  'Practice physical exercise and discipline.',
];

const insightSections: InsightSection[] = [
  {
    title: 'What Is Mangala in Vedic Astrology?',
    paragraphs: [
      'Mangala (मङ्गल, IAST Maṅgala) is the Sanskrit name of Mars, and the word translates literally as "the auspicious" or "the favorable". In the council of nine planetary deities known as the Navagraha, Mangala holds the seat of energy, courage, willpower, and protective action. He is also addressed as Bhauma, son of Bhumi the earth goddess, and as Angaraka (Aṅgāraka), meaning the burning ember. Each name highlights a slightly different shade of his nature, but together they describe a single force, the disciplined fire that allows a person to move from intention to result.',
      'As a karaka, the significator of life themes, Mangala rules brothers and younger siblings, landed property, real estate, military and police service, athletic effort, the surgical hand, and the precision required by engineering and skilled manual work. In Vedic astrology he is the planet who supplies the will to begin and the stamina to finish. When jyotishis read a chart for drive, decisiveness, or capacity to defend what one loves, they are tracing the movement of Mars across signs and houses. His blessing is initiative; his lesson is restraint.',
      'The general role of Mars is to drive initiative outward and to protect what is precious from harm. He is the warrior who guards dharma, not the bully who picks the fight. Properly held, his fire becomes loyalty, dependability, and the steady backbone of righteous effort. Held poorly, the same fire turns into friction, accident, and impatient anger. The classical traditions therefore frame his worship not as a pursuit of power, but as the steady cultivation of courage, patience, and right action. [VERIFY: Brihat Parashara Hora Shastra and Phaladeepika order Mangala\'s primary karakatvas slightly differently.]',
    ],
  },
  {
    title: "Mangala's Form and Symbolism",
    paragraphs: [
      'Mangala is depicted in classical iconography with a youthful red complexion, four arms, and a body that radiates warmth like a fresh flame. He is most often shown riding a ram, the symbol of headlong courage, although some texts describe him riding a chariot drawn by red horses through the southern quarter of the sky. In his hands he holds a shakti (spear), a gada (club), a trishul (trident), or a sword, depending on the source consulted. These weapons are not signs of aggression but emblems of vigilance, the readiness of a guardian who watches without sleep. [VERIFY: chariot iconography varies between Bhavishya Purana and Skanda Purana.]',
      'His symbolic field is fire (agni), blood (rakta), and the unborn vital energy (ojas) that becomes muscular strength when channelled. The triangle is his yantra shape because three lines meeting at a point capture the geometry of focused will. Red is his color because it is the color of life force at its most visible, and copper (tāmra) is his metal because it is hot, conductive, and easy to forge. Each correspondence helps the practitioner remember that Mars is concentration of energy at a single sharp edge.',
      'One of the most loved associations of Mangala is his bond with Hanuman, the divine warrior devotee. Devotees often turn to Hanuman when fiery Mars energy needs to be steadied through humility, devotion, and selfless effort. The teaching is gentle and practical: where raw Mars can be reckless, a Hanuman-grounded Mars becomes faithful service. Worship of one quietly strengthens the other, and many remedy traditions weave them together.',
    ],
  },
  {
    title: 'Houses and Signs Mangala Rules',
    paragraphs: [
      'Mangala holds two homes in the zodiac, the cardinal fire sign Aries (Mesha) and the fixed water sign Scorpio (Vrishchika). Aries gives him the room to begin freshly and to act first; Scorpio gives him the depth to hold a vow over time and to investigate the unseen. Aries makes the warrior and Scorpio makes the strategist, and a chart with Mars well-placed in either of these signs often shows clear backbone and undivided drive.',
      'His exaltation is in Capricorn (Makara) at twenty-eight degrees according to the Parashari tradition, where the structure of Saturn gives Mars a disciplined channel for effort. His debilitation is in Cancer (Karka), the watery sign of Chandra, where the warrior\'s edge softens and the energy can dissipate into mood. His mooltrikona, the seat of his most balanced expression, is the first twelve degrees of Aries. Within these dignities, even small differences in degree change the way the planet behaves.',
      'Among the planetary friendships, Mangala counts the Sun (Surya), the Moon (Chandra), and Jupiter (Guru) as friends; he holds enmity towards Mercury (Budh); and he treats Venus (Shukra) and Saturn (Shani) as neutrals. His direction is the south, the quarter of the sky associated with effort, dharma, and the protective gaze of fire. These are not arbitrary correspondences. They form the syntax through which a Vedic chart reads the temperament of action.',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Mangala',
    paragraphs: [
      'A strong Mangala in a birth chart is felt as quiet courage rather than loud aggression. The native carries the kind of stamina that returns to a task after rest, the steadiness to take the first step in a difficult conversation, and the confidence to stand alone when the situation requires it. Such a person often does well in competitive fields, military or police service, surgery, athletics, and the careful management of land and property. The temperament is action-oriented but not chaotic; effort is shaped by discipline.',
      'A weak or afflicted Mangala can show up in several forms. Some natives experience flares of anger that do not match the situation. Others struggle with accidents, cuts, burns, or blood-related health concerns that recur until handled at the root. Conflicts with siblings, particularly younger brothers, are also a common pattern, as is restlessness without direction, the body forever ready to move but the mind without a worthy task. The fire wishes to act and finds no honourable outlet, so it turns inward and irritates the system.',
      'It is important to remember that no planet is read in isolation in Vedic astrology. The strength of Mangala depends on his sign, house, the planets that aspect him, the dasha (planetary period) running, and the ascendant. A formally weak Mars in a benefic chart can still produce magnificent results, while a textbook-strong Mars under a poorly-timed dasha can struggle. These are general patterns offered for orientation, never personal predictions, and a full chart reading with a qualified jyotishi is the responsible next step.',
    ],
  },
  {
    title: 'Mangala in Each House (1 to 12)',
    paragraphs: [
      'When Mangala occupies the first house (the lagna), he gives a warrior personality, athletic build, and often visible scars or marks acquired in childhood or adolescence. In the second house he produces forceful and direct speech, can stir family conflict, and creates volatility around early-life finances. The third house is his own territory; here he gives the gift of brave communication, strong relations with siblings, and a courage that reaches every conversation.',
      'In the fourth house Mars supports gains through real estate and land, but home life can carry friction unless the energy is consciously cooled. The fifth house produces passionate creativity, sports talent, and a direct relationship with one\'s own children, sometimes accompanied by concern over their health. In the sixth house Mars is famously well placed, granting victory over opponents, the ability to clear debts, and aptitude for surgical or martial professions. The seventh house brings a dominant partner, the possibility of marriage delays, and the classical concerns of Manglik dosha that should always be weighed against the whole chart.',
      'An eighth-house Mars draws the native towards the occult, deep transformation, and longevity matters, with sudden gains and sudden losses both possible. The ninth produces a dharmic warrior who defends teachers and tradition, often through foreign travel. The tenth gives careers in defense, engineering, surgery, and visible leadership. The eleventh confers gains through siblings and the courage to maintain demanding friendships. The twelfth can mark hidden enemies, a tendency towards foreign settlement, or stays in hospitals, monasteries, and other places of retreat. [VERIFY: Manglik dosha effects and exemptions vary across Parashari, Jaimini, and KP systems.]',
    ],
  },
  {
    title: 'Mangala Mahadasha and Antardasha',
    paragraphs: [
      'In the Vimshottari dasha system, the Mahadasha of Mangala lasts seven years. When this period activates, the chart turns its focus towards action, conflict, achievement, and the testing of courage. Themes that have been quietly accumulating, especially around property, siblings, and the body, often come forward to be addressed during this seven-year window. The native is asked to act, and how that action is undertaken shapes the rest of the cycle.',
      'A favourable Mangala dasha is often experienced as career promotion through visible courage, gains through real estate, victory in disputes that have lingered, and a peak in physical strength. Some natives undertake major construction, others enter leadership roles in defense or sport, and many find that long-postponed projects finally complete themselves. The classical literature speaks of a kind of fearless competence that becomes the defining quality of the seven years.',
      'A challenging Mangala dasha can present as accidents, surgeries that should not be deferred, blood-related health concerns, family conflicts, or legal troubles that demand patience. Antardasha sub-periods within the Mahadasha further refine the result; for example, Mars within Mercury can sharpen technical capacity, while Mars within Saturn can slow effort down to the pace of endurance. Even within a generally smooth Mahadasha, a single demanding antardasha can colour an entire year, which is why responsible jyotishis examine both the natal placement of Mars and the sub-period lord together. These are tendencies to be read in conjunction with the natal chart, transits, and the ascendant lord, and a serious dasha analysis benefits from the eye of a trained astrologer.',
    ],
  },
  {
    title: 'Vedic Remedies for Mangala',
    paragraphs: [
      'Tuesday (Mangalavara) is the day held sacred to Mars, and many traditional remedies begin there. A simple Tuesday observance includes a light fast, a visit to a temple of Mangala or Hanuman, and the offering of red cloth, jaggery, or red lentils (masoor dal) at the sanctum. The aim is not appeasement of an angry planet but a respectful turning of the inner attention towards the qualities Mars governs, courage, discipline, and protective service.',
      'Mantra recitation forms the spine of formal Mangala remedies. The Navagraha Mangala stotra and the Beej mantra are shown in the Sacred Mantras section above, and they remain the most widely chanted invocations across the South Asian traditions. Daily practice of a small number of repetitions, performed in a quiet hour with sincerity, is often considered more beneficial than long counts done in restlessness. The voice itself learns to settle along with the planet.',
      'Worship of Hanuman is among the most loved adjacent practices because Hanuman embodies disciplined fire offered in selfless service. Reading the Hanuman Chalisa on Tuesdays, visiting Hanuman temples, supporting blood donation drives, donating copper utensils, and giving red lentils or jaggery to those in need are all classical paths. Red Coral (Moonga, also called Praval) is the gemstone of Mars, traditionally set in copper on the ring finger of the right hand and installed on a Tuesday morning after chart verification by a qualified jyotishi. A Mangala yantra in copper, kept on a clean altar, supports the same intention. None of these remedies replace medical, legal, or financial counsel, and the responsible practice is always remedy alongside, not remedy instead of, qualified human advice.',
    ],
  },
  {
    title: 'Astrological Wisdom: Energy as Will',
    paragraphs: [
      'The deepest teaching of Mangala is the difference between energy and will. Energy without direction destroys; energy that is anchored in conscience and disciplined towards a task becomes the engine of every good outcome. Anger is not the opposite of strength, it is unrefined strength still searching for its rightful work. The classical sages observed that fiery natures who learn this distinction become protectors, while those who do not become a slow harm to themselves and others.',
      'Courage is the foundation of dharma. Without it, the gentlest virtues stay as private wishes. Patience, kindness, generosity, and the keeping of one\'s word all require backbone, and Mars is the planet that supplies that backbone. The traditions remind the practitioner that the warrior protects, never aggresses without cause, and that the truest sign of strong Mars is calm in the moment when the unprepared would erupt.',
      'For a modern reader, the practical translation is assertiveness without aggression, leadership through example, and action grounded in conscience. A well-tended Mars makes a person someone others can rely on in difficulty, a steady source of support without theatre. Over time, the same fire that once burned hot in haste begins to burn slowly and faithfully, like the lamp in a temple that never goes out. The blessing of Mangala matures with practice, and the practitioner who walks with him long enough often finds that fear has quietly dissolved into devotion, and that devotion has quietly hardened into the calm courage every life eventually requires. Mangala does not promise an easy life, but he promises a life worth fighting for, and the courage to fight for it well.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Mangala (Mars) signify in Vedic astrology?',
    answer:
      'Mangala signifies courage, energy, willpower, action, and the capacity to protect what one values. He governs siblings, real estate, athletic effort, and the precision required for surgery, engineering, and martial work. In a chart, his position shows how a person initiates, defends, and sustains effort under pressure. His teaching is that strength becomes virtuous only when guided by conscience.',
  },
  {
    question: 'What are the signs of a strong Mangala in a birth chart?',
    answer:
      'A strong Mangala typically shows up as quiet courage rather than loud aggression. Common signs include physical stamina, decisive leadership, success in competitive fields, the ability to defend one\'s loved ones without losing composure, and gains through land or property work. The native is willing to take the first step in difficult situations and is steady enough to finish what they begin. Final assessment depends on the full chart, including dignity, aspects, and the running dasha.',
  },
  {
    question: 'What is Manglik dosha and how is it identified?',
    answer:
      'Manglik dosha refers to a placement of Mangala in specific houses (often listed as the first, fourth, seventh, eighth, and twelfth from the ascendant) that classical texts associate with friction in marriage and partnerships. Some lineages use the moon as the reference point, others the ascendant or Venus. The condition is taken seriously in compatibility analysis, but it is rarely as decisive as popular accounts suggest, and many cancellations and exemptions are recorded in the literature. A qualified jyotishi reads the dosha alongside the rest of the chart before drawing any conclusion. [VERIFY: Manglik effects and exemptions vary across Parashari, Jaimini, and KP systems.]',
  },
  {
    question: 'Which gemstone is recommended for Mangala?',
    answer:
      'Red Coral (Moonga, also called Praval) is the traditional gemstone of Mangala. It is most often set in copper or gold and worn on the ring finger of the right hand after a Tuesday morning installation. A gemstone amplifies the planet, which is helpful only when amplification is appropriate for the individual chart, so the responsible step is a personal consultation with a qualified astrologer before purchase. The intention is steadying the planet, not forcing it.',
  },
  {
    question: 'What is the Beej mantra of Mangala?',
    answer:
      'The Beej mantra of Mangala is "Om Krāṁ Krīṁ Krauṁ Saḥ Bhaumāya Namaḥ", saluting Mangala as Bhauma the son of the earth. It is shown with full Devanagari and IAST in the Sacred Mantras section above. Traditional practice is one hundred and eight recitations on Tuesdays in a quiet hour, with sincerity weighted more heavily than haste or volume. The voice itself learns to settle along with the planet.',
  },
  {
    question: 'How do Mangala mahadasha and antardasha affect life?',
    answer:
      'The Mangala Mahadasha in the Vimshottari system runs for seven years and tends to activate themes of action, courage, real estate, siblings, and the body. A favourable period can bring promotion, victory in long-running disputes, and peaks of physical strength. A challenging period can present as accidents, surgeries, family friction, or legal troubles that demand patience. Antardasha sub-periods refine the result further and should be read alongside transits, the ascendant lord, and the natal placement of Mars.',
  },
  {
    question: 'What are the most effective remedies for a weak Mangala?',
    answer:
      'Classical remedies for a weak or afflicted Mangala include the Tuesday observance, recitation of the Navagraha Mangala stotra and Beej mantra, devotional practices to Hanuman such as the Hanuman Chalisa, donation of red lentils, jaggery, copper utensils, or red cloth, and consultation about Red Coral after personal chart verification. The deeper remedy is the cultivation of disciplined courage in daily life. None of these practices replace medical, legal, or financial counsel, and they are best undertaken alongside qualified human advice.',
  },
];

const associations: Association[] = [
  { title: 'Aries', subtitle: 'Ruling Sign', icon: 'aries' },
  { title: 'Scorpio', subtitle: 'Co-ruling Sign', icon: 'scorpio' },
  { title: 'Tuesday', subtitle: 'Sacred Day', icon: 'day' },
  { title: 'Red', subtitle: 'Sacred Color', icon: 'red' },
  { title: 'Triangle', subtitle: 'Sacred Shape', icon: 'triangle' },
  { title: 'Spear', subtitle: 'Sacred Weapon', icon: 'spear' },
  { title: 'Hanuman', subtitle: 'Divine Connection', icon: 'hanuman' },
  { title: 'South', subtitle: 'Direction', icon: 'direction' },
];

function iconSvg(name: IconName, className = 'h-6 w-6'): JSX.Element {
  const base = 'none';
  switch (name) {
    case 'planet':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M4 14c2.4 2.6 13 4 16 1.2 1.6-1.5-.3-3.6-2.8-4.8-2.5-1.2-7.2-2-11-.7C3.6 10.5 2.9 12.8 4 14Z" />
        </svg>
      );
    case 'fire':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3c2 3 4.6 5.1 4.6 8.8 0 3-2.1 5.2-4.6 5.2s-4.6-2.2-4.6-5.2c0-2 1-3.7 2.4-5.2.4 1.8 1.5 2.6 2.6 3.3.1-2.8.8-4.7 3.6-7Z" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 4v16M7 8l5-4 5 4M7 16l5 4 5-4" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m12 3 6 4v10l-6 4-6-4V7l6-4Z" />
          <path d="m12 3 0 18" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'discipline':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 8 10 5l2 3 2-3 3 3v2H7V8Z" />
          <path d="M8 11h8v4.2c0 2.5-1.6 4.6-4 5.8-2.4-1.2-4-3.3-4-5.8V11Z" />
        </svg>
      );
    case 'warrior':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m12 3 2 4 4 2-4 2-2 10-2-10-4-2 4-2 2-4Z" />
        </svg>
      );
    case 'sign':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 5c2.2 0 4 1.8 4 4v10" />
          <path d="M17 5c-2.2 0-4 1.8-4 4v10" />
          <path d="M7 5h10" />
        </svg>
      );
    case 'up':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      );
    case 'down':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 5v14M17.5 13.5 12 19l-5.5-5.5" />
        </svg>
      );
    case 'direction':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="7.5" />
          <path d="m12 18-3-6h6l-3 6Zm0-6V6" />
        </svg>
      );
    case 'symbol':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="10" cy="14" r="4.5" />
          <path d="M13 11 20 4M16 4h4v4" />
        </svg>
      );
    case 'benefit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.9">
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'connect':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3v18M3 12h18" />
          <path d="M5.5 5.5c2.2 2.2 4.3 3.3 6.5 3.3s4.3-1.1 6.5-3.3" />
          <path d="M5.5 18.5c2.2-2.2 4.3-3.3 6.5-3.3s4.3 1.1 6.5 3.3" />
        </svg>
      );
    case 'gem':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m7 4-3 5 8 11 8-11-3-5H7Z" />
          <path d="m9 4 3 5 3-5M4 9h16" />
        </svg>
      );
    case 'quote':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M8.2 10.7c0 2.5-1.6 4.4-4.4 4.9l-.3-1.2c1.5-.5 2.4-1.3 2.6-2.5a2.8 2.8 0 0 1-2.3-2.8C3.8 7.4 5 6 6.8 6c1.9 0 3.4 1.6 3.4 4.7Zm10 0c0 2.5-1.6 4.4-4.4 4.9l-.3-1.2c1.5-.5 2.4-1.3 2.6-2.5a2.8 2.8 0 0 1-2.3-2.8c0-1.7 1.2-3.1 3-3.1 1.9 0 3.4 1.6 3.4 4.7Z" />
        </svg>
      );
    case 'faq':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 18h.01M9.2 9.3a2.8 2.8 0 1 1 4.6 2.2c-.9.7-1.5 1.2-1.5 2.5" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4 19 18H5L12 4Z" />
        </svg>
      );
    case 'aries':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M6 18c0-5.8 2.6-10 6-10s6 4.2 6 10" strokeLinecap="round" />
          <path d="M8.5 9.5C6.8 8 6 6.5 6 5.2 6 3.4 7 2 8.7 2c1.8 0 3.1 1.5 3.3 3.7" strokeLinecap="round" />
          <path d="M15.5 9.5C17.2 8 18 6.5 18 5.2 18 3.4 17 2 15.3 2c-1.8 0-3.1 1.5-3.3 3.7" strokeLinecap="round" />
        </svg>
      );
    case 'scorpio':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="M5 18V9M10 18V9M15 18V9" strokeLinecap="round" />
          <path d="M5 9c0-1.7 1.2-3 2.8-3S10.5 7.3 10.5 9" strokeLinecap="round" />
          <path d="M10 9c0-1.7 1.2-3 2.8-3S15.5 7.3 15.5 9" strokeLinecap="round" />
          <path d="M15 18h2.2c1.8 0 3.3-1.5 3.3-3.3V12" strokeLinecap="round" />
          <path d="m17.6 13.4 2.9-2.9M18.6 9.8h2.6v2.6" strokeLinecap="round" />
        </svg>
      );
    case 'red':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <radialGradient id="mars-red-core" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="55%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="7.5" fill="url(#mars-red-core)" />
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
        </svg>
      );
    case 'spear':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3 2.8 4.2L12 10 9.2 7.2 12 3Z" />
          <path d="M12 10v10" strokeLinecap="round" />
          <path d="M9 20h6" strokeLinecap="round" />
        </svg>
      );
    case 'hanuman':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 5c1.7 0 3 1.3 3 3 0 .7-.2 1.3-.5 1.8 2 .8 3.5 2.7 3.5 5V19H6v-4.2c0-2.3 1.5-4.2 3.5-5-.3-.5-.5-1.1-.5-1.8 0-1.7 1.3-3 3-3Z" />
          <path d="M9 12.7c.8.6 1.8 1 3 1s2.2-.4 3-1" strokeLinecap="round" />
          <path d="M12 3v2" strokeLinecap="round" />
        </svg>
      );
  }
}

function Highlight({ children }: { children: string }) {
  return (
    <span className="highlight-marker rounded px-1.5 py-0.5 text-slate-900 shadow-[0_3px_12px_rgba(252,211,77,0.18)]">
      {children}
    </span>
  );
}

function ParchmentCard({
  children,
  className = '',
  rotate = '',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`card-parchment relative overflow-hidden border border-[#8c6e47]/45 p-5 text-[#26180d] shadow-[0_18px_36px_rgba(64,26,15,0.16),0_28px_70px_rgba(27,10,8,0.12)] sm:p-6 ${rotate} ${className}`}
      style={cardTextureStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(73,43,19,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(79,33,20,0.04)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const EmberfieldDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 60 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.5 + (((i * 7) % 10) / 10) * 1.6;
      const opacity = 0.25 + (((i * 13) % 10) / 10) * 0.7;
      return <circle key={i} cx={x} cy={y} r={r} fill="#fcd34d" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="400" cy="300" r="180" fill="none" stroke="#f87171" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#fb7185" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#fdba74" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#fca5a5" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.25" />
  </svg>
);

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-red-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#dc2626]',
}: {
  className?: string;
  strokeClassName?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} ${strokeClassName}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 41c9-11 18-16 27-14 9 1 12 10 21 5" strokeLinecap="round" />
      <path d="M20 12c4 2 5 6 4 10-2 5-7 6-11 4-4-3-4-8-1-12 3-3 8-4 12-2" strokeLinecap="round" />
      <path d="M45 20c2 3 6 4 10 2-1 4-1 8 3 10-4 1-7 4-7 8-2-3-6-4-10-2 2-3 2-7-1-10 3-1 5-4 5-8Z" />
    </svg>
  );
}

function CoralRingIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="mars-coral-gem" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="28%" stopColor="#fb7185" />
          <stop offset="68%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <linearGradient id="mars-gold-ring" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#8a4a10" />
          <stop offset="20%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="80%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <radialGradient id="mars-glow" cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="rgba(248,113,113,0.55)" />
          <stop offset="100%" stopColor="rgba(248,113,113,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="188" rx="98" ry="56" fill="none" stroke="url(#mars-gold-ring)" strokeWidth="24" />
      <ellipse cx="210" cy="188" rx="72" ry="34" fill="#2a140f" opacity="0.82" />
      <ellipse cx="210" cy="182" rx="120" ry="84" fill="url(#mars-glow)" />
      <path
        d="M168 170c8-32 21-54 42-68 21 14 34 36 42 68-14 22-29 34-42 40-13-6-28-18-42-40Z"
        fill="url(#mars-gold-ring)"
        opacity="0.96"
      />
      <ellipse cx="210" cy="132" rx="58" ry="56" fill="url(#mars-coral-gem)" stroke="url(#mars-gold-ring)" strokeWidth="8" />
      <ellipse cx="193" cy="114" rx="17" ry="13" fill="#fff7ed" opacity="0.34" />
      <circle cx="230" cy="147" r="8" fill="#7f1d1d" opacity="0.18" />
    </svg>
  );
}

function FooterStarfield() {
  return (
    <>
      {[
        [120, 40, 1.5],
        [300, 80, 1],
        [900, 60, 1.5],
        [1100, 100, 1],
        [1300, 50, 1.5],
        [220, 120, 1.2],
        [760, 36, 1.3],
        [980, 150, 1],
      ].map(([left, top, size]) => (
        <span
          key={`${left}-${top}`}
          className="absolute rounded-full bg-[#facc15]/60"
          style={{
            left: `${left}px`,
            top: `${top}px`,
            width: `${size * 3}px`,
            height: `${size * 3}px`,
          }}
        />
      ))}
    </>
  );
}

function renderFactIcon(fact: QuickFact | DetailRow | Association, className = 'h-7 w-7') {
  if (fact.assetUrl) {
    return <img src={fact.assetUrl} alt="" className={className} loading="lazy" />;
  }
  if (fact.icon) {
    return iconSvg(fact.icon, className);
  }
  return null;
}

export default function MarsPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Mangala (Mars), The Warrior of Energy',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-26',
        dateModified: '2026-04-26',
        url: '/planets/mars',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Mangala',
          'Mars in Vedic astrology',
          'Mangala mantra',
          'Mangala beej mantra',
          'Navagraha Mangala stotra',
          'Red Coral gemstone',
          'Moonga gemstone',
          'Mars remedies',
          'Manglik dosha',
          'Mangala mahadasha',
          'warrior energy',
          'Vedic astrology Mars',
        ],
      }),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Mars (Mangala)', url: '/planets/mars' },
      ]),
      getWebPageSchema({
        name: 'Mangala (Mars), The Warrior of Energy',
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
      }),
      getFaqPageSchemaFromList(faqs),
    ],
    [],
  );

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        keywords={PAGE_KEYWORDS}
        image={HERO_URL}
        url={PAGE_URL}
        type="article"
        schemas={schemas}
      />

      <div className="min-h-screen text-[#2b1a0f]" style={pageShellStyle}>
        <div className="px-4 pt-5 sm:px-6 lg:px-10">
          <Link
            to="/planets"
            aria-label="Back to Planets hub"
            className="inline-flex font-caveat text-lg text-[#b91c1c] transition hover:text-[#7f1d1d] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2626]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(220,38,38,0.46) 0%, rgba(88,16,16,0.38) 20%, rgba(32,7,7,1) 44%, rgba(15,5,5,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_18%] bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,6,6,0.97)_0%,rgba(22,6,6,0.92)_18%,rgba(22,6,6,0.66)_34%,rgba(22,6,6,0.26)_48%,rgba(22,6,6,0.08)_66%,rgba(22,6,6,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,5,5,0.36)_0%,rgba(21,5,5,0.1)_32%,rgba(21,5,5,0.62)_100%)]" />
          <div className="absolute left-[6%] top-[14%] h-48 w-48 rounded-full bg-[#dc2626]/18 blur-3xl" />
          <div className="absolute left-[24%] top-[42%] h-32 w-32 rounded-full bg-[#f59e0b]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-75 mix-blend-screen">
            <EmberfieldDoodle className="absolute inset-0" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <img src={SEAL_URL} alt="" className="absolute left-[8%] top-16 h-10 w-10" />
            <img src={CRYSTAL_URL} alt="" className="absolute left-[30%] top-[18rem] h-7 w-7 -rotate-12" />
            <img src={FLAME_URL} alt="" className="absolute left-[18%] top-[34rem] h-5 w-5 rotate-12 opacity-55" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[33rem] sm:min-h-[38rem] lg:min-h-[43rem] xl:min-h-[47rem]">
              <div className="relative z-10 max-w-2xl overflow-visible pb-32 pt-12 sm:pb-36 sm:pt-16 lg:max-w-[42rem] lg:pb-44 lg:pt-24">
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-red-200/10 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#f3c9a6]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat text-[5.8rem] leading-[0.98] text-[#ef4444] drop-shadow-[0_0_34px_rgba(220,38,38,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                  Mangala
                </h1>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#fef2f2] sm:text-4xl">मङ्गल</div>
                  <div className="font-kalam text-2xl text-[#fecaca] sm:text-3xl">(Mars)</div>
                </div>
                <h2 className="mt-4 font-caveat text-4xl leading-none text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-[4rem]">
                  the warrior of energy
                </h2>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] [text-shadow:0_3px_10px_rgba(0,0,0,0.34)] sm:text-[2.15rem]">
                  <p>Mangala fuels our <Highlight>courage</Highlight>, <Highlight>strength</Highlight></p>
                  <div className="flex items-center gap-3">
                    <p>and <Highlight>determination</Highlight>.</p>
                    <ScribbleLine />
                  </div>
                  <p>He is the protector who drives us to <Highlight>action</Highlight> and <Highlight>victory</Highlight>.</p>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#f6c06d]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#f6c06d]/80" />
                  <img src={SYMBOL_MARS_URL} alt="" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-red-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#f6c06d]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#f6c06d]/65" />
                </div>
                <img src={PLANET_SPHERE_URL} alt="" className="absolute left-[18%] top-[18%] h-[60%] w-[60%] object-contain opacity-18" />
              </div>

              <div className="relative z-10 mt-8 max-w-[18rem] sm:mt-10 sm:max-w-[30rem] lg:absolute lg:bottom-4 lg:left-0 lg:mt-0 lg:max-w-[38rem]">
                <ParchmentCard className="rounded-[24px] p-2.5 sm:p-3 shadow-[0_18px_40px_rgba(0,0,0,0.38)]" rotate="lg:-rotate-[0.55deg]">
                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
                    {quickFacts.map((fact, index) => (
                      <div
                        key={fact.label}
                        className={`flex min-h-[96px] flex-col items-center justify-center px-2.5 py-2.5 text-center sm:min-h-[110px] sm:px-3 ${
                          index < quickFacts.length - 1 ? 'lg:border-r lg:border-[#755632]/30' : ''
                        }`}
                      >
                        <div className="text-[#7f1d1d]">{renderFactIcon(fact, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#991b1b] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'linear-gradient(rgba(245,230,200,0.78), rgba(245,230,200,0.9))',
          }}
        >
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-10">
            <div className="mt-2 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
              <ParchmentCard className="min-h-full" rotate="xl:-rotate-[0.5deg]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-devanagari text-4xl text-[#1f140d]">ॐ</span>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                        Sacred Mantras
                      </h3>
                    </div>
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={SEAL_URL} alt="" className="h-14 w-14 opacity-70" />
                    <img src={CRYSTAL_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#991b1b] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#dc2626] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(220,38,38,0.08)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#991b1b]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#991b1b]">Meaning:</span> {mantra.meaning}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <img
                  src={FEATHER_URL}
                  alt=""
                  className="pointer-events-none absolute bottom-3 left-2 hidden h-44 w-auto opacity-85 lg:block"
                />
              </ParchmentCard>

              <div className="grid gap-6">
                <ParchmentCard rotate="xl:rotate-[0.4deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Mangala in Our Life
                    </h3>
                    <div className="text-[#991b1b]">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#991b1b]">{renderFactIcon(row, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#991b1b]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute right-4 top-4 text-[#2a1a10]/60">
                    <img src={SPEAR_URL} alt="" className="h-20 w-10 opacity-70" />
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Mangala Mantra
                    </h3>
                    <img src={FLAME_URL} alt="" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex gap-3 rounded-2xl border border-[#7b603e]/12 bg-white/18 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                      >
                        <div className="mt-0.5 text-[#dc2626]">{iconSvg('benefit', 'h-5 w-5')}</div>
                        <p className="font-kalam text-xl leading-relaxed text-[#29190f]">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>

            <div className="mt-6">
              <ParchmentCard rotate="lg:-rotate-[0.25deg]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    How to Connect with Mangala
                  </h3>
                  <img src={SYMBOL_MARS_URL} alt="" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_12px_28px_rgba(108,35,20,0.07)]"
                    >
                      <div className="mb-3 text-[#991b1b]">{iconSvg('connect', 'h-6 w-6')}</div>
                      <p className="font-kalam text-lg leading-relaxed text-[#2a190f]">{practice}</p>
                    </div>
                  ))}
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <ParchmentCard rotate="xl:-rotate-[0.6deg]">
                <div className="text-center">
                  <div className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Gemstone: Red Coral
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#991b1b]">Moonga</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-35">
                    <EmberfieldDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#d95a57]/85 bg-[#2a120f] px-5 py-6 shadow-[0_14px_28px_rgba(0,0,0,0.24),0_0_32px_rgba(220,38,38,0.14)]">
                    <CoralRingIllustration />
                    <img
                      src={CORAL_URL}
                      alt=""
                      className="pointer-events-none absolute left-3 top-3 h-10 w-10 opacity-0"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Strengthens Mangala&apos;s blessings. Wear in copper or gold setting on the ring finger of the right hand on a Tuesday morning, after offering it to Mangala with the mantra.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="tape-decoration hidden sm:block" />
                <div className="pointer-events-none absolute inset-0 opacity-15">
                  <EmberfieldDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#991b1b]">
                    <img src={STICKY_NOTE_URL} alt="" className="h-8 w-20 opacity-80" />
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#dc2626]/25 bg-white/28 px-4 py-2 font-kalam text-sm uppercase tracking-[0.28em] text-[#991b1b]">
                  <ScribbleAccent className="h-6 w-6" strokeClassName="text-[#dc2626]" />
                  Warrior vow
                </div>
                <div className="mt-6 font-kalam text-[2rem] leading-snug text-[#991b1b] sm:text-[2.4rem]">
                  “I am strong, I am brave, I take action and create my victorious destiny.”
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports courage that is centered, disciplined, and worthy of the fire it carries.
                </div>
              </ParchmentCard>
            </div>

          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f4ecda] py-20 text-[#26180d]">
          <div
            className="absolute inset-0 opacity-65"
            style={{
              backgroundImage: `linear-gradient(rgba(244,236,218,0.9), rgba(244,236,218,0.9)), url(${PARCHMENT_URL})`,
              backgroundSize: '780px',
              backgroundPosition: 'center',
            }}
          />

          <img src={QUILL_URL} alt="" className="pointer-events-none absolute right-6 top-24 hidden h-24 w-24 opacity-10 lg:block" />
          <img src={SEAL_URL} alt="" className="pointer-events-none absolute left-8 top-[34rem] hidden h-14 w-14 opacity-15 lg:block" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {insightSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#991b1b] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#dc2626' } as CSSProperties)
                              : undefined
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 lg:sticky lg:top-24">
                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Quick Facts</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#991b1b]">Element:</span> Fire (Agni)</div>
                    <div><span className="font-semibold text-[#991b1b]">Day:</span> Tuesday (Mangalavara)</div>
                    <div><span className="font-semibold text-[#991b1b]">Direction:</span> South</div>
                    <div><span className="font-semibold text-[#991b1b]">Metal:</span> Copper (Tāmra)</div>
                    <div><span className="font-semibold text-[#991b1b]">Gemstone:</span> Red Coral (Moonga)</div>
                    <div><span className="font-semibold text-[#991b1b]">Mahadasha:</span> 7 years</div>
                    <div><span className="font-semibold text-[#991b1b]">Yantra Shape:</span> Triangle</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Mangala is exalted in Capricorn at twenty-eight degrees, where structure gives fire its sharpest edge.</li>
                    <li>Aries and Scorpio together hold the warrior and the strategist sides of Mars.</li>
                    <li>Red Coral, the gemstone of Mars, is traditionally installed in copper on a Tuesday morning.</li>
                    <li>Hanuman worship is the most loved adjacent practice for steadying fiery Mars energy with humility.</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friends and Enemies</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#991b1b]">Friends:</span> Sun (Surya), Moon (Chandra), Jupiter (Guru)</div>
                    <div><span className="font-semibold text-[#991b1b]">Enemy:</span> Mercury (Budh)</div>
                    <div><span className="font-semibold text-[#991b1b]">Neutral:</span> Venus (Shukra), Saturn (Shani)</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Friendships shape how planets cooperate or compete in the chart.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Strong Mangala</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Quiet courage under pressure</li>
                    <li>Physical stamina that returns after rest</li>
                    <li>Backbone in difficult conversations</li>
                    <li>Decisive leadership without theatre</li>
                    <li>Steady relationships with siblings</li>
                    <li>Capacity to protect those one loves</li>
                    <li>Aptitude for surgery, engineering, athletics</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Weakened Mangala</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Anger out of proportion to the situation</li>
                    <li>Recurring accidents, cuts, or burns</li>
                    <li>Conflicts with younger brothers</li>
                    <li>Restlessness without clear direction</li>
                    <li>Difficulty finishing what one starts</li>
                    <li>Blood-related health concerns</li>
                  </ul>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Always best to verify with a full chart reading by a qualified jyotishi.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mangala in Houses at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#991b1b]">1st:</span> Warrior personality, athletic build</div>
                    <div><span className="font-semibold text-[#991b1b]">3rd:</span> Own house, brave siblings, courage in speech</div>
                    <div><span className="font-semibold text-[#991b1b]">6th:</span> Own house, victory over opponents</div>
                    <div><span className="font-semibold text-[#991b1b]">7th:</span> Dominant partner, Manglik considerations</div>
                    <div><span className="font-semibold text-[#991b1b]">8th:</span> Occult depth, sudden change</div>
                    <div><span className="font-semibold text-[#991b1b]">10th:</span> Defense, engineering, leadership careers</div>
                    <div><span className="font-semibold text-[#991b1b]">11th:</span> Gains through siblings and bold friendship</div>
                  </div>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Read as patterns, never as predictions.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mahadasha at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#991b1b]">Period:</span> 7 years (Vimshottari)</div>
                    <div><span className="font-semibold text-[#991b1b]">Themes:</span> Courage, action, conflict, property, siblings</div>
                    <div><span className="font-semibold text-[#991b1b]">Favourable:</span> Career rise, real estate gain, victory in long disputes</div>
                    <div><span className="font-semibold text-[#991b1b]">Challenging:</span> Surgery, accidents, family friction, legal trouble</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Antardasha sub-periods refine the year-by-year shape.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Tuesday Practice</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#991b1b] via-[#ef4444] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Light fast on Tuesdays</li>
                    <li>Visit a Hanuman or Mangala temple</li>
                    <li>Offer red cloth, jaggery, or masoor dal</li>
                    <li>Read the Hanuman Chalisa</li>
                    <li>Donate copper utensils or red lentils</li>
                    <li>Wear Red Coral after qualified consultation</li>
                    <li>Recite the Beej mantra 108 times in a quiet hour</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#991b1b]/80">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    Courage is the fire that turns dreams into reality.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    A Mars teaching for action that serves rather than burns.
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#230808]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.32)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#ffe7df]">Closing Thought</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A small reminder for the disciplined warrior.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-kalam text-xl leading-relaxed text-white/85">
                    When the fire is small and steady, it warms a home. When it is large and undisciplined, it burns one.
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Mangala&apos;s prayer is the same prayer either way: may my strength serve.
                  </div>
                </div>
              </div>
            </div>

            <footer className="relative mt-10 overflow-hidden rounded-[32px] border border-[#5c2518] bg-[linear-gradient(135deg,#0b0b0b_0%,#1a0b0b_100%)] px-5 py-8 text-[#fff7ed] shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:px-8">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.45)_0%,rgba(255,69,0,0.08)_45%,transparent_75%)]" />
                <FooterStarfield />
              </div>

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-center gap-4">
                  <div className="font-devanagari text-5xl text-[#f97316] sm:text-6xl">ॐ</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#fff7ed] sm:text-4xl">
                      Courage is the fire
                    </div>
                    <div className="mt-1 font-kalam text-xl text-[#fde7cf] sm:text-2xl">
                      that turns dreams into reality.
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
                    <img src={YANTRA_URL} alt="Mars yantra" className="h-full w-full object-contain opacity-95" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 lg:justify-end">
                  <div className="text-left lg:text-right">
                    <div className="font-devanagari text-3xl text-[#fde7cf] sm:text-4xl">ॐ अं अंगारकाय नमः॥</div>
                    <div className="mt-2 font-kalam text-xl text-[#fff7ed] sm:text-2xl">Om Aṁ Aṅgārakāya Namaḥ.</div>
                  </div>
                  <img src={DIYA_URL} alt="Sacred diya lamp" className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
                </div>
              </div>

              <div className="relative z-10 mt-8 border-t border-[#5c2518]/80 pt-6">
                <div className="text-center font-caveat text-3xl text-[#f3c9a6] sm:text-4xl">
                  Mangala&apos;s Associations
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {associations.map((association) => (
                    <div
                      key={association.title}
                      className="rounded-2xl border border-[#6a2b1c] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#7c2d12] bg-[#2a1412]/75 text-[#f97316] shadow-[0_0_24px_rgba(249,115,22,0.12)]">
                        {renderFactIcon(association, 'h-9 w-9 object-contain')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#fde7cf]">{association.title}</div>
                      <div className="mt-1 text-sm leading-snug text-[#f8d7c0]/80">{association.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#991b1b] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Mangala, Mars strength, Manglik dosha, remedies, and how Mars energy works in a Vedic chart.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[24px] border border-[#8c6e47]/25 shadow-[0_15px_30px_rgba(64,40,18,0.12)]"
                    style={cardTextureStyle}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-[#991b1b]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <div className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</div>
                      </div>
                      <div className="text-[#991b1b]">
                        <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-5 sm:px-6">
                        <div className="border-t border-[#8c6e47]/15 pt-4 font-kalam text-lg leading-relaxed text-[#38251a]">
                          {faq.answer}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
