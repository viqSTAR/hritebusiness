import Hero from '../components/Sections/Hero';
import GifShowcase from '../components/Sections/GifShowcase';
import Services from '../components/Sections/Services';
import Projects from '../components/Sections/Projects';
import About from '../components/Sections/About';
import Workflow from '../components/Sections/Workflow';
import Benefits from '../components/Sections/Benefits';
import Contact from '../components/Sections/Contact';
import SEO from '../components/SEO';

const LandingPage = () => (
    <main>
        <SEO />
        <Hero />
        <GifShowcase />
        <Services />
        <Workflow />
        <Benefits />
        <Projects limit={4} />
        <About />
        <Contact />
    </main>
);


export default LandingPage;
