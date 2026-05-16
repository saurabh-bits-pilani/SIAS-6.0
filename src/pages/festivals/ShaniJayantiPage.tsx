import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Droplet,
  Droplets,
  Eye,
  Flame,
  Gem,
  Globe,
  Heart,
  HelpCircle,
  Leaf,
  MapPin,
  Moon,
  Music,
  Package,
  PawPrint,
  Scissors,
  Shield,
  Star,
  ZoomIn,
  UserX,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';

const HERO_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/hero-banner.webp';
const SCROLL_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/hero-banner.webp';
const QUICK_FACTS_IMAGE =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Blog/shani-jayanti/quick-fact.webp';

const ACCENT = '#1e3a8a';
const CREAM = '#f5e6c8';
const DARK = '#0d1117';

interface InfoCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface PracticeRow {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface StepCard {
  num: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

interface WarningCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface RemedyRow {
  num: string;
  main: string;
  sub: string;
}

interface FaqItem {
  q: string;
  a: ReactNode;
  aText: string;
  icon: LucideIcon;
}

const ABOUT_CARDS: readonly InfoCard[] = [
  {
    icon: Globe,
    title: 'Lord Shani: The Planet of Karma and Justice',
    body:
      'Shani, known in Western astronomy as Saturn, is the slowest-moving of the Navagraha. In Vedic astrology he governs karma, discipline, justice, and longevity. He rules Makara (Capricorn) and Kumbha (Aquarius) and is exalted in Tula (Libra). Born of Surya and Chhaya, his vehicle is the crow and his color is dark blue, representing the weight of karmic law and the infinite expanse of time. Shani is not a planet of punishment. He is a strict but fair teacher who rewards sustained effort, integrity, and service.',
  },
  {
    icon: Calendar,
    title: 'What is Shani Jayanti',
    body:
      "Shani Jayanti is the birth anniversary of Lord Shani. It falls on the Amavasya (new moon) of the Hindu month of Jyeshtha. In 2026 this date is May 16th. This year it also falls on a Saturday, which is Shani's own day. This double alignment is rare and makes any worship performed on this day exceptionally potent compared to an ordinary Saturday.",
  },
  {
    icon: Users,
    title: 'Who Should Observe',
    body:
      'Shani Jayanti is especially important for those in Sade Sati (Saturn transiting the 12th, 1st, or 2nd house from natal Moon), those in Shani Mahadasha or Antardasha, those with Makara or Kumbha Lagna where Shani is the ascendant lord, and anyone seeking karmic clarity and long-term stability in their life.',
  },
];

const QUICK_FACTS = [
  ['Date', '16 May 2026 (Saturday)'],
  ['Tithi', 'Jyeshtha Amavasya'],
  ['Planet', 'Shani (Saturn)'],
  ['Own Signs', 'Makara, Kumbha'],
  ['Exaltation', 'Tula (Libra)'],
  ['Gemstone', 'Blue Sapphire (Neelam)'],
  ['Metal', 'Iron (Loha)'],
  ['Worship Day', 'Saturday (Shanivar)'],
  ['Worship Direction', 'West (Paschim)'],
] as const;

const DO_ROWS: readonly PracticeRow[] = [
  {
    icon: Droplets,
    title: 'Bathe before sunrise or after sunset',
    body:
      'Most sources recommend Shani puja at dawn or dusk with a calm mind. Bathe with water mixed with black sesame seeds. This is the opening act of purification for the day.',
  },
  {
    icon: Flame,
    title: 'Light a sesame oil lamp',
    body:
      "Offer a til or mustard oil lamp, black sesame, and black cloth to Shani's idol or image. A four-faced clay lamp (chaumukha diya) lit with mustard oil under a Peepal tree is considered especially auspicious.",
  },
  {
    icon: Music,
    title: 'Chant mantra, Chalisa, and Stotra',
    body:
      'Chant Om Shan Shanaischaraya Namah 108 times. Read the Shani Chalisa or the Dasharatha Shani Stotra. Regular chanting is the simplest and strongest remedy for reducing Dhaiya and Sade Sati effects over time.',
  },
  {
    icon: Heart,
    title: 'Fast if health permits',
    body:
      'Fasting from sunrise to sunset, then breaking the fast after evening puja and dana with fruit or simple sattvic food, is classically recommended for Shani Jayanti.',
  },
  {
    icon: Package,
    title: 'Donate Saturn-associated items',
    body:
      'Black sesame, black cloth or blanket, iron vessel, black footwear, tea leaves, mustard oil, urad dal. Give to a laborer, elderly person, someone differently-abled, or anyone in genuine need. Give with sincerity, not as a transaction.',
  },
  {
    icon: MapPin,
    title: 'Worship the Peepal tree after sunset',
    body:
      'Pour water mixed with raw milk on a Peepal tree. Light a sesame oil lamp. Walk around it while chanting the mantra. This practice addresses both Shani dosha and Pitru dosha.',
  },
];

const SERVICE_ROWS: readonly PracticeRow[] = [
  {
    icon: Users,
    title: 'Feed the poor and laborers',
    body:
      'Shani rules the working class and the dispossessed. Giving food to a blind person or someone in extreme poverty is one of the most direct acts of Shani propitiation on this day.',
  },
  {
    icon: PawPrint,
    title: 'Feed a black dog, crows, and fish',
    body:
      'Offer an oil-soaked roti to a black dog. Give grain to crows. Feed fish if near water. This is described as reducing the negative effects of both Shani and Rahu.',
  },
  {
    icon: Shield,
    title: 'Observe a fast or partial fast',
    body:
      'Even a partial fast, avoiding grains until sunset, carries weight if a complete fast is not possible. The intention of surrender and simplicity matters more than the strictness.',
  },
  {
    icon: Clock,
    title: 'Perform Shani Shanti Puja if in Sade Sati',
    body:
      'For those in Sade Sati or Shani Mahadasha, a structured Shani Shanti Puja performed by a trained practitioner on this day carries exceptional weight and lasting effect.',
  },
];

const VIDHI_STEPS: readonly StepCard[] = [
  {
    num: '01',
    icon: Droplets,
    title: 'Early Bath',
    body:
      'Wake before sunrise. Bathe with water mixed with black sesame seeds and a few drops of sesame oil. Wear clean dark blue or black clothing.',
  },
  {
    num: '02',
    icon: Flame,
    title: 'Light the Lamp',
    body:
      'Light a til or mustard oil lamp facing west. Offer black sesame, black urad dal, and a piece of black cloth to the Shani idol or image.',
  },
  {
    num: '03',
    icon: Music,
    title: 'Chant the Beej Mantra',
    body:
      'Om Praam Preem Praum Sah Shanaischaraya Namah, 108 times on a black sphatik or iron mala. Do this slowly. Shani does not reward haste.',
  },
  {
    num: '04',
    icon: BookOpen,
    title: 'Read Shani Chalisa or Stotra',
    body:
      'Read the Shani Chalisa or the Dasharatha Shani Stotra. At minimum, one full reading. The Dasharatha Stotra is especially effective for pacifying malefic Saturn.',
  },
  {
    num: '05',
    icon: Package,
    title: 'Give Dana',
    body:
      'Donate black sesame, black cloth, mustard oil, iron vessel, urad dal, tea leaves, or black footwear to a laborer, elderly person, or someone in genuine need.',
  },
  {
    num: '06',
    icon: PawPrint,
    title: 'Serve Animals',
    body:
      "Offer an oil-soaked roti to a black dog. Give grain to crows. Feed fish if near water. These are Shani's creatures.",
  },
  {
    num: '07',
    icon: Leaf,
    title: 'Peepal Tree Puja',
    body:
      'After sunset, pour water mixed with raw milk on a Peepal tree. Light a sesame oil lamp. Walk around the tree chanting the mantra.',
  },
  {
    num: '08',
    icon: Moon,
    title: 'Break the Fast',
    body:
      'Break the fast after sunset with simple sattvic food. Avoid meat, alcohol, and excessively spiced food throughout the entire day.',
  },
];

const WARNING_CARDS: readonly WarningCard[] = [
  {
    icon: Scissors,
    title: 'Do not cut hair or nails',
    body:
      'Many classical teachers clearly state this is inauspicious on Shani Jayanti. It applies to Amavasya generally and doubly so on this day.',
  },
  {
    icon: X,
    title: 'Avoid red flowers and red clothing in puja',
    body:
      'In Shani worship, red is not appropriate. Dark blue or black is correct. Red belongs to Mangala (Mars), not to Shani.',
  },
  {
    icon: AlertCircle,
    title: 'No meat, alcohol, or intoxicants',
    body:
      'Stay completely away from meat, alcohol, eggs, cigarettes, and any intoxicant. Tamasic substances weaken the effect of any worship performed on this day.',
  },
  {
    icon: Eye,
    title: "Do not look directly into Shani's eyes during puja",
    body:
      'Stand slightly sideways to the idol rather than facing it directly. Direct eye contact is considered disrespectful in this tradition.',
  },
  {
    icon: Package,
    title: 'Do not buy puja items on Shani Jayanti itself',
    body:
      'Purchase mustard oil, sesame, and black cloth on Friday, the day before. Buying and offering on Saturday is not considered correct in classical practice.',
  },
  {
    icon: UserX,
    title: 'Do not turn away a beggar or laborer empty-handed',
    body:
      'Dismissing a person in need who comes to your door on this day is considered to displease Shani greatly. Give something to everyone who asks, however small.',
  },
  {
    icon: AlertTriangle,
    title: 'Avoid lying, excessive anger, and injustice',
    body:
      'Shani is the planet of karmic consequence. Speaking lies, taking what is not yours, showing anger toward workers, or exploiting anyone is especially harmful today.',
  },
  {
    icon: Droplet,
    title: 'Do not use a copper vessel to pour water or oil on Shani',
    body:
      'Iron or steel vessels are preferred for offering water or oil in Shani puja. Copper is associated with Surya and Mangala, not with Shani.',
  },
];

const REMEDY_ROWS: readonly RemedyRow[] = [
  {
    num: '01',
    main: 'Recite Shani Stotra every Saturday',
    sub:
      'Dasharatha Shani Stotra or Shani Chalisa. Consistent practice over months reduces Sade Sati effects more reliably than occasional grand rituals.',
  },
  {
    num: '02',
    main: 'Donate black sesame, mustard oil, and iron items every Saturday',
    sub:
      'Give to laborers, the elderly, or those in need. Shani rules the working class. Sincerity matters more than the quantity donated.',
  },
  {
    num: '03',
    main: 'Light a sesame oil lamp at a Shani temple every Saturday',
    sub:
      'Pour oil slowly onto the Shani idol from an iron or steel vessel. Observe silence. Avoid asking for specific outcomes. Surrender is the correct posture.',
  },
  {
    num: '04',
    main: 'Feed a black dog, crows, and fish regularly',
    sub:
      "These are Shani's creatures. Feeding them with care and consistency calms both Shani and Rahu influences over time.",
  },
  {
    num: '05',
    main: 'Worship the Peepal tree on Saturday evenings',
    sub:
      'Water mixed with raw milk, sesame oil lamp, circumambulation with mantra chanting. Addresses both Shani dosha and Pitru dosha simultaneously.',
  },
  {
    num: '06',
    main: 'Wear Blue Sapphire (Neelam) only after astrological consultation',
    sub:
      'Neelam strengthens Saturn in the chart when correctly prescribed. It is a powerful stone and must be recommended by a trained practitioner for your specific birth chart.',
  },
  {
    num: '07',
    main: 'Perform Shani Shanti Puja during Sade Sati or Shani Mahadasha',
    sub:
      'A structured puja by a K.N. Rao trained practitioner with correct Vedic timing. Especially recommended at the beginning of Sade Sati.',
  },
];

const FAQ_DATA: readonly FaqItem[] = [
  {
    q: 'What is Shani Jayanti and when does it fall in 2026?',
    icon: HelpCircle,
    a: (
      <>
        Shani Jayanti is the birth anniversary of Lord Shani, the planet Saturn in Vedic
        astrology. It falls on the Amavasya (new moon) of the Hindu month of Jyeshtha. In
        2026 this date is May 16th, which also falls on a Saturday. This double alignment
        of Shani&apos;s birth anniversary and his own day makes 2026 Shani Jayanti
        exceptionally auspicious.
      </>
    ),
    aText:
      "Shani Jayanti is the birth anniversary of Lord Shani, the planet Saturn in Vedic astrology. It falls on the Amavasya (new moon) of the Hindu month of Jyeshtha. In 2026 this date is May 16th, which also falls on a Saturday. This double alignment of Shani's birth anniversary and his own day makes 2026 Shani Jayanti exceptionally auspicious.",
  },
  {
    q: 'Which mantra should I chant on Shani Jayanti?',
    icon: Music,
    a: (
      <>
        The most powerful mantra is the Shani Beej Mantra: Om Praam Preem Praum Sah
        Shanaischaraya Namah. Chant it 108 times on a black sphatik or iron mala, facing
        west, at dawn or dusk. For daily practice, Om Shan Shanaischaraya Namah chanted
        108 times is equally effective.
      </>
    ),
    aText:
      'The most powerful mantra is the Shani Beej Mantra: Om Praam Preem Praum Sah Shanaischaraya Namah. Chant it 108 times on a black sphatik or iron mala, facing west, at dawn or dusk. For daily practice, Om Shan Shanaischaraya Namah chanted 108 times is equally effective.',
  },
  {
    q: 'What should I donate on Shani Jayanti?',
    icon: Package,
    a: (
      <>
        The most auspicious donations are black sesame, black cloth or blanket, mustard
        oil, iron vessel, urad dal, tea leaves, and black footwear. Give to a laborer,
        elderly person, or someone in genuine need. Items should be purchased on Friday,
        not on Shani Jayanti itself.
      </>
    ),
    aText:
      'The most auspicious donations are black sesame, black cloth or blanket, mustard oil, iron vessel, urad dal, tea leaves, and black footwear. Give to a laborer, elderly person, or someone in genuine need. Items should be purchased on Friday, not on Shani Jayanti itself.',
  },
  {
    q: 'Is Shani Jayanti especially important if I am in Sade Sati?',
    icon: Shield,
    a: (
      <>
        Yes, significantly. For those in Sade Sati, Shani Jayanti is the most important day
        of the year for Saturn worship. Consistent practice on this day and every Saturday,
        combined with dana and service to laborers, eases Sade Sati considerably.
      </>
    ),
    aText:
      'Yes, significantly. For those in Sade Sati, Shani Jayanti is the most important day of the year for Saturn worship. Consistent practice on this day and every Saturday, combined with dana and service to laborers, eases Sade Sati considerably.',
  },
  {
    q: 'Can I get a personal reading for my Shani placement?',
    icon: Star,
    a: (
      <>
        Yes. A consultation at Soul Infinity Astro Solutions with Saurabh Jain covers your
        Saturn placement, Sade Sati or Dhaiya status, current Mahadasha timing, and
        specific remedies for your chart. Contact via WhatsApp at +91 9079053840 or
        through the contact form at soulinfinity.space.
      </>
    ),
    aText:
      'Yes. A consultation at Soul Infinity Astro Solutions with Saurabh Jain covers your Saturn placement, Sade Sati or Dhaiya status, current Mahadasha timing, and specific remedies for your chart. Contact via WhatsApp at +91 9079053840 or through the contact form at soulinfinity.space.',
  },
];

const FAQ_SCHEMA = FAQ_DATA.map((faq) => ({
  '@type': 'Question',
  name: faq.q,
  acceptedAnswer: {
    '@type': 'Answer',
    text: faq.aText,
  },
}));

function ShaniJayantiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Shani Jayanti 2026: Puja Vidhi, Significance and Remedies',
      description:
        'Shani Jayanti 2026 falls on 16 May. Complete guide to puja vidhi, what to do, what not to do, donations, mantras, and remedies from K.N. Rao Institute trained Jyotish practitioner Saurabh Jain.',
      author: {
        '@type': 'Person',
        name: 'Saurabh Jain',
        url: 'https://www.soulinfinity.space/cosmic-guide',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Soul Infinity Astro Solutions',
      },
      datePublished: '2026-05-16',
      image: HERO_IMAGE,
      url: 'https://www.soulinfinity.space/shani-jayanti-2026',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_SCHEMA,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.soulinfinity.space/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Shani Jayanti 2026',
          item: 'https://www.soulinfinity.space/shani-jayanti-2026',
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Shani Jayanti 2026: Puja Vidhi, Significance and Remedies | Soul Infinity</title>
        <meta
          name="description"
          content="Shani Jayanti 2026 falls on 16 May. Complete guide to puja vidhi, what to do, what not to do, donations, mantras, and remedies from K.N. Rao Institute trained Jyotish practitioner Saurabh Jain."
        />
        <link rel="canonical" href="https://www.soulinfinity.space/shani-jayanti-2026" />
        <meta
          property="og:title"
          content="Shani Jayanti 2026: Puja Vidhi, Significance and Remedies | Soul Infinity"
        />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:url" content="https://www.soulinfinity.space/shani-jayanti-2026" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      </Helmet>

      <main className="bg-white">
        <section className="relative w-full overflow-hidden">
          <div className="w-full bg-gray-900">
            <img
              src={HERO_IMAGE}
              alt="Shani Jayanti 2026: Saturn's Sacred Birth Anniversary"
              className="w-full h-auto block"
              width={1600}
              height={420}
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </section>

        <section className="px-6 py-12" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="mb-2">
                <h2 className="font-kalam text-xl font-bold" style={{ color: ACCENT }}>
                  <span className="font-devanagari" lang="hi">
                    शनि जयंती
                  </span>{' '}
                  / Shani Jayanti in Vedic Astrology
                </h2>
              </div>
              {ABOUT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="flex gap-3 rounded-xl bg-white p-4"
                    style={{ border: '1px solid #e7d0a9' }}
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-kalam text-lg font-bold" style={{ color: ACCENT }}>
                        {card.title}
                      </h3>
                      <p className="m-0 font-poppins text-sm leading-relaxed text-gray-700">
                        {card.body}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div
                className="flex gap-3 rounded-xl bg-white p-4"
                style={{ border: '1px solid #e7d0a9', borderLeft: `5px solid ${ACCENT}` }}
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <Star className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="m-0 font-poppins text-sm italic leading-relaxed text-gray-700">
                  In 15 years of practice, the clients who move through Sade Sati with grace are
                  not those who performed the most elaborate rituals. They are the ones who showed
                  up, did their work, and stopped expecting life to be effortless. Shani rewards
                  exactly that.
                  <span className="mt-2 block font-semibold text-gray-900">
                    Saurabh Jain, K.N. Rao Institute
                  </span>
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-24 space-y-4">
                <div
                  className="relative cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={QUICK_FACTS_IMAGE}
                    alt="Shani Jayanti 2026 Quick Facts"
                    width={800}
                    height={400}
                    className="w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-poppins text-white">
                    <ZoomIn className="h-3 w-3" aria-hidden="true" />
                    Click to expand
                  </div>
                </div>
                <div className="rounded-xl p-6 font-poppins text-white" style={{ background: ACCENT }}>
                  <h2 className="mb-4 font-kalam text-2xl font-bold text-white">Quick Facts</h2>
                  <div className="space-y-3">
                    {QUICK_FACTS.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 border-b border-white/15 pb-2">
                        <span className="text-white/70">{label}</span>
                        <span className="text-right font-semibold">{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between gap-4 border-b border-white/15 pb-2">
                      <span className="text-white/70">Mantra</span>
                      <span className="font-devanagari text-right font-semibold" lang="sa">
                        ॐ शं शनैश्चराय नमः
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://wa.me/919079053840"
                  className="block w-full rounded-full bg-amber-400 px-6 py-3 text-center font-poppins font-semibold text-black transition-colors hover:bg-amber-300"
                >
                  Book Shani Consultation
                </a>
                <a
                  href="tel:+919079053840"
                  className="block w-full rounded-full border-2 px-6 py-3 text-center font-poppins font-semibold transition-colors hover:bg-blue-50"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                >
                  Call Saurabh Jain
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-16 text-center" style={{ background: DARK }}>
          <div className="mx-auto max-w-4xl">
            <div className="font-devanagari text-3xl leading-relaxed text-amber-400 md:text-5xl" lang="sa">
              ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः
            </div>
            <p className="mt-4 font-poppins text-lg italic text-white/80">
              Om Praam Preem Praum Sah Shanaischaraya Namah
            </p>
            <p className="mx-auto mt-2 max-w-2xl font-poppins text-base text-white/60">
              I bow to Shanaishchara (Saturn), the slow-moving one, born of the Sun and
              Chhaya, who purifies through karma and time.
            </p>
            <div className="mt-4 inline-block rounded-full border border-amber-400 px-5 py-2 font-poppins text-sm text-amber-400">
              Chant 108 times on a black sphatik or iron mala, facing west, at dawn or dusk
            </div>
            <div className="mx-auto my-8 h-px max-w-md bg-white/15" />
            <p className="font-poppins text-sm text-white/50">For daily practice:</p>
            <div className="mt-3 font-devanagari text-2xl text-amber-300" lang="sa">
              ॐ शं शनैश्चराय नमः
            </div>
            <p className="mt-2 font-poppins italic text-white/70">Om Shan Shanaischaraya Namah</p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16" style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="font-kalam text-3xl font-bold md:text-5xl" style={{ color: ACCENT }}>
                Why Shani Jayanti Matters
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <PracticeCard
                title="What to Do on Shani Jayanti"
                rows={DO_ROWS}
                headerColor={ACCENT}
                headerIcon={Flame}
              />
              <PracticeCard
                title="Serve the Living Embodiments of Saturn"
                rows={SERVICE_ROWS}
                headerColor="#d97706"
                headerIcon={Users}
              />
            </div>
            <p className="mt-10 text-center font-caveat text-xl italic" style={{ color: ACCENT }}>
              When you stop fighting Saturn&apos;s lessons and start learning from them, his grace
              arrives naturally.
            </p>
          </div>
        </section>

        <section className="px-6 py-16" style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="font-kalam text-3xl font-bold md:text-5xl" style={{ color: ACCENT }}>
                Shani Jayanti Puja Vidhi 2026
              </h2>
              <p className="mt-2 font-poppins text-sm uppercase tracking-[0.25em] text-gray-500">
                How to perform Shani Puja on 16 May 2026
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VIDHI_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="rounded-2xl bg-white p-4" style={{ border: `1px solid ${ACCENT}4d` }}>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: ACCENT }}>
                        {step.num}
                      </div>
                      <Icon className="h-6 w-6" style={{ color: ACCENT }} aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-kalam text-lg font-bold" style={{ color: ACCENT }}>
                      {step.title}
                    </h3>
                    <p className="m-0 font-poppins text-sm leading-relaxed text-gray-600">{step.body}</p>
                  </div>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center font-poppins text-sm italic text-gray-500">
              If the full vidhi is not possible: do Steps 02, 03, and 05 with complete
              attention. Shani values quality of intention over quantity of ritual.
            </p>
          </div>
        </section>

        <section className="px-6 py-16" style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl rounded-2xl border-2 bg-white p-6 md:p-8" style={{ borderColor: ACCENT }}>
            <h2 className="mb-8 text-center font-kalam text-2xl font-bold md:text-3xl" style={{ color: ACCENT }}>
              If You Have Limited Time: The Essential Practice
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <MinimumColumn
                label="Morning or Evening"
                color={ACCENT}
                items={[
                  'Bathe and wear dark blue or black clothing',
                  'Light a til or mustard oil lamp at home or temple',
                  'Chant Om Shan Shanaischaraya Namah 108 times',
                  'Read Shani Chalisa once',
                ]}
              />
              <MinimumColumn
                label="During the Day"
                color="#d97706"
                items={[
                  'Give food or a useful item (black cloth, til, urad) to one poor person or laborer',
                  'If possible, light a lamp on a Peepal tree and walk around it',
                ]}
              />
              <MinimumColumn
                label="Avoid All Day"
                color="#991b1b"
                items={[
                  'Meat, alcohol, lying, anger, insulting anyone',
                  'Red flowers or red cloth in Shani puja',
                  'Cutting hair or nails',
                ]}
              />
            </div>
            <p className="mt-8 text-center font-poppins text-sm italic text-gray-500">
              Even this minimum, done with full sincerity, carries more weight with Shani than
              elaborate rituals performed mechanically or out of fear.
            </p>
          </div>
        </section>

        <section className="px-6 py-16" style={{ background: DARK }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="font-kalam text-3xl font-bold text-white md:text-5xl">
                What NOT to Do on Shani Jayanti
              </h2>
              <p className="mt-3 font-poppins text-sm text-white/60">
                Saturn observes your conduct closely. These actions undermine the day&apos;s purpose.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {WARNING_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-2xl bg-white/5 p-5" style={{ borderLeft: '4px solid #991b1b' }}>
                    <Icon className="mb-4 h-6 w-6 text-amber-400" aria-hidden="true" />
                    <h3 className="mb-2 font-kalam text-xl font-bold text-white">{card.title}</h3>
                    <p className="m-0 font-poppins text-sm leading-relaxed text-white/70">{card.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <img
            src={SCROLL_IMAGE}
            alt="Lord Shani background for Vedic remedies on Shani Jayanti"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-6 py-16">
            <div className="ml-auto w-full space-y-4 lg:w-[62%]">
              <h2 className="mb-6 font-kalam text-3xl font-bold text-white md:text-5xl">
                Vedic Remedies for Shani
              </h2>
              {REMEDY_ROWS.map((row) => (
                <div key={row.num} className="flex gap-4 rounded-xl bg-white/5 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-amber-400 text-sm font-bold text-black">
                    {row.num}
                  </div>
                  <div>
                    <p className="m-0 font-poppins font-semibold text-white">{row.main}</p>
                    <p className="m-0 mt-1 font-poppins text-sm leading-relaxed text-white/60">{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="font-kalam text-3xl font-bold md:text-5xl">
                <span style={{ color: ACCENT }}>Frequently Asked </span>
                <span className="text-amber-600">Questions</span>
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => {
                const isOpen = openFaq === i;
                const Icon = faq.icon;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                    style={{ borderLeft: `4px solid ${ACCENT}` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`shani-faq-${i}`}
                      className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: ACCENT }}>
                        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <span className="flex-1 font-kalam text-lg font-bold" style={{ color: ACCENT }}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        style={{ color: ACCENT }}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div id={`shani-faq-${i}`} className="px-5 pb-5 pl-20">
                        <p className="m-0 font-poppins text-sm leading-relaxed text-gray-700">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 text-center" style={{ background: ACCENT }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-caveat text-3xl font-bold text-white md:text-4xl">
              Want a Personalised Shani Reading?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-poppins text-white/80">
              Saurabh Jain at Soul Infinity Astro Solutions reads your Saturn placement, Sade
              Sati status, and current Mahadasha to give you specific, actionable guidance for
              navigating Shani&apos;s lessons with clarity and confidence.
            </p>
            <Link
              to="/contact#contact-form-section"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3 font-poppins font-semibold text-black transition-colors hover:bg-amber-300"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-10 right-0 flex items-center gap-2 text-sm font-poppins text-white transition-colors hover:text-amber-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                Close
              </button>
              <img
                src={QUICK_FACTS_IMAGE}
                alt="Shani Jayanti 2026 Quick Facts expanded"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function PracticeCard({
  title,
  rows,
  headerColor,
  headerIcon: HeaderIcon,
}: {
  title: string;
  rows: readonly PracticeRow[];
  headerColor: string;
  headerIcon: LucideIcon;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex items-center gap-4 px-6 py-5" style={{ background: headerColor }}>
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
          <HeaderIcon className="h-6 w-6" style={{ color: headerColor }} aria-hidden="true" />
        </div>
        <h3 className="m-0 font-kalam text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="divide-y divide-gray-100 bg-white">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.title} className="flex gap-3 p-5 transition-colors hover:bg-blue-50">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                <Icon className="h-5 w-5" style={{ color: headerColor }} aria-hidden="true" />
              </div>
              <div>
                <h4 className="m-0 mb-1 font-poppins text-sm font-bold text-gray-900">{row.title}</h4>
                <p className="m-0 font-poppins text-sm leading-relaxed text-gray-600">{row.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MinimumColumn({
  label,
  color,
  items,
}: {
  label: string;
  color: string;
  items: readonly string[];
}) {
  return (
    <div>
      <div className="mb-4 inline-block rounded-full px-4 py-2 font-poppins text-sm font-semibold text-white" style={{ background: color }}>
        {label}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 font-poppins text-sm leading-relaxed text-gray-700">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShaniJayantiPage;
