import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff7f5] via-white to-[#FFE1D6] overflow-hidden text-gray-800">
      {/* Subtle background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF5619]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF5619]/20 blur-[180px] rounded-full" />

      {/* Center Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 md:px-12  rounded-3xl  max-w-lg w-full"
      >
        {/* Animated 404 Number */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[8rem] md:text-[10rem] font-extrabold tracking-tight bg-gradient-to-b from-[#FF5619] to-[#ff9f70] bg-clip-text text-transparent drop-shadow-md"
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3"
        >
          Oops! Page not found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 text-base md:text-lg mb-8 max-w-md"
        >
          The page you’re trying to reach doesn’t exist, has been moved, or is
          temporarily unavailable. Let’s take you back home.
        </motion.p>

        {/* Button */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#FF5619] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl hover:bg-[#ff6934] transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back Home
        </motion.a>
      </motion.div>

      {/* Floating Decorative Circles */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-6 h-6 bg-[#FF5619]/60 rounded-full"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-[20%] w-8 h-8 bg-[#FF5619]/40 rounded-full"
      ></motion.div>
    </div>
  );
};

export default NotFound;
