"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { pointsData } from "@/app/context/data";

export default function Home() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const { scrollY } = useScroll();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setScrollDirection("down");
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection("up");
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transform values for scroll-based animations
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const textY = useTransform(scrollY, [0, 300], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const pointsY = useTransform(scrollY, [300, 600], [100, 0]);
  const pointsOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* hero section */}
      <section className="relative w-full h-screen overflow-hidden">
        <motion.img 
          src="/images/bg-sec.png" 
          alt="background" 
          className="w-full h-full object-cover"
          style={{ opacity: heroOpacity, scale: heroScale }}
        />
        
        {/* CO2 Badge */}
        <motion.div 
          className="absolute top-1/2 left-1/4 sm:left-1/3 md:left-1/3 -translate-y-1/2 sm:-translate-y-[12rem] md:-translate-y-[16rem] -translate-x-1/2 sm:-translate-x-0 z-10"
          animate={{ 
            y: [0, -15, 0], 
            x: [0, 15, 0],
            opacity: scrollDirection === "down" ? 1 : 0
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="co2 flex flex-col border border-white/20 rounded-full bg-green-500/20 backdrop-blur-md text-white text-center items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <span className="font-bold text-xs sm:text-sm">-CO2</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Hero Text Section */}
      <motion.div 
        className="flex flex-col items-center justify-center text-center w-full absolute top-1/4 sm:top-1/3 px-4 sm:px-6 md:px-8 z-20"
        style={{ y: textY, opacity: textOpacity }}
        animate={{ 
          opacity: scrollDirection === "down" ? undefined : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.h1 
          className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[16rem] font-bold bg-gradient-to-b from-white via-white/90 to-white/20 bg-clip-text text-transparent leading-[1.1] sm:leading-none select-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: scrollDirection === "down" ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          RENAISSANCE
        </motion.h1>
        
        {/* Plant Image */}
        <motion.img 
          src="/images/plant.png" 
          alt="plant" 
          className="w-40 sm:w-56 md:w-72 lg:w-96 xl:w-[20rem] absolute translate-y-[-3rem] sm:translate-y-[-6rem] md:translate-y-[-9rem] lg:translate-y-[-11rem] xl:translate-y-[-13.1rem] translate-x-[-0.5rem] sm:translate-x-[-0.8rem] md:translate-x-[-1rem] xl:translate-x-[-1.1rem] pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: scrollDirection === "down" ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold translate-y-[-1.5rem] sm:translate-y-[-1.8rem] md:translate-y-[-2rem] px-4 sm:px-6 text-white/90 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: scrollDirection === "down" ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          De chaque petite graine naît une nouvelle vie.
        </motion.p>
      </motion.div>

      {/* Points Section */}
      <motion.section 
        className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"
        style={{ y: pointsY, opacity: pointsOpacity }}
        animate={{ 
          opacity: scrollDirection === "down" ? undefined : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center text-center w-full px-4 sm:px-6 md:px-8 py-20">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Points
          </motion.h2>
          
          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full mt-12">
            {pointsData.map((point, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {point.titre}
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  {point.disc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
