import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import MissionVision from '../components/MissionVision';
import HowItStarted from '../components/HowItStarted';
import Milestones from '../components/Milestones';
import Awards from '../components/Awards';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <MissionVision />
      <HowItStarted />
      <Milestones />
      <Awards />
      <Footer />
    </div>
  );
}
