import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Users, CheckCircle, ArrowRight, Phone, MessageCircle, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import { SERVICES_CATALOG } from '../data/schema-entities';

interface ServiceOffering {
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  price: string;
  rating: number;
  clients: number;
  image: string;
  benefits: readonly string[];
  includes: readonly string[];
  process: readonly string[];
}

const ServiceDetail = () => {
  const { category, service } = useParams<{ category: string; service: string }>();

  const serviceDetails: Record<string, Record<string, ServiceOffering>> = {
    'vedic-astrology': {
      'parashari-jyotish': {
        title: 'Parashari Jyotish',
        description: 'Classical Vedic astrology system based on the teachings of Sage Parashara, offering profound insights into your life path, karma, and spiritual evolution.',
        longDescription: 'Parashari Jyotish is the most comprehensive and time-tested system of Vedic astrology. Named after the great sage Parashara, this ancient science provides deep insights into your personality, relationships, career, health, and spiritual growth. Saurabh Jain uses your birth chart to reveal the cosmic influences shaping your life and provide guidance for making informed decisions.',
        duration: '60-90 minutes',
        price: '₹2,500',
        rating: 4.9,
        clients: 1200,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/an_ancient_vedic_astrology_chart_floating_above.jpeg',
        benefits: [
          'Detailed birth chart analysis with planetary positions',
          'Life purpose and spiritual path guidance',
          'Career and financial predictions with timing',
          'Relationship compatibility insights',
          'Health and wellness recommendations',
          'Timing of major life events (marriage, career changes)',
          'Remedial measures including mantras and rituals',
          'Understanding of karmic patterns and lessons'
        ],
        includes: [
          'Complete birth chart reading (Kundali)',
          'Planetary period analysis (Dasha system)',
          'Personalized predictions report (written)',
          'Remedial gemstone recommendations',
          'Mantra and ritual suggestions',
          'Follow-up consultation (30 mins within 1 month)',
          'Digital copy of your birth chart',
          'Lifetime chart reference access'
        ],
        process: [
          'Provide exact birth details (date, time, place)',
          'Chart preparation and analysis by Saurabh',
          'Detailed consultation session',
          'Written report delivery',
          'Follow-up support and guidance'
        ]
      },
      'bnn': {
        title: 'BNN (Bhrigu Nandi Nadi)',
        description: 'Ancient palm leaf astrology system for precise predictions and remedies based on the Bhrigu Samhita.',
        longDescription: 'Bhrigu Nandi Nadi is a rare and highly accurate system of astrology based on the ancient palm leaf manuscripts. This system provides incredibly precise predictions about your past, present, and future. Saurabh Jain uses this advanced technique to reveal detailed information about your life events with remarkable accuracy.',
        duration: '90-120 minutes',
        price: '₹4,500',
        rating: 4.8,
        clients: 800,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Planetry_transit_nine_planets_rotating_around_a_radiant_sun.jpeg',
        benefits: [
          'Highly accurate life predictions with specific timing',
          'Past karma and life lessons understanding',
          'Precise timing of major life events',
          'Family and ancestral influences analysis',
          'Specific remedial measures for challenges',
          'Future life path clarity with milestones',
          'Spiritual guidance and advanced mantras',
          'Deep karmic pattern recognition'
        ],
        includes: [
          'BNN chart calculation and analysis',
          'Detailed life reading covering all aspects',
          'Past life karma insights',
          'Future predictions with specific timeline',
          'Customized remedial rituals and practices',
          'Written comprehensive prediction report',
          'Audio recording of the session',
          'Ongoing guidance for remedial measures'
        ],
        process: [
          'Exact birth details verification',
          'BNN chart preparation using ancient methods',
          'Detailed consultation with predictions',
          'Remedial measures explanation',
          'Written report and audio delivery'
        ]
      },
      'kp-astrology': {
        title: 'KP Astrology',
        description: 'Krishnamurti Paddhati - Scientific approach to astrology with precise timing and accurate predictions.',
        longDescription: 'KP Astrology, developed by Prof. K.S. Krishnamurti, is a scientific and precise method of astrological prediction. This system eliminates ambiguity and provides clear, time-bound predictions. Saurabh Jain specializes in this advanced technique for accurate timing of events.',
        duration: '75-90 minutes',
        price: '₹3,000',
        rating: 4.9,
        clients: 950,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/numerology_reading_prompt_mystic_numbers_glowing_in_the_air.jpeg',
        benefits: [
          'Scientific and precise predictions',
          'Accurate timing of events with dates',
          'Clear yes/no answers to specific questions',
          'Career and business timing guidance',
          'Marriage and relationship timing',
          'Health issue timing and remedies',
          'Financial gain and loss periods',
          'Travel and relocation guidance'
        ],
        includes: [
          'KP chart calculation with sub-lords',
          'Specific question analysis',
          'Event timing with precise dates',
          'Ruling planet analysis',
          'Remedial measures for challenges',
          'Written prediction report',
          'Question-answer session recording',
          'Follow-up for event verification'
        ],
        process: [
          'Birth details and specific questions',
          'KP chart preparation with calculations',
          'Scientific analysis and predictions',
          'Timing calculations for events',
          'Report delivery with explanations'
        ]
      },
      'astro-vastu': {
        title: 'Astro Vastu',
        description: 'Harmonize your living space with astrological and Vastu principles for prosperity and well-being.',
        longDescription: 'Astro Vastu combines the ancient sciences of astrology and Vastu Shastra to create harmonious living and working spaces. Saurabh Jain analyzes your birth chart along with your property layout to provide personalized recommendations for optimal energy flow.',
        duration: '120-150 minutes',
        price: '₹5,000',
        rating: 4.7,
        clients: 600,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/spiritual_coaching_prompt_a_serene_spiritual_guide_radiating_golden.jpeg',
        benefits: [
          'Personalized Vastu based on your birth chart',
          'Enhanced prosperity and abundance',
          'Improved health and well-being',
          'Better relationships and harmony',
          'Career and business growth',
          'Peaceful and positive environment',
          'Protection from negative energies',
          'Optimal room and furniture placement'
        ],
        includes: [
          'Birth chart and property analysis',
          'Detailed Vastu consultation',
          'Room-wise recommendations',
          'Color and direction guidance',
          'Remedial measures for Vastu defects',
          'Written Vastu report with diagrams',
          'Implementation guidance',
          'Follow-up consultation after changes'
        ],
        process: [
          'Birth chart analysis',
          'Property layout study',
          'Combined Astro-Vastu analysis',
          'Personalized recommendations',
          'Implementation support and follow-up'
        ]
      },
      'gem-stone': {
        title: 'Gem Stone Consultation',
        description: 'Personalized gemstone recommendations based on your birth chart for enhanced planetary benefits.',
        longDescription: 'Gemstone therapy is a powerful remedial measure in Vedic astrology. Saurabh Jain analyzes your birth chart to recommend specific gemstones that can strengthen beneficial planets and mitigate negative influences, bringing harmony and success to your life.',
        duration: '45-60 minutes',
        price: '₹2,000',
        rating: 4.8,
        clients: 750,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Gemstone_Therapy_gemstone_therapy_glowing_gemstones_emerald_ruby_sapphire_floating_in.jpeg',
        benefits: [
          'Strengthening of beneficial planets',
          'Protection from negative planetary influences',
          'Enhanced luck and prosperity',
          'Improved health and vitality',
          'Better relationships and harmony',
          'Career and business success',
          'Spiritual growth and protection',
          'Emotional balance and peace'
        ],
        includes: [
          'Detailed birth chart analysis for gemstones',
          'Primary and secondary gemstone recommendations',
          'Gemstone quality and specifications',
          'Wearing instructions and timing',
          'Alternative gemstone options',
          'Gemstone energization mantras',
          'Written gemstone report',
          'Guidance on gemstone care and maintenance'
        ],
        process: [
          'Birth chart planetary analysis',
          'Gemstone suitability assessment',
          'Personalized recommendations',
          'Quality and wearing guidelines',
          'Energization and care instructions'
        ]
      }
    },
    'western-astrology': {
      'tarot-card': {
        title: 'Tarot Card Reading',
        description: 'Intuitive card readings to reveal hidden truths and future possibilities using traditional and modern tarot decks.',
        longDescription: 'Tarot card readings combine intuitive insights with traditional interpretations to provide guidance on your life questions. Saurabh Jain uses his psychic abilities along with various tarot spreads to help you understand the messages from the cards and how to apply them to your life.',
        duration: '45-60 minutes',
        price: '₹1,800',
        rating: 4.9,
        clients: 1500,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/tarot_card_reading_mystical_hand_laying_tarot_cards.jpeg',
        benefits: [
          'Clarity on current life situations',
          'Guidance for important decision making',
          'Insight into relationships and love life',
          'Understanding of obstacles and challenges',
          'Future possibilities and opportunities',
          'Spiritual guidance and wisdom',
          'Empowerment and confidence building',
          'Emotional healing and closure'
        ],
        includes: [
          'Three-card past/present/future spread',
          'Celtic Cross comprehensive reading',
          'Specific question exploration',
          'Intuitive guidance and interpretation',
          'Card meanings and symbolism explanation',
          'Reading summary and key insights',
          'Guidance for action steps',
          'Optional follow-up mini reading'
        ],
        process: [
          'Question formulation and intention setting',
          'Card selection and spread layout',
          'Intuitive interpretation and guidance',
          'Discussion and clarification',
          'Summary and action recommendations'
        ]
      },
      'symbol-analysis': {
        title: 'Symbol Analysis',
        description: 'Deep dive into astrological symbols and their meaning in your life for profound understanding.',
        longDescription: 'Symbol Analysis involves interpreting the deeper meanings of astrological and spiritual symbols that appear in your life. Saurabh Jain helps you understand the symbolic language of the universe and how these signs guide your spiritual journey.',
        duration: '60-75 minutes',
        price: '₹2,200',
        rating: 4.7,
        clients: 400,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/dream_analysis_prompt_a_sleeping_figure_surrounded_by_glowing.jpeg',
        benefits: [
          'Understanding of symbolic messages',
          'Recognition of spiritual signs',
          'Deeper self-awareness and insight',
          'Connection with higher consciousness',
          'Interpretation of dreams and visions',
          'Understanding of synchronicities',
          'Spiritual guidance through symbols',
          'Enhanced intuitive abilities'
        ],
        includes: [
          'Personal symbol identification',
          'Dream symbol interpretation',
          'Astrological symbol analysis',
          'Spiritual sign recognition',
          'Symbol meaning documentation',
          'Guidance for symbol meditation',
          'Written symbol dictionary',
          'Ongoing symbol interpretation support'
        ],
        process: [
          'Symbol identification and documentation',
          'Historical and spiritual context analysis',
          'Personal meaning interpretation',
          'Guidance for working with symbols',
          'Ongoing symbol awareness development'
        ]
      },
      'past-life-regression': {
        title: 'Past Life Regression',
        description: 'Explore your past lives to understand current life patterns and relationships through guided meditation.',
        longDescription: 'Past Life Regression is a therapeutic technique that uses guided meditation to help you access memories from previous lifetimes. Saurabh Jain facilitates this journey to help you understand current life challenges, relationships, and karmic patterns.',
        duration: '120-150 minutes',
        price: '₹4,000',
        rating: 4.8,
        clients: 650,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/past_life_regression_prompt_a_person.jpeg',
        benefits: [
          'Understanding of current life challenges',
          'Healing of unexplained fears and phobias',
          'Insight into relationship patterns',
          'Resolution of karmic debts',
          'Spiritual growth and awareness',
          'Emotional healing and release',
          'Understanding of life purpose',
          'Connection with soul family'
        ],
        includes: [
          'Pre-regression consultation',
          'Guided relaxation and meditation',
          'Past life exploration session',
          'Integration and understanding',
          'Karmic pattern analysis',
          'Healing and release work',
          'Session recording (audio)',
          'Follow-up integration session'
        ],
        process: [
          'Initial consultation and preparation',
          'Relaxation and meditation induction',
          'Past life exploration and experience',
          'Integration and understanding',
          'Healing work and follow-up'
        ]
      }
    },
    'healing': {
      'reiki': {
        title: 'Reiki Healing',
        description: 'Universal life force energy healing for physical, emotional, and spiritual wellness.',
        longDescription: 'Reiki is a gentle yet powerful healing technique that channels universal life force energy to promote healing and balance. Saurabh Jain, as a certified Reiki practitioner, helps you release energy blockages, reduce stress, and restore harmony to your body, mind, and spirit.',
        duration: '60-75 minutes',
        price: '₹1,500',
        rating: 4.9,
        clients: 2000,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Pendulum%20Reiki.jpg',
        benefits: [
          'Deep relaxation and stress relief',
          'Pain and tension reduction',
          'Emotional healing and balance',
          'Improved sleep quality',
          'Enhanced mental clarity',
          'Spiritual awakening and growth',
          'Faster recovery from illness',
          'Increased energy and vitality'
        ],
        includes: [
          'Initial consultation and assessment',
          'Full-body energy healing session',
          'Chakra balancing and alignment',
          'Aura cleansing and protection',
          'Personalized aftercare advice',
          'Self-healing techniques training',
          'Optional distance healing follow-up',
          'Energy maintenance guidance'
        ],
        process: [
          'Consultation and energy assessment',
          'Relaxation and preparation',
          'Reiki energy healing session',
          'Chakra balancing work',
          'Integration and aftercare guidance'
        ]
      },
      'pranic-healing': {
        title: 'Pranic Healing',
        description: 'Advanced energy healing technique to cleanse and energize your aura and chakras.',
        longDescription: 'Pranic Healing is a highly evolved system of energy healing that utilizes prana (life force) to heal the body. Saurabh Jain uses this no-touch healing method to cleanse, energize, and revitalize your energy body, promoting rapid healing and well-being.',
        duration: '75-90 minutes',
        price: '₹2,000',
        rating: 4.8,
        clients: 1100,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Chakra%20Balancing.jpg',
        benefits: [
          'Rapid healing of physical ailments',
          'Emotional and psychological healing',
          'Stress and anxiety reduction',
          'Enhanced immune system function',
          'Improved mental clarity and focus',
          'Spiritual protection and cleansing',
          'Increased energy levels',
          'Better sleep and relaxation'
        ],
        includes: [
          'Energy body scanning and assessment',
          'Aura and chakra cleansing',
          'Energizing and revitalization',
          'Specific ailment targeting',
          'Protective energy shielding',
          'Self-healing techniques training',
          'Written healing protocol',
          'Follow-up healing session'
        ],
        process: [
          'Energy assessment and scanning',
          'Cleansing of diseased energy',
          'Energizing with fresh prana',
          'Stabilization and protection',
          'Self-healing instruction'
        ]
      },
      'theta-healing': {
        title: 'Theta Healing',
        description: 'Powerful meditation technique to access theta brain waves for deep healing and transformation.',
        longDescription: 'Theta Healing is a meditation technique that allows access to the theta brain wave state for deep healing and positive change. Saurabh Jain guides you through this process to identify and change limiting beliefs, heal emotional trauma, and manifest positive outcomes.',
        duration: '90-120 minutes',
        price: '₹2,800',
        rating: 4.7,
        clients: 800,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Meditation.jpg',
        benefits: [
          'Deep emotional and trauma healing',
          'Limiting belief identification and change',
          'Manifestation and goal achievement',
          'Spiritual connection and growth',
          'Intuitive ability enhancement',
          'Relationship healing and improvement',
          'Physical healing acceleration',
          'Life purpose clarity'
        ],
        includes: [
          'Belief work and identification',
          'Theta state meditation guidance',
          'Limiting belief clearing',
          'Positive belief installation',
          'Emotional healing work',
          'Manifestation programming',
          'Session recording for practice',
          'Ongoing belief work support'
        ],
        process: [
          'Belief assessment and identification',
          'Theta state induction',
          'Belief clearing and healing',
          'Positive programming installation',
          'Integration and practice guidance'
        ]
      },
      'crystal-healing': {
        title: 'Crystal Healing',
        description: 'Harness the vibrational energy of crystals to balance your chakras and promote healing.',
        longDescription: 'Crystal Healing uses the vibrational properties of crystals and gemstones to restore balance and harmony to your energy system. Saurabh Jain selects specific crystals based on your needs to facilitate healing, protection, and spiritual growth.',
        duration: '60-75 minutes',
        price: '₹1,800',
        rating: 4.8,
        clients: 900,
        image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/%20Chakra_Healing_meditating_figure_with_glowing_chakra_points_lotus.jpeg',
        benefits: [
          'Chakra balancing and alignment',
          'Emotional healing and stability',
          'Physical pain and tension relief',
          'Spiritual protection and grounding',
          'Enhanced meditation and focus',
          'Stress and anxiety reduction',
          'Energy field strengthening',
          'Manifestation and abundance'
        ],
        includes: [
          'Crystal selection based on needs',
          'Chakra assessment and balancing',
          'Crystal placement healing session',
          'Energy cleansing and protection',
          'Crystal programming for goals',
          'Personal crystal recommendations',
          'Crystal care and maintenance guide',
          'Take-home crystal set'
        ],
        process: [
          'Energy assessment and crystal selection',
          'Chakra balancing with crystals',
          'Healing session with crystal placement',
          'Energy integration and grounding',
          'Crystal care and maintenance guidance'
        ]
      }
    }
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
    'healing': 'Healing'
  };

  const catalogEntry = SERVICES_CATALOG.find(
    (s) => s.category === category && s.slug === service,
  );
  const seoTitle = catalogEntry?.seoTitle
    ?? `${currentService.title} - ${categoryNames[category]} | Soul Infinity`;
  const seoDescription = catalogEntry?.seoDescription ?? currentService.description;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={`${currentService.title.toLowerCase()}, ${category.replace('-', ' ')}, ${categoryNames[category].toLowerCase()} ahmedabad, spiritual guidance, consultation, saurabh jain, soul infinity`}
        image={currentService.image}
        type="article"
        omitDefaultSchema
      />
      {catalogEntry && (() => {
        const priceNumber = Number(currentService.price.replace(/[^\d]/g, ''));
        return (
          <SchemaMarkup
            type="service-detail"
            service={catalogEntry}
            serviceOffer={{
              price: Number.isFinite(priceNumber) && priceNumber > 0 ? priceNumber : undefined,
              duration: currentService.duration,
            }}
          />
        );
      })()}

      {/* Breadcrumb */}
      <section className="bg-surface py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span aria-hidden="true" className="text-gray-400">/</span>
            <Link to="/services" className="text-gray-500 hover:text-gray-700">Services</Link>
            <span aria-hidden="true" className="text-gray-400">/</span>
            <span aria-current="page" className="text-primary-600 font-medium">{currentService.title}</span>
          </nav>
        </div>
      </section>

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
                  {catalogEntry?.h1 ?? currentService.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {currentService.longDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Book Consultation
                </Link>
                <a
                  href="tel:+919079053840"
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
                alt={currentService.title}
                className="w-full h-96 object-cover rounded-2xl shadow-soft"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits & What's Included */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
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

      {/* Process Section */}
      {currentService.process && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading font-bold text-3xl text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple steps to begin your transformative journey
              </p>
            </motion.div>

            <div className="space-y-8">
              {currentService.process.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Practitioner Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-soft text-center"
          >
            <img
              src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/People/saurabh%20chat1.png"
              alt="Saurabh Jain"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-100 mb-6"
            />
            <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">
              Saurabh Jain
            </h3>
            <p className="text-primary-600 font-semibold mb-4">
              Certified Professional Astrologer
            </p>
            <p className="text-gray-600 mb-6">
              With 15+ years of experience and certification from K.N. Rao Institute, 
              Saurabh brings authentic wisdom and compassionate guidance to every session.
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

      {/* Contact Information */}
      <section className="py-20 bg-white">
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
              <p className="text-gray-600">Mon-Fri: 12PM-9PM<br />Sat: 10AM-3PM</p>
            </div>
          </div>
          <p className="text-gray-600 inline-flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2 text-primary-500" aria-hidden="true" />
            The D3 Medows, Adani Shantigram, Ahmedabad, Gujarat 382421, India
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Cosmic-time.jpg" 
            alt="Cosmic Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Take the first step towards clarity and healing. Book your {currentService.title} session today 
            and experience the transformative power of authentic spiritual guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Book Consultation
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              Ask Questions First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;