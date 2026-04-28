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

const JUPITER_R2_BASE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Jupiter/hero-guru.webp`;
const CRYSTAL_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Shared/doodle-crystal.svg`;
const NAMASTE_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Shared/doodle-namaste.svg`;
const CROWN_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Shared/icon-crown.svg`;
const FLAME_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Shared/icon-flame.svg`;
const DIYA_URL = `${JUPITER_R2_BASE}/Pillar/Hub/Planets/Shared/diya.svg`;
const FEATHER_URL = `${JUPITER_R2_BASE}/Pillar/Hub/Planets/Shared/feather-doodle.svg`;
const SACRED_GEOMETRY_URL = `${JUPITER_R2_BASE}/Pillar/Hub/Planets/Shared/sacred-geometry.svg`;
const SEAL_MARS_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Mars/seal-mars.svg`;
const YANTRA_URL = `${JUPITER_R2_BASE}/Pillar/Planets/Mars/yantra-mars-detailed.svg`;

const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE = 'Guru (Jupiter), The Great Benefic | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Guru (Jupiter), the planet of wisdom, dharma, and growth. Mantras, gemstone (Yellow Sapphire), remedies, and Vedic traditions to awaken Guru's blessings.";
const PAGE_KEYWORDS =
  'guru, jupiter in vedic astrology, brihaspati, guru mantra, jupiter remedies, yellow sapphire, pukhraj, devaguru, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/jupiter`;

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
  | 'ether'
  | 'masculine'
  | 'gold'
  | 'day'
  | 'direction'
  | 'sign'
  | 'up'
  | 'down'
  | 'symbol'
  | 'benefit'
  | 'connect'
  | 'gem'
  | 'quote'
  | 'faq'
  | 'sagittarius'
  | 'pisces'
  | 'lotus'
  | 'book'
  | 'vishnu'
  | 'yellow';

type QuickFact = {
  icon: IconName;
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
  icon: IconName;
  label: string;
  value: string;
};

type EditorialSection = {
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
  icon: IconName;
};

const quickFacts: QuickFact[] = [
  { icon: 'planet', label: 'Planet', value: 'Guru' },
  { icon: 'ether', label: 'Element', value: 'Ether' },
  { icon: 'masculine', label: 'Nature', value: 'Masculine' },
  { icon: 'gold', label: 'Metal', value: 'Gold' },
  { icon: 'day', label: 'Day', value: 'Thursday' },
  { icon: 'direction', label: 'Direction', value: 'North-East' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Guru Mantra',
    devanagari:
      'देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्। बुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥',
    iast: 'Devānāṁ ca ṛṣīṇāṁ ca guruṁ kāñcana-sannibham, Buddhibhūtaṁ trilokeśaṁ taṁ namāmi bṛhaspatim.',
    meaning:
      'I bow to Brihaspati, the teacher of gods and sages, golden in radiance, the embodiment of intellect, the lord of the three worlds.',
  },
  {
    title: 'Beej Mantra for Guru',
    devanagari: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
    iast: 'Om Grāṁ Grīṁ Grauṁ Saḥ Gurave Namaḥ.',
    meaning: 'Salutations to Guru, the bestower of wisdom and guidance.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'book', label: 'Represents', value: 'Wisdom, Knowledge, Dharma, Expansion' },
  {
    icon: 'crown' as IconName,
    label: 'Governs',
    value: 'Education, Children, Higher learning, Finance, Religion, Counsel',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Sagittarius (Dhanu), Pisces (Meena)' },
  { icon: 'up', label: 'Exalted In', value: 'Cancer (Karka)' },
  { icon: 'down', label: 'Debilitated In', value: 'Capricorn (Makara)' },
  { icon: 'direction', label: 'Direction', value: 'North-East' },
  { icon: 'symbol', label: 'Symbol', value: 'Yellow color, Lotus, Bamboo staff, Book' },
];

const benefits = [
  'Enhances wisdom and clarity of thought',
  'Brings academic and spiritual growth',
  'Strengthens faith and dharmic conduct',
  'Improves financial stability over time',
  'Supports healthy progeny and family life',
  'Removes obstacles in higher learning',
  'Cultivates patience, generosity, and grace',
];

const connectPractices = [
  'Chant Guru mantra on Thursdays.',
  'Offer yellow flowers and bananas at a temple.',
  'Donate yellow cloth, turmeric, or chana dal.',
  'Wear Yellow Sapphire (Pukhraj) in gold after consultation.',
  'Visit a Vishnu, Dakshinamurti, or Brihaspati temple.',
  'Practice scriptural study and reverence for elders.',
];

const associations: Association[] = [
  { title: 'Sagittarius', subtitle: 'Ruling Sign', icon: 'sagittarius' },
  { title: 'Pisces', subtitle: 'Co-ruling Sign', icon: 'pisces' },
  { title: 'Thursday', subtitle: 'Sacred Day', icon: 'day' },
  { title: 'Yellow', subtitle: 'Sacred Color', icon: 'yellow' },
  { title: 'Lotus', subtitle: 'Sacred Flower', icon: 'lotus' },
  { title: 'Book', subtitle: 'Sacred Symbol', icon: 'book' },
  { title: 'Vishnu', subtitle: 'Divine Connection', icon: 'vishnu' },
  { title: 'North-East', subtitle: 'Direction', icon: 'direction' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'What Is Guru in Vedic Astrology?',
    paragraphs: [
      'Guru (गुरु, IAST Guru) is the Sanskrit name of Jupiter. The etymology renders the word with quiet beauty, gu meaning darkness and ru meaning the remover, so a guru is literally the one who dispels darkness. In the council of nine planetary deities known as the Navagraha, Guru holds the seat of wisdom, dharma, expansion, and the inner illumination that makes life intelligible. He is the great benefic of Vedic astrology, and his blessing is unmistakable when he sits well in a chart.',
      'He is also called Brihaspati (बृहस्पति, IAST Bṛhaspati), the lord of speech, and Devaguru, the teacher of the gods themselves. Each name reveals a different aspect of his role. As Brihaspati he is the master of mantra and counsel; as Devaguru he sits with the ṛṣis at the highest tier of cosmic intelligence; as Guru he is simply the one who hands the lamp to the next student in the long chain of teachers.',
      'As a karaka, the significator of life themes, Guru rules wisdom, higher learning, dharma, children, the husband in a woman\'s chart, philosophy, finance, religious practice, and the steady expansion of one\'s outer and inner life. When jyotishis read a chart for counsel, scholarship, faith, or the felt sense of being guided, they are tracing the movement of Jupiter across signs and houses. [VERIFY: classical karakatva ordering varies between Brihat Parashara Hora Shastra and Phaladeepika.]',
    ],
  },
  {
    title: "Guru's Form and Symbolism",
    paragraphs: [
      'Guru is described in classical iconography with a golden complexion, the colour of ripe grain at the moment the sun touches it. He is depicted with four arms, holding a rosary (japa-mala), a staff (daṇḍa), a water-pot (kamaṇḍalu), and a sacred book. He is shown either seated on a lotus throne or riding a chariot pulled by yellow horses, depending on the source consulted. [VERIFY: vehicle iconography varies between Skanda Purana and Brihat Samhita.]',
      'His symbolic field is light, voice, and the long thread of teaching that passes from teacher to student across generations. The colour gold is his because it is the colour of patient ripening; bamboo or sandalwood is his wood because it is straight and yields useful tools; the book is his because the spoken voice eventually settles into verses written for the next century. Each correspondence carries the same teaching, that wisdom is given, and given again.',
      'The lotus is his flower and his throne. It rises from mud yet remains untouched, which is precisely the relationship that wisdom asks of a person living in the world. Guru is therefore not a remote planet of esoteric theory, but a presence that meets daily life with patience, discernment, and steady warmth.',
      'In some classical accounts Guru is said to have a beard the colour of dawn-light, and to wear yellow silk and a sacred thread. These details, varied across the Puranas, share a common emphasis: Guru is a settled presence, not a glamorous one. The teacher-figure he portrays is unhurried, given to speech that is measured rather than performative, and devoted to the long arc of teaching that outlives a single body. The deeper point of the imagery is therefore not literal but pedagogical, asking the practitioner to see in Guru what they hope to become.',
    ],
  },
  {
    title: 'Houses and Signs Guru Rules',
    paragraphs: [
      'Guru holds two homes in the zodiac, the mutable fire sign Sagittarius (Dhanu) and the mutable water sign Pisces (Meena). Sagittarius gives him the room to teach, travel, and hold long horizons; Pisces gives him the depth to merge teaching with devotion and to sense the unseen. The mutable temperament fits a planet whose work is always to transmit, never to fix.',
      'His exaltation is in Cancer (Karka) at five degrees according to the Parashari tradition, where the warm, devotional mood of Chandra magnifies Guru\'s compassion and counsel. His debilitation is in Capricorn (Makara), the cold structural sign of Shani, where the warmth of teaching can stiffen into rigid rules. His mooltrikona, the seat of his most balanced expression, is the first ten degrees of Sagittarius. Within these dignities, even a small change of degree shifts the way the planet behaves.',
      'Among the planetary friendships, Guru counts the Sun (Surya), the Moon (Chandra), and Mars (Mangala) as friends; he holds enmity towards Mercury (Budh) and Venus (Shukra); and Saturn (Shani) sits as a neutral. His direction is the north-east, the quarter associated with Ishanya, the gentle expansion of grace at first light. These correspondences form the syntax through which a Vedic chart reads the temperament of wisdom.',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Guru',
    paragraphs: [
      'A strong Guru in a birth chart is felt as a steady warmth. The native carries a generous mind, an instinct for fair counsel, and a long view that makes setbacks feel temporary. Education is undertaken with seriousness rather than for fashion; speech is dignified; faith remains supple and humane. Such a person is often respected by elders, asked for advice by peers, and trusted by children, and the life expands in proportion to the inner ripening rather than at the cost of it.',
      'A weak or afflicted Guru can show up in several quiet ways. Some natives experience persistent learning difficulties, exam reversals, or a faith that swings between rigidity and confusion. Others struggle with weight gain, liver and pancreatic concerns, financial overreach, or a tendency to give counsel that does not land. Conflicts with teachers, religious figures, or one\'s own children may also arise, and decisions about marriage and progeny can feel weightier than the chart can carry without support.',
      'It is important to remember that no planet is read in isolation in Vedic astrology. The strength of Guru depends on his sign, house, the planets that aspect him, the dasha (planetary period) running, and the ascendant. A formally weak Guru in a benefic chart can still produce magnificent results, while a textbook-strong Guru under a poorly-timed dasha can struggle. These are general patterns offered for orientation, never personal predictions, and a full chart reading with a qualified jyotishi is the responsible next step.',
    ],
  },
  {
    title: 'Guru in Each House (1 to 12)',
    paragraphs: [
      'When Guru occupies the first house (the lagna), he gives a scholarly bearing, a generous outlook, and a face that ages gracefully into authority. In the second house he supports wealth gathered through knowledge, eloquent speech, and a pious family atmosphere. The third house carries his blessing into bold teaching, courageous expression, and gentle support from younger siblings.',
      'In the fourth house Guru gives maternal blessings, a comfortable home, a cultured environment, and gains through vehicles and property kept in service of family. The fifth produces educated children, creative wisdom, success with mantra and ritual, and a steady gift for advisory work. The sixth turns dharma into an instrument of victory, supporting careers in healing, teaching, law, and the patient clearing of debts.',
      'The seventh house brings a dharmic spouse, wise counsel within partnerships, and the possibility of foreign trade or international collaboration. An eighth-house Guru deepens the mind towards occult learning, longevity matters, and inheritances received with care. The ninth is his own house, where he produces a philosophical mind, foreign travel for higher learning, and an unmistakable feeling of being guided.',
      'The tenth house gives a respected career in teaching, judging, religion, or counsel; the eleventh confers gains through wisdom, elder friends, and ethical networks; and the twelfth, the house of liberation, supports charitable nature, foreign settlement, and the gentle dissolution of ego into something larger. [VERIFY: house effects of Jupiter vary across Parashari and KP systems.]',
    ],
  },
  {
    title: 'Guru Mahadasha and Antardasha',
    paragraphs: [
      'In the Vimshottari dasha system, the Mahadasha of Guru lasts sixteen years, the longest among the benefics. When this period activates, the chart turns its focus towards wisdom, learning, dharma, family milestones, and the careful expansion of life. Themes that have been ripening, especially around education, marriage, children, and faith, often come forward to be lived during this sixteen-year window.',
      'A favourable Guru dasha is often experienced as educational achievement, marriage at the right time, the birth of children, gains in real estate, and a deepening of spiritual practice. Long-postponed studies are completed, professional respect arrives without struggle, and friendships with elders and teachers grow stronger. The classical literature speaks of a long period of dignified expansion that strengthens the inner life along with the outer one.',
      'A challenging Guru dasha, particularly when Guru is afflicted in the chart, can present as overconfidence, philosophical confusion, weight gain, liver concerns, or financial overreach. Antardasha sub-periods within the Mahadasha further refine the result; for example, Guru within Saturn can slow effort into discipline, while Guru within Mercury can sharpen learning. These tendencies are read alongside the natal chart, transits, and the ascendant lord, and a serious dasha analysis benefits from the eye of a trained astrologer.',
      'Because the Guru Mahadasha lasts sixteen years, almost every native who lives a typical lifespan will pass through it at some point. Many traditions therefore study this period with particular care, watching the sub-period lord and the transits of slow-moving outer planets. A well-supported Guru Mahadasha can become the chapter in which a person finally feels grown into themselves; an ill-supported one can become a long lesson in the difference between expansion and overreach. Either way, the period is rarely uneventful, and the chart that begins it is usually not the chart that ends it.',
    ],
  },
  {
    title: 'Vedic Remedies for Guru',
    paragraphs: [
      'Thursday (Guruvara) is the day held sacred to Jupiter, and many traditional remedies begin there. A simple Thursday observance includes wearing a touch of yellow, a light fast, the offering of bananas, ghee, or yellow flowers at a Vishnu or Brihaspati temple, and a few minutes of mantra recitation in a quiet hour. The aim is not appeasement of a difficult planet but a respectful turning of the inner attention towards the qualities Guru governs, wisdom, dharma, and patient growth.',
      'Mantra recitation forms the spine of formal Guru remedies. The Navagraha Brihaspati stotra and the Beej mantra are shown in the Sacred Mantras section above, and they remain the most widely chanted invocations across the South Asian traditions. The Guru Gayatri is a popular addition for those drawn to longer practice. As with all japa, sincerity is weighted more heavily than haste or volume; a small daily count practised faithfully usually outlasts an ambitious vow undertaken in restlessness.',
      'Worship of Vishnu, Dakshinamurti, or Brihaspati is among the most loved adjacent practices, since these deities embody wisdom expressed as compassion. Charitable giving on Thursdays is classical and effective, particularly the donation of yellow cloth, turmeric, chana dal, ghee, books to students, or the sponsoring of a child\'s education. Yellow Sapphire (Pukhraj) is the gemstone of Guru, traditionally set in gold on the index finger of the right hand and installed on a Thursday morning after chart verification by a qualified jyotishi. A Brihaspati yantra in gold or copper, kept on a clean altar, supports the same intention. None of these remedies replace medical, legal, or financial counsel, and the responsible practice is always remedy alongside, not remedy instead of, qualified human advice.',
    ],
  },
  {
    title: 'Astrological Wisdom: Knowledge as Light',
    paragraphs: [
      'The deepest teaching of Guru is that knowledge becomes wisdom only when held with humility. Information accumulates easily; wisdom asks for the slow work of digestion, application, and the willingness to be corrected by life. The classical sages observed that scholarly minds who learn this distinction become true teachers, while those who do not become reservoirs of learning that nobody can actually drink from.',
      'The Sanskrit word guru holds the secret in plain sight. The remover of darkness is not a person external to the seeker but the inner light that is already present, waiting to be uncovered. The outer teacher, the guru of flesh and breath, points patiently towards this inner teacher and then steps back. Education in the Vedic vision is therefore liberation, not accumulation.',
      'For a modern reader, the practical translation is lifelong learning, the courage to mentor without ego, and the willingness to make career and family decisions through a dharmic lens rather than a purely financial one. A well-tended Jupiter makes a person someone whose advice is sought, not because it is cleverest, but because it is true. The student does not need a perfect teacher; the student needs a real one, and Guru therefore appears in Vedic philosophy not only as a planet but as a relationship, a felt connection between the seeker and the principle of inner light. When that connection is honoured, even modest practice grows steadily; when it is forgotten, even brilliant practice becomes oddly hollow. Guru does not promise an easy life, but he promises a life that grows in the right direction, and the discernment to recognise that direction without flattering the ego.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Guru (Jupiter) signify in Vedic astrology?',
    answer:
      'Guru signifies wisdom, dharma, expansion, higher learning, children, religion, finance, philosophy, and the husband in a woman\'s chart. He is the great benefic of Vedic astrology, the teacher of the gods, and the inner light that turns information into understanding. In a chart, his position shows where life is asked to grow with grace and where the soul finds counsel. His blessing is unmistakable when he sits well; his absence is felt as drift.',
  },
  {
    question: 'What are the signs of a strong Guru in a birth chart?',
    answer:
      'A strong Guru typically shows up as a generous mind, dignified speech, a long view of life, and an instinct for fair counsel. Common signs include scholarly success, faith without rigidity, financial steadiness, healthy children, respect from elders, and the felt sense of being guided through difficulty. Final assessment depends on the full chart, including dignity, aspects, and the running dasha.',
  },
  {
    question: 'Which gemstone is recommended for Guru?',
    answer:
      'Yellow Sapphire (Pukhraj) is the traditional gemstone of Guru. It is most often set in gold on the index finger of the right hand after a Thursday morning installation. A gemstone amplifies the planet, which is helpful only when amplification is appropriate for the individual chart, so the responsible step is a personal consultation with a qualified astrologer before purchase. The intention is steadying the planet, not forcing it.',
  },
  {
    question: 'What is the Beej mantra of Guru?',
    answer:
      'The Beej mantra of Guru is "Om Grāṁ Grīṁ Grauṁ Saḥ Gurave Namaḥ", saluting Guru as the bestower of wisdom and guidance. It is shown with full Devanagari and IAST in the Sacred Mantras section above. Traditional practice is one hundred and eight recitations on Thursdays in a quiet hour, with sincerity weighted more heavily than haste or volume. The voice itself learns to settle along with the planet.',
  },
  {
    question: 'How do Guru mahadasha and antardasha affect life?',
    answer:
      'The Guru Mahadasha in the Vimshottari system runs for sixteen years and tends to activate themes of wisdom, learning, marriage, children, dharma, and the steady expansion of life. A favourable period can bring educational achievements, the formation of family, real estate gains, and spiritual deepening. A challenging period can present as overconfidence, weight gain, liver concerns, or philosophical confusion. Antardasha sub-periods refine the result further and should be read alongside transits, the ascendant lord, and the natal placement of Jupiter.',
  },
  {
    question: 'What are the most effective remedies for a weak Guru?',
    answer:
      'Classical remedies for a weak or afflicted Guru include the Thursday observance, recitation of the Navagraha Brihaspati stotra and Beej mantra, devotional practices to Vishnu, Dakshinamurti, or Brihaspati, donation of yellow cloth, turmeric, ghee, chana dal, or books to students, and consultation about Yellow Sapphire after personal chart verification. The deeper remedy is the cultivation of dharmic conduct and lifelong learning. None of these practices replace medical, legal, or financial counsel, and they are best undertaken alongside qualified human advice.',
  },
  {
    question: 'Why is Guru considered the great benefic?',
    answer:
      'Guru is called the great benefic because his nature is to expand, protect, and ripen whatever he touches in the chart. Unlike the smaller, sweeter benefic Venus, Guru\'s blessing is moral and intellectual; he gives wisdom, faith, and the long view. Tradition therefore reserves a special status for him as the teacher who quietly steadies the entire navagraha council. When Guru\'s gaze (drishti) falls on a planet or house, it is widely held to bring shelter and grace, even within otherwise difficult conditions. [VERIFY: aspects and rulerships of Jupiter vary slightly across Parashari and Jaimini systems.]',
  },
];

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.4 + (((i * 7) % 10) / 10) * 1.4;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.62;
      return <circle key={i} cx={x} cy={y} r={r} fill="#fcd34d" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="400" cy="300" r="180" fill="none" stroke="#fcd34d" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#f59e0b" strokeWidth="0.55" strokeDasharray="3 6" opacity="0.45" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.35" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#fde68a" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.28" />
  </svg>
);

const SunraysDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const r1 = 220;
      const r2 = 260 + ((i * 7) % 10) * 4;
      const cx = 400;
      const cy = 300;
      const x1 = cx + r1 * Math.cos((angle * Math.PI) / 180);
      const y1 = cy + r1 * Math.sin((angle * Math.PI) / 180);
      const x2 = cx + r2 * Math.cos((angle * Math.PI) / 180);
      const y2 = cy + r2 * Math.sin((angle * Math.PI) / 180);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#fcd34d"
          strokeWidth="0.8"
          opacity="0.4"
        />
      );
    })}
  </svg>
);

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
    case 'ether':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3v18" />
        </svg>
      );
    case 'masculine':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="10" cy="14" r="5" />
          <path d="M14 10 21 3M16 3h5v5" strokeLinecap="round" />
        </svg>
      );
    case 'gold':
    case 'yellow':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <radialGradient id="jupiter-gold-core" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="55%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="7.5" fill="url(#jupiter-gold-core)" />
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'direction':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="7.5" />
          <path d="m12 6 3 6h-6l3-6Zm0 6v6" />
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
    case 'symbol':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 6c4 0 7 1.5 7 4-3.5 0-7-1.6-7-4Z" />
          <path d="M19 6c-4 0-7 1.5-7 4 3.5 0 7-1.6 7-4Z" />
          <path d="M12 10v9" strokeLinecap="round" />
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
    case 'sagittarius':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 20 20 4" strokeLinecap="round" />
          <path d="M14 4h6v6" strokeLinecap="round" />
          <path d="M9 13l4 4" strokeLinecap="round" />
        </svg>
      );
    case 'pisces':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 4c2 4 2 12 0 16" strokeLinecap="round" />
          <path d="M19 4c-2 4-2 12 0 16" strokeLinecap="round" />
          <path d="M5 12h14" strokeLinecap="round" />
        </svg>
      );
    case 'lotus':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 4c1.5 4 1.5 10 0 14" strokeLinecap="round" />
          <path d="M5 18c2-4 5-7 7-8 2 1 5 4 7 8" strokeLinecap="round" />
          <path d="M3 17c3-1 6-3 9-5 3 2 6 4 9 5" strokeLinecap="round" />
          <path d="M5 18c0 1 3 2 7 2s7-1 7-2" strokeLinecap="round" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 5c4 0 7 1 8 3 1-2 4-3 8-3v14c-4 0-7 1-8 3-1-2-4-3-8-3V5Z" />
          <path d="M12 8v13" />
        </svg>
      );
    case 'vishnu':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1" strokeLinecap="round" />
        </svg>
      );
  }
}

function Highlight({ children }: { children: string }) {
  return <span className="highlight-marker rounded px-1.5 py-0.5 text-slate-900">{children}</span>;
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
      className={`relative overflow-hidden border border-[#8c6e47]/45 p-5 text-[#26180d] shadow-[0_18px_36px_rgba(64,38,15,0.16),0_28px_70px_rgba(27,18,8,0.12)] sm:p-6 rounded-[26px] ${rotate} ${className}`}
      style={cardTextureStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(146,64,14,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(146,64,14,0.04)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-amber-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#d97706]',
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

function PukhrajRingIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="jupiter-pukhraj-gem" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="28%" stopColor="#fde68a" />
          <stop offset="68%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <linearGradient id="jupiter-gold-band" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="20%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="80%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <radialGradient id="jupiter-glow" cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="rgba(252,211,77,0.55)" />
          <stop offset="100%" stopColor="rgba(252,211,77,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="188" rx="98" ry="56" fill="none" stroke="url(#jupiter-gold-band)" strokeWidth="24" />
      <ellipse cx="210" cy="188" rx="72" ry="34" fill="#1f1206" opacity="0.82" />
      <ellipse cx="210" cy="182" rx="120" ry="84" fill="url(#jupiter-glow)" />
      <path
        d="M168 170c8-32 21-54 42-68 21 14 34 36 42 68-14 22-29 34-42 40-13-6-28-18-42-40Z"
        fill="url(#jupiter-gold-band)"
        opacity="0.96"
      />
      <ellipse cx="210" cy="132" rx="58" ry="56" fill="url(#jupiter-pukhraj-gem)" stroke="url(#jupiter-gold-band)" strokeWidth="8" />
      <ellipse cx="193" cy="114" rx="17" ry="13" fill="#fff7ed" opacity="0.34" />
      <circle cx="230" cy="147" r="8" fill="#92400e" opacity="0.18" />
    </svg>
  );
}

export default function JupiterPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Guru (Jupiter), The Great Benefic',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-26',
        dateModified: '2026-04-26',
        url: '/planets/jupiter',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Guru',
          'Jupiter in Vedic astrology',
          'Brihaspati',
          'Guru mantra',
          'Guru beej mantra',
          'Navagraha Brihaspati stotra',
          'Yellow Sapphire',
          'Pukhraj gemstone',
          'Jupiter remedies',
          'Guru mahadasha',
          'Devaguru',
          'great benefic',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Jupiter (Guru)', url: '/planets/jupiter' },
      ]),
      getWebPageSchema({
        name: 'Guru (Jupiter), The Great Benefic',
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
      }),
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
            className="inline-flex font-caveat text-lg text-[#b45309] transition hover:text-[#7c2d12] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fbbf24]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(252,211,77,0.46) 0%, rgba(180,83,9,0.40) 22%, rgba(38,18,5,1) 46%, rgba(15,9,5,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_18%] bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,17,6,0.96)_0%,rgba(28,17,6,0.92)_18%,rgba(28,17,6,0.66)_34%,rgba(28,17,6,0.26)_48%,rgba(28,17,6,0.08)_66%,rgba(28,17,6,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,9,5,0.36)_0%,rgba(15,9,5,0.1)_32%,rgba(15,9,5,0.62)_100%)]" />
          <div className="absolute left-[6%] top-[14%] h-48 w-48 rounded-full bg-[#fbbf24]/22 blur-3xl" />
          <div className="absolute left-[24%] top-[42%] h-32 w-32 rounded-full bg-[#d97706]/12 blur-3xl" />
          <div className="absolute inset-0 opacity-70 mix-blend-screen">
            <NebulaDoodle className="absolute inset-0" />
          </div>
          <div className="absolute inset-0 opacity-45 mix-blend-screen">
            <SunraysDoodle className="absolute left-0 top-0 h-full w-[55%]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <img src={CRYSTAL_URL} alt="" className="absolute left-[8%] top-16 h-10 w-10" />
            <img src={NAMASTE_URL} alt="" className="absolute left-[30%] top-[18rem] h-7 w-7 -rotate-12" />
            <img src={FLAME_URL} alt="" className="absolute left-[18%] top-[34rem] h-5 w-5 rotate-12 opacity-55" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[33rem] sm:min-h-[38rem] lg:min-h-[43rem] xl:min-h-[47rem]">
              <div className="relative z-10 max-w-2xl overflow-visible pb-32 pt-12 sm:pb-36 sm:pt-16 lg:max-w-[42rem] lg:pb-44 lg:pt-24">
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-amber-200/12 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#f3c9a6]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat leading-[0.88]">
                  <span className="block text-[5.8rem] text-[#fcd34d] drop-shadow-[0_0_34px_rgba(252,211,77,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                    Guru
                  </span>
                  <span className="mt-4 block text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                    The Guide and Teacher
                  </span>
                </h1>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#fef3c7] sm:text-4xl">गुरु</div>
                  <div className="font-kalam text-2xl text-[#fde68a] sm:text-3xl">(Jupiter)</div>
                </div>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] sm:text-[2.15rem]">
                  <p>Guru blesses our <Highlight>wisdom</Highlight>, <Highlight>knowledge</Highlight></p>
                  <p>and <Highlight>growth</Highlight>.</p>
                  <div className="flex items-center gap-3">
                    <p>He teaches <Highlight>dharma</Highlight> and brings <Highlight>abundance</Highlight>.</p>
                    <ScribbleLine />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#f6c06d]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#f6c06d]/80" />
                  <img src={CROWN_URL} alt="" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-amber-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#f6c06d]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#f6c06d]/65" />
                </div>
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
                        <div className="text-[#7c2d12]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#92400e] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Quick summary of Guru"
          className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-10"
        >
          <div
            className="rounded-[24px] border border-[#8c6e47]/25 px-6 py-5 shadow-[0_10px_30px_rgba(64,40,18,0.10)] sm:px-8 sm:py-6"
            style={cardTextureStyle}
          >
            <div className="mb-2 font-caveat text-2xl leading-none text-[#92400e]">In Brief</div>
            <p className="font-kalam text-[1.2rem] leading-relaxed text-[#2a190f] sm:text-[1.35rem]">
              Guru is the great benefic of Vedic astrology, the planet of wisdom, dharma, and expansion. It governs higher learning, faith, finance, and children. Devotees seek Guru&apos;s blessings for knowledge, abundance, and dharmic guidance.
            </p>
          </div>
        </aside>

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
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-14 w-14 opacity-70" />
                    <img src={CROWN_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#92400e] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#b45309] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(146,64,14,0.12)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#92400e]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#92400e]">Meaning:</span> {mantra.meaning}
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
                      Guru in Our Life
                    </h3>
                    <div className="text-[#2a1a10]/70">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#92400e]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#7c2d12]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Guru Mantra
                    </h3>
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#b45309]">{iconSvg('benefit', 'h-5 w-5')}</div>
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
                    How to Connect with Guru
                  </h3>
                  <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#92400e]">{iconSvg('connect', 'h-6 w-6')}</div>
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
                    Gemstone: Yellow Sapphire
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#92400e]">Pukhraj</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <SunraysDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#d97706]/85 bg-[#1f1206] p-1.5 shadow-[0_14px_28px_rgba(0,0,0,0.24)]">
                    <PukhrajRingIllustration />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Yellow Sapphire is traditionally prescribed to strengthen wisdom, prosperity, and dharmic alignment, but only after chart-based verification with a qualified jyotishi.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <SunraysDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#b45309]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
                      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#7c2d12] sm:text-[2.4rem]">
                  &ldquo;I am wise, I am abundant, I welcome growth and grace into every part of my life.&rdquo;
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports learning that ripens, faith that warms, and prosperity held with discernment.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-[#1a0d05]/85 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#fde68a]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#fef3c7] sm:text-4xl">
                      Wisdom is the lamp
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      that lights all paths.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img src={YANTRA_URL} alt="Brihaspati yantra" className="h-24 w-24 opacity-90" style={{ filter: 'sepia(1) saturate(2.4) hue-rotate(-12deg) brightness(1.1)' }} />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#fef3c7] sm:text-4xl">ॐ बृं बृहस्पतये नमः॥</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Om Bṛṁ Bṛhaspataye Namaḥ.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-center font-caveat text-3xl text-[#f6c06d] sm:text-4xl">
                  Guru&apos;s Associations
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {associations.map((association) => (
                    <div
                      key={association.title}
                      className="rounded-2xl border border-[#7c2d12] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#92400e] bg-[#2a1412]/75 text-[#fbbf24] shadow-[0_0_24px_rgba(251,191,36,0.16)]">
                        {iconSvg(association.icon, 'h-7 w-7')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#fef3c7]">{association.title}</div>
                      <div className="mt-1 text-sm leading-snug text-[#fde68a]/80">{association.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
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

          <img src={SACRED_GEOMETRY_URL} alt="" className="pointer-events-none absolute right-6 top-24 hidden h-24 w-24 opacity-10 lg:block" />
          <img src={SEAL_MARS_URL} alt="" className="pointer-events-none absolute left-8 top-[34rem] hidden h-14 w-14 opacity-12 lg:block" style={{ filter: 'sepia(1) saturate(2) hue-rotate(-10deg)' }} />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#92400e] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#fbbf24' } as CSSProperties)
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
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#92400e]">Element:</span> Ether (Akasha)</div>
                    <div><span className="font-semibold text-[#92400e]">Day:</span> Thursday (Guruvara)</div>
                    <div><span className="font-semibold text-[#92400e]">Direction:</span> North-East (Ishanya)</div>
                    <div><span className="font-semibold text-[#92400e]">Metal:</span> Gold (Suvarṇa)</div>
                    <div><span className="font-semibold text-[#92400e]">Gemstone:</span> Yellow Sapphire (Pukhraj)</div>
                    <div><span className="font-semibold text-[#92400e]">Mahadasha:</span> 16 years</div>
                    <div><span className="font-semibold text-[#92400e]">Sacred Color:</span> Yellow</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Guru&apos;s name literally means &ldquo;remover of darkness&rdquo;, from gu (darkness) and ru (remover).</li>
                    <li>Guru is exalted in Cancer at five degrees, where compassion magnifies his counsel.</li>
                    <li>Yellow Sapphire is traditionally installed in gold on a Thursday morning after chart verification.</li>
                    <li>Brihaspati is the teacher of the gods themselves, the highest Devaguru of the Vedic tradition.</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friends and Enemies</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <table className="mt-4 w-full border-collapse font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <caption className="sr-only">Planetary relationships of Guru in Vedic astrology</caption>
                    <tbody>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#92400e]">Friends</th>
                        <td className="py-1 align-top">Sun (Surya), Moon (Chandra), Mars (Mangala)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#92400e]">Enemies</th>
                        <td className="py-1 align-top">Mercury (Budh), Venus (Shukra)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#92400e]">Neutral</th>
                        <td className="py-1 align-top">Saturn (Shani)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 font-kalam text-lg italic leading-relaxed text-[#2a190f]/80">
                    Friendships shape how planets cooperate or compete in the chart.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Strong Guru</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Generous mind that holds the long view</li>
                    <li>Dignified speech that lands as counsel</li>
                    <li>Educational success without arrogance</li>
                    <li>Faith that remains supple and humane</li>
                    <li>Respect from elders and trust from children</li>
                    <li>Financial steadiness held with discernment</li>
                    <li>Decisions made through a dharmic lens</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Weakened Guru</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Persistent learning difficulties or exam reversals</li>
                    <li>Faith swinging between rigidity and confusion</li>
                    <li>Overconfidence followed by philosophical doubt</li>
                    <li>Weight gain, liver, or pancreatic concerns</li>
                    <li>Financial overreach or imprudent generosity</li>
                    <li>Conflicts with teachers, gurus, or one&apos;s own children</li>
                  </ul>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Always best to verify with a full chart reading by a qualified jyotishi.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Guru in Houses at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#92400e]">1st:</span> Scholarly bearing, generous outlook</div>
                    <div><span className="font-semibold text-[#92400e]">4th:</span> Maternal blessings, cultured home</div>
                    <div><span className="font-semibold text-[#92400e]">5th:</span> Educated children, mantra success</div>
                    <div><span className="font-semibold text-[#92400e]">7th:</span> Dharmic spouse, foreign trade</div>
                    <div><span className="font-semibold text-[#92400e]">9th:</span> Own house, philosophical mind, dharmic life</div>
                    <div><span className="font-semibold text-[#92400e]">10th:</span> Respected career in teaching or counsel</div>
                    <div><span className="font-semibold text-[#92400e]">11th:</span> Gains through wisdom, elder friendships</div>
                  </div>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Read as patterns, never as predictions.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mahadasha at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#92400e]">Period:</span> 16 years (Vimshottari, longest among benefics)</div>
                    <div><span className="font-semibold text-[#92400e]">Themes:</span> Wisdom, learning, marriage, children, dharma, expansion</div>
                    <div><span className="font-semibold text-[#92400e]">Favourable:</span> Educational milestones, marriage, childbirth, real estate gain</div>
                    <div><span className="font-semibold text-[#92400e]">Challenging:</span> Overconfidence, liver issues, philosophical confusion</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Antardasha sub-periods refine the year-by-year shape.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Thursday Practice</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Wear a touch of yellow on Thursdays</li>
                    <li>Light fast and visit a Vishnu or Brihaspati temple</li>
                    <li>Offer bananas, ghee, or yellow flowers</li>
                    <li>Donate turmeric, chana dal, or sponsor a student</li>
                    <li>Read scripture or sit briefly with a respected teacher</li>
                    <li>Wear Yellow Sapphire after qualified consultation</li>
                    <li>Recite the Beej mantra 108 times in a quiet hour</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#92400e]/85">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    Wisdom is the lamp that lights all paths.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    A Guru teaching for a life that grows in the right direction.
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#1a0d05]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.32)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#fef3c7]">Closing Thought</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A small reminder for the lifelong student.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-kalam text-xl leading-relaxed text-white/85">
                    When the lamp is bright, the dark room remembers it was always a room. Knowledge does not create the truth; it only reveals what was already there.
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Guru&apos;s quiet blessing: may my learning ripen into wisdom.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#92400e] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Guru, Jupiter strength, mahadasha, gemstone choice, and how Jupiter energy works in a Vedic chart.
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
                        <div className="mt-1 text-[#92400e]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <h3 className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</h3>
                      </div>
                      <div className="text-[#92400e]">
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
