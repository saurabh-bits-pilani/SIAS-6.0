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

const VENUS_R2_BASE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_URL = `${VENUS_R2_BASE}/Pillar/Planets/Venus/hero-shukra.webp`;
const CRYSTAL_URL = `${VENUS_R2_BASE}/Pillar/Planets/Shared/doodle-crystal.svg`;
const NAMASTE_URL = `${VENUS_R2_BASE}/Pillar/Planets/Shared/doodle-namaste.svg`;
const CROWN_URL = `${VENUS_R2_BASE}/Pillar/Planets/Shared/icon-crown.svg`;
const FLAME_URL = `${VENUS_R2_BASE}/Pillar/Planets/Shared/icon-flame.svg`;
const DIYA_URL = `${VENUS_R2_BASE}/Pillar/Hub/Planets/Shared/diya.svg`;
const FEATHER_URL = `${VENUS_R2_BASE}/Pillar/Hub/Planets/Shared/feather-doodle.svg`;
const SACRED_GEOMETRY_URL = `${VENUS_R2_BASE}/Pillar/Hub/Planets/Shared/sacred-geometry.svg`;
const SEAL_MARS_URL = `${VENUS_R2_BASE}/Pillar/Planets/Mars/seal-mars.svg`;
const YANTRA_URL = `${VENUS_R2_BASE}/Pillar/Planets/Mars/yantra-mars-detailed.svg`;

const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE = 'Shukra (Venus), The Lord of Love and Refinement | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Shukra (Venus), the planet of love, beauty, art, and refinement. Mantras, gemstone (Diamond), remedies, and Vedic traditions to awaken Shukra's blessings.";
const PAGE_KEYWORDS =
  'shukra, venus in vedic astrology, bhargava, daityaguru, shukra mantra, venus remedies, diamond gemstone, heera, white sapphire, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/venus`;

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
  | 'water'
  | 'feminine'
  | 'silver'
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
  | 'taurus'
  | 'libra'
  | 'lotus'
  | 'veena'
  | 'lakshmi'
  | 'white';

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
  { icon: 'planet', label: 'Planet', value: 'Shukra' },
  { icon: 'water', label: 'Element', value: 'Water' },
  { icon: 'feminine', label: 'Nature', value: 'Feminine' },
  { icon: 'silver', label: 'Metal', value: 'Silver' },
  { icon: 'day', label: 'Day', value: 'Friday' },
  { icon: 'direction', label: 'Direction', value: 'South-East' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Shukra Mantra',
    devanagari:
      'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्। सर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥',
    iast: 'Himakunda-mṛṇālābhaṁ daityānāṁ paramaṁ gurum, Sarvaśāstra-pravaktāraṁ bhārgavaṁ praṇamāmyaham.',
    meaning:
      'I bow to Bhargava (Shukra), white as snow, jasmine, and lotus stem, the supreme teacher of the asuras and the expounder of all sacred sciences.',
  },
  {
    title: 'Beej Mantra for Shukra',
    devanagari: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
    iast: 'Om Drāṁ Drīṁ Drauṁ Saḥ Śukrāya Namaḥ.',
    meaning: 'Salutations to Shukra, the bestower of love, beauty, and refined intelligence.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'lotus', label: 'Represents', value: 'Love, Beauty, Harmony, Art, Refinement, Relationships' },
  {
    icon: 'symbol',
    label: 'Governs',
    value: 'Marriage, Romance, Vehicles, Music, Dance, Poetry, Hospitality, Diplomacy',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Taurus (Vrishabha), Libra (Tula)' },
  { icon: 'up', label: 'Exalted In', value: 'Pisces (Meena)' },
  { icon: 'down', label: 'Debilitated In', value: 'Virgo (Kanya)' },
  { icon: 'direction', label: 'Direction', value: 'South-East' },
  { icon: 'gem', label: 'Symbol', value: 'White color, Lotus, Veena, Diamond' },
];

const benefits = [
  'Strengthens love and marital harmony',
  'Enhances charisma and personal magnetism',
  'Brings success in arts, music, and creative fields',
  'Attracts comfort, luxury, and refined living',
  'Supports reproductive and hormonal health',
  'Cultivates aesthetic sensibility and refined taste',
  'Improves diplomatic and negotiation skills',
];

const connectPractices = [
  'Chant Shukra mantra on Fridays.',
  'Offer white flowers, sweet rice, and curd.',
  'Donate white cloth, sugar, ghee, or perfume.',
  'Wear Diamond (Heera) or White Sapphire in silver.',
  'Learn or appreciate music, dance, or visual arts.',
  'Practice kindness, generosity, and beauty in daily life.',
];

const associations: Association[] = [
  { title: 'Taurus', subtitle: 'Ruling Sign', icon: 'taurus' },
  { title: 'Libra', subtitle: 'Co-ruling Sign', icon: 'libra' },
  { title: 'Friday', subtitle: 'Sacred Day', icon: 'day' },
  { title: 'White', subtitle: 'Sacred Color', icon: 'white' },
  { title: 'Lotus', subtitle: 'Sacred Flower', icon: 'lotus' },
  { title: 'Veena', subtitle: 'Sacred Instrument', icon: 'veena' },
  { title: 'Lakshmi', subtitle: 'Divine Connection', icon: 'lakshmi' },
  { title: 'South-East', subtitle: 'Direction', icon: 'direction' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'What Is Shukra in Vedic Astrology?',
    paragraphs: [
      'Shukra (शुक्र, IAST Śukra) is the Sanskrit name of Venus. The word translates literally as "the bright one" or "the radiant essence", referring to the luminous quality of vital energy from which beauty arises. In the council of nine planetary deities known as the Navagraha, Shukra holds the seat of love, beauty, art, refined taste, and the gentler abundance that softens the world. Together with Jupiter he is one of the two great benefics of Vedic astrology; where Jupiter ripens wisdom, Shukra ripens grace.',
      'He is also called Bhargava (भार्गव), the descendant of the great seer Bhṛgu, and Daityaguru, the teacher of the asuras, the one celestial counsel he could not refuse. As Kavi, the wise poet, he is said to hold the secret of Mṛta-Sañjīvanī, the verse that revives life. Each of these names carries a different shade. As Bhargava he is the inheritor of refined lineage; as Daityaguru he is the teacher who counsels even those the gods will not counsel; as Kavi he is the artist who hears the world as music.',
      'As a karaka, the significator of life themes, Shukra rules marriage, romance, the wife in a man\'s chart, vehicles, luxury, music, dance, poetry, fashion, hospitality, the reproductive system, and the diplomatic art of harmonious negotiation. When jyotishis read a chart for love, beauty, comfort, or refined creativity, they are tracing the movement of Venus across signs and houses. His blessing is felt as a softening, a sense that life has been made gentler and more beautiful for one\'s presence in it.',
    ],
  },
  {
    title: "Shukra's Form and Symbolism",
    paragraphs: [
      'Shukra is described in classical iconography with a bright white complexion, the colour of fresh jasmine, snow, and the lotus stem. He is depicted with four arms, holding a rosary (japa-mala), a lotus, a gold staff (daṇḍa), and a water-pot (kamaṇḍalu). He is shown either riding a white horse or seated in a chariot drawn by green or eight horses, depending on the source consulted. [VERIFY: vehicle iconography varies between Skanda Purana and Brihat Samhita.]',
      'His symbolic field is fertility, beauty, water, and the refinement that softens raw form into art. The lotus is his flower because it rises from water with grace; the veena is his instrument because it carries melody as a vessel of feeling; the diamond is his gem because it is clear, hard, and refracts light into rainbows. Silver is his metal because it is cool, shining, and keeps its lustre under the moon. Each correspondence asks the practitioner to look at the world a little more tenderly, to attend to colour, sound, and texture as expressions of the divine.',
      'White flowers, sweet fragrances, music, and the company of women are his favoured offerings. The teaching of the imagery is that beauty is not opposed to spirit but is one of its most direct languages. Where Mars inscribes itself in conviction and Saturn in patience, Shukra inscribes itself in delight, and a chart with a graceful Venus knows how to soften without weakening, and how to enjoy without grasping.',
    ],
  },
  {
    title: 'Houses and Signs Shukra Rules',
    paragraphs: [
      'Shukra holds two homes in the zodiac, the fixed earth sign Taurus (Vrishabha) and the cardinal air sign Libra (Tula). Taurus gives him the room to enjoy, to settle into the sensuous textures of life; Libra gives him the room to balance, to find the symmetry between two beautiful things and choose the harmony of both rather than the dominance of one. Taurus is where Shukra savours and Libra is where Shukra negotiates, and a chart with Venus well-placed in either sign tends to carry an unmistakable elegance.',
      'His exaltation is in Pisces (Meena) at twenty-seven degrees according to the Parashari tradition, where Jupiter\'s expansive devotion lifts Venus into an almost spiritual love. His debilitation is in Virgo (Kanya), the analytical sign of Mercury, where Venus\'s softness is weighed against detail and can struggle to feel adequate. His mooltrikona, the seat of his most balanced expression, is the first fifteen degrees of Libra. Within these dignities, even small differences in degree can change the tone of love and longing in a chart.',
      'Among the planetary friendships, Shukra counts Mercury (Budh) and Saturn (Shani) as friends; he holds enmity towards the Sun (Surya) and the Moon (Chandra); and Mars (Mangala) and Jupiter (Guru) sit as neutrals. His direction is the south-east, the quarter associated with Agneya, where the gentle warmth of dawn meets the cool moisture of night. These correspondences form the syntax through which a Vedic chart reads the temperament of love and refinement.',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Shukra',
    paragraphs: [
      'A strong Shukra in a birth chart is felt as a quiet magnetism. The native carries an air of refinement that does not announce itself, a face that is pleasing without demanding attention, and an instinct for choosing the right word, the right colour, the right gesture. Such a person often does well in fields that ask for grace under elegance: the arts, music, design, fashion, hospitality, diplomacy, perfumery, jewellery, and the careful stewardship of beautiful spaces. The temperament is sweet without being saccharine, and tasteful without being snobbish.',
      'A weak or afflicted Shukra can show up in several quiet ways. Some natives experience persistent relationship struggles, romantic disappointments, or a marriage that arrives late or unsteadily. Others struggle with reproductive concerns, hormonal imbalance, or a tendency to overspend on luxury that does not deliver the contentment it promised. A weak Venus may also produce difficulty appreciating beauty in the everyday, a kind of aesthetic numbness that cannot find pleasure in the small graces. Sometimes the same affliction shows as the opposite, an overindulgence that consumes without satisfying.',
      'It is important to remember that no planet is read in isolation in Vedic astrology. The strength of Shukra depends on his sign, house, the planets that aspect him, his proximity to the Sun (combustion is a particular concern for Venus), the dasha (planetary period) running, and the ascendant. A formally weak Shukra in a benefic chart can still produce magnificent results, while a textbook-strong Shukra under a poorly-timed dasha can struggle. These are general patterns offered for orientation, never personal predictions, and a full chart reading with a qualified jyotishi is the responsible next step.',
    ],
  },
  {
    title: 'Shukra in Each House (1 to 12)',
    paragraphs: [
      'When Shukra occupies the first house (the lagna), he gives a charming personality, attractive features, a pleasant voice, and a refined sense of self-presentation. In the second house he supports wealth gathered through art or beauty, sweet and persuasive speech, and a family atmosphere of good taste. The third house carries his blessing into artistic siblings, courageous expression in romance, and a creative communication style that wins others without force.',
      'In the fourth house Shukra gives a comfortable home, fine vehicles, maternal blessings, and surroundings that visibly carry the native\'s aesthetic. The fifth produces love affairs, artistic children, creative intelligence, and a steady gift for romance and the performing arts. The sixth turns Venus\'s softness into competition through charm, supporting careers in hospitality, diplomacy, and beauty services, with the caveat that debt may accumulate through luxury if discipline is loose.',
      'The seventh house brings a charming spouse, business in beauty or arts, and partnership blessings felt as a quiet daily harmony rather than a dramatic event. An eighth-house Shukra tends towards hidden romances, longevity through pleasure, and an occult thread within artistry that gives the work a sacred undertone. The ninth produces a dharmic spouse, foreign love stories, and a philosophical aesthetic that prefers truth held beautifully to truth held harshly.',
      'The tenth house gives a career in arts, beauty, fashion, luxury, hospitality, or diplomacy, often with public visibility. The eleventh confers gains through women, artistic networks, and refined friendships. The twelfth, the house of liberation, supports foreign romance, hidden luxury, spiritual love, and a deepening of intimacy that is often more inward than outward. [VERIFY: house effects of Venus vary across Parashari and KP systems.]',
    ],
  },
  {
    title: 'Shukra Mahadasha and Antardasha',
    paragraphs: [
      'In the Vimshottari dasha system, the Mahadasha of Shukra lasts twenty years, the longest among the planets. When this period activates, the chart turns its focus towards love, marriage, artistic expression, financial abundance, and the steady refinement of life. Themes that have been ripening, especially around relationship, comfort, and creative work, often come forward to be lived through this twenty-year window. For many natives, the Shukra Mahadasha overlaps with their most visible chapters of marriage, family, and material settling.',
      'A favourable Shukra dasha is often experienced as the right marriage at the right time, the birth of children, gains through vehicles or real estate, artistic recognition, and a financial comfort that is felt without ostentation. Long-postponed creative projects find their audience, partnerships deepen rather than strain, and the home itself becomes more beautiful as the years move. The classical literature speaks of a long period of dignified pleasure that supports both inner contentment and outer grace.',
      'A challenging Shukra dasha, particularly when Shukra is afflicted in the chart, can present as relationship conflict, reproductive concerns, excess indulgence, or financial imbalance through luxury. Antardasha sub-periods within the Mahadasha further refine the result; for example, Shukra within Mercury can sharpen artistic communication, while Shukra within Saturn can ask for restraint in pleasure. These tendencies are read alongside the natal chart, transits, and the ascendant lord, and a serious dasha analysis benefits from the eye of a trained astrologer who can weigh dignity, combustion, and aspect together.',
    ],
  },
  {
    title: 'Vedic Remedies for Shukra',
    paragraphs: [
      'Friday (Shukravara) is the day held sacred to Venus, and many traditional remedies begin there. A simple Friday observance includes wearing a touch of white, a light fast, the offering of sweet rice (kheer), curd, sugar, or perfume at a Lakshmi or Saraswati temple, and a few minutes of mantra recitation in a quiet hour. The aim is not appeasement of a difficult planet but a respectful turning of the inner attention towards the qualities Shukra governs, love, beauty, harmony, and the cultivation of refined taste.',
      'Mantra recitation forms the spine of formal Shukra remedies. The Navagraha Shukra stotra and the Beej mantra are shown in the Sacred Mantras section above, and they remain the most widely chanted invocations across the South Asian traditions. Mantras dedicated to Lakshmi, Saraswati, and Durga are popular adjacent practices, since the great feminine principle in Vedic philosophy is closely held with Venus. As with all japa, sincerity is weighted more heavily than haste or volume, and a small daily count practised faithfully usually outlasts an ambitious vow undertaken in restlessness.',
      'Charitable giving on Fridays is classical and effective, particularly the donation of white sweets, sugar, ghee, perfume, silver items, or the sponsoring of a wedding. Diamond (Heera) is the gemstone of Venus, traditionally set in silver, white gold, or platinum on the ring finger of the right hand and installed on a Friday morning after chart verification by a qualified jyotishi. White Sapphire (Safed Pukhraj) and Opal serve as more affordable alternatives with similar tonal effects. A Shukra yantra in silver, kept on a clean altar, supports the same intention. Lifestyle remedies include cultivating beauty in one\'s surroundings, learning an art or musical practice, honouring women, and tending to cleanliness and grace in everyday speech. None of these remedies replace medical, legal, or financial counsel, and the responsible practice is always remedy alongside, not remedy instead of, qualified human advice.',
    ],
  },
  {
    title: 'Astrological Wisdom: Beauty as Devotion',
    paragraphs: [
      'The deepest teaching of Shukra is that beauty, when refined, is a form of devotion. Information about love can be accumulated quickly; the lived practice of love asks for the slow work of attention, gentleness, and the willingness to be moved by another person\'s interior life. The classical sages observed that natures inclined to beauty become true artists when they learn to let the beauty serve something larger than themselves, while those who do not become collectors of pleasing things who never quite arrive at peace.',
      'Marriage and partnership in the Vedic vision are sadhana, a daily spiritual practice, not a transaction or a status. The vow of two people held together with affection and integrity is itself a teaching about how the soul moves towards the divine. Beauty is therefore not vanity but a doorway, a visible sign of an invisible grace; the lotus that grows from mud is a Venus image, because it says that the world is exactly the right place for the soul to learn to love.',
      'For a modern reader, the practical translation is cultivating taste without snobbery, loving without possessiveness, and creating beauty as service rather than as performance. A well-tended Venus makes a person someone whose presence brings ease into a room, who softens what was hard, who notices what others overlook. Shukra does not promise a life without longing, but he promises a life made gentler by love, and the discernment to recognise true love when it is finally offered.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Shukra (Venus) signify in Vedic astrology?',
    answer:
      'Shukra signifies love, beauty, art, marriage, romance, refined taste, vehicles, luxury, music, poetry, the wife in a man\'s chart, the reproductive system, and the diplomatic art of harmonious negotiation. He is one of the two great benefics of Vedic astrology, alongside Jupiter, and his blessing is felt as a softening of life. In a chart, his position shows where the soul finds delight, where love arrives, and where beauty becomes a teacher.',
  },
  {
    question: 'What are the signs of a strong Shukra in a birth chart?',
    answer:
      'A strong Shukra typically shows up as quiet magnetism rather than loud charm. Common signs include refined features, pleasant voice, success in arts, music, design, or hospitality, harmonious relationships, financial comfort that does not flaunt itself, and an instinct for choosing the right word, colour, or gesture. The native carries grace in difficult moments and finds it easy to soften what is hard. Final assessment depends on the full chart, including dignity, combustion, aspects, and the running dasha.',
  },
  {
    question: 'Which gemstone is recommended for Shukra?',
    answer:
      'Diamond (Heera) is the traditional gemstone of Venus. It is most often set in silver, white gold, or platinum on the ring finger of the right hand after a Friday morning installation. White Sapphire (Safed Pukhraj) and Opal serve as more affordable alternatives with similar tonal effects. A gemstone amplifies the planet, which is helpful only when amplification is appropriate for the individual chart, so the responsible step is a personal consultation with a qualified astrologer before purchase.',
  },
  {
    question: 'What is the Beej mantra of Shukra?',
    answer:
      'The Beej mantra of Shukra is "Om Drāṁ Drīṁ Drauṁ Saḥ Śukrāya Namaḥ", saluting Venus as the bestower of love, beauty, and refined intelligence. It is shown with full Devanagari and IAST in the Sacred Mantras section above. Traditional practice is one hundred and eight recitations on Fridays in a quiet hour, with sincerity weighted more heavily than haste or volume. The voice itself learns to settle along with the planet.',
  },
  {
    question: 'How do Shukra mahadasha and antardasha affect life?',
    answer:
      'The Shukra Mahadasha in the Vimshottari system runs for twenty years, the longest among the planets, and tends to activate themes of love, marriage, artistic expression, financial comfort, and the steady refinement of life. A favourable period can bring marriage at the right time, the birth of children, gains in vehicles or real estate, and artistic recognition. A challenging period can present as relationship conflict, reproductive concerns, or financial imbalance through luxury. Antardasha sub-periods refine the result further and should be read alongside transits, the ascendant lord, and the natal placement of Venus.',
  },
  {
    question: 'What are the most effective remedies for a weak Shukra?',
    answer:
      'Classical remedies for a weak or afflicted Shukra include the Friday observance, recitation of the Navagraha Shukra stotra and Beej mantra, devotional practices to Lakshmi, Saraswati, or Durga, donation of white sweets, sugar, ghee, perfume, silver items, or the sponsoring of a wedding, and consultation about Diamond, White Sapphire, or Opal after personal chart verification. The deeper remedy is the cultivation of beauty as service, gentleness in speech, and the honouring of women in one\'s life. None of these practices replace medical, legal, or financial counsel, and they are best undertaken alongside qualified human advice.',
  },
  {
    question: 'How does Shukra influence marriage and relationships?',
    answer:
      'Shukra is the planet most directly associated with marriage and romance in Vedic astrology, alongside the seventh house and its lord. A well-placed Venus tends to bring partnership at the right time, with affection, harmony, and a felt sense of being seen by the spouse. An afflicted Venus can show as delayed marriage, partner-related disappointment, or relationships that do not ripen into stable companionship. Shukra is also studied closely in compatibility analysis, particularly for the karaka of the spouse and the seventh-from-Venus in detailed traditions. [VERIFY: methods of marital timing and synastry vary across Parashari, Jaimini, and KP systems.]',
  },
];

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.4 + (((i * 7) % 10) / 10) * 1.4;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.62;
      return <circle key={i} cx={x} cy={y} r={r} fill="#f9a8d4" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="400" cy="300" r="180" fill="none" stroke="#f9a8d4" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#ec4899" strokeWidth="0.55" strokeDasharray="3 6" opacity="0.45" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.35" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#fbcfe8" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.28" />
  </svg>
);

const PetalDoodle = ({ className = '' }: { className?: string }) => (
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
          stroke="#f9a8d4"
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
    case 'water':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3c4 5.5 6 9.2 6 12a6 6 0 1 1-12 0c0-2.8 2-6.5 6-12Z" />
        </svg>
      );
    case 'feminine':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="9" r="5" />
          <path d="M12 14v8M9 19h6" strokeLinecap="round" />
        </svg>
      );
    case 'silver':
    case 'white':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <radialGradient id="venus-silver-core" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="55%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#9d174d" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="7.5" fill="url(#venus-silver-core)" />
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
          <circle cx="12" cy="9" r="5" />
          <path d="M12 14v8M9 19h6" strokeLinecap="round" />
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
    case 'taurus':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="14" r="6" />
          <path d="M5 5c2 1 4 3 6 4M19 5c-2 1-4 3-6 4" strokeLinecap="round" />
        </svg>
      );
    case 'libra':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M3 18h18M3 14h18" strokeLinecap="round" />
          <path d="M8 14c0-3 1.8-6 4-6s4 3 4 6" strokeLinecap="round" />
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
    case 'veena':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <circle cx="7" cy="17" r="4" />
          <path d="M9 14 19 4" strokeLinecap="round" />
          <path d="M16 4h4v4" strokeLinecap="round" />
          <path d="M11 12h2M13 10h2" strokeLinecap="round" />
        </svg>
      );
    case 'lakshmi':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 4c2 3 2 5 0 8-2-3-2-5 0-8Z" />
          <path d="M5 13c3 0 5 1 7 2 2-1 4-2 7-2" strokeLinecap="round" />
          <path d="M6 18c2-2 4-3 6-3s4 1 6 3" strokeLinecap="round" />
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(157,23,77,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(157,23,77,0.04)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-pink-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#db2777]',
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

function DiamondRingIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="venus-diamond-gem" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="28%" stopColor="#fdf2f8" />
          <stop offset="68%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
        <linearGradient id="venus-silver-band" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="20%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="80%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="venus-glow" cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="rgba(249,168,212,0.55)" />
          <stop offset="100%" stopColor="rgba(249,168,212,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="188" rx="98" ry="56" fill="none" stroke="url(#venus-silver-band)" strokeWidth="24" />
      <ellipse cx="210" cy="188" rx="72" ry="34" fill="#1a0a14" opacity="0.82" />
      <ellipse cx="210" cy="182" rx="120" ry="84" fill="url(#venus-glow)" />
      <path
        d="M168 170c8-32 21-54 42-68 21 14 34 36 42 68-14 22-29 34-42 40-13-6-28-18-42-40Z"
        fill="url(#venus-silver-band)"
        opacity="0.96"
      />
      <ellipse cx="210" cy="132" rx="58" ry="56" fill="url(#venus-diamond-gem)" stroke="url(#venus-silver-band)" strokeWidth="8" />
      <ellipse cx="193" cy="114" rx="17" ry="13" fill="#ffffff" opacity="0.55" />
      <circle cx="230" cy="147" r="8" fill="#9d174d" opacity="0.18" />
    </svg>
  );
}

export default function VenusPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Shukra (Venus), The Lord of Love and Refinement',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-27',
        dateModified: '2026-04-27',
        url: '/planets/venus',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Shukra',
          'Venus in Vedic astrology',
          'Bhargava',
          'Daityaguru',
          'Shukra mantra',
          'Shukra beej mantra',
          'Navagraha Shukra stotra',
          'Diamond gemstone',
          'Heera',
          'White Sapphire',
          'Venus remedies',
          'Shukra mahadasha',
          'love and refinement',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Venus (Shukra)', url: '/planets/venus' },
      ]),
      getWebPageSchema({
        name: 'Shukra (Venus), The Lord of Love and Refinement',
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
            className="inline-flex font-caveat text-lg text-[#be185d] transition hover:text-[#831843] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f472b6]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(249,168,212,0.46) 0%, rgba(190,24,93,0.40) 22%, rgba(38,8,22,1) 46%, rgba(15,5,12,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_18%] bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,8,22,0.96)_0%,rgba(28,8,22,0.92)_18%,rgba(28,8,22,0.66)_34%,rgba(28,8,22,0.26)_48%,rgba(28,8,22,0.08)_66%,rgba(28,8,22,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,5,12,0.36)_0%,rgba(15,5,12,0.1)_32%,rgba(15,5,12,0.62)_100%)]" />
          <div className="absolute left-[6%] top-[14%] h-48 w-48 rounded-full bg-[#f472b6]/22 blur-3xl" />
          <div className="absolute left-[24%] top-[42%] h-32 w-32 rounded-full bg-[#db2777]/12 blur-3xl" />
          <div className="absolute inset-0 opacity-70 mix-blend-screen">
            <NebulaDoodle className="absolute inset-0" />
          </div>
          <div className="absolute inset-0 opacity-45 mix-blend-screen">
            <PetalDoodle className="absolute left-0 top-0 h-full w-[55%]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <img src={CRYSTAL_URL} alt="" className="absolute left-[8%] top-16 h-10 w-10" />
            <img src={NAMASTE_URL} alt="" className="absolute left-[30%] top-[18rem] h-7 w-7 -rotate-12" />
            <img src={FLAME_URL} alt="" className="absolute left-[18%] top-[34rem] h-5 w-5 rotate-12 opacity-55" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[33rem] sm:min-h-[38rem] lg:min-h-[43rem] xl:min-h-[47rem]">
              <div className="relative z-10 max-w-2xl overflow-visible pb-32 pt-12 sm:pb-36 sm:pt-16 lg:max-w-[42rem] lg:pb-44 lg:pt-24">
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-pink-200/12 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#fbcfe8]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat leading-[0.88]">
                  <span className="block text-[5.8rem] text-[#fbcfe8] drop-shadow-[0_0_34px_rgba(249,168,212,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                    Shukra
                  </span>
                  <span className="mt-4 block text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                    The Lord of Beauty and Refinement
                  </span>
                </h1>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#fdf2f8] sm:text-4xl">शुक्र</div>
                  <div className="font-kalam text-2xl text-[#fbcfe8] sm:text-3xl">(Venus)</div>
                </div>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] sm:text-[2.15rem]">
                  <p>Shukra blesses our <Highlight>love</Highlight>, <Highlight>beauty</Highlight></p>
                  <p>and <Highlight>harmony</Highlight>.</p>
                  <div className="flex items-center gap-3">
                    <p>He teaches <Highlight>art</Highlight> and brings <Highlight>refinement</Highlight>.</p>
                    <ScribbleLine />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#f9a8d4]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#f9a8d4]/80" />
                  <img src={CROWN_URL} alt="" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-pink-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#f9a8d4]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#f9a8d4]/65" />
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
                        <div className="text-[#831843]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#9d174d] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Quick summary of Shukra"
          className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-10"
        >
          <div
            className="rounded-[24px] border border-[#8c6e47]/25 px-6 py-5 shadow-[0_10px_30px_rgba(64,40,18,0.10)] sm:px-8 sm:py-6"
            style={cardTextureStyle}
          >
            <div className="mb-2 font-caveat text-2xl leading-none text-[#9d174d]">In Brief</div>
            <p className="font-kalam text-[1.2rem] leading-relaxed text-[#2a190f] sm:text-[1.35rem]">
              Shukra is the Vedic significator of love, beauty, art, and refinement. It governs marriage, luxury, creativity, and relationships. Devotees seek Shukra&apos;s blessings for harmonious partnerships, artistic talent, and refined living.
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
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-14 w-14 opacity-70" />
                    <img src={CROWN_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#9d174d] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#be185d] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(157,23,77,0.12)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#9d174d]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#9d174d]">Meaning:</span> {mantra.meaning}
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
                      Shukra in Our Life
                    </h3>
                    <div className="text-[#2a1a10]/70">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#9d174d]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#831843]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Shukra Mantra
                    </h3>
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#be185d]">{iconSvg('benefit', 'h-5 w-5')}</div>
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
                    How to Connect with Shukra
                  </h3>
                  <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#9d174d]">{iconSvg('connect', 'h-6 w-6')}</div>
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
                    Gemstone: Diamond
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#9d174d]">Heera</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <PetalDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#db2777]/85 bg-[#1a0a14] p-1.5 shadow-[0_14px_28px_rgba(0,0,0,0.24)]">
                    <DiamondRingIllustration />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Diamond is traditionally prescribed to strengthen love, refinement, and material abundance, but only after chart-based verification. White Sapphire and Opal are common alternatives.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <PetalDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#be185d]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
                      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#831843] sm:text-[2.4rem]">
                  &ldquo;I am loved, I am beautiful, I attract harmony and grace into every relationship of my life.&rdquo;
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports tenderness without dependence, beauty without vanity, and partnership held as sadhana.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-[#1a0a14]/85 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#fbcfe8]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#fdf2f8] sm:text-4xl">
                      Beauty is the language
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      through which the soul speaks of love.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img
                    src={YANTRA_URL}
                    alt="Shukra yantra"
                    className="h-24 w-24 opacity-90"
                    style={{ filter: 'sepia(1) saturate(2.5) hue-rotate(280deg) brightness(1.1)' }}
                  />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-pink-200/60 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#fdf2f8] sm:text-4xl">ॐ शुं शुक्राय नमः॥</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Om Śuṁ Śukrāya Namaḥ.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-center font-caveat text-3xl text-[#f9a8d4] sm:text-4xl">
                  Shukra&apos;s Associations
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {associations.map((association) => (
                    <div
                      key={association.title}
                      className="rounded-2xl border border-[#831843] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#9d174d] bg-[#2a1018]/75 text-[#f472b6] shadow-[0_0_24px_rgba(244,114,182,0.16)]">
                        {iconSvg(association.icon, 'h-7 w-7')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#fdf2f8]">{association.title}</div>
                      <div className="mt-1 text-sm leading-snug text-[#fbcfe8]/80">{association.subtitle}</div>
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
          <img
            src={SEAL_MARS_URL}
            alt=""
            className="pointer-events-none absolute left-8 top-[34rem] hidden h-14 w-14 opacity-12 lg:block"
            style={{ filter: 'sepia(1) saturate(2.5) hue-rotate(280deg)' }}
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#9d174d] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#f472b6' } as CSSProperties)
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
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#9d174d]">Element:</span> Water (Jala)</div>
                    <div><span className="font-semibold text-[#9d174d]">Day:</span> Friday (Shukravara)</div>
                    <div><span className="font-semibold text-[#9d174d]">Direction:</span> South-East (Agneya)</div>
                    <div><span className="font-semibold text-[#9d174d]">Metal:</span> Silver</div>
                    <div><span className="font-semibold text-[#9d174d]">Gemstone:</span> Diamond (Heera)</div>
                    <div><span className="font-semibold text-[#9d174d]">Mahadasha:</span> 20 years (longest)</div>
                    <div><span className="font-semibold text-[#9d174d]">Sacred Color:</span> White</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Shukra is the only celestial teacher of the asuras, the Daityaguru, said to hold the secret of Mṛta Sañjīvanī, the verse that revives life.</li>
                    <li>Shukra is exalted in Pisces at twenty-seven degrees, where Jupiter&apos;s devotion lifts Venus into spiritual love.</li>
                    <li>The Mahadasha of Shukra runs twenty years, the longest of all the planets, often spanning the central chapters of marriage and family.</li>
                    <li>Diamond is traditionally installed in silver or platinum on a Friday morning after chart verification.</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friends and Enemies</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <table className="mt-4 w-full border-collapse font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <caption className="sr-only">Planetary relationships of Shukra in Vedic astrology</caption>
                    <tbody>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#9d174d]">Friends</th>
                        <td className="py-1 align-top">Mercury (Budh), Saturn (Shani)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#9d174d]">Enemies</th>
                        <td className="py-1 align-top">Sun (Surya), Moon (Chandra)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#9d174d]">Neutral</th>
                        <td className="py-1 align-top">Mars (Mangala), Jupiter (Guru)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 font-kalam text-lg italic leading-relaxed text-[#2a190f]/80">
                    Friendships shape how planets cooperate or compete in the chart.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Strong Shukra</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Quiet magnetism rather than loud charm</li>
                    <li>Refined voice and pleasing features</li>
                    <li>Harmony in close relationships</li>
                    <li>Aptitude for arts, music, design</li>
                    <li>Financial comfort without ostentation</li>
                    <li>Instinctive sense for the right colour or word</li>
                    <li>Marriage that ripens into companionship</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Weakened Shukra</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Persistent relationship disappointments</li>
                    <li>Marriage delays or unstable partnerships</li>
                    <li>Reproductive or hormonal concerns</li>
                    <li>Overspending on luxury without contentment</li>
                    <li>Difficulty appreciating everyday beauty</li>
                    <li>Indulgence that consumes without satisfying</li>
                  </ul>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Always best to verify with a full chart reading by a qualified jyotishi.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Shukra in Houses at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#9d174d]">1st:</span> Charming features, refined taste</div>
                    <div><span className="font-semibold text-[#9d174d]">2nd:</span> Wealth through art, sweet speech</div>
                    <div><span className="font-semibold text-[#9d174d]">4th:</span> Comfortable home, fine vehicles</div>
                    <div><span className="font-semibold text-[#9d174d]">5th:</span> Love affairs, artistic children</div>
                    <div><span className="font-semibold text-[#9d174d]">7th:</span> Charming spouse, partnership business</div>
                    <div><span className="font-semibold text-[#9d174d]">9th:</span> Dharmic spouse, foreign love</div>
                    <div><span className="font-semibold text-[#9d174d]">10th:</span> Career in arts, fashion, hospitality</div>
                    <div><span className="font-semibold text-[#9d174d]">12th:</span> Foreign romance, spiritual love</div>
                  </div>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Read as patterns, never as predictions.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mahadasha at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#9d174d]">Period:</span> 20 years (Vimshottari, longest of all planets)</div>
                    <div><span className="font-semibold text-[#9d174d]">Themes:</span> Love, marriage, art, vehicles, refinement</div>
                    <div><span className="font-semibold text-[#9d174d]">Favourable:</span> Marriage at the right time, childbirth, real estate, artistic recognition</div>
                    <div><span className="font-semibold text-[#9d174d]">Challenging:</span> Relationship conflict, reproductive concerns, luxury overreach</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Antardasha sub-periods refine the year-by-year shape.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friday Practice</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#be185d] via-[#f472b6] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Wear a touch of white on Fridays</li>
                    <li>Light fast and visit a Lakshmi or Saraswati temple</li>
                    <li>Offer sweet rice, curd, sugar, or perfume</li>
                    <li>Donate sweets, white cloth, silver, or fund a wedding</li>
                    <li>Tend to cleanliness and grace in speech</li>
                    <li>Wear Diamond, White Sapphire, or Opal after consultation</li>
                    <li>Recite the Beej mantra 108 times in a quiet hour</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#9d174d]/85">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    Beauty is the language through which the soul speaks of love.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    A Venus teaching for a life made gentler by tenderness.
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#1a0a14]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.32)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#fdf2f8]">Closing Thought</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A small reminder for the lifelong devotee of grace.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-kalam text-xl leading-relaxed text-white/85">
                    What is beautiful is what teaches us to love. Love is what teaches us to belong.
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Shukra&apos;s quiet blessing: may my delight ripen into devotion.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#9d174d] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Shukra, Venus strength, mahadasha, gemstone choice, and how Venus energy works in a Vedic chart.
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
                        <div className="mt-1 text-[#9d174d]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <h3 className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</h3>
                      </div>
                      <div className="text-[#9d174d]">
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
