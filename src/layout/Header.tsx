import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

type DropdownKey = 'services' | 'learn' | 'about';

interface DropdownGroup {
  heading?: string;
  links: ReadonlyArray<{ name: string; href: string }>;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: {
    key: DropdownKey;
    /** Groups render under an optional heading. */
    groups: ReadonlyArray<DropdownGroup>;
  };
}

const servicesDropdown: ReadonlyArray<DropdownGroup> = [
  {
    heading: 'Vedic Astrology',
    links: [
      { name: 'Overview', href: '/services/vedic-astrology' },
      { name: 'Parashari Jyotish', href: '/services/vedic-astrology/parashari-jyotish' },
      { name: 'BNN Astrology', href: '/services/vedic-astrology/bnn' },
      { name: 'KP Astrology', href: '/services/vedic-astrology/kp-astrology' },
    ],
  },
  {
    links: [
      { name: 'Western Astrology', href: '/services/western-astrology' },
      { name: 'Spiritual Healing', href: '/services/healing' },
    ],
  },
];

const learnDropdown: ReadonlyArray<DropdownGroup> = [
  {
    links: [
      { name: 'Planets', href: '/planets' },
      { name: 'Zodiac Signs', href: '/zodiac' },
      { name: 'Doshas', href: '/dosha' },
      { name: 'Mantras', href: '/blog/mantra' },
      { name: 'Blog', href: '/blog' },
      { name: 'Cosmic Podcast', href: '/cosmic-podcast' },
    ],
  },
];

const aboutDropdown: ReadonlyArray<DropdownGroup> = [
  {
    links: [
      { name: 'Our Cosmic Guide', href: '/cosmic-guide' },
      { name: 'Gallery', href: '/gallery' },
    ],
  },
];

const NAV: ReadonlyArray<NavItem> = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', dropdown: { key: 'services', groups: servicesDropdown } },
  { name: 'Learn', href: '/planets', dropdown: { key: 'learn', groups: learnDropdown } },
  { name: 'Panchang', href: '/panchang' },
  { name: 'About', href: '/cosmic-guide', dropdown: { key: 'about', groups: aboutDropdown } },
  { name: 'Contact', href: '/contact' },
];

function isActiveHref(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isDropdownActive(pathname: string, groups: ReadonlyArray<DropdownGroup>): boolean {
  for (const g of groups) {
    for (const l of g.links) {
      if (isActiveHref(pathname, l.href)) return true;
    }
  }
  return false;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownKey | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click or Escape.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname]);

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
          <div ref={navRef} className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-2">
              {NAV.map((item) => {
                if (!item.dropdown) {
                  const active = isActiveHref(location.pathname, item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'text-primary-400 bg-gray-800'
                          : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }
                const key = item.dropdown.key;
                const active =
                  isActiveHref(location.pathname, item.href) ||
                  isDropdownActive(location.pathname, item.dropdown.groups);
                const isOpen = activeDropdown === key;
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active || isOpen
                          ? 'text-primary-400 bg-gray-800'
                          : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="absolute top-full left-0 mt-2 bg-gray-800 rounded-xl shadow-soft-lg border border-gray-700 p-4 w-64"
                          role="menu"
                        >
                          {item.dropdown.groups.map((group, gi) => (
                            <div key={gi} className={gi > 0 ? 'mt-3 pt-3 border-t border-gray-700' : ''}>
                              {group.heading ? (
                                <h3 className="px-2 pb-1 font-heading font-semibold text-xs uppercase tracking-wide text-gray-400">
                                  {group.heading}
                                </h3>
                              ) : null}
                              <div className="space-y-1">
                                {group.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    to={link.href}
                                    role="menuitem"
                                    onClick={() => setActiveDropdown(null)}
                                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                      isActiveHref(location.pathname, link.href)
                                        ? 'text-primary-400 bg-gray-700'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    }`}
                                  >
                                    {link.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <Link
              to="/contact#contact-form-section"
              onClick={() => trackEvent('book_consultation_click', { location: 'header_desktop' })}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
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
              <div className="space-y-1">
                {NAV.map((item) => {
                  if (!item.dropdown) {
                    const active = isActiveHref(location.pathname, item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          active
                            ? 'text-primary-400 bg-gray-800'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  const key = item.dropdown.key;
                  const isOpen = mobileDropdown === key;
                  const active =
                    isActiveHref(location.pathname, item.href) ||
                    isDropdownActive(location.pathname, item.dropdown.groups);
                  return (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => setMobileDropdown(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          active || isOpen
                            ? 'text-primary-400 bg-gray-800'
                            : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-3 pb-2"
                          >
                            {item.dropdown.groups.map((group, gi) => (
                              <div key={gi} className={gi > 0 ? 'mt-2 pt-2 border-t border-gray-700' : ''}>
                                {group.heading ? (
                                  <h4 className="px-3 py-1 font-semibold text-xs uppercase tracking-wide text-gray-400">
                                    {group.heading}
                                  </h4>
                                ) : null}
                                <div className="space-y-1">
                                  {group.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      to={link.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                        isActiveHref(location.pathname, link.href)
                                          ? 'text-primary-400 bg-gray-700'
                                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                      }`}
                                    >
                                      {link.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <Link
                  to="/contact#contact-form-section"
                  onClick={() => {
                    trackEvent('book_consultation_click', { location: 'header_mobile' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg text-sm font-medium mt-4"
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
