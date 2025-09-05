import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileGrid } from './components/ProfileGrid';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans">
      <Header />
      <main>
        <Hero />
        <ProfileGrid />
        <Features />
      </main>
      <Footer />
    </div>
  );
}