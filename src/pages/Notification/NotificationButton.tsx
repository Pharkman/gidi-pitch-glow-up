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

const NotificationButton = () => {
  const { data, isLoading } = useGetTransaction({ page: 1, pageSize: 10 });
  const transactions = data?.data?.transactions || [];
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    if (!isLoading && transactions.length > 0) {
      const lastViewed = localStorage.getItem("lastNotificationViewedAt");
      const latestCreatedAt = transactions[0]?.createdAt;

      if (!lastViewed || new Date(latestCreatedAt) > new Date(lastViewed)) {
        setHasNewNotifications(true);
      } else {
        setHasNewNotifications(false);
      }
    }
  }, [transactions, isLoading]);

  const handleOpenChange = (open) => {
    if (!open) {
      localStorage.setItem("lastNotificationViewedAt", new Date().toISOString());
      setHasNewNotifications(false);
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          className="sm:flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-[#FFF3EF] hover:text-[#FF5619] border border-gray-200 transition-all duration-300 relative"
        >
          <Bell className="h-5 w-5" />
          {hasNewNotifications && (
            <span className="absolute top-0 right-1 block h-2.5 w-2.5 bg-[#FF5619] rounded-full"></span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[420px] md:w-[480px] lg:w-[500px] h-full p-0 overflow-hidden bg-white"
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <SheetTitle className="text-lg font-semibold text-gray-900">
            Notifications
          </SheetTitle>
        </SheetHeader>

        {/* 👇 Notification fills the entire space, no side padding */}
        <div className="h-[calc(100%-64px)] overflow-y-auto">
          <Notification />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationButton;
