import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CTASection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium mb-4 leading-tight">
          Ready to Build Your Startup?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
          No tech skills? No startup experience? No problem.<br />
          <span className="block mt-2">GIDIPitch guides you every step of the way.</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-white text-[#FF5619] font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-100 transition">
            Try for free <AiOutlineArrowRight size={18} />
          </button>

          <button className="w-full sm:w-auto border border-white text-white py-3 px-6 rounded-xl hover:bg-white font-semibold hover:text-[#FF5619] transition">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
