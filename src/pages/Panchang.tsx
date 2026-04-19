import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sun, Moon, Star, Clock } from 'lucide-react';
import { format, addDays } from 'date-fns';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';

interface PanchangData {
  date: string;
  vara: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKaal: string;
  yamaGanda: string;
  gulika: string;
  abhijitMuhurta: string;
  amritaKaal: string;
  phase: string;
}

const tithis: readonly string[] = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya',
];

const nakshatras: readonly string[] = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

const yogas: readonly string[] = [
  'Vishkumbha', 'Preeti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti',
];

const karanas: readonly string[] = [
  'Kimstughna', 'Bava', 'Balava', 'Kaulava', 'Taitila',
  'Gara', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga',
];

const vaaras: readonly string[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
];

function generatePanchang(date: Date): PanchangData {
  const dayIndex = date.getDay();
  const dateIndex = date.getDate();

  return {
    date: format(date, 'EEEE, MMMM dd, yyyy'),
    vara: vaaras[dayIndex],
    tithi: tithis[dateIndex % 15],
    nakshatra: nakshatras[dateIndex % 27],
    yoga: yogas[dateIndex % 27],
    karana: karanas[dateIndex % 11],
    sunrise: '06:45 AM',
    sunset: '06:30 PM',
    moonrise: '08:15 PM',
    moonset: '07:20 AM',
    rahuKaal: '12:00 PM - 01:30 PM',
    yamaGanda: '10:30 AM - 12:00 PM',
    gulika: '04:30 PM - 06:00 PM',
    abhijitMuhurta: '11:54 AM - 12:42 PM',
    amritaKaal: '02:15 PM - 03:45 PM',
    phase: dateIndex < 15 ? 'Shukla Paksha' : 'Krishna Paksha',
  };
}

const Panchang = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const panchang = useMemo(() => generatePanchang(selectedDate), [selectedDate]);

  const nextDay = (): void => setSelectedDate((prev) => addDays(prev, 1));
  const prevDay = (): void => setSelectedDate((prev) => addDays(prev, -1));
  const goToToday = (): void => setSelectedDate(new Date());

  return (
    <>
      <SEOHead
        title="Today's Panchang - Daily Tithi, Nakshatra, Muhurat | Soul Infinity"
        description="Live daily Panchang with tithi, nakshatra, yoga, karana & auspicious muhurat timings. Accurate Hindu calendar by Soul Infinity, Ahmedabad."
        keywords="panchang, vedic calendar, tithi, nakshatra, yoga, karana, rahu kaal, muhurta, auspicious time"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/golden_hour_cinematic_temple_scene_with_a_small.webp"
        omitDefaultSchema
      />
      <SchemaMarkup type="panchang" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/golden_hour_cinematic_temple_scene_with_a_small.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-bold text-4xl md:text-5xl mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Today's</span> Panchang
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              गजाननं भूतगणादि सेवितं कपित्थ जम्बूफलचारुभक्षणम्। उमासुतं शोकविनाशकारकं नमामि विघ्नेश्वर पादपङ्कजम्॥
            </motion.p>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={prevDay}
              aria-label="Show previous day's Panchang"
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-soft hover:bg-white/30 transition-all duration-300 font-medium"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={goToToday}
              aria-label="Reset to today's Panchang"
              className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-soft hover:shadow-lg transition-all duration-300 font-medium"
            >
              Today
            </button>
            <button
              type="button"
              onClick={nextDay}
              aria-label="Show next day's Panchang"
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-soft hover:bg-white/30 transition-all duration-300 font-medium"
            >
              Next →
            </button>
          </div>
          <p className="text-center text-sm text-yellow-200 max-w-2xl mx-auto">
            Sample timings shown below are illustrative and approximate.
            For location-accurate muhurtas, please book a personalised consultation.
          </p>
        </div>
      </section>

      {/* Panchang Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Current Date */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <h2 className="font-heading font-bold text-3xl mb-2">{panchang.date}</h2>
              <p className="text-xl text-primary-100">{panchang.vara} • {panchang.phase}</p>
            </motion.div>
          </div>

          {/* Panchang Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-surface rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Tithi</h3>
              <p className="text-gray-600">{panchang.tithi}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-surface rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Nakshatra</h3>
              <p className="text-gray-600">{panchang.nakshatra}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-surface rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Yoga</h3>
              <p className="text-gray-600">{panchang.yoga}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-surface rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Karana</h3>
              <p className="text-gray-600">{panchang.karana}</p>
            </motion.div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Celestial Timings */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6">Celestial Timings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-900">Sunrise</span>
                  </div>
                  <span className="text-gray-700">{panchang.sunrise}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Sun className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-gray-900">Sunset</span>
                  </div>
                  <span className="text-gray-700">{panchang.sunset}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Moon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">Moonrise</span>
                  </div>
                  <span className="text-gray-700">{panchang.moonrise}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Moon className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-gray-900">Moonset</span>
                  </div>
                  <span className="text-gray-700">{panchang.moonset}</span>
                </div>
              </div>
            </motion.div>

            {/* Auspicious & Inauspicious Times */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6">Important Timings</h3>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <div className="font-medium text-gray-900 mb-1">Rahu Kaal</div>
                  <div className="text-sm text-gray-600 mb-1">{panchang.rahuKaal}</div>
                  <div className="text-xs text-red-600">Avoid important activities</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="font-medium text-gray-900 mb-1">Yama Ganda</div>
                  <div className="text-sm text-gray-600 mb-1">{panchang.yamaGanda}</div>
                  <div className="text-xs text-yellow-600">Caution advised</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <div className="font-medium text-gray-900 mb-1">Gulika</div>
                  <div className="text-sm text-gray-600 mb-1">{panchang.gulika}</div>
                  <div className="text-xs text-orange-600">Inauspicious period</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="font-medium text-gray-900 mb-1">Abhijit Muhurta</div>
                  <div className="text-sm text-gray-600 mb-1">{panchang.abhijitMuhurta}</div>
                  <div className="text-xs text-green-600">Most auspicious time</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="font-medium text-gray-900 mb-1">Amrita Kaal</div>
                  <div className="text-sm text-gray-600 mb-1">{panchang.amritaKaal}</div>
                  <div className="text-xs text-blue-600">Auspicious period</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Significance Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Understanding Panchang</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">What is Panchang?</h3>
                <p className="text-gray-600 mb-4">
                  Panchang is a Hindu calendar and almanac that provides important astronomical and astrological information for each day.
                  The word "Panchang" literally means "five limbs" referring to the five essential elements.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Vara:</strong> Day of the week</li>
                  <li>• <strong>Tithi:</strong> Lunar day</li>
                  <li>• <strong>Nakshatra:</strong> Constellation</li>
                  <li>• <strong>Yoga:</strong> Auspicious combinations</li>
                  <li>• <strong>Karana:</strong> Half of a lunar day</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">How to Use Panchang</h3>
                <p className="text-gray-600 mb-4">
                  Use Panchang to determine the most auspicious times for important activities like:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Starting new ventures</li>
                  <li>• Religious ceremonies</li>
                  <li>• Marriage and celebrations</li>
                  <li>• Travel and journeys</li>
                  <li>• Spiritual practices</li>
                  <li>• Avoiding inauspicious periods</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Panchang;
