import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@fonlutions.nl',
    href: 'mailto:info@fonlutions.nl',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+31620144888',
    href: 'tel:+31620144888',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Tom Navislaan 25, 2493 BM Den Haag',
    href: 'https://maps.google.com/maps/place/Tom+Navislaan+25,+2493+BM+Den+Haag/data=!4m2!3m1!1s0x47c5b62a16972af7:0x920987ed8204f464?entry=s&sa=X&ved=1t:78214&hl=en-GB&ictx=111',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
    
      // send message too.
      const whatsappUrl = `https://wa.me/31620144888?text=${encodeURIComponent(
        `Hello, I am ${formData.name}${formData.company ? ' from ' + formData.company : ''}. I would like to discuss my project: ${formData.message}. You can reach me at ${formData.email}`
      )}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-purple-400">Contact Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your <span className="text-gradient">Project</span>
          </h2>
          <p className="text-lg text-gray-400">
            Ready to transform your ideas into reality? Get in touch with us and
            let's discuss how we can help your business grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-start gap-4 group transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      {item.label}
                    </div>
                    <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
              <div
                      className={`mt-4 ml-16 transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: '0.65s' }}
                    >
                      <div className="rounded-xl overflow-hidden border border-purple-500/20 shadow-lg shadow-purple-500/5">
                        <iframe
                          title="Fonlutions Office Location"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2454.123!2d4.2761!3d52.0589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b62a16972af7%3A0x920987ed8204f464!2sTom%20Navislaan%2025%2C%202493%20BM%20Den%20Haag%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1700000000000!5m2!1sen!2snl"
                          width="100%"
                          height="180"
                          style={{ border: 0, display: 'block' }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <a
                        href="https://maps.google.com/maps/place/Tom+Navislaan+25,+2493+BM+Den+Haag/data=!4m2!3m1!1s0x47c5b62a16972af7:0x920987ed8204f464"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <MapPin className="w-3 h-3" />
                        Open in Google Maps
                      </a>
                    </div>
            {/* Social proof */}
            <div className="mt-12 p-6 rounded-2xl bg-dark-800/50 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-dark-800 flex items-center justify-center text-xs text-white font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  <span className="text-white font-semibold">50+</span> clients
                  trust us
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Join our growing list of satisfied clients who have transformed
                their businesses with our solutions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 rounded-2xl bg-dark-800/80 backdrop-blur-xl border border-white/10"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Your Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-dark-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Email Address
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-dark-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="bg-dark-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">
                      Your Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      required
                      rows={5}
                      className="bg-dark-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 py-6 text-lg magnetic-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
