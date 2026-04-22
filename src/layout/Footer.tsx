import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const servicesColumn: ReadonlyArray<FooterLink> = [
  { name: 'Parashari Jyotish', href: '/services/vedic-astrology/parashari-jyotish' },
  { name: 'BNN Astrology', href: '/services/vedic-astrology/bnn' },
  { name: 'KP Astrology', href: '/services/vedic-astrology/kp-astrology' },
  { name: 'Astro Vastu', href: '/services/vedic-astrology/astro-vastu' },
  { name: 'Gemstone Consultation', href: '/services/vedic-astrology/gem-stone' },
  { name: 'All Services', href: '/services' },
];

const learnColumn: ReadonlyArray<FooterLink> = [
  { name: 'Planets', href: '/planets' },
  { name: 'Zodiac Signs', href: '/zodiac' },
  { name: 'Doshas', href: '/dosha' },
  { name: 'Mantras', href: '/blog/mantra' },
  { name: 'Blog', href: '/blog' },
  { name: 'Cosmic Podcast', href: '/cosmic-podcast' },
  { name: 'Panchang', href: '/panchang' },
];

const aboutColumn: ReadonlyArray<FooterLink> = [
  { name: 'Our Cosmic Guide', href: '/cosmic-guide' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'Credentials', href: '/cosmic-guide' },
];

interface SocialLink {
  name: string;
  icon: string;
  href: string;
  altText: string;
}

const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '919079053840';

const socialLinks: ReadonlyArray<SocialLink> = [
  {
    name: 'Facebook',
    icon: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Icons/facebook.png',
    href: 'https://www.facebook.com/people/Soul-Infinity/',
    altText: 'Facebook - Soul Infinity page',
  },
  {
    name: 'WhatsApp',
    icon: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Icons/whatsapp_2504957.png',
    href: `https://wa.me/${whatsappPhone}`,
    altText: 'WhatsApp - Contact Saurabh Jain',
  },
  {
    name: 'Quora',
    icon: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Icons/quora.png',
    href: 'https://www.quora.com/profile/Saurabh-Jain-Soul-Infinity',
    altText: 'Quora - Saurabh Jain profile',
  },
];

function renderLinks(links: ReadonlyArray<FooterLink>) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Sanskrit invocation (shloka) */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-primary-300 text-base md:text-lg font-semibold">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Brand */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png"
              alt="Soul Infinity logo"
              width="40"
              height="40"
              loading="lazy"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="font-heading font-bold text-xl leading-none">Soul Infinity</h3>
              <p className="text-sm text-gray-400 leading-none mt-1">
                Vedic Astrology & Spiritual Guidance
              </p>
            </div>
          </Link>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors p-2"
                aria-label={social.altText}
              >
                <img
                  src={social.icon}
                  alt={social.altText}
                  width="24"
                  height="24"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Services</h4>
            {renderLinks(servicesColumn)}
          </div>

          {/* Column 2: Learn */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Learn</h4>
            {renderLinks(learnColumn)}
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">About</h4>
            {renderLinks(aboutColumn)}
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  The Meadows, D3 901
                  <br />
                  Adani Shantigram, Khodiyar
                  <br />
                  Ahmedabad, Gujarat 382501
                  <br />
                  India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <a href="tel:+919079053840" className="text-gray-400 hover:text-white transition-colors">
                  +91 90790 53840
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:soul.infinity.astro@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors break-all"
                >
                  soul.infinity.astro@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  WhatsApp: wa.me/{whatsappPhone}
                </a>
              </div>
              <div className="flex items-start space-x-3 pt-2">
                <Clock className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                <div className="text-gray-400 space-y-0.5">
                  <p>
                    <span className="text-white">Mon–Fri:</span> 12:00 PM – 9:00 PM
                  </p>
                  <p>
                    <span className="text-white">Saturday:</span> 10:00 AM – 3:00 PM
                  </p>
                  <p>
                    <span className="text-white">Sunday:</span> By Appointment Only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Sanskrit shloka */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-primary-300 text-base md:text-lg font-semibold mb-2">
            ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते।
            <br />
            पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥
          </p>
          <p className="text-gray-400 text-sm">
            That is complete, this is complete, from completeness comes completeness.
            <br />
            When completeness is taken from completeness, completeness remains.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">
          <p className="text-gray-400 text-sm">© 2026 Soul Infinity. All rights reserved.</p>
          <div className="flex items-center justify-center gap-5 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <a
              href="https://maps.app.goo.gl/fLm4zk1RUJ4uki3f6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
            >
              Google Maps
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
