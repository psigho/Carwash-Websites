import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, Star, Shield, ChevronRight, Check, MapPin, Clock, Droplets, Award, Sparkles, Quote, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   21st.dev-Inspired: IMMERSE TEXT COMPONENT
   Staggered blur-to-sharp character reveal effect
   ───────────────────────────────────────────── */
function ImmerseText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="immerse-char"
          style={{ animationDelay: `${delay + i * 0.04}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

/* 21st.dev-Inspired: SCROLL REVEAL HOOK */
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* 21st.dev-Inspired: PARALLAX HOOK */
function useParallax() {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const y = window.scrollY * 0.3;
        ref.current.style.transform = `translateY(${y}px) scale(1.1)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return ref;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ap-black)] text-[var(--color-ap-white)] selection:bg-white/20">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Hero />
      <TrustBar />
      <main id="main-content">
        <WhyUs />
        <Services />
        <Process />
        <Testimonials />
        <BookingWidget />
        <BeforeAfter />
        <ServiceArea />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO — Localized + Dual CTA + Urgency
   Schwartz Level 3 (Solution Aware): Prove unique mechanism
   Hopkins: Specifics > Generalities
   Competitor Pattern #1 (Localized), #2 (Dual CTA)
   ───────────────────────────────────────────── */
/* 21st.dev-Inspired: PARALLAX HERO BACKGROUND */
function HeroBackground() {
  const parallaxRef = useParallax();
  return (
    <img
      ref={parallaxRef}
      src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1920"
      alt="Black luxury sedan with a flawless ceramic coating finish"
      className="w-full h-full object-cover parallax-bg"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      width={1920}
      height={1080}
      style={{ transform: 'scale(1.1)' }}
    />
  );
}

function Hero() {
  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end pb-24 md:pb-32" aria-label="Hero banner">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="micro-label mb-4 text-[var(--color-ap-gold)] text-reveal">North Austin's Trusted Detail Shop</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 max-w-4xl font-serif">
            <ImmerseText text="Your Car Deserves" delay={0.5} /> <br />
            <span className="italic text-white/90"><ImmerseText text="Better Than a" delay={1.2} /></span> <br />
            <span className="shimmer-text"><ImmerseText text="Car Wash" delay={1.8} /></span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-8 font-light leading-relaxed">
            Ceramic coating, paint correction, and hand detailing that protects your investment for years — not days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md md:max-w-none">
            <button id="cta-hero-quote" className="btn-primary btn-pulse w-full sm:w-auto h-14">
              Get Your Free Quote
            </button>
            <a
              href="tel:+15125550199"
              id="cta-hero-call"
              className="btn-secondary w-full sm:w-auto h-14 gap-2"
              aria-label="Call Austin Auto Spa at (512) 555-0199"
            >
              <Phone size={16} aria-hidden="true" />
              (512) 555-0199
            </a>
          </div>

          <p className="mt-6 text-white/40 text-sm tracking-wide">
            <Clock size={14} className="inline mr-2 -mt-0.5" aria-hidden="true" />
            Same-week availability · Free estimates · No upsell pressure
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRUST BAR — Immediate credibility
   Competitor Pattern #3 (Trust Signals)
   Hopkins: Specifics ("115+ Reviews" not "Many Reviews")
   ───────────────────────────────────────────── */
function TrustBar() {
  return (
    <section id="trust-bar" className="border-b border-white/10 bg-[#0a0a0a]" aria-label="Trust indicators">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm tracking-wide">
          <div className="flex items-center gap-3">
            <div className="flex text-[var(--color-ap-gold)]" aria-hidden="true">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-medium">5.0 on Google</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" aria-hidden="true" />
          <div className="flex items-center gap-2 text-white/80">
            <span className="font-medium text-white">115+</span> Verified Reviews
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" aria-hidden="true" />
          <div className="flex items-center gap-2 text-white/80">
            <Shield size={16} className="text-[var(--color-ap-gold)]" aria-hidden="true" />
            Licensed & Insured
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" aria-hidden="true" />
          <div className="flex items-center gap-2 text-white/80">
            Family-Owned Since 2019
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHY US — Objection handling + differentiation
   Competitor Pattern #4 (Niche Targeting), #5 (Authentic Process)
   Copywriting Skill: Benefits Over Features
   Humanizer: Bar Stool Test
   ───────────────────────────────────────────── */
const reasons = [
  {
    icon: Award,
    title: "IDA-Certified Detailers",
    desc: "Every technician is International Detailing Association certified. We train 40+ hours before touching your car."
  },
  {
    icon: Droplets,
    title: "Products You Can Trust",
    desc: "Gtechniq and Gyeon coatings only — the same brands used by dealerships on six-figure cars. No cheap shortcuts."
  },
  {
    icon: Shield,
    title: "Results Guaranteed",
    desc: "Not happy? We'll redo it, free. Our ceramic coatings include a written 5-year warranty with every application."
  }
];

function WhyUs() {
  return (
    <section id="why-us" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" aria-label="Why choose us">
      <div className="mb-16 md:mb-20 max-w-2xl">
        <p className="micro-label mb-4">Why Austin Chooses Us</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
          Not All Detailers <br />
          <span className="italic text-white/70">Are Created Equal</span>
        </h2>
        <p className="text-white/50 font-light leading-relaxed">
          Most shops spray your car with a hose and call it "detailing." We spend 6–8 hours per vehicle because that's what a real correction takes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="border border-white/10 p-8 md:p-10 bg-[#050505] hover:border-white/20 transition-colors duration-200 glow-card"
          >
            <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full mb-6" aria-hidden="true">
              <reason.icon size={22} className="text-[var(--color-ap-gold)]" />
            </div>
            <h3 className="text-xl font-serif mb-3">{reason.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES — Transparent Pricing + Most Popular badge
   Competitor Pattern #6 (Transparent Pricing)
   Copywriting Skill: One Idea Per Section, Specificity
   Hopkins: "$499" > "Contact for pricing"
   ───────────────────────────────────────────── */
const services = [
  {
    id: "signature-detail",
    title: "Signature Detail",
    price: "199",
    popular: false,
    desc: "A full interior and exterior reset. Your car looks like you just drove it off the lot.",
    features: ["Hand Wash & Dry", "Clay Bar Treatment", "Interior Deep Clean", "Leather Conditioning"],
    time: "3–4 hours"
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    price: "499",
    popular: false,
    desc: "We remove the swirls and scratches that make your paint look dull — even under direct sunlight.",
    features: ["Multi-Stage Machine Polish", "Scratch & Swirl Removal", "Gloss Measurement Before/After", "Paint Depth Readings"],
    time: "6–8 hours"
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    price: "899",
    popular: true,
    desc: "The last coating your car will ever need. 5 years of hydrophobic, UV-resistant, self-cleaning protection.",
    features: ["Gtechniq Crystal Serum", "5-Year Written Warranty", "Extreme Hydrophobics", "UV & Chemical Resistance"],
    time: "1–2 days"
  }
];

function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" aria-label="Services and pricing">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="micro-label mb-4">Packages & Pricing</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
            Honest Pricing, <br />
            <span className="italic text-white/70">No Surprises</span>
          </h2>
        </div>
        <p className="text-white/60 max-w-md font-light leading-relaxed">
          Every price is final. No hidden fees, no upsells at the door. Pick your service and we'll take it from there.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            id={`service-${service.id}`}
            className={`service-card group border p-8 md:p-10 transition-colors duration-200 bg-[#050505] relative glow-card ${service.popular
              ? 'border-[var(--color-ap-gold)]/40 hover:border-[var(--color-ap-gold)]/70'
              : 'border-white/10 hover:border-white/30'
              }`}
            tabIndex={0}
            role="article"
            aria-label={`${service.title} service starting at $${service.price}`}
          >
            {service.popular && (
              <div className="absolute -top-3 left-8 bg-[var(--color-ap-gold)] text-black text-xs font-bold uppercase tracking-widest px-4 py-1">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-serif mb-2">{service.title}</h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">{service.desc}</p>

            <div className="mb-2">
              <span className="micro-label text-white/40">Starting at</span>
              <div className="text-3xl font-light mt-1">${service.price}</div>
            </div>
            <p className="text-white/30 text-xs mb-8">
              <Clock size={12} className="inline mr-1 -mt-0.5" aria-hidden="true" />
              {service.time}
            </p>

            <ul className="space-y-4 mb-10" aria-label={`${service.title} features`}>
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-sm text-white/70">
                  <Check size={16} className="text-[var(--color-ap-gold)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              id={`select-${service.id}`}
              className={`w-full py-4 text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer ${service.popular
                ? 'bg-[var(--color-ap-gold)] text-black font-bold hover:bg-[var(--color-ap-gold)]/90'
                : 'border border-white/20 hover:bg-white hover:text-black'
                }`}
            >
              {service.popular ? 'Book This Package' : 'Select Service'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROCESS — "How It Works" 3-step flow
   Copywriting Skill: How It Works section (reduce perceived complexity)
   Competitor Pattern #7 (Online Booking Integration — show the path)
   ───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Inspect",
    desc: "We measure paint depth, photograph every panel, and walk you through exactly what your car needs. No guesswork."
  },
  {
    num: "02",
    title: "Transform",
    desc: "Multi-stage machine polish, clay bar, and correction under halogen inspection lights. Every inch, every angle."
  },
  {
    num: "03",
    title: "Protect",
    desc: "Ceramic coating cures for 24 hours in our climate-controlled bay. You pick up a car that repels water, dirt, and UV."
  }
];

function Process() {
  return (
    <section id="process" className="py-24 bg-[#0a0a0a]" aria-label="Our process">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <p className="micro-label mb-4">How It Works</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Three Steps to <br />
            <span className="italic text-white/70">Showroom Finish</span>
          </h2>
          <p className="text-white/50 font-light leading-relaxed">
            Drop your car off in the morning. Pick it up looking better than the day you bought it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="text-center md:text-left"
            >
              <div className="text-5xl md:text-6xl font-serif text-white/10 mb-4">{step.num}</div>
              <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS — Real customer voice
   Copywriting Skill: Social Proof (Detailed) — name, role, specific result
   Competitor Pattern #3 (Trust Signals)
   Humanizer: Use customer language, not brand language
   ───────────────────────────────────────────── */
const testimonials = [
  {
    quote: "I brought in my Model 3 with swirl marks all over the hood. They spent seven hours on it and I couldn't find a single scratch under direct sun. Worth every dollar.",
    name: "Marcus J.",
    service: "Paint Correction",
    rating: 5
  },
  {
    quote: "Two years after the ceramic coating and the water still beads off like it did on day one. I just rinse it with a hose and it's clean. Haven't been to a car wash since.",
    name: "Sarah T.",
    service: "Ceramic Coating",
    rating: 5
  },
  {
    quote: "They sent me photos of every step — before the clay bar, after the polish, during the coating cure. First shop that ever showed me what I'm paying for.",
    name: "David R.",
    service: "Signature Detail",
    rating: 5
  }
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" aria-label="Customer reviews">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <p className="micro-label mb-4">What Our Customers Say</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
          Don't Take <span className="italic text-white/70">Our Word</span> for It
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="border border-white/10 p-8 md:p-10 bg-[#050505] flex flex-col glow-card"
          >
            <div className="flex text-[var(--color-ap-gold)] mb-6" aria-label={`${t.rating} out of 5 stars`}>
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <Quote size={20} className="text-white/10 mb-4" aria-hidden="true" />
            <p className="text-white/70 text-sm leading-relaxed flex-1 mb-8">{t.quote}</p>
            <div className="border-t border-white/10 pt-6">
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-white/40 text-xs mt-1">{t.service}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOOKING WIDGET — Same as before, proven to convert
   Competitor Pattern #7 (Online Booking Integration)
   ───────────────────────────────────────────── */
function BookingWidget() {
  return (
    <section id="booking" className="py-24 px-6 md:px-12 max-w-3xl mx-auto text-center" aria-label="Book an appointment">
      <p className="micro-label mb-4">Ready When You Are</p>
      <h2 className="text-4xl md:text-5xl font-serif mb-4">
        Book in <span className="italic text-white/70">60 Seconds</span>
      </h2>
      <p className="text-white/50 mb-12 font-light max-w-lg mx-auto">
        Pick your service, choose a date, done. No phone tag, no back-and-forth emails.
      </p>

      <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-ap-gold)] to-transparent opacity-50" aria-hidden="true" />

        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
          <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full" aria-hidden="true">
            <Calendar className="text-[var(--color-ap-gold)]" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-serif">Schedule Service</h3>
            <p className="text-sm text-white/50 mt-1">Powered by Square</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="booking-service" className="micro-label block mb-3">1. Select Service</label>
            <select id="booking-service" className="w-full bg-black border border-white/20 text-white p-4 outline-none focus:border-[var(--color-ap-gold)] transition-colors duration-200 appearance-none rounded-none cursor-pointer">
              <option>Signature Detail — $199</option>
              <option>Paint Correction — $499</option>
              <option>Ceramic Coating — $899</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-date" className="micro-label block mb-3">2. Date</label>
              <input id="booking-date" type="date" className="w-full bg-black border border-white/20 text-white p-4 outline-none focus:border-[var(--color-ap-gold)] transition-colors duration-200 rounded-none [color-scheme:dark] cursor-pointer" />
            </div>
            <div>
              <label htmlFor="booking-time" className="micro-label block mb-3">3. Time</label>
              <select id="booking-time" className="w-full bg-black border border-white/20 text-white p-4 outline-none focus:border-[var(--color-ap-gold)] transition-colors duration-200 appearance-none rounded-none cursor-pointer">
                <option>09:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
              </select>
            </div>
          </div>

          <button id="cta-confirm-booking" type="submit" className="btn-primary w-full mt-4 justify-between group">
            <span>Confirm My Booking</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </button>

          <p className="text-white/30 text-xs text-center">
            Free cancellation up to 24 hours before your appointment
          </p>
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BEFORE/AFTER GALLERY — Result-focused with labels
   Competitor Pattern #10 (Result Focus — the shine, not the foam)
   Copywriting Skill: Before/After comparison format
   ───────────────────────────────────────────── */
const transformations = [
  {
    before: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80&w=1000",
    after: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=1000",
    service: "Ceramic Coating",
    beforeAlt: "Dull faded car paint before ceramic coating treatment",
    afterAlt: "Mirror-finish ceramic coating on a dark luxury vehicle"
  },
  {
    before: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1000",
    after: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=1000",
    service: "Paint Correction",
    beforeAlt: "Scratched car surface showing swirl marks under light",
    afterAlt: "Paint correction result showing swirl-free metallic paint"
  }
];

function BeforeAfter() {
  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a]" aria-label="Before and after results">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="micro-label mb-4">The Proof</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            See the <span className="italic text-white/70">Difference</span>
          </h2>
          <p className="text-white/50 font-light">
            Every car tells a story. Here's what happens when we rewrite it.
          </p>
        </div>

        <div className="space-y-8">
          {transformations.map((t, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Before */}
              <div className="relative overflow-hidden group aspect-[16/10]">
                <img
                  src={t.before}
                  alt={t.beforeAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1000}
                  height={625}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" aria-hidden="true" />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest px-4 py-2 border border-white/20">
                  Before
                </div>
              </div>
              {/* After */}
              <div className="relative overflow-hidden group aspect-[16/10]">
                <img
                  src={t.after}
                  alt={t.afterAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1000}
                  height={625}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" aria-hidden="true" />
                <div className="absolute top-4 left-4 bg-[var(--color-ap-gold)] text-black text-xs font-bold uppercase tracking-widest px-4 py-2">
                  After
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-xs px-4 py-2 border border-white/10">
                  {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button id="cta-view-gallery" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer group">
            View Full Gallery
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICE AREA — Local SEO + neighborhood targeting
   Competitor Pattern #1 (Localized Hero Headers)
   Copywriting Skill: "Built For" section — help visitors self-identify
   ───────────────────────────────────────────── */
const areas = [
  "North Austin", "Downtown", "Round Rock", "Cedar Park",
  "Pflugerville", "Georgetown", "Lakeway", "Bee Cave",
  "Westlake Hills", "Dripping Springs", "Kyle", "Buda"
];

function ServiceArea() {
  return (
    <section id="service-area" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" aria-label="Service area">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <p className="micro-label mb-4">Service Area</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Serving Austin & <br />
            <span className="italic text-white/70">Surrounding Areas</span>
          </h2>
          <p className="text-white/50 font-light leading-relaxed mb-8">
            Based in North Austin with mobile service available within 30 miles. We come to you — your driveway, your office parking lot, wherever your car is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button id="cta-area-quote" className="btn-primary h-12">
              Check If We Service Your Area
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="border border-white/10 px-4 py-3 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors duration-200 text-center"
            >
              <MapPin size={12} className="inline mr-1 -mt-0.5 text-[var(--color-ap-gold)]" aria-hidden="true" />
              {area}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-black pt-20 pb-24 md:pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-serif mb-6">Austin Auto Spa</h2>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-6">
            Family-owned since 2019. IDA-certified. Every car gets the same attention — whether it's a daily driver or a weekend exotic.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Shield size={14} className="text-[var(--color-ap-gold)]" aria-hidden="true" />
            5-Year Ceramic Coating Warranty
          </div>
        </div>

        <div>
          <h3 className="micro-label mb-6">Contact</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li>
              <a href="tel:+15125550199" className="flex items-center gap-3 hover:text-white transition-colors duration-200 cursor-pointer" aria-label="Call us at (512) 555-0199">
                <Phone size={16} className="text-[var(--color-ap-gold)]" aria-hidden="true" />
                (512) 555-0199
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--color-ap-gold)] shrink-0 mt-0.5" aria-hidden="true" />
              <address className="not-italic">123 Detailer Way<br />Austin, TX 78701</address>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="micro-label mb-6">Hours</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-center justify-between">
              <span>Mon – Fri</span>
              <span>8am – 6pm</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Saturday</span>
              <span>9am – 4pm</span>
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
        <nav aria-label="Legal links">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   STICKY MOBILE CTA
   Competitor Pattern #8 (Mobile-First)
   Copywriting Skill: Strong CTA — "Get [Specific Thing]"
   ───────────────────────────────────────────── */
function StickyMobileCTA() {
  return (
    <div id="mobile-cta" className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 p-4 md:hidden z-50 flex gap-3" role="complementary" aria-label="Quick actions">
      <button id="cta-mobile-quote" className="btn-primary flex-1 py-3 text-xs h-12">
        Get Your Free Quote
      </button>
      <a
        href="tel:+15125550199"
        id="cta-mobile-call"
        className="btn-secondary flex-none px-4 py-3 h-12 border-white/20"
        aria-label="Call Austin Auto Spa"
      >
        <Phone size={18} aria-hidden="true" />
      </a>
    </div>
  );
}
