import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Page Not Found - Soul Infinity"
        description="The page you're looking for doesn't exist. Return to Soul Infinity's homepage for spiritual guidance and astrology services."
        keywords="404, page not found, soul infinity, spiritual guidance"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/luxurious_close_up_of_a_spiritual_arrangement_on.webp"
        robots="noindex, follow"
      />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/luxurious_close_up_of_a_spiritual_arrangement_on.webp" 
            alt="Cosmic Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Number */}
            <div className="mb-8">
              <span className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                404
              </span>
            </div>

            {/* Main Message */}
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Page Not Found
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The cosmic path you're seeking doesn't exist in our current dimension. 
              Let us guide you back to the light of spiritual wisdom and clarity.
            </p>

            {/* Sanskrit Shloka */}
            <div className="mb-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-primary-200">
              <p className="text-primary-700 font-medium mb-2">
                न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।
              </p>
              <p className="text-gray-600 text-sm">
                "There is nothing in this world as purifying as knowledge."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Return Home
              </Link>
              <Link
                to="/services"
                className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore Services
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Perhaps you were looking for:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/cosmic-guide"
                  className="text-primary-800 hover:text-primary-700 font-medium transition-colors"
                >
                  Our Cosmic Guide
                </Link>
                <Link
                  to="/blog"
                  className="text-primary-800 hover:text-primary-700 font-medium transition-colors"
                >
                  Spiritual Blog
                </Link>
                <Link
                  to="/panchang"
                  className="text-primary-800 hover:text-primary-700 font-medium transition-colors"
                >
                  Daily Panchang
                </Link>
                <Link
                  to="/contact"
                  className="text-primary-800 hover:text-primary-700 font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-20 animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full opacity-20 animate-pulse delay-150"></div>
      </section>
    </>
  );
};

export default NotFound;