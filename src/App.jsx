import Home from './pages/Home';
import ScrollAnimator from './components/ScrollAnimator';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollAnimator />
      <Home />
      <ScrollToTop />
    </>
  );
}
