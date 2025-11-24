import { Bell } from "lucide-react";
import { useGetTransaction } from "@/lib/query";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Notification from "@/pages/Notification/Notification";
import { FiBell } from "react-icons/fi";

const NotificationButton = () => {
  const { data, isLoading } = useGetTransaction({ page: 1, pageSize: 10 });
  const transactions = data?.data?.transactions || [];
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoading && transactions.length > 0) {
      const lastViewed = localStorage.getItem("lastNotificationViewedAt");
      let newCount = 0;

      if (!lastViewed) {
        // If user has never viewed notifications, count all
        newCount = transactions.length;
      } else {
        const lastViewedDate = new Date(lastViewed);
        newCount = transactions.filter(
          (txn) => new Date(txn.createdAt) > lastViewedDate
        ).length;
      }

      setUnreadCount(newCount);
    }
  }, [transactions, isLoading]);

  const handleOpenChange = (open) => {
    if (!open) {
      // Mark all as viewed when closing the sheet
      localStorage.setItem("lastNotificationViewedAt", new Date().toISOString());
      setUnreadCount(0);
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          className="relative sm:flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-primary/30 hover:text-primary border border-gray-200 transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center bg-primary text-white text-[10px] font-semibold rounded-full w-4 h-4 sm:w-5 sm:h-5">
             <p className="text-center"> {unreadCount > 9 ? "9+" : unreadCount}</p>
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[420px] md:w-[480px] lg:w-[500px]  h-full p-0 overflow-hidden bg-white"
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10  ">
          <SheetTitle className="text-lg font-semibold text-gray-900">
            Notifications
          </SheetTitle>

           {/* <div className="p-2.5 bg-[#F0F7FF] rounded-full border border-[#85BEFC] shadow-sm">
              <FiBell className="text-primary text-xl" />
            </div> */}
        </SheetHeader>

        {/* 👇 Full-height notification content */}
        <div className="h-[calc(100%-64px)] overflow-y-auto">
          <Notification />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationButton;
