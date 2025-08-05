import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-mediium mb-4">
          Ready to Build Your Startup?
        </h2>
        <p className="text-[36px] md:text-xl text-white/90 mb-10">
          No tech skills? No startup experience? No problem.<br />
          <span className="block">GIDIPitch guides you every step of the way.</span>
        </p>

        <div className="flex justify-center items-center gap-4 flex-wrap">
          <button className="bg-white text-[#FF5619] font-medium py-3 px-6 rounded-full flex items-center gap-2 hover:bg-orange-100 transition">
            Try for free <AiOutlineArrowRight size={18} />
          </button>

          <button className="border border-white text-white py-3 px-6 rounded-full hover:bg-white hover:text-[#FF5619] transition">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
