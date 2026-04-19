import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import StagingBanner from '../components/StagingBanner';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white font-body">
      <StagingBanner />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;