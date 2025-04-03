import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold"
        >
          New Arrivals Are Here
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl">Shop the latest trends in fashion for men, women, and kids.</p>
        <div className="flex justify-center gap-4 mt-6">
          <a href="#shop" className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-blue-900 transition">
            Shop Now
          </a> 
           </div>
      </div>
      <div className="absolute bottom-6 animate-bounce">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  );
}
