import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '/public/images/fonulations_logo.png';
import Flyout from '@/components/ui/Flyout';
import { href, Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#hero' },
  // About is a dedicated page — navigate to /about
  { name: 'About', href: '/about' },
  { name: 'Services', href: '#services' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Technology', href: '#technology' }, // placeholder for future "Blog" or "Resources" section
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
    <div className="p-4 w-56">
      <div className="text-sm font-semibold mb-2">Welcome</div>
      <div className="text-xs text-gray-600">Jump back to the top and see our hero showcase.</div>
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
    <div className="p-4 w-64">
      <div className="text-sm font-semibold mb-2">About Fonlutions</div>
      <div className="text-xs text-gray-600">We craft user-centric products and digital experiences.</div>
      <div className="text-xs text-gray-600">Learn more about our methodology and teams.</div>
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
    <div className="p-4 w-72 grid grid-cols-1 gap-3">
      <div className="text-sm font-semibold">Services</div>
      <div className="text-xs text-gray-600">Product design, web & mobile development, and growth engineering.</div>

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

  const ProcessFlyout = () => (
    <div className="p-4 w-56">
      <div className="text-sm font-semibold mb-2">Our Process</div>
      <div className="text-xs text-gray-600">Discover how we move from discovery to delivery.</div>
      <div className="mt-3">
        <button onClick={() => scrollToSection('#process')} className="w-full text-sm py-2 rounded bg-dark-700 text-white">
          See Process
        </button>
      </div>
    </div>
  );

  const ProjectsFlyout = () => (
    <div className="p-4 w-64">
      <div className="text-sm font-semibold mb-2">Projects</div>
      <div className="text-xs text-gray-600">Selected case studies across industries and scales.</div>
      <div className="mt-3">
        <button onClick={() => scrollToSection('#projects')} className="w-full text-sm py-2 rounded border border-white/10 text-white">
          View Projects
        </button>
      </div>
    </div>
  );

  const ContactFlyout = () => (
    <div className="p-4 w-56">
      <div className="text-sm font-semibold mb-2">Get in touch</div>
      <div className="text-xs text-gray-600">Let's talk about your next project.</div>
      <div className="mt-3">
        <button onClick={() => scrollToSection('#contact')} className="w-full text-sm py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          Contact Us
        </button>
      </div>
    </div>
  );

  const flyoutMap: Record<string, React.ComponentType | null> = {
    Home: HomeFlyout,
    About: AboutFlyout,
    Services: ServicesFlyout,
    Process: ProcessFlyout,
    Projects: ProjectsFlyout,
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
    </>
  );
}
