import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Award, Calendar, Users, GraduationCap, Heart, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

const CosmicGuide = () => {
  const guide = {
    name: 'Saurabh Jain',
    role: 'Certified Professional Astrologer',
    location: 'Ahmedabad, India',
    experience: '5+ Years',
    specialties: ['Vedic Astrology', 'BNN', 'KP', 'Ashtakavarga'],
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/People/saurabh%20chat1.png',
    bio: 'A dedicated student of Vedic astrology, continually learning and sharing the timeless wisdom of the cosmos with sincerity and devotion. Saurabh combines traditional knowledge with modern insights to provide accurate predictions and practical solutions.',
    qualifications: [
      'M.Tech in Computer Science – Birla Institute of Technology and Science',
      'MBA – Birla Institute of Technology and Science', 
      'M.Phil – D.Y. Patil Institute & IIT Mumbai',
      'PhD – Birla Institute of Technology and Science (Drop Out)',
      'Certified Professional Astrologer – K.N. Rao Institute'
    ],
    achievements: [
      'Certified from prestigious K.N. Rao Institute',
      'Expert in classical Vedic astrology systems',
      'Specialized in BNN and KP methodologies',
      'Advanced practitioner of Ashtakavarga system',
      '200+ successful consultations worldwide',
      'Combines technical background with spiritual wisdom'
    ],
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.9,
    clientCount: 200,
    philosophy: 'Astrology is not about predicting a fixed future, but about understanding the cosmic energies that influence our lives. My approach combines ancient wisdom with practical guidance to help you make informed decisions and live in harmony with your highest potential.'
  };

  return (
    <>
      <SEOHead
        title="About Saurabh Jain - Certified Vedic Astrologer in Ahmedabad | Soul Infinity"
        description="Meet Saurabh Jain: M.Tech, MBA, M.Phil, K.N. Rao Institute certified Vedic astrologer. 5+ years guiding 200+ clients in Ahmedabad with Parashari, BNN & KP methods."
        keywords="saurabh jain, astrologer ahmedabad, vedic astrology expert, KN rao institute, BNN astrology, KP astrology, ashtakavarga, certified astrologer"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/People/saurabh%20chat1.png"
        type="profile"
        omitDefaultSchema
      />
      <SchemaMarkup type="cosmic-guide" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/golden_hour_cinematic_temple_scene_with_a_small.webp" 
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
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Saurabh Jain</span> — Your Cosmic Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Discover the wisdom and expertise of Saurabh Jain, a certified professional astrologer 
              dedicated to sharing the timeless knowledge of Vedic astrology with sincerity and devotion.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{guide.clientCount}+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{guide.experience}</div>
              <div className="text-gray-300">Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{guide.rating}</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">5+</div>
              <div className="text-gray-300">Qualifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Factual intro — neutral, encyclopedia-style summary written for
          AI assistants (ChatGPT, Perplexity, AI Overviews) as well as
          first-time human visitors. */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Soul Infinity</strong> is a Vedic astrology and spiritual healing
            practice based in Ahmedabad, Gujarat, India. It was founded by{' '}
            <strong>Saurabh Jain</strong>, who holds M.Tech and MBA degrees from the Birla
            Institute of Technology and Science and an M.Phil, and is a Certified
            Professional Astrologer from the K.N. Rao Institute. The practice offers
            consultations across three disciplines: Vedic astrology (Parashari Jyotish,
            Bhrigu Nandi Nadi, KP astrology, Astro Vastu, and gemstone therapy),
            Western astrology (tarot card reading, symbol analysis, past-life
            regression), and spiritual healing (Reiki, Pranic, Theta, and Crystal
            Healing). Sessions are conducted in person in Ahmedabad and online in
            English, Hindi, and Gujarati. As of 2026 the practice holds a 4.9-star
            rating across 40 Google reviews.
          </p>
        </div>
      </section>

      {/* Main Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-surface rounded-3xl p-8 md:p-12 shadow-soft"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image and Basic Info */}
              <div className="text-center lg:text-left">
                <div className="relative mb-8">
                  <img
                    src={guide.image}
                    alt={`${guide.name} - Certified Vedic astrologer in Ahmedabad`}
                    width="256"
                    height="256"
                    loading="lazy"
                    className="w-64 h-64 rounded-3xl mx-auto lg:mx-0 object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-4 left-1/2 lg:left-32 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {guide.experience} Experience
                  </div>
                </div>
                
                <h2 className="font-heading font-bold text-4xl text-gray-900 mb-2">
                  {guide.name}
                </h2>
                <p className="text-primary-600 font-semibold text-xl mb-2">
                  {guide.role}
                </p>
                <p className="text-gray-600 mb-6 inline-flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary-500" aria-hidden="true" />
                  {guide.location}
                </p>
                
                {/* Rating & Clients */}
                <div className="flex items-center justify-center lg:justify-start space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">{guide.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{guide.clientCount}+ clients</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Specializations:</h4>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {guide.specialties.map((specialty) => {
                      const specialtyHref: Record<string, string> = {
                        'Vedic Astrology': '/services/vedic-astrology',
                        BNN: '/services/vedic-astrology/bnn',
                        KP: '/services/vedic-astrology/kp-astrology',
                        Ashtakavarga: '/services/vedic-astrology/parashari-jyotish',
                      };
                      const href = specialtyHref[specialty];
                      const base =
                        'bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium';
                      return href ? (
                        <Link
                          key={specialty}
                          to={href}
                          className={`${base} hover:bg-primary-200 transition-colors`}
                        >
                          {specialty}
                        </Link>
                      ) : (
                        <span key={specialty} className={base}>
                          {specialty}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-2">Languages:</h4>
                  <p className="text-gray-600">{guide.languages.join(', ')}</p>
                </div>

                {/* Book Button */}
                <Link
                  to="/contact"
                  aria-label="Book a consultation with Saurabh Jain"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                >
                  Book Consultation
                  <Heart className="ml-2 w-5 h-5" />
                </Link>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6">About Saurabh</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {guide.bio}
                </p>

                <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
                  <h4 className="font-heading font-bold text-xl text-gray-900 mb-4">Philosophy</h4>
                  <p className="text-gray-600 leading-relaxed italic">
                    "{guide.philosophy}"
                  </p>
                </div>

                {/* Qualifications */}
                <div className="mb-8">
                  <h4 className="font-heading font-bold text-xl text-gray-900 mb-4">Educational Qualifications</h4>
                  <ul className="space-y-3">
                    {guide.qualifications.map((qualification) => (
                      <li key={qualification} className="flex items-start">
                        <GraduationCap className="w-5 h-5 text-accent-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-heading font-bold text-xl text-gray-900 mb-4">Key Achievements</h4>
                  <ul className="space-y-3">
                    {guide.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start">
                        <Award className="w-5 h-5 text-secondary-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">What Clients Say About Saurabh</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from people who found guidance through his wisdom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                text: 'Saurabh\'s reading was incredibly accurate. His deep knowledge of KP astrology helped me understand my career path clearly.',
                rating: 5
              },
              {
                name: 'Rajesh Patel',
                text: 'The BNN consultation was life-changing. Saurabh\'s guidance helped me make important decisions with confidence.',
                rating: 5
              },
              {
                name: 'Meera Joshi',
                text: 'His approach combines traditional wisdom with practical advice. I highly recommend Saurabh for anyone seeking clarity.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-soft"
              >
                <div
                  className="flex items-center space-x-1 mb-4"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={`star-${i}`} className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Spritual%20BG-5.jpg" 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Ready to Connect with Saurabh?</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Begin your journey of self-discovery and spiritual growth with personalized guidance 
            from a certified professional astrologer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Book Your Consultation
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CosmicGuide;