/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Heart, Stars, Music2, Volume2, VolumeX, Sparkles, ArrowDown } from "lucide-react";

// --- Components ---

const StarField = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
};

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const Section = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className={`min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 ${className}`}
  >
    {children}
  </motion.section>
);

// --- Main App ---

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [showHearts, setShowHearts] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Background transition logic: Dark -> Sunrise -> Soft Pink
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#0a050d", "#1a0b2e", "#3a155c", "#1e0b12"] 
  );

  const bgOverlay = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["transparent", "rgba(58, 21, 92, 0.2)", "rgba(255, 122, 92, 0.15)"]
  );

  const handleHeartPress = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 5000);
  };

  return (
    <div className="relative min-h-screen font-sans">
      {/* Background Layer */}
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="fixed inset-0 z-0 transition-colors duration-1000 bg-noise pointer-events-none"
      />
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="fixed inset-0 z-0"
      />
      <motion.div 
        style={{ background: bgOverlay }}
        className="fixed inset-0 z-[1] pointer-events-none"
      />
      
      {/* Decorative Atmosphere Orbs */}
      <div className="fixed top-10 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-[60px] pointer-events-none z-0" />

      <StarField />

      {/* Floating Hearts Emitter */}
      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: [1, 1.5, 0],
                  x: (Math.random() - 0.5) * 800,
                  y: (Math.random() - 0.5) * -1000 - 200,
                  opacity: [1, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute"
              >
                <Heart 
                  className="text-pink-500 fill-pink-500" 
                  size={Math.random() * 40 + 20} 
                  strokeWidth={1}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card-heavy p-8 max-w-sm text-center shadow-pink-500/10"
            >
              <h2 className="font-serif text-3xl mb-4 text-pink-300 uppercase tracking-widest text-glow-rose">
                I knew it!
              </h2>
              <p className="text-white/80 font-light leading-relaxed">
                You could never stay mad at me forever 💕<br/>
                And I promise—I’ll be better, not just say it.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Controls */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all text-white/60 hover:text-white"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* --- CONTENT --- */}

      {/* 1. HERO */}
      <Section className="px-10">
        <div className="max-w-2xl space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-8 font-semibold">The Opening</p>
            <Stars className="text-white/20" size={48} />
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="font-serif text-3xl md:text-4xl italic text-white/90 leading-tight"
            >
              “Out of 8 billion people… I still managed to mess things up with my favorite one.”
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 3.5 }}
              className="font-light text-white/40 tracking-[0.5em] uppercase text-xs"
            >
              So I made this… just for you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 5 }}
            className="pt-8"
          >
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="group relative px-10 py-4 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/30 backdrop-blur-md" />
              <span className="relative z-10 flex items-center gap-3 text-white tracking-[0.2em] text-xs font-bold uppercase drop-shadow-md">
                ENTER MY HEART <Heart size={14} className="group-hover:fill-white transition-all" />
              </span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ArrowDown size={24} />
        </motion.div>
      </Section>

      {/* 2. WHEN YOU'RE NOT OKAY */}
      <Section className="bg-gradient-to-t from-transparent via-transparent to-transparent">
        <div className="max-w-xl space-y-8 glass-card p-10 md:p-16">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-400 font-semibold mb-4">The Vulnerability</p>
          <FloatingElement delay={0.2}>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-glow leading-tight">
              When You're Not Okay...
            </h2>
          </FloatingElement>
          <div className="space-y-6">
            <p className="text-lg text-gray-200 font-medium leading-relaxed">
              Your silence feels heavy, like a song with the melody missing. Things don’t feel right when there’s a cloud between us.
            </p>
            <div className="h-px w-12 bg-white/20 mx-auto"></div>
            <p className="text-base text-gray-400 italic">
              "Every hour we don't talk feels like a piece of the world is missing. Nothing feels right when you're upset, and I can't stand knowing I'm the reason that smile isn't there today."
            </p>
          </div>
        </div>
      </Section>

      {/* 3. THE PART WHERE I MESSED UP */}
      <Section>
        <div className="max-w-2xl text-left glass-card p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Heart size={140} className="text-pink-500" />
          </div>
          <div className="space-y-6 relative z-10">
            <span className="text-purple-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">THE APOLOGY</span>
            <h2 className="font-serif text-4xl md:text-5xl border-l-2 border-pink-500 pl-6 mb-8 text-white">
              The Part Where <br/><span className="text-pink-100/90">I Messed Up</span>
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p className="text-gray-200">
                I’m not just sorry for what I did… I’m sorry that it hurt you. That's the part that hurts me the most.
              </p>
              <p>
                I lost sight of what matters, and I allowed my own stuff to cloud how I treated you. You deserved patience, you deserved kindness, and you deserved better than my mistakes.
              </p>
              <p className="font-serif italic text-xl text-pink-300/70 pt-4 leading-tight">
                And that matters more than anything.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Centerpiece Layout Break */}
      <Section>
        <div className="relative flex flex-col items-center">
            {/* Decorative Rings from Design */}
            <div className="absolute -inset-12 border border-pink-500/20 rounded-full animate-pulse pointer-events-none"></div>
            <div className="absolute -inset-24 border border-purple-500/10 rounded-full pointer-events-none"></div>

            <h1 className="text-[80px] md:text-[140px] font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-pink-300 drop-shadow-2xl">
              Always<br/><span className="italic ml-8 md:ml-20">You.</span>
            </h1>
            
            <div className="mt-12 px-8 text-center">
                <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-8">You are irreplaceable</p>
                <div className="space-y-4 text-sm font-medium tracking-wide text-white/70">
                    <p>Your smile &gt; everything</p>
                    <p>Normal days feel special with you</p>
                    <p>It’s you. Still you. Always you.</p>
                </div>
            </div>
        </div>
      </Section>

      {/* 4. HUMOR / MOOD LIFT */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="space-y-8 flex flex-col justify-center text-left">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-300 mb-2 font-bold">The Reality Check</p>
              <h2 className="font-serif text-4xl text-glow leading-tight">
                Because You Look Better Smiling
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { text: "I know I’m annoying… but I’m YOUR annoying 😌", emoji: "✨", color: "bg-amber-500/10 border-amber-500/20" },
                { text: "Being mad at me doesn’t suit you… you’re too cute for that", emoji: "🥺", color: "bg-pink-500/10 border-pink-500/20" },
                { text: "Let’s be honest… you miss me a little 🤭", emoji: "💕", color: "bg-purple-500/10 border-purple-500/20" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className={`${item.color} border p-5 rounded-2xl flex items-center gap-4 group cursor-default transition-all`}
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                    {item.emoji}
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <motion.div 
               animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5 bg-gradient-to-br from-amber-500/10 to-pink-500/10 flex items-center justify-center relative overflow-hidden"
            >
              <Sparkles className="absolute text-white/10 top-10 right-10" size={40} />
              <Heart className="text-white/20 fill-white/5" size={100} strokeWidth={0.5} />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 5. INTERACTIVE MOMENT */}
      <Section>
        <div className="glass-card-heavy p-10 md:p-16 max-w-lg w-full flex flex-col items-center text-center shadow-pink-500/20">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-pink-400 mb-4 tracking-[0.3em] uppercase">ONE LAST THING</p>
            <p className="text-base text-gray-300 font-medium">If there is even a tiny soft corner left in there...</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHeartPress}
            className="w-full py-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold tracking-wider shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all flex items-center justify-center gap-4 text-white uppercase text-xs"
          >
            Press for a Surprise 🥺
          </motion.button>
          
          <div className="flex gap-4 mt-10">
            <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
            <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
            <Heart className="w-5 h-5 text-pink-300" fill="currentColor" />
          </div>
        </div>
      </Section>

      {/* 6. FINAL SCENE */}
      <Section className="min-h-[120vh]">
        <div className="max-w-xl text-center space-y-12">
            <div className="space-y-6">
                <p className="font-serif text-2xl md:text-3xl text-gray-200 opacity-90 leading-relaxed italic">
                    “I don’t need perfect moments. I just need you… and one more chance to make you smile again.”
                </p>
            </div>
          
            <div className="mt-12 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20"></div>
                    <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-bold">End of Chapter 1</p>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>
                
                <footer className="opacity-10 mt-12">
                    <p className="text-[8px] tracking-[0.8em] uppercase">Forever</p>
                </footer>
            </div>
        </div>
      </Section>
    </div>
  );
}
