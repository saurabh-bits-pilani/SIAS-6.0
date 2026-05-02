import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

const Privacy = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'Personal identification information (name, email, phone number)',
        'Birth details for astrological consultations (date, time, place of birth)',
        'Payment information (processed securely through encrypted channels)',
        'Communication records (consultation notes, email correspondence)',
        'Website usage data (cookies, analytics, user preferences)'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Provide personalized astrological and healing consultations',
        'Communicate about appointments, services, and follow-up care',
        'Process payments and maintain accurate business records',
        'Improve our services based on feedback and usage patterns',
        'Send relevant spiritual guidance and educational content (with consent)'
      ]
    },
    {
      icon: Lock,
      title: 'Data Protection & Security',
      content: [
        'All personal and sensitive information is encrypted and stored securely',
        'Birth chart data and consultation records are kept strictly confidential',
        'We use industry-standard security measures to protect your privacy',
        'Access to your information is limited to authorized practitioners only',
        'Regular security audits ensure ongoing protection of your data'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights & Choices',
      content: [
        'Request access to your personal information at any time',
        'Correct or update your information as needed',
        'Request deletion of your data (subject to legal requirements)',
        'Opt-out of marketing communications while maintaining service access',
        'Transfer your data to another service provider upon request'
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy - Soul Infinity"
        description="How Soul Infinity handles your personal information and birth details. Your privacy and data security are our top priority."
        keywords="privacy policy, data protection, cookie policy, confidentiality, personal information security"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/banner%2021.webp"
        noindex
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Privacy Policy & Cookie Policy',
          description:
            "How Soul Infinity collects, uses, and protects personal information, including data from astrology consultations, contact forms, and site cookies.",
          url: '/privacy',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/banner%2021.webp" 
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Privacy</span> Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Your privacy and confidentiality are sacred to us. Learn how we protect your personal information 
              and maintain the highest standards of data security for all spiritual consultations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust Badge */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <Shield className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Your Trust is Sacred</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand that spiritual consultations involve deeply personal information. 
              Our commitment to privacy goes beyond legal requirements – it's fundamental to our spiritual practice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-surface rounded-2xl p-8 shadow-soft"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Policy */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-soft"
          >
            <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Cookie Policy</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                  What Are Cookies?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences 
                  and improving our services.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                  Types of Cookies We Use
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                    <p className="text-gray-700 text-sm">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                    <p className="text-gray-700 text-sm">
                      Help us understand how visitors interact with our website to improve user experience.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Preference Cookies</h4>
                    <p className="text-gray-700 text-sm">
                      Remember your settings and preferences for a personalized experience.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                  Managing Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You can control and/or delete cookies as you wish. You can delete all cookies 
                  already on your computer and set most browsers to prevent them from being placed. 
                  However, some features of our website may not function properly without cookies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Retention & Third Parties */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-surface rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Data Retention
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Consultation records: 7 years (for continuity of care)</li>
                <li>• Payment information: As required by law</li>
                <li>• Marketing preferences: Until you opt-out</li>
                <li>• Website analytics: 26 months maximum</li>
                <li>• Birth chart data: Permanently (unless deletion requested)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-surface rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Third-Party Services
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Payment processors (encrypted and secure)</li>
                <li>• Analytics services (anonymized data only)</li>
                <li>• Email service providers (opt-in basis)</li>
                <li>• Video calling platforms (for online consultations)</li>
                <li>• Cloud storage (encrypted and access-controlled)</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Updates */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Questions About Your Privacy?</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            We're committed to transparency and are here to address any privacy concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:soul.infinity.astro@gmail.com?subject=Privacy%20Policy%20Question"
              className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Contact Privacy Team
            </a>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              General Contact
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-primary-400 text-sm text-primary-100">
            <p>
              <strong>Last Updated:</strong> January 1, 2024 | 
              <strong> Effective Date:</strong> January 1, 2024
            </p>
            <p className="mt-2">
              We may update this policy periodically. Significant changes will be communicated 
              to you via email or prominent website notice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;