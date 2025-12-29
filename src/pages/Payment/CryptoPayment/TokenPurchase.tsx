import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 🌐 Network Configuration - Easy switch between testnet and mainnet
const NETWORK_CONFIG = {
  testnet: {
    chainId: "0x14a34", // 84532 in hex
    chainIdDecimal: 84532,
    chainName: "Base Sepolia",
    rpcUrl: "https://sepolia.base.org",
    blockExplorer: "https://sepolia.basescan.org",
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    networkName: "base-sepolia",
  },
  mainnet: {
    chainId: "0x2105", // 8453 in hex
    chainIdDecimal: 8453,
    chainName: "Base",
    rpcUrl: "https://mainnet.base.org",
    blockExplorer: "https://basescan.org",
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    networkName: "base",
  },
};

// 🔧 Switch this to 'mainnet' when going live
const ACTIVE_NETWORK = import.meta.env.VITE_NETWORK || "testnet";
const NETWORK = NETWORK_CONFIG[ACTIVE_NETWORK];

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

  useEffect(() => {
    setTotalCost(tokenQuantity * 0.015);
  }, [tokenQuantity]);

  const switchToBaseNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK.chainId }],
      });
    } catch (switchError) {
      // Chain not added, let's add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: NETWORK.chainId,
                chainName: NETWORK.chainName,
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [NETWORK.rpcUrl],
                blockExplorerUrls: [NETWORK.blockExplorer],
              },
            ],
          });
        } catch (addError) {
          throw new Error(`Failed to add ${NETWORK.chainName} network`);
        }
      } else {
        throw switchError;
      }
    }
  };

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
     
      // Switch to correct Base network
      await switchToBaseNetwork();
     
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setStatus(`Wallet connected to ${NETWORK.chainName}!`);
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

      // Ensure we're on correct Base network
      const network = await provider.getNetwork();
      if (network.chainId !== NETWORK.chainIdDecimal) {
        setStatus(`Switching to ${NETWORK.chainName}...`);
        await switchToBaseNetwork();
      }

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
        const paymentRequired = await response.json();
        console.log("Payment required:", paymentRequired);

        // Extract payment details from X402 v1 response
        const paymentDetails = paymentRequired.accepts[0];
        const recipient = paymentDetails.payTo;
        const amountInUSDC = paymentDetails.maxAmountRequired; // Already in USDC base units (6 decimals)
        const usdcContract = paymentDetails.asset;

        setStatus("Please approve USDC transfer in your wallet...");

        // ERC20 Transfer ABI
        const erc20ABI = [
          "function transfer(address to, uint256 amount) returns (bool)",
        ];

        const usdcContractInstance = new ethers.Contract(
          usdcContract,
          erc20ABI,
          signer
        );

        // Send USDC transfer
        const tx = await usdcContractInstance.transfer(recipient, amountInUSDC);

        setStatus("Payment sent. Waiting for confirmation...");
        const receipt = await tx.wait();

        setStatus("Payment confirmed! Verifying with backend...");

        // Create payment proof for X402 v1
        const paymentProof = {
          scheme: "exact",
          network: NETWORK.networkName, // Use dynamic network name
          transactionHash: receipt.transactionHash,
          from: walletAddress,
          to: recipient,
          amount: amountInUSDC,
          asset: usdcContract,
          blockNumber: receipt.blockNumber,
        };

        // Retry request with X-PAYMENT header
        const finalResponse = await fetch(`${BASE_URL}/tokens/purchase/crypto`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-PAYMENT": JSON.stringify(paymentProof),
          },
          body: JSON.stringify({
            amount: Number(totalCost.toFixed(2)),
            walletAddress,
          }),
        });

        if (!finalResponse.ok) {
          const errorData = await finalResponse.json();
          throw new Error(errorData.message || "Payment verification failed");
        }

        const result = await finalResponse.json();
        setStatus("Purchase successful! ✅");

        if (onPurchaseSuccess) onPurchaseSuccess(result);

        setShowConfetti(true);
        const redirectTarget = localStorage.getItem("redirectAfterPurchase");

        setTimeout(() => {
          setShowConfetti(false);
          localStorage.removeItem("redirectAfterPurchase");
          navigate(
            redirectTarget === "check-balance"
              ? "/check-token-balance"
              : "/dashboard",
            { replace: true }
          );
        }, 3500);
      } else if (response.ok) {
        const result = await response.json();
        setStatus("Purchase successful! ✅");
        if (onPurchaseSuccess) onPurchaseSuccess(result);

        setShowConfetti(true);
        const redirectTarget = localStorage.getItem("redirectAfterPurchase");

        setTimeout(() => {
          setShowConfetti(false);
          localStorage.removeItem("redirectAfterPurchase");
          navigate(
            redirectTarget === "check-balance"
              ? "/check-token-balance"
              : "/dashboard",
            { replace: true }
          );
        }, 3500);
      } else {
        throw new Error("Purchase failed");
      }
    } catch (err) {
      setError("Purchase failed: " + err.message);
      setStatus("");
      console.error("Purchase error:", err);
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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />
      )}

      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] relative z-10">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Purchase Tokens
        </h2>
        <p className="text-gray-600 mb-6">
          Get tokens to access premium pitch deck generation features.
        </p>

        {/* Show network indicator */}
        <div className="mb-4 text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            ACTIVE_NETWORK === 'testnet'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {NETWORK.chainName} {ACTIVE_NETWORK === 'testnet' ? '(Testnet)' : ''}
          </span>
        </div>

        {!walletAddress ? (
          <div className="space-y-5">
            <p className="text-gray-600 text-sm">Connect your wallet to begin.</p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
            <p className="text-xs text-center text-gray-500">
              Don't have a wallet?{" "}
              {/* ✅ FIXED: Added missing opening anchor tag */}
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

              <p className="text-sm text-gray-600">
                Total Cost:{" "}
                <span className="font-semibold text-gray-900">
                  ${totalCost.toFixed(2)} USDC
                </span>
              </p>

              <button
                onClick={purchaseTokens}
                disabled={isPurchasing}
                className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
              >
                {isPurchasing
                  ? "Processing..."
                  : `Purchase ${tokenQuantity} Tokens for $${totalCost.toFixed(2)}`}
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