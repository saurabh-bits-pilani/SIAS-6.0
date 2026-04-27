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

const KETU_R2_BASE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_URL = `${KETU_R2_BASE}/Pillar/Planets/Ketu/hero-ketu.webp`;
const CRYSTAL_URL = `${KETU_R2_BASE}/Pillar/Planets/Shared/doodle-crystal.svg`;
const NAMASTE_URL = `${KETU_R2_BASE}/Pillar/Planets/Shared/doodle-namaste.svg`;
const CROWN_URL = `${KETU_R2_BASE}/Pillar/Planets/Shared/icon-crown.svg`;
const FLAME_URL = `${KETU_R2_BASE}/Pillar/Planets/Shared/icon-flame.svg`;
const DIYA_URL = `${KETU_R2_BASE}/Pillar/Hub/Planets/Shared/diya.svg`;
const FEATHER_URL = `${KETU_R2_BASE}/Pillar/Hub/Planets/Shared/feather-doodle.svg`;
const SACRED_GEOMETRY_URL = `${KETU_R2_BASE}/Pillar/Hub/Planets/Shared/sacred-geometry.svg`;
const SEAL_MARS_URL = `${KETU_R2_BASE}/Pillar/Planets/Mars/seal-mars.svg`;
const YANTRA_URL = `${KETU_R2_BASE}/Pillar/Planets/Mars/yantra-mars-detailed.svg`;

const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE = 'Ketu, The Light of Detachment | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Ketu, the South Node of the Moon and shadow lord of liberation, intuition, and spiritual release. Mantras, gemstone (Cat's Eye), remedies, and Vedic traditions for awakening Ketu's wisdom in your life.";
const PAGE_KEYWORDS =
  "ketu, south node, vedic astrology, ketu mantra, ketu remedies, cat's eye, lehsunia, vaiduryam, chhaya graha, shadow planet, moksha, soul infinity";
const PAGE_URL = `${SITE_ORIGIN}/planets/ketu`;

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
  | 'tamasic'
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
  | 'scorpio'
  | 'flag'
  | 'smoke'
  | 'ganesha'
  | 'liberation';

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
  { icon: 'planet', label: 'Planet', value: 'Ketu' },
  { icon: 'fire', label: 'Element', value: 'Fire' },
  { icon: 'tamasic', label: 'Nature', value: 'Tamasic' },
  { icon: 'iron', label: 'Metal', value: 'Iron' },
  { icon: 'day', label: 'Day', value: 'Tuesday' },
  { icon: 'direction', label: 'Direction', value: 'South-West' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Ketu Mantra',
    devanagari:
      'पलाशपुष्पसङ्काशं तारकाग्रहमस्तकम्। रौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥',
    iast: 'Palāśa-puṣpa-saṅkāśaṁ tārakāgraha-mastakam, Raudraṁ raudrātmakaṁ ghoraṁ taṁ ketuṁ praṇamāmyaham.',
    meaning:
      'I bow to Ketu, resembling the palasha flower, the head of the planetary forces, fierce and terrifying, the fearsome lord of dissolution.',
  },
  {
    title: 'Beej Mantra for Ketu',
    devanagari: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः॥',
    iast: 'Om Srāṁ Srīṁ Srauṁ Saḥ Ketave Namaḥ.',
    meaning: 'Salutations to Ketu, the shadow lord of liberation, intuition, and final release.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'liberation', label: 'Represents', value: 'Liberation, Detachment, Intuition, Moksha, Past-life mastery' },
  {
    icon: 'symbol',
    label: 'Governs',
    value: 'Spirituality, Healing, Mysticism, Past lives, Mantras, Surgery, Astrology',
  },
  { icon: 'sign', label: 'Honorary Sign', value: 'Scorpio (Vrischika) - varies by lineage' },
  { icon: 'up', label: 'Exalted In', value: 'Scorpio (Vrischika)' },
  { icon: 'down', label: 'Debilitated In', value: 'Taurus (Vrishabha)' },
  { icon: 'direction', label: 'Direction', value: 'South-West' },
  { icon: 'flag', label: 'Symbol', value: 'Flag, Headless body, Smoke trail' },
];

const benefits = [
  'Awakens spiritual insight and intuition',
  'Cultivates detachment from worldly attachments',
  'Brings sudden moksha-oriented experiences',
  'Strengthens healing, mantra, and meditation practice',
  'Reveals past-life talents and karmic gifts',
  'Supports liberation from old patterns',
  'Sharpens discernment between essence and appearance',
];

const connectPractices = [
  'Chant Ketu mantra on Tuesdays.',
  'Offer multi-grain mixtures, sesame, or smoke incense.',
  'Donate to ascetics, yogis, or those who serve quietly.',
  "Wear Cat's Eye (Lehsunia) only after qualified consultation.",
  'Visit Ganesha or Bhairava temples.',
  'Practice silent meditation, mantra japa, or fasting.',
];

const associations: Association[] = [
  { title: 'Scorpio', subtitle: 'Honorary Sign', icon: 'scorpio' },
  { title: 'Tuesday', subtitle: 'Sacred Day', icon: 'day' },
  { title: 'Smoky Grey', subtitle: 'Sacred Color', icon: 'smoke' },
  { title: "Cat's Eye", subtitle: 'Sacred Gemstone', icon: 'gem' },
  { title: 'Flag', subtitle: 'Sacred Symbol', icon: 'flag' },
  { title: 'Liberation', subtitle: 'Sacred Domain', icon: 'liberation' },
  { title: 'Ganesha', subtitle: 'Divine Connection', icon: 'ganesha' },
  { title: 'South-West', subtitle: 'Direction', icon: 'direction' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'What Is Ketu in Vedic Astrology?',
    paragraphs: [
      'Ketu (केतु, IAST Ketu) is the Sanskrit name of the South Node of the Moon, the point where the Moon\'s orbit crosses the ecliptic from north to south. The word Ketu translates as "banner" or "flag", and also as "comet", a name that captures both the symbolism and the visible behaviour of the shadow planet. Like Rahu, Ketu is a chhaya graha, a calculated point in the sky rather than a body with surface and form. In the council of nine planetary deities known as the Navagraha, Ketu holds the seat of liberation, detachment, intuition, mysticism, past-life mastery, and the gentle wisdom of release.',
      'The classical mythology pairs Ketu with Rahu in a single story. During the Samudra Manthan, the great churning of the cosmic ocean, the asura Svarbhanu drank some of the divine nectar (amrita) and was discovered. Vishnu severed him with the sudarshana chakra, but the nectar had already touched his throat, so neither head nor body could die. The head became Rahu and the body became Ketu, the two shadow points eternally linked across the chart. Where Rahu hungers outward for what is unmet, Ketu releases inward what has already been mastered.',
      'As a karaka, the significator of life themes, Ketu rules spirituality, healing, mantra, meditation, past lives, hidden knowledge, sudden gains and losses, surgery, astrology, psychic perception, and the sober art of letting go. He is always retrograde in motion, walking the zodiac backward in tandem with Rahu. The teaching is that the soul\'s freedom often arrives by way of release rather than acquisition. [VERIFY: classical karakatva ordering for Ketu varies between Brihat Parashara Hora Shastra, Phaladeepika, and the various Tantra traditions.]',
    ],
  },
  {
    title: "Ketu's Form and Symbolism",
    paragraphs: [
      'Ketu is described in classical iconography as a headless body holding a flag (the literal meaning of the word ketu), with smoky complexion and an unmistakable air of dissolution. He is depicted with two arms in some accounts and four in others, holding a club, a sword, and the banner from which his name is taken. He is shown either riding a vulture or seated upon a chariot drawn by the same dark bird, the vulture being the creature that completes what death has begun. [VERIFY: vahana iconography varies between Skanda Purana and Brahma Purana.]',
      'His symbolic field is the flag rising from the body of what has been completed, the trail of smoke after the comet has passed, and the stillness that arrives in a room when the talking has finally stopped. The vulture is his vehicle of meaning because it serves where service is hardest; smoke is his medium because it is what is left after fire has done its work; the headless body is his image because the soul that has finished a chapter does not need its old face to recognise itself in the next one.',
      'One of the most loved associations of Ketu is his bond with Ganesha, the remover of obstacles, who is held in some lineages to be his adhi-devata, his presiding deity. Ganesha\'s image, the elephant-headed body who guards thresholds, is the most accessible doorway to Ketu\'s wisdom. Worship of Subrahmanya, the warrior-saint son of Shiva, is similarly held to soften Ketu, particularly in matters of dharmic discernment.',
    ],
  },
  {
    title: 'Houses and Signs Ketu Influences',
    paragraphs: [
      'Ketu has no formal domicile in classical Parashari astrology, since he is a calculated node rather than a body. Some lineages assign Scorpio (Vrischika) as an honorary sign, the same Mars-ruled sign of depth and transformation, since Ketu\'s function and Scorpio\'s temperament share a family resemblance. The sign Ketu sits in is therefore read together with the sign\'s ruler, who often becomes the dispositor that shapes the actual experience. [VERIFY: domicile assignment for Ketu varies across Parashari, KP, Jaimini, and the Tantra-based lineages.]',
      'His exaltation is in Scorpio according to most lineages, where the depth-ward pull of the sign supports Ketu\'s release-ward function. His debilitation is in Taurus (Vrishabha), where the steadying earthiness of Venus tends to anchor what Ketu would naturally let dissolve. Some texts reverse these, assigning Sagittarius and Gemini respectively, and the working jyotishi typically watches results across both conventions before deciding on a chart-by-chart basis. [VERIFY: exaltation and debilitation assignments for Ketu vary across classical sources.]',
      'Among the planetary friendships, Ketu typically counts Mars (Mangala) and Jupiter (Guru) as friends; he holds enmity towards the Sun (Surya), the Moon (Chandra), and Mercury (Budh); and Venus (Shukra) and Saturn (Shani) sit as neutrals. His direction is the south-west, the quarter of Nairutya, shared with Rahu, since the two nodes mirror each other across the lunar axis. These correspondences form the syntax through which a Vedic chart reads the temperament of release and inner mastery.',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Ketu',
    paragraphs: [
      'A strong, well-placed Ketu in a birth chart is felt as a quiet depth. The native carries an unmistakable spiritual undertone even in conventional settings, an instinct for the inner dimension of any situation, and the willingness to let go of what others would still grip. Such a person often does well in fields that ask for inner authority rather than outer noise: healing, mantra, astrology, surgery, research into the hidden, monastic and contemplative life, and any vocation in which the work\'s value is not always visible from the outside. The temperament is detached without being cold, and intuitive without being merely mystical.',
      'A weak or afflicted Ketu can show up in several quiet ways. Some natives experience persistent confusion about direction, sudden separations from people or places that previously felt safe, isolation that hardens into loneliness, mental fog, lack of grounding, or unexplained accidents involving fire, surgery, or sharp instruments. Others struggle with a tendency to withdraw at the wrong moment, a kind of premature renunciation that leaves work unfinished. The classical literature is consistent on one point: Ketu rarely takes without first preparing the soul to release.',
      'It is important to remember that no planet is read in isolation in Vedic astrology, and Ketu in particular is heavily modulated by his house, the nakshatra he occupies, the planets he conjoins, and the sign\'s dispositor. A formally well-placed Ketu under a difficult dasha can struggle, while a poorly-placed Ketu in a strong chart can produce remarkable spiritual maturity. These are general patterns offered for orientation, never personal predictions, and a full chart reading with a qualified jyotishi is the responsible next step.',
    ],
  },
  {
    title: 'Ketu in Each House (1 to 12)',
    paragraphs: [
      'When Ketu occupies the first house (the lagna), he gives a detached personality, a spiritual outlook present from a young age, and often distinguishing scars or unique features. In the second house he supports a withdrawn quality of speech, the experience of family separations or distance, and a temperament that holds wealth lightly. The third house carries his blessing into courage in unconventional fields, occult communication, and at times distance between siblings that is nevertheless bridged by understanding.',
      'In the fourth house Ketu can give detachment from one\'s ancestral home, foreign settlement, and a maternal relationship marked by spiritual influence rather than emotional density. The fifth produces spiritual creativity, the surfacing of past-life talents, and at times child-related delays or unconventional paths to parenthood. The sixth supports victory over enemies through detachment rather than confrontation, success in healing professions, and the steady clearing of old debt through right action.',
      'The seventh house brings a spiritual partnership, possible delays or separations in marriage, and a spouse whose character carries a noticeable interior life. An eighth-house Ketu is one of his strongest positions, supporting occult mastery, longevity, sudden transformations, and a depth of insight that arrives unannounced. The ninth produces a dharmic withdrawal, foreign spiritual lineage, and at times a separation, geographical or emotional, from the father.',
      'The tenth house gives a spiritual or healing-oriented career, leadership through quiet authority, and sudden professional shifts that reorient the life. The eleventh confers detached friendships, spiritual networks, and sudden gains that arrive without long pursuit. The twelfth, the house of liberation, is famously aligned with Ketu\'s nature, supporting deep meditation, foreign settlement, and the gentle dissolution of attachment into something more spacious. [VERIFY: house effects of Ketu vary widely across Parashari, KP, and Jaimini systems.]',
    ],
  },
  {
    title: 'Ketu Mahadasha and Antardasha',
    paragraphs: [
      'In the Vimshottari dasha system, the Mahadasha of Ketu lasts seven years, the shortest among the planetary periods. When this period activates, the chart turns its focus towards spiritual awakening, sudden release, withdrawal from worldly pursuits, and the completion of unfinished karmic threads. Themes of inner work, healing, mantra siddhi, and the quiet release of attachments often come forward to be lived through the seven-year window. Many natives describe a Ketu Mahadasha as the chapter in which something they had been carrying finally fell away.',
      'A favourable Ketu dasha is often experienced as spiritual breakthroughs, mastery in healing or astrology, mantra siddhi, freedom from old burdens, and a clear interior signal that an old chapter has closed cleanly. Long-postponed inner work suddenly becomes possible, contemplative practice deepens, and the native finds themselves quietly more themselves than before. The classical literature speaks of a brief but transformative window in which the soul gathers what it has actually learned and releases the rest.',
      'A challenging Ketu dasha, particularly when Ketu is afflicted in the chart, can present as unexpected losses, sudden separations, mental confusion, accidents involving fire or surgery, or a hospitalisation that arrives without warning. Antardasha sub-periods within the Mahadasha further refine the result; for example, Ketu within Mercury can sharpen analytical detachment, while Ketu within the Sun can ask for a quiet step away from a public role. These tendencies are read alongside transits and the ascendant lord.',
    ],
  },
  {
    title: 'Vedic Remedies for Ketu',
    paragraphs: [
      'Tuesday (shared with Mangala) is the day held sacred to Ketu, and many traditional remedies begin there. A simple Tuesday observance includes wearing a touch of smoky grey, a light fast, the offering of multi-grain mixtures, sesame seeds, or incense smoke at a Ganesha or Subrahmanya temple, and a few minutes of mantra recitation in a quiet hour. The aim is not appeasement of an angry planet but a respectful turning of the inner attention towards the qualities Ketu governs, detachment, intuition, and the wisdom of letting go.',
      'Mantra recitation forms the spine of formal Ketu remedies. The Navagraha Ketu stotra and the Beej mantra are shown in the Sacred Mantras section above, and they remain the most widely chanted invocations across the South Asian traditions. Mantras dedicated to Ganesha, Subrahmanya, and the ancestors are popular adjacent practices, since Ganesha is held as Ketu\'s adhi-devata in many lineages. Pitri Tarpan, the offering of water to the ancestors, is a deeply traditional remedy that addresses the karmic threads Ketu often surfaces.',
      'Charitable giving on Tuesdays is classical and effective, particularly the donation of multi-grain mixtures, blankets, footwear, and the offering of food or service to ascetics, yogis, monastic seekers, and those who serve in silence. Cat\'s Eye (Lehsunia or Vaiduryam) is the gemstone of Ketu, traditionally set in silver or panchadhatu on the middle finger of the right hand, but only after careful consultation with a qualified jyotishi; Cat\'s Eye is a spiritually potent stone and amplifies whatever it amplifies. A Ketu yantra in iron or panchadhatu, kept on a clean altar, supports the same intention. Lifestyle remedies include silent retreats, simplicity in possessions, regular meditation, and the daily practice of letting go of small outcomes that the mind would otherwise grip. None of these remedies replace medical, legal, or financial counsel, and the responsible practice is always remedy alongside, not remedy instead of, qualified human advice.',
    ],
  },
  {
    title: 'Astrological Wisdom: The Light of Letting Go',
    paragraphs: [
      'The deepest teaching of Ketu is that what the soul has already mastered must eventually be released so that something new can arrive. Information about detachment can be accumulated quickly; the lived practice of detachment asks for the slow work of completing chapters consciously, of saying thank-you to a teacher whose work in your life is done, and of trusting that release is not loss. The classical sages observed that natures inclined to depth become true mystics when they learn to walk lightly with what they have known, while those who do not become collectors of identities they no longer fit.',
      'Liberation in the Vedic vision is not abandonment. It is the wisdom of non-attachment, the steady refusal to confuse the self with what the self has carried. Past-life gifts await activation through dharmic surrender, and the work of a Ketu period is often precisely to recognise a talent that the soul brought with it and to put it gently into service rather than into ego.',
      'For a modern reader, the practical translation is minimalism with purpose, completing cycles consciously, intuitive trust, and the willingness to walk away from what was once correct but no longer is. A well-tended Ketu does not produce a cold or absent life; it produces a clear one. The blessing he offers is the discernment to recognise when a chapter has actually closed, and the courage to turn the page without bitterness or backward glance.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Ketu signify in Vedic astrology?',
    answer:
      "Ketu signifies liberation, detachment, intuition, moksha, past-life mastery, and the gentle wisdom of release. He is the South Node of the Moon, a chhaya graha (shadow planet), and not a physical body. In a chart, his position shows where the soul has already done its work in past lifetimes and is now being asked to release what it has carried, so that something new can arrive. His teaching is that freedom often comes by way of letting go rather than acquiring more.",
  },
  {
    question: 'Is Ketu a malefic or benefic planet?',
    answer:
      'Ketu is traditionally classified as a malefic, but the classification is incomplete on its own. He releases whatever he touches, and what releases easily is helpful; what the native is still gripping can feel painful. A spiritually inclined chart may experience Ketu as a profound benefic, while a chart heavily invested in worldly outcomes may experience him as disruptive. Final classification depends on the dispositor, house, nakshatra, conjunctions, and running dasha. [VERIFY: classification varies across Parashari, KP, Jaimini, and Tantra-based lineages.]',
  },
  {
    question: 'What is Ketu Mahadasha and how does it affect life?',
    answer:
      'The Ketu Mahadasha in the Vimshottari system runs for seven years, the shortest among the planetary periods, and tends to activate themes of spiritual awakening, sudden release, healing mastery, and the conscious completion of unfinished karmic threads. A favourable period can bring spiritual breakthroughs, mantra siddhi, and freedom from old burdens. A challenging period can present as unexpected losses, sudden separations, mental confusion, or accidents. Antardasha sub-periods refine the result further, with Ketu within Mercury, the Sun, or Mars often delivering the most pivotal events.',
  },
  {
    question: "Should I wear Cat's Eye (Lehsunia)?",
    answer:
      "Cat's Eye is a spiritually potent stone and should never be worn casually. The traditional method is a brief observation period under the supervision of a qualified jyotishi who has examined the natal chart, the running dasha, and the nakshatra placement of Ketu. When favourably placed, Cat's Eye amplifies intuition, healing capacity, and detachment from outcomes. When poorly placed, it may intensify exactly the disorientation it was hoped to soften. A personal consultation is essential before purchase.",
  },
  {
    question: 'What is the Beej mantra of Ketu?',
    answer:
      'The Beej mantra of Ketu is "Om Srāṁ Srīṁ Srauṁ Saḥ Ketave Namaḥ", saluting Ketu as the shadow lord of liberation, intuition, and final release. It is shown with full Devanagari and IAST in the Sacred Mantras section above. Traditional practice is one hundred and eight recitations on Tuesdays in a quiet hour, with sincerity weighted more heavily than haste or volume. The voice itself learns to settle along with the planet.',
  },
  {
    question: 'What are the most effective remedies for Ketu affliction?',
    answer:
      "Classical remedies for an afflicted Ketu include the Tuesday observance, recitation of the Navagraha Ketu stotra and Beej mantra, devotional practices to Ganesha and Subrahmanya, performance of Pitri Tarpan for the ancestors, and charitable giving particularly the donation of multi-grain mixtures, sesame, blankets, and offerings of food or service to ascetics, yogis, and those who serve quietly. Lifestyle remedies include silent retreats, simplicity, regular meditation, and the practice of completing cycles consciously rather than abandoning them. Cat's Eye is studied carefully but worn only after qualified consultation. None of these practices replace medical, legal, or financial counsel.",
  },
  {
    question: 'How does Ketu differ from Rahu?',
    answer:
      "Rahu and Ketu are the two ends of the same axis: Rahu is the North Node, Ketu the South Node. In the mythology they were once a single asura, Svarbhanu, severed by Vishnu's chakra. Rahu became the head, the part that hungers and reaches outward, while Ketu became the body, the part that has already known and now releases. Rahu therefore points to the soul's unmet desire, the direction of new experience, while Ketu points to mastery already accumulated, the direction of release and inner liberation. A chart is best read with both in mind, since the soul's growth happens along the line between them.",
  },
];

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.4 + (((i * 7) % 10) / 10) * 1.4;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.62;
      return <circle key={i} cx={x} cy={y} r={r} fill="#d1d5db" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="400" cy="300" r="180" fill="none" stroke="#d1d5db" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#9ca3af" strokeWidth="0.55" strokeDasharray="3 6" opacity="0.45" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#6b7280" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.35" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#e5e7eb" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.28" />
  </svg>
);

const SmokeDoodle = ({ className = '' }: { className?: string }) => (
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
          stroke="#d1d5db"
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
    case 'fire':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3c2 3 4.6 5.1 4.6 8.8 0 3-2.1 5.2-4.6 5.2s-4.6-2.2-4.6-5.2c0-2 1-3.7 2.4-5.2.4 1.8 1.5 2.6 2.6 3.3.1-2.8.8-4.7 3.6-7Z" />
        </svg>
      );
    case 'tamasic':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
        </svg>
      );
    case 'iron':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <radialGradient id="ketu-iron-core" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="55%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#1f2937" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="7.5" fill="url(#ketu-iron-core)" />
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
          <path d="m9 15 6-6m0 0v6m0-6H9" strokeLinecap="round" />
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
          <path d="M5 7c4 0 4 4 8 4s4-4 8-4M5 13c4 0 4 4 8 4s4-4 8-4" strokeLinecap="round" />
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
    case 'scorpio':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 18V9M10 18V9M15 18V9" strokeLinecap="round" />
          <path d="M5 9c0-1.7 1.2-3 2.8-3S10.5 7.3 10.5 9" strokeLinecap="round" />
          <path d="M10 9c0-1.7 1.2-3 2.8-3S15.5 7.3 15.5 9" strokeLinecap="round" />
          <path d="M15 18h2.2c1.8 0 3.3-1.5 3.3-3.3V12" strokeLinecap="round" />
          <path d="m17.6 13.4 2.9-2.9M18.6 9.8h2.6v2.6" strokeLinecap="round" />
        </svg>
      );
    case 'flag':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 3v18" strokeLinecap="round" />
          <path d="M5 4c5-1 9 3 14 1v9c-5 2-9-2-14-1" />
        </svg>
      );
    case 'smoke':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <path d="M6 20c2-1 2-3 0-4M10 20c2-1 2-3 0-4M14 20c2-1 2-3 0-4M18 20c2-1 2-3 0-4" strokeLinecap="round" />
          <path d="M6 14c2-1 2-3 0-4s-2-3 0-4M14 14c2-1 2-3 0-4s-2-3 0-4" strokeLinecap="round" />
        </svg>
      );
    case 'ganesha':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <ellipse cx="12" cy="12" rx="6" ry="7" />
          <path d="M9 9c0-1.5 1-2.5 1.5-2.5M15 9c0-1.5-1-2.5-1.5-2.5" strokeLinecap="round" />
          <path d="M12 13c-1 1.5-3 3-3 5" strokeLinecap="round" />
          <path d="M9 5c-1-1-2-1-3 0M15 5c1-1 2-1 3 0" strokeLinecap="round" />
        </svg>
      );
    case 'liberation':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" strokeLinecap="round" />
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(75,85,99,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(75,85,99,0.04)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#4b5563]',
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

function CatsEyeRingIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="ketu-catseye-gem" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="28%" stopColor="#a3a3a3" />
          <stop offset="68%" stopColor="#525252" />
          <stop offset="100%" stopColor="#1c1917" />
        </radialGradient>
        <linearGradient id="ketu-iron-band" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="20%" stopColor="#6b7280" />
          <stop offset="50%" stopColor="#d1d5db" />
          <stop offset="80%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        <radialGradient id="ketu-glow" cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="rgba(209,213,219,0.55)" />
          <stop offset="100%" stopColor="rgba(209,213,219,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="188" rx="98" ry="56" fill="none" stroke="url(#ketu-iron-band)" strokeWidth="24" />
      <ellipse cx="210" cy="188" rx="72" ry="34" fill="#0c0d10" opacity="0.85" />
      <ellipse cx="210" cy="182" rx="120" ry="84" fill="url(#ketu-glow)" />
      <path
        d="M168 170c8-32 21-54 42-68 21 14 34 36 42 68-14 22-29 34-42 40-13-6-28-18-42-40Z"
        fill="url(#ketu-iron-band)"
        opacity="0.96"
      />
      <ellipse cx="210" cy="132" rx="58" ry="56" fill="url(#ketu-catseye-gem)" stroke="url(#ketu-iron-band)" strokeWidth="8" />
      <rect x="180" y="125" width="60" height="14" rx="6" fill="#fafafa" opacity="0.55" />
      <ellipse cx="193" cy="114" rx="14" ry="10" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

export default function KetuPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Ketu, The Light of Detachment',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-27',
        dateModified: '2026-04-27',
        url: '/planets/ketu',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Ketu',
          'South Node',
          'Vedic astrology',
          'chhaya graha',
          'shadow planet',
          'Ketu mantra',
          'Ketu beej mantra',
          "Cat's Eye",
          'Lehsunia',
          'Vaiduryam',
          'Samudra Manthan',
          'Svarbhanu',
          'Ketu mahadasha',
          'Ketu remedies',
          'moksha',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Ketu', url: '/planets/ketu' },
      ]),
      getWebPageSchema({
        name: 'Ketu, The Light of Detachment',
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
            className="inline-flex font-caveat text-lg text-[#4b5563] transition hover:text-[#1f2937] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ca3af]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(209,213,219,0.46) 0%, rgba(75,85,99,0.40) 22%, rgba(20,20,24,1) 46%, rgba(8,8,12,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_18%] bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,24,0.96)_0%,rgba(20,20,24,0.92)_18%,rgba(20,20,24,0.66)_34%,rgba(20,20,24,0.26)_48%,rgba(20,20,24,0.08)_66%,rgba(20,20,24,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.36)_0%,rgba(8,8,12,0.1)_32%,rgba(8,8,12,0.62)_100%)]" />
          <div className="absolute left-[6%] top-[14%] h-48 w-48 rounded-full bg-[#9ca3af]/22 blur-3xl" />
          <div className="absolute left-[24%] top-[42%] h-32 w-32 rounded-full bg-[#6b7280]/12 blur-3xl" />
          <div className="absolute inset-0 opacity-70 mix-blend-screen">
            <NebulaDoodle className="absolute inset-0" />
          </div>
          <div className="absolute inset-0 opacity-45 mix-blend-screen">
            <SmokeDoodle className="absolute left-0 top-0 h-full w-[55%]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <img src={CRYSTAL_URL} alt="" className="absolute left-[8%] top-16 h-10 w-10" />
            <img src={NAMASTE_URL} alt="" className="absolute left-[30%] top-[18rem] h-7 w-7 -rotate-12" />
            <img src={FLAME_URL} alt="" className="absolute left-[18%] top-[34rem] h-5 w-5 rotate-12 opacity-55" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[33rem] sm:min-h-[38rem] lg:min-h-[43rem] xl:min-h-[47rem]">
              <div className="relative z-10 max-w-2xl overflow-visible pb-32 pt-12 sm:pb-36 sm:pt-16 lg:max-w-[42rem] lg:pb-44 lg:pt-24">
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-slate-200/12 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#e5e7eb]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat text-[5.8rem] leading-[0.88] text-[#d1d5db] drop-shadow-[0_0_34px_rgba(209,213,219,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                  Ketu
                </h1>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#f3f4f6] sm:text-4xl">केतु</div>
                  <div className="font-kalam text-2xl text-[#e5e7eb] sm:text-3xl">(South Node)</div>
                </div>
                <h2 className="mt-4 font-caveat text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                  The Light of Detachment
                </h2>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] sm:text-[2.15rem]">
                  <p>Ketu reveals our <Highlight>liberation</Highlight>, <Highlight>detachment</Highlight></p>
                  <p>and <Highlight>intuition</Highlight>.</p>
                  <div className="flex items-center gap-3">
                    <p>He guides <Highlight>moksha</Highlight> through quiet <Highlight>release</Highlight>.</p>
                    <ScribbleLine />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#d1d5db]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#d1d5db]/80" />
                  <img src={CROWN_URL} alt="" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-slate-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#d1d5db]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#d1d5db]/65" />
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
                        <div className="text-[#1f2937]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#4b5563] sm:text-[1.08rem]">{fact.value}</div>
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
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-14 w-14 opacity-70" />
                    <img src={CROWN_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#4b5563] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#6b7280] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(75,85,99,0.12)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#4b5563]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#4b5563]">Meaning:</span> {mantra.meaning}
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
                      Ketu in Our Life
                    </h3>
                    <div className="text-[#2a1a10]/70">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#4b5563]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#1f2937]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Ketu Mantra
                    </h3>
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#6b7280]">{iconSvg('benefit', 'h-5 w-5')}</div>
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
                    How to Connect with Ketu
                  </h3>
                  <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#4b5563]">{iconSvg('connect', 'h-6 w-6')}</div>
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
                    Gemstone: Cat&apos;s Eye
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#4b5563]">Lehsunia / Vaiduryam</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <SmokeDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#6b7280]/85 bg-[#0c0d10] p-1.5 shadow-[0_14px_28px_rgba(0,0,0,0.32)]">
                    <CatsEyeRingIllustration />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Cat&apos;s Eye is spiritually potent and amplifies whatever it amplifies. Wear only after careful chart-based verification by a qualified jyotishi. Never wear casually.
                </div>
              </ParchmentCard>

              <ParchmentCard rotate="xl:rotate-[0.45deg]">
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <SmokeDoodle className="absolute right-0 top-0 h-full w-full" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Affirmation
                  </h3>
                  <div className="text-[#6b7280]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
                      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#1f2937] sm:text-[2.4rem]">
                  &ldquo;I release what no longer serves, I trust the wisdom of detachment, I walk gently toward freedom.&rdquo;
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports the conscious closing of chapters and the steady trust of intuition over inherited expectation.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-[#0c0d10]/85 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#f3f4f6]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#f3f4f6] sm:text-4xl">
                      What you release
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      becomes your liberation.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img
                    src={YANTRA_URL}
                    alt="Ketu yantra"
                    className="h-24 w-24 opacity-90"
                    style={{ filter: 'grayscale(1) brightness(1.05) contrast(1.1)' }}
                  />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#f3f4f6] sm:text-4xl">ॐ कें केतवे नमः॥</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Om Keṁ Ketave Namaḥ.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-center font-caveat text-3xl text-[#d1d5db] sm:text-4xl">
                  Ketu&apos;s Associations
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {associations.map((association) => (
                    <div
                      key={association.title}
                      className="rounded-2xl border border-[#1f2937] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#4b5563] bg-[#0e0f12]/75 text-[#9ca3af] shadow-[0_0_24px_rgba(156,163,175,0.16)]">
                        {iconSvg(association.icon, 'h-7 w-7')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#f3f4f6]">{association.title}</div>
                      <div className="mt-1 text-sm leading-snug text-[#e5e7eb]/80">{association.subtitle}</div>
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
            style={{ filter: 'grayscale(1) brightness(1.05)' }}
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#4b5563] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#9ca3af' } as CSSProperties)
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
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#4b5563]">Element:</span> Fire (Agni)</div>
                    <div><span className="font-semibold text-[#4b5563]">Day:</span> Tuesday (shared with Mangala)</div>
                    <div><span className="font-semibold text-[#4b5563]">Direction:</span> South-West (Nairutya)</div>
                    <div><span className="font-semibold text-[#4b5563]">Metal:</span> Iron / Mixed alloy</div>
                    <div><span className="font-semibold text-[#4b5563]">Gemstone:</span> Cat&apos;s Eye (Lehsunia) - with caution</div>
                    <div><span className="font-semibold text-[#4b5563]">Mahadasha:</span> 7 years (shortest)</div>
                    <div><span className="font-semibold text-[#4b5563]">Sacred Color:</span> Smoky grey, silver-ash</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Ketu and Rahu were once a single asura, Svarbhanu, severed by Vishnu&apos;s sudarshana chakra. Ketu is the body, Rahu the head.</li>
                    <li>The word ketu literally means &ldquo;banner&rdquo; or &ldquo;flag&rdquo;, and also &ldquo;comet&rdquo; in classical Sanskrit.</li>
                    <li>Ganesha is held to be Ketu&apos;s adhi-devata in many lineages, the presiding deity who softens difficult Ketu transits.</li>
                    <li>Ketu&apos;s seven-year Mahadasha is the shortest among the major planetary periods.</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friends and Enemies</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#4b5563]">Friends:</span> Mars (Mangala), Jupiter (Guru)</div>
                    <div><span className="font-semibold text-[#4b5563]">Enemies:</span> Sun (Surya), Moon (Chandra), Mercury (Budh)</div>
                    <div><span className="font-semibold text-[#4b5563]">Neutral:</span> Venus (Shukra), Saturn (Shani)</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Friendships shape how planets cooperate. Ketu&apos;s relationships vary across lineages.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Strong Ketu</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Quiet spiritual depth even in conventional settings</li>
                    <li>Instinct for the inner dimension of any situation</li>
                    <li>Mastery in healing, mantra, or astrology</li>
                    <li>Detachment without coldness</li>
                    <li>Sudden liberation from old burdens</li>
                    <li>Past-life talents that surface unannounced</li>
                    <li>Discernment between essence and appearance</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Weakened Ketu</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Persistent confusion about direction</li>
                    <li>Sudden separations from people or places</li>
                    <li>Isolation that hardens into loneliness</li>
                    <li>Mental fog and lack of grounding</li>
                    <li>Accidents involving fire, surgery, or sharp tools</li>
                    <li>Premature renunciation that leaves work unfinished</li>
                  </ul>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Ketu rarely takes without first preparing the soul to release.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Ketu in Houses at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#4b5563]">1st:</span> Detached personality, spiritual outlook</div>
                    <div><span className="font-semibold text-[#4b5563]">5th:</span> Spiritual creativity, past-life talents</div>
                    <div><span className="font-semibold text-[#4b5563]">6th:</span> Healing professions, debt clearance</div>
                    <div><span className="font-semibold text-[#4b5563]">8th:</span> Occult mastery, longevity, transformation</div>
                    <div><span className="font-semibold text-[#4b5563]">9th:</span> Foreign spirituality, dharmic withdrawal</div>
                    <div><span className="font-semibold text-[#4b5563]">10th:</span> Spiritual or healing-oriented career</div>
                    <div><span className="font-semibold text-[#4b5563]">12th:</span> Liberation, deep meditation, foreign settlement</div>
                  </div>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Read as patterns, never as predictions. Dispositor and nakshatra modulate strongly.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mahadasha at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#4b5563]">Period:</span> 7 years (Vimshottari, shortest)</div>
                    <div><span className="font-semibold text-[#4b5563]">Themes:</span> Spiritual awakening, sudden release, completion of old cycles</div>
                    <div><span className="font-semibold text-[#4b5563]">Favourable:</span> Spiritual breakthroughs, mantra siddhi, healing mastery, freedom</div>
                    <div><span className="font-semibold text-[#4b5563]">Challenging:</span> Unexpected losses, sudden separations, mental confusion, accidents</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Antardasha within Mercury, Sun, or Mars often delivers the most pivotal events.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Tuesday Practice</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Wear a touch of smoky grey or silver</li>
                    <li>Light fast and visit a Ganesha or Subrahmanya temple</li>
                    <li>Offer multi-grain mixtures, sesame, or incense</li>
                    <li>Perform Pitri Tarpan for the ancestors</li>
                    <li>Donate to ascetics, yogis, and silent servers</li>
                    <li>Wear Cat&apos;s Eye ONLY after qualified consultation</li>
                    <li>Recite the Beej mantra 108 times in a quiet hour</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#4b5563]/85">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    What you release becomes your liberation.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    A Ketu teaching for the soul that is ready to walk forward without looking back.
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#0c0d10]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.42)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#f3f4f6]">Closing Thought</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A small reminder for the soul that is ready to release.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-kalam text-xl leading-relaxed text-white/85">
                    What the soul has already learned does not need to be carried forever. The chapter that closes cleanly is the one that has been honoured.
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Ketu&apos;s quiet blessing: may my release ripen into freedom.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#4b5563] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Ketu, the shadow planet, mahadasha, gemstone caution, and how Ketu energy works in a Vedic chart.
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
                        <div className="mt-1 text-[#4b5563]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <div className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</div>
                      </div>
                      <div className="text-[#4b5563]">
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
