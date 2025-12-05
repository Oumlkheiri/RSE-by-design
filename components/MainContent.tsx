"use client";
import { motion } from "framer-motion";
import { pointsData } from "@/context/data";

export default function MainContent() {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-gray-800">
        <motion.h1
          className="text-6xl sm:text-8xl font-bold text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          RENAISSANCE
        </motion.h1>
      </section>

      {/* Points Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pointsData.map((point, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">{point.titre}</h3>
              <p className="text-white/80 text-sm">{point.disc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
