import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';

// Lazy load non-critical pages for better performance
const CosmicGuide = lazy(() => import('./pages/CosmicGuide'));
const CosmicPodcast = lazy(() => import('./pages/CosmicPodcast'));
const Blog = lazy(() => import('./pages/Blog'));
const Mantra = lazy(() => import('./pages/Mantra'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Remedies = lazy(() => import('./pages/Remedies'));
const PitraDosh = lazy(() => import('./pages/PitraDosh'));
const Panchang = lazy(() => import('./pages/Panchang'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/remedies" element={<Remedies />} />
          <Route path="/gallery/pitra-dosh" element={<PitraDosh />} />
          <Route path="/panchang" element={<Panchang />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;