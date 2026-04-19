import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Users, Heart, ArrowRight, Sparkles, Gift, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

interface ServiceCard {
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
}

const heroImages: readonly string[] = [
  'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/golden_hour_cinematic_temple_scene_with_a_small.webp',
  'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_macro_shot_of_a_spiritual_ritual.webp',
  'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_himalayan_cave_illuminated_by_flickering_oil.webp',
  'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/cinematic_spiritual_altar_scene_in_a_serene.webp'
] as const;

const services: readonly ServiceCard[] = [
  {
    title: 'Vedic Astrology',
    description: 'Ancient wisdom for modern guidance through traditional Parashari Jyotish and KP Astrology.',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/an_ancient_vedic_astrology_chart_floating_above.jpeg',
    href: '/services/vedic-astrology',
    color: 'from-primary-500 to-primary-600'
  },
  {
    title: 'Western Astrology',
    description: 'Explore your cosmic blueprint with Tarot readings and symbolic analysis.',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/tarot_card_reading_mystical_hand_laying_tarot_cards.jpeg',
    href: '/services/western-astrology',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    title: 'Spiritual Healing',
    description: 'Restore balance with Reiki, Pranic healing, and crystal therapy.',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/%20Chakra_Healing_meditating_figure_with_glowing_chakra_points_lotus.jpeg',
    href: '/services/healing',
    color: 'from-accent-500 to-accent-600'
  }
] as const;

const Home = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const widgetSrc = import.meta.env.VITE_REVIEWS_WIDGET_SRC;
    const integrity = import.meta.env.VITE_REVIEWS_WIDGET_SRI;
    if (!widgetSrc || !integrity) return;

    const script = document.createElement('script');
    script.src = widgetSrc;
    script.async = true;
    script.integrity = integrity;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Best Vedic Astrologer in Ahmedabad | Saurabh Jain - Soul Infinity"
        description="Vedic astrology, tarot & Reiki healing by certified astrologer Saurabh Jain in Ahmedabad. 200+ happy clients, 4.9★ rated. Book online or in-person consultation today."
        keywords="vedic astrologer ahmedabad, best astrologer ahmedabad, saurabh jain astrologer, kundli consultation ahmedabad, tarot reader ahmedabad, reiki healer ahmedabad"
        omitDefaultSchema
      />
      <SchemaMarkup type="home" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                width="1920"
                height="1080"
                decoding={index === 0 ? 'sync' : 'async'}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'low'}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6">
              Vedic Astrology Consultation in Ahmedabad – <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Soul Infinity</span>
            </h1>
            <h2 className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed">
              One whose mind remains undisturbed in sorrow, who does not crave for pleasures,
              who is free from attachment, fear, and anger, is called a sage of steady wisdom (Sthitadhī Muni).
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              दुःखेष्वनुद्विग्नमना: सुखेषु विगतस्पृह:। वीतरागभयक्रोध: स्थितधीर्मुनिरुच्यते॥
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact#contact-form-section"
                aria-label="Start your spiritual journey with a consultation"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Begin Your Journey
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center"
                aria-label="Explore our spiritual and astrological services"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Sacred Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of spiritual and astrological services,
              each designed to bring clarity and healing to your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <Link to={service.href} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        width="400"
                        height="256"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-heading font-bold text-xl text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                        Explore Services
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Cosmic Guide Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Meet Your Cosmic Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Saurabh Jain brings decades of wisdom and compassionate guidance
              to help you on your spiritual journey.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft text-center relative overflow-hidden">
              {/* Banner Background Image */}
              <div className="absolute inset-0">
                <img
                  src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Ganesha%205.jpeg"
                  alt="Lord Ganesha, remover of obstacles and divine guide"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>

              <div className="relative z-10">
              <div className="relative mb-8">
                <img
                  src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/People/saurabh%20chat1.png"
                  alt="Saurabh Jain"
                  width="160"
                  height="160"
                  className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary-100 shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Certified Professional Astrologer
                </div>
              </div>

              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Saurabh Jain
              </h3>
              <p className="text-primary-200 font-semibold text-lg mb-4">
                M.Tech, MBA, M.Phil | Ahmedabad, India
              </p>

              <p className="text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                A dedicated student of Vedic astrology, continually learning and sharing the timeless wisdom
                of the cosmos with sincerity and devotion. Certified from K.N. Rao Institute with expertise
                in Vedic Astrology, BNN, KP, and Ashtakavarga.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-bold text-primary-200">Vedic</div>
                  <div className="text-sm text-gray-200">Astrology</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-bold text-secondary-200">BNN</div>
                  <div className="text-sm text-gray-200">System</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-bold text-accent-200">KP</div>
                  <div className="text-sm text-gray-200">Method</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-bold text-purple-200">Ashtakavarga</div>
                  <div className="text-sm text-gray-200">Analysis</div>
                </div>
              </div>

              <Link
                to="/contact#contact-form-section"
                aria-label="Book a consultation with Saurabh Jain"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Book Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">What Our Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from people who found their path through our guidance.
            </p>
          </div>

          {/* Google Reviews widget — only renders when VITE_REVIEWS_WIDGET_SRC and VITE_REVIEWS_WIDGET_SRI are configured. */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 relative overflow-hidden shadow-soft"
            >
              <div className="min-h-[400px] flex items-center justify-center">
                <div id="reviews-widget-205" className="w-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-primary-100">Happy Clients</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-primary-100">Years of Astrology Experience</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">4.9</div>
              <div className="text-primary-100">Average Rating</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Soul Infinity */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Why Choose Soul Infinity?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience authentic spiritual guidance with our unique approach to cosmic wisdom and healing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Authentic Vedic Wisdom</h3>
              <p className="text-gray-400">Traditional knowledge with modern insights</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Compassionate Guidance</h3>
              <p className="text-gray-400">Experienced and empathetic approach</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-accent-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Personalized Approach</h3>
              <p className="text-gray-400">Tailored solutions for spiritual growth</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Proven Transformation</h3>
              <p className="text-gray-400">Track record of positive change</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Ready to Begin Your Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Take the first step towards clarity, healing, and spiritual growth.
            Saurabh Jain is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact#contact-form-section"
              aria-label="Start your spiritual consultation today"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Start Your Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/panchang"
              className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all duration-300 flex items-center justify-center"
            >
              View Today's Panchang
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
