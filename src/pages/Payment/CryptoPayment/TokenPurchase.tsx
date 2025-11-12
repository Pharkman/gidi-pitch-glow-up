import { useState } from "react";
import { ethers } from "ethers";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TokenPurchase({ onPurchaseSuccess }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [tokenQuantity, setTokenQuantity] = useState(20);
  const [totalCost, setTotalCost] = useState(0.3);

  // 🎉 Confetti setup
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const connectWallet = async () => {
    setIsConnecting(true);
    setError("");

    try {
      if (!window.ethereum) {
        setError("Please install Metamask wallet extension");
        setIsConnecting(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setStatus("Wallet connected!");
    } catch (err) {
      setError("Failed to connect wallet: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const purchaseTokens = async () => {
    setIsPurchasing(true);
    setError("");
    setStatus("Initiating purchase...");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setStatus("Requesting payment details...");
      const response = await fetch(`${BASE_URL}/tokens/purchase/crypto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: Number(totalCost.toFixed(2)),
          walletAddress,
        }),
      });

      if (response.status === 402) {
        const paymentInfo = await response.json();
        setStatus("Please approve the transaction in your wallet...");

        const tx = await signer.sendTransaction({
          to: paymentInfo.payment.address,
          value: ethers.utils.parseUnits(
            paymentInfo.payment.amount.toString(),
            6
          ),
          data: paymentInfo.payment.data || "0x",
        });

        setStatus("Payment sent. Waiting for confirmation...");
        const receipt = await tx.wait();

        setStatus("Payment confirmed! Completing purchase...");
        const finalResponse = await fetch(`${BASE_URL}/tokens/purchase/crypto`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-Payment": receipt.transactionHash,
          },
          body: JSON.stringify({
            amount: Number(totalCost.toFixed(2)),
            walletAddress,
          }),
        });

        const result = await finalResponse.json();
        setStatus("Purchase successful! ✅");

        if (onPurchaseSuccess) onPurchaseSuccess(result);

        // 🎉 Show confetti and redirect (same as Paystack)
        setShowConfetti(true);
        const redirectTarget = localStorage.getItem("redirectAfterPurchase");

        setTimeout(() => {
          setShowConfetti(false);
          localStorage.removeItem("redirectAfterPurchase");

          if (redirectTarget === "check-balance") {
            navigate("/check-token-balance", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }, 3500);
      } else if (response.ok) {
        const result = await response.json();
        setStatus("Purchase successful! ✅");
        if (onPurchaseSuccess) onPurchaseSuccess(result);

        // 🎉 Same success flow
        setShowConfetti(true);
        const redirectTarget = localStorage.getItem("redirectAfterPurchase");

        setTimeout(() => {
          setShowConfetti(false);
          localStorage.removeItem("redirectAfterPurchase");

          if (redirectTarget === "check-balance") {
            navigate("/check-token-balance", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }, 3500);
      } else {
        throw new Error("Purchase failed");
      }
    } catch (err) {
      setError("Purchase failed: " + err.message);
      setStatus("");
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleTokenChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 20 && value <= 10000) {
      setTokenQuantity(value);
      setTotalCost(value * 0.015);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 relative overflow-hidden">
      {/* 🎉 Confetti */}
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />}

      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] relative z-10">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 ">
          Purchase Tokens
        </h2>
        <p className="text-gray-600 mb-6">
          Get tokens to access premium pitch deck generation features.
        </p>

        {!walletAddress ? (
          <div className="space-y-5">
            <p className="text-gray-600 text-sm ">
              Connect your wallet to begin.
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
            <p className="text-xs text-center text-gray-500">
              Don’t have a wallet?{" "}
              <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold underline"
              >
                Install Metamask
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-sm text-green-700 font-medium">
                ✅ Connected: {walletAddress.slice(0, 6)}...
                {walletAddress.slice(-4)}
              </p>
            </div>

            <div className="space-y-3">
              <label className="font-semibold block text-gray-700 text-sm">
                Enter Token Quantity:
              </label>
              <input
                type="number"
                min="20"
                max="10000"
                value={tokenQuantity}
                onChange={handleTokenChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-sm text-gray-600">
                Cost:{" "}
                <span className="font-semibold text-gray-900">
                  ${totalCost.toFixed(2)}
                </span>
              </p>

              <button
                onClick={purchaseTokens}
                disabled={isPurchasing}
                className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {isPurchasing
                  ? "Processing..."
                  : `Purchase ${tokenQuantity} Tokens for $${totalCost.toFixed(
                      2
                    )}`}
              </button>
            </div>

            <button
              onClick={() => setWalletAddress(null)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Disconnect Wallet
            </button>
          </div>
        )}

        {/* Status & Error messages */}
        {status && (
          <div className="mt-6 bg-primary/40 border border-primary/50 rounded-lg p-3 text-center">
            <p className="text-sm text-primary">{status}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
