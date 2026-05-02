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

const SATURN_R2_BASE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_URL = `${SATURN_R2_BASE}/Pillar/Planets/Saturn/hero-shani.webp`;
const CRYSTAL_URL = `${SATURN_R2_BASE}/Pillar/Planets/Shared/doodle-crystal.svg`;
const NAMASTE_URL = `${SATURN_R2_BASE}/Pillar/Planets/Shared/doodle-namaste.svg`;
const CROWN_URL = `${SATURN_R2_BASE}/Pillar/Planets/Shared/icon-crown.svg`;
const FLAME_URL = `${SATURN_R2_BASE}/Pillar/Planets/Shared/icon-flame.svg`;
const DIYA_URL = `${SATURN_R2_BASE}/Pillar/Hub/Planets/Shared/diya.svg`;
const FEATHER_URL = `${SATURN_R2_BASE}/Pillar/Hub/Planets/Shared/feather-doodle.svg`;
const SACRED_GEOMETRY_URL = `${SATURN_R2_BASE}/Pillar/Hub/Planets/Shared/sacred-geometry.svg`;
const SEAL_MARS_URL = `${SATURN_R2_BASE}/Pillar/Planets/Mars/seal-mars.svg`;
const YANTRA_URL = `${SATURN_R2_BASE}/Pillar/Planets/Mars/yantra-mars-detailed.svg`;

const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE = 'Shani (Saturn), The Lord of Discipline | Soul Infinity';
const PAGE_DESCRIPTION =
  'Discover Shani (Saturn), the lord of karma, discipline, and dharmic maturity. Mantras, gemstone (Blue Sapphire), Sade Sati guidance, and Vedic remedies.';
const PAGE_KEYWORDS =
  'shani, saturn in vedic astrology, shanaishchara, shani mantra, saturn remedies, blue sapphire, neelam, sade sati, dhaiya, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/saturn`;

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
  | 'air'
  | 'neutral'
  | 'iron'
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
  | 'capricorn'
  | 'aquarius'
  | 'crow'
  | 'hanuman'
  | 'black';

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
  { icon: 'planet', label: 'Planet', value: 'Shani' },
  { icon: 'air', label: 'Element', value: 'Air' },
  { icon: 'neutral', label: 'Nature', value: 'Neutral' },
  { icon: 'iron', label: 'Metal', value: 'Iron' },
  { icon: 'day', label: 'Day', value: 'Saturday' },
  { icon: 'direction', label: 'Direction', value: 'West' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Shani Mantra',
    devanagari:
      'नीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम्। छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥',
    iast: 'Nīlāñjana-samābhāsaṁ raviputraṁ yamāgrajam, Chāyāmārtaṇḍa-sambhūtaṁ taṁ namāmi śanaiścaram.',
    meaning:
      'I bow to Shanaishchara, dark like blue collyrium, the son of Surya, elder brother of Yama, born of Chhaya and the Sun.',
  },
  {
    title: 'Beej Mantra for Shani',
    devanagari: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
    iast: 'Om Prāṁ Prīṁ Prauṁ Saḥ Śanaiścarāya Namaḥ.',
    meaning: 'Salutations to Shanaishchara, the slow-moving lord of justice and karma.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'iron', label: 'Represents', value: 'Discipline, Karma, Justice, Endurance' },
  {
    icon: 'symbol',
    label: 'Governs',
    value: 'Hard work, Longevity, Service, Detachment, Iron and oil industries, Old age',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Capricorn (Makara), Aquarius (Kumbha)' },
  { icon: 'up', label: 'Exalted In', value: 'Libra (Tula)' },
  { icon: 'down', label: 'Debilitated In', value: 'Aries (Mesha)' },
  { icon: 'direction', label: 'Direction', value: 'West' },
  { icon: 'black', label: 'Symbol', value: 'Black, Crow, Iron, Sesame oil' },
];

const benefits = [
  'Reduces karmic burdens through dharmic conduct',
  'Builds patience and emotional resilience',
  'Brings discipline to scattered routines',
  'Supports long-term career stability',
  'Offers protection during Sade Sati and Dhaiya',
  'Cultivates humility and service-mindedness',
  'Removes obstacles inherited from past karma',
];

const connectPractices = [
  'Chant Shani mantra on Saturdays.',
  'Offer black sesame, mustard oil, and iron items.',
  'Donate to laborers, the elderly, and the underprivileged.',
  'Wear Blue Sapphire (Neelam) only after qualified consultation.',
  'Visit Shani temples or Hanuman temples on Saturdays.',
  'Practice service to elders, workers, and those in need.',
];

const associations: Association[] = [
  { title: 'Capricorn', subtitle: 'Ruling Sign', icon: 'capricorn' },
  { title: 'Aquarius', subtitle: 'Co-ruling Sign', icon: 'aquarius' },
  { title: 'Saturday', subtitle: 'Sacred Day', icon: 'day' },
  { title: 'Black', subtitle: 'Sacred Color', icon: 'black' },
  { title: 'Iron', subtitle: 'Sacred Metal', icon: 'iron' },
  { title: 'Crow', subtitle: 'Sacred Vahana', icon: 'crow' },
  { title: 'Hanuman', subtitle: 'Divine Connection', icon: 'hanuman' },
  { title: 'West', subtitle: 'Direction', icon: 'direction' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'Who is Shani in Vedic astrology?',
    paragraphs: [
      "Shani (Saturn) is the most influential Navagraha in Vedic astrology, governing karma, discipline, longevity, and the lessons that shape the soul across lifetimes. As the slowest-moving of the classical planets, Saturn transits each rashi (zodiac sign) over approximately two and a half years, making its effects deep, lasting, and transformative. In the Brihat Parashara Hora Shastra, Shani is described as the son of Surya and the lord of Makara (Capricorn) and Kumbha (Aquarius). Saturn's placement in the natal chart reveals where a person must put in sustained effort, face delays with patience, and ultimately develop mastery. At Soul Infinity Astro Solutions, Saurabh Jain analyses Shani's house placement, sign dignity, aspects, and current transit position to provide precise guidance on navigating Saturn's influence, including Sade Sati and Shani Mahadasha periods.",
      'He is also called Shanaishchara (शनैश्चर), the slow-walker, and Yamagraja, the elder brother of Yama, the lord of death. As Suryaputra, he is the son of Surya and Chhaya, and the gravitas of his nature is sometimes traced to the cool detachment of his celestial mother. As Shanaishchara he is the patient walker; as Yamagraja he is the cosmic timekeeper who tallies action against intention; as Suryaputra he is the dutiful son whose quiet shadow lengthens across every chart.',
      'As a karaka, the significator of life themes, Shani rules hard work, longevity, old age, servitude and service, the underprivileged, iron and oil industries, manual labor, asceticism, detachment, and the slow ripening of merit through restraint. When jyotishis read a chart for endurance, fairness, or the felt quality of one\'s later decades, they are tracing the movement of Saturn across signs and houses. His teaching is not punishment but truth, returned at the pace at which the soul can absorb it. [VERIFY: classical karakatva ordering varies between Brihat Parashara Hora Shastra and Phaladeepika.]',
    ],
  },
  {
    title: "Shani's Form and Symbolism",
    paragraphs: [
      'Shani is described in classical iconography with a dark complexion the colour of nīlāñjana, the deep blue collyrium used in temple rituals, with bow-like limbs and a gait the texts call śanaiḥ-śanaiḥ, gentle and slow. He is depicted with four arms, holding a bow, an arrow, a trident or staff, and offering the gesture of blessing to the patient devotee. He is shown either riding a crow, or seated upon an iron chariot drawn by the same dark bird, or walking with a slow lameness said to date from a confrontation with Kartikeya. [VERIFY: vahana iconography varies between Brahma Purana and Skanda Purana.]',
      'His symbolic field is iron, oil, the colour black, and the long silence between cause and consequence. The crow is his vehicle because it watches without sentiment and remembers without distortion; iron is his metal because it is heavy, true, and only yields to fire and time; sesame oil is his offering because it carries warmth into cold places without burning. Each correspondence asks the practitioner to hold time as sacred rather than as a problem.',
      'One of the most loved associations of Shani is his bond with Hanuman. Devotional traditions hold that Hanuman, by bringing the captive Shani out of an unjust confinement, earned a perpetual grace that those who worship Hanuman receive Shani\'s protection during difficult transits. Worship of one is therefore the steadiest medicine for the other, and many remedy traditions weave them together as a single practice.',
    ],
  },
  {
    title: 'Houses and Signs Shani Rules',
    paragraphs: [
      'Shani holds two homes in the zodiac, the cardinal earth sign Capricorn (Makara) and the fixed air sign Aquarius (Kumbha). Capricorn gives him the room to build, to commit to long structures and slow ascents; Aquarius gives him the room to think, to hold communities together with rules, principles, and the cool air of fairness. Capricorn is where Shani works and Aquarius is where Shani legislates, and a chart with Saturn well-placed in either sign tends to carry the kind of dignity that age earns naturally.',
      'His exaltation is in Libra (Tula) at twenty degrees according to the Parashari tradition, where Venus\'s instinct for balance lifts Saturn into the impartial weighing of action and result. His debilitation is in Aries (Mesha), the cardinal fire sign of Mars, where Saturn\'s slow patience can struggle against impulsive heat. His mooltrikona, the seat of his most balanced expression, is the first twenty degrees of Aquarius. Within these dignities, even small differences in degree reshape the texture of patience and discipline in a chart.',
      'Among the planetary friendships, Shani counts Mercury (Budh) and Venus (Shukra) as friends; he holds enmity towards the Sun (Surya), Moon (Chandra), and Mars (Mangala); and Jupiter (Guru) sits as a neutral. His direction is the west, the quarter associated with the slow sunset, where day surrenders to night. These correspondences form the syntax through which a Vedic chart reads the temperament of karma.',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Shani',
    paragraphs: [
      'A strong Shani in a birth chart is felt as an unhurried gravity. The native carries an air of quiet authority that is not insisted upon, an instinct for fair dealing, and a willingness to put in the unseen years of work that allow a true mastery to ripen. Such a person often does well in fields that ask for endurance over flair: engineering, law, public service, the longer sciences, real estate, mining, ironwork, the care of the elderly, monastic and contemplative life. The temperament is patient without being passive, and serious without being grim.',
      'A weak or afflicted Shani can show up in several quiet ways. Some natives experience persistent delays, cold reception in family or workplace, chronic joint or skeletal concerns, anxiety wrapped around responsibility, or a sense that effort never quite pays off. Others struggle with the tendency to resist authority where cooperation would have served, or to confuse rigidity with discipline. Sade Sati and Dhaiya transits, the periodic windows of intensified Saturnian pressure, often surface these patterns more visibly so they can be addressed at the root.',
      'It is important to remember that no planet is read in isolation in Vedic astrology. The strength of Shani depends on his sign, house, the planets that aspect him, the dasha (planetary period) running, and the ascendant. A formally weak Shani in a benefic chart can still produce magnificent results, while a textbook-strong Shani under a poorly-timed dasha can tax the native heavily. These are general patterns offered for orientation, never personal predictions, and a full chart reading with a qualified jyotishi is the responsible next step.',
    ],
  },
  {
    title: 'Shani in Each House (1 to 12)',
    paragraphs: [
      'When Shani occupies the first house (the lagna), he gives a serious, dignified personality, mature features that age slowly, and a temperament inclined to responsibility from a young age. In the second house he supports wealth gathered patiently over decades, careful speech, and a family pattern that may include later-life prosperity after early restraint. The third house carries his blessing into perseverance in communication, work alongside siblings, and the courage to keep going after others have stopped.',
      'In the fourth house Shani can give a serious home life, real estate held over the long term, and a quiet mother whose love expresses through duty. The fifth produces children who arrive with karmic significance, success in research, philosophy, or strict creative discipline, and the experience of the soul learning gravitas through love. The sixth turns his discipline into a competitive advantage, supporting careers in legal services, civil work, healing the underserved, and the patient clearing of debts. The seventh brings a mature spouse, partnerships that ripen with time rather than ignite quickly, and the possibility of marriage delays that, when accepted, often produce a more enduring bond.',
      'An eighth-house Shani draws the native towards research, occult disciplines, the study of mortality, and a longevity that may include trials. The ninth produces a dharmic conservatism, foreign service, and a slow but reliable relationship with father and teacher. The tenth, his preferred house, gives a respected career through consistency, patience, and visible service to society.',
      'The eleventh, also his own sign as Aquarius, confers gains through long association, networks that take years to build, and friendships among the principled and just. The twelfth, the house of liberation, supports monastic dispositions, foreign settlement, and the gentle dissolution of attachment into spiritual maturity. [VERIFY: house effects of Saturn vary across Parashari and KP systems.]',
    ],
  },
  {
    title: 'What is Shani Mahadasha and what does it bring?',
    paragraphs: [
      'In the Vimshottari dasha system, the Mahadasha of Shani lasts nineteen years, the longest period given to any planet other than Venus. When this period activates, the chart turns its focus towards karma, structure, responsibility, and the long ripening of effort. Themes of work, longevity, family duty, and inner discipline often come forward to be fully met. Many natives who walk through a Shani Mahadasha emerge from it visibly older in temperament, even when only a few years have passed.',
      'Sade Sati is the famous seven-and-a-half-year window in which transit Saturn passes through the twelfth, first, and second houses from the natal Moon, considered one of the most karmically active periods in a life. Dhaiya, the smaller two-and-a-half-year transits through the fourth and eighth from the Moon, are similarly weighted. These transits are not designed to break the soul but to reveal which structures of the life can carry weight and which need to be quietly retired. Approached well, they often produce maturity and a more honest set of commitments.',
      'A favourable Shani dasha is often experienced as steady career consolidation, real estate gain, recognition that arrives after sustained service, and a deepening of spiritual practice. A challenging Shani dasha, particularly when Saturn is afflicted, can present as job change, separation, chronic health concerns, or the slow exposure of unfinished karma. Antardasha sub-periods within the Mahadasha further refine the result; for example, Saturn within Mercury can sharpen analytical work, while Saturn within Mars can ask for restraint under pressure. These tendencies are read alongside transits and the ascendant lord.',
    ],
  },
  {
    title: 'What are the remedies for Saturn and Sade Sati?',
    paragraphs: [
      'Saturday (Shanivara) is the day held sacred to Saturn, and many traditional remedies begin there. A simple Saturday observance includes wearing a touch of black or dark blue, a light fast, the offering of black sesame seeds, mustard oil, or iron items at a Shani temple, and a few minutes of mantra recitation in a quiet hour. The aim is not appeasement of an angry planet but a respectful turning of the inner attention towards the qualities Shani governs, patience, fairness, service, and the steady acceptance of one\'s portion of work.',
      'Mantra recitation forms the spine of formal Shani remedies. The Navagraha Shani stotra and the Beej mantra are shown in the Sacred Mantras section above, and they remain the most widely chanted invocations across the South Asian traditions. Worship of Hanuman, Shani\'s protector, is among the most loved adjacent practices; reading the Hanuman Chalisa on Saturdays and visiting Hanuman temples are widely held to soften the pressure of difficult Saturn transits. As with all japa, sincerity is weighted more heavily than haste or volume.',
      'Charitable giving on Saturdays is classical and effective, particularly the donation of black sesame, mustard oil, iron utensils, footwear, blankets, and the offering of food or service to the elderly, laborers, and the underprivileged. Blue Sapphire (Neelam) is the gemstone of Saturn, traditionally set in iron, silver, or panchadhatu on the middle finger of the right hand, but only after careful consultation with a qualified jyotishi; Blue Sapphire is the most reactive of all gemstones and should never be worn on a hunch. A Shani yantra in iron or silver, kept on a clean altar, supports the same intention. Lifestyle remedies include simplicity in dress, punctuality, and the steady honouring of commitments. None of these remedies replace medical, legal, or financial counsel, and the responsible practice is always remedy alongside, not remedy instead of, qualified human advice.',
    ],
  },
  {
    title: 'Astrological Wisdom: Karma as Teacher',
    paragraphs: [
      'The deepest teaching of Shani is that karma is not punishment but the patient hand of dharma. Information about discipline can be accumulated quickly; the lived practice of discipline asks for the slow work of doing the right thing on a Tuesday afternoon when no one is watching, and again the next Tuesday, and the next. The classical sages observed that natures inclined to seriousness become true teachers of patience when they learn that hardship is not a verdict but a curriculum, while those who do not become bitter at a world that was only ever trying to clarify them.',
      'Pain in Shani\'s seasons has a shape. It is not random, and it is not infinite. It targets exactly the structures that cannot carry weight, and quietly retires them. A relationship that could not survive honesty falls; a job that could not survive integrity ends; a habit that could not survive daylight withers. What remains is what is true. The Vedic teaching is that the only thing Shani ever takes is what was already departing, and the only thing he ever asks for is the willingness to let it go gracefully.',
      'For a modern reader, the practical translation is that discipline is a form of freedom. A well-tended Saturn does not produce a joyless life but a life with weight-bearing capacity, the kind of life in which long projects finish, vows hold, and old age arrives as honour rather than affliction. Shani does not promise an easy path, but he promises a true one, and the strength to walk it without flinching from what arrives.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Shani (Saturn) signify in Vedic astrology?',
    answer:
      'Shani signifies discipline, karma, justice, longevity, hard work, service, the underprivileged, old age, and the slow ripening of merit through restraint. He is the great teacher of the Navagraha, the lord of cosmic accountability who returns the fruit of action at the pace at which the soul can absorb it. In a chart, his position shows where life asks for patience, where karma is being settled, and where maturity will eventually be felt as relief. His teaching is not punishment but truth.',
  },
  {
    question: 'What is Sade Sati and how does it affect life?',
    answer:
      'Sade Sati is the seven-and-a-half-year window in which transit Saturn passes through the twelfth, first, and second houses from the natal Moon. It is one of the most karmically active periods in a Vedic chart, often associated with structural change in work, relationships, and inner identity. The period is not designed to break the soul; it is designed to clarify it, retiring what cannot carry weight and strengthening what is true. Approached with patience and dharmic conduct, Sade Sati often produces maturity and a more honest set of commitments. [VERIFY: methods of timing Sade Sati and its phases vary slightly across traditions.]',
  },
  {
    question: 'What are the signs of a strong vs weak Shani?',
    answer:
      'A strong Shani shows up as quiet authority, patient endurance, mature judgment, comfort with simplicity, and steady relationships with elders. A weak or afflicted Shani may show as persistent delays, chronic joint or skeletal concerns, anxiety around responsibility, the sense that effort never pays off, or strained ties with father and teacher. Final assessment depends on the full chart, including dignity, aspects, the running dasha, and current Sade Sati timing.',
  },
  {
    question: 'Should I wear Blue Sapphire (Neelam)?',
    answer:
      'Blue Sapphire is the most reactive gemstone in Vedic tradition and should never be worn on a hunch. The traditional method is to test the stone by wearing it for a brief observation period under the supervision of a qualified jyotishi who has examined the natal chart, current dasha, and Sade Sati timing. When favourably placed, Blue Sapphire amplifies Saturn\'s discipline, focus, and karmic clarity. When poorly placed, it may intensify Saturnian difficulty rather than ease it. A personal consultation is essential before purchase.',
  },
  {
    question: 'What is the Beej mantra of Shani?',
    answer:
      'The Beej mantra of Shani is "Om Prāṁ Prīṁ Prauṁ Saḥ Śanaiścarāya Namaḥ", saluting Shanaishchara as the slow-moving lord of justice and karma. It is shown with full Devanagari and IAST in the Sacred Mantras section above. Traditional practice is one hundred and eight recitations on Saturdays in a quiet hour, with sincerity weighted more heavily than haste or volume. The voice itself learns to settle along with the planet.',
  },
  {
    question: 'How do Shani mahadasha and antardasha affect life?',
    answer:
      'The Shani Mahadasha in the Vimshottari system runs for nineteen years and tends to activate themes of work, longevity, family duty, and the long ripening of inner discipline. A favourable period can bring career consolidation, real estate gain, recognition through service, and a deepening of spiritual practice. A challenging period can present as job change, separation, chronic health concerns, or the slow exposure of unfinished karma. Antardasha sub-periods refine the result further and should be read alongside transits, the ascendant lord, and the natal placement of Saturn.',
  },
  {
    question: 'What are the most effective remedies for Shani affliction?',
    answer:
      'Classical remedies for an afflicted Shani include the Saturday observance, recitation of the Navagraha Shani stotra and Beej mantra, devotional practices to Hanuman as Shani\'s protector, and charitable giving particularly the donation of black sesame, mustard oil, iron, footwear, blankets, and the offering of food or service to the elderly, laborers, and the underprivileged. Lifestyle remedies include simplicity in dress, punctuality, and the steady honouring of commitments. Blue Sapphire is studied carefully but worn only after qualified consultation; it is not a default recommendation. None of these practices replace medical, legal, or financial counsel.',
  },
];

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.4 + (((i * 7) % 10) / 10) * 1.4;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.62;
      return <circle key={i} cx={x} cy={y} r={r} fill="#a5b4fc" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="400" cy="300" r="180" fill="none" stroke="#a5b4fc" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#818cf8" strokeWidth="0.55" strokeDasharray="3 6" opacity="0.45" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.35" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#c7d2fe" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.28" />
  </svg>
);

const RaysDoodle = ({ className = '' }: { className?: string }) => (
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
          stroke="#a5b4fc"
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
    case 'air':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M3 8c2-2 5-2 7 0s5 2 7 0M3 13c2-2 5-2 7 0s5 2 7 0M3 18c2-2 5-2 7 0s5 2 7 0" strokeLinecap="round" />
        </svg>
      );
    case 'neutral':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="8" cy="12" r="4" />
          <circle cx="16" cy="12" r="4" />
        </svg>
      );
    case 'iron':
    case 'black':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <radialGradient id="saturn-iron-core" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="55%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="7.5" fill="url(#saturn-iron-core)" />
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
          <path d="m6 12 6-3v6l-6-3Zm6 0v6" />
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
          <path d="M5 6h14v3H5zM7 9v9M17 9v9M7 18h10" strokeLinecap="round" />
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
    case 'capricorn':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 5c2 4 2 9 4 12 2 3 5 3 6 0 1-3-1-7-2-9" strokeLinecap="round" />
          <path d="M14 13c2 1 5 3 6 6-3 0-6-1-7-3" strokeLinecap="round" />
        </svg>
      );
    case 'aquarius':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
          <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
        </svg>
      );
    case 'crow':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <path d="M4 14c0-3 3-6 7-6 3 0 5 2 7 4-2 1-3 3-3 5-3 0-6 0-8-1Z" />
          <path d="M11 8c0-1 .5-2 1.5-2.5" strokeLinecap="round" />
          <path d="M12 6.5 14 5l-1 2" strokeLinecap="round" />
          <circle cx="9" cy="11" r="0.7" fill="currentColor" />
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(30,58,138,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(30,58,138,0.04)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-indigo-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#3730a3]',
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

function SapphireRingIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="saturn-sapphire-gem" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="28%" stopColor="#93c5fd" />
          <stop offset="68%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </radialGradient>
        <linearGradient id="saturn-iron-band" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="20%" stopColor="#475569" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="80%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="saturn-glow" cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="rgba(165,180,252,0.55)" />
          <stop offset="100%" stopColor="rgba(165,180,252,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="188" rx="98" ry="56" fill="none" stroke="url(#saturn-iron-band)" strokeWidth="24" />
      <ellipse cx="210" cy="188" rx="72" ry="34" fill="#0a0e22" opacity="0.85" />
      <ellipse cx="210" cy="182" rx="120" ry="84" fill="url(#saturn-glow)" />
      <path
        d="M168 170c8-32 21-54 42-68 21 14 34 36 42 68-14 22-29 34-42 40-13-6-28-18-42-40Z"
        fill="url(#saturn-iron-band)"
        opacity="0.96"
      />
      <ellipse cx="210" cy="132" rx="58" ry="56" fill="url(#saturn-sapphire-gem)" stroke="url(#saturn-iron-band)" strokeWidth="8" />
      <ellipse cx="193" cy="114" rx="17" ry="13" fill="#ffffff" opacity="0.45" />
      <circle cx="230" cy="147" r="8" fill="#1e1b4b" opacity="0.25" />
    </svg>
  );
}

export default function SaturnPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Shani (Saturn), The Lord of Discipline',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-27',
        dateModified: '2026-04-27',
        url: '/planets/saturn',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Shani',
          'Saturn in Vedic astrology',
          'Shanaishchara',
          'Shani mantra',
          'Shani beej mantra',
          'Navagraha Shani stotra',
          'Blue Sapphire',
          'Neelam',
          'Saturn remedies',
          'Sade Sati',
          'Dhaiya',
          'karma teacher',
          'Shani mahadasha',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Saturn (Shani)', url: '/planets/saturn' },
      ]),
      getWebPageSchema({
        name: 'Shani (Saturn), The Lord of Discipline',
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
      }),
      // HowTo for Shani Beej mantra. Visible matching steps render in the
      // Sacred Mantras card (see "How to Chant the Shani Beej Mantra"
      // ordered list). Required by Google policy for HowTo rich results.
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to chant the Saturn (Shani) Beej mantra',
        description:
          'Classical Vedic method for chanting the Shani Beej mantra as recommended by Soul Infinity Astro Solutions.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Purification',
            text: 'Bathe and wear clean clothes in the colour associated with Saturn (dark blue or black).',
          },
          {
            '@type': 'HowToStep',
            name: 'Posture and direction',
            text: 'Sit facing west on a clean mat. Keep the spine straight.',
          },
          {
            '@type': 'HowToStep',
            name: 'Mala selection',
            text: 'Use a Blue Sapphire or iron mala of 108 beads. Hold in the right hand using thumb and middle finger.',
          },
          {
            '@type': 'HowToStep',
            name: 'Chanting',
            text: 'Chant Om Praam Preem Praum Sah Shanaischaraya Namah 108 times per round with steady rhythm and clear pronunciation.',
          },
          {
            '@type': 'HowToStep',
            name: 'Completion',
            text: 'Sit quietly after completing rounds. Offer merit to the Shani deity and conclude with gratitude.',
          },
        ],
      },
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
            className="inline-flex font-caveat text-lg text-[#1e3a8a] transition hover:text-[#1e293b] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6366f1]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(165,180,252,0.46) 0%, rgba(30,58,138,0.40) 22%, rgba(8,12,30,1) 46%, rgba(4,6,18,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_18%] bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,30,0.96)_0%,rgba(8,12,30,0.92)_18%,rgba(8,12,30,0.66)_34%,rgba(8,12,30,0.26)_48%,rgba(8,12,30,0.08)_66%,rgba(8,12,30,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,18,0.36)_0%,rgba(4,6,18,0.1)_32%,rgba(4,6,18,0.62)_100%)]" />
          <div className="absolute left-[6%] top-[14%] h-48 w-48 rounded-full bg-[#6366f1]/22 blur-3xl" />
          <div className="absolute left-[24%] top-[42%] h-32 w-32 rounded-full bg-[#3730a3]/12 blur-3xl" />
          <div className="absolute inset-0 opacity-70 mix-blend-screen">
            <NebulaDoodle className="absolute inset-0" />
          </div>
          <div className="absolute inset-0 opacity-45 mix-blend-screen">
            <RaysDoodle className="absolute left-0 top-0 h-full w-[55%]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <img src={CRYSTAL_URL} alt="" aria-hidden="true" className="absolute left-[8%] top-16 h-10 w-10" />
            <img src={NAMASTE_URL} alt="" aria-hidden="true" className="absolute left-[30%] top-[18rem] h-7 w-7 -rotate-12" />
            <img src={FLAME_URL} alt="" aria-hidden="true" className="absolute left-[18%] top-[34rem] h-5 w-5 rotate-12 opacity-55" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[33rem] sm:min-h-[38rem] lg:min-h-[43rem] xl:min-h-[47rem]">
              <div className="relative z-10 max-w-2xl overflow-visible pb-32 pt-12 sm:pb-36 sm:pt-16 lg:max-w-[42rem] lg:pb-44 lg:pt-24">
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-indigo-200/12 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#c7d2fe]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat leading-[0.88]">
                  <span className="block text-[5.8rem] text-[#a5b4fc] drop-shadow-[0_0_34px_rgba(165,180,252,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                    Shani
                  </span>
                  <span className="mt-4 block text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                    The Lord of Discipline
                  </span>
                </h1>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#dbeafe] sm:text-4xl">शनि</div>
                  <div className="font-kalam text-2xl text-[#c7d2fe] sm:text-3xl">(Saturn)</div>
                </div>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] sm:text-[2.15rem]">
                  <p>Shani teaches our <Highlight>discipline</Highlight>, <Highlight>karma</Highlight></p>
                  <p>and <Highlight>patience</Highlight>.</p>
                  <div className="flex items-center gap-3">
                    <p>He brings <Highlight>justice</Highlight> and <Highlight>maturity</Highlight>.</p>
                    <ScribbleLine />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#a5b4fc]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#a5b4fc]/80" />
                  <img src={CROWN_URL} alt="" aria-hidden="true" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-indigo-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#a5b4fc]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#a5b4fc]/65" />
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
                        <div className="text-[#1e293b]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#1e3a8a] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Quick summary of Shani"
          className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-10"
        >
          <div
            className="rounded-[24px] border border-[#8c6e47]/25 px-6 py-5 shadow-[0_10px_30px_rgba(64,40,18,0.10)] sm:px-8 sm:py-6"
            style={cardTextureStyle}
          >
            <div className="mb-2 font-caveat text-2xl leading-none text-[#1e3a8a]">In Brief</div>
            <p className="font-kalam text-[1.2rem] leading-relaxed text-[#2a190f] sm:text-[1.35rem]">
              Shani is the Vedic lord of karma, discipline, and dharmic maturity. It governs hard work, longevity, justice, and service. Devotees seek Shani&apos;s blessings for patience, endurance, and the wisdom that arises through perseverance.
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
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="h-14 w-14 opacity-70" />
                    <img src={CROWN_URL} alt="" aria-hidden="true" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#1e3a8a] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#3730a3] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(30,58,138,0.12)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#1e3a8a]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#1e3a8a]">Meaning:</span> {mantra.meaning}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visible matching content for HowTo schema (Google policy). */}
                <div className="mt-8 rounded-[18px] border border-[#8c6e47]/30 bg-[#f6ebd6]/60 px-5 py-4">
                  <div className="font-caveat text-[1.7rem] leading-none text-[#1e3a8a] sm:text-[2rem]">
                    How to Chant the Shani Beej Mantra
                  </div>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 font-kalam text-lg leading-relaxed text-[#2d1e13]">
                    <li>Bathe and wear clean clothes in dark blue or black.</li>
                    <li>Sit facing west on a clean mat with the spine straight.</li>
                    <li>Hold a Blue Sapphire or iron mala of 108 beads in the right hand using thumb and middle finger.</li>
                    <li>Chant the Beej mantra 108 times per round with steady rhythm.</li>
                    <li>Sit quietly afterwards and offer the merit to Shani with gratitude.</li>
                  </ol>
                </div>

                <img
                  src={FEATHER_URL}
                  alt="" aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-2 hidden h-44 w-auto opacity-85 lg:block"
                />
              </ParchmentCard>

              <div className="grid gap-6">
                <ParchmentCard rotate="xl:rotate-[0.4deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Shani in Our Life
                    </h3>
                    <div className="text-[#2a1a10]/70">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#1e3a8a]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#1e293b]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Shani Mantra
                    </h3>
                    <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#3730a3]">{iconSvg('benefit', 'h-5 w-5')}</div>
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
                    How to Connect with Shani
                  </h3>
                  <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#1e3a8a]">{iconSvg('connect', 'h-6 w-6')}</div>
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
                    Gemstone: Blue Sapphire
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#1e3a8a]">Neelam</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <RaysDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#3730a3]/85 bg-[#0a0e22] p-1.5 shadow-[0_14px_28px_rgba(0,0,0,0.32)]">
                    <SapphireRingIllustration />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Blue Sapphire is the most reactive gemstone in Vedic tradition. Wear only after careful chart-based verification by a qualified jyotishi. Never wear on a hunch.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <RaysDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#3730a3]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
                      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#1e293b] sm:text-[2.4rem]">
                  &ldquo;I accept what is, I work with patience, I trust the slow unfolding of my dharmic path.&rdquo;
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports endurance without resignation, and discipline as the quiet ground of freedom.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-[#0a0e22]/85 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#dbeafe]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#dbeafe] sm:text-4xl">
                      Patience is the silent teacher
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      that turns suffering into strength.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img
                    src={YANTRA_URL}
                    alt="Shani yantra"
                    className="h-24 w-24 opacity-90"
                    style={{ filter: 'sepia(1) saturate(2.5) hue-rotate(190deg) brightness(0.85)' }}
                  />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#dbeafe] sm:text-4xl">ॐ शं शनैश्चराय नमः॥</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Om Śaṁ Śanaiścarāya Namaḥ.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-center font-caveat text-3xl text-[#a5b4fc] sm:text-4xl">
                  Shani&apos;s Associations
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {associations.map((association) => (
                    <div
                      key={association.title}
                      className="rounded-2xl border border-[#1e293b] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#1e3a8a] bg-[#0e1430]/75 text-[#a5b4fc] shadow-[0_0_24px_rgba(165,180,252,0.16)]">
                        {iconSvg(association.icon, 'h-7 w-7')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#dbeafe]">{association.title}</div>
                      <div className="mt-1 text-sm leading-snug text-[#c7d2fe]/80">{association.subtitle}</div>
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

          <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="pointer-events-none absolute right-6 top-24 hidden h-24 w-24 opacity-10 lg:block" />
          <img
            src={SEAL_MARS_URL}
            alt="" aria-hidden="true"
            className="pointer-events-none absolute left-8 top-[34rem] hidden h-14 w-14 opacity-12 lg:block"
            style={{ filter: 'sepia(1) saturate(2.5) hue-rotate(190deg) brightness(0.85)' }}
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#1e3a8a] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#6366f1' } as CSSProperties)
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
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#1e3a8a]">Element:</span> Air (Vayu)</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Day:</span> Saturday (Shanivara)</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Direction:</span> West</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Metal:</span> Iron / Steel</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Gemstone:</span> Blue Sapphire (Neelam) - with caution</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Mahadasha:</span> 19 years</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Sacred Color:</span> Black, Dark Blue</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Shani is the elder brother of Yama, the lord of death.</li>
                    <li>His name &ldquo;Shanaishchara&rdquo; means the slow-walker, after Saturn&apos;s long transit through each sign.</li>
                    <li>Hanuman is widely held to be the protector of devotees during Shani&apos;s difficult transits.</li>
                    <li>Sade Sati, the seven-and-a-half-year transit of Saturn from the twelfth, first, and second from the natal Moon, is one of the most karmically active periods in a life.</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friends and Enemies</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <table className="mt-4 w-full border-collapse font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <caption className="sr-only">Planetary relationships of Shani in Vedic astrology</caption>
                    <tbody>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#1e3a8a]">Friends</th>
                        <td className="py-1 align-top">Mercury (Budh), Venus (Shukra)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#1e3a8a]">Enemies</th>
                        <td className="py-1 align-top">Sun (Surya), Moon (Chandra), Mars (Mangala)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#1e3a8a]">Neutral</th>
                        <td className="py-1 align-top">Jupiter (Guru)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 font-kalam text-lg italic leading-relaxed text-[#2a190f]/80">
                    Friendships shape how planets cooperate or compete in the chart.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Strong Shani</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Quiet authority not insisted upon</li>
                    <li>Patient endurance under pressure</li>
                    <li>Mature judgment in difficult moments</li>
                    <li>Steady relationships with elders and seniors</li>
                    <li>Long-term work that ripens with time</li>
                    <li>Comfort with simplicity and silence</li>
                    <li>Willingness to do the unseen part</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Weakened Shani</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Persistent delays without resolution</li>
                    <li>Chronic joint or skeletal concerns</li>
                    <li>Anxiety wrapped around responsibility</li>
                    <li>Sense that effort never quite pays off</li>
                    <li>Strained relationship with father or seniors</li>
                    <li>Difficulty with commitment or follow-through</li>
                  </ul>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Verify with a full chart reading and pay close attention to Sade Sati timing.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Shani in Houses at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#1e3a8a]">1st:</span> Serious bearing, mature features</div>
                    <div><span className="font-semibold text-[#1e3a8a]">3rd:</span> Perseverance, courage to continue</div>
                    <div><span className="font-semibold text-[#1e3a8a]">6th:</span> Legal services, civil work, debt-clearing</div>
                    <div><span className="font-semibold text-[#1e3a8a]">7th:</span> Mature spouse, late marriage often beneficial</div>
                    <div><span className="font-semibold text-[#1e3a8a]">10th:</span> Own house, respected career through service</div>
                    <div><span className="font-semibold text-[#1e3a8a]">11th:</span> Gains through patient networks</div>
                    <div><span className="font-semibold text-[#1e3a8a]">12th:</span> Monastic disposition, foreign settlement</div>
                  </div>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Read as patterns, never as predictions.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mahadasha at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#1e3a8a]">Period:</span> 19 years (Vimshottari)</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Themes:</span> Work, longevity, structure, discipline, karma</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Favourable:</span> Career consolidation, real estate, recognition through service</div>
                    <div><span className="font-semibold text-[#1e3a8a]">Challenging:</span> Job change, separation, chronic health concerns</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Sade Sati and Dhaiya transits intensify these themes.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Saturday Practice</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#6366f1] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Wear a touch of black or dark blue</li>
                    <li>Light fast and visit a Shani or Hanuman temple</li>
                    <li>Offer sesame, mustard oil, or iron items</li>
                    <li>Read the Hanuman Chalisa</li>
                    <li>Donate to the elderly, laborers, the underprivileged</li>
                    <li>Wear Blue Sapphire ONLY after qualified consultation</li>
                    <li>Recite the Beej mantra 108 times in a quiet hour</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#1e3a8a]/85">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    Patience is the silent teacher that turns suffering into strength.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    A Shani teaching for a life that ripens slowly into truth.
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#0a0e22]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#dbeafe]">Closing Thought</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A small reminder for the patient devotee of dharma.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" aria-hidden="true" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-kalam text-xl leading-relaxed text-white/85">
                    What is true does not need to be fast. What endures is what was built honestly.
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Shani&apos;s quiet blessing: may my discipline ripen into freedom.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#1e3a8a] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Shani, Saturn strength, Sade Sati, gemstone caution, and how Saturn energy works in a Vedic chart.
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
                        <div className="mt-1 text-[#1e3a8a]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <h3 className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</h3>
                      </div>
                      <div className="text-[#1e3a8a]">
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
