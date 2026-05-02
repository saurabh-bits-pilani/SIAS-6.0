import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import { useModalDismiss } from '../hooks/useModalDismiss';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const closeLightbox = useCallback(() => setSelectedImage(null), []);
  useModalDismiss(selectedImage !== null, closeLightbox);

  const galleryImages: readonly GalleryImage[] = [
    {
      id: 1,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/dark_blue_cosmic_room_interior_with_golden.jpeg',
      title: 'Cosmic Consultation Room',
      category: 'Workspace',
      description: 'Our serene cosmic consultation room designed for deep spiritual connections'
    },
    {
      id: 2,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/astrologer_s_workspace_with_rahu_ketu_yantra_on_the%20(1).jpeg',
      title: 'Astrologer\'s Sacred Workspace',
      category: 'Workspace',
      description: 'Traditional workspace with Rahu Ketu yantra and sacred astrological tools'
    },
    {
      id: 3,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/astrologer_s_workspace_with_rahu_ketu_yantra_on_the%20(2).jpeg',
      title: 'Vedic Astrology Setup',
      category: 'Workspace',
      description: 'Complete Vedic astrology consultation setup with traditional elements'
    },
    {
      id: 4,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/desktop_with_open_panchang_digital_transit_screen%20(2).jpeg',
      title: 'Digital Panchang Analysis',
      category: 'Technology',
      description: 'Modern digital tools for accurate Panchang and transit analysis'
    },
    {
      id: 5,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/serene_meditation_corner_with_mat_incense_conch.jpeg',
      title: 'Meditation Corner',
      category: 'Healing',
      description: 'Peaceful meditation space with traditional elements for spiritual practice'
    },
    {
      id: 6,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/astrological_class_in_session_teacher_explaining_nakshatras_on.jpeg',
      title: 'Astrology Learning Session',
      category: 'Education',
      description: 'Interactive astrology learning session explaining Nakshatras and cosmic wisdom'
    },
    {
      id: 7,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/office_library_corner_with_sacred_texts_navagraha.jpeg',
      title: 'Sacred Library',
      category: 'Education',
      description: 'Collection of sacred texts and Navagraha references for deep study'
    },
    {
      id: 8,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/astrologer_s_workspace_with_rahu_ketu_yantra_on_the%20(3).jpeg',
      title: 'Traditional Consultation Space',
      category: 'Workspace',
      description: 'Traditional setup for authentic Vedic astrology consultations'
    },
    {
      id: 9,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Buddha.jpg',
      title: 'Buddha Meditation',
      category: 'Healing',
      description: 'Peaceful Buddha statue creating a serene atmosphere for meditation'
    },
    {
      id: 10,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Chakra%20Balancing.jpg',
      title: 'Chakra Balancing Session',
      category: 'Healing',
      description: 'Chakra balancing therapy using traditional healing techniques'
    },
    {
      id: 11,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Herbs.jpg',
      title: 'Sacred Herbs Collection',
      category: 'Healing',
      description: 'Collection of sacred herbs used in traditional healing practices'
    },
    {
      id: 12,
      src: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Spritual/Pooja.jpg',
      title: 'Pooja Items',
      category: 'Ceremonies',
      description: 'Traditional pooja items for spiritual ceremonies and rituals'
    }
  ];

  const categories = ['All', 'Workspace', 'Healing', 'Education', 'Technology', 'Ceremonies'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <>
      <SEOHead
        title="Gallery - Soul Infinity Astrology & Healing Sessions Ahmedabad"
        description="Glimpses of Soul Infinity's spiritual journey - consultations, healing sessions, events & sacred spaces in Ahmedabad. Led by Saurabh Jain."
        keywords="spiritual gallery, healing sessions, astrology consultations, reiki healing, meditation workshops, sacred ceremonies, saurabh jain"
        image="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Gallaery/dark_blue_cosmic_room_interior_with_golden.jpeg"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Gallery, Sacred Moments & Spiritual Sessions',
          description:
            'Photo gallery showcasing healing sessions, spiritual consultations, workshops, and sacred ceremonies at Soul Infinity.',
          url: '/gallery',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/New_Hero-image-%20banner%20/luxurious_close_up_of_a_spiritual_arrangement_on.webp" 
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्। भक्तावासं स्मरेनित्यं आयुःकामार्थसिद्धये॥
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
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    width="400"
                    height="400"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-heading font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Image preview: ${selectedImage.title}`}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close image preview"
                autoFocus
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width="1200"
                  height="900"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage.category}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Explore More Spiritual Resources</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover powerful planetary remedies and healing solutions for spiritual growth and life transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery/remedies"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              View Planetary Remedies
            </Link>
            <Link
              to="/gallery/pitra-dosh"
              className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all duration-300 inline-flex items-center"
            >
              Learn About Pitra Dosh
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Ready to Create Your Own Sacred Moment?</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands who have found peace, clarity, and transformation through our services. 
            Your journey of healing and discovery awaits.
          </p>
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '919079053840'}?text=${encodeURIComponent("Hi, I'd like to book a session after viewing your gallery")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Book Your Session Today
          </a>
        </div>
      </section>
    </>
  );
};

export default Gallery;