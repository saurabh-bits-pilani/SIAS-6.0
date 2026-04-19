import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Pause, Sun, Moon, Zap, Brain, Sparkles, Heart, Clock, Eye, Flame,
  BookOpen,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

interface IconProps {
  className?: string;
}

interface PlanetMantra {
  planet: string;
  sanskritName: string;
  mantra: string;
  mp3Url: string;
  meaning: string;
  benefits: readonly string[];
  howToChant: readonly string[];
  icon: ComponentType<IconProps>;
  color: string;
}

const navagrahaData: readonly PlanetMantra[] = [
  {
    planet: 'Sun',
    sanskritName: 'सूर्य',
    mantra: 'जपाकुसुम संकाशं काश्यपेयं महाद्युतिम् । तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Sun%20Mantra%20-%20Om%20Japa%20Kusuma%20-%20Remove%20Negative%20Energy%20-%20Ancient%20Sun%20Mantra.mp3',
    meaning: 'A prayer to Lord Surya, remover of darkness and sins, bestowing energy and vitality.',
    benefits: [
      'Boosts confidence and vitality',
      'Removes obstacles and negativity',
      'Promotes leadership qualities',
    ],
    howToChant: [
      'Face east during sunrise',
      'Sit in a clean, calm place',
      'Chant 108 times using a rosary',
    ],
    icon: Sun,
    color: 'from-orange-500 to-yellow-500',
  },
  {
    planet: 'Moon',
    sanskritName: 'चन्द्र',
    mantra: 'दधिशंखतुषाराभं क्षीरोदार्णवसंभवम् । नमामि शशिनं सोमं शंभोर्मुकुट भूषणम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Chandra%20Shanti%20Graha%20Mantra%20Soul-Infinity%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%20%EF%BD%9C%20Chandra%20Graha%20Stotram.mp3',
    meaning: 'A prayer to Chandra Deva for calmness, emotional balance, and mental clarity.',
    benefits: [
      'Improves emotional stability',
      'Enhances intuition',
      'Supports mental health',
    ],
    howToChant: [
      'Face west in the evening',
      'Chant on Mondays',
      'Use white flowers or sandalwood while chanting',
    ],
    icon: Moon,
    color: 'from-blue-400 to-indigo-500',
  },
  {
    planet: 'Mars',
    sanskritName: 'मंगल',
    mantra: 'धरणीगर्भसंभूतं विद्युत्कांति समप्रभम् । कुमारं शक्तिहस्तं तं मंगलं प्रणाम्यहम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Mangal%20Shanti%20Graha%20Mantra%20Soul-Infinity%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%20%EF%BD%9C%20Mangal%20Graha%20Stotram%20.mp3',
    meaning: 'A prayer to Mangal Deva for strength, courage, and victory.',
    benefits: [
      'Gives strength and courage',
      'Protects from enemies',
      'Improves discipline',
    ],
    howToChant: [
      'Chant on Tuesdays',
      'Face south',
      'Offer red flowers',
    ],
    icon: Zap,
    color: 'from-red-500 to-orange-500',
  },
  {
    planet: 'Mercury',
    sanskritName: 'बुध',
    mantra: 'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम् । सौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Budh%20Shanti%20Graha%20Mantra%20%7CSoul-Infinity%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%EF%BD%9CBudh%20Graha%20Stotram%20.mp3',
    meaning: 'A prayer to Budh Deva for intellect, wisdom, and communication skills.',
    benefits: [
      'Enhances communication',
      'Improves business skills',
      'Boosts memory',
    ],
    howToChant: [
      'Chant on Wednesdays',
      'Wear green clothes',
      'Face north',
    ],
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
  },
  {
    planet: 'Jupiter',
    sanskritName: 'गुरु',
    mantra: 'देवानांच ऋषीनांच गुरुं कांचनसन्निभम् । बुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Guru%20Shanti%20Graha%20Mantra%20Soul-Infinity%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%20%EF%BD%9C%20Guru%20Graha%20Stotram%20.mp3',
    meaning: 'A prayer to Brihaspati for wisdom, knowledge, and spiritual growth.',
    benefits: [
      'Improves wisdom',
      'Supports education',
      'Brings prosperity',
    ],
    howToChant: [
      'Chant on Thursdays',
      'Offer yellow flowers',
      'Face northeast',
    ],
    icon: Sparkles,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    planet: 'Venus',
    sanskritName: 'शुक्र',
    mantra: 'हिमकुंदमृणालाभं दैत्यानां परमं गुरुम् । सर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Shukra%20Shanti%20Graha%20Mantra%20Soul-Infinity%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%20%EF%BD%9C%20Shukra%20Graha%20Stotram%20.mp3',
    meaning: 'A prayer to Shukra Deva for harmony, wealth, and artistic talents.',
    benefits: [
      'Attracts wealth',
      'Improves relationships',
      'Boosts artistic skills',
    ],
    howToChant: [
      'Chant on Fridays',
      'Wear white clothes',
      'Face east',
    ],
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
  },
  {
    planet: 'Saturn',
    sanskritName: 'शनि',
    mantra: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम् । छायामार्तण्डसंभूतं तं नमामि शनैश्चरम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Shani%20Shanti%20Graha%20Mantra%20Soul-Infinity%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%20%EF%BD%9C%20Shani%20Graha%20%EF%BD%9C%20Shani%20Jayanti%20.mp3',
    meaning: 'A prayer to Shani Dev for discipline, justice, and removal of hardships.',
    benefits: [
      'Removes obstacles',
      'Gives patience and discipline',
      'Protects from negative karma',
    ],
    howToChant: [
      'Chant on Saturdays',
      'Offer sesame oil',
      'Face west',
    ],
    icon: Clock,
    color: 'from-purple-600 to-indigo-600',
  },
  {
    planet: 'Rahu',
    sanskritName: 'राहु',
    mantra: 'अर्धकायं महावीर्यं चंद्रादित्यविमर्दनम् । सिंहिकागर्भसंभूतं तं राहुं प्रणमाम्यहम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Rahu%20Shanti%20Graha%20Mantra%20108%20Times%20With%20Lyrics%20%EF%BD%9C%20Navgraha%20Mantra%20.mp3',
    meaning: 'A prayer to Rahu for removing illusions, confusion, and fear.',
    benefits: [
      'Removes confusion',
      'Protects from deception',
      'Strengthens determination',
    ],
    howToChant: [
      'Chant on Saturdays or during Rahu Kaal',
      'Offer black sesame',
      'Face southwest',
    ],
    icon: Eye,
    color: 'from-gray-700 to-gray-900',
  },
  {
    planet: 'Ketu',
    sanskritName: 'केतु',
    mantra: 'पलाशपुष्पसंकाशं तारकाग्रह मस्तकम् । रौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम् ॥',
    mp3Url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Mantra%20File%20-Mp3/Ketu%20Shanti%20Graha%20Mantra%20Soul-Infinity%20With.mp3',
    meaning: 'A prayer to Ketu for spiritual growth, detachment, and protection from unseen forces.',
    benefits: [
      'Enhances spiritual insight',
      'Removes hidden obstacles',
      'Promotes detachment',
    ],
    howToChant: [
      'Chant on Tuesdays',
      'Offer durva grass',
      'Face south',
    ],
    icon: Flame,
    color: 'from-orange-600 to-red-700',
  },
];

const Mantra = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentPlanet = navagrahaData[activeTab];
  const CurrentPlanetIcon = currentPlanet.icon;

  const stopAudio = useCallback((): void => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const handlePlayPause = useCallback((): void => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    const audio = new Audio(currentPlanet.mp3Url);
    audioRef.current = audio;

    audio.addEventListener('canplay', () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          stopAudio();
        });
    });
    audio.addEventListener('ended', stopAudio);
    audio.addEventListener('error', stopAudio);
  }, [currentPlanet.mp3Url, isPlaying, stopAudio]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    stopAudio();
  }, [activeTab, stopAudio]);

  return (
    <>
      <SEOHead
        title="Sacred Mantras Guide - Meaning, Benefits & How to Chant | Soul Infinity"
        description="Complete guide to powerful Vedic mantras, their meanings, pronunciation & spiritual benefits. Learn proper chanting technique from Saurabh Jain."
        keywords="navagraha mantras, planetary mantras, sanskrit chants, sun mantra, moon mantra, mars mantra, mercury mantra, jupiter mantra, venus mantra, saturn mantra, rahu mantra, ketu mantra, vedic chanting, spiritual mantras"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_himalayan_cave_illuminated_by_flickering_oil.webp"
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="blog-post"
        post={{
          headline: 'Navagraha Mantras — Sacred Chants for the Nine Planets',
          description:
            'Complete guide to Navagraha mantras: Sanskrit text, meaning, benefits, and chanting methodology for each of the nine planets.',
          image:
            'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_himalayan_cave_illuminated_by_flickering_oil.webp',
          // TODO: replace placeholder dates with real publication history
          // when authoring timestamps become available.
          datePublished: '2025-01-15',
          dateModified: '2026-04-19',
          url: '/blog/mantra',
          articleSection: 'Vedic Astrology',
          keywords: [
            'navagraha mantras',
            'planetary mantras',
            'sanskrit chants',
            'vedic chanting',
          ],
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_himalayan_cave_illuminated_by_flickering_oil.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-bold text-4xl md:text-5xl mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Navagraha</span> Mantras
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-6"
            >
              Sacred Sanskrit chants for the nine celestial bodies that influence our lives.
              Discover the power of Vedic mantras for harmony, healing, and spiritual growth.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-primary-200"
            >
              ॐ नमो भगवते वासुदेवाय॥
            </motion.p>
          </div>
        </div>
      </section>

      {/* Planet Tabs */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {navagrahaData.map((planet, index) => {
              const IconComponent = planet.icon;
              return (
                <button
                  key={planet.planet}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  aria-pressed={activeTab === index}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? `bg-gradient-to-r ${planet.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{planet.planet}</span>
                  <span className="sm:hidden">{planet.planet.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Planet Content */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-soft"
          >
            {/* Planet Header */}
            <div className="text-center mb-12">
              <div className={`w-24 h-24 bg-gradient-to-r ${currentPlanet.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <CurrentPlanetIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mb-2">
                {currentPlanet.planet}
              </h2>
              <p className="text-2xl text-gray-600 font-semibold">
                {currentPlanet.sanskritName}
              </p>
            </div>

            {/* Mantra Section */}
            <div className="mb-12">
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6 text-center">
                Sacred Mantra
              </h3>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 mb-6">
                <p className="text-xl text-gray-800 leading-relaxed text-center font-medium devanagari">
                  {currentPlanet.mantra}
                </p>
              </div>

              {/* Audio Player */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pause mantra chanting' : 'Play mantra chanting'}
                  className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    isPlaying
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : `bg-gradient-to-r ${currentPlanet.color} text-white hover:shadow-xl`
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-6 h-6" />
                      <span>Pause Chanting</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      <span>Listen to Chanting</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Meaning */}
              <div className="bg-primary-50 rounded-xl p-6">
                <h4 className="font-heading font-bold text-xl text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  Meaning
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {currentPlanet.meaning}
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-secondary-50 rounded-xl p-6">
                <h4 className="font-heading font-bold text-xl text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center mr-3">
                    <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {currentPlanet.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Chant */}
              <div className="bg-accent-50 rounded-xl p-6">
                <h4 className="font-heading font-bold text-xl text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  How to Chant
                </h4>
                <ul className="space-y-2">
                  {currentPlanet.howToChant.map((instruction) => (
                    <li key={instruction} className="flex items-start">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* General Guidelines */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900 mb-4">
              General Chanting Guidelines
            </h2>
            <p className="text-xl text-gray-600">
              Universal principles for effective mantra practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Best Times to Chant
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Early morning (Brahma Muhurta): 4-6 AM</li>
                <li>• During planetary hours (specific to each planet)</li>
                <li>• On corresponding days of the week</li>
                <li>• During festivals and auspicious occasions</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Preparation Guidelines
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Take a bath and wear clean clothes</li>
                <li>• Sit in a clean, peaceful environment</li>
                <li>• Use a mala (rosary) for counting</li>
                <li>• Face the appropriate direction</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Chanting Rules
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Chant with devotion and focus</li>
                <li>• Maintain proper pronunciation</li>
                <li>• Complete 108 repetitions minimum</li>
                <li>• Practice regularly for best results</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Offerings & Rituals
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Light incense and oil lamps</li>
                <li>• Offer flowers, fruits, and water</li>
                <li>• Use specific offerings for each planet</li>
                <li>• Perform with pure intentions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Cosmic%20Music.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Need Personalized Mantra Guidance?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get customized mantra recommendations based on your birth chart and specific needs.
            Saurabh Jain can guide you to the most effective mantras for your spiritual journey.
          </p>
          <a
            href="/contact#contact-form-section"
            className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Get Personal Guidance
          </a>
        </div>
      </section>
    </>
  );
};

export default Mantra;
