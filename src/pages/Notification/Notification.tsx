// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useGetTransaction, useGetUser } from "@/lib/query";
// import { FiBell } from "react-icons/fi";
// import { MdOutlinePayment } from "react-icons/md";
// import { BiWalletAlt } from "react-icons/bi";

// const Notification = () => {
//   const [page, setPage] = useState(1);
//   const pageSize = 10;
//   const [transactions, setTransactions] = useState([]);

//   const { data, isLoading, isFetching } = useGetTransaction({ page, pageSize });
//   const { data: userData } = useGetUser();

//   const userName = userData?.user?.firstname || "there";
//   const pagination = data?.data?.pagination;

//   useEffect(() => {
//     if (data?.data?.transactions) {
//       setTransactions((prev) => [
//         ...prev,
//         ...data.data.transactions.filter(
//           (t) => !prev.some((p) => p._id === t._id)
//         ),
//       ]);
//     }
//   }, [data]);

//   const hours = new Date().getHours();
//   let greeting = "Hello";
//   if (hours < 12) greeting = "Good morning";
//   else if (hours < 18) greeting = "Good afternoon";
//   else greeting = "Good evening";

//   const handleLoadMore = () => {
//     if (pagination && page < pagination.totalPages) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="h-full overflow-y-auto bg-gradient-to-b from-[#FFF9F6] via-white to-[#FFF3EE] text-gray-800">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="flex flex-col px-4 sm:px-5 py-6"
//       >
//         {/* Greeting Section */}
//         <div className="text-center mb-6">
//           <motion.div
//             initial={{ scale: 0.95 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.4 }}
//             className="flex items-center  gap-2 mb-3"
//           >
//             <div className="p-2.5 bg-[#FFF1EB] rounded-full border border-[#FFD9CC] shadow-sm">
//               <FiBell className="text-[#FF5619] text-xl" />
//             </div>
//             <h1 className="text-lg font-semibold text-gray-900 capitalize">
//               {greeting}, {userName.split("@")[0]} 👋
//             </h1>
//           </motion.div>

//           <p className="text-gray-600 text-sm leading-relaxed">
//             Stay on top of your latest{" "}
//             <span className="font-medium text-[#FF5619]">token</span> updates and
//             activities.
//           </p>

//           <div className="w-16 h-[3px] mx-auto mt-3 rounded-full bg-gradient-to-r from-[#FF7442] to-[#FF5619]" />
//         </div>

//         {/* Transaction Section */}
//         {isLoading ? (
//           <p className="text-center text-gray-500">Fetching transactions...</p>
//         ) : transactions.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center text-gray-500 mt-8"
//           >
//             <p className="text-base font-medium">No recent activities yet ✨</p>
//             <p className="text-sm text-gray-400">
//               Your transactions will appear here once available.
//             </p>
//           </motion.div>
//         ) : (
//           <div className="space-y-3">
//             {transactions.map((txn, index) => (
//               <motion.div
//                 key={txn._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.25, delay: index * 0.04 }}
//                 className="flex justify-between items-center bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2.5 bg-[#FFF4F0] rounded-lg">
//                     {txn.type === "add" ? (
//                       <BiWalletAlt className="text-[#FF5619] text-lg" />
//                     ) : (
//                       <MdOutlinePayment className="text-[#FF5619] text-lg" />
//                     )}
//                   </div>
//                   <div>
//                     <p className="text-gray-900 font-medium text-[13px] capitalize">
//                       {txn.type === "add"
//                         ? "Token Added Successfully"
//                         : "Transaction Completed"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(txn.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-[#FF5619] font-semibold text-sm">
//                     +{txn.quantity} tokens
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Balance: {txn.balanceAfter}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Load More Button */}
//         {pagination && page < pagination.totalPages && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-6 flex justify-center"
//           >
//             <button
//               disabled={isFetching}
//               onClick={handleLoadMore}
//               className="px-5 py-2 bg-[#FF5619] text-white text-sm rounded-full font-medium hover:bg-[#e24e17] shadow-sm hover:shadow-md transition disabled:opacity-60"
//             >
//               {isFetching ? "Loading..." : "Load More"}
//             </button>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Notification;



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
  const [lastViewedAt, setLastViewedAt] = useState(null);

  const { data, isLoading, isFetching } = useGetTransaction({ page, pageSize });
  const { data: userData } = useGetUser();

  const userName = userData?.user?.firstname || "there";
  const pagination = data?.data?.pagination;

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

  useEffect(() => {
    const lastViewed = localStorage.getItem("lastNotificationViewedAt");
    if (lastViewed) setLastViewedAt(new Date(lastViewed));
  }, []);

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
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#FFF9F6] via-white to-[#FFF3EE] text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col px-4 sm:px-5 py-6"
      >
        {/* Greeting Section */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center  gap-2 mb-3"
          >
            <div className="p-2.5 bg-[#FFF1EB] rounded-full border border-[#FFD9CC] shadow-sm">
              <FiBell className="text-[#FF5619] text-xl" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 capitalize">
              {greeting}, {userName.split("@")[0]} 👋
            </h1>
          </motion.div>

          <p className="text-gray-600 text-sm leading-relaxed text-left">
            Stay on top of your latest{" "}
            <span className="font-medium text-[#FF5619]">token</span> updates and
            activities.
          </p>

          <div className="w-16 h-[3px] mx-auto mt-3 rounded-full bg-gradient-to-r from-[#FF7442] to-[#FF5619]" />
        </div>

        {/* Transaction Section */}
        {isLoading ? (
          <p className="text-center text-gray-500">Fetching transactions...</p>
        ) : transactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-8"
          >
            <p className="text-base font-medium">No recent activities yet ✨</p>
            <p className="text-sm text-gray-400">
              Your transactions will appear here once available.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn, index) => {
              const isUnread =
                lastViewedAt && new Date(txn.createdAt) > lastViewedAt;
              return (
                <motion.div
                  key={txn._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="relative flex justify-between items-center bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  {/* 🔸 Unread indicator */}
                  {isUnread && (
                    <span className="absolute top-3 left-3 block w-2 h-2 bg-[#FF5619] rounded-full"></span>
                  )}

                  <div className="flex items-center gap-3 ml-2">
                    <div className="p-2.5 bg-[#FFF4F0] rounded-lg">
                      {txn.type === "add" ? (
                        <BiWalletAlt className="text-[#FF5619] text-lg" />
                      ) : (
                        <MdOutlinePayment className="text-[#FF5619] text-lg" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-[13px] capitalize">
                        {txn.type === "add"
                          ? "Token Added Successfully"
                          : "Transaction Completed"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(txn.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[#FF5619] font-semibold text-sm">
                      +{txn.quantity} tokens
                    </p>
                    <p className="text-xs text-gray-500">
                      Balance: {txn.balanceAfter}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {pagination && page < pagination.totalPages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex justify-center"
          >
            <button
              disabled={isFetching}
              onClick={handleLoadMore}
              className="px-5 py-2 bg-[#FF5619] text-white text-sm rounded-full font-medium hover:bg-[#e24e17] shadow-sm hover:shadow-md transition disabled:opacity-60"
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
