import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Users, Home } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import Breadcrumbs from '../components/Breadcrumbs';
import { SERVICES_CATALOG } from '../data/schema-entities';

const CATEGORY_LABELS: Record<string, string> = {
  'vedic-astrology': 'Vedic Astrology',
  'western-astrology': 'Western Astrology',
  healing: 'Spiritual Healing',
};

const Services = () => {
  const { category } = useParams<{ category: string }>();

  const serviceCategories = [
    {
      id: 'vedic-astrology',
      title: 'Vedic Astrology',
      description: 'Ancient wisdom from the sacred texts of India, offering profound insights into your life path, karma, and spiritual evolution.',
      image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_spiritual_altar_scene_in_a_serene.webp',
      color: 'from-primary-500 to-primary-600',
      services: [
        {
          name: 'Parashari Jyotish',
          slug: 'parashari-jyotish',
          description: 'Classical Vedic astrology system focusing on planetary influences and life predictions.',
          duration: '60 mins',
          rating: 4.9,
          clients: 1200,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/an_ancient_vedic_astrology_chart_floating_above.jpeg'
        },
        {
          name: 'BNN (Bhrigu Nandi Nadi)',
          slug: 'bnn',
          description: 'Ancient palm leaf astrology system for precise predictions and remedies.',
          duration: '90 mins',
          rating: 4.8,
          clients: 800,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Planetry_transit_nine_planets_rotating_around_a_radiant_sun.jpeg'
        },
        {
          name: 'KP Astrology',
          slug: 'kp-astrology',
          description: 'Krishnamurti Paddhati - Scientific approach to astrology with precise timing.',
          duration: '75 mins',
          rating: 4.9,
          clients: 950,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/numerology_reading_prompt_mystic_numbers_glowing_in_the_air.jpeg'
        },
        {
          name: 'Astro Vastu',
          slug: 'astro-vastu',
          description: 'Harmonize your living space with astrological and Vastu principles.',
          duration: '120 mins',
          rating: 4.7,
          clients: 600,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/spiritual_coaching_prompt_a_serene_spiritual_guide_radiating_golden.jpeg'
        },
        {
          name: 'Gem Stone Consultation',
          slug: 'gem-stone',
          description: 'Personalized gemstone recommendations based on your birth chart.',
          duration: '45 mins',
          rating: 4.8,
          clients: 750,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Gemstone_Therapy_gemstone_therapy_glowing_gemstones_emerald_ruby_sapphire_floating_in.jpeg'
        }
      ]
    },
    {
      id: 'western-astrology',
      title: 'Western Astrology',
      description: 'Modern astrological practices combined with intuitive insights to guide your personal growth and self-discovery.',
      image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/tarot_card_reading_mystical_hand_laying_tarot_cards.jpeg',
      color: 'from-secondary-500 to-secondary-600',
      services: [
        {
          name: 'Tarot Card Reading',
          slug: 'tarot-card',
          description: 'Intuitive card readings to reveal hidden truths and future possibilities.',
          duration: '45 mins',
          rating: 4.9,
          clients: 1500,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/tarot_card_reading_mystical_hand_laying_tarot_cards.jpeg'
        },
        {
          name: 'Symbol Analysis',
          slug: 'symbol-analysis',
          description: 'Deep dive into astrological symbols and their meaning in your life.',
          duration: '60 mins',
          rating: 4.7,
          clients: 400,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/dream_analysis_prompt_a_sleeping_figure_surrounded_by_glowing.jpeg'
        },
        {
          name: 'Past Life Regression',
          slug: 'past-life-regression',
          description: 'Explore your past lives to understand current life patterns and relationships.',
          duration: '120 mins',
          rating: 4.8,
          clients: 650,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/past_life_regression_prompt_a_person.jpeg'
        }
      ]
    },
    {
      id: 'healing',
      title: 'Spiritual Healing',
      description: 'Energy healing modalities to restore balance, release blockages, and promote holistic wellness of body, mind, and spirit.',
      image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/%20Chakra_Healing_meditating_figure_with_glowing_chakra_points_lotus.jpeg',
      color: 'from-accent-500 to-accent-600',
      services: [
        {
          name: 'Reiki Healing',
          slug: 'reiki',
          description: 'Universal life force energy healing for physical, emotional, and spiritual wellness.',
          duration: '60 mins',
          rating: 4.9,
          clients: 2000,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Pendulum%20Reiki.jpg'
        },
        {
          name: 'Pranic Healing',
          slug: 'pranic-healing',
          description: 'Advanced energy healing technique to cleanse and energize your aura.',
          duration: '75 mins',
          rating: 4.8,
          clients: 1100,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Chakra%20Balancing.jpg'
        },
        {
          name: 'Theta Healing',
          slug: 'theta-healing',
          description: 'Powerful meditation technique to access theta brain waves for deep healing.',
          duration: '90 mins',
          rating: 4.7,
          clients: 800,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Meditation.jpg'
        },
        {
          name: 'Crystal Healing',
          slug: 'crystal-healing',
          description: 'Harness the vibrational energy of crystals to balance your chakras.',
          duration: '60 mins',
          rating: 4.8,
          clients: 900,
          image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/%20Chakra_Healing_meditating_figure_with_glowing_chakra_points_lotus.jpeg'
        }
      ]
    }
  ];

  // Filter categories based on URL parameter
  const filteredCategories = category 
    ? serviceCategories.filter(cat => cat.id === category)
    : serviceCategories;

  // Generate dynamic SEO content based on filtered categories.
  // Titles/descriptions match the SEO spec per category for search intent
  // ("in Ahmedabad", method names, duration) — not auto-generated from data.
  const getSEOContent = () => {
    const categorySeo: Record<string, { title: string; description: string; keywords: string }> = {
      'vedic-astrology': {
        title: 'Vedic Astrology Services in Ahmedabad | Parashari, BNN, KP - Soul Infinity',
        description:
          'Authentic Vedic astrology services in Ahmedabad. Parashari Jyotish, Bhrigu Nandi Nadi, KP method, Astro Vastu & Gemstone consultations by Saurabh Jain.',
        keywords:
          'vedic astrology ahmedabad, parashari jyotish, BNN astrology, KP astrology, astro vastu, gemstone consultation, saurabh jain',
      },
      'western-astrology': {
        title: 'Tarot, Symbol Analysis & Past Life Regression in Ahmedabad | Soul Infinity',
        description:
          'Western astrology & intuitive readings in Ahmedabad. Tarot card reading, astrological symbol analysis, past life regression therapy by certified expert.',
        keywords:
          'tarot reading ahmedabad, past life regression, symbol analysis, western astrology, saurabh jain',
      },
      healing: {
        title: 'Reiki, Pranic, Theta & Crystal Healing in Ahmedabad | Soul Infinity',
        description:
          "Certified energy healing in Ahmedabad: Reiki, Pranic Healing, Theta Healing & Crystal Therapy. Restore balance with Saurabh Jain's compassionate guidance.",
        keywords:
          'reiki healing ahmedabad, pranic healing, theta healing, crystal healing, energy healer, saurabh jain',
      },
    };
    if (category && categorySeo[category]) return categorySeo[category];
    return {
      title:
        'Astrology & Healing Services in Ahmedabad - Vedic, Tarot, Reiki | Soul Infinity',
      description:
        'Explore 12 spiritual services: Parashari Jyotish, BNN, KP Astrology, Tarot, Reiki, Pranic & Crystal healing. Personalized consultations by Saurabh Jain in Ahmedabad.',
      keywords:
        'astrology services ahmedabad, vedic astrology, tarot reading, reiki healing, pranic healing, parashari jyotish, crystal healing, saurabh jain',
    };
  };

  const seoContent = getSEOContent();

  return (
    <>
      <SEOHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_spiritual_altar_scene_in_a_serene.webp"
        omitDefaultSchema
      />
      {category && SERVICES_CATALOG.some((s) => s.category === category) ? (
        <SchemaMarkup
          type="service-category"
          webPage={{
            name: seoContent.title,
            description: seoContent.description,
            url: `/services/${category}`,
          }}
        />
      ) : (
        <SchemaMarkup type="services-list" />
      )}
      {category && CATEGORY_LABELS[category] && (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: CATEGORY_LABELS[category] },
          ]}
        />
      )}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_spiritual_altar_scene_in_a_serene.webp" 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
                {category === 'vedic-astrology'
                  ? 'Vedic Astrology Services in Ahmedabad'
                  : category === 'western-astrology'
                    ? 'Western Astrology & Intuitive Readings'
                    : category === 'healing'
                      ? 'Spiritual Healing & Energy Therapy'
                      : 'Sacred Services'}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Choose from our comprehensive range of spiritual and astrological services, 
              each designed to bring clarity, healing, and guidance to your life journey.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button - Only show when category is selected */}
          {category && (
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center text-primary-800 hover:text-primary-700 transition-colors font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
          )}

          {filteredCategories.map((serviceCategory, categoryIndex) => (
            <motion.div
              key={serviceCategory.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className={`mb-20 ${categoryIndex !== filteredCategories.length - 1 ? 'border-b border-gray-100 pb-20' : ''}`}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className="relative mb-8">
                  <img
                    src={serviceCategory.image}
                    alt={serviceCategory.title}
                    width="128"
                    height="128"
                    className="w-32 h-32 mx-auto rounded-3xl object-cover shadow-lg"
                  />
                  <div className={`absolute inset-0 w-32 h-32 mx-auto rounded-3xl bg-gradient-to-r ${serviceCategory.color} opacity-20`}></div>
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
                  {serviceCategory.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {serviceCategory.description}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCategory.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (serviceIndex * 0.1) }}
                    className="group"
                  >
                    <Link to={`/services/${serviceCategory.id}/${service.slug}`} className="block">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-50 h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            width="384"
                            height="192"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="font-heading font-bold text-xl text-white mb-1">
                              {service.name}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {service.description}
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{service.duration}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                              <span>{service.rating} rating</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-2" />
                              <span>{service.clients}+ clients served</span>
                            </div>
                          </div>

                          <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                            Learn More & Book
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Not Sure Which Service is Right for You?</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Saurabh Jain can help you choose the perfect service based on your needs and spiritual goals.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Get Personalized Guidance
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;