import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import Breadcrumbs from '../components/Breadcrumbs';
import { SERVICES_CATALOG } from '../data/schema-entities';
import { getServiceContent, type ServiceContent } from '../data/services-content';
import { trackEvent } from '../utils/analytics';

interface ServiceOffering {
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
}

const WHATSAPP_BASE = 'https://wa.me/919079053840';
const PHONE_TEL = 'tel:+919079053840';

function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

const ServiceDetail = () => {
  const { category, service } = useParams<{ category: string; service: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const serviceDetails: Record<string, Record<string, ServiceOffering>> = {
    'vedic-astrology': {
      'parashari-jyotish': {
        title: 'Parashari Jyotish',
        description:
          'Classical Vedic astrology system based on the teachings of Sage Parashara, offering profound insights into your life path, karma, and spiritual evolution.',
        longDescription:
          'Parashari Jyotish is the most comprehensive and time-tested system of Vedic astrology. Named after Maharishi Parashara, it draws on the Brihat Parashara Hora Shastra for a complete reading of your Janma Kundli.',
        duration: '60-90 minutes',
        rating: 4.9,
        clients: 1200,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/an_ancient_vedic_astrology_chart_floating_above.jpeg',
        benefits: [
          'Detailed birth chart analysis with planetary positions',
          'Life purpose and spiritual path guidance',
          'Career and financial predictions with timing',
          'Relationship compatibility insights',
          'Health and wellness recommendations',
          'Timing of major life events (marriage, career changes)',
          'Remedial measures including mantras and rituals',
          'Understanding of karmic patterns and lessons',
        ],
        includes: [
          'Complete birth chart reading (Kundali)',
          'Planetary period analysis (Vimshottari Dasha)',
          'Personalised predictions summary',
          'Remedial gemstone guidance',
          'Mantra and ritual suggestions',
          'Follow-up window for clarifying questions',
          'Digital copy of your birth chart',
          'Written notes shared over WhatsApp',
        ],
        process: [
          'Share exact birth details (date, time, place)',
          'Chart preparation and analysis by Saurabh',
          'Detailed consultation session',
          'Written notes delivery',
          'Follow-up support and guidance',
        ],
      },
      'bnn': {
        title: 'BNN (Bhrigu Nandi Nadi)',
        description:
          'Compact predictive stream from the Sage Bhrigu lineage — known for tight event timing.',
        longDescription:
          'Bhrigu Nandi Nadi reads planetary karakas and Jupiter as the timer for event-specific timing. Saurabh uses it alongside Parashari and KP for cross-verified forecasting.',
        duration: '90-120 minutes',
        rating: 4.8,
        clients: 800,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Planetry_transit_nine_planets_rotating_around_a_radiant_sun.jpeg',
        benefits: [
          'Event-specific timing for major decisions',
          'Past karma and life lessons understanding',
          'Precise timing of career turning points',
          'Family and ancestral influences analysis',
          'Specific remedial measures for challenges',
          'Future life path clarity with milestones',
          'Spiritual guidance and classical mantras',
          'Deep karmic pattern recognition',
        ],
        includes: [
          'BNN chart calculation and analysis',
          'Detailed life reading covering chosen themes',
          'Past life karma insights',
          'Future predictions with probable windows',
          'Customised remedial practices',
          'Written summary of key timings',
          'Audio recording of the session',
          'Ongoing guidance for remedies',
        ],
        process: [
          'Exact birth details verification',
          'BNN chart preparation',
          'Detailed consultation with predictions',
          'Remedial measures explanation',
          'Written summary delivery',
        ],
      },
      'kp-astrology': {
        title: 'KP Astrology',
        description:
          'Krishnamurti Paddhati — scientific astrology with precise timing and yes/no clarity.',
        longDescription:
          'KP Astrology, developed by Prof. K.S. Krishnamurti, uses sub-lord theory and ruling planets for precise event timing and direct answers.',
        duration: '75-90 minutes',
        rating: 4.9,
        clients: 950,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/numerology_reading_prompt_mystic_numbers_glowing_in_the_air.jpeg',
        benefits: [
          'Scientific and precise predictions',
          'Accurate timing of events with dates',
          'Clear yes/no answers to specific questions',
          'Career and business timing guidance',
          'Marriage and relationship timing',
          'Health issue timing and remedies',
          'Financial gain and loss periods',
          'Travel and relocation guidance',
        ],
        includes: [
          'KP chart calculation with sub-lords',
          'Specific question analysis',
          'Event timing with probable windows',
          'Ruling planet analysis',
          'Remedial measures for challenges',
          'Written summary',
          'Session recording',
          'Follow-up for event verification',
        ],
        process: [
          'Birth details and specific questions',
          'KP chart preparation with calculations',
          'Scientific analysis and predictions',
          'Timing calculations for events',
          'Summary delivery with explanations',
        ],
      },
      'astro-vastu': {
        title: 'Astro Vastu',
        description:
          'Harmonise your living space with astrological and Vastu principles for prosperity and well-being.',
        longDescription:
          'Astro Vastu combines your birth chart with the property layout to produce personalised, proportionate recommendations for optimal energy flow.',
        duration: '90-150 minutes',
        rating: 4.7,
        clients: 600,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/spiritual_coaching_prompt_a_serene_spiritual_guide_radiating_golden.jpeg',
        benefits: [
          'Personalised Vastu based on your birth chart',
          'Enhanced prosperity and abundance',
          'Improved health and well-being',
          'Better relationships and harmony',
          'Career and business growth',
          'Peaceful and positive environment',
          'Protection from negative energies',
          'Optimal room and furniture placement',
        ],
        includes: [
          'Birth chart and property analysis',
          'Detailed Vastu consultation',
          'Room-wise recommendations',
          'Colour and direction guidance',
          'Remedial measures for Vastu defects',
          'Written Astro Vastu notes',
          'Implementation guidance',
          'Follow-up after changes',
        ],
        process: [
          'Birth chart analysis',
          'Property layout study',
          'Combined Astro-Vastu analysis',
          'Personalised recommendations',
          'Implementation support and follow-up',
        ],
      },
      'gem-stone': {
        title: 'Gem Stone Consultation',
        description:
          'Personalised gemstone guidance based on your birth chart for enhanced planetary benefits.',
        longDescription:
          'Gemstone therapy strengthens benefic planets when chart and dasha support it. Saurabh does not sell stones, keeping recommendations independent.',
        duration: '45-60 minutes',
        rating: 4.8,
        clients: 750,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Gemstone_Therapy_gemstone_therapy_glowing_gemstones_emerald_ruby_sapphire_floating_in.jpeg',
        benefits: [
          'Strengthening of beneficial planets',
          'Support during helpful Mahadashas',
          'Clarity on primary and substitute stones',
          'Classical wearing instructions',
          'Planetary energisation mantras',
          'No conflict of interest — we do not sell stones',
          'Honest recommendations including "no stone needed"',
          'Safe guidance on stones like Blue Sapphire',
        ],
        includes: [
          'Detailed chart analysis for gemstones',
          'Primary and substitute gemstone guidance',
          'Gemstone quality and carat guidance',
          'Wearing instructions and timing',
          'Energisation mantra',
          'Written note with specifications',
          'Jeweller-readiness checklist',
          'Care and maintenance guidance',
        ],
        process: [
          'Birth chart planetary analysis',
          'Gemstone suitability assessment',
          'Personalised recommendations',
          'Quality and wearing guidelines',
          'Energisation and care instructions',
        ],
      },
    },
    'western-astrology': {
      'tarot-card': {
        title: 'Tarot Card Reading',
        description:
          'Intuitive card readings to reflect current dynamics and decisions with clarity.',
        longDescription:
          'A Rider Waite-based tarot reading treats the cards as a mirror for the decision you are already making — focused, reflective, and actionable.',
        duration: '45-60 minutes',
        rating: 4.9,
        clients: 1500,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/tarot_card_reading_mystical_hand_laying_tarot_cards.jpeg',
        benefits: [
          'Clarity on current life situations',
          'Guidance for important decision making',
          'Insight into relationships and love life',
          'Understanding of obstacles and challenges',
          'Future possibilities and opportunities',
          'Spiritual guidance and wisdom',
          'Empowerment and confidence building',
          'Emotional healing and closure',
        ],
        includes: [
          'Three-card or Celtic Cross layout',
          'Specific question exploration',
          'Intuitive guidance and interpretation',
          'Card meanings and symbolism explanation',
          'Reading summary and key insights',
          'Guidance for action steps',
          'Photograph of the spread',
          'Optional follow-up mini-reading',
        ],
        process: [
          'Question formulation and intention setting',
          'Card selection and spread layout',
          'Intuitive interpretation and guidance',
          'Discussion and clarification',
          'Summary and action recommendations',
        ],
      },
      'symbol-analysis': {
        title: 'Symbol Analysis',
        description:
          'Deep dive into astrological and spiritual symbols and their meaning in your life.',
        longDescription:
          'Symbolic astrology treats the chart as an inner map. Saurabh reads planetary archetypes alongside recurring symbols in your dreams and daily life.',
        duration: '60-75 minutes',
        rating: 4.7,
        clients: 400,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/dream_analysis_prompt_a_sleeping_figure_surrounded_by_glowing.jpeg',
        benefits: [
          'Understanding of symbolic messages',
          'Recognition of spiritual signs',
          'Deeper self-awareness and insight',
          'Connection with higher consciousness',
          'Interpretation of dreams and visions',
          'Understanding of synchronicities',
          'Spiritual guidance through symbols',
          'Enhanced intuitive abilities',
        ],
        includes: [
          'Personal symbol identification',
          'Dream symbol interpretation',
          'Astrological archetype analysis',
          'Spiritual sign recognition',
          'Symbol notes documentation',
          'Guidance for symbol meditation',
          'Written archetype summary',
          'Follow-up symbol interpretation support',
        ],
        process: [
          'Symbol identification and documentation',
          'Historical and spiritual context analysis',
          'Personal meaning interpretation',
          'Guidance for working with symbols',
          'Ongoing symbol awareness development',
        ],
      },
      'past-life-regression': {
        title: 'Past Life Regression',
        description:
          'Guided meditation to explore past lives and understand current patterns and relationships.',
        longDescription:
          "A safe, non-directive regression that surfaces past-life impressions and therapeutic insight, influenced by Dr. Brian Weiss's method.",
        duration: '120-150 minutes',
        rating: 4.8,
        clients: 650,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/past_life_regression_prompt_a_person.jpeg',
        benefits: [
          'Understanding of current life challenges',
          'Healing of unexplained fears and phobias',
          'Insight into relationship patterns',
          'Resolution of karmic debts',
          'Spiritual growth and awareness',
          'Emotional healing and release',
          'Understanding of life purpose',
          'Connection with soul family',
        ],
        includes: [
          'Pre-regression consultation',
          'Guided relaxation and induction',
          'Past life exploration session',
          'Integration and understanding',
          'Karmic pattern analysis',
          'Healing and release work',
          'Session recording (audio)',
          'Follow-up integration conversation',
        ],
        process: [
          'Initial consultation and preparation',
          'Relaxation and meditation induction',
          'Past life exploration and experience',
          'Integration and understanding',
          'Healing work and follow-up',
        ],
      },
    },
    'healing': {
      'reiki': {
        title: 'Reiki Healing',
        description:
          'Universal life-force energy healing for physical, emotional, and spiritual wellness.',
        longDescription:
          'A certified Reiki practitioner channels universal ki to support nervous system regulation, sleep, and energetic clearing. In person or distance.',
        duration: '60-75 minutes',
        rating: 4.9,
        clients: 2000,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Pendulum%20Reiki.jpg',
        benefits: [
          'Deep relaxation and stress relief',
          'Pain and tension reduction',
          'Emotional healing and balance',
          'Improved sleep quality',
          'Enhanced mental clarity',
          'Spiritual awakening and growth',
          'Recovery support alongside medical care',
          'Increased energy and vitality',
        ],
        includes: [
          'Initial consultation and assessment',
          'Full-body energy healing session',
          'Chakra balancing and alignment',
          'Aura cleansing and protection',
          'Personalised aftercare advice',
          'Self-healing techniques overview',
          'Optional distance healing follow-up',
          'Energy maintenance guidance',
        ],
        process: [
          'Consultation and energy assessment',
          'Relaxation and preparation',
          'Reiki energy healing session',
          'Chakra balancing work',
          'Integration and aftercare guidance',
        ],
      },
      'pranic-healing': {
        title: 'Pranic Healing',
        description:
          'No-touch energy healing using prana to cleanse and energise the body\'s energy field.',
        longDescription:
          "Master Choa Kok Sui's protocol-based system: scan, cleanse diseased energy, energise with fresh prana, stabilise. In person or at distance.",
        duration: '75-90 minutes',
        rating: 4.8,
        clients: 1100,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Chakra%20Balancing.jpg',
        benefits: [
          'Support alongside medical recovery',
          'Emotional and psychological support',
          'Stress and anxiety reduction',
          'Aura and chakra cleansing',
          'Improved mental clarity and focus',
          'Spiritual protection and cleansing',
          'Increased energy levels',
          'Better sleep and relaxation',
        ],
        includes: [
          'Energy body scanning and assessment',
          'Aura and chakra cleansing',
          'Energising and revitalisation',
          'Specific concern targeting',
          'Stabilising and shielding protocol',
          'Aftercare (salt bath, hydration)',
          'Written aftercare note',
          'Follow-up session scheduling',
        ],
        process: [
          'Energy assessment and scanning',
          'Cleansing of diseased energy',
          'Energising with fresh prana',
          'Stabilisation and protection',
          'Aftercare instruction',
        ],
      },
      'theta-healing': {
        title: 'Theta Healing',
        description:
          'Meditative technique that reaches the theta brainwave state for belief reprogramming and healing.',
        longDescription:
          "Vianna Stibal's belief-work method: identify limiting beliefs at the subconscious level and, with your consent, replace them with healthier ones.",
        duration: '90-120 minutes',
        rating: 4.7,
        clients: 800,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Meditation.jpg',
        benefits: [
          'Deep emotional and trauma release',
          'Limiting belief identification and change',
          'Manifestation and goal alignment',
          'Spiritual connection and growth',
          'Intuitive ability enhancement',
          'Relationship healing and improvement',
          'Subconscious-level shifts',
          'Life purpose clarity',
        ],
        includes: [
          'Belief work and identification',
          'Theta state meditation guidance',
          'Limiting belief clearing',
          'Positive belief installation (with consent)',
          'Emotional healing work',
          'Intent and goal alignment',
          'Session notes for reference',
          'Integration support',
        ],
        process: [
          'Belief assessment and identification',
          'Theta state induction',
          'Belief clearing and healing',
          'Positive belief installation',
          'Integration and practice guidance',
        ],
      },
      'crystal-healing': {
        title: 'Crystal Healing',
        description:
          'Vibrational therapy using specific crystals placed on chakra points for balance.',
        longDescription:
          'Crystals selected for each chakra are placed on or near the body for a gentle vibrational session supporting subtle-body alignment.',
        duration: '60-75 minutes',
        rating: 4.8,
        clients: 900,
        image:
          'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/%20Chakra_Healing_meditating_figure_with_glowing_chakra_points_lotus.jpeg',
        benefits: [
          'Chakra balancing and alignment',
          'Emotional healing and stability',
          'Physical tension relief',
          'Spiritual protection and grounding',
          'Enhanced meditation and focus',
          'Stress and anxiety reduction',
          'Energy field strengthening',
          'Intent-setting and manifestation',
        ],
        includes: [
          'Crystal selection based on needs',
          'Chakra assessment and balancing',
          'Crystal placement healing session',
          'Energy cleansing and protection',
          'Crystal programming for intent',
          'Personal crystal recommendations',
          'Crystal care and maintenance guide',
          'Crystal grid design (on request)',
        ],
        process: [
          'Energy assessment and crystal selection',
          'Chakra balancing with crystals',
          'Healing session with crystal placement',
          'Energy integration and grounding',
          'Crystal care and maintenance guidance',
        ],
      },
    },
  };

  if (!category || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-primary-600 hover:text-primary-700">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const currentService = serviceDetails[category]?.[service];

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-primary-600 hover:text-primary-700">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const categoryNames: Record<string, string> = {
    'vedic-astrology': 'Vedic Astrology',
    'western-astrology': 'Western Astrology',
    'healing': 'Spiritual Healing',
  };

  const catalogEntry = SERVICES_CATALOG.find(
    (s) => s.category === category && s.slug === service,
  );
  const content: ServiceContent | undefined = getServiceContent(category, service);

  const seoTitle =
    catalogEntry?.seoTitle ?? `${currentService.title} - ${categoryNames[category]} | Soul Infinity`;
  const seoDescription = catalogEntry?.seoDescription ?? currentService.description;
  const pageH1 = content?.h1 ?? catalogEntry?.h1 ?? currentService.title;

  const whatsappUrl = content
    ? buildWhatsAppUrl(content.cta.whatsappMessage)
    : buildWhatsAppUrl(`Hi, I'm interested in ${currentService.title} consultation`);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={`${currentService.title.toLowerCase()}, ${category.replace('-', ' ')}, ${categoryNames[category].toLowerCase()} ahmedabad, vedic astrologer in ahmedabad, certified astrologer ahmedabad, K.N. Rao Institute trained, online astrology consultation india, saurabh jain astrologer`}
        image={currentService.image}
        type="article"
        omitDefaultSchema
      />
      {catalogEntry && (
        <SchemaMarkup
          type="service-detail"
          service={catalogEntry}
          serviceOffer={{ duration: currentService.duration }}
          serviceFaqs={content?.faqs}
        />
      )}

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: categoryNames[category], href: `/services/${category}` },
          { label: currentService.title },
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center text-primary-800 hover:text-primary-700 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>

              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  {pageH1}
                </span>
              </h1>

              {content?.heroTagline && (
                <p className="text-lg text-gray-500 mb-4 italic">{content.heroTagline}</p>
              )}

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {content?.heroIntro ?? currentService.longDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{currentService.duration}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2 fill-current" />
                  <div className="font-semibold text-gray-900">{currentService.rating}</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{currentService.clients}+</div>
                  <div className="text-sm text-gray-500">Clients</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      page: `/services/${category}/${service}`,
                      service: currentService.title,
                      location: 'hero',
                    })
                  }
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
                <a
                  href={PHONE_TEL}
                  onClick={() =>
                    trackEvent('phone_click', {
                      page: `/services/${category}/${service}`,
                      service: currentService.title,
                      location: 'hero',
                    })
                  }
                  className="border-2 border-primary-500 text-primary-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={currentService.image}
                alt={`${currentService.title} — ${content?.primaryKeyword ?? categoryNames[category]} by Saurabh Jain`}
                width="1200"
                height="384"
                fetchpriority="high"
                className="w-full h-96 object-cover rounded-2xl shadow-soft"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rich content sections */}
      {content && (
        <>
          {/* What Is */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
                  {content.whatIs.heading}
                </h2>
                {content.whatIs.paragraphs.map((para, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
                {content.whatIs.shloka && (
                  <figure className="my-6 p-6 bg-white rounded-xl border-l-4 border-primary-500 shadow-sm">
                    <blockquote>
                      <p className="font-heading text-xl text-primary-900 mb-2" lang="sa">
                        {content.whatIs.shloka.sanskrit}
                      </p>
                      <p className="text-sm italic text-gray-600 mb-2">
                        {content.whatIs.shloka.iast}
                      </p>
                      <p className="text-gray-700">
                        &ldquo;{content.whatIs.shloka.english}&rdquo;
                      </p>
                    </blockquote>
                    {content.whatIs.shloka.source && (
                      <figcaption className="text-xs text-gray-500 mt-2">
                        — {content.whatIs.shloka.source}
                      </figcaption>
                    )}
                  </figure>
                )}
                {content.whatIs.hindiPhrase && (
                  <p className="text-gray-700 leading-relaxed">
                    In Hindi, we often call this{' '}
                    <span lang="hi" className="font-semibold">
                      {content.whatIs.hindiPhrase.devanagari}
                    </span>{' '}
                    ({content.whatIs.hindiPhrase.transliteration} —{' '}
                    {content.whatIs.hindiPhrase.english}).
                  </p>
                )}
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
                  {content.howItWorks.heading}
                </h2>
                {content.howItWorks.paragraphs.map((para, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Problems Addressed */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
                  {content.problemsAddressed.heading}
                </h2>
                {content.problemsAddressed.intro && (
                  <p className="text-lg text-gray-700 mb-6">
                    {content.problemsAddressed.intro}
                  </p>
                )}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.problemsAddressed.items.map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Your Session */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
                  {content.session.heading}
                </h2>
                {content.session.paragraphs.map((para, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Why Soul Infinity */}
          <section className="py-16 bg-surface">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
                  {content.whySoulInfinity.heading}
                </h2>
                {content.whySoulInfinity.paragraphs.map((para, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* Benefits & What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading font-bold text-3xl text-gray-900 mb-8">
                Benefits You'll Experience
              </h2>
              <div className="space-y-4">
                {currentService.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-heading font-bold text-3xl text-gray-900 mb-8">
                What's Included
              </h2>
              <div className="space-y-4">
                {currentService.includes.map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practitioner Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-soft text-center"
          >
            <img
              src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/People/saurabh%20chat1.png"
              alt="Saurabh Jain — K.N. Rao Institute trained certified astrologer in Ahmedabad"
              width="96"
              height="96"
              loading="lazy"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-100 mb-6"
            />
            <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">
              Saurabh Jain
            </h3>
            <p className="text-primary-600 font-semibold mb-4">
              K.N. Rao Institute Trained · M.Tech · MBA · M.Phil
            </p>
            <p className="text-gray-600 mb-6">
              With 15+ years of disciplined practice and K.N. Rao Institute certification,
              Saurabh brings classical Vedic rigour and a technical mind to every session.
            </p>
            <Link
              to="/cosmic-guide"
              className="text-primary-800 font-semibold hover:text-primary-700 inline-flex items-center"
            >
              Learn More About Saurabh
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Block — WhatsApp first */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Cosmic-time.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            {content?.cta.heading ?? `Book Your ${currentService.title} Consultation`}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {content?.cta.body ??
              'For personalised pricing based on your specific needs and consultation depth, reach out directly via WhatsApp or phone.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('whatsapp_click', {
                  page: `/services/${category}/${service}`,
                  service: currentService.title,
                  location: 'cta',
                })
              }
              className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </a>
            <a
              href={PHONE_TEL}
              onClick={() =>
                trackEvent('phone_click', {
                  page: `/services/${category}/${service}`,
                  service: currentService.title,
                  location: 'cta',
                })
              }
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              +91 90790 53840
            </a>
          </div>
          <p className="text-sm text-primary-100">
            Mon-Fri 12 PM-9 PM | Sat 10 AM-3 PM | Response within 24 hours
          </p>
        </div>
      </section>

      {/* FAQs */}
      {content && content.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading font-bold text-3xl text-gray-900 mb-10 text-center"
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-4">
              {content.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.question}
                    className="bg-surface rounded-xl border border-gray-100 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-start justify-between text-left p-5 hover:bg-primary-50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading font-semibold text-lg text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary-600 flex-shrink-0 mt-1 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Information */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Phone className="w-8 h-8 text-primary-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <p className="text-gray-600">+91 90790 53840</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
              <p className="text-gray-600">+91 90790 53840</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-accent-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
              <p className="text-gray-600">
                Mon-Fri: 12PM-9PM
                <br />
                Sat: 10AM-3PM
              </p>
            </div>
          </div>
          <p className="text-gray-600 inline-flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2 text-primary-500" aria-hidden="true" />
            The Meadows, D3 901, Adani Shantigram, Khodiyar, Ahmedabad, Gujarat 382501, India
          </p>
        </div>
      </section>

      {/* Related Services */}
      {catalogEntry && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-3xl text-gray-900 mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {catalogEntry.relatedSlugs
                .map((slug) => SERVICES_CATALOG.find((s) => s.slug === slug))
                .filter((s): s is NonNullable<typeof s> => !!s)
                .map((related) => {
                  const detail = serviceDetails[related.category]?.[related.slug];
                  const image = detail?.image ?? currentService.image;
                  return (
                    <Link
                      key={related.slug}
                      to={`/services/${related.category}/${related.slug}`}
                      className="group block bg-surface rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={`${related.title} — ${related.categoryName} service`}
                          width="400"
                          height="192"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {related.description}
                        </p>
                        <span className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700">
                          Learn More
                          <ArrowRight
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetail;
