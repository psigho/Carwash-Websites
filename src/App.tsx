import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, Star, Shield, ChevronRight, Check, MapPin } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ap-black)] text-[var(--color-ap-white)] selection:bg-white/20">
      <Hero />
      <TrustBar />
      <Services />
      <BookingWidget />
      <Gallery />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end pb-24 md:pb-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury car detailing" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="micro-label mb-4 text-white/70">Premium Auto Spa</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 max-w-4xl">
            Austin's #1 <br/>
            <span className="italic text-white/90">Ceramic Coating</span> <br/>
            Specialists
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md md:max-w-none">
            <button className="btn-primary w-full sm:w-auto h-14">
              Get a Free Quote
            </button>
            <button className="btn-secondary w-full sm:w-auto h-14 gap-2">
              <Phone size={16} />
              Call (512) 555-0199
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-white/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm tracking-wide">
          <div className="flex items-center gap-3">
            <div className="flex text-[var(--color-ap-gold)]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-medium">5.0 on Google</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2 text-white/80">
            <span className="font-medium text-white">100+</span> Verified Reviews
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2 text-white/80">
            <Shield size={16} className="text-[var(--color-ap-gold)]" />
            Licensed & Insured
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Signature Detail",
    price: "199",
    desc: "A comprehensive interior and exterior reset. Perfect for maintaining that showroom feel.",
    features: ["Hand Wash & Dry", "Clay Bar Treatment", "Interior Deep Clean", "Leather Conditioning"]
  },
  {
    title: "Paint Correction",
    price: "499",
    desc: "Remove swirls, scratches, and oxidation to reveal a flawless, mirror-like finish.",
    features: ["Multi-Stage Polishing", "Scratch Removal", "Swirl Mark Reduction", "Gloss Enhancement"]
  },
  {
    title: "Ceramic Coating",
    price: "899",
    desc: "Years of protection against the elements with unmatched gloss and hydrophobic properties.",
    features: ["5-Year Protection", "Extreme Hydrophobics", "UV Damage Resistance", "Self-Cleaning Effect"]
  }
];

function Services() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="micro-label mb-4">Our Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl">
            Uncompromising <br/>
            <span className="italic text-white/70">Quality</span>
          </h2>
        </div>
        <p className="text-white/60 max-w-md font-light leading-relaxed">
          We treat every vehicle as if it were our own, using only the finest products and techniques to ensure a flawless result.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="group border border-white/10 p-8 md:p-10 hover:border-white/30 transition-colors bg-[#050505]">
            <h3 className="text-2xl font-serif mb-2">{service.title}</h3>
            <p className="text-white/50 text-sm mb-6 h-10">{service.desc}</p>
            
            <div className="mb-8">
              <span className="micro-label text-white/40">Starting at</span>
              <div className="text-3xl font-light mt-1">${service.price}</div>
            </div>

            <ul className="space-y-4 mb-10">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-sm text-white/70">
                  <Check size={16} className="text-[var(--color-ap-gold)] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Select Service
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookingWidget() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto text-center">
      <p className="micro-label mb-4">Instant Scheduling</p>
      <h2 className="text-4xl md:text-5xl mb-8">
        Book Your <span className="italic text-white/70">Appointment</span>
      </h2>
      <p className="text-white/60 mb-12 font-light">
        Select your service, choose a time that works for you, and we'll handle the rest. No hidden fees, no surprises.
      </p>

      {/* Mock Widget Container */}
      <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-ap-gold)] to-transparent opacity-50" />
        
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
          <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full">
            <Calendar className="text-[var(--color-ap-gold)]" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-serif">Schedule Service</h3>
            <p className="text-sm text-white/50 mt-1">Powered by Square</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="micro-label block mb-3">1. Select Service</label>
            <select className="w-full bg-black border border-white/20 text-white p-4 outline-none focus:border-[var(--color-ap-gold)] transition-colors appearance-none rounded-none">
              <option>Signature Detail - $199</option>
              <option>Paint Correction - $499</option>
              <option>Ceramic Coating - $899</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="micro-label block mb-3">2. Date</label>
              <input type="date" className="w-full bg-black border border-white/20 text-white p-4 outline-none focus:border-[var(--color-ap-gold)] transition-colors rounded-none [color-scheme:dark]" />
            </div>
            <div>
              <label className="micro-label block mb-3">3. Time</label>
              <select className="w-full bg-black border border-white/20 text-white p-4 outline-none focus:border-[var(--color-ap-gold)] transition-colors appearance-none rounded-none">
                <option>09:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
              </select>
            </div>
          </div>

          <button className="btn-primary w-full mt-4 justify-between group">
            <span>Confirm Booking</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="micro-label mb-4">The Results</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl">
            Flawless <span className="italic text-white/70">Execution</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="aspect-[4/5] md:aspect-square relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=1000" 
              alt="Detailing result" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="grid grid-rows-2 gap-4 md:gap-6">
            <div className="relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=1000" 
                alt="Detailing result" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80&w=1000" 
                alt="Detailing result" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-24 md:pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-serif mb-6">Austin Auto Spa</h2>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">
            Elevating automotive care through meticulous attention to detail, premium products, and an unwavering commitment to perfection.
          </p>
        </div>
        
        <div>
          <h3 className="micro-label mb-6">Contact</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[var(--color-ap-gold)]" />
              (512) 555-0199
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--color-ap-gold)] shrink-0 mt-0.5" />
              <span>123 Detailer Way<br/>Austin, TX 78701</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="micro-label mb-6">Hours</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-center justify-between">
              <span>Mon - Fri</span>
              <span>8am - 6pm</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Saturday</span>
              <span>9am - 4pm</span>
            </li>
            <li className="flex items-center justify-between text-white/40">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Austin Auto Spa. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 p-4 md:hidden z-50 flex gap-3">
      <button className="btn-primary flex-1 py-3 text-xs h-12">
        Get a Free Quote
      </button>
      <button className="btn-secondary flex-none px-4 py-3 h-12 border-white/20">
        <Phone size={18} />
      </button>
    </div>
  );
}
