import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        
        {/* Pay with Crypto */}
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Pay with Crypto
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Use your preferred cryptocurrency (like USDT, Bitcoin, or Ethereum)
              to securely complete your transaction. Quick, global, and easy.
            </p>
          </div>
          <button
            onClick={() => navigate("/crypto-payment")}
            className="bg-primary text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
          >
            Continue with Crypto
          </button>
        </div>

        {/* Pay with Paystack */}
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Pay with Paystack
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Make payments securely using your debit or credit card through
              Paystack — fast, safe, and trusted across Africa.
            </p>
          </div>
          <button
            onClick={() => navigate("/paystack-payment")}
            className="bg-primary text-white py-3 rounded-lg font-medium hover:bg-[#084f96] transition-all"
          >
            Continue with Paystack
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
