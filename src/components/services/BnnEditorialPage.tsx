import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  Compass,
  MessageCircle,
  Phone,
  Quote,
  Search,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { ServiceContent } from '../../data/services-content';
import CircleCallout from '../doodles/CircleCallout';
import CornerSpark from '../doodles/CornerSpark';
import HighlightStroke from '../doodles/HighlightStroke';
import UnderlineScribble from '../doodles/UnderlineScribble';
import { trackEvent } from '../../utils/analytics';
import bnnHero from '../../assets/services/bnn/bnn-hero.webp';
import bnnArchive from '../../assets/services/bnn/bnn-archive.webp';
import bnnCrystals from '../../assets/services/bnn/bnn-crystals.webp';
import bnnRitual from '../../assets/services/bnn/bnn-ritual.webp';

type ServiceOffering = {
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  rating: number;
  clients: number;
  image: string;
  benefits: readonly string[];
  includes: readonly string[];
  process: readonly string[];
};

type BnnEditorialPageProps = {
  category: string;
  service: string;
  content: ServiceContent;
  currentService: ServiceOffering;
  pageH1: string;
  whatsappUrl: string;
  openFaq: number | null;
  setOpenFaq: Dispatch<SetStateAction<number | null>>;
  phoneTel: string;
};

const noteCardClass =
  'rounded-[28px] border border-[#d8cbb4] bg-[#fffaf0] p-6 shadow-[0_24px_60px_rgba(50,38,20,0.12)]';

const editorialCards = [
  {
    icon: Search,
    title: 'Event windows, not vague forecasts',
    body: 'BNN is best when you need timing around marriage, business, relocation, property, or a pressure point that feels near.',
  },
  {
    icon: Compass,
    title: 'Rare method, grounded explanation',
    body: 'The reading is framed simply, so the method feels mystical in depth but clear in delivery.',
  },
  {
    icon: Target,
    title: 'Cross-checked with other systems',
    body: 'Saurabh uses BNN alongside Parashari and KP so the timing call is not hanging on a single interpretive lens.',
  },
];

const timelineCards = [
  {
    step: '01',
    title: 'Decode the karakas',
    body: 'The chart is read through event-signifying planets and the way they connect to one another.',
    icon: BookOpen,
  },
  {
    step: '02',
    title: 'Track Jupiter as the timer',
    body: 'BNN pays close attention to how Jupiter activates outcomes and narrows windows around big developments.',
    icon: Clock,
  },
  {
    step: '03',
    title: 'Cross-verify before guidance',
    body: 'The final reading is checked against dashas, chart context, and practical life reality before any remedy is suggested.',
    icon: Sparkles,
  },
];

const photoTiles = [
  {
    src: bnnArchive,
    alt: 'Sacred manuscript study desk for Bhrigu Nandi Nadi consultation',
    label: 'Archive mood',
    rotate: '-rotate-2',
  },
  {
    src: bnnRitual,
    alt: 'Vedic ritual atmosphere for BNN consultation',
    label: 'Ritual context',
    rotate: 'rotate-2',
  },
  {
    src: bnnCrystals,
    alt: 'Spiritual still life with crystals for BNN service page design',
    label: 'Visual accent',
    rotate: '-rotate-1',
  },
];

export default function BnnEditorialPage({
  category,
  service,
  content,
  currentService,
  pageH1,
  whatsappUrl,
  openFaq,
  setOpenFaq,
  phoneTel,
}: BnnEditorialPageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#120f1f] text-[#f9f2e1]">
        <div className="absolute inset-0">
          <img
            src={bnnHero}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(247,205,96,0.28),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.24),transparent_28%),linear-gradient(135deg,rgba(10,10,20,0.95),rgba(25,18,47,0.88))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24">
          <Link
            to="/services"
            className="mb-10 inline-flex items-center text-sm font-semibold tracking-[0.24em] text-[#f4ddb0] transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center rounded-full border border-[#f4ddb0]/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f7d46b] backdrop-blur">
                Rare timing method
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
                <span className="font-kalam text-[#f7d46b]">BNN</span>{' '}
                <span>{pageH1}</span>
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#f0e6d1] md:text-xl">
                {content.heroIntro}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#f6ead0]">
                <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">
                  <HighlightStroke color="#f6d879">Best for decision timing</HighlightStroke>
                </span>
                <span className="font-caveat text-2xl text-[#f7d46b]">
                  rare, precise, cross-verified
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur">
                  <Clock className="mb-3 h-6 w-6 text-[#f6d879]" />
                  <div className="text-2xl font-semibold text-white">{currentService.duration}</div>
                  <div className="mt-1 text-sm text-[#d2c6a9]">Deep-dive session</div>
                </div>
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur">
                  <Star className="mb-3 h-6 w-6 fill-current text-[#f6d879]" />
                  <div className="text-2xl font-semibold text-white">{currentService.rating}</div>
                  <div className="mt-1 text-sm text-[#d2c6a9]">Client-rated trust</div>
                </div>
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur">
                  <Users className="mb-3 h-6 w-6 text-[#f6d879]" />
                  <div className="text-2xl font-semibold text-white">{currentService.clients}+</div>
                  <div className="mt-1 text-sm text-[#d2c6a9]">Consultations supported</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      page: `/services/${category}/${service}`,
                      service: currentService.title,
                      location: 'bnn_hero',
                    })
                  }
                  className="inline-flex items-center justify-center rounded-full bg-[#f7d46b] px-8 py-4 text-base font-semibold text-[#1f1634] transition-transform duration-300 hover:scale-[1.02] hover:bg-[#ffe08d]"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start on WhatsApp
                </a>
                <a
                  href={phoneTel}
                  onClick={() =>
                    trackEvent('phone_click', {
                      page: `/services/${category}/${service}`,
                      service: currentService.title,
                      location: 'bnn_hero',
                    })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-[#f7d46b]/60 px-8 py-4 text-base font-semibold text-[#f8ebce] transition-colors duration-300 hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Speak to Saurabh
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#171128]/90 p-4 shadow-[0_30px_90px_rgba(3,2,10,0.45)]">
                <div className="absolute right-5 top-5 text-[#f7d46b]">
                  <CornerSpark className="h-12 w-12" />
                </div>
                <img
                  src={bnnHero}
                  alt="Planetary timing visual for Bhrigu Nandi Nadi consultation"
                  width="1280"
                  height="1280"
                  loading="eager"
                  fetchpriority="high"
                  className="h-[420px] w-full rounded-[26px] object-cover"
                />
                <div className="absolute bottom-8 left-8 max-w-xs rounded-[22px] border border-white/15 bg-[#0f0a18]/85 px-5 py-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#f4ddb0]">Field note</p>
                  <p className="mt-2 text-sm leading-6 text-[#fff4dd]">
                    BNN is strongest when the question has pressure, timing, and consequence.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {editorialCards.slice(0, 2).map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[28px] border border-white/10 bg-white/8 p-5 text-[#f6ead0] shadow-[0_20px_45px_rgba(9,6,20,0.22)] backdrop-blur"
                  >
                    <card.icon className="mb-4 h-5 w-5 text-[#f6d879]" />
                    <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#dbd0ba]">{card.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8efe1] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-kalam text-2xl text-[#8b5e34]">newspaper-style brief</p>
              <h2 className="max-w-3xl text-3xl font-bold text-[#1f172b] md:text-4xl">
                <UnderlineScribble color="#c99a2e">Why people seek BNN now</UnderlineScribble>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#5c4a35]">
              Modern seekers come to BNN when a life event feels close and a general reading is not
              enough. They want timing, context, and next steps.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={`${noteCardClass} relative overflow-hidden`}>
              <div className="absolute -right-14 top-3 h-32 w-32 rounded-full bg-[#f0c35d]/18 blur-3xl" />
              <CircleCallout color="#8b5e34">
                <span className="font-kalam text-2xl text-[#6d4725]">The Bhrigu file</span>
              </CircleCallout>
              <p className="mt-5 text-lg leading-8 text-[#2f261e]">{content.whatIs.paragraphs[0]}</p>
              <p className="mt-4 text-base leading-7 text-[#5c4a35]">{content.whatIs.paragraphs[1]}</p>
              {content.whatIs.shloka && (
                <div className="mt-6 rounded-[22px] border border-[#dfc6a2] bg-white/70 p-5">
                  <p className="font-devanagari text-2xl leading-10 text-[#422714]">
                    {content.whatIs.shloka.sanskrit}
                  </p>
                  <p className="mt-2 text-sm italic text-[#75593d]">{content.whatIs.shloka.iast}</p>
                  <p className="mt-3 text-base leading-7 text-[#413328]">
                    “{content.whatIs.shloka.english}”
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {content.problemsAddressed.items.slice(0, 4).map((item, index) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-[#d8c7b0] bg-white/80 p-6 shadow-[0_16px_36px_rgba(102,73,37,0.10)]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1530] text-[#f6d879]">
                    <span className="font-kalam text-lg">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-lg font-semibold leading-7 text-[#241b13]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className={`${noteCardClass} rotate-[-1.4deg]`}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9e7441]">
                  Reader&apos;s note
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#1f172b]">
                  <HighlightStroke color="#fde68a">{content.howItWorks.heading}</HighlightStroke>
                </h2>
                {content.howItWorks.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-8 text-[#4c3c2c]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="rounded-[28px] border border-[#1d1633] bg-[#1b1530] p-6 text-[#f5ecd6] shadow-[0_20px_50px_rgba(14,10,27,0.24)]">
                <p className="font-caveat text-3xl text-[#f6d879]">how Saurabh uses BNN</p>
                <div className="mt-4 space-y-4">
                  {timelineCards.map((item) => (
                    <div
                      key={item.step}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6d879] text-[#1c1530]">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#c8b998]">
                            Step {item.step}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[#d8ceb8]">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {photoTiles.map((tile, index) => (
                <figure
                  key={tile.label}
                  className={`${noteCardClass} ${tile.rotate} ${index === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    width="1440"
                    height="900"
                    loading="lazy"
                    className={`w-full rounded-[22px] object-cover ${index === 0 ? 'h-72' : 'h-56'}`}
                  />
                  <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#8b5e34]">
                    {tile.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead9] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-caveat text-3xl text-[#8a6036]">client-facing dossier</p>
              <h2 className="text-3xl font-bold text-[#1f172b] md:text-4xl">
                What your BNN consultation gives you
              </h2>
            </div>
            <div className="max-w-2xl text-base leading-7 text-[#5f4b35]">
              The session is designed to feel premium and practical: strong timing insight,
              readable notes, and clear follow-up.
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-[#d9c8ab] bg-white p-7 shadow-[0_18px_45px_rgba(92,72,43,0.11)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6d879]/70 text-[#342313]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7243]">
                    Session dossier
                  </p>
                  <p className="text-xl font-semibold text-[#1f172b]">What is included</p>
                </div>
              </div>
              <div className="space-y-4">
                {currentService.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8b5e34]" />
                    <span className="text-base leading-7 text-[#423326]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {currentService.benefits.slice(0, 6).map((benefit, index) => (
                <div
                  key={benefit}
                  className="rounded-[28px] border border-[#d8c6aa] bg-[#fff9ef] p-6 shadow-[0_16px_30px_rgba(109,81,43,0.08)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-kalam text-2xl text-[#8b5e34]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Sparkles className="h-5 w-5 text-[#c4932d]" />
                  </div>
                  <p className="text-lg font-medium leading-7 text-[#2f241a]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#161127] py-20 text-[#f8efdc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/6 p-8 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f4ddb0]">
                Why Soul Infinity
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Precision without fear tactics
              </h2>
              {content.whySoulInfinity.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-8 text-[#ddd3bf]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative rounded-[34px] border border-white/10 bg-[#21183a] p-8 shadow-[0_24px_60px_rgba(6,4,15,0.33)]">
              <Quote className="absolute right-7 top-7 h-10 w-10 text-[#f6d879]/60" />
              <p className="font-caveat text-4xl text-[#f6d879]">editor&apos;s margin note</p>
              <p className="mt-5 text-lg leading-8 text-[#f4ebd5]">
                BNN should feel like a confidential strategy session, not a vague mystical lecture.
                That is the visual language this page now follows.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {editorialCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[22px] border border-white/10 bg-white/6 p-4"
                  >
                    <card.icon className="mb-3 h-5 w-5 text-[#f6d879]" />
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f7d46b,#f1b950)] py-20 text-[#221828]">
        <div className="absolute inset-0 opacity-15">
          <img src={bnnArchive} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-kalam text-3xl text-[#5e3d12]">ready when the question is specific</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            {content.cta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#3b2a14]">
            {content.cta.body}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('whatsapp_click', {
                  page: `/services/${category}/${service}`,
                  service: currentService.title,
                  location: 'bnn_cta',
                })
              }
              className="inline-flex items-center justify-center rounded-full bg-[#1e1633] px-8 py-4 text-base font-semibold text-[#f8efdc] transition-transform duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Send your question
            </a>
            <a
              href={phoneTel}
              onClick={() =>
                trackEvent('phone_click', {
                  page: `/services/${category}/${service}`,
                  service: currentService.title,
                  location: 'bnn_cta',
                })
              }
              className="inline-flex items-center justify-center rounded-full border border-[#2d1e0d] px-8 py-4 text-base font-semibold text-[#2f2417] transition-colors duration-300 hover:bg-white/20"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call for a fit check
            </a>
          </div>
        </div>
      </section>

      {content.faqs.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="font-caveat text-3xl text-[#8b5e34]">questions people actually ask</p>
              <h2 className="text-3xl font-bold text-[#1f172b] md:text-4xl">
                BNN consultation FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {content.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[28px] border border-[#e6d8c0] bg-[#fffaf1] shadow-[0_12px_30px_rgba(95,72,38,0.08)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg font-semibold leading-7 text-[#2b2116]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 flex-shrink-0 text-[#8b5e34] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#eadcc4] px-6 pb-6 pt-4 text-base leading-8 text-[#5f4a35]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#7b6244]">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-[#b57b1b]" />
                In-person or online from Ahmedabad
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#b57b1b]" />
                WhatsApp-friendly follow-up
              </span>
              <span className="inline-flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-[#b57b1b]" />
                Ideal for timing-sensitive questions
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
