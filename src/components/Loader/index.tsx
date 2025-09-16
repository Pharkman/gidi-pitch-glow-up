import { motion } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-4 h-4 border-4 border-black border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    </div>
  );
};
