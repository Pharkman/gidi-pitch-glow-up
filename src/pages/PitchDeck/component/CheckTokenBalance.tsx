import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCheckPitchDeckCost } from "@/lib/query";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { BiWalletAlt } from "react-icons/bi";

const CheckTokenBalance = () => {
  const navigate = useNavigate();
  const { data: costData, isLoading, isError } = useCheckPitchDeckCost();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full mb-3"></div>
        <p className="text-sm text-gray-700 font-medium">
          Checking your token balance...
        </p>
      </div>
    );
  }

  if (isError || !costData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 to-orange-50 text-center px-6">
        <FiXCircle className="text-red-500 text-5xl mb-3" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We couldn’t check your balance right now. Please try again later.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    toPay,
    totalCostInTokens,
    userCurrentTokens,
    balanceToPurchase,
    equivalentCost,
  } = costData.data;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-2xl py-10 px-8  border border-gray-100"
      >
        {/* Header Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-5"
        >
          {toPay ? (
            <FiXCircle className="text-red-500 text-6xl drop-shadow-md animate-pulse" />
          ) : (
            <FiCheckCircle className="text-green-500 text-6xl drop-shadow-md animate-pulse" />
          )}
        </motion.div>

        {/* Title Message */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {costData.message}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {toPay
            ? "You don’t have enough tokens to generate your deck."
            : "You have enough tokens to proceed to the next step."}
        </p>

        {/* Token Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5 mt-4 text-left shadow-inner">
          <DetailRow label="Deck Cost" value={`${totalCostInTokens} tokens`} />
          <DetailRow
            label="Your Current Tokens"
            value={`${userCurrentTokens} tokens`}
          />
          <DetailRow
            label="Balance to Purchase"
            value={`${balanceToPurchase} tokens`}
          />
          <DetailRow
            label="Equivalent Cost"
            value={`$${equivalentCost.usd} / ₦${equivalentCost.naira}`}
          />
        </div>

        {/* Action Button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {toPay ? (
            <button
             onClick={() => navigate("/payment", { state: { from: "check-balance" } })}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition-all flex items-center justify-center gap-2 w-full"
            >
              <BiWalletAlt className="text-lg" />
              Buy Token
            </button>
          ) : (
            <button
              onClick={() => {
  // Save balanceToPurchase to localStorage
  localStorage.setItem("pendingTokenPurchase", balanceToPurchase);

  // Navigate to payment page
  navigate("/payment", { state: { from: "check-balance" } });
}}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition-all flex items-center justify-center gap-2 w-full"
            >
              <FiCheckCircle className="text-lg" />
              Continue
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Small helper component for cleaner detail rows
const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-semibold text-gray-800">{value}</span>
  </div>
);

export default CheckTokenBalance;
