import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Mic, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  releaseDate: Date;
  category: string;
  image: string;
  featured: boolean;
  topics: readonly string[];
  listenUrl?: string;
}

const podcastEpisodes: readonly PodcastEpisode[] = [
  {
    id: 1,
    title: 'Understanding Planetary Transits and Their Impact on Daily Life',
    description: 'Explore how planetary movements influence our everyday experiences and learn to navigate cosmic energies for personal growth.',
    duration: '45:32',
    releaseDate: new Date('2024-01-15'),
    category: 'Vedic Astrology',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Planetry_transit_nine_planets_rotating_around_a_radiant_sun.jpeg',
    featured: true,
    topics: ['Planetary Transits', 'Daily Astrology', 'Cosmic Cycles', 'Personal Growth'],
  },
  {
    id: 2,
    title: 'The Mysteries of Rahu and Ketu: Shadow Planets Revealed',
    description: 'Dive deep into the karmic significance of the lunar nodes and understand their role in spiritual evolution.',
    duration: '52:18',
    releaseDate: new Date('2024-01-08'),
    category: 'Spiritual Wisdom',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Blog%20Images-%20Ancient%20Wisdom/2_rahu_ketu_mysteries_prompt_twin_shadowy_serpents_coiling.jpeg',
    featured: false,
    topics: ['Rahu Ketu', 'Karmic Astrology', 'Spiritual Evolution', 'Shadow Work'],
  },
  {
    id: 3,
    title: 'Healing Through Energy: Reiki and Pranic Healing Explained',
    description: 'Learn about the powerful healing modalities that work with universal life force energy to restore balance and wellness.',
    duration: '38:45',
    releaseDate: new Date('2024-01-01'),
    category: 'Energy Healing',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Chakra%20Balancing.jpg',
    featured: false,
    topics: ['Reiki Healing', 'Pranic Healing', 'Energy Medicine', 'Chakra Balancing'],
  },
  {
    id: 4,
    title: 'KP Astrology: Scientific Approach to Stellar Predictions',
    description: 'Discover the precision of Krishnamurti Paddhati and how it revolutionizes astrological predictions with scientific accuracy.',
    duration: '41:27',
    releaseDate: new Date('2023-12-25'),
    category: 'Astrology Methods',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/numerology_reading_prompt_mystic_numbers_glowing_in_the_air.jpeg',
    featured: false,
    topics: ['KP Astrology', 'Scientific Astrology', 'Stellar Predictions', 'Timing Events'],
  },
  {
    id: 5,
    title: "Crystal Healing: Harnessing Earth's Vibrational Medicine",
    description: 'Explore the ancient art of crystal healing and learn how gemstones can support your physical, emotional, and spiritual well-being.',
    duration: '36:12',
    releaseDate: new Date('2023-12-18'),
    category: 'Crystal Therapy',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Service%20images/Gemstone_Therapy_gemstone_therapy_glowing_gemstones_emerald_ruby_sapphire_floating_in.jpeg',
    featured: false,
    topics: ['Crystal Healing', 'Gemstone Therapy', 'Vibrational Medicine', 'Energy Crystals'],
  },
  {
    id: 6,
    title: 'Meditation and Mindfulness in Spiritual Practice',
    description: 'Learn practical meditation techniques and mindfulness practices that deepen your spiritual connection and inner peace.',
    duration: '43:56',
    releaseDate: new Date('2023-12-11'),
    category: 'Spiritual Practice',
    image: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Meditation.jpg',
    featured: false,
    topics: ['Meditation', 'Mindfulness', 'Spiritual Practice', 'Inner Peace'],
  },
];

const categories: readonly string[] = [
  'All',
  'Vedic Astrology',
  'Spiritual Wisdom',
  'Energy Healing',
  'Astrology Methods',
  'Crystal Therapy',
  'Spiritual Practice',
];

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const CosmicPodcast = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEpisodes =
    selectedCategory === 'All'
      ? podcastEpisodes
      : podcastEpisodes.filter((episode) => episode.category === selectedCategory);

  const featuredEpisode = podcastEpisodes.find((episode) => episode.featured);

  return (
    <>
      <SEOHead
        title="Cosmic Podcast - Spiritual Wisdom & Astrology Insights | Soul Infinity"
        description="Listen to our spiritual podcast featuring episodes on Vedic astrology, energy healing, meditation, and cosmic wisdom by Saurabh Jain."
        keywords="cosmic podcast, spiritual podcast, astrology podcast, vedic astrology audio, energy healing podcast, meditation podcast, saurabh jain podcast"
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
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-8"
            >
              <Mic className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading font-bold text-4xl md:text-5xl mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Cosmic</span> Podcast
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-8"
            >
              Journey into the depths of cosmic wisdom with Saurabh Jain. Explore ancient knowledge,
              modern applications, and transformative spiritual practices through engaging conversations and insights.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-primary-200"
            >
              गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः॥
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      {featuredEpisode && selectedCategory === 'All' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl overflow-hidden shadow-soft-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredEpisode.image}
                    alt={featuredEpisode.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured Episode
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {featuredEpisode.category}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                    {featuredEpisode.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredEpisode.description}
                  </p>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredEpisode.releaseDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredEpisode.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredEpisode.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm italic">
                    Episodes will be published on the platforms below. Subscribe to get
                    notified when they go live.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Episodes Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                {selectedCategory === 'All' ? 'All Episodes' : `${selectedCategory} Episodes`}
              </span>
            </h2>
            <p className="text-gray-600">
              Expand your consciousness with our collection of spiritual wisdom and cosmic insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {episode.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                    {episode.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {episode.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(episode.releaseDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{episode.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {episode.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="bg-accent-100 text-accent-700 px-2 py-1 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {episode.topics.length > 2 && (
                      <span className="text-gray-500 text-xs px-2 py-1">
                        +{episode.topics.length - 2} more
                      </span>
                    )}
                  </div>

                  {episode.listenUrl ? (
                    <a
                      href={episode.listenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Listen to ${episode.title}`}
                      className="inline-flex items-center text-primary-800 font-semibold hover:text-primary-700 transition-colors group"
                    >
                      Listen Now
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Coming soon — subscribe for updates.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEpisodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No episodes found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Cosmic%20Music%20-2.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Subscribe to Cosmic Wisdom</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Never miss an episode! Get the latest cosmic insights and spiritual wisdom delivered directly to your favorite podcast app.
          </p>
          <p className="text-primary-100 mb-8">
            Platform links will appear here once the podcast feed is live.
          </p>
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '919079053840'}?text=${encodeURIComponent("Hi, I'd like to know more about the Cosmic Podcast")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Get Updates via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
};

export default CosmicPodcast;
