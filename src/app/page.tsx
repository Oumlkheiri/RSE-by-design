"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="absolute top-0 left-0 w-full h-screen">
        <img src="/images/bg-sec.png" alt="background" className="w-full h-full object-cover" />
        <div className="absolute top-1/2 left-1/3 -translate-y-[16rem] -translate-x-[0rem]">
          <motion.div 
            animate={{ y: [0, -15, 0] , x: [0, 15, 0] }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="co2 flex flex-col border border-white/20 rounded-full bg-green-500/20 backdrop-blur-md text-white text-center items-center justify-center w-16 h-16 shadow-lg"
          >
            <span className="font-bold">-CO2</span>
          </motion.div>
        </div>
      </section>
      {/* text */}
      <div className="flex flex-col items-center justify-center text-center w-full absolute top-1/3 ">
        <h1 className="text-[16rem] font-bold bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">RENAISSANCE</h1>
        {/* png image */}
        <img src="/images/plant.png" alt="background" className="w-[20rem] absolute translate-y-[-13.1rem] translate-x-[-1.1rem]" />
        <p className="text-2xl font-bold translate-y-[-2rem]">De chaque petite graine naît une nouvelle vie.</p>
      </div>
      {/* points section */}
      <section className="-translate-x-1/2 -translate-y-1/2 w-full h-screen">
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h2 className="text-4xl font-bold">Points</h2>
        </div>
      </section>
    </>
  );
}
