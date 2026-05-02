import { useCallback, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Heart, Zap, Brain, Sun, Moon, Star, Clock, Flame } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import Breadcrumbs from '../components/Breadcrumbs';
import { useModalDismiss } from '../hooks/useModalDismiss';

interface RemedyEntry {
  planet: string;
  sanskrit: string;
  image: string;
  symptoms: readonly string[];
  remedies: readonly string[];
}

interface IconProps {
  className?: string;
}

const Remedies = () => {
  const [selectedRemedy, setSelectedRemedy] = useState<RemedyEntry | null>(null);

  const closeModal = useCallback(() => setSelectedRemedy(null), []);
  useModalDismiss(selectedRemedy !== null, closeModal);

  // Icon mapping for each planet/remedy type
  const getIcon = (planet: string): ComponentType<IconProps> => {
    const iconMap: Record<string, ComponentType<IconProps>> = {
      'Aura Cleansing': Heart,
      'Moon': Moon,
      'Mars': Zap,
      'Mercury': Brain,
      'Venus': Heart,
      'Sun': Sun,
      'Saturn': Clock,
      'Rahu': Eye,
      'Ketu': Flame
    };
    return iconMap[planet] || Star;
  };

  // Color scheme for each planet
  const getColorScheme = (planet: string) => {
    const colorMap: Record<string, string> = {
      'Aura Cleansing': 'from-purple-500 to-indigo-500',
      'Moon': 'from-blue-400 to-indigo-500',
      'Mars': 'from-red-500 to-orange-500',
      'Mercury': 'from-green-500 to-emerald-500',
      'Venus': 'from-pink-500 to-rose-500',
      'Sun': 'from-yellow-500 to-orange-500',
      'Saturn': 'from-gray-600 to-gray-800',
      'Rahu': 'from-gray-700 to-gray-900',
      'Ketu': 'from-orange-600 to-red-700'
    };
    return colorMap[planet] || 'from-primary-500 to-secondary-500';
  };

  const remediesData: {
    banner: { image: string; shloka: string };
    remedies: readonly RemedyEntry[];
  } = {
    "banner": {
      "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/My_Banner.webp",
      "shloka": "ॐ गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् । ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिः सीद साधनम् ॥ ॐ महागणाधिपतये नमः ॥"
    },
    "remedies": [
      {
        "planet": "Aura Cleansing",
        "sanskrit": "आभामण्डल शुद्धि",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/Salt_water.webp",
        "symptoms": [
          "Feeling low energy, dull mood",
          "Frequent minor health issues",
          "Irritability or restlessness"
        ],
        "remedies": [
          "Fill a bucket with water",
          "Add a handful of rock salt",
          "Take bath for aura cleansing"
        ]
      },
      {
        "planet": "Moon",
        "sanskrit": "चन्द्र",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/moon.webp",
        "symptoms": [
          "Mood swings, emotional instability",
          "Poor memory, lack of peace",
          "Overthinking or depression tendencies"
        ],
        "remedies": [
          "Take short trips regularly",
          "Spend time near water bodies",
          "Drink plenty of water for emotional balance"
        ]
      },
      {
        "planet": "Mars",
        "sanskrit": "मंगल",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/Mars.webp",
        "symptoms": [
          "Anger, impulsiveness",
          "Accidents, injuries, muscle issues",
          "Lack of motivation, laziness"
        ],
        "remedies": [
          "Engage in technical or engineering work",
          "Work with land/property-related tasks",
          "Do heavy workouts or martial arts"
        ]
      },
      {
        "planet": "Mercury",
        "sanskrit": "बुध",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/mercury.webp",
        "symptoms": [
          "Communication issues, forgetfulness",
          "Nervousness, anxiety",
          "Trouble in studies or business negotiations"
        ],
        "remedies": [
          "Wear green clothes on Wednesdays",
          "Offer green moong to birds",
          "Give green grass to cows",
          "Listen or recite Vishnu Sahasranama",
          "Donate pens, pencils, and diaries to students"
        ]
      },
      {
        "planet": "Venus",
        "sanskrit": "शुक्र",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/Venus.webp",
        "symptoms": [
          "Relationship issues, lack of charm",
          "Financial instability",
          "Loss of interest in art/beauty"
        ],
        "remedies": [
          "Offer fruits to Lord Shiva",
          "Wear white clothes on Fridays",
          "Donate perfume to women"
        ]
      },
      {
        "planet": "Sun",
        "sanskrit": "सूर्य",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/Sun.webp",
        "symptoms": [
          "Low confidence, poor leadership",
          "Weak immunity, frequent fevers",
          "Lack of recognition or respect"
        ],
        "remedies": [
          "Offer water to the morning Sun daily",
          "Listen or recite Aditya Stotram"
        ]
      },
      {
        "planet": "Saturn",
        "sanskrit": "शनि",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/Saturn.webp",
        "symptoms": [
          "Delays, obstacles, chronic health issues",
          "Depression or loneliness",
          "Poor relations with workers"
        ],
        "remedies": [
          "Show gratitude to domestic workers/drivers",
          "Clean your own bathroom weekly",
          "Light a mustard oil lamp before leaving home",
          "Burn incense sticks (agarbatti)"
        ]
      },
      {
        "planet": "Rahu",
        "sanskrit": "राहु",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/rahu.webp",
        "symptoms": [
          "Confusion, sudden ups/downs",
          "Addiction or risky decisions",
          "Restlessness and disconnection from reality"
        ],
        "remedies": [
          "Think big and unconventional",
          "Cultivate foreign connections or settle abroad",
          "Engage in cutting-edge work like AI or coding"
        ]
      },
      {
        "planet": "Ketu",
        "sanskrit": "केतु",
        "image": "https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Remedy/Ketu.webp",
        "symptoms": [
          "Detachment, feeling lost",
          "Career instability",
          "Sudden endings in relationships"
        ],
        "remedies": [
          "Learn astrology or occult sciences",
          "Work in backend technologies",
          "Manifest desires in writing, then release them"
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Vedic Remedies - Mantras, Gems, Rituals by Soul Infinity Ahmedabad"
        description="Authentic Vedic remedies personalized to your birth chart: mantras, gemstones, rituals & lifestyle practices. Safe, effective guidance by Saurabh Jain."
        keywords="vedic remedies, planetary remedies, astrological healing, mantras, gemstones, rituals, aura cleansing, saurabh jain remedies"
        image={remediesData.banner.image}
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Planetary Remedies, Ancient Healing Solutions',
          description:
            'Traditional planetary remedies for spiritual healing, aura cleansing, and balancing planetary influences.',
          url: '/gallery/remedies',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
          { name: 'Planetary Remedies', url: '/gallery/remedies' },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Vedic Remedies' },
        ]}
      />

      {/* Hero Banner Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={remediesData.banner.image}
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
              className="font-heading font-bold text-4xl md:text-5xl mb-8"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Vedic Remedies</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-yellow-300/30"
            >
              <p className="text-yellow-200 text-lg md:text-xl mb-4 font-semibold leading-relaxed devanagari">
                {remediesData.banner.shloka}
              </p>
              <p className="text-gray-200 text-sm italic">
                "O Ganapati, leader of all ganas, we invoke you, the wisest among the wise. 
                You are the supreme ruler, the lord of all mantras. Listen to our prayers and be gracious to us."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Remedies Cards Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Ancient Healing Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover time-tested remedies for planetary imbalances that bring harmony, 
              prosperity, and spiritual growth to your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {remediesData.remedies.map((remedy, index) => {
              const IconComponent = getIcon(remedy.planet);
              const colorScheme = getColorScheme(remedy.planet);

              return (
                <motion.div
                  key={remedy.planet}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRemedy(remedy)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRemedy(remedy);
                    }
                  }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform group-hover:-translate-y-2 h-full">
                    {/* Card Header with Planet Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={remedy.image}
                        alt={remedy.planet}
                        width="400"
                        height="192"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Planet Icon Overlay */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${colorScheme} rounded-full flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Planet Names */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-heading font-bold text-xl text-white mb-1">
                          {remedy.planet}
                        </h3>
                        <p className="text-yellow-200 font-semibold devanagari">
                          {remedy.sanskrit}
                        </p>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      {/* Symptoms Preview */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          Signs of Imbalance
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {remedy.symptoms.slice(0, 2).map((symptom) => (
                            <li key={symptom} className="line-clamp-1">• {symptom}</li>
                          ))}
                          {remedy.symptoms.length > 2 && (
                            <li className="text-primary-600 font-medium">
                              +{remedy.symptoms.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Remedies Preview */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          Solutions
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {remedy.remedies.slice(0, 2).map((solution) => (
                            <li key={solution} className="line-clamp-1">• {solution}</li>
                          ))}
                          {remedy.remedies.length > 2 && (
                            <li className="text-secondary-600 font-medium">
                              +{remedy.remedies.length - 2} more...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* View Details Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRemedy(remedy);
                        }}
                        aria-label={`View full details for ${remedy.planet}`}
                        className="w-full bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-4 py-3 rounded-lg font-semibold hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 transform group-hover:scale-105 border border-primary-200"
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Modal */}
      <AnimatePresence>
        {selectedRemedy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedRemedy.planet} remedy details`}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close remedy details"
                autoFocus
                className="absolute top-4 right-4 w-10 h-10 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-black/20 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedRemedy.image}
                  alt={selectedRemedy.planet}
                  width="1200"
                  height="400"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Planet Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getColorScheme(selectedRemedy.planet)} rounded-full flex items-center justify-center shadow-lg`}>
                      {(() => {
                        const IconComponent = getIcon(selectedRemedy.planet);
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-3xl text-white mb-2">
                        {selectedRemedy.planet}
                      </h2>
                      <p className="text-yellow-200 text-xl font-semibold devanagari">
                        {selectedRemedy.sanskrit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Symptoms Section */}
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      Signs of Imbalance
                    </h3>
                    <ul className="space-y-3">
                      {selectedRemedy.symptoms.map((symptom) => (
                        <li key={symptom} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Remedies Section */}
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      Healing Solutions
                    </h3>
                    <ul className="space-y-3">
                      {selectedRemedy.remedies.map((remedy) => (
                        <li key={remedy} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                  <h4 className="font-heading font-bold text-xl text-gray-900 mb-4">
                    Need Personalized Guidance?
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Get customized remedies based on your birth chart and specific planetary positions.
                  </p>
                  <Link
                    to="/contact#contact-form-section"
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                  >
                    Consult Saurabh Jain
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* General Guidelines Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900 mb-4">
              Universal Remedy Guidelines
            </h2>
            <p className="text-xl text-gray-600">
              Essential principles for effective planetary remedy practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Best Times for Remedies
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Early morning (Brahma Muhurta): 4-6 AM</li>
                <li>• During planetary hours specific to each planet</li>
                <li>• On auspicious days and festivals</li>
                <li>• During positive planetary transits</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Preparation Guidelines
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Maintain cleanliness of body and mind</li>
                <li>• Practice with devotion and faith</li>
                <li>• Be consistent in your practice</li>
                <li>• Seek proper guidance from experts</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Important Notes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Results may vary based on individual karma</li>
                <li>• Combine remedies with positive actions</li>
                <li>• Avoid remedies during inauspicious periods</li>
                <li>• Consult an astrologer for personalized guidance</li>
              </ul>
            </div>

            <div className="bg-surface rounded-xl p-6">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Spiritual Approach
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Practice with pure intentions</li>
                <li>• Surrender results to the Divine</li>
                <li>• Maintain gratitude and humility</li>
                <li>• Focus on inner transformation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white relative overflow-hidden">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">Ready for Personalized Remedies?</span>
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Get customized planetary remedies based on your unique birth chart analysis. 
            Saurabh Jain will guide you to the most effective solutions for your specific needs.
          </p>
          <Link
            to="/contact#contact-form-section"
            className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Book Remedy Consultation
          </Link>
        </div>
      </section>
    </>
  );
};

export default Remedies;