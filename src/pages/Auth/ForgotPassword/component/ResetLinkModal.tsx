const ResetLinkSentModal = ({ email, onClose }: { email: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative animate-fadeIn">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#1D1D1D] mb-3">
          🎉 Reset link sent
        </h2>

        {/* Description */}
        <p className="text-[#555] text-sm leading-relaxed mb-8">
          We’ve sent a password reset link to{" "}
          <span className="font-semibold text-[#1D1D1D]">{email}</span>.  
          Please check your inbox and follow the instructions to reset your password.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#FF6330] hover:to-[#FF3E0D] transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResetLinkSentModal;
