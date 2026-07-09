import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import { usePageTracking } from './hooks/usePageTracking';

// Lazy load page-level routes for better initial bundle splitting.
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const CosmicGuide = lazy(() => import('./pages/CosmicGuide'));
const CosmicPodcast = lazy(() => import('./pages/CosmicPodcast'));
const Blog = lazy(() => import('./pages/Blog'));
const Mantra = lazy(() => import('./pages/Mantra'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Remedies = lazy(() => import('./pages/Remedies'));
const PitraDosh = lazy(() => import('./pages/PitraDosh'));
const Panchang = lazy(() => import('./pages/Panchang'));
const Contact = lazy(() => import('./pages/Contact'));
const MyAnalysis = lazy(() => import('./pages/MyAnalysis'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PlanetsHubPage = lazy(() => import('./pages/hubs/PlanetsHubPage'));
const ZodiacHubPage = lazy(() => import('./pages/hubs/ZodiacHubPage'));
const DoshaPage = lazy(() => import('./pages/DoshaPage'));
const MangalDoshaPage = lazy(() => import('./pages/dosha/MangalDoshaPage'));
const SadeSatiPage = lazy(() => import('./pages/dosha/SadeSatiPage'));
const KaalSarpDoshaPage = lazy(() => import('./pages/dosha/KaalSarpDoshaPage'));
const NadiDoshaPage = lazy(() => import('./pages/dosha/NadiDoshaPage'));
const PitruDoshaPage = lazy(() => import('./pages/dosha/PitruDoshaPage'));
const SunPage = lazy(() => import('./pages/planets/SunPage'));
const MoonPage = lazy(() => import('./pages/planets/MoonPage'));
const MercuryPage = lazy(() => import('./pages/planets/MercuryPage'));
const MarsPage = lazy(() => import('./pages/planets/MarsPage'));
const JupiterPage = lazy(() => import('./pages/planets/JupiterPage'));
const SaturnPage = lazy(() => import('./pages/planets/SaturnPage'));
const VenusPage = lazy(() => import('./pages/planets/VenusPage'));
const RahuPage = lazy(() => import('./pages/planets/RahuPage'));
const KetuPage = lazy(() => import('./pages/planets/KetuPage'));
const MeshaRashiPage = lazy(() => import('./pages/zodiac/MeshaRashiPage'));
const VrishabhaRashiPage = lazy(() => import('./pages/zodiac/VrishabhaRashiPage'));
const KarkaRashiPage = lazy(() => import('./pages/zodiac/KarkaRashiPage'));
const MithunaRashiPage = lazy(() => import('./pages/zodiac/MithunaRashiPage'));
const SimhaRashiPage = lazy(() => import('./pages/zodiac/SimhaRashiPage'));
const KanyaRashiPage = lazy(() => import('./pages/zodiac/KanyaRashiPage'));
const TulaRashiPage = lazy(() => import('./pages/zodiac/TulaRashiPage'));
const VrischikaRashiPage = lazy(() => import('./pages/zodiac/VrischikaRashiPage'));
const DhanuRashiPage = lazy(() => import('./pages/zodiac/DhanuRashiPage'));
const MakaraRashiPage = lazy(() => import('./pages/zodiac/MakaraRashiPage'));
const KumbhaRashiPage = lazy(() => import('./pages/zodiac/KumbhaRashiPage'));
const MeenaRashiPage = lazy(() => import('./pages/zodiac/MeenaRashiPage'));
const RohiniNakshatraPage = lazy(() => import('./pages/nakshatra/RohiniNakshatraPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const RohiniNakshatraFemalePage = lazy(() => import('./pages/blog/RohiniNakshatraFemalePage'));
const RohiniNakshatraMalePage = lazy(() => import('./pages/blog/RohiniNakshatraMalePage'));
const RohiniNakshatraPadasPage = lazy(() => import('./pages/blog/RohiniNakshatraPadasPage'));
const ReikiVsPranicPage = lazy(() => import('./pages/blog/ReikiVsPranicPage'));
const MangalDoshaBlogPage = lazy(() => import('./pages/blog/MangalDoshaPage'));
const SadeSati2026Page = lazy(() => import('./pages/blog/SadeSati2026Page'));
const SaturnIn7thHouse = lazy(() => import('./pages/blog/SaturnIn7thHouse'));
const MoonIn4thHouse = lazy(() => import('./pages/blog/MoonIn4thHouse'));
const SaturnKarmaCaseStudy = lazy(() => import('./pages/blog/SaturnKarmaCaseStudy'));
const CanAIDoVedicAstrology = lazy(() => import('./pages/blog/CanAIDoVedicAstrology'));
const SaturnMahadashaPage = lazy(() => import('./pages/blog/SaturnMahadashaPage'));
const JupiterRetrogradePage = lazy(() => import('./pages/blog/JupiterRetrogradePage'));
const RohiniCompatibilityPage = lazy(() => import('./pages/blog/RohiniCompatibilityPage'));
const ShaniJayantiPage = lazy(() => import('./pages/festivals/ShaniJayantiPage'));

// Loading component for lazy-loaded pages
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  usePageTracking();
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:category" element={<Services />} />
          <Route path="/services/:category/:service" element={<ServiceDetail />} />
          <Route path="/cosmic-guide" element={<CosmicGuide />} />
          <Route path="/cosmic-podcast" element={<CosmicPodcast />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/mantra" element={<Mantra />} />
          <Route path="/blog/saturn-in-7th-house-vedic-astrology" element={<SaturnIn7thHouse />} />
          <Route path="/blog/moon-in-4th-house-vedic-astrology" element={<MoonIn4thHouse />} />
          <Route path="/blog/saturn-karma-two-souls" element={<SaturnKarmaCaseStudy />} />
          <Route path="/blog/can-ai-do-vedic-astrology" element={<CanAIDoVedicAstrology />} />
          <Route path="/blog/rohini-nakshatra-female" element={<RohiniNakshatraFemalePage />} />
          <Route path="/blog/rohini-nakshatra-male" element={<RohiniNakshatraMalePage />} />
          <Route path="/blog/rohini-nakshatra-padas" element={<RohiniNakshatraPadasPage />} />
          <Route path="/blog/reiki-vs-pranic-healing" element={<ReikiVsPranicPage />} />
          <Route path="/blog/mangal-dosha-cancellation-rules" element={<MangalDoshaBlogPage />} />
          <Route path="/blog/sade-sati-2026-2027-rashi-effects" element={<SadeSati2026Page />} />
          <Route path="/blog/saturn-mahadasha-antardasha-effects" element={<SaturnMahadashaPage />} />
          <Route path="/blog/jupiter-retrograde-2026" element={<JupiterRetrogradePage />} />
          <Route path="/blog/rohini-nakshatra-compatibility" element={<RohiniCompatibilityPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/shani-jayanti-2026" element={<ShaniJayantiPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/remedies" element={<Remedies />} />
          <Route path="/gallery/pitra-dosh" element={<PitraDosh />} />
          <Route path="/panchang" element={<Panchang />} />
          <Route path="/planets" element={<PlanetsHubPage />} />
          <Route path="/planets/sun" element={<SunPage />} />
          <Route path="/planets/moon" element={<MoonPage />} />
          <Route path="/planets/mercury" element={<MercuryPage />} />
          <Route path="/planets/mars" element={<MarsPage />} />
          <Route path="/planets/jupiter" element={<JupiterPage />} />
          <Route path="/planets/saturn" element={<SaturnPage />} />
          <Route path="/planets/venus" element={<VenusPage />} />
          <Route path="/planets/rahu" element={<RahuPage />} />
          <Route path="/planets/ketu" element={<KetuPage />} />
          <Route path="/zodiac" element={<ZodiacHubPage />} />
          <Route path="/zodiac/aries" element={<MeshaRashiPage />} />
          <Route path="/zodiac/taurus" element={<VrishabhaRashiPage />} />
          <Route path="/zodiac/cancer" element={<KarkaRashiPage />} />
          <Route path="/zodiac/gemini" element={<MithunaRashiPage />} />
          <Route path="/zodiac/leo" element={<SimhaRashiPage />} />
          <Route path="/zodiac/virgo" element={<KanyaRashiPage />} />
          <Route path="/zodiac/libra" element={<TulaRashiPage />} />
          <Route path="/zodiac/scorpio" element={<VrischikaRashiPage />} />
          <Route path="/zodiac/sagittarius" element={<DhanuRashiPage />} />
          <Route path="/zodiac/capricorn" element={<MakaraRashiPage />} />
          <Route path="/zodiac/aquarius" element={<KumbhaRashiPage />} />
          <Route path="/zodiac/pisces" element={<MeenaRashiPage />} />
          <Route path="/nakshatra/rohini" element={<RohiniNakshatraPage />} />
          <Route path="/dosha" element={<DoshaPage />} />
          <Route path="/dosha/mangal" element={<MangalDoshaPage />} />
          <Route path="/dosha/saade-sati" element={<SadeSatiPage />} />
          <Route path="/dosha/kaal-sarp" element={<KaalSarpDoshaPage />} />
          <Route path="/dosha/nadi" element={<NadiDoshaPage />} />
          <Route path="/dosha/pitru" element={<PitruDoshaPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-analysis" element={<MyAnalysis />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
