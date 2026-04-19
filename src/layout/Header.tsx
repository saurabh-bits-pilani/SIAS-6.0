import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const services = {
    'vedic-astrology': {
      title: 'Vedic Astrology',
      items: [
        { name: 'Parashari Jyotish', slug: 'parashari-jyotish' },
        { name: 'BNN', slug: 'bnn' },
        { name: 'KP Astrology', slug: 'kp-astrology' },
        { name: 'Astro Vastu', slug: 'astro-vastu' },
        { name: 'Gem Stone', slug: 'gem-stone' }
      ]
    },
    'western-astrology': {
      title: 'Western Astrology',
      items: [
        { name: 'Tarot Card', slug: 'tarot-card' },
        { name: 'Symbol Analysis', slug: 'symbol-analysis' },
        { name: 'Past Life Regression', slug: 'past-life-regression' }
      ]
    },
    'healing': {
      title: 'Healing',
      items: [
        { name: 'Reiki', slug: 'reiki' },
        { name: 'Pranic Healing', slug: 'pranic-healing' },
        { name: 'Theta Healing', slug: 'theta-healing' },
        { name: 'Crystal Healing', slug: 'crystal-healing' }
      ]
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Our Services', href: '/services', hasDropdown: true, dropdownType: 'services' },
    { name: 'Our Cosmic Guide', href: '/cosmic-guide' },
    { name: 'Cosmic Podcast', href: '/cosmic-podcast' },
    { name: 'Blog', href: '/blog', hasDropdown: true, dropdownType: 'blog' },
    { name: 'Gallery', href: '/gallery', hasDropdown: true, dropdownType: 'gallery' },
    { name: 'Panchang', href: '/panchang' },
    { name: 'Contact', href: '/contact' }
  ];

  const blogDropdown = [
    { name: 'All Articles', href: '/blog' },
    { name: 'Mantra', href: '/blog/mantra' }
  ];

  const galleryDropdown = [
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Remedies', href: '/gallery/remedies' },
    { name: 'Pitra Dosh', href: '/gallery/pitra-dosh' }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="bg-gray-900 shadow-soft sticky top-0 z-50">
      {/* Sanskrit Shloka Bar */}
      <div className="bg-black py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
            शुभं करोति कल्याणं आरोग्यं धनसंपदा। शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते॥
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png" 
              alt="Soul Infinity - Vedic Astrology & Spiritual Guidance Ahmedabad"
              width="40"
              height="40"
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="font-heading font-bold text-xl text-white leading-none">Soul Infinity</p>
              <p className="text-sm text-gray-300 leading-none">Vedic Astrology & Spiritual Guidance</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.dropdownType)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href) ? 'text-primary-400 bg-gray-800' : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                    }`}>
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.dropdownType && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`absolute top-full left-0 mt-2 bg-gray-800 rounded-xl shadow-soft-lg border border-gray-700 p-4 ${
                            item.dropdownType === 'services' ? 'w-80' : 'w-48'
                          }`}
                        >
                          {item.dropdownType === 'services' ? (
                            <div className="grid grid-cols-1 gap-4">
                              {Object.entries(services).map(([key, category]) => (
                                <div key={key}>
                                  <h3 className="font-heading font-semibold text-white mb-2">{category.title}</h3>
                                  <div className="space-y-1">
                                    {category.items.map((service) => (
                                      <Link
                                        key={service.slug}
                                        to={`/services/${key}/${service.slug}`}
                                        className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                      >
                                        {service.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : item.dropdownType === 'blog' ? (
                            <div className="space-y-1">
                              {blogDropdown.map((blogItem) => (
                                <Link
                                  key={blogItem.href}
                                  to={blogItem.href}
                                  className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                  {blogItem.name}
                                </Link>
                              ))}
                            </div>
                          ) : item.dropdownType === 'gallery' ? (
                            <div className="space-y-1">
                              {galleryDropdown.map((galleryItem) => (
                                <Link
                                  key={galleryItem.href}
                                  to={galleryItem.href}
                                  className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                  {galleryItem.name}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href) ? 'text-primary-400 bg-gray-800' : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Book Consultation Button */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-primary-400 hover:bg-gray-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-700"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.dropdownType ? null : item.dropdownType)}
                          aria-expanded={activeDropdown === item.dropdownType}
                          aria-haspopup="true"
                          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary-400 hover:bg-gray-800 rounded-lg"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.dropdownType ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.dropdownType && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-1"
                            >
                              {item.dropdownType === 'services' ? (
                                <>
                                  {Object.entries(services).map(([key, category]) => (
                                    <div key={key} className="pb-2">
                                      <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wide mb-1">
                                        {category.title}
                                      </h4>
                                      <div className="space-y-1">
                                        {category.items.map((service) => (
                                          <Link
                                            key={service.slug}
                                            to={`/services/${key}/${service.slug}`}
                                            className="block px-3 py-1 text-sm text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded"
                                            onClick={() => setIsMenuOpen(false)}
                                          >
                                            {service.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : item.dropdownType === 'blog' ? (
                                <>
                                  {blogDropdown.map((blogItem) => (
                                    <Link
                                      key={blogItem.href}
                                      to={blogItem.href}
                                      className="block px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {blogItem.name}
                                    </Link>
                                  ))}
                                </>
                              ) : item.dropdownType === 'gallery' ? (
                                <>
                                  {galleryDropdown.map((galleryItem) => (
                                    <Link
                                      key={galleryItem.href}
                                      to={galleryItem.href}
                                      className="block px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {galleryItem.name}
                                    </Link>
                                  ))}
                                </>
                              ) : null}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.href) ? 'text-primary-400 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  to="/contact"
                  className="block w-full text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg text-sm font-medium mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;