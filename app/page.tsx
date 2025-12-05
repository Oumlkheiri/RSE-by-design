"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const bubbles = [
  { top: "15%", left: "25%", delay: 0, duration: 4, xOffset: 10, yOffset: -20, content: "+O2", color: "green" },
  { top: "25%", left: "75%", delay: 1.5, duration: 5, xOffset: -15, yOffset: -10, content: "-CO2", color: "red" },
  { top: "60%", left: "80%", delay: 2, duration: 4.5, xOffset: -10, yOffset: 25, content: "-CO2", color: "red" },
  { top: "10%", left: "60%", delay: 1, duration: 5.5, xOffset: 15, yOffset: -15, content: "+O2", color: "green" },
  { top: "75%", left: "30%", delay: 2.5, duration: 4, xOffset: -20, yOffset: 10, content: "-CO2", color: "red" },
  { top: "35%", left: "10%", delay: 1.2, duration: 6.5, xOffset: 10, yOffset: -25, content: "-CO2", color: "red" },
  { top: "80%", left: "70%", delay: 0.8, duration: 5, xOffset: -25, yOffset: 20, content: "+O2", color: "green" },
];

const points = [
  {
    titre: "Réduire la consommation d’énergie",
    disc: "Éteindre les appareils quand ils ne sont pas utilisés limite l’impact écologique.",
    x: "60vw",
    y: "0vh",
    mobileX: "0",
    mobileY: "100vh",
  },
  {
    titre: "Réduire la consommation d’énergie",
    disc: "Éteindre les appareils quand ils ne sont pas utilisés limite l’impact écologique.",
    x: "10vw",
    y: "40vh",
    mobileX: "0",
    mobileY: "150vh",
  },
  {
    titre: "Réduire la consommation d’énergie",
    disc: "Éteindre les appareils quand ils ne sont pas utilisés limite l’impact écologique.",
    x: "60vw",
    y: "90vh",
    mobileX: "0",
    mobileY: "200vh",
  },
  {
    titre: "Réduire la consommation d’énergie",
    disc: "Éteindre les appareils quand ils ne sont pas utilisés limite l’impact écologique.",
    x: "10vw",
    y: "140vh",
    mobileX: "0",
    mobileY: "250vh",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#0d0905]/80 backdrop-blur-md z-50 flex justify-center items-center gap-4 py-4 px-4 sm:px-6 md:px-8">
        <Link href="/eco-man-game">
          <button className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
            Eco Man Game
          </button>
        </Link>
        <Link href="/recycle-game">
          <button className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
            Recycle Game
          </button>
        </Link>
        <Link href="/articles">
          <button className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
            Articles
          </button>
        </Link>
      </nav>
      <div className="min-h-[300vh] md:min-h-[300vh] bg-[#0d0905] overflow-x-hidden pt-16 sm:pt-20">
        {/* Hero section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-full h-screen overflow-hidden"
        >
          <img src="/images/bg-sec.png" alt="Background landscape" className="w-full h-full object-cover object-center" />

          {mounted &&
            bubbles.map((bubble, index) => (
              <div key={index} className="absolute hidden sm:block" style={{ top: bubble.top, left: bubble.left }}>
                <motion.div
                  animate={{
                    y: [0, bubble.yOffset, 0],
                    x: [0, bubble.xOffset, 0],
                  }}
                  transition={{
                    duration: bubble.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: bubble.delay,
                  }}
                  className={`flex flex-col border border-white/30 rounded-full bg-${bubble.color}-500/30 backdrop-blur-md text-white text-center items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]`}
                >
                  <span className="font-bold text-xs sm:text-sm">{bubble.content}</span>
                </motion.div>
              </div>
            ))}
        </motion.section>

        {/* Hero text and images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex flex-col items-center justify-center text-center w-full absolute top-1/4 sm:top-1/3 pointer-events-none px-4 sm:px-6 md:px-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[12rem] xl:text-[16rem] font-bold bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-tight">
            RENAISSANCE
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold translate-y-[-0.5rem] sm:translate-y-[-1rem] md:translate-y-[-1.5rem] lg:translate-y-[-2rem] max-w-xs sm:max-w-md md:max-w-none px-2">
            De chaque petite graine naît une nouvelle vie.
          </p>
          <img
            src="/images/racine.png"
            alt="Root illustration"
            className="w-[12rem] sm:w-[15rem] md:w-[18rem] lg:w-[20rem] absolute translate-y-[15rem] sm:translate-y-[20rem] md:translate-y-[60rem] lg:translate-y-[80rem] opacity-20 translate-x-[-0.5rem] sm:translate-x-[-1.1rem] blur-[1px]"
          />
        </motion.div>

        {/* Decorative images (adjusted positions to avoid off-screen issues) */}
        <div className="images absolute top-[100vh] left-0 w-full h-full z-10 hidden lg:block">
          <img
            src="/images/bottel1.png"
            alt="Bottle 1"
            width={100}
            height={100}
            className="translate-y-[10vh] translate-x-[10vw] rotate-12 opacity-50 blur-[1px]"
          />
          <img
            src="/images/bottel2.png"
            alt="Bottle 2"
            width={100}
            height={100}
            className="translate-y-[34vh] translate-x-[20vw] rotate-12 opacity-50 blur-[1px]"
          />
          <img
            src="/images/bottel3.png"
            alt="Bottle 3"
            width={100}
            height={100}
            className="translate-y-[70vh] translate-x-[10vw] rotate-19 opacity-50 blur-[1px]"
          />
          <img
            src="/images/bottel4.png"
            alt="Bottle 4"
            width={100}
            height={100}
            className="translate-y-[50vh] translate-x-[30vw] rotate-12 opacity-50 blur-[1px]"
          />
          <img
            src="/images/trush.png"
            alt="Trash illustration"
            width={100}
            height={100}
            className="translate-y-[90vh] translate-x-[40vw] rotate-12 opacity-50 blur-[1px]"
          />
        </div>

        {/* Cards section */}
        <div className="card absolute top-[60vh] sm:top-[70vh] left-0 w-full h-full z-10">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ staggerChildren: 0.03, delayChildren: 0.1 }}
              className="flex flex-col items-start justify-center absolute w-[90%] sm:w-[85%] md:w-[35%] lg:w-[30%] left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 ml-0 md:ml-[3rem] lg:ml-[5rem] px-4 sm:px-6 md:px-0"
              style={{
                transform: isMobile
                  ? `translate(${point.mobileX}, ${point.mobileY})`
                  : `translate(${point.x}, ${point.y})`,
              }}
            >
              <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-400 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-left">
                {point.titre.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: charIndex * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed text-left">
                {point.disc.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: charIndex * 0.01 + 0.5 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="absolute top-[350vh] sm:top-[380vh] md:top-[300vh] w-full py-12 sm:py-16 md:py-20 bg-black/50 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-green-400">Agissons Ensemble</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 px-2 sm:px-0">
              La protection de notre environnement commence par des gestes simples. Rejoignez le mouvement pour un avenir plus durable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 text-sm sm:text-base text-gray-400">
              <span>© 2024 RSE by Design</span>
              <span className="hidden sm:inline">|</span>
              <span>Contact</span>
              <span className="hidden sm:inline">|</span>
              <span>Mentions Légales</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
