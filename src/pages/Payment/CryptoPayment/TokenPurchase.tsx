import { useState, useEffect } from "react";
import { privateKeyToAccount } from "viem/accounts";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TokenPurchase({ onPurchaseSuccess }) {
  const tokenToBuy = Number(localStorage.getItem("pendingTokenPurchase")) || 20;

  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const [tokenQuantity, setTokenQuantity] = useState(tokenToBuy);
  const [totalCost, setTotalCost] = useState(tokenToBuy * 0.015);

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  // x402 client - will be initialized after wallet connection
  const [fetchWithPayment, setFetchWithPayment] = useState(null);

  // Update cost dynamically whenever quantity changes
  useEffect(() => {
    setTotalCost(tokenQuantity * 0.015);
  }, [tokenQuantity]);

  /**
   * FIXED: Connect wallet and initialize x402 client properly
   *
   * Key Changes:
   * 1. Get the signer/account from MetaMask
   * 2. Create x402Client instance
   * 3. Register the EVM payment scheme
   * 4. Create the fetchWithPayment wrapper
   */
  const connectWallet = async () => {
    setIsConnecting(true);
    setError("");

    try {
      if (!window.ethereum) {
        setError("Please install Metamask wallet extension");
        setIsConnecting(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
     
      const address = accounts[0];
      setWalletAddress(address);

      // CRITICAL: Initialize x402 client with the wallet
      // This is what the junior engineer missed entirely!
      const client = new x402Client();
     
      // Create a signer that works with viem
      // MetaMask provides the signing capability
      const signer = {
        address: address,
        // viem-compatible sign function that uses MetaMask
        signMessage: async ({ message }) => {
          return await window.ethereum.request({
            method: "personal_sign",
            params: [message, address],
          });
        },
        // For typed data signing (ERC-3009 requires this)
        signTypedData: async (typedData) => {
          return await window.ethereum.request({
            method: "eth_signTypedData_v4",
            params: [address, JSON.stringify(typedData)],
          });
        },
      };

      // Register the EVM payment scheme (for Base Sepolia or mainnet)
      registerExactEvmScheme(client, { signer });

      // Create the payment-enabled fetch wrapper
      const paymentFetch = wrapFetchWithPayment(fetch, client);
      setFetchWithPayment(() => paymentFetch);

      setStatus("Wallet connected and x402 client initialized!");
    } catch (err) {
      setError("Failed to connect wallet: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  /**
   * FIXED: Purchase tokens using x402 protocol
   *
   * Key Changes:
   * 1. Use fetchWithPayment instead of regular fetch
   * 2. Remove manual payment transaction handling
   * 3. Let x402 handle the 402 response automatically
   * 4. Payment signature is added automatically by x402
   */
  const purchaseTokens = async () => {
    if (!fetchWithPayment) {
      setError("x402 client not initialized. Please reconnect your wallet.");
      return;
    }

    setIsPurchasing(true);
    setError("");
    setStatus("Initiating purchase...");

    try {
      setStatus("Processing payment via x402...");
     
      // CRITICAL: Use fetchWithPayment instead of regular fetch
      // This automatically handles:
      // 1. Initial request
      // 2. Receiving 402 Payment Required
      // 3. Creating payment authorization (ERC-3009 signature)
      // 4. Retrying with X-PAYMENT header
      const response = await fetchWithPayment(
        `${BASE_URL}/tokens/purchase/crypto`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount: Number(totalCost.toFixed(2)),
            tokenQuantity: tokenQuantity,
            walletAddress,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Purchase failed");
      }

      const result = await response.json();
     
      // OPTIONAL: Extract payment settlement details from response headers
      // The server may include X-PAYMENT-RESPONSE header with transaction details
      const paymentResponseHeader = response.headers.get("X-PAYMENT-RESPONSE");
      if (paymentResponseHeader) {
        try {
          const paymentDetails = JSON.parse(
            atob(paymentResponseHeader) // Base64 decode
          );
          console.log("Payment settled on blockchain:", paymentDetails);
          // You can show the transaction hash to the user
          if (paymentDetails.txHash) {
            setStatus(`Payment successful! Tx: ${paymentDetails.txHash.slice(0, 10)}...`);
          }
        } catch (e) {
          console.warn("Could not parse payment response:", e);
        }
      }

      setStatus("Purchase successful! ✅");
     
      if (onPurchaseSuccess) onPurchaseSuccess(result);
     
      setShowConfetti(true);
      const redirectTarget = localStorage.getItem("redirectAfterPurchase");
     
      setTimeout(() => {
        setShowConfetti(false);
        localStorage.removeItem("redirectAfterPurchase");
        localStorage.removeItem("pendingTokenPurchase");
        navigate(
          redirectTarget === "check-balance"
            ? "/check-token-balance"
            : "/dashboard",
          { replace: true }
        );
      }, 3500);

    } catch (err) {
      console.error("Purchase error:", err);
     
      // Handle specific x402 errors
      if (err.message.includes("No scheme registered")) {
        setError("Payment method not supported for this network");
      } else if (err.message.includes("Payment already attempted")) {
        setError("Payment failed. Please try again.");
      } else if (err.message.includes("Insufficient funds")) {
        setError("Insufficient USDC balance in your wallet");
      } else if (err.message.includes("User rejected")) {
        setError("Payment signature rejected. Please try again.");
      } else {
        setError("Purchase failed: " + err.message);
      }
     
      setStatus("");
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleTokenChange = (e) => {
    const value = Number(e.target.value);
    const minAllowed = Math.max(20, tokenToBuy);

    if (value >= minAllowed && value <= 10000) {
      setTokenQuantity(value);
      setValidationMsg("");
    } else {
      setValidationMsg(`Minimum purchase is ${minAllowed} tokens`);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setFetchWithPayment(null);
    setStatus("");
    setError("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
        />
      )}

      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] relative z-10">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Purchase Tokens
        </h2>
        <p className="text-gray-600 mb-6">
          Get tokens to access premium pitch deck generation features.
        </p>

        {!walletAddress ? (
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Using x402 Protocol:</strong> Pay directly with USDC on Base network.
                No gas fees, instant settlement.
              </p>
            </div>
           
            <p className="text-gray-600 text-sm">
              Connect your wallet to begin. Make sure you have USDC on Base network.
            </p>
           
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
           
            <p className="text-xs text-center text-gray-500">
              Don't have a wallet?{" "}
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
                min={Math.max(20, tokenToBuy)}
                max="10000"
                value={tokenQuantity}
                onChange={handleTokenChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {validationMsg && (
                <p className="text-sm text-red-600">{validationMsg}</p>
              )}
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  Token Cost: <span className="font-semibold">${totalCost.toFixed(2)} USDC</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Payment processed via x402 protocol on Base network
                </p>
              </div>

              <button
                onClick={purchaseTokens}
                disabled={isPurchasing || !fetchWithPayment}
                className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {isPurchasing
                  ? "Processing Payment..."
                  : `Purchase ${tokenQuantity} Tokens for $${totalCost.toFixed(2)}`}
              </button>
             
              {isPurchasing && (
                <p className="text-xs text-center text-gray-600">
                  Please approve the signature request in MetaMask...
                </p>
              )}
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Disconnect Wallet
            </button>
          </div>
        )}

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
