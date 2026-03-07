import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Process from '@/sections/Process';
import OurClients from '@/sections/OurClients';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import CyberServices from '@/sections/CyberServices';

/**
 * Homepage contains the sections that used to live in App.tsx.
 * Keep this file focused on page content so App.tsx can manage routing/layout.
 */
export default function Homepage() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Services />
      <CyberServices />
      <Process />
      {/* <Projects /> */}
      <OurClients />
      <Testimonials />
      <Contact />
    </main>
  );
}