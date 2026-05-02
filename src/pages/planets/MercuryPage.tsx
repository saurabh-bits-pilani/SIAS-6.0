import { useEffect, useMemo, useState, type CSSProperties } from 'react';
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
import mercuryAssetsRaw from '../../../scripts/planets-mercury-manifest.json';

type MercuryAssets = {
  mercury: {
    ring: { url: string };
    stickyNoteGreen: { url: string };
    ovalBorderGreen: { url: string };
    offeringDurva: { url: string };
    offeringFruitGreen: { url: string };
    offeringMoong: { url: string };
    heroBudha: { url: string };
  };
  shared: {
    parchmentStripe: { url: string };
    notebookPage: { url: string };
    parchmentStickyNote: { url: string };
    sacredGeometry: { url: string };
    featherDoodle: { url: string };
    diya: { url: string };
    offeringGheeLamp: { url: string };
    mandala: { url: string };
    bgLarge: { url: string };
    bgSmall: { url: string };
    stripBg: { url: string };
    allFooterImages: { url: string };
    offeringTulsi: { url: string };
  };
};

const mercuryAssets = mercuryAssetsRaw as MercuryAssets;

const PAGE_TITLE = 'Budh (Mercury) | The Awakened Intelligence | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Budh (Mercury), the planet of intellect, communication, and adaptability. Mantras, gemstone (Emerald), remedies, and Vedic traditions to awaken Budh's blessings.";
const PAGE_KEYWORDS =
  'budh, budha, mercury in vedic astrology, budh mantra, emerald panna, mercury remedies, communication planet, intellect astrology, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/mercury`;

const HERO_URL = mercuryAssets.mercury.heroBudha.url;
const RING_URL = mercuryAssets.mercury.ring.url;
const STICKY_NOTE_URL = mercuryAssets.mercury.stickyNoteGreen.url;
const OVAL_BORDER_URL = mercuryAssets.mercury.ovalBorderGreen.url;
const MOONG_URL = mercuryAssets.mercury.offeringMoong.url;
const DURVA_URL = mercuryAssets.mercury.offeringDurva.url;
const GREEN_FRUIT_URL = mercuryAssets.mercury.offeringFruitGreen.url;
const NOTEBOOK_URL = mercuryAssets.shared.notebookPage.url;
const PARCHMENT_STRIPE_URL = mercuryAssets.shared.parchmentStripe.url;
const SACRED_GEOMETRY_URL = mercuryAssets.shared.sacredGeometry.url;
const FEATHER_URL = mercuryAssets.shared.featherDoodle.url;
const DIYA_URL = mercuryAssets.shared.diya.url;
const GHEE_LAMP_URL = mercuryAssets.shared.offeringGheeLamp.url;
const TULSI_URL = mercuryAssets.shared.offeringTulsi.url;
const MANDALA_URL = mercuryAssets.shared.mandala.url;
const BG_SMALL_URL = mercuryAssets.shared.bgSmall.url;
const STRIP_BG_URL = mercuryAssets.shared.stripBg.url;
const PAGE_NEBULA_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-nebula-overlay.webp';

type IconName =
  | 'planet'
  | 'air'
  | 'nature'
  | 'metal'
  | 'day'
  | 'direction'
  | 'intellect'
  | 'governs'
  | 'sign'
  | 'up'
  | 'down'
  | 'symbol'
  | 'benefit'
  | 'practice'
  | 'gem'
  | 'memory'
  | 'wit'
  | 'communication'
  | 'analysis'
  | 'learning'
  | 'adaptability'
  | 'faq';

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

type AttributeCard = {
  icon: IconName;
  title: string;
  sub: string;
};

type EditorialSection = {
  title: string;
  paragraphs: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const quickFacts: QuickFact[] = [
  { icon: 'planet', label: 'Planet', value: 'Budh' },
  { icon: 'air', label: 'Element', value: 'Air' },
  { icon: 'nature', label: 'Nature', value: 'Neutral' },
  { icon: 'metal', label: 'Metal', value: 'Bronze' },
  { icon: 'day', label: 'Day', value: 'Wednesday' },
  { icon: 'direction', label: 'Direction', value: 'North' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra, Budh Mantra',
    devanagari:
      'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम् । सौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम् ॥',
    iast:
      'Priyaṅgu-kalikā-śyāmaṁ rūpeṇāpratimaṁ budham | Saumyaṁ saumya-guṇopetaṁ taṁ budhaṁ praṇamāmyaham ||',
    meaning:
      'I bow to Budh, dark like the bud of the priyaṅgu flower, incomparable in form, gentle and endowed with refined qualities, the awakener of intelligence and graceful expression.',
  },
];

const lifeRows: DetailRow[] = [
  {
    icon: 'intellect',
    label: 'Represents',
    value: 'Intellect, communication, analysis, learning',
  },
  {
    icon: 'governs',
    label: 'Governs',
    value: 'Speech, writing, commerce, logic, memory',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Gemini (Mithuna), Virgo (Kanya)' },
  { icon: 'up', label: 'Exalted In', value: 'Virgo (Kanya)' },
  { icon: 'down', label: 'Debilitated In', value: 'Pisces (Meena)' },
  { icon: 'direction', label: 'Direction', value: 'North' },
  { icon: 'symbol', label: 'Symbol', value: 'Hexagonal yantra, sacred book' },
];

const benefits = [
  'Enhances intelligence and clarity',
  'Improves communication skills',
  'Strengthens memory and learning',
  'Brings success in business and trade',
  'Helps in exams and academics',
  'Promotes adaptability and wit',
];

const connectPractices = [
  'Chant Budh mantra on Wednesdays with a clear and steady mind.',
  'Offer green moong dal with sincerity and gratitude.',
  'Wear Emerald, Panna, in silver or bronze on the little finger after chart verification.',
  'Read spiritual and intellectual books that sharpen discernment.',
  'Practice meditation and pranayama to refine the mind and speech.',
];

const attributes: AttributeCard[] = [
  { icon: 'intellect', title: 'Intellect', sub: 'Clear understanding' },
  { icon: 'communication', title: 'Communication', sub: 'Wise expression' },
  { icon: 'analysis', title: 'Analysis', sub: 'Discern the pattern' },
  { icon: 'learning', title: 'Learning', sub: 'Absorb and integrate' },
  { icon: 'adaptability', title: 'Adaptability', sub: 'Respond with grace' },
  { icon: 'memory', title: 'Memory', sub: 'Retain what matters' },
  { icon: 'wit', title: 'Wit', sub: 'Quickness with balance' },
];

const editorialSections: EditorialSection[] = [
  {
    title: 'Who is Budha in Vedic astrology?',
    paragraphs: [
      "Budha (Mercury) is the most intellectually significant Navagraha in Vedic astrology, governing communication, intellect, analytical thinking, learning, commerce, and the mental agility that shapes how a person processes information and exchanges ideas. As one of the faster-moving classical planets, Budha transits each rashi (zodiac sign) in approximately three to four weeks, though it goes retrograde three times a year, often coinciding with periods that ask for review and revision. In the Brihat Parashara Hora Shastra, Budha is described as the prince of the planets, ruler of Mithuna (Gemini) and Kanya (Virgo), and the giver of speech, intelligence, and skillful expression. Mercury's placement in the natal chart reveals where a person seeks understanding, expresses ideas, and builds skill through learning and practice. At Soul Infinity Astro Solutions, Saurabh Jain analyses Budha's house placement, sign dignity, aspects, and current transit position to provide guidance on communication, education, and Budha Mahadasha periods.",
      'Classical texts call Budh the kumara, the eternal youth, and the prince of wit. Puranic narrative describes him as the son of Chandra and Tara, born from the meeting of the Moon and a celestial mind, which is why his nature carries lunar reflectivity layered with sharp clarity. This origin gives him an adaptable intelligence rather than a fixed one, capable of mirroring whoever he keeps company with, learning quickly, and passing on what he has absorbed. [VERIFY: parentage detail varies between Bhagavata and other Puranic sources]',
      'In a birth chart Budh signifies speech, memory, learning, commerce, writing, communication, logical analysis, friendships in the intellectual sphere, and the ability to translate ideas into meaningful exchange. Astrologers read him to understand how a person processes information, makes deals, teaches, and adapts. His placement reveals the texture of a person’s mind and the quality of the bridge between thought and word.',
      'In modern Vedic practice, Budh is assessed not only through his sign and house, but through his nakshatra placement, his dispositors, and the company he keeps in conjunction. A chart with multiple planets clustered with Budh often shows an emphasis on intellectual life, while a Budh in isolation can give the steady focus of the lone scholar. These nuances make Budh one of the more revealing planets to read, because his interactions describe how a person actually thinks.',
    ],
  },
  {
    title: 'Budh’s Form and Symbolism',
    paragraphs: [
      'Budh is traditionally depicted as a young deity with a calm, gently smiling face, robed in green and seated upon his chariot, drawn in classical depictions by lions. His four hands carry a scripture, a quill, a sword of discrimination, and the gesture of blessing, signalling that genuine learning is both creative and protective. The green hue is no accident, evoking new growth, fertile fields, and the freshness of insight that arises in a rested mind.',
      'Symbolic associations multiply across his iconography. Some traditions place a parrot near him, the bird that learns by listening and repeats with fidelity, a perfect emblem of memorised speech. The hexagonal yantra used in Budh worship arranges six points around a centre, representing the six directions in which the awakened mind can move with equal poise. These symbols are mnemonic devices as much as devotional ones, training the practitioner to recognise the qualities being honoured.',
      'Wednesday belongs to Budh in the seven-day cycle, called Budhavara in Sanskrit. The day sits in the middle of the week, mirroring Budh’s role as a translator who stands between sender and receiver, morning and evening. Devotees wear green on Wednesdays, offer green moong, and chant his mantras facing north. These choices are not decorative; they reinforce a sensory environment in which the mind is invited to settle into clarity.',
      'In daily worship, Budh is offered green leaves, fresh durva grass, and bilva or amla fruit, while practitioners chant either the Navagraha shloka or his bija. The setting is generally clean and uncluttered, because clutter is the natural enemy of the discerning mind. Even the simplicity of his temple iconography, with very few ornaments, is a reminder that genuine intelligence does not require display.',
    ],
  },
  {
    title: 'Houses and Signs Budh Rules',
    paragraphs: [
      'In the Vedic zodiac, lordship over Mithuna (Gemini) and Kanya (Virgo) belongs to Budh. Mithuna expresses the planet’s playful, communicative, exchange-oriented side, including quick conversation, trade, and the pleasure of ideas in motion. Kanya expresses his analytical, organising, service-oriented side, where intellect becomes precise enough to refine systems, edit text, and serve quietly through expertise.',
      'Both signs are mutable, which honours his adaptive temperament. The planet achieves exaltation in Virgo, classically described at fifteen degrees in Parashara’s tradition, while he is debilitated in Pisces. In Virgo his reasoning becomes lucid, his speech disciplined, and his ability to discern detail reaches its peak. In Pisces the boundaries he relies upon dissolve into the oceanic, so a debilitated Budh is not destroyed, but his clarity must be earned through structure rather than inherited from placement. [VERIFY: KP and other modern systems sometimes use slightly different exaltation degrees]',
      'In planetary friendships, the planet treats Surya (Sun) and Shukra (Venus) as friends, while he holds Chandra (Moon) at a respectful distance, classically as an enemy because the Puranic story of his parentage complicated their relationship. Mars is considered neutral in many traditions, while Saturn relates as a friend in some lineages. These tonal relationships shape how composite yogas form and which dasha sequences yield calmer outcomes for a given chart. [VERIFY: friendship table varies slightly between Parashari, BNN, and Jaimini]',
    ],
  },
  {
    title: 'Effects of Strong vs Weak Budh',
    paragraphs: [
      'A well-supported Budh tends to express itself as articulate speech, layered humour, fast pattern recognition, ease with language, sound business judgement, and a curiosity that does not exhaust itself. Such people often thrive in fields like writing, journalism, teaching, software, mathematics, mediation, accountancy, and trade. Their nervous systems handle complexity gracefully, and their relationships are fed by the practice of clear communication.',
      'A weakened or afflicted Budh can manifest in many ways depending on the rest of the chart. Common expressions include difficulty articulating thought under pressure, restless overthinking, scattered learning, hesitant speech, occasional skin sensitivity, nervous-system fatigue, and challenges with sustained concentration. The body and the mind share one circuitry under Budh’s care, so disturbances often touch both at the same time.',
      'Vedic remedies can support Budh when his expression is constricted. Listening to wise speech, structured study, completing what one starts, charitable giving in the form of education or books, and sincere mantra practice are traditional supports. None of these are guarantees, and none should replace medical guidance where physical symptoms are present. The point of these supports is not to perform spiritual labour but to lower the volume of reactive thought, so latent intelligence has room to express itself.',
    ],
  },
  {
    title: 'What is the significance of Mercury in the 12 houses?',
    paragraphs: [
      'Budh’s house placement colours the domain in which intellect, speech, and exchange most actively unfold. In the first house he shapes self-presentation through wit, youthful demeanour, and quick perception. In the second house he sharpens speech, learning, and family communication, while also influencing earnings tied to language or analysis.',
      'In the third house he enjoys natural strength, because this house mirrors his own communicative nature. Siblings, courage of expression, and short journeys gain texture and curiosity. In the fourth house he brings a thoughtful, well-stocked home environment and an early connection to study. In the fifth house, another of his natural homes, he flowers in creative intelligence, education, mantra practice, and well-considered investments.',
      'In the sixth house his analytical edge serves problem-solving, accountancy, and disciplined service, though it can incline toward worry. In the seventh house Budh draws partners through conversation and contracts. The eighth house turns his curiosity inward, often producing researchers and investigators of hidden subjects. In the ninth house he supports philosophical learning and respectful debate.',
      'The tenth house, Budh’s strongest career placement, supports public communication, commerce, and visible expertise. In the eleventh he gathers networks and rewards through exchange. In the twelfth he becomes contemplative, drawn to translation, study abroad, or quiet writing. House strength alone never decides outcomes; sign, aspects, and dasha all contribute, and a full reading remains essential. The wise approach is not to seek the most blessed house in isolation, but to read Budh’s full conversation with the rest of the chart and the running dasha. [VERIFY: house effects vary across Parashari, BNN, and KP]',
    ],
  },
  {
    title: 'What is Budha Mahadasha and what does it bring?',
    paragraphs: [
      'The Vimshottari dasha system, which allots planetary periods across one hundred and twenty years, gives Budh a span of seventeen years. When his mahadasha activates, the chart moves into a season where mind, message, and exchange become primary themes, regardless of the rest of the natal architecture.',
      'A favourable Budh mahadasha can bring formal education, writing achievements, business growth, gains through technology, fruitful negotiations, travel related to commerce, and an expansion of one’s professional voice. People often describe these years as mentally alive, productive, and full of new conversations. Career steps tied to language, trade, and analysis frequently land in this period, especially when Budh is well placed and supported by friendly aspects. Many practitioners use this period intentionally to launch creative or commercial projects that depend on language, presence, and timing.',
      'The same mahadasha can also feel restless or scattered when Budh sits poorly in the chart. Antardashas, the sub-periods that further divide each mahadasha, modulate the experience considerably. A Mercury-Mercury opening period may concentrate his themes intensely, while later sub-periods of Ketu, Venus, or Sun reveal where Budh meets his cooperative friends or his stricter teachers. Reading a dasha well requires considering the natal sign, house, dignity, the bhava lordships Budh carries, and the transits of the moment, so a chart-specific reading remains essential. [VERIFY: classical sub-period sequence and effects vary across schools]',
    ],
  },
  {
    title: 'What are the remedies for a weak Mercury?',
    paragraphs: [
      'Wednesday is the day reserved for Budh in the Vedic calendar, and most traditional remedies anchor themselves there. Devotees rise early on Wednesdays, bathe, wear green or undyed cloth, light a simple ghee lamp, and chant Budh’s mantras with attention. The ambient simplicity matters, because Budh responds to clean signal more than ornate ritual.',
      'Among focused mantra practices, the Budh bija and the longer Navagraha shloka, both of which appear in the Sacred Mantras section above, are most widely used. The bija is suited to steady internal repetition, traditionally one hundred and eight times. The shloka is reserved for those who can pronounce it with care, and both deserve sincerity rather than speed. Charitable giving forms a second traditional pillar; offering green moong dal, fresh durva grass, books, stationery, or sponsoring the education of a child are all attributed to Budh’s support.',
      'Emerald, called Panna in Sanskrit-Hindi parlance, is the gemstone associated with Budh. The traditional protocol asks for a clean, untreated emerald set in silver or, in some lineages, panchadhatu, worn on the little finger of the working hand. The stone is energised on a Wednesday during shukla paksha at sunrise, with the bija mantra recited the appropriate number of times. Wearing a planetary gemstone is a long commitment and should be undertaken only after a qualified Jyotishi has reviewed the full chart, because amplifying a planet is helpful only when amplification is appropriate. [VERIFY: setting metal varies between Parashari, BNN, and Tantric prescriptions]',
    ],
  },
  {
    title: 'Astrological Wisdom: Mind as Tool',
    paragraphs: [
      'The deepest teaching encoded in Budh is not faster thinking, sharper retorts, or more impressive vocabulary. It is the recognition that the mind is a tool, finely shaped, capable of immense service, and never the master of the soul. When the mind is mistaken for the self, intellect becomes anxious; when the mind is recognised as an instrument, intellect becomes graceful.',
      'Budh asks for honesty in speech, courtesy in debate, patience with slow learning, and the humility to revise an opinion when better information arrives. He rewards those who use language to clarify rather than to impress, and who treat exchange as a meeting rather than a contest. None of this requires brilliance, only consistency, and the practice naturally settles the nervous system over time.',
      'Even the choice to pause before answering is a small offering to Budh. The pause is not hesitation; it is the moment in which thought catches up to feeling, and feeling catches up to context. From that pause, the right words usually arrive.',
      'A relationship with Budh deepens through small daily practices, such as a moment of quiet before speaking, gratitude for one teacher, an honest sentence in writing, a kind word in commerce. Over months these shape the spoken word and the way one is received by others. The chart itself does not change, but the lived experience of it does. If you would like a personalised reading of how Budh sits in your own chart, including dasha timing and a thoughtful remedial protocol, you are welcome to book a consultation with Soul Infinity, where classical Vedic analysis meets a steady, grounded conversation.',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What does Budh represent in Vedic astrology?',
    answer:
      'Budh represents the awakened intellect, including speech, memory, learning, commerce, analysis, communication, and adaptability. He is the discriminating faculty that translates lived experience into thought and language. In a birth chart, Budh shows how a person processes information, expresses ideas, conducts business, and adapts to changing circumstances. His placement also reveals the natural areas where mental work feels most fluent and rewarding.',
  },
  {
    question: 'How can I tell if my Budh is weak?',
    answer:
      'A weakened Budh may show as difficulty articulating thoughts under pressure, restless overthinking, hesitant speech, scattered learning, occasional skin sensitivity, or challenges with concentration. These are signals to notice, not diagnoses. A reliable answer requires the full chart, because Budh’s expression depends on his sign, house, dignity, aspects, and the running dasha. A consultation with a qualified Jyotishi is the most accurate way to assess.',
  },
  {
    question: 'Should I wear Emerald (Panna) without consulting a Jyotishi?',
    answer:
      'No. Wearing a planetary gemstone is a long-term commitment that amplifies the planet’s influence in the chart. Amplification is helpful only when it suits the individual horoscope, and an unsuitable Emerald can produce restlessness or scattered communication rather than clarity. Always consult a qualified Jyotishi who can review your full chart, current dasha, and life context before recommending a stone, the metal setting, the day of energising, and the protocol.',
  },
  {
    question: 'What happens during Budh mahadasha?',
    answer:
      'Budh mahadasha lasts seventeen years and emphasises mind, message, and exchange. When favourably placed, it can bring formal education, writing or speaking opportunities, business growth, gains through commerce or technology, and wider professional networks. When weakly placed, the same period can feel mentally restless or scattered. The full effect depends on Budh’s sign, house, dignity, and the antardashas inside the mahadasha, so a chart-specific reading is essential.',
  },
  {
    question: 'Which house is best for Budh?',
    answer:
      'Budh is naturally strong in the third, fifth, and tenth houses. The third reflects his communicative and adaptive nature. The fifth supports creative intelligence, education, and mantra practice. The tenth, considered his strongest position for career, supports public communication, commerce, and visible expertise. House strength alone does not decide outcomes, since sign, aspects, and dasha all contribute, but these placements give Budh a hospitable stage. [VERIFY: classical directional-strength tradition lists the 10th specifically]',
  },
  {
    question: 'Is Mercury retrograde the same in Vedic astrology as Western?',
    answer:
      'The astronomical phenomenon is identical, since Mercury’s apparent backward motion does not depend on tradition. Vedic interpretation differs in emphasis. Vedic astrologers consider retrograde a state where the planet’s energies turn inward and intensify, which can sometimes increase strength rather than weaken it. They also weigh the natal dignity, sign, and dasha heavily before drawing conclusions. The popular Western caution against signing contracts during retrograde is treated more carefully in classical Vedic practice.',
  },
  {
    question: 'Can I chant Budh mantra on any day?',
    answer:
      'Yes, sincere chanting is welcome on any day, and many people maintain a daily practice. Wednesday remains the traditional weekday for Budh, when devotees often perform a longer round of one hundred and eight repetitions, wear green, and offer simple seasonal items such as green moong or durva grass. The day amplifies the practice rather than restricts it. Consistency matters more than choosing the perfect day.',
  },
];

const notebookStyle = {
  backgroundImage: `linear-gradient(rgba(247,240,223,0.96), rgba(247,240,223,0.96)), url(${NOTEBOOK_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const stripeStyle = {
  backgroundImage: `linear-gradient(rgba(246,234,206,0.93), rgba(246,234,206,0.93)), url(${PARCHMENT_STRIPE_URL}), url(${STRIP_BG_URL})`,
  backgroundSize: 'cover, cover, cover',
  backgroundPosition: 'center',
};

const pageShellStyle = {
  backgroundImage: `linear-gradient(rgba(6,26,20,0.76), rgba(6,26,20,0.9)), url(${PAGE_NEBULA_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundAttachment: 'fixed',
  backgroundColor: '#061a14',
};

const StickyOval = () => (
  <svg viewBox="0 0 200 90" className="h-16 w-36 text-[#b3202a]" fill="none" stroke="currentColor" strokeWidth="3">
    <ellipse cx="100" cy="44" rx="82" ry="28" />
    <path d="M24 50c12-5 34-8 69-8 48 0 79 8 90 13" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 900 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 131.3) % 900;
      const y = (i * 83.7) % 600;
      const r = 0.8 + (((i * 17) % 9) / 9) * 1.6;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.65;
      return <circle key={i} cx={x} cy={y} r={r} fill="#d9f99d" opacity={opacity} />;
    })}
  </svg>
);

const MercuryOrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 900 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <ellipse cx="470" cy="290" rx="160" ry="118" fill="none" stroke="#22c55e" strokeWidth="1.1" strokeDasharray="5 8" opacity="0.32" />
    <ellipse cx="470" cy="290" rx="215" ry="156" fill="none" stroke="#86efac" strokeWidth="1" strokeDasharray="4 10" opacity="0.28" />
    <ellipse cx="470" cy="290" rx="280" ry="205" fill="none" stroke="#22c55e" strokeWidth="0.9" strokeDasharray="3 11" opacity="0.22" />
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
          <path d="M4 9c2-2 4.2-2.3 6.2-.8 1.5 1.1 3.1 1.1 4.7-.1 2-1.4 3.9-1.2 5.1.9" />
          <path d="M3 13c2.4-1.7 4.7-1.8 6.8-.3 1.4 1 2.8 1 4.2.1 2.3-1.6 4.5-1.4 6.8.3" />
          <path d="M5 17c1.9-1.1 3.7-1.1 5.5 0 1.1.7 2.2.7 3.3 0 1.9-1.1 3.8-1.1 5.7 0" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4.7" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" />
          <path d="M5 8.5 12 13l7-4.5M12 13v8" />
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
          <path d="m12 6 3 6h-6l3-6Zm0 6v5" />
        </svg>
      );
    case 'intellect':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M9 9.5a3 3 0 1 1 6 0c0 1.2-.5 1.8-1.3 2.4-.7.6-1.2 1.1-1.2 2.1h-1.2c0-1.3.5-2.1 1.3-2.7.8-.6 1.1-1 1.1-1.8a1.7 1.7 0 1 0-3.4 0H9Z" />
          <path d="M10 17h4M8 5.8A6.3 6.3 0 0 1 18 10c0 1.6-.5 2.8-1.5 3.8-.7.8-1.2 1.5-1.2 2.7h-6.6c0-1.2-.5-1.9-1.2-2.7A5.6 5.6 0 0 1 6 10a6 6 0 0 1 2-4.2Z" />
        </svg>
      );
    case 'governs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 18h16M6 18V8l6-4 6 4v10M9 12h6M9 15h6" />
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
          <path d="M12 4 18 8v8l-6 4-6-4V8l6-4Z" />
          <path d="M9.5 9.5h5v5h-5z" />
        </svg>
      );
    case 'benefit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.9">
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'practice':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3v18M3 12h18" />
          <circle cx="12" cy="12" r="5.5" />
        </svg>
      );
    case 'gem':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m7 4-3 5 8 11 8-11-3-5H7Z" />
          <path d="m9 4 3 5 3-5M4 9h16" />
        </svg>
      );
    case 'memory':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 5h10a2 2 0 0 1 2 2v12l-4-2-3 2-3-2-4 2V7a2 2 0 0 1 2-2Z" />
          <path d="M9 9h6M9 12h6" />
        </svg>
      );
    case 'wit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 4c3.8 0 7 3 7 6.8 0 2.8-1.7 5.2-4.2 6.3L12 20l-2.8-2c-2.5-1.1-4.2-3.5-4.2-6.3C5 7 8.2 4 12 4Z" />
          <path d="M9 10h6M10 13h4" />
        </svg>
      );
    case 'communication':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 18V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-2Z" />
          <path d="M8.5 9h7M8.5 12h5" />
        </svg>
      );
    case 'analysis':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 18h16M7 15V9M12 15V6M17 15v-3" />
          <circle cx="7" cy="8" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="11" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'learning':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 6.5 12 4l8 2.5L12 9 4 6.5Z" />
          <path d="M6 8.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V8.5" />
        </svg>
      );
    case 'adaptability':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 7c1.8-1.9 4.2-3 7-3v4l5-5-5-5v4c-3.9 0-7.3 1.5-9.8 4.2" transform="translate(0 5)" />
          <path d="M17 17c-1.8 1.9-4.2 3-7 3v-4l-5 5 5 5v-4c3.9 0 7.3-1.5 9.8-4.2" transform="translate(0 -5)" />
        </svg>
      );
    case 'faq':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5c0 1.5-1.2 2-2 2.6-.7.5-1 1-1 1.9" />
          <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

function Highlight({ children }: { children: string }) {
  return <span className="highlight-marker rounded px-1.5 py-0.5 text-slate-900">{children}</span>;
}

function getOfferingFallback(src: string, className: string) {
  const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (src.includes('moong')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M10 18c0-4.5 3.3-8 7.6-8 2.8 0 5.1 1.2 6.8 3.2-1 6.2-4.7 10-9.4 10-3 0-5-1.8-5-5.2Z" {...strokeProps} />
        <path d="M13.5 14.5c2 1 3.6 2.7 4.6 5" {...strokeProps} />
        <path d="M8.5 20.5c.7 1.7 2.1 2.9 4.1 3.5" {...strokeProps} />
      </svg>
    );
  }

  if (src.includes('tulsi')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M16 8v16" {...strokeProps} />
        <path d="M16 14c-4.2 0-7-2.7-7-6 4 0 7 2.3 7 6Z" {...strokeProps} />
        <path d="M16 14c4.2 0 7-2.7 7-6-4 0-7 2.3-7 6Z" {...strokeProps} />
        <path d="M16 21c-3.7 0-6.1-2.4-6.1-5.3 3.5 0 6.1 2 6.1 5.3Z" {...strokeProps} />
        <path d="M16 21c3.7 0 6.1-2.4 6.1-5.3-3.5 0-6.1 2-6.1 5.3Z" {...strokeProps} />
      </svg>
    );
  }

  if (src.includes('fruit-green')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <circle cx="13" cy="18" r="6.5" {...strokeProps} />
        <circle cx="19.5" cy="17" r="5.5" {...strokeProps} />
        <path d="M16 10c.2-2.5 1.5-4 3.8-4.8" {...strokeProps} />
        <path d="M16.5 8.5c1.5-1 3.2-1.2 5.1-.4-1 1.8-2.6 2.7-4.8 2.8" {...strokeProps} />
      </svg>
    );
  }

  if (src.includes('durva')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M8 24c4-2 6.4-6.4 7.1-13.2" {...strokeProps} />
        <path d="M12 24c2.9-2.1 4.6-5.8 5-10.9" {...strokeProps} />
        <path d="M16 24c1.7-1.9 2.8-4.7 3.1-8.5" {...strokeProps} />
        <path d="M15 13c-2.5-.3-4.6-1.6-6.4-3.9" {...strokeProps} />
        <path d="M17.2 15.5c2.3-.2 4.3-1.2 6-3.2" {...strokeProps} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 7c2.8 3.1 4.2 5.9 4.2 8.6 0 3.3-1.9 5.8-4.2 5.8s-4.2-2.5-4.2-5.8c0-2.7 1.4-5.5 4.2-8.6Z" {...strokeProps} />
      <path d="M10 21h12" {...strokeProps} />
      <path d="M12.5 24h7" {...strokeProps} />
    </svg>
  );
}

function cropOfferingSvg(svgText: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;
  const defs = root.querySelector('defs');
  const clipRect = root.querySelector('clipPath rect');
  const translatedGroups = Array.from(root.querySelectorAll('g[transform^="matrix(1, 0, 0, 1,"]'));
  const iconGroup = translatedGroups.at(-1);

  if (!clipRect || !iconGroup) {
    return null;
  }

  const width = clipRect.getAttribute('width') ?? '32';
  const height = clipRect.getAttribute('height') ?? '24';
  const clonedGroup = iconGroup.cloneNode(true) as SVGElement;
  clonedGroup.setAttribute('transform', 'matrix(1, 0, 0, 1, 0, 0)');

  const croppedSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">
      ${defs ? defs.outerHTML : ''}
      ${clonedGroup.outerHTML}
    </svg>
  `;

  return croppedSvg;
}

function OfferingIcon({
  src,
  alt,
  className = 'h-16 w-16',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load ${src}`);
        }
        const text = await response.text();
        const cropped = cropOfferingSvg(text);
        if (active) {
          setMarkup(cropped);
        }
      } catch {
        if (active) {
          setMarkup(null);
        }
      }
    };

    void loadSvg();

    return () => {
      active = false;
    };
  }, [src]);

  return (
    <div className={`${className} flex items-center justify-center text-[#166534]`} role="img" aria-label={alt}>
      {markup ? (
        <span
          className="block h-full w-full"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ) : (
        getOfferingFallback(src, 'h-full w-full')
      )}
    </div>
  );
}

function NotebookCard({
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
      className={`card-parchment relative overflow-hidden rounded-[30px] border border-[rgba(245,230,200,0.24)] p-5 text-[#26180d] shadow-[0_26px_60px_rgba(0,0,0,0.42),0_10px_24px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,248,232,0.55)] sm:p-6 ${rotate} ${className}`}
      style={notebookStyle}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/40 via-white/12 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.16),transparent_64%)]" />
      <div className="pointer-events-none absolute left-5 top-5 h-8 w-24 rounded-full border border-[#1f6a40]/12 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(73,43,19,0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-[10px] rounded-[24px] border border-[#7a5a37]/10" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function MercuryPage() {
  const [openFaq, setOpenFaq] = useState<number>(-1);

  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Budh (Mercury), The Awakened Intelligence',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-25',
        dateModified: '2026-04-26',
        url: '/planets/mercury',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Budh',
          'Mercury in Vedic astrology',
          'Budh mantra',
          'Budh dhyana mantra',
          'Budh beej mantra',
          'Mercury Gayatri Mantra',
          'Saumya Gayatri Mantra',
          'Emerald gemstone',
          'Mercury remedies',
          'communication planet',
        ],
      }),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Budh (Mercury)', url: '/planets/mercury' },
      ]),
      getWebPageSchema({
        name: 'Budh (Mercury), The Awakened Intelligence',
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
      }),
      getFaqPageSchemaFromList(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to chant the Mercury (Budha) Beej mantra',
        description:
          'Classical Vedic method for chanting the Budha Beej mantra as recommended by Soul Infinity Astro Solutions.',
        step: [
          { '@type': 'HowToStep', name: 'Purification', text: 'Bathe and wear clean clothes in the colour associated with Mercury (green).' },
          { '@type': 'HowToStep', name: 'Posture and direction', text: 'Sit facing north on a clean mat. Keep the spine straight.' },
          { '@type': 'HowToStep', name: 'Mala selection', text: 'Use an Emerald or green Sphatik mala of 108 beads. Hold in the right hand using thumb and middle finger.' },
          { '@type': 'HowToStep', name: 'Chanting', text: 'Chant Om Braam Breem Braum Sah Budhaya Namah 108 times per round with steady rhythm and clear pronunciation.' },
          { '@type': 'HowToStep', name: 'Completion', text: 'Sit quietly after completing rounds. Offer merit to the Budha deity and conclude with gratitude.' },
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
        <section
          className="relative overflow-hidden"
          style={pageShellStyle}
        >
          <img
            src={HERO_URL}
            alt="Illustration of Budh, the Mercury planet, in Vedic astrology by Soul Infinity Astro Solutions"
            width={1600}
            height={900}
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
          />
          <img
            src={SACRED_GEOMETRY_URL}
            alt="" aria-hidden="true"
            className="pointer-events-none absolute right-[6%] top-[6%] hidden h-[78%] w-[42%] object-contain opacity-[0.06] lg:block"
          />
          <div className="absolute inset-0 opacity-[0.08]">
            <NebulaDoodle className="absolute inset-0" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[42rem] sm:min-h-[48rem] lg:min-h-[52rem]">
              <Link
                to="/planets"
                aria-label="Back to Planets hub"
                className="relative z-20 inline-flex font-caveat text-lg text-[#d7f9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22c55e]"
              >
                ← Back to Planets
              </Link>

              <div className="relative z-10 max-w-2xl pt-8 sm:pt-12 lg:max-w-[44rem] lg:pt-16">
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#d7f9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat leading-[0.84]">
                  <span className="block text-[6.3rem] text-[#4ade80] drop-shadow-[0_0_34px_rgba(34,197,94,0.6)] sm:text-[7.9rem] lg:text-[9.1rem] xl:text-[9.8rem]">
                    Budh
                  </span>
                  <span className="mt-4 block text-4xl leading-none text-[#fff6de] drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-[4rem]">
                    The Awakened Intelligence
                  </span>
                </h1>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#fff6de] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-4xl">बुध</div>
                  <div className="font-kalam text-2xl text-[#d7f9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-3xl">(Mercury)</div>
                </div>

                <div className="mt-8 max-w-[34rem] space-y-3 font-kalam text-[1.75rem] leading-relaxed text-[#fff6de] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-[2rem]">
                  <p>
                    Budh refines <Highlight>intellect</Highlight> and <Highlight>communication</Highlight>.
                  </p>
                  <p>
                    He sharpens <Highlight>logic</Highlight> and teaches graceful{' '}
                    <Highlight>adaptability</Highlight>.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <MercuryOrbitDoodle className="absolute inset-0 opacity-95" />
                <img src={FEATHER_URL} alt="" aria-hidden="true" className="absolute left-[7%] top-[12%] h-24 w-24 opacity-24" />
                <img src={FEATHER_URL} alt="" aria-hidden="true" className="absolute right-[10%] top-[18%] h-20 w-20 rotate-[20deg] opacity-18" />
              </div>

              <div className="relative z-10 mt-10 lg:absolute lg:bottom-5 lg:left-1/2 lg:w-full lg:max-w-6xl lg:-translate-x-1/2">
                <div className="rounded-[24px] bg-[#f8ecd2]/96 p-2.5 shadow-[0_18px_40px_rgba(89,60,25,0.18)] sm:p-3">
                  <div
                    className="rounded-[20px] px-2 py-2"
                    style={stripeStyle}
                  >
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                      {quickFacts.map((fact, index) => (
                        <div
                          key={fact.label}
                          className={`flex min-h-[98px] flex-col items-center justify-center px-2.5 py-2.5 text-center sm:min-h-[108px] ${
                            index < quickFacts.length - 1 ? 'lg:border-r lg:border-[#755632]/22' : ''
                          }`}
                        >
                          <div className="text-[#173f28]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                          <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.85rem]">
                            {fact.label}
                          </div>
                          <div className="mt-1 font-kalam text-[0.98rem] leading-tight text-[#166534] sm:text-[1.08rem]">
                            {fact.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside
          aria-label="Quick summary of Budh"
          className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-10"
        >
          <div
            className="rounded-[24px] border border-[#1f6a40]/20 px-6 py-5 shadow-[0_10px_30px_rgba(20,80,40,0.10)] sm:px-8 sm:py-6"
            style={notebookStyle}
          >
            <div className="mb-2 font-caveat text-2xl leading-none text-[#166534]">In Brief</div>
            <p className="font-kalam text-[1.2rem] leading-relaxed text-[#2a190f] sm:text-[1.35rem]">
              Budh is the Vedic significator of intellect, communication, and discernment. It governs learning, speech, commerce, and analytical thought. Devotees seek Budh&apos;s blessings for sharper intelligence, clear expression, and success in study and trade.
            </p>
          </div>
        </aside>

        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-10">
            <div className="mt-2 grid gap-5 xl:items-start xl:grid-cols-[1.18fr_0.82fr]">
              <NotebookCard className="h-fit self-start" rotate="xl:-rotate-[0.5deg]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-[#1f6a40]/15 bg-white/45 px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                      <span className="font-devanagari text-4xl text-[#1f140d]">ॐ</span>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                        Sacred Mantras
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-[3px] w-56 rounded-full bg-gradient-to-r from-[#15803d] via-[#4ade80] to-transparent" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#1d402b]/75">
                    <img src={FEATHER_URL} alt="" aria-hidden="true" className="h-12 w-12 opacity-65" />
                    {iconSvg('communication', 'h-8 w-8')}
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra) => (
                    <div key={mantra.title}>
                      <div className="inline-flex items-center gap-3 rounded-full bg-[#e7f7eb] px-4 py-2 shadow-[0_8px_18px_rgba(34,197,94,0.12)]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#22c55e]/25 bg-white text-[1.3rem] font-caveat leading-none text-[#15803d]">
                          1
                        </span>
                        <div className="font-caveat text-[2rem] leading-none text-[#15803d] sm:text-[2.35rem]">
                          {mantra.title}
                        </div>
                      </div>

                      <div className="mt-5 rounded-[22px] border-2 border-[#b3202a]/85 bg-[linear-gradient(180deg,rgba(250,241,219,0.98),rgba(246,235,214,0.98))] px-5 py-5 shadow-[0_14px_30px_rgba(179,32,42,0.08),inset_0_0_24px_rgba(34,197,94,0.08)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.1rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div className="rounded-2xl bg-white/35 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                          <span className="font-semibold text-[#166534]">IAST:</span> {mantra.iast}
                        </div>
                        <div className="rounded-2xl bg-white/30 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]">
                          <span className="font-semibold text-[#166534]">Meaning:</span> {mantra.meaning}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visible matching content for HowTo schema (Google policy). */}
                <div className="mt-8 rounded-[18px] border border-[#8c6e47]/30 bg-[#f6ebd6]/60 px-5 py-4">
                  <div className="font-caveat text-[1.7rem] leading-none text-[#15803d] sm:text-[2rem]">
                    How to Chant the Budha Beej Mantra
                  </div>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 font-kalam text-lg leading-relaxed text-[#2d1e13]">
                    <li>Bathe and wear clean clothes in green.</li>
                    <li>Sit facing north on a clean mat with the spine straight.</li>
                    <li>Hold an Emerald or green Sphatik mala of 108 beads in the right hand using thumb and middle finger.</li>
                    <li>Chant the Beej mantra 108 times per round with steady rhythm.</li>
                    <li>Sit quietly afterwards and offer the merit to Budha with gratitude.</li>
                  </ol>
                </div>

                {/* Offerings section, added in Mercury, retrofit Sun/Moon in follow-up pass. */}
                <div className="mt-10 border-t border-[#7b603e]/20 pt-8">
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#edf8ef] px-4 py-2 shadow-[0_8px_18px_rgba(34,197,94,0.12)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                    <div className="font-kalam text-[1.4rem] uppercase tracking-[0.12em] text-[#166534]">
                    Offerings
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
                    {[
                      { src: MOONG_URL, label: 'Green Moong' },
                      { src: TULSI_URL, label: 'Tulsi Leaves' },
                      { src: GREEN_FRUIT_URL, label: 'Green Fruits' },
                      { src: DURVA_URL, label: 'Durva Grass' },
                      { src: GHEE_LAMP_URL, label: 'Ghee Lamp' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col items-center rounded-[20px] border border-[#1f6a40]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(248,241,222,0.5))] px-2 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(235,249,237,0.96)_44%,rgba(187,247,208,0.82)_100%)] shadow-[0_10px_22px_rgba(34,197,94,0.14)]">
                          <OfferingIcon src={item.src} alt={item.label} className="h-12 w-12" />
                        </div>
                        <div className="mt-2 font-caveat text-[1.35rem] leading-tight text-[#2b1a0f]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#7b603e]/20 pt-6 space-y-5">
                  <div className="rounded-[20px] border border-[#1f6a40]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(231,247,235,0.55))] px-5 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                    <div className="font-caveat text-[2.1rem] leading-tight text-[#15803d] sm:text-[2.5rem]">
                      Wear green. Speak true. Honour Budh.
                    </div>
                    <div className="mt-2 font-kalam text-base leading-snug text-[#2b1a0f]/70">
                      A small Wednesday rhythm to keep Budh close.
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#15803d]/45 to-transparent" />
                    <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="h-10 w-10 opacity-65" />
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#15803d]/45 to-transparent" />
                  </div>

                  <div className="rounded-[18px] border border-[#1f6a40]/12 bg-white/35 px-5 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    <div className="font-kalam text-base leading-relaxed text-[#2b1a0f]/85">
                      Offerings carry intention. The smallest gesture, repeated with sincerity, ripens the mind faster than a grand ritual performed once.
                    </div>
                  </div>
                </div>

                <img
                  src={FEATHER_URL}
                  alt="" aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-2 hidden h-40 w-auto opacity-80 lg:block"
                />
              </NotebookCard>

              <div className="grid gap-6">
                <NotebookCard rotate="xl:rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Budh in Our Life
                      </h3>
                      <div className="mt-3 h-[3px] w-40 rounded-full bg-gradient-to-r from-[#15803d] via-[#4ade80] to-transparent" />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f7eb] text-[#166534] shadow-[0_10px_22px_rgba(34,197,94,0.12)]">{iconSvg('intellect', 'h-8 w-8')}</div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 rounded-2xl border border-[#745834]/10 bg-white/24 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7ec] text-[#166534] shadow-[0_8px_16px_rgba(34,197,94,0.12)]">{iconSvg(row.icon, 'h-5 w-5')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#166534]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <img src={FEATHER_URL} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 opacity-25" />
                </NotebookCard>

                <NotebookCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Budh Mantra
                      </h3>
                      <div className="mt-3 h-[3px] w-44 rounded-full bg-gradient-to-r from-[#22c55e] via-[#86efac] to-transparent" />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f7eb] text-[#166534] shadow-[0_10px_22px_rgba(34,197,94,0.12)]">{iconSvg('benefit', 'h-8 w-8')}</div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white/24 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ecfaef] text-[#22c55e] shadow-[0_8px_16px_rgba(34,197,94,0.12)]">{iconSvg('benefit', 'h-4.5 w-4.5')}</div>
                        <p className="font-kalam text-xl leading-relaxed text-[#29190f]">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </NotebookCard>
              </div>
            </div>

            <div className="mt-6">
              <NotebookCard rotate="lg:-rotate-[0.25deg]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    How to Connect with Budh
                  </h3>
                  <div className="flex items-center gap-2">
                    <OfferingIcon src={MOONG_URL} alt="Green moong offering" className="h-10 w-10" />
                    <OfferingIcon src={DURVA_URL} alt="Durva grass offering" className="h-10 w-10" />
                  </div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-5">
                  {connectPractices.map((practice, index) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 flex items-center gap-2 text-[#166534]">
                        {iconSvg('practice', 'h-6 w-6')}
                        {index === 1 ? (
                          <OfferingIcon src={MOONG_URL} alt="Green moong offering" className="h-6 w-6" />
                        ) : null}
                        {index === 2 ? <img src={RING_URL} alt="" aria-hidden="true" className="h-6 w-6 rounded-full object-cover" /> : null}
                      </div>
                      <p className="font-kalam text-lg leading-relaxed text-[#2a190f]">{practice}</p>
                    </div>
                  ))}
                </div>
              </NotebookCard>
            </div>

            <div className="mt-6">
              <div
                className="relative overflow-hidden rounded-[28px] border border-[#7b603e]/25 px-6 py-8 shadow-[0_20px_55px_rgba(0,0,0,0.18)] sm:px-8"
                style={stripeStyle}
              >
                <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: `url(${BG_SMALL_URL})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <div>
                    <div className="font-caveat text-4xl text-[#2b1a0f] sm:text-5xl">A Mind in Devotion</div>
                    <p className="mt-3 max-w-xl font-kalam text-xl leading-relaxed text-[#2a190f]">
                      Budh becomes luminous when intelligence serves wisdom, and language serves truth.
                    </p>
                  </div>
                  <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52">
                    <img src={MANDALA_URL} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full rounded-full object-cover opacity-18 mix-blend-multiply" />
                    <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="absolute inset-[12%] h-[76%] w-[76%] object-contain opacity-90" />
                  </div>
                  <div className="space-y-4 text-center lg:text-right">
                    <div className="font-caveat text-3xl text-[#2b1a0f] sm:text-4xl">
                      Let wisdom guide the word, and let silence sharpen the mind.
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                      <OfferingIcon src={MOONG_URL} alt="Green moong offering" className="h-14 w-14" />
                      <OfferingIcon src={GREEN_FRUIT_URL} alt="Green fruits offering" className="h-14 w-14" />
                      <OfferingIcon src={TULSI_URL} alt="Tulsi leaves offering" className="h-14 w-14" />
                      <OfferingIcon src={GHEE_LAMP_URL} alt="Ghee lamp offering" className="h-14 w-14" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
              <NotebookCard rotate="xl:-rotate-[0.55deg]">
                <div className="text-center">
                  <div className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Gemstone: Emerald
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#166534]">Panna</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <img src={OVAL_BORDER_URL} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-85" />
                  <div className="rounded-[24px] bg-[#07140c] p-2 shadow-[0_14px_28px_rgba(0,0,0,0.3)]">
                    <img
                      src={RING_URL}
                      alt="Emerald ring associated with Budh"
                      className="mx-auto w-full rounded-[18px] object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Strengthens Budh blessings. Wear in silver or bronze on the little finger of the right hand on Wednesday morning, after offering it to Budh with the mantra.
                </div>
              </NotebookCard>

              <div className="relative overflow-hidden rounded-[28px] border border-[rgba(245,230,200,0.22)] bg-[linear-gradient(180deg,rgba(248,237,213,0.98),rgba(240,224,194,0.96))] p-6 text-[#1f130b] shadow-[0_24px_55px_rgba(0,0,0,0.34),0_10px_22px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,248,232,0.55)] sm:p-8 xl:rotate-[0.45deg]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.38),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(106,71,34,0.14),transparent_28%)]" />
                <img src={STICKY_NOTE_URL} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply" />
                <div className="tape-decoration hidden sm:block" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <StickyOval />
                      <h3 className="-mt-3 font-caveat text-4xl leading-none text-[#7c1d1d] sm:text-5xl">
                        Affirmation
                      </h3>
                    </div>
                    <div className="rounded-full bg-[#ecfaef] p-2 text-[#166534] shadow-[0_10px_22px_rgba(34,197,94,0.12)]">{iconSvg('wit', 'h-8 w-8')}</div>
                  </div>
                  <div className="mt-8 rounded-[22px] bg-white/24 px-4 py-5 font-kalam text-[2rem] leading-snug text-[#2b1a0f] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] sm:text-[2.35rem]">
                    “I think clearly, I speak wisely, I learn constantly, and I create my own path.”
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 w-full rounded-[30px] border border-[#7c6746]/25 bg-[#f6ead0]/95 px-5 py-6 shadow-[0_20px_50px_rgba(89,60,25,0.16)] sm:px-8">
              <div className="grid w-full gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 font-devanagari text-4xl text-[#166534]">ॐ</div>
                  <div>
                    <div className="font-devanagari text-3xl text-[#2b1a0f] sm:text-4xl">ॐ बुं बुधाय नमः॥</div>
                    <div className="mt-2 font-kalam text-xl text-[#2b1a0f]/80 sm:text-2xl">
                      Om Buṁ Budhāya Namaḥ.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="h-16 w-16 opacity-70" />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent" />
                </div>

                <div className="flex items-center justify-between gap-4 lg:justify-end">
                  <div className="max-w-sm text-left lg:text-right">
                    <div className="font-caveat text-3xl text-[#2b1a0f] sm:text-4xl">
                      Use your mind as a tool, not as a trap.
                    </div>
                  </div>
                  <img src={DIYA_URL} alt="" aria-hidden="true" className="h-16 w-16 shrink-0" />
                </div>
              </div>

              <div className="mt-8 border-t border-[#7c6746]/20 pt-6">
                <div className="text-center font-caveat text-3xl text-[#2b1a0f] sm:text-4xl">
                  Budh&apos;s 7 Attributes of Intelligence
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-3 xl:grid-cols-7">
                  {attributes.map((attribute) => (
                    <div key={attribute.title} className="rounded-2xl border border-[#7c6746]/20 bg-white/35 px-3 py-4">
                      <div className="mx-auto w-fit text-[#22c55e] drop-shadow-[0_0_10px_rgba(34,197,94,0.18)]">
                        {iconSvg(attribute.icon, 'h-8 w-8')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#2b1a0f]">
                        {attribute.title}
                      </div>
                      <div className="mt-1 text-sm leading-snug text-[#2b1a0f]/70">{attribute.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-8" />
          </div>
        </section>

        <section
          id="mercury-seo-body"
          className="relative overflow-hidden bg-[#f4ecda] py-20 text-[#26180d]"
        >
          <div
            className="absolute inset-0 opacity-65"
            style={{
              backgroundImage: `linear-gradient(rgba(244,236,218,0.92), rgba(244,236,218,0.92)), url(${PARCHMENT_STRIPE_URL})`,
              backgroundSize: "780px",
              backgroundPosition: "center",
            }}
          />

          <img
            src={FEATHER_URL}
            alt="" aria-hidden="true"
            className="pointer-events-none absolute right-6 top-24 hidden h-24 w-24 opacity-15 lg:block"
          />
          <img
            src={SACRED_GEOMETRY_URL}
            alt="" aria-hidden="true"
            className="pointer-events-none absolute left-8 top-[36rem] hidden h-20 w-20 opacity-15 lg:block"
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-12">
                {editorialSections.map((section, index) => (
                  <div key={section.title}>
                    <h2 className="font-caveat text-4xl leading-none text-[#166534] sm:text-5xl">
                      {section.title}
                    </h2>
                    <div className="mt-3 h-[3px] w-36 rounded-full bg-gradient-to-r from-green-700 via-green-400 to-transparent" />
                    <div className="mt-6 space-y-4 text-lg leading-8 text-[#332117]">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          className={paragraphIndex === 0 ? "drop-cap" : undefined}
                          style={
                            paragraphIndex === 0
                              ? ({ ["--accent-color" as string]: "#22c55e" } as CSSProperties)
                              : undefined
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {index === 1 ? (
                      <div
                        className="mt-8 rounded-[28px] border border-[#7c6746]/25 p-6 shadow-[0_18px_35px_rgba(56,40,22,0.12)]"
                        style={notebookStyle}
                      >
                        <div className="font-caveat text-3xl leading-tight text-[#166534]">
                          Use your mind as a tool, not as a trap.
                        </div>
                        <div className="mt-2 font-kalam text-base text-[#3a271a]/70">
                          A reflection often offered alongside the wisdom of Budh.
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <aside className="space-y-6 lg:sticky lg:top-24">
                  <NotebookCard rotate="lg:rotate-[0.35deg]">
                    <div className="flex items-start gap-3">
                      <div className="text-[#166534]">{iconSvg('faq', 'h-7 w-7')}</div>
                      <div>
                        <h3 className="font-caveat text-4xl leading-none text-[#1a110a]">
                          Mercurial Notes
                        </h3>
                        <p className="mt-2 font-kalam text-lg leading-relaxed text-[#2a190f]">
                          Budh does not ask for cleverness on demand. He asks whether your speech reflects your thought, and whether your thought has been refined by attention.
                        </p>
                      </div>
                    </div>
                  </NotebookCard>

                  <NotebookCard rotate="lg:-rotate-[0.3deg]">
                    <div className="font-caveat text-4xl leading-none text-[#1a110a]">
                      Core Associations
                    </div>
                    <div className="mt-4 space-y-3 font-kalam text-lg leading-relaxed text-[#2a190f]">
                      <div>
                        <span className="font-semibold text-[#166534]">Karaka:</span> Intellect, speech, commerce, learning
                      </div>
                      <div>
                        <span className="font-semibold text-[#166534]">Natural Signs:</span> Mithuna (Gemini), Kanya (Virgo)
                      </div>
                      <div>
                        <span className="font-semibold text-[#166534]">Temperament:</span> Quick, adaptable, neutral
                      </div>
                      <div>
                        <span className="font-semibold text-[#166534]">Colour:</span> Green, fresh tones
                      </div>
                      <div>
                        <span className="font-semibold text-[#166534]">Lifestyle Medicine:</span> Study, rhythm, honest exchange
                      </div>
                    </div>
                  </NotebookCard>

                  <div className="rounded-[28px] border border-white/10 bg-[#06231a]/95 p-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.32)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-caveat text-4xl leading-none text-[#bbf7d0]">
                          Closing Thought
                        </div>
                        <div className="mt-2 font-kalam text-lg text-white/75">
                          A simple invocation to let the page settle.
                        </div>
                      </div>
                      <img src={DIYA_URL} alt="" aria-hidden="true" className="h-16 w-16" />
                    </div>
                    <div className="mt-5 font-caveat text-3xl text-[#bbf7d0]">
                      Speak less. Mean more.
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-white/60">
                      Budh is honoured most by speech that has been weighed, not by speech that has been rehearsed.
                    </div>
                  </div>

                  <NotebookCard rotate="lg:-rotate-[0.5deg]">
                    <div>
                      <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                        More Mantras for Budh
                      </h3>
                      <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                      <p className="mt-2 font-caveat text-xl leading-snug text-[#3a271a]/80">
                        Two additional Vedic chants to deepen your connection with Budh.
                      </p>
                    </div>

                    <div className="mt-5">
                      <div className="font-kalam text-[1.15rem] font-semibold text-[#166534]">
                        Mercury Gayatri Mantra
                      </div>
                      <div className="mt-2 rounded-[16px] border-2 border-[#b3202a]/85 bg-[linear-gradient(180deg,rgba(250,241,219,0.98),rgba(246,235,214,0.98))] px-4 py-3 shadow-[0_8px_20px_rgba(179,32,42,0.08),inset_0_0_18px_rgba(34,197,94,0.08)]">
                        <div className="font-devanagari text-[1.45rem] leading-snug text-[#2b1a0f]">
                          ॐ चन्द्रपुत्राय विद्महे रोहिणीप्रियाय धीमहि।
                          <br />
                          तन्नो बुधः प्रचोदयात्॥
                        </div>
                      </div>
                      <div className="mt-2 text-[14px] italic leading-snug text-[#2b1a0f]/80">
                        Oṁ Chandraputrāya Vidmahe Rohiṇīpriyāya Dhīmahi
                        <br />
                        Tanno Budhaḥ Prachodayāt
                      </div>
                      <div className="mt-2 text-[14px] leading-snug text-[#2b1a0f]">
                        We meditate on the son of the Moon, the beloved of Rohini. May Budh awaken our higher intellect.
                      </div>
                      <div className="mt-2 font-caveat text-[1rem] leading-snug text-[#166534]">
                        Chant facing North on Wednesday morning. 11 or 108 repetitions.
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="font-kalam text-[1.15rem] font-semibold text-[#166534]">
                        Saumya Gayatri Mantra
                      </div>
                      <div className="mt-2 rounded-[16px] border-2 border-[#b3202a]/85 bg-[linear-gradient(180deg,rgba(250,241,219,0.98),rgba(246,235,214,0.98))] px-4 py-3 shadow-[0_8px_20px_rgba(179,32,42,0.08),inset_0_0_18px_rgba(34,197,94,0.08)]">
                        <div className="font-devanagari text-[1.45rem] leading-snug text-[#2b1a0f]">
                          ॐ सौम्यरूपाय विद्महे वाणीशाय धीमहि।
                          <br />
                          तन्नो सौम्यः प्रचोदयात्॥
                        </div>
                      </div>
                      <div className="mt-2 text-[14px] italic leading-snug text-[#2b1a0f]/80">
                        Oṁ Saumyarūpāya Vidmahe Vāṇīśāya Dhīmahi
                        <br />
                        Tanno Saumyaḥ Prachodayāt
                      </div>
                      <div className="mt-2 text-[14px] leading-snug text-[#2b1a0f]">
                        We meditate on the gentle one, the lord of speech. May the benevolent Budh awaken refined expression within us.
                      </div>
                      <div className="mt-2 font-caveat text-[1rem] leading-snug text-[#166534]">
                        Especially helpful for those seeking clarity in speech, writing, or teaching.
                      </div>
                    </div>
                  </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a]">
                    Quick Facts
                  </h3>
                  <div className="mt-4 space-y-2.5 font-kalam text-lg leading-relaxed text-[#2a190f]">
                    <div>
                      <span className="font-semibold text-[#166534]">Element:</span> Air
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Day:</span> Wednesday (Budhavara)
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Direction:</span> North
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Number:</span> 5 [VERIFY: numerology varies between systems]
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Friends:</span> Surya (Sun), Shukra (Venus)
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Enemy:</span> Chandra (Moon)
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Mahadasha:</span> 17 years
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Body domain:</span> Speech, skin, nervous system
                    </div>
                  </div>
                </NotebookCard>

                  <NotebookCard rotate="lg:rotate-[0.3deg]">
                    <div className="relative">
                      <img
                        src={SACRED_GEOMETRY_URL}
                        alt="" aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 opacity-20"
                      />
                      <div className="font-caveat text-2xl italic leading-tight text-[#166534]/75">
                        A line worth carrying
                      </div>
                      <blockquote className="mt-3 font-caveat text-[2.1rem] leading-tight text-[#1a110a] sm:text-[2.4rem]">
                        When the mind is recognised as an instrument, intellect becomes graceful.
                      </blockquote>
                      <div className="mt-3 font-kalam text-sm leading-relaxed text-[#3a271a]/70">
                        Drawn from the closing reflection above, this is the heart of what Budh asks of any practitioner.
                      </div>
                    </div>
                  </NotebookCard>

                  <NotebookCard rotate="lg:rotate-[0.25deg]">
                    <h3 className="font-caveat text-4xl leading-none text-[#1a110a]">
                      Did You Know?
                    </h3>
                    <p className="mt-3 font-kalam text-lg leading-relaxed text-[#2a190f]">
                      In Puranic narrative, Budh is celebrated as the progenitor of the Chandravamsha, the lunar dynasty, through his son Pururavas. Many of the great kings and sages of classical literature are said to trace their line back to this beginning. [VERIFY: lineage details vary across Puranic sources]
                    </p>
                  </NotebookCard>

                  <NotebookCard rotate="lg:-rotate-[0.4deg]">
                    <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                      Budh&apos;s Friends and Enemies
                    </h3>
                    <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                    <table className="mt-4 w-full border-collapse font-kalam text-base leading-snug text-[#2a190f]">
                      <caption className="sr-only">Planetary relationships of Budh in Vedic astrology</caption>
                      <tbody>
                        <tr>
                          <th scope="row" className="py-1.5 pr-3 text-left align-top text-[0.95rem] font-semibold uppercase tracking-wide text-[#166534]">Friendly</th>
                          <td className="py-1.5 align-top">Surya (Sun), Shukra (Venus), Rahu (North Node)</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-1.5 pr-3 text-left align-top text-[0.95rem] font-semibold uppercase tracking-wide text-[#b45309]">Enemy</th>
                          <td className="py-1.5 align-top">Chandra (Moon)</td>
                        </tr>
                        <tr>
                          <th scope="row" className="py-1.5 pr-3 text-left align-top text-[0.95rem] font-semibold uppercase tracking-wide text-[#3a271a]/70">Neutral</th>
                          <td className="py-1.5 align-top">Mangala (Mars), Guru (Jupiter), Shani (Saturn)</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="mt-4 font-caveat text-lg leading-snug text-[#3a271a]/80">
                      These relationships shape how Budh behaves in conjunction with other planets.
                    </p>
                  </NotebookCard>

                  <NotebookCard rotate="lg:rotate-[0.3deg]">
                    <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                      Signs of a Strong Budh
                    </h3>
                    <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                    <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                      {[
                        'Sharp wit and quick comprehension',
                        'Clear, persuasive speech',
                        'Strong memory and academic ease',
                        'Success in trade, writing, or analysis',
                        'Good humour and adaptability',
                        'Healthy skin and steady nerves',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg
                            viewBox="0 0 24 24"
                            className="mt-1 h-4 w-4 shrink-0 text-[#22c55e]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                          >
                            <path d="m4 12 5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </NotebookCard>

                  <NotebookCard rotate="lg:-rotate-[0.25deg]">
                    <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                      Signs of a Weakened Budh
                    </h3>
                    <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-transparent" />
                    <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                      {[
                        'Difficulty in expressing thoughts',
                        'Confusion under pressure',
                        'Speech impediments or stuttering',
                        'Skin issues and nervous tension',
                        'Trouble with paperwork and contracts',
                        'Indecision and overthinking',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg
                            viewBox="0 0 24 24"
                            className="mt-1 h-4 w-4 shrink-0 text-[#b45309]"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="4" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-caveat text-base leading-snug text-[#3a271a]/80">
                      These are tendencies that may benefit from Budh remedies, not certainties. A qualified Jyotishi can confirm through chart analysis.
                    </p>
                  </NotebookCard>

                  <NotebookCard rotate="lg:rotate-[0.4deg]">
                    <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                      Budh in Houses at a Glance
                    </h3>
                    <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                    <div className="mt-4 space-y-1.5 text-sm leading-snug text-[#2a190f]">
                      <div><span className="font-semibold text-[#166534]">1st:</span> Intellect, communication-driven personality</div>
                      <div><span className="font-semibold text-[#166534]">2nd:</span> Wealth through speech, strong family voice</div>
                      <div><span className="font-semibold text-[#166534]">3rd:</span> Writing, courage in expression (own house)</div>
                      <div><span className="font-semibold text-[#166534]">4th:</span> Education, peaceful home, mother&apos;s intellect</div>
                      <div><span className="font-semibold text-[#166534]">5th:</span> Strong intellect, academic children</div>
                      <div><span className="font-semibold text-[#166534]">6th:</span> Victory in litigation, sharp problem-solving (a strong house for Budh)</div>
                      <div><span className="font-semibold text-[#166534]">7th:</span> Articulate spouse, partnership in commerce</div>
                      <div><span className="font-semibold text-[#166534]">8th:</span> Research, occult studies, hidden knowledge</div>
                      <div><span className="font-semibold text-[#166534]">9th:</span> Higher education, philosophical intelligence</div>
                      <div><span className="font-semibold text-[#166534]">10th:</span> Career in writing, trade, communication</div>
                      <div><span className="font-semibold text-[#166534]">11th:</span> Gains through commerce, intellectual circles</div>
                      <div><span className="font-semibold text-[#166534]">12th:</span> Subconscious mind, foreign learning, dream insight</div>
                    </div>
                  </NotebookCard>

                  <NotebookCard rotate="lg:-rotate-[0.3deg]">
                    <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                      Mahadasha at a Glance
                    </h3>
                    <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                    <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                      <div><span className="font-semibold text-[#166534]">Total duration:</span> 17 years</div>
                      <div><span className="font-semibold text-[#166534]">Best for:</span> Education, business, writing, technology, trade</div>
                      <div><span className="font-semibold text-[#166534]">Watch for:</span> Periods when Budh is afflicted in transit or in the natal chart</div>
                      <div><span className="font-semibold text-[#166534]">First sub-period:</span> Budh-Budh (about 2 years 5 months)</div>
                      <div><span className="font-semibold text-[#166534]">Last sub-period:</span> Budh-Mars</div>
                    </div>
                    <p className="mt-4 font-caveat text-lg leading-snug text-[#166534]">
                      Budh dasha rewards those who keep their mind sharp and honest.
                    </p>
                  </NotebookCard>

                  <NotebookCard rotate="lg:rotate-[0.2deg]">
                    <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                      Wednesday Practice
                    </h3>
                    <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                    <div className="mt-4 space-y-4 font-kalam text-base leading-snug text-[#2a190f]">
                      <div>
                        <div className="font-kalam text-[0.95rem] font-semibold uppercase tracking-wide text-[#166534]">
                          Morning
                        </div>
                        <ul className="mt-1 space-y-1">
                          <li>Bathe before sunrise</li>
                          <li>Wear green</li>
                          <li>Light a green-wicked diya</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-kalam text-[0.95rem] font-semibold uppercase tracking-wide text-[#166534]">
                          Worship
                        </div>
                        <ul className="mt-1 space-y-1">
                          <li>Face North</li>
                          <li>Chant Budh mantra 11 or 108 times</li>
                          <li>Offer green moong or durva grass</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-kalam text-[0.95rem] font-semibold uppercase tracking-wide text-[#166534]">
                          Throughout the day
                        </div>
                        <ul className="mt-1 space-y-1">
                          <li>Speak only what is true and necessary</li>
                          <li>Read or learn something new</li>
                          <li>Avoid gossip and trivial conversation</li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4 font-caveat text-base leading-snug text-[#3a271a]/80">
                      Consistency over intensity. A small practice done weekly outweighs a grand ritual done once.
                    </p>
                  </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.35deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Budh&apos;s Nakshatras
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <p className="mt-3 font-kalam text-base leading-snug text-[#2a190f]">
                    Three nakshatras carry Budh&apos;s lordship, one each in the water-element pada of three signs.
                  </p>
                  <div className="mt-3 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#166534]">Ashlesha:</span> the embracing serpent, hidden insight, esoteric study</div>
                    <div><span className="font-semibold text-[#166534]">Jyeshtha:</span> the elder, leadership through wisdom, sharp counsel</div>
                    <div><span className="font-semibold text-[#166534]">Revati:</span> the wealthy, kindness, fullness, gentle completion</div>
                  </div>
                  <p className="mt-3 font-caveat text-sm leading-snug text-[#3a271a]/70">
                    [VERIFY: nakshatra rulerships per Vimshottari tradition]
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Compatibility in Conjunction
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <div className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <div><span className="font-semibold text-[#166534]">with Surya:</span> bright but combust risk if too close</div>
                    <div><span className="font-semibold text-[#166534]">with Chandra:</span> emotional intelligence, gentle expression</div>
                    <div><span className="font-semibold text-[#166534]">with Mangala:</span> sharp argument, courageous speech</div>
                    <div><span className="font-semibold text-[#166534]">with Guru:</span> scholarly wisdom, teaching aptitude</div>
                    <div><span className="font-semibold text-[#166534]">with Shukra:</span> charm, art, articulate beauty</div>
                    <div><span className="font-semibold text-[#166534]">with Shani:</span> discipline, structured intellect</div>
                  </div>
                  <p className="mt-4 font-caveat text-base leading-snug text-[#3a271a]/80">
                    [VERIFY: conjunction effects vary across schools]
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.4deg]">
                  <div className="font-caveat text-2xl italic leading-tight text-[#166534]/75">
                    A line worth carrying
                  </div>
                  <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.2rem]">
                    Genuine intelligence does not require display.
                  </blockquote>
                  <div className="mt-3 font-kalam text-sm leading-relaxed text-[#3a271a]/70">
                    Drawn from the section on Budh&apos;s symbolism, this is the temperament Budh refines in any chart he touches.
                  </div>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.25deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Budh and Education
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <ul className="mt-4 space-y-2 font-kalam text-base leading-snug text-[#2a190f]">
                    <li><span className="font-semibold text-[#166534]">4th house Budh:</span> foundational learning, school excellence</li>
                    <li><span className="font-semibold text-[#166534]">5th house Budh:</span> creative scholarship, mantra ease</li>
                    <li><span className="font-semibold text-[#166534]">9th house Budh:</span> higher learning, philosophy, abroad study</li>
                    <li><span className="font-semibold text-[#166534]">Budh-Guru periods:</span> classically favourable for exams and degrees</li>
                  </ul>
                  <p className="mt-4 font-caveat text-base leading-snug text-[#166534]">
                    Study facing East at sunrise on Wednesdays for steady absorption.
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Budh&apos;s Yogas
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <div className="mt-4 space-y-3 font-kalam text-base leading-snug text-[#2a190f]">
                    <div>
                      <span className="font-semibold text-[#166534]">Bhadra Yoga:</span> Budh in Mithuna or Kanya in a kendra (1, 4, 7, 10) from the lagna or Moon. Strong articulate intellect.
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Bhadra Mahapurusha Yoga:</span> a variant of the Pancha Mahapurusha set, indicating exceptional Budh-driven temperament.
                    </div>
                    <div>
                      <span className="font-semibold text-[#166534]">Saraswati Yoga:</span> Budh, Guru, and Shukra placed together in benefic positions, classically associated with learning and the arts.
                    </div>
                  </div>
                  <p className="mt-3 font-caveat text-sm leading-snug text-[#3a271a]/70">
                    [VERIFY: yoga formulas across Parashari, BNN, and Jaimini schools]
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Modern Careers Strong Budh Supports
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <ul className="mt-4 grid grid-cols-1 gap-1.5 font-kalam text-base leading-snug text-[#2a190f] sm:grid-cols-2">
                    <li>Software engineers</li>
                    <li>Writers and editors</li>
                    <li>Lawyers and mediators</li>
                    <li>Accountants and analysts</li>
                    <li>Teachers and tutors</li>
                    <li>Translators and interpreters</li>
                    <li>Marketers and copywriters</li>
                    <li>Traders and e-commerce founders</li>
                    <li>Journalists</li>
                    <li>Data scientists</li>
                    <li>Diplomats</li>
                    <li>Public speakers</li>
                  </ul>
                </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.25deg]">
                  <div className="flex items-start gap-3">
                    <img src={SACRED_GEOMETRY_URL} alt="" aria-hidden="true" className="h-16 w-16 shrink-0 opacity-80" />
                    <div>
                      <h3 className="font-caveat text-[1.6rem] leading-tight text-[#1a110a]">
                        The Hexagonal Yantra
                      </h3>
                      <p className="mt-2 font-kalam text-base leading-snug text-[#2a190f]">
                        Budh&apos;s yantra arranges six points around a centre, representing the six directions in which the awakened mind can move with equal poise. Devotees place it in study spaces or use it as a focus during mantra repetition.
                      </p>
                    </div>
                  </div>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Color Therapy: Green for Budh
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <p className="mt-3 font-kalam text-base leading-snug text-[#2a190f]">
                    Wear green on Wednesdays. Surround your workspace with green plants such as basil, mint, or money plant. Choose emerald accents in jewellery when the chart supports it. Let fresh growth visually anchor your daily intelligence.
                  </p>
                  <p className="mt-3 font-caveat text-base leading-snug text-[#166534]">
                    Mercury is the colour of new leaves, not old paint.
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.4deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Did You Know? The Parrot
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <p className="mt-3 font-kalam text-base leading-relaxed text-[#2a190f]">
                    Some traditions place a parrot beside Budh, the bird that learns by listening and repeats with fidelity. It is a quiet emblem of memorised speech, faithful study, and the ability to carry a teacher&apos;s words intact across years.
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.25deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Budh and Short Journeys
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <p className="mt-3 font-kalam text-base leading-snug text-[#2a190f]">
                    Budh signifies short trips, business travel, daily commutes, and the small movements that connect intellect with action. A strong Budh helps a person travel with ease, network across cities, and use each journey as an occasion for learning.
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.3deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Budh in Daily Decisions
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <ul className="mt-4 space-y-1.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Sign contracts when Budh is unafflicted in transit</li>
                    <li>Send important emails on Wednesday mornings</li>
                    <li>Hold negotiations during Mercury hora when possible</li>
                    <li>Begin written projects on Wednesdays during shukla paksha</li>
                    <li>Avoid major communications during a difficult Budh transit</li>
                  </ul>
                  <p className="mt-3 font-caveat text-sm leading-snug text-[#3a271a]/70">
                    [VERIFY: muhurta selection involves multiple factors beyond Budh alone]
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.35deg]">
                  <div className="relative">
                    <img
                      src={FEATHER_URL}
                      alt="" aria-hidden="true"
                      className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 opacity-30"
                    />
                    <div className="font-caveat text-2xl italic leading-tight text-[#166534]/75">
                      A line worth carrying
                    </div>
                    <blockquote className="mt-3 font-caveat text-[2rem] leading-tight text-[#1a110a] sm:text-[2.2rem]">
                      Budh responds to clean signal more than ornate ritual.
                    </blockquote>
                    <div className="mt-3 font-kalam text-sm leading-relaxed text-[#3a271a]/70">
                      Drawn from the Vedic Remedies section, a reminder that simplicity carries more power than performance.
                    </div>
                  </div>
                </NotebookCard>

                <NotebookCard rotate="lg:-rotate-[0.25deg]">
                  <h3 className="font-caveat text-[1.7rem] leading-tight text-[#1a110a]">
                    Budh Charity
                  </h3>
                  <div className="mt-1 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#166534] via-[#4ade80] to-transparent" />
                  <ul className="mt-4 space-y-1.5 font-kalam text-base leading-snug text-[#2a190f]">
                    <li>Donate books to a school library</li>
                    <li>Sponsor a child&apos;s education for a term</li>
                    <li>Offer green moong dal to those in need</li>
                    <li>Gift stationery and notebooks to students</li>
                    <li>Volunteer to teach a small skill or class</li>
                  </ul>
                  <p className="mt-4 font-caveat text-base leading-snug text-[#166534]">
                    Knowledge given freely returns multiplied.
                  </p>
                </NotebookCard>

                <NotebookCard rotate="lg:rotate-[0.4deg]">
                  <div className="flex items-start gap-3">
                    <img src={RING_URL} alt="" aria-hidden="true" className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
                    <div>
                      <h3 className="font-caveat text-[1.6rem] leading-tight text-[#1a110a]">
                        Emerald (Panna) at a Glance
                      </h3>
                      <p className="mt-2 font-kalam text-base leading-snug text-[#2a190f]">
                        Worn on the little finger of the working hand, set in silver, energised on a Wednesday morning during shukla paksha with the Budh bija. Always after a qualified Jyotishi has reviewed the chart.
                      </p>
                    </div>
                  </div>
                </NotebookCard>
              </aside>
            </div>
          </div>
        </section>

        <section id="mercury-faqs" className="bg-[#f1e7d1] py-20 text-[#26180d]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="font-caveat text-5xl leading-none text-[#166534] sm:text-6xl">
                Frequently Asked Questions
              </div>
              <p className="mx-auto mt-4 max-w-2xl font-kalam text-xl leading-relaxed text-[#3a271a]">
                Common questions about Budh, Mercury strength, remedies, and how Budh’s energy operates in a Vedic chart.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[24px] border border-[#7c6746]/25 shadow-[0_15px_30px_rgba(64,40,18,0.12)]"
                    style={notebookStyle}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-[#166534]">{iconSvg('faq', 'h-6 w-6')}</div>
                        <h3 className="font-kalam text-xl leading-relaxed text-[#2a190f]">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="text-[#166534]">
                        <svg
                          viewBox="0 0 24 24"
                          className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-5 sm:px-6">
                        <div className="border-t border-[#7c6746]/15 pt-4 font-kalam text-lg leading-relaxed text-[#38251a]">
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
