import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '/public/images/fonulations_logo.png';
import Flyout from '@/components/ui/Flyout';
import {  Link, useNavigate } from 'react-router-dom';
import TechnologyFlyout from '@/sections/TechnologyFlyout';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '#services' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Technology', href: '#cyberservices' }, // placeholder for future "Blog" or "Resources" section
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (!href) return;
    // anchor -> scroll on current page
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // if anchor not found, navigate to home first then try to scroll (optional)
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      // path -> route to page
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  // Flyout content components (use closures to access scrollToSection)
  const HomeFlyout = () => (
    <div className="bg-purple-800 mt-2 p-4 w-72  rounded-lg border border-purple-500 text-white">
      <div className="text-sm font-semibold mb-2">Welcome</div>
      <div className="text-xs text-gray-100">Jump back to the top and see our hero showcase.</div>
      <div className="mt-3">
        <button
          onClick={() => scrollToSection('#hero')}
          className="w-full text-sm py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          View Hero
        </button>
      </div>
    </div>
  );

  const AboutFlyout = () => (
    <div className="bg-purple-800 mt-2 p-4 w-72  rounded-lg border border-purple-500 text-white">
      <div className="text-sm font-semibold mb-2">About Fonlutions</div>
      <div className="text-xs text-gray-100">We craft user-centric products and digital experiences.</div>
      <div className="text-xs text-gray-100">Learn more about our methodology and teams.</div>
      <div className="mt-3 flex gap-2">
        {/* button click should lead to <Link href="/about#strategy"> */}
        <Link to="/about#strategy">
          <button className="text-sm px-3 py-1 rounded bg-dark-700 text-white">
            Our Process
          </button>
        </Link>
        <Link to="/about#team">
          <button className="text-sm px-3 py-1 rounded border bg-dark-600 text-white">
            Our Team
          </button>
        </Link>
      </div>
    </div>
  );

  const ServicesFlyout = () => (
    <div className=" bg-purple-800 mt-2 p-4 w-72  rounded-lg border border-purple-500 text-white">
      <div className="text-sm font-semibold">Services</div>
      <div className="text-xs text-gray-100">Product design, web & mobile development, and growth engineering.</div>

      <div className="grid grid-cols-1 gap-2 mt-2">
        <button onClick={() => scrollToSection('#services')} className="text-sm text-left px-3 py-2 rounded hover:bg-gray-100/5">
          Product Design → Overview
        </button>
        <button onClick={() => scrollToSection('#process')} className="text-sm text-left px-3 py-2 rounded hover:bg-gray-100/5">
          Development → Our Process
        </button>
        <button onClick={() => scrollToSection('#projects')} className="text-sm text-left px-3 py-2 rounded hover:bg-gray-100/5">
          Case Studies → Projects
        </button>
      </div>

      <div className="mt-3">
        <button onClick={() => scrollToSection('#contact')} className="w-full text-sm py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          Talk to Us
        </button>
      </div>
    </div>
  );

  // const _ProcessFlyout = () => (
  //   <div className="p-4 w-56">
  //     <div className="text-sm font-semibold mb-2">Our Process</div>
  //     <div className="text-xs text-gray-600">Discover how we move from discovery to delivery.</div>
  //     <div className="mt-3">
  //       <button onClick={() => scrollToSection('#process')} className="w-full text-sm py-2 rounded bg-dark-700 text-white">
  //         See Process
  //       </button>
  //     </div>
  //   </div>
  // );

  // const _ProjectsFlyout = () => (
  //   <div className="p-4 w-64">
  //     <div className="text-sm font-semibold mb-2">Projects</div>
  //     <div className="text-xs text-gray-600">Selected case studies across industries and scales.</div>
  //     <div className="mt-3">
  //       <button onClick={() => scrollToSection('#projects')} className="w-full text-sm py-2 rounded border border-white/10 text-white">
  //         View Projects
  //       </button>
  //     </div>
  //   </div>
  // );

  const ContactFlyout = () => (
    <div className="p-4 w-56 bg-purple-800 mt-2 p-4 w-72  rounded-lg border border-purple-500">
      <div className="text-sm font-semibold mb-2">Get in touch</div>
      <div className="text-xs text-gray-100">Let's talk about your next project.</div>
      <div className="mt-3">
        <button onClick={() => scrollToSection('#contact')} className="w-full text-sm py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          Contact Us
        </button>
      </div>
    </div>
  );
  const SolutionsFlyout = () => (
    <div className=" bg-purple-800 mt-2 p-4 w-72  rounded-lg border border-purple-500 text-white">
      <div className="font-semibold mb-2 text-white">Solutions</div>
      <div className="text-xs text-purple-200/80 mb-3">Tailored technology solutions for your business challenges.</div>

      <div className="grid gap-2">
        <button
          onClick={() => scrollToSection('#services')}
          className="flex items-center gap-3 text-sm text-left px-3 py-2 rounded hover:bg-white/5 transition-colors"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
          Cloud Solutions
        </button>

        <button
          onClick={() => scrollToSection('#projects')}
          className="flex items-center gap-3 text-sm text-left px-3 py-2 rounded hover:bg-white/5 transition-colors"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
          Custom Software Development
        </button>

        <button
          onClick={() => scrollToSection('#technology')}
          className="flex items-center gap-3 text-sm text-left px-3 py-2 rounded hover:bg-white/5 transition-colors"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
          Data & Analytics
        </button>

        <button
          onClick={() => scrollToSection('#cyberservices')}
          className="flex items-center gap-3 text-sm text-left px-3 py-2 rounded hover:bg-white/5 transition-colors"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
          Cybersecurity
        </button>
      </div>

      <div className="mt-3">
        <button onClick={() => scrollToSection('#contact')} className="w-full text-sm py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          Talk to Us
        </button>
      </div>
    </div>
  );
  const flyoutMap: Record<string, React.ComponentType | null> = {
    Home: HomeFlyout,
    About: AboutFlyout,
    Services: ServicesFlyout,
    Solutions: SolutionsFlyout,
    Technology: TechnologyFlyout,
    Contact: ContactFlyout,
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-purple-700/50 backdrop-blur-xl to-purple-600 border-b border-white/5'
            : 'bg-transparent bg-gradient-to-b from-purple-500/50 to-transparent border-b border-white/0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
            >
              <img src={logo} alt="Fonlutions Logo" className="h-10" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const FlyoutContent = flyoutMap[link.name] || null;
                return (
                  <div key={link.name} className="relative">
                    <Flyout href={link.href} FlyoutContent={FlyoutContent} onTriggerClick={() => scrollToSection(link.href)}>
                      <div className="text-lg text-gray-100 hover:text-white transition-colors duration-300">
                        {link.name}
                      </div>
                    </Flyout>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 px-6 magnetic-btn"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-4 right-4 bg-dark-800 rounded-2xl border border-white/10 p-6 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-lg text-gray-300 hover:text-white transition-colors duration-300 py-2"
              >
                {link.name}
              </a>
            ))}
            <Button onClick={() => scrollToSection('#contact')} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 mt-4">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <a href="https://wa.me/+31626293999?text=Hello, I would like to inquire and book an appointment">
          <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50" aria-label="Contact us on WhatsApp"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"></path></svg></button>
      </a>
    </>
  );
}
