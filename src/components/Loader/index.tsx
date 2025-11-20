import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import logo from '../../../public/assets/DeckLogoSmall.jpg'
export const LoadingSpinner = () => {
  return (
      <div >
      <span className="loader"></span>
    </div>
  );
};



export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      {/* Spinner Ring */}
      <div className="relative flex items-center justify-center">
        <div className="w-28 h-28 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />

        {/* Logo in the middle */}
        <img
          src={logo}
          alt="Loading..."
          className="absolute w-12 h-12"
        />
    </div>
    </div>
  );
}
