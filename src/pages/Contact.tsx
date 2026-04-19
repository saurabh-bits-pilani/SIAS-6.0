import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import {
  validateContactForm,
  buildWhatsappUrl,
  type ContactFormData,
  type ValidationError,
} from '../utils/validation';

const DEFAULT_WHATSAPP_PHONE = '919079053840';

const initialFormData: ContactFormData = {
  fullName: '',
  gender: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  birthHour: '',
  birthMinute: '',
  birthSecond: '',
  country: '',
  placeOfBirth: '',
  phoneNumber: '',
  emailAddress: '',
  messageText: '',
};

const countries: readonly string[] = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Japan', 'China', 'Brazil', 'Russia', 'Italy',
  'Spain', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
  'Singapore', 'UAE', 'South Africa', 'New Zealand', 'Ireland', 'Belgium'
];

const months: readonly string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const days: readonly number[] = Array.from({ length: 31 }, (_, i) => i + 1);
const years: readonly number[] = Array.from(
  { length: 125 },
  (_, i) => new Date().getFullYear() - i,
);
const hours: readonly string[] = Array.from(
  { length: 24 },
  (_, i) => i.toString().padStart(2, '0'),
);
const minutes: readonly string[] = Array.from(
  { length: 60 },
  (_, i) => i.toString().padStart(2, '0'),
);
const seconds: readonly string[] = Array.from(
  { length: 60 },
  (_, i) => i.toString().padStart(2, '0'),
);
const genders: readonly string[] = ['Male', 'Female', 'Other'];

interface ContactInfoItem {
  id: string;
  icon: typeof MapPin;
  title: string;
  details: readonly string[];
  color: string;
}

const contactInfo: readonly ContactInfoItem[] = [
  {
    id: 'address',
    icon: MapPin,
    title: 'Visit Our Center',
    details: ['The D3 Medows', 'Adani Shantigram', 'Ahmedabad, Gujarat 382421', 'India'],
    color: 'text-primary-500',
  },
  {
    id: 'phone',
    icon: Phone,
    title: 'Call Us',
    details: ['+91 90790 53840', 'Mon-Fri: 12 PM - 9 PM', 'Sat: 10 AM - 3 PM'],
    color: 'text-secondary-500',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email Us',
    details: ['soul.infinity.astro@gmail.com', 'Response within 24 hours'],
    color: 'text-accent-500',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    details: ['+91 90790 53840', 'Instant Response'],
    color: 'text-green-500',
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: readonly FaqItem[] = [
  {
    question: 'Why do you need my exact birth time?',
    answer: 'Precise birth time is crucial for accurate astrological calculations. Even a few minutes difference can change your birth chart significantly, affecting predictions and guidance.',
  },
  {
    question: 'What if I don\'t know my exact birth time?',
    answer: 'If exact time is unknown, provide your best estimate. Saurabh can work with approximate times, though precision may be slightly reduced. Sometimes birth time rectification techniques can help.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely. Your birth details and personal information are kept strictly confidential and used solely for your astrological consultation and spiritual guidance.',
  },
  {
    question: 'How accurate should my birth place be?',
    answer: 'Please provide the city where you were born. If born in a small town or village, mention the nearest major city. This helps in calculating accurate planetary positions.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const found = validateContactForm(formData);
    setErrors(found);
    if (found.length > 0) {
      return;
    }

    const phone = import.meta.env.VITE_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE;
    const url = buildWhatsappUrl(phone, formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <SEOHead
        title="Contact Us - Book Your Spiritual Consultation | Soul Infinity"
        description="Get in touch with Saurabh Jain for personalized consultations. Available via phone, email, WhatsApp, or visit our center in Ahmedabad. Book your session today."
        keywords="contact astrologer, book consultation, spiritual guidance contact, saurabh jain contact, astrology appointment, ahmedabad astrologer"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/atmospheric_himalayan_cave_interior_lit_by_flickering.webp"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/atmospheric_himalayan_cave_interior_lit_by_flickering.webp"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Connect With Your</span> Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              ॐ गं गणपतये नमः॥
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-surface rounded-2xl shadow-soft"
              >
                <div className={`w-16 h-16 ${info.color} bg-current bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail) => (
                  <p key={detail} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              id="contact-form-section"
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <h2 className="font-heading font-bold text-3xl text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
                For immediate assistance, use WhatsApp.
              </p>

              {errors.length > 0 && (
                <div
                  role="alert"
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-2">
                        Please correct the following before submitting:
                      </p>
                      <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                        {errors.map((err) => (
                          <li key={`${err.field}-${err.message}`}>{err.message}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Gender</option>
                        {genders.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Birth Details */}
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                    Birth Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Date of Birth *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="birthDay" className="block text-xs text-gray-500 mb-1">Day</label>
                        <select
                          id="birthDay"
                          name="birthDay"
                          value={formData.birthDay}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Day</option>
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="birthMonth" className="block text-xs text-gray-500 mb-1">Month</label>
                        <select
                          id="birthMonth"
                          name="birthMonth"
                          value={formData.birthMonth}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Month</option>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="birthYear" className="block text-xs text-gray-500 mb-1">Year</label>
                        <select
                          id="birthYear"
                          name="birthYear"
                          value={formData.birthYear}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Time of Birth *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="birthHour" className="block text-xs text-gray-500 mb-1">Hour (24h)</label>
                        <select
                          id="birthHour"
                          name="birthHour"
                          value={formData.birthHour}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Hour</option>
                          {hours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="birthMinute" className="block text-xs text-gray-500 mb-1">Minute</label>
                        <select
                          id="birthMinute"
                          name="birthMinute"
                          value={formData.birthMinute}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Min</option>
                          {minutes.map((minute) => (
                            <option key={minute} value={minute}>
                              {minute}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="birthSecond" className="block text-xs text-gray-500 mb-1">Second</label>
                        <select
                          id="birthSecond"
                          name="birthSecond"
                          value={formData.birthSecond}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Sec</option>
                          {seconds.map((second) => (
                            <option key={second} value={second}>
                              {second}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        Place of Birth *
                      </label>
                      <input
                        id="placeOfBirth"
                        type="text"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Enter city of birth"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="+91 90790 53840"
                      />
                    </div>
                    <div>
                      <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="emailAddress"
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="messageText" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="messageText"
                    name="messageText"
                    value={formData.messageText}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Any specific questions or additional information you'd like to share..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your birth details will be sent directly to Saurabh via WhatsApp for immediate processing.
                    All information is kept strictly confidential and used only for your astrological consultation.
                  </p>
                </div>

                <button
                  type="submit"
                  aria-label="Send contact details via WhatsApp"
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Details via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Frequently Asked Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about birth chart consultations and required information.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-surface rounded-xl p-6 shadow-soft"
              >
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Hours */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6">
              <Clock className="w-6 h-6 inline mr-2 text-primary-500" />
              Consultation Hours
            </h3>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Need Immediate Guidance?</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Don't wait for transformation. Connect with Saurabh Jain now through WhatsApp
            for instant support and to book your consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE}?text=${encodeURIComponent('Hi, I need immediate spiritual guidance from Saurabh Jain')}`}
              aria-label="Contact us immediately via WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Now
            </a>
            <Link
              to="/contact#contact-form-section"
              aria-label="Jump to the contact form"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Use Contact Form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
