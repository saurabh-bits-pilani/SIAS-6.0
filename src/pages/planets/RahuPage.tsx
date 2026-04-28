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

const RAHU_R2_BASE = 'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev';

const HERO_URL = `${RAHU_R2_BASE}/Pillar/Planets/Rahu/hero-rahu.webp`;
const CRYSTAL_URL = `${RAHU_R2_BASE}/Pillar/Planets/Shared/doodle-crystal.svg`;
const NAMASTE_URL = `${RAHU_R2_BASE}/Pillar/Planets/Shared/doodle-namaste.svg`;
const CROWN_URL = `${RAHU_R2_BASE}/Pillar/Planets/Shared/icon-crown.svg`;
const FLAME_URL = `${RAHU_R2_BASE}/Pillar/Planets/Shared/icon-flame.svg`;
const DIYA_URL = `${RAHU_R2_BASE}/Pillar/Hub/Planets/Shared/diya.svg`;
const FEATHER_URL = `${RAHU_R2_BASE}/Pillar/Hub/Planets/Shared/feather-doodle.svg`;
const SACRED_GEOMETRY_URL = `${RAHU_R2_BASE}/Pillar/Hub/Planets/Shared/sacred-geometry.svg`;
const SEAL_MARS_URL = `${RAHU_R2_BASE}/Pillar/Planets/Mars/seal-mars.svg`;
const YANTRA_URL = `${RAHU_R2_BASE}/Pillar/Planets/Mars/yantra-mars-detailed.svg`;

const PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Planets/Sun/parchment-texture.webp';
const PAGE_PARCHMENT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-parchment-texture.webp';

const PAGE_TITLE = 'Rahu, The Shadow of Desire | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Rahu, the North Node of the Moon and shadow lord of ambition, illusion, and transformation. Mantras, gemstone (Hessonite), remedies, and Vedic traditions for awakening Rahu's wisdom in your life.";
const PAGE_KEYWORDS =
  'rahu, north node, vedic astrology, rahu mantra, rahu remedies, hessonite, gomed, chhaya graha, shadow planet, samudra manthan, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/rahu`;

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
  | 'tamasic'
  | 'lead'
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
  | 'aquarius'
  | 'snake'
  | 'smoke'
  | 'bhairava'
  | 'foreign';

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
  { icon: 'planet', label: 'Planet', value: 'Rahu' },
  { icon: 'air', label: 'Element', value: 'Air' },
  { icon: 'tamasic', label: 'Nature', value: 'Tamasic' },
  { icon: 'lead', label: 'Metal', value: 'Lead' },
  { icon: 'day', label: 'Day', value: 'Saturday' },
  { icon: 'direction', label: 'Direction', value: 'South-West' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra - Rahu Mantra',
    devanagari:
      'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्। सिंहिकागर्भसम्भूतं तं राहुं प्रणमाम्यहम्॥',
    iast: 'Ardhakāyaṁ mahāvīryaṁ candrāditya-vimardanam, Siṁhikā-garbha-sambhūtaṁ taṁ rāhuṁ praṇamāmyaham.',
    meaning:
      'I bow to Rahu, the half-bodied one of great might, who eclipses the Sun and Moon, born of the womb of Simhika.',
  },
  {
    title: 'Beej Mantra for Rahu',
    devanagari: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः॥',
    iast: 'Om Bhrāṁ Bhrīṁ Bhrauṁ Saḥ Rāhave Namaḥ.',
    meaning: 'Salutations to Rahu, the shadow lord of hidden desires and worldly ambition.',
  },
];

const lifeRows: DetailRow[] = [
  { icon: 'smoke', label: 'Represents', value: 'Ambition, Illusion, Foreign influence, Innovation, Sudden change' },
  {
    icon: 'foreign',
    label: 'Governs',
    value: 'Foreign lands, Technology, Mass communication, Cinema, Politics, Fame, Mysteries',
  },
  { icon: 'sign', label: 'Honorary Sign', value: 'Aquarius (Kumbha) - varies by lineage' },
  { icon: 'up', label: 'Exalted In', value: 'Taurus (Vrishabha)' },
  { icon: 'down', label: 'Debilitated In', value: 'Scorpio (Vrischika)' },
  { icon: 'direction', label: 'Direction', value: 'South-West' },
  { icon: 'snake', label: 'Symbol', value: 'Smoke, Snake-head, Eclipse shadow' },
];

const benefits = [
  'Drives ambition and worldly success',
  'Opens unconventional career paths',
  'Brings sudden recognition or fame',
  'Strengthens adaptability to change',
  'Supports success in foreign lands or industries',
  'Enhances mastery over technology and modern fields',
  'Cultivates discernment of illusion from truth',
];

const connectPractices = [
  'Chant Rahu mantra on Saturdays.',
  'Offer black sesame, blue flowers, or incense smoke.',
  'Donate to outsiders, the marginalized, or those in distress.',
  'Wear Hessonite (Gomed) only after qualified consultation.',
  'Visit Bhairava temples or perform ancestral tarpan.',
  'Practice meditation to dispel mental fog and obsession.',
];

const associations: Association[] = [
  { title: 'Aquarius', subtitle: 'Honorary Sign', icon: 'aquarius' },
  { title: 'Saturday', subtitle: 'Sacred Day', icon: 'day' },
  { title: 'Smoky Grey', subtitle: 'Sacred Color', icon: 'smoke' },
  { title: 'Hessonite', subtitle: 'Sacred Gemstone', icon: 'gem' },
  { title: 'Snake', subtitle: 'Sacred Symbol', icon: 'snake' },
  { title: 'Foreign Lands', subtitle: 'Sacred Domain', icon: 'foreign' },
  { title: 'Bhairava', subtitle: 'Divine Connection', icon: 'bhairava' },
  { title: 'South-West', subtitle: 'Direction', icon: 'direction' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'What Is Rahu in Vedic Astrology?',
    paragraphs: [
      'Rahu (राहु, IAST Rāhu) is the Sanskrit name of the North Node of the Moon, the point where the Moon\'s orbit crosses the ecliptic from south to north. The word Rahu derives from a root meaning "the seizer", a name that fits both the planet and the myth from which it was born. Unlike the seven luminaries with physical bodies, Rahu is a chhaya graha, a shadow planet, a calculated point in the sky rather than an object with surface and form. In the council of nine planetary deities known as the Navagraha, Rahu holds the seat of ambition, illusion, foreign influence, technology, mass appeal, and the disorienting hunger that propels the soul towards experiences it has not yet integrated.',
      'Classical mythology gives Rahu a face long before it gives him a calculation. During the Samudra Manthan, the great churning of the cosmic ocean, the asura Svarbhanu drank some of the divine nectar (amrita) and was reported to Vishnu by the Sun and Moon. Vishnu severed his head with the sudarshana chakra, but the nectar had already touched his throat, so neither head nor body could die. The head became Rahu and the body became Ketu, the two shadow points that periodically eclipse the Sun and Moon as a long-running revenge.',
      'As a karaka, the significator of life themes, Rahu rules foreign lands, mass communication, cinema, technology, photography, politics, fame, mysteries, snakes, poison, the unconventional, and the obsessive desire that does not know when to stop. He is always retrograde in motion, walking the zodiac backward, which suggests that the fulfilment he points towards is rarely linear and rarely arrives the way the mind first imagines it. [VERIFY: classical karakatva ordering varies between Brihat Parashara Hora Shastra, Phaladeepika, and the various Tantra traditions.]',
    ],
  },
  {
    title: "Rahu's Form and Symbolism",
    paragraphs: [
      'Rahu is described in classical iconography as a half-bodied being, a severed head only, with smoky complexion and intense, hungry eyes. He is depicted with four arms, holding a sword, a trident, a shield, and offering a gesture of warding to the watchful devotee. He is shown either riding a chariot drawn by eight black horses, or seated upon the same chariot as it rolls without driver, since the body that should hold the reins is gone. [VERIFY: iconography varies between Skanda Purana and Brahma Purana.]',
      'His symbolic field is smoke, eclipse, the long shadow, the snake whose presence is felt before it is seen, and the moment in which appearance and reality refuse to match. The snake is his vehicle of meaning because it sheds its skin without hesitation; smoke is his medium because it obscures without entirely hiding; the eclipse is his mythological function because the swallowing of light is, in Vedic terms, the most dramatic visible reminder that the cosmos is not fully tame. Each correspondence asks the practitioner to take seriously what they cannot quite see.',
      'One of the most loved associations of Rahu is his bond with Bhairava, the fierce protective form of Shiva who guards the night and the threshold. Devotional traditions hold that Bhairava worship steadies a difficult Rahu, because the protector of time is older than the seizer of light. Worship of Durga, particularly in her fierce forms, is similarly held to soften Rahu, since the great mother contains within herself the very darkness Rahu inhabits. The teaching is that the shadow is not defeated by avoidance but by recognition.',
    ],
  },
  {
    title: 'Houses and Signs Rahu Influences',
    paragraphs: [
      'Rahu has no formal domicile in classical Parashari astrology, since he is not a body but a node. Some lineages assign Aquarius (Kumbha) as an honorary sign because Aquarius is the sign of the unconventional, and others note Virgo as a co-honorary sign owing to Rahu\'s analytical edge. The sign Rahu sits in is therefore read together with the sign\'s ruler, who often becomes the dispositor that shapes the actual experience. [VERIFY: domicile assignment for Rahu varies across Parashari, KP, Jaimini, and the Tantra-based lineages.]',
      'His exaltation is in Taurus (Vrishabha) according to most lineages, where Venus\'s grounded earthiness gives ambition a stable vessel. His debilitation is in Scorpio (Vrischika), where Mars\'s fierce intensity tends to magnify the shadow in its disruptive form. Some texts reverse these, assigning Gemini and Sagittarius respectively, and the working jyotishi typically tracks results across both conventions before deciding on a chart-by-chart basis. [VERIFY: exaltation and debilitation degrees and signs vary; some lineages place Rahu\'s exaltation at twenty degrees of Taurus, others at the start of the sign.]',
      'Among the planetary friendships, Rahu typically counts Saturn (Shani), Venus (Shukra), and Mercury (Budh) as friends; he holds enmity towards the Sun (Surya), the Moon (Chandra), and Mars (Mangala); and Jupiter (Guru) sits as a neutral. His direction is the south-west, the quarter of Nairutya, the night-cornered direction associated with ancestors and the unmet karma they leave behind. These correspondences form the syntax through which a Vedic chart reads the temperament of shadow and desire.',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Rahu',
    paragraphs: [
      'A strong, well-placed Rahu in a birth chart is felt as a peculiar magnetism. The native carries a charisma that lands across cultural and conventional boundaries, an instinct for spotting opportunity in unconventional places, and the willingness to stand on the edge of a field rather than at its centre. Such a person often does well in fields that ask for ambition without inheritance: foreign service, film, photography, mass media, politics, technology, research into the hidden, and any vocation in which the established middle is too crowded. The temperament is hungry without being merely greedy, and original without being merely contrary.',
      'A weak or afflicted Rahu can show up in several quiet ways. Some natives experience persistent confusion about purpose, obsessive focus that does not return the energy invested, mental fog, anxiety wrapped around the future, or the sense that what was reached for keeps slipping away. Others struggle with addictive tendencies, sudden reversals, or chronic restlessness. The classical literature is consistent on one point: Rahu rarely takes without first dazzling.',
      'It is important to remember that no planet is read in isolation in Vedic astrology, and Rahu in particular is heavily modulated by his house, the nakshatra he occupies, the planets he conjoins, and the sign\'s dispositor. A formally well-placed Rahu under a difficult dasha can struggle, while a poorly-placed Rahu in a strong chart can produce remarkable, if unconventional, achievement. These are general patterns offered for orientation, never personal predictions, and a full chart reading with a qualified jyotishi is the responsible next step.',
    ],
  },
  {
    title: 'Rahu in Each House (1 to 12)',
    paragraphs: [
      'When Rahu occupies the first house (the lagna), he gives an unconventional personality, a face that holds an edge of the foreign or the dramatic, and a temperament that is felt before it is understood. In the second house he amplifies speech, sometimes towards eloquence and sometimes towards exaggeration, can stir family disruption, and creates a complicated relationship with finance. The third house carries his blessing into courage in unconventional fields, a gift for multimedia and short-form expression, and at times a pattern of sibling rivalry that asks for resolution.',
      'In the fourth house Rahu can give foreign settlement, complicated property matters, and a maternal relationship marked by absence or unconventional care. The fifth produces speculation, unconventional creativity, and at times child-related delays or unusual paths to parenthood. The sixth is one of his most loved positions, where he supports victory over enemies, success in service to large institutions, and aptitude for legal or analytical mastery. The seventh brings a foreign or unconventional spouse, intercultural marriage, and partnership shifts that arrive without a long preamble.',
      'An eighth-house Rahu draws the native towards occult mastery, sudden gains and losses, and transformative events that reshape the chart\'s narrative. The ninth produces a foreign dharma, an unconventional philosophy, and at times a separation, geographical or emotional, from the father. The tenth is another of his strongest houses, often producing sudden career rise, mass-influence careers, and a kind of fame that arrives faster than the native expected.',
      'The eleventh confers gains through unconventional networks and technological income. The twelfth supports foreign settlement, hidden enemies that are sometimes one\'s own projections, and a spiritual obsession that, when matured, becomes a genuine sadhana. [VERIFY: house effects of Rahu vary widely across Parashari, KP, and Jaimini systems.]',
    ],
  },
  {
    title: 'Rahu Mahadasha and Antardasha',
    paragraphs: [
      'In the Vimshottari dasha system, the Mahadasha of Rahu lasts eighteen years. When this period activates, the chart turns its focus towards ambition, foreign opportunity, sudden change, technology, and the kind of mass recognition that arrives from unexpected directions. Themes of identity through achievement, foreign relocation, exposure to different cultures, and the testing of one\'s relationship with desire often come forward to be lived through the eighteen-year window. Many natives describe a Rahu Mahadasha as the chapter in which they became someone other people now recognise.',
      'A favourable Rahu dasha is often experienced as a rapid career leap, foreign relocation that finally feels like the right next step, fame in modern fields, unexpected gains, mastery in technology, photography, cinema, or politics, and the felt sense that the world has finally caught up with a quality the native already had. The classical literature speaks of an unmistakable elevation that does not always look conventional from the outside but that produces visible change in the native\'s life trajectory.',
      'A challenging Rahu dasha, particularly when Rahu is afflicted in the chart, can present as obsessive desire that produces only confusion, deceit by partners or colleagues, mental health concerns, sudden losses, and the disorienting sense that the goal one believed in has dissolved on contact. Antardasha sub-periods within the Mahadasha further refine the result, especially Rahu within the dasha of the Sun, Moon, or Mars, which often delivers the most dramatic events. Read alongside transits and the ascendant lord.',
    ],
  },
  {
    title: 'Vedic Remedies for Rahu',
    paragraphs: [
      'Saturday (shared with Shani) is the day held sacred to Rahu, and many traditional remedies begin there. A simple Saturday observance includes wearing a touch of black or smoky grey, a light fast, the offering of black sesame seeds, blue flowers, mustard oil, or incense smoke at a Bhairava or Durga temple in the late afternoon or evening, and a few minutes of mantra recitation in a quiet hour. The aim is not appeasement of an angry planet but a respectful turning of the inner attention towards the qualities Rahu governs, ambition held with discernment, and desire steadied by self-awareness.',
      'Mantra recitation forms the spine of formal Rahu remedies. The Navagraha Rahu stotra and the Beej mantra are shown in the Sacred Mantras section above, and they remain the most widely chanted invocations across the South Asian traditions. Mantras dedicated to Bhairava, Durga, and the ancestors are popular adjacent practices, since the protector of time and the great mother both contain the very shadow Rahu projects outward. Pitri Tarpan, the offering of water to the ancestors, is a deeply traditional remedy that addresses the karmic line through which Rahu often moves.',
      'Charitable giving on Saturdays is classical and effective, particularly the donation of black sesame, blue cloth, mustard oil, footwear, blankets, and the offering of food or service to outsiders, immigrants, the marginalized, and those without family. Hessonite (Gomed) is the gemstone of Rahu, traditionally set in silver or panchadhatu on the middle finger of the right hand, but only after careful consultation with a qualified jyotishi; Hessonite is highly reactive and amplifies whatever it amplifies, helpful and unhelpful alike. A Rahu yantra in lead or panchadhatu, kept on a clean altar, supports the same intention. Lifestyle remedies include meditation, journaling to track obsessive thought patterns, the practice of discernment in moments of strong desire, and the steady avoidance of shortcuts. None of these remedies replace medical, legal, or financial counsel, and the responsible practice is always remedy alongside, not remedy instead of, qualified human advice.',
    ],
  },
  {
    title: 'Astrological Wisdom: Shadow as Mirror',
    paragraphs: [
      'The deepest teaching of Rahu is that the shadow is not the enemy of the light, it is its mirror. Information about ambition can be accumulated quickly; the lived practice of integrating ambition asks for the slow work of noticing what one is actually reaching for, and whether the inner shape of the desire is honest. The classical sages observed that natures inclined to fast achievement become true innovators when they learn to walk with the shadow rather than be driven by it, while those who do not become collectors of trophies who can never explain why they wanted them.',
      'Worldly success without inner clarity becomes a trap. The Rahu placement in a chart often points exactly to the place where the soul has unmet desire from past lifetimes, and reaching that place is therefore not the end of the story but the beginning of a new instruction. The Vedic teaching is that what the shadow holds, the soul has not yet been able to look at directly, and the work of a Rahu period is precisely to look, gently and with steady self-respect, at what was previously turned away from.',
      'For a modern reader, the practical translation is ambition with self-awareness, fame as service rather than ego confirmation, technology as a tool rather than a master, and the willingness to integrate shadow rather than project it onto others. A well-tended Rahu does not erase desire; it clarifies it. The blessing he offers is the discernment to recognise which longing is the soul\'s own and which is residue finally surfacing for release.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Rahu signify in Vedic astrology?',
    answer:
      'Rahu signifies ambition, illusion, foreign influence, mass communication, technology, sudden change, fame, and the obsessive desire that propels the soul towards experiences it has not yet integrated. He is the North Node of the Moon, a chhaya graha or shadow planet, and not a physical body. In a chart, his position shows where the soul is being pulled towards new and unfamiliar territory, where ambition burns hottest, and where the work of discernment is most needed. His teaching is that desire, when held with awareness, becomes a path rather than a trap.',
  },
  {
    question: 'Is Rahu a malefic or benefic planet?',
    answer:
      'Rahu is traditionally classified as a malefic, but the classification is more complicated than the label suggests. He amplifies whatever he touches, beneficial as well as disruptive, which means a well-placed Rahu can deliver remarkable elevation while a poorly-placed one can produce confusion and reversal. Modern jyotishis often describe him as a "karmic agent" rather than a simple malefic, since his function is to surface what the soul has not yet integrated. Final classification depends on the dispositor, house, nakshatra, conjunctions, and running dasha. [VERIFY: classification varies across Parashari, KP, Jaimini, and Tantra-based lineages.]',
  },
  {
    question: 'What is Rahu Mahadasha and how does it affect life?',
    answer:
      'The Rahu Mahadasha in the Vimshottari system runs for eighteen years and tends to activate themes of ambition, foreign opportunity, sudden change, technology, and mass recognition. A favourable period can bring rapid career rise, foreign relocation, fame in modern fields, and unexpected gains. A challenging period can present as obsessive desire without resolution, deceit, mental fog, or sudden losses. Antardasha sub-periods refine the result further, with Rahu within the dasha of the Sun, Moon, or Mars often delivering the most dramatic events. Read alongside transits and the natal placement of Rahu by sign, house, and nakshatra.',
  },
  {
    question: 'Should I wear Hessonite (Gomed)?',
    answer:
      'Hessonite is highly reactive and should never be worn on a hunch. The traditional method is a brief observation period under the supervision of a qualified jyotishi who has examined the natal chart, the running dasha, and the nakshatra placement of Rahu. When favourably placed, Hessonite amplifies clarity, ambition, and mastery in modern fields. When poorly placed, it may intensify exactly the confusion or obsessive desire it was hoped to soften. A personal consultation is essential before purchase, and the stone is not a default recommendation for everyone with a difficult Rahu.',
  },
  {
    question: 'What is the Beej mantra of Rahu?',
    answer:
      'The Beej mantra of Rahu is "Om Bhrāṁ Bhrīṁ Bhrauṁ Saḥ Rāhave Namaḥ", saluting Rahu as the shadow lord of hidden desires and worldly ambition. It is shown with full Devanagari and IAST in the Sacred Mantras section above. Traditional practice is one hundred and eight recitations on Saturdays in a quiet hour, with sincerity weighted more heavily than haste or volume. The voice itself learns to settle along with the planet.',
  },
  {
    question: 'What are the most effective remedies for Rahu affliction?',
    answer:
      'Classical remedies for an afflicted Rahu include the Saturday observance, recitation of the Navagraha Rahu stotra and Beej mantra, devotional practices to Bhairava and Durga, performance of Pitri Tarpan for the ancestors, and charitable giving particularly the donation of black sesame, blue cloth, mustard oil, footwear, blankets, and offerings of food or service to outsiders, immigrants, the marginalized, and those without family. Lifestyle remedies include meditation, journaling, the practice of discernment in moments of strong desire, and the steady avoidance of shortcuts. Hessonite is studied carefully but worn only after qualified consultation. None of these practices replace medical, legal, or financial counsel.',
  },
  {
    question: 'How does Rahu differ from Ketu?',
    answer:
      'Rahu and Ketu are the two ends of the same axis: Rahu is the North Node, Ketu the South Node. In the mythology they were once a single asura named Svarbhanu, severed by Vishnu\'s chakra. Rahu became the head, the part that hungers and reaches outward, while Ketu became the body, the part that has already known and now releases. Rahu therefore points to the soul\'s unmet desire, the direction of new experience, while Ketu points to mastery already accumulated, the direction of release and inner liberation. A chart is best read with both in mind, since the soul\'s growth happens along the line between them.',
  },
];

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 137.5) % 800;
      const y = (i * 89.3) % 600;
      const r = 0.4 + (((i * 7) % 10) / 10) * 1.4;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.62;
      return <circle key={i} cx={x} cy={y} r={r} fill="#c4b5fd" opacity={opacity} />;
    })}
  </svg>
);

const OrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg className={`pointer-events-none ${className}`} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="400" cy="300" r="180" fill="none" stroke="#c4b5fd" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
    <circle cx="400" cy="300" r="240" fill="none" stroke="#a78bfa" strokeWidth="0.55" strokeDasharray="3 6" opacity="0.45" />
    <circle cx="400" cy="300" r="300" fill="none" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.35" />
    <circle cx="400" cy="300" r="360" fill="none" stroke="#ddd6fe" strokeWidth="0.4" strokeDasharray="1 12" opacity="0.28" />
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
          stroke="#c4b5fd"
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
    case 'tamasic':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
        </svg>
      );
    case 'lead':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <radialGradient id="rahu-lead-core" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#a8a29e" />
              <stop offset="55%" stopColor="#44403c" />
              <stop offset="100%" stopColor="#0c0a09" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="7.5" fill="url(#rahu-lead-core)" />
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
    case 'aquarius':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
          <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
        </svg>
      );
    case 'snake':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 18c4-1 6-4 6-7s2-6 6-7" strokeLinecap="round" />
          <path d="M16 5c1.5-1 3-1 4 0" strokeLinecap="round" />
          <circle cx="17.5" cy="4.5" r="0.6" fill="currentColor" />
          <path d="M5 18c-1 0-2 .5-2 1.5" strokeLinecap="round" />
        </svg>
      );
    case 'smoke':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.6">
          <path d="M6 20c2-1 2-3 0-4M10 20c2-1 2-3 0-4M14 20c2-1 2-3 0-4M18 20c2-1 2-3 0-4" strokeLinecap="round" />
          <path d="M6 14c2-1 2-3 0-4s-2-3 0-4M14 14c2-1 2-3 0-4s-2-3 0-4" strokeLinecap="round" />
        </svg>
      );
    case 'bhairava':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3 9 8h6l-3-5Z" />
          <path d="M9 8c-1 1-2 3-2 5 0 3 2 6 5 6s5-3 5-6c0-2-1-4-2-5" />
          <circle cx="10" cy="14" r="0.7" fill="currentColor" />
          <circle cx="14" cy="14" r="0.7" fill="currentColor" />
          <path d="M11 17h2" strokeLinecap="round" />
        </svg>
      );
    case 'foreign':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(91,33,182,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(91,33,182,0.04)_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ScribbleLine() {
  return (
    <svg viewBox="0 0 120 20" className="h-4 w-28 text-violet-300" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13c10-7 18 4 28-2s15-4 24 0 17 4 27 0 17-4 35 2" strokeLinecap="round" />
    </svg>
  );
}

function ScribbleAccent({
  className = 'h-10 w-10',
  strokeClassName = 'text-[#7c3aed]',
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

function HessoniteRingIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="rahu-hessonite-gem" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="28%" stopColor="#fb923c" />
          <stop offset="68%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
        <linearGradient id="rahu-lead-band" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="20%" stopColor="#6b7280" />
          <stop offset="50%" stopColor="#d1d5db" />
          <stop offset="80%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        <radialGradient id="rahu-glow" cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="rgba(196,181,253,0.55)" />
          <stop offset="100%" stopColor="rgba(196,181,253,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="188" rx="98" ry="56" fill="none" stroke="url(#rahu-lead-band)" strokeWidth="24" />
      <ellipse cx="210" cy="188" rx="72" ry="34" fill="#150a26" opacity="0.85" />
      <ellipse cx="210" cy="182" rx="120" ry="84" fill="url(#rahu-glow)" />
      <path
        d="M168 170c8-32 21-54 42-68 21 14 34 36 42 68-14 22-29 34-42 40-13-6-28-18-42-40Z"
        fill="url(#rahu-lead-band)"
        opacity="0.96"
      />
      <ellipse cx="210" cy="132" rx="58" ry="56" fill="url(#rahu-hessonite-gem)" stroke="url(#rahu-lead-band)" strokeWidth="8" />
      <ellipse cx="193" cy="114" rx="17" ry="13" fill="#fff7ed" opacity="0.4" />
      <circle cx="230" cy="147" r="8" fill="#451a03" opacity="0.28" />
    </svg>
  );
}

export default function RahuPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Rahu, The Shadow of Desire',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-27',
        dateModified: '2026-04-27',
        url: '/planets/rahu',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Rahu',
          'North Node',
          'Vedic astrology',
          'chhaya graha',
          'shadow planet',
          'Rahu mantra',
          'Rahu beej mantra',
          'Hessonite',
          'Gomed',
          'Samudra Manthan',
          'Svarbhanu',
          'Rahu mahadasha',
          'Rahu remedies',
        ],
      }),
      getFaqPageSchemaFromList(faqs),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Rahu', url: '/planets/rahu' },
      ]),
      getWebPageSchema({
        name: 'Rahu, The Shadow of Desire',
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
            className="inline-flex font-caveat text-lg text-[#5b21b6] transition hover:text-[#4c1d95] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c3aed]"
          >
            ← Back to Planets
          </Link>
        </div>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 8%, rgba(196,181,253,0.46) 0%, rgba(91,33,182,0.40) 22%, rgba(20,12,38,1) 46%, rgba(8,5,20,1) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_right_18%] bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_URL})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,12,38,0.96)_0%,rgba(20,12,38,0.92)_18%,rgba(20,12,38,0.66)_34%,rgba(20,12,38,0.26)_48%,rgba(20,12,38,0.08)_66%,rgba(20,12,38,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,5,20,0.36)_0%,rgba(8,5,20,0.1)_32%,rgba(8,5,20,0.62)_100%)]" />
          <div className="absolute left-[6%] top-[14%] h-48 w-48 rounded-full bg-[#7c3aed]/22 blur-3xl" />
          <div className="absolute left-[24%] top-[42%] h-32 w-32 rounded-full bg-[#5b21b6]/12 blur-3xl" />
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
                <div className="absolute -left-6 top-16 hidden h-28 w-28 rounded-full bg-violet-200/12 blur-2xl lg:block" />
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#ddd6fe]/80">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat leading-[0.88]">
                  <span className="block text-[5.8rem] text-[#c4b5fd] drop-shadow-[0_0_34px_rgba(196,181,253,0.38)] sm:text-[7.1rem] lg:text-[8.4rem] xl:text-[9.1rem]">
                    Rahu
                  </span>
                  <span className="mt-4 block text-4xl leading-none text-white sm:text-5xl lg:text-[4rem]">
                    The Shadow of Desire
                  </span>
                </h1>
                <div className="mt-3 flex items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#ede9fe] sm:text-4xl">राहु</div>
                  <div className="font-kalam text-2xl text-[#ddd6fe] sm:text-3xl">(North Node)</div>
                </div>

                <div className="mt-8 max-w-2xl space-y-2 font-kalam text-[1.95rem] leading-relaxed text-[#f7efdc] sm:text-[2.15rem]">
                  <p>Rahu drives our <Highlight>ambition</Highlight>, <Highlight>illusion</Highlight></p>
                  <p>and <Highlight>transformation</Highlight>.</p>
                  <div className="flex items-center gap-3">
                    <p>He teaches <Highlight>hunger</Highlight> through <Highlight>amplification</Highlight>.</p>
                    <ScribbleLine />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 text-[#c4b5fd]">
                  <ScribbleAccent className="h-14 w-14" strokeClassName="text-[#c4b5fd]/80" />
                  <img src={CROWN_URL} alt="" className="h-9 w-9" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-[56%] lg:block">
                <OrbitDoodle className="absolute inset-0 opacity-90" />
                <div className="absolute left-[28%] top-[8%] h-[72%] w-[72%] rounded-full bg-violet-200/10 blur-3xl" />
                <div className="absolute left-[8%] top-[20%] text-[#c4b5fd]/60">
                  <ScribbleAccent className="h-20 w-20" strokeClassName="text-[#c4b5fd]/65" />
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
                        <div className="text-[#4c1d95]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                        <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.9rem]">{fact.label}</div>
                        <div className="mt-1 font-kalam text-[0.95rem] leading-tight text-[#5b21b6] sm:text-[1.08rem]">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Quick summary of Rahu"
          className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-10"
        >
          <div
            className="rounded-[24px] border border-[#8c6e47]/25 px-6 py-5 shadow-[0_10px_30px_rgba(64,40,18,0.10)] sm:px-8 sm:py-6"
            style={cardTextureStyle}
          >
            <div className="mb-2 font-caveat text-2xl leading-none text-[#5b21b6]">In Brief</div>
            <p className="font-kalam text-[1.2rem] leading-relaxed text-[#2a190f] sm:text-[1.35rem]">
              Rahu is the North Node of the Moon, the shadow lord of ambition, illusion, and transformation. It governs foreign influence, technology, fame, and unconventional success. Devotees seek Rahu&apos;s blessings for worldly mastery and discernment of illusion from truth.
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
                    <div className="h-[3px] w-52 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  </div>
                  <div className="flex items-center gap-4 text-[#2a1a10]/70">
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-14 w-14 opacity-70" />
                    <img src={CROWN_URL} alt="" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra, index) => (
                    <div key={mantra.title}>
                      <div className="font-caveat text-[2rem] leading-none text-[#5b21b6] sm:text-[2.4rem]">
                        {index + 1}. {mantra.title}
                      </div>

                      <div className="mt-4 rounded-[18px] border-2 border-[#7c3aed] bg-[#f6ebd6] px-5 py-4 shadow-[inset_0_0_20px_rgba(91,33,182,0.12)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.15rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div>
                          <span className="font-semibold text-[#5b21b6]">IAST:</span> {mantra.iast}
                        </div>
                        <div>
                          <span className="font-semibold text-[#5b21b6]">Meaning:</span> {mantra.meaning}
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
                      Rahu in Our Life
                    </h3>
                    <div className="text-[#2a1a10]/70">{iconSvg('faq', 'h-12 w-12')}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 border-b border-[#745834]/15 pb-3 last:border-b-0 last:pb-0">
                        <div className="mt-1 text-[#5b21b6]">{iconSvg(row.icon, 'h-6 w-6')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#4c1d95]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Rahu Mantra
                    </h3>
                    <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3">
                        <div className="mt-0.5 text-[#7c3aed]">{iconSvg('benefit', 'h-5 w-5')}</div>
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
                    How to Connect with Rahu
                  </h3>
                  <img src={SACRED_GEOMETRY_URL} alt="" className="h-12 w-12 opacity-70" />
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
                  {connectPractices.map((practice) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 text-[#5b21b6]">{iconSvg('connect', 'h-6 w-6')}</div>
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
                    Gemstone: Hessonite
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#5b21b6]">Gomed</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <SmokeDoodle className="absolute inset-0" />
                  </div>
                  <div className="rounded-[24px] border-2 border-[#7c3aed]/85 bg-[#150a26] p-1.5 shadow-[0_14px_28px_rgba(0,0,0,0.32)]">
                    <HessoniteRingIllustration />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Hessonite is highly reactive and amplifies whatever it amplifies. Wear only after careful chart-based verification by a qualified jyotishi. Never wear casually.
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
                  <div className="text-[#7c3aed]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
                      <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-8 font-kalam text-[2rem] leading-snug text-[#4c1d95] sm:text-[2.4rem]">
                  &ldquo;I see through illusion, I master desire with awareness, I transform shadow into wisdom.&rdquo;
                </div>
                <div className="mt-5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                  This affirmation supports ambition that is honest, fame that serves, and the steady integration of what once lived in shadow.
                </div>
              </ParchmentCard>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-[#150a26]/85 px-5 py-6 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#ede9fe]">{iconSvg('quote', 'h-9 w-9')}</div>
                  <div>
                    <div className="font-caveat text-3xl text-[#ede9fe] sm:text-4xl">
                      The shadow teaches
                    </div>
                    <div className="mt-1 font-kalam text-xl text-white/80 sm:text-2xl">
                      what the light cannot reveal.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img
                    src={YANTRA_URL}
                    alt="Rahu yantra"
                    className="h-24 w-24 opacity-90"
                    style={{ filter: 'sepia(1) saturate(2.5) hue-rotate(220deg) brightness(0.85)' }}
                  />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-violet-200/60 to-transparent" />
                </div>

                <div className="text-left lg:text-right">
                  <div className="font-devanagari text-3xl text-[#ede9fe] sm:text-4xl">ॐ रां राहवे नमः॥</div>
                  <div className="mt-2 font-kalam text-xl text-white/80 sm:text-2xl">Om Rāṁ Rāhave Namaḥ.</div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-center font-caveat text-3xl text-[#c4b5fd] sm:text-4xl">
                  Rahu&apos;s Associations
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 xl:grid-cols-8">
                  {associations.map((association) => (
                    <div
                      key={association.title}
                      className="rounded-2xl border border-[#4c1d95] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#5b21b6] bg-[#1a0b30]/75 text-[#a78bfa] shadow-[0_0_24px_rgba(167,139,250,0.16)]">
                        {iconSvg(association.icon, 'h-7 w-7')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#ede9fe]">{association.title}</div>
                      <div className="mt-1 text-sm leading-snug text-[#ddd6fe]/80">{association.subtitle}</div>
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
            style={{ filter: 'sepia(1) saturate(2.5) hue-rotate(220deg) brightness(0.85)' }}
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#5b21b6] sm:text-5xl">{section.title}</h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? 'drop-cap' : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ['--accent-color' as string]: '#a78bfa' } as CSSProperties)
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
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div><span className="font-semibold text-[#5b21b6]">Element:</span> Air (Vayu)</div>
                    <div><span className="font-semibold text-[#5b21b6]">Day:</span> Saturday (shared with Shani)</div>
                    <div><span className="font-semibold text-[#5b21b6]">Direction:</span> South-West (Nairutya)</div>
                    <div><span className="font-semibold text-[#5b21b6]">Metal:</span> Lead / Mixed alloy</div>
                    <div><span className="font-semibold text-[#5b21b6]">Gemstone:</span> Hessonite (Gomed) - with caution</div>
                    <div><span className="font-semibold text-[#5b21b6]">Mahadasha:</span> 18 years</div>
                    <div><span className="font-semibold text-[#5b21b6]">Sacred Color:</span> Smoky grey, deep violet</div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Did You Know?</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <ul className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Rahu and Ketu were once a single asura, Svarbhanu, severed by Vishnu&apos;s sudarshana chakra after he drank the amrita.</li>
                    <li>Rahu is a chhaya graha (shadow planet), a calculated point in the sky rather than a physical body.</li>
                    <li>Rahu is always retrograde in motion, walking the zodiac backward.</li>
                    <li>Saturday is the day shared between Rahu and Shani, and Bhairava worship is widely held to soften both.</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Friends and Enemies</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <table className="mt-4 w-full border-collapse font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <caption className="sr-only">Planetary relationships of Rahu in Vedic astrology</caption>
                    <tbody>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#5b21b6]">Friends</th>
                        <td className="py-1 align-top">Saturn (Shani), Venus (Shukra), Mercury (Budh)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#5b21b6]">Enemies</th>
                        <td className="py-1 align-top">Sun (Surya), Moon (Chandra), Mars (Mangala)</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-semibold text-[#5b21b6]">Neutral</th>
                        <td className="py-1 align-top">Jupiter (Guru)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 font-kalam text-lg italic leading-relaxed text-[#2a190f]/80">
                    Friendships shape how planets cooperate or compete. Rahu&apos;s relationships vary across lineages.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Strong Rahu</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Magnetism that lands across cultural boundaries</li>
                    <li>Instinct for opportunity in unconventional places</li>
                    <li>Ambition held with self-awareness</li>
                    <li>Mastery in technology, media, or modern fields</li>
                    <li>Success in foreign lands or industries</li>
                    <li>Charisma that influences groups, not just individuals</li>
                    <li>Originality without mere contrarianism</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Signs of a Weakened Rahu</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Persistent confusion about purpose</li>
                    <li>Obsessive focus that does not return energy</li>
                    <li>Mental fog and anxiety wrapped around the future</li>
                    <li>Deceit by colleagues or partners</li>
                    <li>Sudden reversals in fortune</li>
                    <li>Addictive tendencies or chronic restlessness</li>
                  </ul>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Rahu rarely takes without first dazzling. Verify with a full chart reading.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Rahu in Houses at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#5b21b6]">1st:</span> Unconventional personality, foreign attraction</div>
                    <div><span className="font-semibold text-[#5b21b6]">3rd:</span> Courage in multimedia and short-form expression</div>
                    <div><span className="font-semibold text-[#5b21b6]">6th:</span> Own house, victory over enemies, legal mastery</div>
                    <div><span className="font-semibold text-[#5b21b6]">7th:</span> Foreign or unconventional spouse</div>
                    <div><span className="font-semibold text-[#5b21b6]">9th:</span> Foreign dharma, unconventional philosophy</div>
                    <div><span className="font-semibold text-[#5b21b6]">10th:</span> Sudden career rise, mass-influence careers</div>
                    <div><span className="font-semibold text-[#5b21b6]">12th:</span> Foreign settlement, hidden enemies, spiritual obsession</div>
                  </div>
                  <p className="mt-3 font-kalam text-sm italic leading-relaxed text-[#2a190f]/75">
                    Read as patterns, never as predictions. Dispositor and nakshatra modulate strongly.
                  </p>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Mahadasha at a Glance</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <div className="mt-4 space-y-2.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#5b21b6]">Period:</span> 18 years (Vimshottari)</div>
                    <div><span className="font-semibold text-[#5b21b6]">Themes:</span> Ambition, foreign opportunity, sudden change, technology, fame</div>
                    <div><span className="font-semibold text-[#5b21b6]">Favourable:</span> Career leap, foreign relocation, mastery in modern fields, unexpected gains</div>
                    <div><span className="font-semibold text-[#5b21b6]">Challenging:</span> Confusion, obsessive desire, deceit, sudden losses, mental fog</div>
                    <div className="pt-1 italic text-[#2a190f]/80">
                      Antardasha within Sun, Moon, or Mars often delivers the most dramatic events.
                    </div>
                  </div>
                </ParchmentCard>

                <ParchmentCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">Saturday Practice</h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#a78bfa] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Wear a touch of black or smoky grey</li>
                    <li>Light fast and visit a Bhairava or Durga temple</li>
                    <li>Offer black sesame, blue flowers, mustard oil, or incense</li>
                    <li>Perform Pitri Tarpan for the ancestors</li>
                    <li>Donate to outsiders, immigrants, and those without family</li>
                    <li>Wear Hessonite ONLY after qualified consultation</li>
                    <li>Recite the Beej mantra 108 times in a quiet hour</li>
                  </ul>
                </ParchmentCard>

                <ParchmentCard rotate="lg:rotate-[0.25deg]">
                  <div className="font-caveat text-xl italic leading-tight text-[#5b21b6]/85">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.3rem]">
                    The shadow teaches what the light cannot reveal.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#2a190f]/70">
                    A Rahu teaching for the soul that is willing to look at what it has been turning away from.
                  </div>
                </ParchmentCard>

                <div className="rounded-[28px] border border-white/10 bg-[#150a26]/90 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.42)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-caveat text-4xl leading-none text-[#ede9fe]">Closing Thought</div>
                      <div className="mt-2 font-kalam text-lg text-white/75">
                        A small reminder for the shadow-walker.
                      </div>
                    </div>
                    <img src={DIYA_URL} alt="" className="h-16 w-16" />
                  </div>
                  <div className="mt-5 font-kalam text-xl leading-relaxed text-white/85">
                    What the shadow holds is not the enemy of the soul. It is the soul&apos;s instruction, waiting for the day it can finally be received.
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Rahu&apos;s quiet blessing: may my hunger ripen into wisdom.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#5b21b6] sm:text-6xl">Frequently Asked Questions</div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Rahu, the shadow planet, mahadasha, gemstone caution, and how Rahu energy works in a Vedic chart.
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
                        <div className="mt-1 text-[#5b21b6]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <h3 className="font-kalam text-xl leading-relaxed text-[#2a190f]">{faq.question}</h3>
                      </div>
                      <div className="text-[#5b21b6]">
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
