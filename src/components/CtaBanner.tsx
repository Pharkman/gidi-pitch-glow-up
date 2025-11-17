"use client";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="w-full py-16 md:py-24 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight max-sm:text-start"
        >
          Ready to{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="underline decoration-white/70"
          >
            Build
          </motion.span>{" "}
          Your Startup?
        </motion.h2>

        {/* Animated Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-semibold max-sm:text-start"
        >
          No tech skills? No startup experience? No problem.
          <br className="max-sm:hidden" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
              duration: 2,
              ease: "easeInOut",
            }}
            className="md:block mt-2"
          >
            GIDIPitch guides you every step of the way.
          </motion.span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button className="w-full sm:w-auto bg-white text-primary font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2  transition">
            Try for free <AiOutlineArrowRight size={18} />
          </button>

          <button className="w-full sm:w-auto border border-white text-white py-3 px-6 rounded-xl hover:bg-white font-semibold hover:text-primary transition">
            Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
