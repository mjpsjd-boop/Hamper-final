import React from 'react';
import { ArrowRight, Sparkles, Instagram } from 'lucide-react';
import { PHONE_NUMBER } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onPlanClick: () => void;
}

export default function Hero({ onPlanClick }: HeroProps) {
  const handleDirectIG = () => {
    const text = "Hi HAMPERS_4_YOU! I am visiting your portfolio website and would love to inquire about starting a customized order for my upcoming celebration.";
    navigator.clipboard.writeText(text).then(() => {
      alert("Consultation greeting prompt copied to clipboard! Opening Instagram DM window for your live creative session.");
    });
    window.open("https://ig.me/m/hampers_4_you_by_tasdiqa", '_blank');
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[95vh] pt-32 pb-20 flex items-center overflow-hidden bg-gradient-to-b from-[#F7F3EC] to-[#FAF8F5]"
    >
      {/* Visual background details (Subtle line patterns and marble overlays, no low-quality telemetry clutter) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#AF9467_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
        {/* Left Content Side */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            id="hero-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 border border-[#DECCB2]/60 bg-[#FAF8F5]/80 rounded-full"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#AF9467]" />
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#AF9467]">
              Artisanal Luxury Handcrafted Gifting
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-serif leading-[1.1] text-[#24211E] tracking-tight font-medium"
          >
            Turning Sacred <span className="italic text-[#AF9467]">Celebrations</span> Into Masterpieces
          </motion.h1>

          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-[#544F49] font-sans font-light leading-relaxed max-w-xl"
          >
            We bring your exact creative vision to life. At <span className="font-semibold text-[#24211E]">HAMPERS_4_YOU</span>, we craft customized luxury hampers, bespoke ceremony ring platters, and illuminated Nikah certificates with uncompromising devotion to detail.
          </motion.p>

          <motion.div
            id="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
          >
            <button
              id="hero-primary-cta"
              onClick={onPlanClick}
              className="w-full sm:w-auto px-8 py-4 bg-[#2D2A26] hover:bg-[#AF9467] text-white text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <span>Build Custom Concept</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="hero-secondary-cta"
              onClick={handleDirectIG}
              className="w-full sm:w-auto px-8 py-4 border border-[#AF9467]/50 hover:bg-[#AF9467]/5 text-[#544F49] text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Instagram className="h-3.5 w-3.5 text-[#AF9467]" />
              <span>Inquire via Instagram DM</span>
            </button>
          </motion.div>

          {/* Quick Stats Plaque (No tech larp status indicators, only clean brand highlights) */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#EADFC9]/50 w-full max-w-lg" id="hero-quick-highlights">
            <div>
              <p className="font-serif text-2xl font-bold text-[#2D2A26]">100%</p>
              <p className="text-[10px] font-sans tracking-widest uppercase text-[#8C8377] mt-1">Bespoke Tailored</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#2D2A26]">Pure Silk</p>
              <p className="text-[10px] font-sans tracking-widest uppercase text-[#8C8377] mt-1">& Heavy Velvet</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#2D2A26]">Custom</p>
              <p className="text-[10px] font-sans tracking-widest uppercase text-[#8C8377] mt-1">Calligraphy Script</p>
            </div>
          </div>
        </div>

        {/* Right Collage Side - Expanded to 4 beautifully positioned, overlapping, and twisted catalogue cards */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex justify-center items-center h-[520px] w-full" id="hero-images-container">
          
          {/* Card 1: Luxury Hamper Gifting Chest (Top Left) */}
          <motion.div
            id="hero-bg-card-1"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute top-2 left-2 sm:left-4 w-[200px] h-[250px] sm:w-[230px] sm:h-[290px] bg-white p-2.5 rounded shadow-xl border border-[#EADFC9]/40 z-10 hover:z-50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-full h-[81%] overflow-hidden rounded-sm bg-[#FAF8F5]">
              <img
                src="/src/assets/images/luxury_hamper.jpg"
                alt="Luxury Customized Hamper Chest"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pt-1.5 text-center">
              <p className="font-serif text-[10px] italic text-[#544F49] truncate">The Gifting Chest</p>
            </div>
          </motion.div>

          {/* Card 2: Premium Nikah Certificate (Top Right) */}
          <motion.div
            id="hero-bg-card-3"
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.15 }}
            className="absolute top-12 right-2 sm:right-6 w-[180px] h-[230px] sm:w-[210px] sm:h-[265px] bg-white p-2.5 rounded shadow-lg border border-[#DECCB2]/30 z-20 hover:z-50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-full h-[80%] overflow-hidden rounded-sm bg-[#FAF8F5]">
              <img
                src="/src/assets/images/nikah_certificate.jpg"
                alt="Bespoke Illuminated Nikah Deed"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pt-1.5 text-center">
              <p className="font-serif text-[10px] italic text-[#544F49] truncate">Illuminated Nikah Deed</p>
            </div>
          </motion.div>

          {/* Card 3: Bespoke Ceremonial Ring Platter (Bottom Right) */}
          <motion.div
            id="hero-bg-card-2"
            initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-2 right-4 sm:right-8 w-[190px] h-[240px] sm:w-[215px] sm:h-[275px] bg-white p-2.5 rounded shadow-2xl border border-[#DECCB2]/50 z-30 hover:z-50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-full h-[81%] overflow-hidden rounded-sm bg-[#FAF8F5]">
              <img
                src="/src/assets/images/ring_platter.jpg"
                alt="Bespoke Ceremonial Ring Platter"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pt-1.5 text-center">
              <p className="font-serif text-[10px] italic text-[#544F49] truncate">Traditional Ivory Ring Platter</p>
            </div>
          </motion.div>

          {/* Card 4: Authentic Sealing Wax & Stamps (Bottom Left - Twisted in a Catalogue Manner) */}
          <motion.div
            id="hero-bg-card-4"
            initial={{ opacity: 0, scale: 0.95, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1.05, delay: 0.2 }}
            className="absolute bottom-2 left-2 sm:left-4 w-[185px] h-[230px] sm:w-[210px] sm:h-[265px] bg-white p-2.5 rounded shadow-2xl border border-[#DECCB2]/40 z-25 hover:z-50 transition-all duration-300 hover:scale-105"
          >
            <div className="w-full h-[80%] overflow-hidden rounded-sm bg-[#FAF8F5]">
              <img
                src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop"
                alt="Atelier Sealing Wax and Matrices"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pt-1.5 text-center">
              <p className="font-serif text-[10px] italic text-[#544F49] truncate">Authentic Sealing Wax</p>
            </div>
          </motion.div>

          {/* Golden signature ribbon scroll banner floating slightly */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#AF9467] text-white px-4 py-2 font-display text-xs italic rounded-sm shadow-lg z-40 rotate-[-8deg] hidden sm:block pointer-events-none">
            "Every ribbon knotted with love"
          </div>
        </div>
      </div>
    </section>
  );
}
