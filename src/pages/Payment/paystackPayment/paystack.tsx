import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PaystackPop from "@paystack/inline-js";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUser } from "@/lib/query";
import Confetti from "react-confetti"; // 🎉 Import confetti
import { useWindowSize } from "react-use"; 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const tokenPriceUSD = 0.015;
const exchangeRate = import.meta.env.VITE_USD_NGN_EXCHANGE_RATE || 1500;

// 🔹 Helper to safely extract user email
const getUserEmail = (user) => {
  if (!user) return null;
  return user.email || user?.data?.email || user?.user?.email || null;
};

// 🔸 Paystack Payment Function
export const purchaseTokensWithPaystack = async ({
  quantity,
  user,
  setIsPurchasing,
  setShowConfetti, // 🎉 add this
  navigate,
  fromCheckBalance,
}) => {
  const email = getUserEmail(user);

  if (!email) {
    toast.error("Unable to fetch user email. Please log in again.");
    return;
  }

  try {
    setIsPurchasing(true);

    if (quantity < 4)
      throw new Error("You can only purchase a minimum of 4 tokens.");

    const amount = quantity * tokenPriceUSD; // USD total
    const nairaAmount = amount * exchangeRate;

    const popup = new PaystackPop();

    popup.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: nairaAmount * 100, // Convert to kobo
      onSuccess: async (transaction) => {
        try {
          const response = await fetch(`${BASE_URL}/tokens/purchase`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              reference: transaction.reference,
              amount: amount.toFixed(2),
            }),
          });

          const result = await response.json();

          if (!response.ok) throw new Error(result.message || "Purchase failed");

          toast.success(result.message || "Tokens purchased successfully!");
          localStorage.removeItem("pendingTokenPurchase");

          // 🎉 Show confetti on success
          setShowConfetti(true);

          // ✅ Redirect user after a short delay
         const redirectTarget = localStorage.getItem("redirectAfterPurchase");

setTimeout(() => {
  setShowConfetti(false);
  if (redirectTarget === "check-balance") {
    localStorage.removeItem("redirectAfterPurchase"); // ✅ cleanup
    navigate("/check-token-balance", { replace: true });
  } else {
    navigate("/dashboard", { replace: true });
  }
}, 3500);
        } catch (error) {
          toast.error(error.message || "Error confirming payment.");
        } finally {
          setIsPurchasing(false);
        }
      },
      onClose: () => {
        toast.info("Transaction window closed.");
        setIsPurchasing(false);
      },
      onCancel: () => {
        toast.error("Transaction canceled.");
        setIsPurchasing(false);
      },
      onError: (error) => {
        toast.error(`Payment Error: ${error?.message || "Unknown error"}`);
        setIsPurchasing(false);
      },
    });
  } catch (error) {
    toast.error(error.message);
    setIsPurchasing(false);
  }
};

// 🔹 PurchaseTokens Component
const PurchaseTokens = () => {
  const [quantity, setQuantity] = useState(() => {
    const savedQuantity = localStorage.getItem("pendingTokenPurchase");
    return savedQuantity ? Number(savedQuantity) : 4;
  });

  const [usdAmount, setUsdAmount] = useState("0.00");
  const [nairaAmount, setNairaAmount] = useState("0.00");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // 🎉 new state

  const { width, height } = useWindowSize(); // for confetti dimensions
  const { data: user, isLoading, isError } = useGetUser();
  const navigate = useNavigate();
  const location = useLocation();

  const fromCheckBalance = location.state?.from === "check-balance";
  const email = getUserEmail(user);

  useEffect(() => {
    if (quantity >= 4 && quantity <= 10000) {
      const totalUsd = (quantity * tokenPriceUSD).toFixed(2);
      const totalNaira = (totalUsd * exchangeRate).toFixed(2);
      setUsdAmount(totalUsd);
      setNairaAmount(totalNaira);
    } else {
      setUsdAmount("0.00");
      setNairaAmount("0.00");
    }
  }, [quantity]);

  const handlePurchase = async () => {
    if (isPurchasing) return;

    if (quantity < 4) return toast.error("Minimum 4 tokens required.");
    if (quantity > 10000) return toast.error("Maximum 10,000 tokens allowed.");
    if (!email) return toast.error("Unable to fetch user email. Please log in again.");

    await purchaseTokensWithPaystack({
      quantity,
      user,
      setIsPurchasing,
      setShowConfetti,
      navigate,
      fromCheckBalance,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (isError || !email) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Unable to load user information. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4 py-10 relative overflow-hidden">
      {/* 🎉 Confetti Animation */}
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />}

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-gray-200 relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Purchase Tokens</h1>
        <p className="text-gray-600 mb-6">
          Buy tokens to access premium features.
          <br />
          <span className="text-sm text-gray-500 mt-2 block">
            Minimum 4, Maximum 10,000 tokens.
          </span>
        </p>

        {/* Quantity Input */}
        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-medium text-[15px] mb-2"
          >
            Number of Tokens
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="4"
            max="10000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5A1F] focus:border-[#FF5A1F] outline-none transition"
          />
        </div>

        {/* Price Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600 text-[15px]">Price per Token (USD)</span>
            <span className="font-semibold text-gray-800 text-[15px]">$0.015</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600 text-[15px]">Total (USD)</span>
            <span className="font-semibold text-gray-800">${usdAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total (NGN)</span>
            <span className="font-semibold text-gray-800">
              ₦{Number(nairaAmount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-sm ${
            isPurchasing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FF5A1F] text-white hover:bg-[#e14e17]"
          }`}
        >
          {isPurchasing ? "Processing..." : "Purchase Tokens"}
        </button>
      </div>
    </div>
  );
};

export default PurchaseTokens;
