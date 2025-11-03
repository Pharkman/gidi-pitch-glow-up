import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetTransaction, useGetUser } from "@/lib/query";
import { FiBell } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import { BiWalletAlt } from "react-icons/bi";

const Notification = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [transactions, setTransactions] = useState([]);

  const { data, isLoading, isFetching } = useGetTransaction({ page, pageSize });
  const { data: userData } = useGetUser();

  const userName = userData?.user?.firstname || "there";
  const pagination = data?.data?.pagination;

  // Merge transactions on new page load
  useEffect(() => {
    if (data?.data?.transactions) {
      setTransactions((prev) => [
        ...prev,
        ...data.data.transactions.filter(
          (t) => !prev.some((p) => p._id === t._id)
        ),
      ]);
    }
  }, [data]);

  // Dynamic greeting
  const hours = new Date().getHours();
  let greeting = "Hello";
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7F4] via-white to-[#FFEDE6] text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full flex flex-col px-6 py-10"
      >
        {/* Greeting Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="p-3 bg-[#FFF1EB] rounded-full border border-[#FFD9CC] shadow-sm">
              <FiBell className="text-[#FF5619] text-2xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {greeting}, {userName.split("@")[0]} 👋
            </h1>
          </motion.div>

          <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed">
            Welcome to your{" "}
            <span className="font-medium text-[#FF5619]">Notifications</span>{" "}
            dashboard.  
            Stay on top of your latest activities and token updates.
          </p>

          <div className="w-20 h-[3px] mx-auto mt-4 rounded-full bg-gradient-to-r from-[#FF7442] to-[#FF5619]" />
        </div>

        {/* Transaction Section */}
        {isLoading ? (
          <p className="text-center text-gray-500">Fetching transactions...</p>
        ) : transactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10"
          >
            <p className="text-lg font-medium">No recent activities yet ✨</p>
            <p className="text-sm text-gray-400">
              Your transactions will appear here once available.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {transactions.map((txn, index) => (
              <motion.div
                key={txn._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#FFF4F0] rounded-xl">
                    {txn.type === "add" ? (
                      <BiWalletAlt className="text-[#FF5619] text-xl" />
                    ) : (
                      <MdOutlinePayment className="text-[#FF5619] text-xl" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium capitalize">
                      {txn.type === "add"
                        ? "Token Added Successfully"
                        : "Transaction Completed"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(txn.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#FF5619] font-semibold text-[15px]">
                    +{txn.quantity} tokens
                  </p>
                  <p className="text-xs text-gray-500">
                    Balance: {txn.balanceAfter}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {pagination && page < pagination.totalPages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center"
          >
            <button
              disabled={isFetching}
              onClick={handleLoadMore}
              className="px-6 py-2.5 bg-[#FF5619] text-white rounded-full font-medium hover:bg-[#e24e17] shadow-md hover:shadow-lg transition disabled:opacity-60"
            >
              {isFetching ? "Loading..." : "Load More"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Notification;
